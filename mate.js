/* =========================
   DATOS DEL JUEGO
========================= */

const pairs = [
    {
        concept: "Integral definida",
        definition: "Calcula el área bajo una curva en un intervalo."
    },
    {
        concept: "Flujo de efectivo",
        definition: "Entrada y salida de dinero de una empresa o inversión."
    },
    {
        concept: "Interés acumulado",
        definition: "Dinero generado por una inversión a lo largo del tiempo."
    },
    {
        concept: "Valor presente",
        definition: "Valor actual de una cantidad que se recibirá en el futuro."
    },
    {
        concept: "Inversión",
        definition: "Dinero destinado para obtener ganancias futuras."
    },
    {
        concept: "Tasa de interés",
        definition: "Porcentaje que determina el crecimiento del dinero."
    }
];

/* =========================
   ELEMENTOS
========================= */

const startScreen = document.getElementById("startScreen");
const gameContainer = document.getElementById("gameContainer");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const playAgainBtn = document.getElementById("playAgainBtn");

const conceptsContainer =
    document.getElementById("conceptsContainer");

const definitionsContainer =
    document.getElementById("definitionsContainer");

const scoreElement =
    document.getElementById("score");

const timerElement =
    document.getElementById("timer");

const progressBar =
    document.getElementById("progressBar");

const progressText =
    document.getElementById("progressText");

const resultModal =
    document.getElementById("resultModal");

const finalScore =
    document.getElementById("finalScore");

const finalTime =
    document.getElementById("finalTime");

const finalAccuracy =
    document.getElementById("finalAccuracy");

const finalRank =
    document.getElementById("finalRank");

const quizButtons =
    document.querySelectorAll(".quiz-btn");

const quizResult =
    document.getElementById("quizResult");

/* =========================
   VARIABLES
========================= */

let selectedConcept = null;

let score = 0;
let matches = 0;
let attempts = 0;

let timer = null;
let timeLeft = 60;

/* =========================
   UTILIDADES
========================= */

function shuffle(array){

    const copy = [...array];

    for(let i = copy.length - 1; i > 0; i--){

        const j = Math.floor(
            Math.random() * (i + 1)
        );

        [copy[i], copy[j]] =
        [copy[j], copy[i]];
    }

    return copy;
}

/* =========================
   INICIAR JUEGO
========================= */

function startGame(){

    startScreen.classList.add("hidden");
    gameContainer.classList.remove("hidden");

    resetGame();
}

/* =========================
   REINICIAR
========================= */

function resetGame(){

    score = 0;
    matches = 0;
    attempts = 0;

    timeLeft = 60;

    selectedConcept = null;

    scoreElement.textContent = "0";

    progressBar.style.width = "0%";
    progressText.textContent = "0%";

    quizResult.textContent = "";

    resultModal.classList.add("hidden");
    
    quizButtons.forEach(btn => {

    btn.style.opacity = "1";

});

    createBoard();

    startTimer();
}

/* =========================
   TEMPORIZADOR
========================= */

function startTimer(){

    clearInterval(timer);

    timerElement.textContent = timeLeft;

    timer = setInterval(() => {

        timeLeft--;

        timerElement.textContent =
        timeLeft;

        if(timeLeft <= 0){

            clearInterval(timer);

            finishGame();
        }

    },1000);
}

/* =========================
   TABLERO
========================= */

function createBoard(){

    conceptsContainer.innerHTML = "";
    definitionsContainer.innerHTML = "";

    const shuffledDefinitions =
    shuffle(pairs);

    pairs.forEach(pair => {

        const card =
        document.createElement("div");

        card.className = "card";

        card.textContent =
        pair.concept;

        card.dataset.definition =
        pair.definition;

        card.addEventListener(
            "click",
            () => selectConcept(card)
        );

        conceptsContainer.appendChild(card);

    });

    shuffledDefinitions.forEach(pair => {

        const card =
        document.createElement("div");

        card.className = "card";

        card.textContent =
        pair.definition;

        card.dataset.definition =
        pair.definition;

        card.addEventListener(
            "click",
            () => checkMatch(card)
        );

        definitionsContainer.appendChild(card);

    });

}

/* =========================
   SELECCIONAR CONCEPTO
========================= */

function selectConcept(card){

    if(card.classList.contains("correct"))
        return;

    document
    .querySelectorAll("#conceptsContainer .card")
    .forEach(c =>
        c.classList.remove("selected")
    );

    card.classList.add("selected");

    selectedConcept = card;
}

/* =========================
   COMPROBAR
========================= */

function checkMatch(definitionCard){

    if(!selectedConcept)
        return;

    if(
        definitionCard.classList.contains("correct")
    ) return;

    attempts++;

    const correct =
        selectedConcept.dataset.definition ===
        definitionCard.dataset.definition;

    if(correct){

        selectedConcept.classList.remove(
            "selected"
        );

        selectedConcept.classList.add(
            "correct"
        );

        definitionCard.classList.add(
            "correct"
        );

        score += 10;
        matches++;

        scoreElement.textContent =
        score;

        updateProgress();

        if(matches === pairs.length){

            clearInterval(timer);

            setTimeout(() => {

                finishGame();

            },500);
        }

    }else{

        const conceptCard = selectedConcept;
        const defCard = definitionCard;

        conceptCard.classList.add("wrong");
        defCard.classList.add("wrong");

        setTimeout(() => {

            conceptCard.classList.remove("wrong");
            defCard.classList.remove("wrong");

        },3000);
    }

    selectedConcept?.classList.remove(
        "selected"
    );

    selectedConcept = null;
}

/* =========================
   PROGRESO
========================= */

function updateProgress(){

    const progress =
    (matches / pairs.length) * 100;

    progressBar.style.width =
    progress + "%";

    progressText.textContent =
    Math.round(progress) + "%";
}

/* =========================
   RANGO
========================= */

function getRank(){

    if(score >= 60)
        return "🥇 Oro";

    if(score >= 40)
        return "🥈 Plata";

    return "🥉 Bronce";
}

/* =========================
   FINALIZAR
========================= */

function finishGame(){

    clearInterval(timer);

    let accuracy = 0;

    if(attempts > 0){

        accuracy =
        Math.round(
            (matches / attempts) * 100
        );
    }

    finalScore.textContent =
    score;

    finalTime.textContent =
    timeLeft + " s";

    finalAccuracy.textContent =
    accuracy + "%";

    finalRank.textContent =
    getRank();

    resultModal.classList.remove(
        "hidden"
    );
}

/* =========================
   QUIZ FINAL
========================= */

quizButtons.forEach(button => {

    button.addEventListener("click", () => {

        quizButtons.forEach(btn => {

            btn.style.opacity = ".7";

        });

        button.style.opacity = "1";

        if(
    button.dataset.correct === "true"
){

            quizResult.textContent =
            "✅ Correcto. Las integrales permiten modelar acumulaciones continuas, crecimiento de inversiones y análisis financiero.";

            quizResult.style.color =
            "#16a34a";

        }else{

            quizResult.textContent =
            "❌ Incorrecto. Las integrales son herramientas matemáticas para analizar acumulaciones y variaciones continuas en las finanzas.";

            quizResult.style.color =
            "#dc2626";
        }

    });

});

/* =========================
   EVENTOS
========================= */

startBtn.addEventListener(
    "click",
    startGame
);

restartBtn.addEventListener(
    "click",
    resetGame
);

playAgainBtn.addEventListener(
    "click",
    resetGame
);