export function setupUI() {
    const scoreLabel = add([
        text("Score: 0"),
        pos(24, 24),
        fixed(),
        color(255, 255, 255),
        { value: 0 },
        z(100),
    ]);

    const wpmLabel = add([
        text("WPM: 0"),
        pos(24, 64),
        fixed(),
        color(255, 255, 255),
        z(100),
    ]);

    const multiplierLabel = add([
        text("Multiplier: 1x"),
        pos(24, 104),
        fixed(),
        color(255, 255, 0),
        z(100),
    ]);

    const livesLabel = add([
        text("Lives: 3"),
        pos(width() - 24, 24),
        anchor("topright"),
        fixed(),
        color(255, 100, 100),
        z(100),
    ]);

    const levelLabel = add([
        text("Level: 1"),
        pos(center().x, 24),
        anchor("top"),
        fixed(),
        color(100, 255, 100),
        z(100),
    ]);

    return {
        scoreLabel,
        wpmLabel,
        multiplierLabel,
        livesLabel,
        levelLabel,
    };
}

export function updateUI(ui, state) {
    ui.scoreLabel.text = `Score: ${state.score}`;
    ui.wpmLabel.text = `WPM: ${state.wpm}`;
    ui.multiplierLabel.text = `Multiplier: ${state.multiplier}x`;
    ui.livesLabel.text = `Lives: ${state.lives}`;
    ui.levelLabel.text = `Level: ${state.level}`;
}
