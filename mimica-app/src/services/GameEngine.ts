import type { GameState } from "../models/GameState";
import type { Team } from "../models/Team";
import { Randomizer } from "./Randomizer";
import { GAME_CONFIG } from "../config/constants";

export class GameEngine {
    static createInitialState(team1Name: string, team1Players: string[], team2Name: string, team2Players: string[]): GameState {
        const teams: Team[] = [
            {
                id: "1",
                name: team1Name || "Equipo 1",
                players: team1Players,
                score: 0,
                currentPlayerIndex: 0,
            },
            {
                id: "2",
                name: team2Name || "Equipo 2",
                players: team2Players,
                score: 0,
                currentPlayerIndex: 0,
            },
        ];

        return {
            teams,
            currentTeamIndex: 0,
            status: "diceRoll",
            isGameOver: false,
            roundWords: Randomizer.generateRoundWords(),
            diceRollPhase: 'waiting',
        };
    }

    static rollDiceForTeam(state: GameState, teamIndex: 1 | 2): GameState {
        const diceValue = Randomizer.rollDice();

        if (teamIndex === 1) {
            return {
                ...state,
                team1DiceRoll: diceValue,
                diceRollPhase: 'team2',
            };
        } else {
            const newState = {
                ...state,
                team2DiceRoll: diceValue,
                diceRollPhase: 'complete' as const,
            };

            // Determinar quién empieza
            if (state.team1DiceRoll! > diceValue) {
                return { ...newState, currentTeamIndex: 0 };
            } else if (state.team1DiceRoll! < diceValue) {
                return { ...newState, currentTeamIndex: 1 };
            } else {
                // Empate - volver a tirar
                return {
                    ...state,
                    team1DiceRoll: undefined,
                    team2DiceRoll: undefined,
                    diceRollPhase: 'waiting',
                };
            }
        }
    }

    static startGameAfterDiceRoll(state: GameState): GameState {
        return {
            ...state,
            status: 'dice',
        };
    }

    static nextTurn(state: GameState): GameState {
        // La puntuación ya se actualizó en finishTurn
        const currentTeam = state.teams[state.currentTeamIndex];

        // Check victory
        if (currentTeam.score >= GAME_CONFIG.MAX_SCORE) {
            return {
                ...state,
                isGameOver: true,
                status: "victory",
                winningTeamId: currentTeam.id,
            };
        }

        const newTeams = [...state.teams];
        const updatedTeam = { ...currentTeam };

        // Rotate player for the team that just finished
        updatedTeam.currentPlayerIndex = (updatedTeam.currentPlayerIndex + 1) % updatedTeam.players.length;
        newTeams[state.currentTeamIndex] = updatedTeam;

        // Switch team
        const nextTeamIndex = (state.currentTeamIndex + 1) % 2;

        return {
            ...state,
            teams: newTeams,
            currentTeamIndex: nextTeamIndex,
            status: "dice",
            turnSuccess: undefined,
            roundWords: Randomizer.generateRoundWords(),
            targetCategory: Randomizer.getRandomCategory(),
        };
    }

    static prepareRound(state: GameState): GameState {
        return {
            ...state,
            roundWords: Randomizer.generateRoundWords(),
            targetCategory: Randomizer.getRandomCategory(),
            status: "reveal",
        };
    }

    static startAction(state: GameState): GameState {
        return {
            ...state,
            status: "action",
        };
    }

    static finishTurn(state: GameState, success: boolean): GameState {
        const newTeams = [...state.teams];

        if (success) {
            // Actualizar puntaje inmediatamente
            const currentTeam = { ...newTeams[state.currentTeamIndex] };
            currentTeam.score += 1;
            newTeams[state.currentTeamIndex] = currentTeam;
        }

        return {
            ...state,
            teams: newTeams,
            status: "result",
            turnSuccess: success,
        };
    }
}
