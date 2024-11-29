const canvas = document.getElementById('raceCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 400;

// Машина игрока
let car = {
    x: canvas.width / 2 - 20,
    y: canvas.height - 60,
    width: 40,
    height: 60,
    speed: 5
};

// Препятствия
let obstacles = [
    { x: Math.random() * canvas.width, y: -50, width: 40, height: 40, speed: 4 },
    { x: Math.random() * canvas.width, y: -150, width: 40, height: 40, speed: 4 }
];

let score = 0;

function drawCar() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(car.x, car.y, car.width, car.height);
}

function drawObstacles() {
    ctx.fillStyle = 'black';
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        obstacle.y += obstacle.speed;

        // Если препятствие выходит за экран, сбрасываем его
        if (obstacle.y > canvas.height) {
            obstacle.y = -40;
            obstacle.x = Math.random() * canvas.width;
            score += 10;
        }

        // Проверка столкновения
        if (
            car.x < obstacle.x + obstacle.width &&
            car.x + car.width > obstacle.x &&
            car.y < obstacle.y + obstacle.height &&
            car.y + car.height > obstacle.y
        ) {
            alert("Game Over! Your score: " + score);
            document.location.reload();
        }
    });
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Очистить холст

    drawCar();
    drawObstacles();

    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 20);

    requestAnimationFrame(updateGame);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && car.x > 0) car.x -= car.speed;
    if (e.key === 'ArrowRight' && car.x < canvas.width - car.width) car.x += car.speed;
});

updateGame();
