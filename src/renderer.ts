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

  const gamepad = controllerManager.getLastActiveGamepad();
  if (gamepad !== null) {
    if (gamepad.up.pressed) {
      console.log("up");
    }
    if (gamepad.down.pressed) {
      console.log("down");
    }
    if (gamepad.left.pressed) {
      console.log("left");
    }
    if (gamepad.right.pressed) {
      console.log("right");
    }
    if (gamepad.start.pressed) {
      console.log("start");
    }
    if (gamepad.select.pressed) {
      console.log("select");
    }
    if (gamepad.a.pressed) {
      console.log("a");
    }
    if (gamepad.b.pressed) {
      console.log("b");
    }
  }

  window.requestAnimationFrame(draw);
};

draw();
