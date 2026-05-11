import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../screen";
import { GameplayController } from "src/controllerManager";
import { Gameplay } from "./Gameplay";

const spaceship = new Image();
spaceship.src = "../../assets/spaceship.png";

const DEFAULT_TICK_TIME = (1 / 60) * 1000;

export class ExampleGameplay extends Gameplay {
  private playerPosition: { x: number; y: number };
  private movementSpeed: number;

  constructor() {
    super();
    this.playerPosition = { x: SCREEN_WIDTH / 2, y: SCREEN_HEIGHT / 2 };
    this.movementSpeed = 4;
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

    const spaceshipWidth = spaceship.width / 2;
    const spaceshipHeight = spaceship.height / 2;

    this.playerPosition.x = Math.max(this.playerPosition.x, spaceshipWidth);
    this.playerPosition.y = Math.max(this.playerPosition.y, spaceshipHeight);
    this.playerPosition.x = Math.min(
      this.playerPosition.x,
      SCREEN_WIDTH - spaceshipWidth,
    );
    this.playerPosition.y = Math.min(
      this.playerPosition.y,
      SCREEN_HEIGHT - spaceshipHeight,
    );
  }

  render(ctx: CanvasRenderingContext2D): void {
    const playerX = Math.floor(this.playerPosition.x);
    const playerY = Math.floor(this.playerPosition.y);
    ctx.drawImage(
      spaceship,
      Math.floor(playerX - spaceship.width / 2),
      Math.floor(playerY - spaceship.height / 2),
    );
  }
}
