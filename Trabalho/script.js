const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const resultContainer = document.getElementById('result');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let score = 0;

// Perguntas do quiz
const questions = [
    {
        question: 'Qual é a capital da França?',
        answers: [
            { text: 'Londres', correct: false },
            { text: 'Paris', correct: true },
            { text: 'Berlim', correct: false },
            { text: 'Madri', correct: false }
        ]
    },
    {
        question: 'Quem pintou a Mona Lisa?',
        answers: [
            { text: 'Vincent van Gogh', correct: false },
            { text: 'Pablo Picasso', correct: false },
            { text: 'Leonardo da Vinci', correct: true },
            { text: 'Claude Monet', correct: false }
        ]
    }
    // Adicione mais perguntas se necessário
];

// Adicionando eventos aos botões
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});
restartButton.addEventListener('click', restartGame);

// Inicia o jogo
function startGame() {
    console.log("Iniciando o jogo..."); // Debug
    startButton.classList.add('hidden');
    questionContainer.classList.remove('hidden');
    score = 0; // Reiniciar a pontuação
    currentQuestionIndex = 0; // Reiniciar o índice da pergunta
    setNextQuestion(); // Mostrar a primeira pergunta
}

// Define a próxima pergunta
function setNextQuestion() {
    resetState(); // Limpar respostas anteriores
    console.log("Índice da pergunta atual:", currentQuestionIndex); // Debug
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]); // Mostrar a pergunta
    } else {
        showResult(); // Mostrar o resultado
    }
}

// Exibe a pergunta atual
function showQuestion(question) {
    questionElement.innerText = question.question; // Exibir texto da pergunta
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text; // Texto da resposta
        button.classList.add('btn'); // Adiciona classe ao botão
        button.addEventListener('click', () => selectAnswer(answer)); // Adiciona evento de clique
        answerButtons.appendChild(button); // Adiciona botão ao contêiner
    });
}

// Reseta o estado para a próxima pergunta
function resetState() {
    nextButton.classList.add('hidden'); // Oculta o botão "Próxima Pergunta"
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild); // Limpa as respostas anteriores
    }
}

// Seleciona uma resposta
function selectAnswer(answer) {
    if (answer.correct) {
        score++; // Incrementa a pontuação se a resposta estiver correta
    }
    if (currentQuestionIndex < questions.length - 1) {
        nextButton.classList.remove('hidden'); // Exibe o botão "Próxima Pergunta"
    } else {
        showResult(); // Exibe o resultado
    }
}

// Exibe o resultado final
function showResult() {
    questionContainer.classList.add('hidden'); // Oculta as perguntas
    resultContainer.classList.remove('hidden'); // Mostra o resultado
    scoreElement.innerText = `Você acertou ${score} de ${questions.length} perguntas!`;
}

// Reinicia o jogo
function restartGame() {
    resultContainer.classList.add('hidden'); // Oculta o resultado
    startButton.classList.remove('hidden'); // Mostra o botão "Começar Quiz"
}
