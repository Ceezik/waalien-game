class Player {
  static BASE_HEIGHT = 50;

  static GRAVITY = 0.5;
  static JUMP_FORCE = 7;

  constructor(ctx) {
    this.x = 0;
    this.y = 0;
    this.ctx = ctx;

    this.width = 50;
    this.height = Player.BASE_HEIGHT;

    this.yVelocity = 0;
    this.grounded = true;
  }

  spawn(x, y) {
    this.x = x;
    this.y = y;
    this.draw();
  }

  jump() {
    this.height = Player.BASE_HEIGHT;

    if (this.grounded && this.jumpTimer === 0) {
      this.jumpTimer = 1;
      this.yVelocity = -Player.JUMP_FORCE;
    } else if (this.jumpTimer > 0 && this.jumpTimer < 15) {
      this.jumpTimer++;
      this.yVelocity = -Player.JUMP_FORCE - this.jumpTimer / 50;
    }
  }

  crouch() {
    if (this.grounded) {
      this.height = Player.BASE_HEIGHT / 2;
      this.y = ctx.canvas.clientHeight - this.height;
    }
  }

  animate(keys) {
    if (keys["Space"] || keys["ArrowUp"]) {
      this.jump();
    } else {
      this.jumpTimer = 0;

      if (keys["ArrowDown"]) {
        this.crouch();
      } else {
        this.height = 50;
      }
    }

    this.y += this.yVelocity;

    if (this.y + this.height < ctx.canvas.clientHeight) {
      this.yVelocity += Player.GRAVITY;
      this.grounded = false;
    } else {
      this.yVelocity = 0;
      this.grounded = true;
      this.y = ctx.canvas.clientHeight - this.height;
    }

    this.draw();
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.closePath();
  }
}
