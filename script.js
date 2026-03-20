
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
    "imagines/img2.png",
    "imagines/img3.png",
    "imagines/img4.avif",
    "imagines/img5.png",
    "imagines/img6.png",
    "imagines/img7.png",
    "imagines/img8.png",
    "imagines/img9.png",
    "imagines/img10.png",
    "imagines/img11.png",
    "imagines/img12.png",
    "imagines/img13.png",
    "imagines/img14.png",
    "imagines/img15.png",
    "imagines/img16.png",
    "imagines/img17.png",
    "imagines/img18.png",
    "imagines/img19.png",
    "imagines/img20.png",
]

// === ZMIENNE GRY ===
let flippedCards = []
let tries = 0
let seconds = 0
let timerInterval = null
let boardSize = 4


//Button 
diffBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        boardSize = parseInt(btn.dataset.size)
        startScreen.classList.add('hidden')
        gameGrid.classList.remove('hidden')
        infoBar.style.display = 'flex'
        startGame(boardSize)
    })
})

//Karty 
function startGame(size){
     console.log('size:', size)
    console.log('pairsNeeded:', (size * size) / 2)
    gameGrid.innerHTML = "";
    flippedCards = [];
    tries = 0;
    triesEl.innerHTML = `Próby: 0`;

    gameGrid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    const pairsNeeded = (size * size) / 2
    if(size === 4){
    gameGrid.style.setProperty('--card-width', '150px')
    gameGrid.style.setProperty('--card-height', '160px')
} else if(size === 6){
    gameGrid.style.setProperty('--card-width', '120px')
    gameGrid.style.setProperty('--card-height', '120px')
} else {
    gameGrid.style.setProperty('--card-width', '130px')
    gameGrid.style.setProperty('--card-height', '140px')
}
    const selectedImages = images.slice(0, pairsNeeded)
    const cards = [...selectedImages, ...selectedImages]
    
    //shuffle method 
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

    //TIMER 
    clearInterval(timerInterval)
    seconds = size === 4 ? 60 : size === 6 ? 120 : 180;
    timerEl.innerHTML = `Czas: ${seconds}s`
    timerInterval = setInterval(() => {
        seconds--
        timerEl.innerHTML = `Czas: ${seconds}s`
        if (seconds === 0) {
            clearInterval(timerInterval)
            gameGrid.style.visibility = 'hidden'
    infoBar.style.visibility = 'hidden'
    document.getElementById('game-over').classList.remove('hidden')
            
        }
    }, 1000)
}

// SPRAWDZANIE DOPASOWANIA 
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
//restart button
restartBtn.addEventListener('click', () => {
    winMessage.classList.add('hidden')
    gameGrid.style.visibility = 'visible'
    gameGrid.style.opacity = '1'
    gameGrid.style.display = 'none'
    infoBar.style.visibility = 'visible'
    infoBar.style.display = 'none'
    startScreen.classList.remove('hidden')
    flippedCards = []
    tries = 0
    seconds = 0
    clearInterval(timerInterval)
})
//game over
document.getElementById('restartBtnGameOver').addEventListener('click', () => {
    document.getElementById('game-over').classList.add('hidden')
    gameGrid.style.visibility = 'visible'
    gameGrid.style.opacity = '1'
    gameGrid.style.display = 'none'
    infoBar.style.visibility = 'visible'
    infoBar.style.display = 'none'
    startScreen.classList.remove('hidden')
    flippedCards = []
    tries = 0
    seconds = 0
    clearInterval(timerInterval)
})