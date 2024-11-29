const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 400;

// Звук
const coinSound = new Audio('coin_sound.mp3');

// Игрок
let player = { x: 50, y: canvas.height - 50, size: 20, speed: 5 };

// Монетки
let coins = [
    { x: 200, y: 300 },
    { x: 400, y: 200 },
    { x: 600, y: 100 }
];

// Очки
let score = 0;

// Функция для перегенерации монет
function generateCoins() {
    while (coins.length < 3) {
        const newCoin = {
            x: Math.random() * (canvas.width - 20), // Убедимся, что монетки не выходят за пределы холста
            y: Math.random() * (canvas.height - 20)
        };
        coins.push(newCoin);
    }
}

// Рисуем игрока
function drawPlayer() {
    ctx.fillStyle = 'red';
    ctx.fillRect(player.x, player.y, player.size, player.size);
}

// Рисуем монетки
function drawCoins() {
    ctx.fillStyle = 'gold';
    coins.forEach((coin) => {
        ctx.beginPath();
        ctx.arc(coin.x, coin.y, 10, 0, Math.PI * 2);
        ctx.fill();
    });
}

// Обновляем игру
function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Очистка экрана

    drawPlayer();
    drawCoins();

    // Проверяем, были ли собраны монеты
    coins = coins.filter((coin) => {
        const collected =
            player.x < coin.x + 10 &&
            player.x + player.size > coin.x - 10 &&
            player.y < coin.y + 10 &&
            player.y + player.size > coin.y - 10;

        if (collected) {
            score += 10;
            coinSound.play();  // Играем звук при сборе монеты
        }

        return !collected;
    });

    // Если все монетки собраны, генерируем новые
    if (coins.length === 0) {
        generateCoins();
    }

    // Отображаем очки
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 20);

    requestAnimationFrame(updateGame);
}

// Управление движением игрока
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') player.x += player.speed;
    if (e.key === 'ArrowLeft') player.x -= player.speed;
    if (e.key === 'ArrowUp') player.y -= player.speed;
    if (e.key === 'ArrowDown') player.y += player.speed;
});

updateGame();
