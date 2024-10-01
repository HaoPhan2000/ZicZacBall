const content = document.getElementById("content");
const retryButton = document.getElementById("retryButton");
const playButton = document.getElementById("playButton");
var contentWidth = content.offsetWidth;
var contentHeight = content.offsetHeight;
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.width = contentWidth;
canvas.height = contentHeight;
const bg = new Image();
bg.src = "images/bg.jpg";
let locationx = contentWidth / 4; // Cố định vị trí nhân vật (1/4 chiều rộng)
let locationy = contentHeight / 2; // cố định vị trí nhân vật (1/2 chiều cao)
let score = 0;
let dy = 10; // Tốc độ theo trục y
let scrollX = 0; // Tọa độ cuộn nền
const move_speed = 10; // tốc độ di chuyển của vật
let obstacles = []; // mảng chứa vật cản
let startGame = false;

class Obstacle {
  constructor(size, quantity, distance, minGap, maxGap) {
    this.size = size;
    this.quantity = quantity;
    this.distance = distance;
    this.minGap = minGap;
    this.maxGap = maxGap;
  }
  draw() {
    if (this.quantity <= 0) {
      return;
    }
    if (this.quantity === 1) {
    }
    if (this.quantity === 2) {
    }
    if (this.quantity >= 2) {
    }
    return;
  }
}
class Player {
  constructor(x, y, radius, lineWidth, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.lineWidth = lineWidth;
    this.color = color;
  }
  draw() {
    context.beginPath();
    context.lineWidth = this.lineWidth;
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.strokeStyle = this.color;
    context.stroke();
    context.fillStyle = "rgba(159, 33, 104,0.2)"; // Màu của tam giác
    context.fill();
  }
}

canvas.addEventListener("mousedown", (event) => {
  if (startGame) {
    controlGame();
  }
});
function controlGame() {
  dy = -dy;
}
function detectCollision() {
  console.log("vào detectCollision");
  if (locationy + 32 > contentHeight || locationy - 32 < 0) {
    endGame();
  }
}
function endGame() {
  startGame = false;
  score = 0;
  locationy = contentHeight / 2;
  scrollX = 0;
  dy = 10;
  obstacles = [];
  retryButton.style.display = "block";
}
function animate() {
  if (!startGame) return;
  console.log(" render animate");
  requestAnimationFrame(animate);
  context.clearRect(0, 0, contentWidth, contentHeight);

  // Vẽ nền lần đầu ở vị trí (scrollX)
  context.drawImage(bg, -scrollX, 0, contentWidth, contentHeight);

  // Vẽ nền thứ hai để nối tiếp nền đầu (cuộn liên tục)
  context.drawImage(bg, contentWidth - scrollX, 0, contentWidth, contentHeight);

  // Di chuyển nền để tạo cảm giác cuộn
  scrollX += move_speed;
  // Lặp lại nền khi cuộn đến cuối
  if (scrollX >= contentWidth) {
    scrollX = 0; // Đặt lại `scrollX` để lặp lại nền
  }

  // Vẽ bóng (vị trí cố định)
  const player = new Player(locationx, locationy, 30, 2, "#fa34a3");
  player.draw();

  score += 0.1;
  context.font = "30px Arial";
  context.fillStyle = "white";
  context.fillText("Score: " + score.toFixed(0), 10, 50);

  // Di chuyển bóng theo trục y
  locationy += dy;
  detectCollision();
}
function waitingGame() {
  console.log("vào waitingGame");
  context.drawImage(bg, -scrollX, 0, contentWidth, contentHeight);
  const player = new Player(locationx, locationy, 30, 2, "#fa34a3");
  player.draw();
  playButton.style.display = "block";
}
retryButton.addEventListener("click", () => {
  startGame = true;
  retryButton.style.display = "none";
  countDownTime();
});
playButton.addEventListener("click", () => {
  startGame = true;
  playButton.style.display = "none";
  countDownTime();
});
function countDownTime() {
  let time = 3;
  const countdown = setInterval(() => {
    context.drawImage(bg, -scrollX, 0, contentWidth, contentHeight);
    const player = new Player(locationx, locationy, 30, 2, "#fa34a3");
    player.draw();
    if (time > 0) {
      context.font = "30px Arial";
      context.fillStyle = "white";
      context.fillText(time, contentWidth / 2, contentHeight / 3);
      time -= 1;
    } else {
      clearInterval(countdown);
      animate();
    }
  }, 1000);
}

