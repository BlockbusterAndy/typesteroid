import { gameState, resetGameState } from "../state.js";
import { setupUI, updateUI } from "../ui.js";
import { addShip } from "../objects/ship.js";
import { spawnAsteroid, handleAsteroidUpdate } from "../objects/asteroid.js";

export function registerGameScene() {
    scene("game", () => {
        // Reset state
        resetGameState();

        const SCREEN_HEIGHT = height();
        const BOTTOM_THRESHOLD = SCREEN_HEIGHT - 50;

        // --- Background ---
        add([
            sprite("bg_image", { width: width(), height: height() }),
            pos(0, 0),
            z(1),
            "bg"
        ]);

        // --- Objects ---
        addShip();
        const ui = setupUI();

        // --- Game Logic ---

        // Spawn Logic
        let spawnInterval = 2;
        let currentAsteroidSpeed = 60;

        function spawnLoop() {
            spawnAsteroid({ speed: currentAsteroidSpeed });
            wait(spawnInterval, spawnLoop);
        }

        spawnLoop();

        // Level Up Logic
        loop(5, () => {
            gameState.level++;
            spawnInterval = Math.max(0.5, spawnInterval * 0.95);
            currentAsteroidSpeed = Math.min(600, currentAsteroidSpeed + 10);
            updateUI(ui, gameState);
        });

        // Asteroid Updates & Life Loss
        handleAsteroidUpdate(BOTTOM_THRESHOLD, (lossPos) => {
            gameState.lives--;
            shake(10);
            updateUI(ui, gameState);

            // Visual feedback
            add([
                pos(lossPos),
                circle(40),
                color(255, 0, 0),
                opacity(1),
                lifespan(0.5, { fade: 0.5 }),
                z(10),
            ]);

            if (gameState.lives <= 0) {
                go("gameover", gameState.score, gameState.wpm, gameState.maxMultiplier);
            } else {
                gameState.multiplier = 1;
                gameState.currentTarget = null;
                updateUI(ui, gameState);
            }
        });

        // WPM Calculation
        loop(1, () => {
            const minutes = (Date.now() - gameState.startTime) / 60000;
            if (minutes > 0) {
                gameState.wpm = Math.floor((gameState.charactersTyped / 5) / minutes);
            }
            updateUI(ui, gameState);
        });

        // --- Input Handling ---
        onCharInput((char) => {
            const key = char.toLowerCase();

            if (!gameState.currentTarget) {
                // Find potential target
                const candidates = get("asteroid").filter(a =>
                    a.word.length > a.typedIndex &&
                    a.word[a.typedIndex].toLowerCase() === key
                );

                if (candidates.length > 0) {
                    candidates.sort((a, b) => b.pos.y - a.pos.y);
                    gameState.currentTarget = candidates[0];
                    processHit(gameState.currentTarget);
                } else {
                    // Miss
                    gameState.multiplier = 1;
                    shake(2);
                }
            } else {
                // Check against current target
                // Verify target still exists
                if (!gameState.currentTarget.exists()) {
                    gameState.currentTarget = null;
                    // Retry finding target logic or just fail? 
                    // If target destroyed by other means (unlikely here), we reset.
                    return;
                }

                const expectedChar = gameState.currentTarget.word[gameState.currentTarget.typedIndex].toLowerCase();
                if (key === expectedChar) {
                    processHit(gameState.currentTarget);
                } else {
                    // Wrong key for current target
                    gameState.multiplier = 1;
                    shake(5);
                }
            }

            updateUI(ui, gameState);
        });

        function processHit(asteroid) {
            asteroid.typedIndex++;
            gameState.charactersTyped++;

            gameState.score += 10 * gameState.multiplier;
            updateUI(ui, gameState);

            // LASER FX
            const ship = get("ship")[0];
            if (ship) {
                const dist = ship.pos.dist(asteroid.pos);
                const angle = asteroid.pos.sub(ship.pos).angle();

                add([
                    rect(dist, 4),
                    pos(ship.pos),
                    anchor("left"),
                    color(0, 255, 0),
                    opacity(1),
                    rotate(angle),
                    lifespan(0.1, { fade: 0.1 }),
                    z(8),
                ]);

                add([
                    circle(10),
                    pos(ship.pos),
                    color(200, 255, 200),
                    lifespan(0.1),
                    anchor("center"),
                    z(9),
                ]);
            }

            // Floating Char
            add([
                text(asteroid.word[asteroid.typedIndex - 1], { size: 24 }),
                pos(asteroid.pos.sub(0, 20)),
                move(UP, 100),
                color(0, 255, 0),
                opacity(1),
                lifespan(0.5, { fade: 0.5 }),
                z(20),
            ]);

            // Word Complete?
            if (asteroid.typedIndex >= asteroid.word.length) {
                destroy(asteroid);
                gameState.currentTarget = null;
                gameState.multiplier++;
                if (gameState.multiplier > gameState.maxMultiplier) gameState.maxMultiplier = gameState.multiplier;

                gameState.score += 100 * gameState.multiplier;

                // Floating Multiplier
                add([
                    text(`x${gameState.multiplier}!`, { size: 48, font: "monospace" }),
                    pos(asteroid.pos),
                    color(255, 255, 0),
                    anchor("center"),
                    move(UP, 100),
                    lifespan(0.8, { fade: 0.8 }),
                    z(50),
                ]);

                // Explosion
                add([
                    pos(asteroid.pos),
                    circle(30),
                    color(255, 150, 0),
                    scale(1),
                    opacity(1),
                    lifespan(0.3, { fade: 0.3 }),
                    z(6),
                    {
                        update() {
                            this.scale.x += dt() * 5;
                            this.scale.y += dt() * 5;
                        }
                    }
                ]);
            }
        }
    });

}
