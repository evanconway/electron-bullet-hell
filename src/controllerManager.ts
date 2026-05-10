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
      console.log(
        gamepad.buttons.reduce(
          (result, button) => button.pressed || result,
          false,
        ),
      );
    }
  }
}

const controllerManager = new ControllerManager();

export default controllerManager;
