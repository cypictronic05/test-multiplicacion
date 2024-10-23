let correctAnswer = 0;
let selectedOption = null;
let timer;
let score = 0;

function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}

function generateQuestion() {
    clearTimeout(timer); // Limpiar el temporizador previo
    selectedOption = null;
    document.getElementById('result').textContent = '';

    const num1 = getRandomNumber(10);
    const num2 = getRandomNumber(10);
    correctAnswer = num1 * num2;

    document.getElementById('question').textContent = `¿Cuánto es ${num1} x ${num2}?`;

    const correctIndex = getRandomNumber(4); // Índice de la opción correcta
    const options = [];

    for (let i = 0; i < 4; i++) {
        if (i === correctIndex) {
            options.push(correctAnswer); // Opción correcta
        } else {
            options.push(getRandomNumber(100)); // Otras opciones aleatorias
        }
        document.getElementById(`option${i}`).textContent = options[i];
        document.getElementById(`option${i}`).classList.remove('correct', 'wrong'); // Resetear estilos
    }

    // Temporizador para mostrar la respuesta correcta después de 30 segundos
    timer = setTimeout(() => {
        showCorrectAnswer(correctIndex);
    }, 30000); // 30 segundos
}

function checkAnswer(optionIndex) {
    if (selectedOption !== null) return; // Evitar múltiples selecciones

    selectedOption = optionIndex;
    clearTimeout(timer); // Limpiar el temporizador

    if (document.getElementById(`option${optionIndex}`).textContent == correctAnswer) {
        document.getElementById(`option${optionIndex}`).classList.add('correct');
        document.getElementById('result').textContent = '¡Correcto!';
        score+=1;

        // Esperar 3 segundos y generar la siguiente pregunta
        setTimeout(generateQuestion, 3000);
    } else {
        document.getElementById(`option${optionIndex}`).classList.add('wrong');
        document.getElementById('result').textContent = `¡Incorrecto! es ${correctAnswer}`;
        //showCorrectAnswer();
        score+=-2;
    }
    document.getElementById('score').textContent = `Puntos: ${score}`;
    setTimeout(generateQuestion, 3000);
}

function showCorrectAnswer(correctIndex) {
    document.getElementById(`option${correctIndex}`).classList.add('correct');
    document.getElementById('result').textContent = `La respuesta correcta es ${correctAnswer}`;

    // Después de 3 segundos, generar una nueva pregunta
    setTimeout(generateQuestion, 3000);
}

window.onload = generateQuestion;
