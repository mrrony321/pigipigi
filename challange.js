var playerScores, roundScore, activePlayer, gamePlaying;

init()

var lastDise;

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        //1. Random number
        var dice0 = Math.floor(Math.random() * 6) + 1
        var dice1 = Math.floor(Math.random() * 6) + 1

        //2. Display the result
        document.getElementById('dice-0').style.display = 'block'
        document.getElementById('dice-1').style.display = 'block'
        document.getElementById('dice-0').src = 'dice-' + dice0 + '.png'
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png'
        // var diceDom = document.querySelector('.dice')
        // diceDom.style.display = 'block'
        // diceDom.src = 'dice-' + dice + '.png'

        //3. update the round score if the rolled number was not 1
        if (dice0 !== 1 && dice1 !== 1) {
            //add score
            // prevDice = dice
            roundScore += dice0 + dice1
            document.querySelector('#current-' + activePlayer).textContent = roundScore
        } else {
            //next player
            nextPlayer()
        }
        // if (dice === 6 && lastDise === 6) {
        //     //player loses control
        //     playerScores[activePlayer] = 0
        //     document.querySelector('#current-' + activePlayer).textContent = '0'
        //     nextPlayer()
        // } else if (dice !== 1) {
        //     //add score
        //     prevDice = dice
        //     roundScore += dice
        //     document.querySelector('#current-' + activePlayer).textContent = roundScore
        // } else {
        //     //next player
        //     nextPlayer()
        // }

        // lastDise = dice
    }


})

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        //Add current score to Global score
        playerScores[activePlayer] += roundScore
        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = playerScores[activePlayer]

        var input = document.querySelector('.final-score').value

        console.log(input)
        var winningScore

        if (input) {
            winningScore = input
        } else {
            winningScore = 100
        }
        //Check if player won the game
        if (playerScores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!'
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
            hideDice()
            gamePlaying = false
        } else {
            //next player
            nextPlayer()
        }
    }
})

document.querySelector('.btn-new').addEventListener('click', function () {
    init()
})

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
    roundScore = 0
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'

    // document.querySelector('.player-0-panel').classList.remove('active')
    // document.querySelector('.player-1-panel').classList.add('active')

    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')

    hideDice()
}

function init() {
    playerScores = [0, 0]
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true

    hideDice()

    document.getElementById('score-0').textContent = '0'
    document.getElementById('score-1').textContent = '0'
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'
    document.getElementById('name-0').textContent = 'Player 1'
    document.getElementById('name-1').textContent = 'Player 2'
    document.querySelector('.player-0-panel').classList.remove('winner')
    document.querySelector('.player-1-panel').classList.remove('winner')
    document.querySelector('.player-0-panel').classList.remove('active')
    document.querySelector('.player-1-panel').classList.remove('active')
    document.querySelector('.player-0-panel').classList.add('active')

}

function hideDice() {
    document.getElementById('dice-0').style.display = 'none'
    document.getElementById('dice-1').style.display = 'none'
}