window.onload = () => {
  waitingGame();
};
window.addEventListener("resize", () => {
  contentWidth = content.offsetWidth;
  contentHeight = content.offsetHeight;

  canvas.width = contentWidth;
  canvas.height = contentHeight;
  locationx = contentWidth / 4;
  locationy = contentHeight / 2;
  context.clearRect(0, 0, contentWidth, contentHeight);
  context.drawImage(bg, -scrollX, 0, contentWidth, contentHeight);
  const player = new Player(locationx, locationy, 30, 2, "#fa34a3");
  player.draw();
});

// const content = document.getElementById("content");
// const contentWidth = content.offsetWidth;
// const contentHeight = content.offsetHeight;
// const canvas = document.getElementById("canvas");
// const context = canvas.getContext("2d");
// canvas.width = contentWidth;
// canvas.height = contentHeight;

// var startGame = false;
// let score = 0;
// var bg = new Image();
// bg.src = "images/bg.png";

// var locationx = contentWidth / 10;  // Vị trí ban đầu của bóng
// var locationy = contentHeight / 2;
// var dx = 3;  // Tốc độ theo trục x
// var dy = 3;  // Tốc độ theo trục y, lúc đầu di chuyển xuống
// const move_speed = 5;

// // Mảng chứa các vật cản
// let obstacles = [];

// canvas.addEventListener("mousedown", (event) => {
//   // Đổi hướng bóng khi nhấn chuột
//   dy = -dy;

//   if (!startGame) {
//     startGame = true;
//     animate();
//     play();
//   }
// });

// // Hàm tạo vật cản
// function createObstacles() {
//   let gap = 500;  // Khoảng trống để bóng đi qua
//   let obstacleHeight = Math.floor(Math.random() * (contentHeight - gap));

//   // Vật cản gồm hai phần trên và dưới, để tạo khoảng trống ở giữa
//   obstacles.push({
//     x: contentWidth,
//     topY: 0,
//     topHeight: obstacleHeight,
//     bottomY: obstacleHeight + gap,
//     bottomHeight: contentHeight - (obstacleHeight + gap),
//     width: 50,
//   });
// }

// function drawObstacles() {
//   obstacles.forEach((obstacle, index) => {
//     // Vẽ phần trên
//     context.fillStyle = "green";
//     context.fillRect(obstacle.x, obstacle.topY, obstacle.width, obstacle.topHeight);

//     // Vẽ phần dưới
//     context.fillRect(obstacle.x, obstacle.bottomY, obstacle.width, obstacle.bottomHeight);

//     // Di chuyển vật cản về phía bên trái
//     obstacle.x -= dx;

//     // Xóa vật cản khỏi mảng khi nó ra khỏi màn hình
//     if (obstacle.x + obstacle.width < 0) {
//       obstacles.splice(index, 1);
//     }
//   });
// }

// function detectCollision() {
//   for (let i = 0; i < obstacles.length; i++) {
//     let obstacle = obstacles[i];

//     // Kiểm tra va chạm với vật cản
//     if (
//       (locationx + 30 > obstacle.x && locationx - 30 < obstacle.x + obstacle.width) &&
//       (locationy - 30 < obstacle.topHeight || locationy + 30 > obstacle.bottomY)
//     ) {
//       endGame();  // Kết thúc trò chơi nếu có va chạm
//     }
//   }

//   // Kiểm tra va chạm với cạnh trên và dưới của canvas
//   if (locationy + 30 > contentHeight || locationy - 30 < 0) {
//     endGame();
//   }
// }

// function animate() {
//   if (!startGame) return;  // Dừng game nếu `startGame` là false

//   requestAnimationFrame(animate);
//   context.clearRect(0, 0, contentWidth, contentHeight);
//   context.drawImage(bg, 0, 0, contentWidth, contentHeight);

//   // Vẽ bóng
//   context.beginPath();
//   context.arc(locationx, locationy, 30, 0, Math.PI * 2);
//   context.strokeStyle = "#fa34a3";
//   context.stroke();

//   // Di chuyển bóng
//   locationx += dx;
//   locationy += dy;

//   // Vẽ và cập nhật vật cản
//   drawObstacles();
//   detectCollision();
// }

// function play() {
//   console.log("chơi game");

//   // Tạo vật cản mới mỗi 2 giây
//   setInterval(() => {
//     createObstacles();
//   }, 2000);
// }

// function endGame() {
//   startGame = false;
//   alert("Game Over!");
//   // Reset game
//   locationx = contentWidth / 10;
//   locationy = contentHeight / 2;
//   obstacles = [];
// }
