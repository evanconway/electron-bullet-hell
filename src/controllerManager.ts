const AXIS_DEADZONE = 0.2;

type GameInput = { pressed: boolean; down: boolean };

type Controller = {
  index: number;
  buttons: { index: number; input: GameInput }[];
  axes: { index: number; positive: GameInput; negative: GameInput }[];
};

export type GameplayController = {
  up: GameInput;
  down: GameInput;
  left: GameInput;
  right: GameInput;
  start: GameInput;
  select: GameInput;
  a: GameInput;
  b: GameInput;
  y: GameInput;
  x: GameInput;
};

const connectedControllers = new Map<number, Controller>();

window.addEventListener("gamepadconnected", ({ gamepad }) => {
  console.log(`gamepad connected: "${gamepad.id}"`);
  console.log(`gamepad index: ${gamepad.index}`);
  const newlyConnectedController: Controller = {
    index: gamepad.index,
    buttons: gamepad.buttons.map((_, index) => ({
      index,
      input: {
        pressed: false,
        down: false,
      },
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
        if (gamepadButtonIsDown && !controllerButton.input.down) {
          controllerButton.input.pressed = true;
          controllerButton.input.down = true;
          this.indexOfLastActiveController = controller.index;
        } else if (gamepadButtonIsDown && controllerButton.input.down) {
          controllerButton.input.pressed = false;
          controllerButton.input.down = true;
        } else {
          controllerButton.input.pressed = false;
          controllerButton.input.down = false;
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

  getLastActiveGamepad(): GameplayController | null {
    const controller = this.getLastActiveController();
    if (controller === null) return null;
    const gameplayController: GameplayController = {
      up: controller.axes[1].negative,
      down: controller.axes[1].positive,
      left: controller.axes[0].negative,
      right: controller.axes[0].positive,
      start: controller.buttons[9].input,
      select: controller.buttons[8].input,
      a: controller.buttons[1].input,
      b: controller.buttons[0].input,
      y: controller.buttons[2].input,
      x: controller.buttons[3].input,
    };
    return gameplayController;
  }
}

const controllerManager = new ControllerManager();

export default controllerManager;
