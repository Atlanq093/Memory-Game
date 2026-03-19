
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
        gameGrid.classList.remove('hidden')
        infoBar.style.display = 'flex'
        startGame(boardSize)
    })
})

//Karty 
function startGame(size){
    gameGrid.innerHTML = "";
    flippedCards = [];
    tries = 0;
    triesEl.innerHTML = `Próby: 0`;
    
     const cards = [...images, ...images] //shuffle method 
    cards.sort(() => 0.5 - Math.random())
    //Tworzenie kart
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
  //Składanie kart 
        cardBack.appendChild(img)
        cardInner.appendChild(cardFront)
        cardInner.appendChild(cardBack)
        card.appendChild(cardInner)
        gameGrid.appendChild(card)
         seconds = 120
//Mechanika gry
    card.addEventListener('click', () => {
            const inner = card.querySelector('.card-inner')
            if (inner.classList.contains('flipped') || inner.classList.contains('matched') || flippedCards.length === 2) return

            inner.classList.add('flipped')
            flippedCards.push(card)

            if (flippedCards.length === 2) {
                checkMatch()
            }
        })
    })

    // === TIMER ===
    clearInterval(timerInterval)
    seconds = 60
    timerEl.innerHTML = `Czas: ${seconds}s`
    timerInterval = setInterval(() => {
        seconds--
        timerEl.innerHTML = `Czas: ${seconds}s`
        if (seconds === 0) {
            clearInterval(timerInterval)
            // game over - TODO
        }
    }, 1000)
}

// === SPRAWDZANIE DOPASOWANIA ===
function checkMatch() {
    tries++
    triesEl.innerHTML = `Próby: ${tries}`

    const [first, second] = flippedCards

    if (first.dataset.value === second.dataset.value) {
        first.querySelector('.card-inner').classList.add('matched')
        second.querySelector('.card-inner').classList.add('matched')
        flippedCards = []
        checkWin()
    } else {
        setTimeout(() => {
            first.querySelector('.card-inner').classList.remove('flipped')
            second.querySelector('.card-inner').classList.remove('flipped')
            flippedCards = []
        }, 800)
    }
}

// === SPRAWDZANIE WYGRANEJ ===
function checkWin() {
    const allCards = gameGrid.querySelectorAll('.card')
    const allMatched = [...allCards].every(card =>
        card.querySelector('.card-inner').classList.contains('matched')
    )
    if (allMatched) {
        clearInterval(timerInterval)
    winTimeEl.innerHTML = `Czas: ${60 - seconds}s`
    winTriesEl.innerHTML = `Próby: ${tries}`
    gameGrid.style.visibility = 'hidden'
    infoBar.style.visibility = 'hidden'
    gameGrid.style.opacity = '0'
    winMessage.classList.remove('hidden')
    
      
        
    }
}
