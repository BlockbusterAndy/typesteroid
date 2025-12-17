import kaboom from "kaboom";
import { loadAssets } from "./loader.js";
import { registerGameScene } from "./scenes/game.js";
import { registerGameOverScene } from "./scenes/gameOver.js";
import { registerStartScene } from "./scenes/start.js";

// Initialize Kaboom
kaboom({
    background: [20, 20, 20], // Fallback
    font: "monospace",
    debug: true,
});

// Load Assets
loadAssets();

// Register Scenes
registerGameScene();
registerGameOverScene();
registerStartScene();

// Start Game
go("start");