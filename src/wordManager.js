import { generate } from "random-words";

// Configuration for difficulties based on word length
const DIFFICULTY_CONFIG = {
    easy: { minLength: 3, maxLength: 5 },
    medium: { minLength: 6, maxLength: 8 },
    hard: { minLength: 9, maxLength: 12 },
    insane: { minLength: 13, maxLength: 15 }
};

export function getWordByDifficulty(level) {
    // Determine difficulty based on current game level
    let config = DIFFICULTY_CONFIG.easy;

    if (level > 3) config = DIFFICULTY_CONFIG.medium;
    if (level > 7) config = DIFFICULTY_CONFIG.hard;
    if (level > 10) config = DIFFICULTY_CONFIG.insane;

    console.log(`Level: ${level}, Config:`, config); // Debugging log

    // Generate a single word with those constraints
    const word = generate({
        exactly: 1,
        minLength: config.minLength,
        maxLength: config.maxLength
    });

    // Handle potential array return or ensure string
    return Array.isArray(word) ? word[0] : word;
}
