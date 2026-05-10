import { SCREEN_WIDTH, SCREEN_HEIGHT } from "./screen";

const resize = () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  canvas.setAttribute("width", `${SCREEN_WIDTH}`);
  canvas.setAttribute("height", `${SCREEN_HEIGHT}`);
  canvas.style.width = `${SCREEN_WIDTH}px`;
  canvas.style.height = `${SCREEN_HEIGHT}px`;
};

window.addEventListener("resize", resize);
resize();

export const setupCanvas = (
  draw: (params: { frameTime: number; ctx: CanvasRenderingContext2D }) => void,
) => {
  const ctx = (
    document.getElementById("canvas") as HTMLCanvasElement
  ).getContext("2d");

  if (ctx) {
    let lastFrameTime = Date.now();
    const animate = () => {
      const currentFrameTime = Date.now();

      ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

      draw({ frameTime: currentFrameTime - lastFrameTime, ctx });
      lastFrameTime = currentFrameTime;

      window.requestAnimationFrame(animate);
    };

    animate();
  }
};
