
export function registerStartScene() {
    scene("start", () => {
        // Background
        add([
            sprite("bg_image", { width: width(), height: height() }),
            pos(0, 0),
            z(0),
            color(100, 100, 100),
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

        // --- UI Helper: Button ---
        function createButton(btnText, btnPos, btnWidth, btnHeight, btnColor, onClick) {
            // Container (Rectangle)
            const btn = add([
                rect(btnWidth, btnHeight, { radius: 8 }),
                pos(btnPos),
                anchor("center"),
                area(),
                scale(1),
                color(btnColor),
                outline(2, color(255, 255, 255)), // White outline
            ]);

            // Text Label
            btn.add([
                text(btnText, { size: 24, font: "monospace" }),
                anchor("center"),
                color(0, 0, 0), // Black text for contrast
            ]);

            // Interactions
            btn.onHover(() => {
                btn.scale = vec2(1.1);
                setCursor("pointer");
            });

            btn.onHoverEnd(() => {
                btn.scale = vec2(1);
                setCursor("default");
            });

            btn.onClick(onClick);

            return btn;
        }

        // Start Button
        createButton(
            "START GAME",
            vec2(center().x, center().y + 100),
            280,
            60,
            rgb(0, 255, 0),
            () => go("game")
        );

        // Social Buttons
        createButton(
            "GitHub",
            vec2(center().x - 90, center().y + 180),
            160,
            50,
            rgb(0, 200, 255),
            () => window.open("https://github.com/blockbusterandy", "_blank")
        );

        createButton(
            "LinkedIn",
            vec2(center().x + 90, center().y + 180),
            160,
            50,
            rgb(0, 200, 255),
            () => window.open("https://linkedin.com/in/blockbusterandy", "_blank")
        );

        // Space or Enter to start
        onKeyPress(["space", "enter"], () => {
            go("game");
        });
    });
}
