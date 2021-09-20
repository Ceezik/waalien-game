const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const keys = {};

document.addEventListener("keydown", function (evt) {
  keys[evt.code] = true;
});
document.addEventListener("keyup", function (evt) {
  keys[evt.code] = false;
});

const game = new Game(ctx);

const player = new Player(ctx);
player.spawn(25, canvas.height - player.height);

function render() {
  requestAnimationFrame(render);

  if (game.playing) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    game.play();
    player.animate(keys);

    game.obstacles.forEach((obstacle) => {
      if (
        player.x < obstacle.x + obstacle.width &&
        player.x + player.width > obstacle.x &&
        player.y < obstacle.y + obstacle.height &&
        player.y + player.height > obstacle.y
      ) {
        game.end();
        ctx.fillText(
          `Your score: ${Math.ceil(game.score)}, press enter to play again`,
          25,
          100
        );
      }
    });

    ctx.fillText(`Score: ${Math.ceil(game.score)}`, 25, 25);
  } else {
    if (keys["Enter"]) {
      game.resetState();
    }
  }
}

requestAnimationFrame(render);
