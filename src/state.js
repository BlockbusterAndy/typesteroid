export const gameState = {
    score: 0,
    wpm: 0,
    multiplier: 1,
    maxMultiplier: 1,
    lives: 3,
    level: 1,
    subLevel: 0, // tracking asteroids for level up if needed, or just time based
    startTime: 0,
    charactersTyped: 0,
    currentTarget: null,
};

export function resetGameState() {
    gameState.score = 0;
    gameState.wpm = 0;
    gameState.multiplier = 1;
    gameState.maxMultiplier = 1;
    gameState.lives = 3;
    gameState.level = 1;
    gameState.startTime = Date.now();
    gameState.charactersTyped = 0;
}
