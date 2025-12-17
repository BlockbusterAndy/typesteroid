
export function registerStartScene() {
    scene("start", () => {
        // Background
        add([
            sprite("bg_image", { width: width(), height: height() }),
            pos(0, 0),
            z(0),
            color(100, 100, 100), // Darken it a bit
        ]);

        // Title
        add([
            text("TYPESTEROID", { size: 64, font: "monospace" }),
            pos(center().x, center().y - 100),
            anchor("center"),
            color(255, 255, 255),
        ]);

        // Instructions
        add([
            text("Type the words to destroy asteroids!", { size: 24, font: "monospace" }),
            pos(center().x, center().y),
            anchor("center"),
            color(200, 200, 200),
        ]);

        // Start Button (Text acting as button)
        const startBtn = add([
            text("START GAME", { size: 32, font: "monospace" }),
            pos(center().x, center().y + 100),
            anchor("center"),
            area(), // Make it clickable
            scale(1),
            color(0, 255, 0),
            "startBtn"
        ]);

        // Hover effect
        startBtn.onHover(() => {
            startBtn.color = rgb(100, 255, 100);
            startBtn.scale = vec2(1.2);
            setCursor("pointer");
        });

        startBtn.onHoverEnd(() => {
            startBtn.color = rgb(0, 255, 0);
            startBtn.scale = vec2(1);
            setCursor("default");
        });

        // Click to start
        startBtn.onClick(() => {
            go("game");
        });

        // Space or Enter to start
        onKeyPress(["space", "enter"], () => {
            go("game");
        });
    });
}
