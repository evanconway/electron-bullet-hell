import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../screen";
import { GameplayController } from "../controllerManager";
import { Gameplay } from "./Gameplay";
import Player from "../game/player";
import Bullet from "../game/bullet";
import { DEFAULT_TICK_RATE } from "../constants";
import { playSound, Sound } from "../game/sound";

export class EnemiesGameplay extends Gameplay {
  private player: Player;
  private bullets: Map<number, Bullet>;
  private bulletIndex: number;

  constructor() {
    super();
    this.player = new Player();
    this.bullets = new Map();
    this.bulletIndex = 0;
  }

  private addBullet(newBullet: Bullet) {
    this.bullets.set(this.bulletIndex, newBullet);
    this.bulletIndex += 1;
  }

  update(input: GameplayController, timePassed: number): void {
    const timeUnit = timePassed / DEFAULT_TICK_RATE;

    const playerBullets = this.player.update(input, timePassed);

    if (playerBullets.length > 0) {
      playSound(Sound.playerShoot, 0.2);
    }

    playerBullets.forEach((bullet) => this.addBullet(bullet));

    this.bullets.forEach((bullet, id) => {
      const preMove = bullet.getData();
      const xChange = timeUnit * preMove.vel.x;
      const yChange = timeUnit * preMove.vel.y;
      bullet.setPosition(preMove.x + xChange, preMove.y + yChange);
      const postMove = bullet.getData();
      if (
        postMove.x < 0 - postMove.radius ||
        postMove.x > SCREEN_WIDTH + postMove.radius ||
        postMove.y < 0 - postMove.radius ||
        postMove.y > SCREEN_HEIGHT + postMove.radius
      ) {
        this.bullets.delete(id);
      }
    });
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.strokeStyle = "#fff";
    this.bullets.forEach((bullet) => {
      const { x, y } = bullet.getData();
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.stroke();
    });
    this.player.draw(ctx);
  }
}
