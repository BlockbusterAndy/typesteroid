import { gameState } from "../state.js";

export function addShip() {
    add([
        sprite("ship"),
        pos(center().x, height() - 80),
        anchor("center"),
        rotate(0),
        scale(0.3),
        "ship",
        z(10),
    ]);

    // Ship Rotation Logic
    onUpdate("ship", (s) => {
        if (gameState.currentTarget) {
            // Calculate angle to current target
            // Need to check if target still works/exists
            if (gameState.currentTarget.exists()) {
                const angle = gameState.currentTarget.pos.sub(s.pos).angle();
                s.angle = angle + 90;
            } else {
                gameState.currentTarget = null;
            }

        } else {
            // Idle rotation
            s.angle = lerp(s.angle, 0, dt() * 5);
        }
    });
}
