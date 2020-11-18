/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores, roundScore, activePayer, gamePlaying

init()

document.querySelector('.btn-roll').addEventListener('click', function (){

    if(gamePlaying){
        // 1.Random number
        var dice = Math.floor(Math.random() * 6) + 1;

        // 2.display the result
        var diceDom = document.querySelector('.dice');
        diceDom.style.display = 'block';
        diceDom.src = 'dice-' + dice + '.png';

        // 3 Game play
        if(dice !== 1 ){

            // Add score

            roundScore += dice;
            document.getElementById('current-'+activePayer).textContent = roundScore;

        }else {

            // Next Player
            nextPlayer();

        }
    }
})

document.querySelector('.btn-hold').addEventListener('click', function () {
    if(gamePlaying){
        // Add current score to global score
        scores[activePayer] += roundScore

        // Update the UI
        document.querySelector('#score-' + activePayer).textContent = scores[activePayer]

        // the player won
        if(scores[activePayer] >= 100){
            document.querySelector('#name-'+ activePayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }else{
            nextPlayer()
        }
    }

})

function nextPlayer(){
    activePayer === 0 ? activePayer = 1 : activePayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.player-0-panel').classList.toggle('active')
}

document.querySelector('.btn-new').addEventListener('click', init)

function init(){
    scores = [0,0]
    roundScore = 0;
    activePayer = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none'

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active')
}