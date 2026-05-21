export enum BulletSource {
  player,
  enemy,
}

class Bullet {
  private y: number;
  private x: number;
  private source: BulletSource;
  private vel: {
    x: number;
    y: number;
  };
  private radius: number;

  constructor(
    x: number,
    y: number,
    source: BulletSource,
    vel: { x: number; y: number },
    radius: number,
  ) {
    this.y = y;
    this.x = x;
    this.source = source;
    this.vel = vel;
    this.radius = radius;
  }

  // TODO: There's probably a better way to do this.
  getData() {
    return {
      x: this.x,
      y: this.y,
      source: this.source,
      vel: this.vel,
      radius: this.radius,
    };
  }

  setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export default Bullet;
