class Obstacle {
  static BASE_HEIGHT = 30;
  static BASE_WIDTH = 20;

  constructor(ctx) {
    this.ctx = ctx;
    this.width = Obstacle.BASE_WIDTH * Math.ceil(Math.random() * 3);
    this.height = Obstacle.BASE_HEIGHT * Math.ceil(Math.random() * 2);
  }

  spawn(x, y) {
    this.x = x;
    this.y = y;
    this.draw();
  }

  move(x) {
    this.x += x;
    this.draw();
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = "#e67b5e";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.closePath();
  }
}
