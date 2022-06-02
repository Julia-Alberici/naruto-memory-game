const $cards = document.querySelectorAll('.card');
const $btnConfirm = document.querySelector('#btn-play');
const $btnLater = document.querySelector('#btn-later');
const $dialogBox = document.querySelector('#overlay');
const $btnPlayAgain = document.querySelector('#play-again');

let hasFlipped = false
let firstFlipped;
let scndFlipped;
let lockBoard = false;
let numberOfCards = $cards.length;

function flipCard(){
    if(lockBoard) return 
    if(this === firstFlipped) return
    this.classList.add('flip');
    if(!hasFlipped){
        firstFlipped = this;
        hasFlipped = true;
        return
    } 
    scndFlipped = this;
    hasFlipped = false;
    checkMatch();
    

}


function checkMatch(){
    if(firstFlipped.dataset.card === scndFlipped.dataset.card){
       disableCards();
       return
    }
    unflipCards();
}

function disableCards(){
    lockBoard = true;
    setTimeout(() => {
        firstFlipped.classList.add('disabled');
        scndFlipped.classList.add('disabled');
        firstFlipped.removeEventListener('click', flipCard);
        scndFlipped.removeEventListener('click', flipCard);
        if(checkVictory()) openDialog();
        resetBoard();
    },500)
}

function unflipCards(){
    lockBoard = true;
    setTimeout(() => {
        firstFlipped.classList.remove('flip');
        scndFlipped.classList.remove('flip');
        resetBoard();
    }, 800)
}


function resetBoard(){
    [hasFlipped, lockBoard] = [false, false];
    [firstFlipped, scndFlipped] = [null, null];
}

function shuffle(element){
    let randomPosition = Math.floor(Math.random() * numberOfCards);
    element.style.order = randomPosition;
}

function checkVictory(){
    const cardsDisabled = document.querySelectorAll('.disabled');
    return (cardsDisabled.length === numberOfCards);
}

$cards.forEach(card => {
    shuffle(card)    
    card.addEventListener('click', flipCard);
});

$btnConfirm.addEventListener('click', playAgain);
$btnLater.addEventListener('click', playLater);
$btnPlayAgain.addEventListener('click', playAgainLater);

function openDialog(){
    $dialogBox.style.display = 'block';
}

function playAgain(){
    closeDialog();
    location.reload()
}

function playLater(){
    closeDialog()
    $btnPlayAgain.style.display = 'initial';
}

function playAgainLater(){
    location.reload()
}

function closeDialog(){
    $dialogBox.style.display = 'none';
}


