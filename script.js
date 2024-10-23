let correctAnswer = 0;
let selectedOption = null;
let timer;
let score = 0;

function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}

function generateQuestion() {
    clearTimeout(timer);
    selectedOption = null;
    document.getElementById('result').textContent = '';

    const num1 = getRandomNumber(10);
    const num2 = getRandomNumber(10);
    correctAnswer = num1 * num2;

    document.getElementById('question').textContent = `¿Cuánto es ${num1} x ${num2}?`;

    const correctIndex = getRandomNumber(4);
    const options = [];

    for (let i = 0; i < 4; i++) {
        if (i === correctIndex) {
            options.push(correctAnswer);
        } else {
            // Asegúrate de que las respuestas incorrectas no sean iguales a la respuesta correcta
            let wrongAnswer;
            do {
                wrongAnswer = getRandomNumber(100);
            } while (wrongAnswer === correctAnswer);
            options.push(wrongAnswer);
        }
        document.getElementById(`option${i}`).textContent = options[i];
        document.getElementById(`option${i}`).classList.remove('correct', 'wrong'); // Restablecer colores
    }

    // Temporizador de 30 segundos para mostrar la respuesta correcta si no se selecciona ninguna opción
    timer = setTimeout(() => {
        showCorrectAnswer(correctIndex);
    }, 30000);
}

function checkAnswer(optionIndex) {
    if (selectedOption !== null) return; // Evitar múltiples selecciones

    selectedOption = optionIndex;
    clearTimeout(timer); // Detener el temporizador al seleccionar una opción

    const selectedValue = parseInt(document.getElementById(`option${optionIndex}`).textContent); // Obtener valor seleccionado

    if (selectedValue === correctAnswer) {
        document.getElementById('result').textContent = '¡Correcto!';
        score+=1;
        document.getElementById(`option${optionIndex}`).classList.add('correct');
    } else {
        //showCorrectAnswer(); // Mostrar la respuesta correcta si fallas
        score+=-2;
        document.getElementById('result').textContent = `¡Incorrecto! es ${correctAnswer}`;
        document.getElementById(`option${optionIndex}`).classList.add('wrong');
    }

    document.getElementById('score').textContent = `Puntos: ${score}`;

    // Generar la siguiente pregunta después de 3 segundos
    setTimeout(generateQuestion, 3000);
}

function showCorrectAnswer(correctIndex) {
    document.getElementById(`option${correctIndex}`).classList.add('correct');
    document.getElementById('result').textContent = `La respuesta correcta es ${correctAnswer}`;
    // Generar la siguiente pregunta después de 3 segundos
    setTimeout(generateQuestion, 3000);
}

window.onload = generateQuestion;