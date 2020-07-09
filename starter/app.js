/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var roundScore, dice, currentPlayer, activePlayer, scores, gamePlaying, previousDice, previousDicePlayer, dicePlayer;
init();

document.querySelector('.btn-roll').addEventListener('click', function(){
    if (gamePlaying){
        dice = Math.floor(Math.random()*6) + 1;
        // dice = 6;
        
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src="dice-"+dice+".png";
        
        if(previousDice === 6 && dice === 6){
            scores[activePlayer] = 0;
            document.querySelector('#score-'+activePlayer).textContent = '0';
            nextPlayer();
        }
        else if (dice!==1){
            roundScore += dice;
            document.querySelector('#current-'+activePlayer).textContent = roundScore;
        }
        else{
           nextPlayer();
        }
        previousDice = dice;
        previousDicePlayer = activePlayer;
    }
});

function nextPlayer(){
    document.querySelector('.dice').style.display = 'none';
    
    if (scores[activePlayer] > 20){
        document.querySelector('#name-'+activePlayer).textContent = "Winner!";
        gamePlaying = false;
    }
    else{            
        document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
        roundScore = 0;
        document.querySelector('#current-'+activePlayer).textContent = roundScore;
        document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
        activePlayer === 0 ? activePlayer=1 : activePlayer=0;
        document.querySelector('.player-'+activePlayer+'-panel').classList.add('active');
    }
}

document.querySelector('.btn-hold').addEventListener('click', function(){
    scores[activePlayer] += roundScore;
    document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
    document.querySelector('#current-'+activePlayer).textContent = 0;
    roundScore = 0;
    document.querySelector('.dice').style.display = 'none';
    nextPlayer();
});

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    scores = [0, 0]
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    previousDicePlayer = 0;
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
}
