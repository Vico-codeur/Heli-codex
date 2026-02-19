

// menu-huberger //

  // menu huberger 
  
const icon = document.getElementById("icon");
const burgerMenu = document.getElementById("box");

icon.addEventListener("click", function () {
    burgerMenu.classList.toggle("open");
});





// mini-carte //

let items = document.querySelectorAll(".slider .list .item");
let miniCartes = document.querySelectorAll(".mini-carte .item");
let next = document.querySelector("#next");
let prev = document.querySelector("#prev");

let countItem = items.length;
let itemActive = 0;

next.onclick = function () {
    itemActive++;
    if (itemActive >= countItem) {
        itemActive = 0;
    }
    showSlider();
};

prev.onclick = function () {
    itemActive--;
    if (itemActive < 0) {
        itemActive = countItem - 1;
    }
    showSlider();
};

// auto changement //
let refrechInterval = setInterval(() => {
    next.click();
}, 10000)

function showSlider() {
    let itemActiveOld = document.querySelector(".slider .list .item.active");
    let miniCarteActiveOld = document.querySelector(".mini-carte .item.active");

    itemActiveOld.classList.remove("active");
    miniCarteActiveOld.classList.remove("active");

    items[itemActive].classList.add("active");
    miniCartes[itemActive].classList.add("active");
}

// click sur le mini-carte //
miniCartes.forEach((miniCarte, index) => {
    miniCarte.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    })
})

// section chapitre //

const slides = document.querySelectorAll(".slider-img");
let currentIndex = 0;
let interval;

// fonction pour activer un slide
function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[index].classList.add("active");

    slides[index].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest"
    });

    currentIndex = index;
}

slides.forEach((slide, index) => {
    slide.addEventListener("click", () => {
        showSlide(index);
    });
});

// cookies //
const banner = document.getElementById("cookie-banner");
const acceptBtn = document.getElementById("accept-cookies");
const refuseBtn = document.getElementById("refuse-cookies");

// 🔧 MODE TEST


if (DEV_MODE) {
  localStorage.removeItem("cookieChoice");
}

// Affichage de la bannière
banner.classList.add("show");

// Boutons
acceptBtn.addEventListener("click", () => {
  localStorage.setItem("cookieChoice", "accepted");
  banner.classList.remove("show");
});

refuseBtn.addEventListener("click", () => {
  localStorage.setItem("cookieChoice", "refused");
  banner.classList.remove("show");
});

