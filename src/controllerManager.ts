const connectedGamepadIndexes = new Set<number>();

window.addEventListener("gamepadconnected", ({ gamepad }) => {
  console.log(`gamepad connected: "${gamepad.id}"`);
  console.log(`gamepad index: ${gamepad.index}`);
  connectedGamepadIndexes.add(gamepad.index);
});

window.addEventListener("gamepaddisconnected", ({ gamepad }) => {
  console.log(`gamepad disconnected: "${gamepad.id}"`);
  console.log(`gamepad index: ${gamepad.index}`);
  connectedGamepadIndexes.delete(gamepad.index);
});

class ControllerManager {
  constructor() {}

  logGamepadsWithPressedButtons() {
    const gamepads = window.navigator.getGamepads();
    for (const gpIndex of connectedGamepadIndexes.values()) {
      const gamepad = gamepads[gpIndex];
      const buttonsPressed = gamepad.buttons
        .map((b, i) => ({
          i,
          pressed: b.pressed,
          touched: b.touched,
          value: b.value,
        }))
        .filter((b) => b.pressed);
      const axisOn = gamepad.axes
        .map((a, i) => ({
          i,
          value: a,
        }))
        .filter((a) => a.value !== 0);
      if (buttonsPressed.length > 0 || axisOn.length > 0) {
        console.log({ buttonsPressed, axisOn });
      }
    }
  }
}

const controllerManager = new ControllerManager();

export default controllerManager;
