import { SCREEN_WIDTH, SCREEN_HEIGHT } from "./screen";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas.setAttribute("width", `${SCREEN_WIDTH}`);
canvas.setAttribute("height", `${SCREEN_HEIGHT}`);

const resize = () => {
  const scaleWidth = Math.floor(window.innerWidth / SCREEN_WIDTH);
  const scaleHeight = Math.floor(window.innerHeight / SCREEN_HEIGHT);
  const resolutionScale = Math.max(Math.min(scaleWidth, scaleHeight), 1);

  canvas.style.width = `${resolutionScale * SCREEN_WIDTH}px`;
  canvas.style.height = `${resolutionScale * SCREEN_HEIGHT}px`;
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
