const AXIS_DEADZONE = 0.2;

type ControllerButton = {
  index: number;
  pressed: boolean;
  down: boolean;
};

type ControllerAxis = {
  pressed: boolean;
  down: boolean;
};

type Controller = {
  index: number;
  buttons: ControllerButton[];
  axes: { index: number; positive: ControllerAxis; negative: ControllerAxis }[];
};

const connectedControllers = new Map<number, Controller>();

window.addEventListener("gamepadconnected", ({ gamepad }) => {
  console.log(`gamepad connected: "${gamepad.id}"`);
  console.log(`gamepad index: ${gamepad.index}`);
  const newlyConnectedController: Controller = {
    index: gamepad.index,
    buttons: gamepad.buttons.map((_, index) => ({
      index,
      pressed: false,
      down: false,
    })),
    axes: gamepad.axes.map((_, index) => ({
      index,
      positive: { pressed: false, down: false },
      negative: { pressed: false, down: false },
    })),
  };
  connectedControllers.set(gamepad.index, newlyConnectedController);
});

window.addEventListener("gamepaddisconnected", ({ gamepad }) => {
  console.log(`gamepad disconnected: "${gamepad.id}"`);
  console.log(`gamepad index: ${gamepad.index}`);
  connectedControllers.delete(gamepad.index);
});

class ControllerManager {
  private indexOfLastActiveController: null | number;

  constructor() {
    this.indexOfLastActiveController = null;
  }

  pollGamepadApi() {
    const gamepads = window.navigator.getGamepads().filter((g) => g !== null);

    // clear last active
    const lastActiveGamepad = gamepads.find(
      (g) => g.index === this.indexOfLastActiveController,
    );
    if (lastActiveGamepad === undefined) {
      this.indexOfLastActiveController = null;
    }

    for (const gamepad of gamepads) {
      const controller = connectedControllers.get(gamepad.index);
      if (controller === undefined) continue;
      for (const controllerButton of controller.buttons) {
        const { index } = controllerButton;
        const gamepadButtonIsDown = gamepad.buttons[index].pressed;
        if (gamepadButtonIsDown && !controllerButton.down) {
          controllerButton.pressed = true;
          controllerButton.down = true;
          this.indexOfLastActiveController = controller.index;
        } else if (gamepadButtonIsDown && controllerButton.down) {
          controllerButton.pressed = false;
          controllerButton.down = true;
        } else {
          controllerButton.pressed = false;
          controllerButton.down = false;
        }
      }
      for (const controllerAxis of controller.axes) {
        const { index } = controllerAxis;
        const gamepadAxisValue = gamepad.axes[index];
        const positiveIsDown = gamepadAxisValue > AXIS_DEADZONE;
        const negativeIsDown = gamepadAxisValue < AXIS_DEADZONE * -1;
        if (positiveIsDown && !controllerAxis.positive.down) {
          controllerAxis.positive.pressed = true;
          controllerAxis.positive.down = true;
          controllerAxis.negative.pressed = false;
          controllerAxis.negative.down = false;
          this.indexOfLastActiveController = controller.index;
        } else if (positiveIsDown && controllerAxis.positive.down) {
          controllerAxis.positive.pressed = false;
          controllerAxis.positive.down = true;
          controllerAxis.negative.pressed = false;
          controllerAxis.negative.down = false;
        } else if (negativeIsDown && !controllerAxis.negative.down) {
          controllerAxis.negative.pressed = true;
          controllerAxis.negative.down = true;
          controllerAxis.positive.pressed = false;
          controllerAxis.positive.down = false;
          this.indexOfLastActiveController = controller.index;
        } else if (negativeIsDown && controllerAxis.negative.down) {
          controllerAxis.negative.pressed = false;
          controllerAxis.negative.down = true;
          controllerAxis.positive.pressed = false;
          controllerAxis.positive.down = false;
        } else {
          controllerAxis.positive.pressed = false;
          controllerAxis.positive.down = false;
          controllerAxis.negative.pressed = false;
          controllerAxis.negative.down = false;
        }
      }
    }
  }

  getLastActiveController() {
    if (this.indexOfLastActiveController === null) {
      return null;
    }
    const lastActiveController = connectedControllers.get(
      this.indexOfLastActiveController,
    );
    return lastActiveController !== undefined ? lastActiveController : null;
  }
}

const controllerManager = new ControllerManager();

export default controllerManager;
