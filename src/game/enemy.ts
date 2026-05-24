const sprite = new Image();
sprite.src = "../../assets/enemyship.png";

class Enemy {
  private x: number;
  private y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      sprite,
      Math.floor(this.x - sprite.width / 2),
      Math.floor(this.y - sprite.height / 2),
    );
  }
}

export default Enemy;
