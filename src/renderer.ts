import "./index.css";
import { setupCanvas } from "./canvas";
import controllerManager from "./controllerManager";
import { ExampleGameplay } from "./gameplay/Example";
import { EnemiesGameplay } from "./gameplay/Enemies";

/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.ts` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

const gameplay = new EnemiesGameplay();

let accumulateFrameTime = 0;
const TICK_RATE = (1 / 60) * 1000;

setupCanvas(({ frameTime, ctx }) => {
  accumulateFrameTime += frameTime;

  while (accumulateFrameTime > TICK_RATE) {
    accumulateFrameTime -= TICK_RATE;
    controllerManager.pollGamepadApi();
    const gamepad = controllerManager.getLastActiveGamepad();
    if (gamepad) {
      gameplay.update(gamepad, TICK_RATE);
    }
  }

  gameplay.render(ctx);
});
