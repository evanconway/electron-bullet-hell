import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../screen";
import { GameplayController } from "src/controllerManager";
import { Gameplay } from "./Gameplay";

const spaceship = new Image();
spaceship.src = "../../assets/spaceship.png";

const DEFAULT_TICK_TIME = (1 / 60) * 1000;

const audioContext = new AudioContext();
const shootSound = new Audio("../../assets/shoot.wav");
const shootTrack = audioContext.createMediaElementSource(shootSound);
shootTrack.connect(audioContext.destination);

export class ExampleGameplay extends Gameplay {
  private playerPosition: { x: number; y: number };
  private movementSpeed: number;
  private bulletIndex: number;
  private bullets: Map<number, { x: number; y: number }>;
  private bulletSpeed: number;
  private bulletFireCooldown: number;

  constructor() {
    super();
    this.playerPosition = { x: SCREEN_WIDTH / 2, y: SCREEN_HEIGHT / 2 };
    this.movementSpeed = 4;
    this.bulletIndex = 0;
    this.bullets = new Map();
    this.bulletSpeed = 9;
    this.bulletFireCooldown = 0;
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

    this.bulletFireCooldown = Math.max(this.bulletFireCooldown - timePassed, 0);

    if (input.y.down && this.bulletFireCooldown <= 0) {
      shootSound.pause();
      shootSound.currentTime = 0;
      shootSound.play();
      this.bulletFireCooldown += 100;
      this.bullets.set(this.bulletIndex, {
        x: this.playerPosition.x,
        y: this.playerPosition.y - 5,
      });
      this.bulletIndex += 1;
    }

    const bMv = this.bulletSpeed * timeMod;

    this.bullets.forEach((bullet, key) => {
      bullet.y -= bMv;
      if (bullet.y <= -10) {
        this.bullets.delete(key);
      }
    });
  }

  private drawPlayer(ctx: CanvasRenderingContext2D) {
    const playerX = Math.floor(this.playerPosition.x);
    const playerY = Math.floor(this.playerPosition.y);
    ctx.drawImage(
      spaceship,
      Math.floor(playerX - spaceship.width / 2),
      Math.floor(playerY - spaceship.height / 2),
    );
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.strokeStyle = "#fff";
    this.bullets.forEach((bullet) => {
      ctx.beginPath();
      ctx.arc(bullet.x, bullet.y, 2, 0, Math.PI * 2);
      ctx.stroke();
    });
    this.drawPlayer(ctx);
  }
}
