import type { Team } from "./Team";
import type { Category } from "../data/categories";

export interface GameState {
    teams: Team[];
    currentTeamIndex: number;
    status: 'setup' | 'diceRoll' | 'dice' | 'reveal' | 'action' | 'result' | 'victory';
    isGameOver: boolean;
    roundWords: Record<Category, string>;
    targetCategory?: Category;
    turnSuccess?: boolean;
    winningTeamId?: string;
    // Para el lanzamiento inicial de dados
    team1DiceRoll?: number;
    team2DiceRoll?: number;
    diceRollPhase?: 'waiting' | 'team1' | 'team2' | 'complete';
}