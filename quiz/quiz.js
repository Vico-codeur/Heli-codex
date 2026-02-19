const questions = [
    {
        question: "Qui est le personnage principal dans Assassin’s Creed Unity ?",
        reponses: [
            { text: "Ezio Auditore", correct: false},
            { text: "Edward Kenway", correct: false},
            { text: "Connor", correct: false},
            { text: "Arno Dorian", correct: true}
        ]
    },
    {
        question: "Dans quelle ville se déroule principalement le jeu ?",
        reponses: [
            { text: "Londres", correct: false},
            { text: "Paris", correct: true},
            { text: "Berlin", correct: false},
            { text: "Rome", correct: false}
        ]  
    },
    {
        question: "À quelle période historique se déroule le jeu ?",
        reponses: [
            { text: "Moyen Âge", correct: false},
            { text: "Première Guerre Mondiale", correct: false},
            { text: "Révolution française", correct: true},
            { text: "Rennaissance italienne", correct: false}
        ]
    },
    {
        question: "Qui est l’ennemie principale d’Arno au début du jeu ?",
        reponses: [
            { text: "Germain", correct: true},
            { text: "Cesare Borgia", correct: false},
            { text: "Haytham Kenway", correct: false},
            { text: "Shay", correct: false}
        ]  
    },
    {
        question: "Quel est le nom de l’Ordre ennemi des Assassins ?",
        reponses: [
            { text: "Les Chevaliers", correct: false},
            { text: "Les Templiers", correct: true},
            { text: "Les Anciens", correct: false},
            { text: "Les Gardiens", correct: false}
        ]
    },
    {
        question: "Quel est le nom du père adoptif d’Arno ?",
        reponses: [
            { text: "François de la Serre", correct: true},
            { text: "Pierre Bellec", correct: false},
            { text: "Napoléon Bonaparte", correct: false},
            { text: "Charles Dorian", correct: false}
        ]  
    },
    {
        question: "Quelle nouveauté importante apparaît dans Unity ?",
        reponses: [
            { text: "Les Combats navals", correct: false},
            { text: "Les armes futuristes", correct: false},
            { text: "Le mode coopératif en ligne", correct: true},
            { text: "Les pouvoirs magiques", correct: false}
        ]
    },
    {
        question: "Quelle arme est emblématique des Assassins dans Unity ?",
        reponses: [
            { text: "La Lame secrète", correct: true},
            { text: "La Lance", correct: false},
            { text: "Le Fusil", correct: false},
            { text: "Le Marteau", correct: false}
        ]  
    },
    {
        question: "Quel bâtiment célèbre peut-on escalader dans le jeu ?",
        reponses: [
            { text: "La tour de londres", correct: false},
            { text: "Le Colisée", correct: false},
            { text: "Notre-Dame de Paris", correct: true},
            { text: "La Tour Eiffel", correct: false}
        ]
    },
    {
        question: "Qui est l’éditeur du jeu Assassin’s Creed Unity ?",
        reponses: [
            { text: "Ubistor", correct: true},
            { text: "Rockstar", correct: false},
            { text: "Activision", correct: false},
            { text: "EA", correct: false}
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

