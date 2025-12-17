import { getWordByDifficulty } from "../wordManager.js";
import { gameState } from "../state.js";

export function spawnAsteroid(spawnSettings) {
    const { speed } = spawnSettings;
    const word = getWordByDifficulty(gameState.level) || "bug";
    const xPos = rand(50, width() - 200);

    // Container 
    const asteroid = add([
        pos(xPos, -50),
        area({ shape: new Rect(vec2(0), 80, 80) }),
        "asteroid",
        {
            word: word,
            typedIndex: 0,
            speed: speed
        },
        z(5),
    ]);

    // Visual Sprite
    asteroid.add([
        sprite("asteroid"),
        anchor("center"),
        scale(0.15),
        rotate(rand(0, 360)),
        {
            update() {
                this.angle += dt() * 20;
            }
        }
    ]);

    // Text Overlay
    asteroid.textObj = asteroid.add([
        text(word),
        anchor("center"),
        color(255, 255, 255),
        pos(0, 0),
    ]);
}

export function handleAsteroidUpdate(BOTTOM_THRESHOLD, onLifeLost) {
    onUpdate("asteroid", (a) => {
        a.move(0, a.speed);

        // Visual Feedback for typing
        a.textObj.text = a.word.substring(a.typedIndex);

        if (gameState.currentTarget === a) {
            a.textObj.color = rgb(255, 255, 0);
        } else {
            a.textObj.color = rgb(255, 255, 255);
        }

        // Check Bounds
        if (a.pos.y > BOTTOM_THRESHOLD) {
            destroy(a);
            onLifeLost(a.pos);
        }
    });
}
