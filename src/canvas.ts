import controllerManager from "./controllerManager";

const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 600;

export const setupCanvas = () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;

  canvas.setAttribute("width", `${SCREEN_WIDTH}`);
  canvas.setAttribute("height", `${SCREEN_HEIGHT}`);
  canvas.style.width = `${SCREEN_WIDTH}px`;
  canvas.style.height = `${SCREEN_HEIGHT}px`;

  const ctx = canvas.getContext("2d");

  const playerPos = { x: SCREEN_WIDTH / 2, y: SCREEN_HEIGHT / 2 };

  if (ctx) {
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

        if (gamepad.up.down) {
          playerPos.y -= 1;
        }
        if (gamepad.down.down) {
          playerPos.y += 1;
        }
        if (gamepad.left.down) {
          playerPos.x -= 1;
        }
        if (gamepad.right.down) {
          playerPos.x += 1;
        }
      }

      ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

      ctx.strokeStyle = "#fff";
      ctx.beginPath();
      ctx.arc(playerPos.x, playerPos.y, 10, 0, Math.PI * 2);
      ctx.stroke();

      window.requestAnimationFrame(draw);
    };

    draw();
  }
};
