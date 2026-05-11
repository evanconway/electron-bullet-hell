import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../screen";
import { GameplayController } from "src/controllerManager";
import { Gameplay } from "./Gameplay";

const DEFAULT_TICK_TIME = (1 / 60) * 1000;

export class ExampleGameplay extends Gameplay {
  private playerPosition: { x: number; y: number };
  private movementSpeed: number;

  constructor() {
    super();
    this.playerPosition = { x: SCREEN_WIDTH / 2, y: SCREEN_HEIGHT / 2 };
    this.movementSpeed = 10;
  }

  update(input: GameplayController, timePassed: number): void {
    const timeMod = timePassed / DEFAULT_TICK_TIME;
    const mv = this.movementSpeed * timeMod;
    if (input.up.down) {
      this.playerPosition.y -= mv;
    }
    if (input.down.down) {
      this.playerPosition.y += mv;
    }
    if (input.left.down) {
      this.playerPosition.x -= mv;
    }
    if (input.right.down) {
      this.playerPosition.x += mv;
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.strokeStyle = "#fff";
    ctx.beginPath();
    ctx.arc(this.playerPosition.x, this.playerPosition.y, 10, 0, Math.PI * 2);
    ctx.stroke();
  }
}
