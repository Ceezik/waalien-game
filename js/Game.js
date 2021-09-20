class Game {
  static OBSTACLE_COOLDOWN = 160;
  static MAX_SPEED = 10;

  constructor(ctx) {
    this.ctx = ctx;

    this.resetState();
  }

  resetState() {
    this.playing = true;
    this.obstacles = [];
    this.obstacleCooldown = 0;
    this.score = 0;
    this.speed = 2;
  }

  getRandomObstacleCooldown() {
    return (
      Math.floor(
        Math.random() *
          (Game.OBSTACLE_COOLDOWN * 0.5 -
            Game.OBSTACLE_COOLDOWN -
            this.speed * 2)
      ) + Game.OBSTACLE_COOLDOWN
    );
  }

  play() {
    if (this.obstacleCooldown === 0) {
      const obstacle = new Obstacle(ctx);
      obstacle.spawn(
        ctx.canvas.clientWidth,
        ctx.canvas.clientHeight - obstacle.height
      );
      this.obstacles.push(obstacle);

      this.obstacleCooldown = this.getRandomObstacleCooldown();
    }

    this.obstacles.forEach((obstacle) => obstacle.move(-1.5 * this.speed));
    this.obstacleCooldown--;

    this.score += 0.25;

    if (this.speed < Game.MAX_SPEED) this.speed += 0.002;
  }

  end() {
    this.playing = false;
  }
}
