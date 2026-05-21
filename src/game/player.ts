import { DEFAULT_TICK_RATE } from "../constants";
import { GameplayController } from "../controllerManager";
import Bullet, { BulletSource } from "./bullet";

class Player {
  private y: number;
  private x: number;
  private moveSpeed: number;
  private bulletFireCooldown: number;

  constructor() {
    this.y = 0;
    this.x = 0;
    this.moveSpeed = 5;
    this.bulletFireCooldown = 0;
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }

  update(input: GameplayController, timePassed: number) {
    const moveAmount = (timePassed / DEFAULT_TICK_RATE) * this.moveSpeed;

    const moveUp = input.up.down ? moveAmount * -1 : 0;
    const moveDown = input.down.down ? moveAmount : 0;
    const moveLeft = input.left.down ? moveAmount * -1 : 0;
    const moveRight = input.right.down ? moveAmount : 0;

    const yMove = moveUp + moveDown;
    const xMove = moveLeft + moveRight;

    this.y += yMove;
    this.x += xMove;

    this.bulletFireCooldown = Math.max(this.bulletFireCooldown - timePassed, 0);

    const bulletResults: Bullet[] = [];

    if (input.y.down && this.bulletFireCooldown <= 0) {
      this.bulletFireCooldown += 100;
      bulletResults.push(
        new Bullet(
          this.x,
          this.y - 5,
          BulletSource.player,
          {
            x: 0,
            y: -10,
          },
          10,
        ),
      );
    }

    return bulletResults;
  }
}

export default Player;
