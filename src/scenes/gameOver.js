export function registerGameOverScene() {
    scene("gameover", (finalScore, finalWpm, finalMaxMult) => {
        add([
            text("GAME OVER"),
            pos(center().x, center().y - 120),
            anchor("center"),
            scale(2),
            color(255, 0, 0),
        ]);

        add([
            text(`Score: ${finalScore}`),
            pos(center().x, center().y - 40),
            anchor("center"),
        ]);

        add([
            text(`Max Multiplier: x${finalMaxMult}`),
            pos(center().x, center().y + 10),
            anchor("center"),
            color(255, 255, 0),
        ]);

        add([
            text(`WPM: ${finalWpm}`),
            pos(center().x, center().y + 60),
            anchor("center"),
        ]);

        add([
            text("Press SPACE to Restart"),
            pos(center().x, center().y + 150),
            anchor("center"),
            opacity(0),
            "flash",
        ]);

        onUpdate("flash", (t) => {
            t.opacity = Math.abs(Math.sin(time() * 3));
        });

        onKeyPress("space", () => {
            go("game");
        });
    });
}
