
const startScreen = document.getElementById('start-screen')
const infoBar = document.getElementById('info-bar')
const gameGrid = document.getElementById('game-grid')
const winMessage = document.getElementById('win-message')
const timerEl = document.getElementById('timer')
const triesEl = document.getElementById('tries')
const winTimeEl = document.getElementById('win-time')
const winTriesEl = document.getElementById('win-tries')
const restartBtn = document.getElementById('restartBtn')
const diffBtns = document.querySelectorAll('.diffBtn')
const images = [
     "imagines/img1.avif",
    "imagines/img3.jpg",
     "imagines/img9.png",
    "imagines/img4.jpg",
    "imagines/img5.avif",
    "imagines/img6.webp",
    "imagines/img7.webp",
    "imagines/img8.jpg",
];

// === ZMIENNE GRY ===
let flippedCards = []
let tries = 0
let seconds = 0
let timerInterval = null
let boardSize = 4


//Button 
diffBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        boardSize = btn.dataset.size
        startScreen.classList.add('hidden')
        infoBar.classList.remove('hidden')
        gameGrid.classList.remove('hidden')
        startGame(boardSize)
    })
})

//Karty 
function startGame(size){
    gameGrid.innerHTML = ""
    const cards = [...images, ...images]
    cards.sort(() => 0.5 - Math.random())
    
    cards.forEach(value => {
        const card = document.createElement("div")
        card.classList.add("card")
        card.dataset.value = value

        const cardInner = document.createElement("div")
        cardInner.classList.add("card-inner")
      

        const cardFront = document.createElement("div")
        cardFront.classList.add("card-front")
         const logo = document.createElement("img")
        logo.src = "imagines/logo.png"  // ścieżka do logo szkoły
        cardFront.appendChild(logo)

        const cardBack = document.createElement("div")
        cardBack.classList.add("card-back")

        const img = document.createElement("img")
        img.src = value

        cardBack.appendChild(img)
        cardInner.appendChild(cardFront)
        cardInner.appendChild(cardBack)
        card.appendChild(cardInner)
        gameGrid.appendChild(card)

//Mechanika gry
        card.addEventListener('click', () => {
    const cardInner = card.querySelector('.card-inner');
    if (cardInner.classList.contains('flipped') || cardInner.classList.contains('matched') || flippedCards.length === 2) return;

    cardInner.classList.add('flipped')
    flippedCards.push(card)

    if (flippedCards.length === 2) {
        tries++
        triesEl.textContent = tries

        const [firstCard, secondCard] = flippedCards;  //destrution

        if (firstCard.dataset.value === secondCard.dataset.value) {
            firstCard.querySelector('.card-inner').classList.add('matched')
            secondCard.querySelector('.card-inner').classList.add('matched')
            flippedCards = []
        } else {
            setTimeout(() => {
                firstCard.querySelector('.card-inner').classList.remove('flipped')
                secondCard.querySelector('.card-inner').classList.remove('flipped')
                flippedCards = []
            }, 800)
        }
    }
})
    })
}
