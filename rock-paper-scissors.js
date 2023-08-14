let score = {
    wins: 0,
    losses: 0,
    ties: 0
  };

  const savedScore = JSON.parse(localStorage.getItem(`score`));

  if (savedScore) {
    score = savedScore;
  }

  updateScoreElement();

  function playGame(playerMove) {

    const computerMove = pickComputerMove();
    const resultElement = document.querySelector('.js-result');

    if(playerMove === computerMove){
      resultElement.innerHTML = `You tied.`;
      score.ties += 1;
    } else if (
        (playerMove === 'rock' && computerMove === 'scissors') ||
        (playerMove === 'paper' && computerMove === 'rock') ||
        (playerMove === 'scissors' && computerMove === 'paper')
    ) {
      resultElement.innerHTML = `You won!`;
      score.wins += 1
    } else {
      resultElement.innerHTML = `You lost. :(`;
      score.losses += 1;
    }
    localStorage.setItem(`score`, JSON.stringify(score));
    updateScoreElement();
    const movesElement = document.querySelector('.js-moves-chosen');
    movesElement.innerHTML = `You: ${playerMove} &nbsp; Computer: ${computerMove}`;

  }

  function pickComputerMove() {
    const randomNum = Math.random();
    let computerMove;
    if(randomNum < (1 / 3)) {
      computerMove = `rock`;
    } else if(randomNum < (2/3)) {
      computerMove = `paper`;
    } else {
      computerMove = `scissors`;
    }
    return computerMove;
  }
  function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    updateScoreElement();   
    document.querySelector('.game-summary').innerHTML = `<p class="js-moves-chosen">Press an Icon to Start!</p>
    <p class="js-result">Don't Lose!</p>`;     
  }
  function updateScoreElement() {
    document.querySelector('.js-score').innerHTML = `
      Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}
    `;
  }