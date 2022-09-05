// Create variables for the game state
let round = 1
let player1Score = 0
let player2Score = 0
let playerWins = [0, 0]
let playerTurn = 0
let currentRandomNumber = 0

// Create variables to store references to the necessary DOM nodes
const player1Dice = document.getElementById("player1Dice")
const player2Dice = document.getElementById("player2Dice")
const player1Scoreboard = document.getElementById("player1Scoreboard")
const player2Scoreboard = document.getElementById("player2Scoreboard")
const message = document.getElementById("message")
const rollBtns = document.getElementsByClassName("roll-btn")
const optsBtns = document.getElementsByClassName("opts-btns")
const donBtns = document.getElementsByClassName("don-btn")
const gifts = document.getElementsByClassName("gift")
const giftBtns = document.getElementsByClassName("gift-btn")
const endTurnBtns = document.getElementsByClassName("end-btn")
const resetBtn = document.getElementById("resetBtn")
const nextRoundBtn = document.getElementById("nextRoundBtn")
const playerWinsEls = document.getElementsByClassName("player-wins")


// Event Listeners

document.body.addEventListener("click", e => {
    if (e.target.classList.contains("roll-btn")) {
        rollBtnFunctionality()
    }
    
    if (e.target.classList.contains("don-btn")) {
        doubleOrNothingFunctionality()
    }
    
    if (e.target.classList.contains("gift-btn")) {
        giftBtnFunctionality(e.target)
    }
    
    if (e.target.classList.contains("end-btn")) {
        endTurnBtnFunctionality()
    }
})

resetBtn.addEventListener("click", function(){
    resetGame()
})

nextRoundBtn.addEventListener("click", function() {
    nextRound()
})


// Buttons Functionalities

function rollBtnFunctionality() {
    currentRandomNumber = Math.floor(Math.random() * 6) + 1
    executePlay(playerTurn, currentRandomNumber)
}

function doubleOrNothingFunctionality() {
    donBtns[playerTurn].classList.add("hidden")
    gifts[playerTurn].classList.remove("hidden")
    endTurnBtns[playerTurn].classList.add("hidden")
}

function giftBtnFunctionality(target) {
    const random = Math.floor(Math.random() * 2)
    if (random) {
        gifts[playerTurn].children[1].textContent = "2x"
    } else {
        gifts[playerTurn].children[3].textContent = "2x"
    }   
    target.classList.add("hidden")
    target.nextElementSibling.classList.remove("hidden")

    if (target.nextElementSibling.textContent == "2x") {
        increasePlayerScore(playerTurn, currentRandomNumber * 2)
    }
    
    for (const giftBtn of giftBtns) {
        giftBtn.disabled = true
    }
    
    setTimeout(function() {
        goToNextTurn()
    }, 1000)
    
    for (const giftBtn of giftBtns) {
        giftBtn.disabled = false
    }
}

function endTurnBtnFunctionality() {
    increasePlayerScore(playerTurn, currentRandomNumber)
    goToNextTurn()
}

// Additional Functionalities

function executePlay(player, amount) {
    if (player == 0) {
        rollBtns[0].classList.add("hidden")
        optsBtns[0].classList.remove("hidden")
        player1Dice.textContent = amount
    } else {
        rollBtns[1].classList.add("hidden")
        optsBtns[1].classList.remove("hidden")
        player2Dice.textContent = amount
    }
}

function increasePlayerScore(player, amount) {
    if (player == 0) {
        player1Score += amount
        player1Scoreboard.textContent = player1Score
    } else {
        player2Score += amount
        player2Scoreboard.textContent = player2Score
    }
}

function goToNextTurn() {
    resetPlayerBtns(playerTurn)
    if (playerTurn == 0) {
        player1Dice.classList.remove("active")
        player2Dice.classList.add("active")
        playerTurn = 1
    } else {
        player2Dice.classList.remove("active")
        player1Dice.classList.add("active")
        playerTurn = 0
    }
    
    if (player1Score >= 20) {
        message.textContent = "Player 1 Won 🥳"
        updateWinCounter(0)
        showResetAndNextRoundButton()
    }  else if (player2Score >= 20) {
        message.textContent = "Player 2 Won 🎉"
        updateWinCounter(1)
        showResetAndNextRoundButton()
    }
}

function updateWinCounter(player) {
    playerWins[player]++
    playerWinsEls[player].textContent = playerWins[player]
}

function resetScores() {
    player1Score = 0
    player2Score = 0
    player1Scoreboard.textContent = 0
    player2Scoreboard.textContent = 0
    message.textContent = "Round 1"
    resetBtn.classList.add("hidden")
    nextRoundBtn.classList.add("hidden")
    
    if (round & 1) {
        resetPlayerBtns(0)
        resetPlayerBtns(1)
        player2Dice.classList.remove("active")
        player1Dice.classList.add("active")
        playerTurn = 0
    } else {
        resetPlayerBtns(1)
        resetPlayerBtns(0)
        player2Dice.classList.add("active")
        player1Dice.classList.remove("active")
        playerTurn = 1
    }
}

function resetGame() {
    round = 1
    resetScores()
    playerTurn = 0
    playerWins = [0, 0]
    playerWinsEls[0].textContent = 0
    playerWinsEls[1].textContent = 0
}

function showResetAndNextRoundButton() {
    resetBtn.classList.remove("hidden")
    nextRoundBtn.classList.remove("hidden")
    rollBtns[0].classList.add("hidden")
    rollBtns[1].classList.add("hidden")
}

function resetPlayerBtns(player) {
    rollBtns[player].classList.add("hidden")
    gifts[player].classList.add("hidden")
    gifts[player].children[0].classList.remove("hidden")
    gifts[player].children[1].classList.add("hidden")
    gifts[player].children[1].textContent = "0"
    gifts[player].children[2].classList.remove("hidden")
    gifts[player].children[3].classList.add("hidden")
    gifts[player].children[3].textContent = "0"
    optsBtns[player].classList.add("hidden")
    donBtns[player].classList.remove("hidden")
    endTurnBtns[player].classList.remove("hidden")
    
    if (player == 0) {
        rollBtns[1].classList.remove("hidden")
        player1Dice.textContent = "-"
    } else {
        rollBtns[0].classList.remove("hidden")
        player2Dice.textContent = "-"
    }
}

function nextRound() {
    round++
    resetScores()
    message.textContent = "Round " + round
}
