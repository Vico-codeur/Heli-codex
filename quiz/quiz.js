const questions = [
    {
        question: "Comment je m'appelle ?",
        reponses: [
            { text: "obed", correct: false},
            { text: "vico", correct: false},
            { text: "exauce", correct: false},
            { text: "vincent", correct: true}
        ]
    },
    {
        question: "Comment je m'appelle ?",
        reponses: [
            { text: "obed", correct: false},
            { text: "vico", correct: true},
            { text: "exauce", correct: false},
            { text: "vincent", correct: false}
        ]  
    },
    {
        question: "Comment je m'appelle ?",
        reponses: [
            { text: "obed", correct: false},
            { text: "vico", correct: false},
            { text: "exauce", correct: true},
            { text: "vincent", correct: false}
        ]
    },
    {
        question: "Comment je m'appelle ?",
        reponses: [
            { text: "obed", correct: true},
            { text: "vico", correct: false},
            { text: "exauce", correct: false},
            { text: "vincent", correct: false}
        ]  
    }
];

const questionElement = document.getElementById("questions");
const reponsesButton = document.getElementById("reponses-buttons");
const nextButton = document.getElementById("next-btn");
const homeButton = document.getElementById("home-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    homeButton.style.display = "none";
    showQuestion(); 
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.reponses.forEach(reponse => {
        const button = document.createElement("button");
        button.innerHTML = reponse.text;
        button.classList.add("btn");
        reponsesButton.appendChild(button);
        if (reponse.correct) {
            button.dataset.correct = reponse.correct;
        }
        button.addEventListener("click", selectReponse);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while (reponsesButton.firstChild) {
        reponsesButton.removeChild(reponsesButton.firstChild);
    }
}

function selectReponse(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(reponsesButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Ton score est de ${score} sur ${questions.length}!`;
    nextButton.innerHTML = "Rejouer";
    nextButton.style.display = "block";
    homeButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();  
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
});

homeButton.addEventListener("click", () => {
    window.location.href = "/index.html";
});

startQuiz();