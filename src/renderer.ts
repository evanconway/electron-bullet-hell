import "./index.css";
import controllerManager from "./controllerManager";
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

console.log(
  '👋 This message is being logged by "renderer.ts", included via Vite',
);

const draw = () => {
  controllerManager.pollGamepadApi();
  const lastActiveController = controllerManager.getLastActiveController();
  const index = lastActiveController?.index;
  lastActiveController?.axes.forEach((axis) => {
    if (axis.positive.pressed) {
      console.log(`controller ${index} axis ${axis.index} positive pressed`);
    }
    if (axis.negative.pressed) {
      console.log(`controller ${index} axis ${axis.index} negative pressed`);
    }
  });
  lastActiveController?.buttons.forEach((button) => {
    if (button.pressed) {
      console.log(`controller ${index} button ${button.index} pressed`);
    }
  });
  window.requestAnimationFrame(draw);
};

draw();
