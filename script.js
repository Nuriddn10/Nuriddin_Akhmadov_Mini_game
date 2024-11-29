document.getElementById('registration-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Остановить отправку формы
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Плавный переход (пример)
    alert('Registration successful! Transitioning to game...');
    window.location.href = '/game.html';
});
