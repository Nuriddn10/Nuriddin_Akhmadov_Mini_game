let currentQuestionIndex = 0;
const questions = [
    { question: "What is 5 + 3?", answer: 8 },
    { question: "What is 9 - 4?", answer: 5 },
    { question: "What is 6 * 3?", answer: 18 },
    { question: "What is 12 / 4?", answer: 3 }
];

function displayQuestion() {
    // Проверка индекса
    if (currentQuestionIndex < questions.length) {
        const questionElement = document.getElementById('question');
        questionElement.innerText = questions[currentQuestionIndex].question;
    } else {
        alert("Congratulations! You've completed all the puzzles.");
        window.location.href = "menu.html";  // Возвращаем в меню
    }
}

function checkAnswer(answer) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    
    // Проверка правильности ответа
    console.log(`Player's answer: ${answer}, Correct answer: ${correctAnswer}`);  // Лог для отладки

    if (answer === correctAnswer) {
        alert("Correct! Well done.");
        currentQuestionIndex++; // Переход к следующему вопросу

        if (currentQuestionIndex < questions.length) {
            displayQuestion();  // Отображаем следующий вопрос
        } else {
            alert("Congratulations! You've completed all the puzzles.");
            window.location.href = "menu.html";  // Возвращаем в меню
        }
    } else {
        alert("Incorrect! Try again.");
    }
}

function goBack() {
    window.location.href = "menu.html";  // Возврат в меню
}

displayQuestion();
