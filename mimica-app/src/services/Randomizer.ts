import { CATEGORIES, type Category } from "../data/categories";
import { WORD_BANK } from "../data/wordBank";

export class Randomizer {
    static getRandomInt(max: number): number {
        return Math.floor(Math.random() * max);
    }

    static getRandomElement<T>(array: readonly T[] | T[]): T {
        return array[this.getRandomInt(array.length)];
    }

    static generateRoundWords(): Record<Category, string> {
        const roundWords: Partial<Record<Category, string>> = {};

        CATEGORIES.forEach(category => {
            const words = WORD_BANK[category];
            roundWords[category] = this.getRandomElement(words);
        });

        return roundWords as Record<Category, string>;
    }

    static getRandomCategory(): Category {
        return this.getRandomElement(CATEGORIES);
    }

    static flipCoin(): number {
        return Math.random() < 0.5 ? 0 : 1;
    }

    static rollDice(): number {
        return Math.floor(Math.random() * 6) + 1; // Returns 1-6
    }
}
