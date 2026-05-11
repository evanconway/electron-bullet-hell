import type { GameplayController } from "src/controllerManager";

export class Gameplay {
  constructor() {}

  update(input: GameplayController, timePassed: number) {
    console.log("update not implemented:", input, timePassed);
  }

  render(ctx: CanvasRenderingContext2D) {
    console.log("render not implemented:", ctx);
  }
}
