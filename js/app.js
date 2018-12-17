/*
 * Create a list that holds all of your cards
 */
let dynamicCards =['fa fa-diamond','fa fa-paper-plane-o','fa fa-anchor','fa fa-cube',
'fa fa-anchor','fa fa-leaf','fa fa-bicycle','fa fa-diamond','fa fa-bomb','fa fa-leaf','fa fa-bomb',
'fa fa-bolt','fa fa-bicycle','fa fa-paper-plane-o','fa fa-cube','fa fa-bolt'
];
let deck = document.querySelector('.deck');
//create cards 
 function createCards(dynamicCards){
     dynamicCards.forEach(function(dCard) {
        let li = document.createElement('li');
    li.classList.add('card');
    li.innerHTML = ` <i class='${dCard}'></i>`;
    deck.append(li);
    });
    
 }


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
shuffle(dynamicCards);

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
//open cards list
let openCards = [];
// matched cards array
let matchedCards=[];
// select restart button
let restartbtn = document.querySelector(".restart");
// Moves
 let moves =0;
 let moveSpan = document.querySelector('.moves');
//stars
 
function gameStart(){
    moveSpan.textContent = moves;
     createCards(dynamicCards);
}
 
gameStart();

//Select cards 
let allCards = document.querySelectorAll('.card');
// add Event listener on cards
allCards.forEach(function(card) {
    card.addEventListener('click',function(e){
        openCardsList(card);
           
    })
});
//restart Game function

restartbtn.addEventListener('click',function(e){
    // reset  stars rating
   for (let i = 0; i < stars.length; i++) {
       stars[i].classList.remove('hidden');
   }
   // reset  moves
    moves=min=hours=sec=0;
   moveSpan.textContent= moves;
   shuffle(dynamicCards);  
   deck.innerHTML=``;  
   createCards(dynamicCards);
});

function openCardsList(card){
    //show card
  card.classList.add('open','show');
    //add cards to array
  openCards.push(card);
  
  //store first card in array in letiable
  const firstCard = openCards[0];
  const secondCard= openCards[1];

  if(openCards.length ==2){
      
     if(firstCard.innerHTML == secondCard.innerHTML){
         for (const i in openCards) {
             //remove open show classes
             openCards[i].classList.remove('open','show');
             // add match class
             openCards[i].classList.add('match');
             // store matched elements in array
             matchedCards.push(openCards[i]);
             }
             //reset open cards array
             openCards=[];
     }
     else
     {
        setTimeout(function() {
         removeCards();
        }, 800);
     }
     movesCount();
  }
 }

 
// remove cards
 function removeCards(){
  allCards.forEach(function(cards) {
    cards.classList.remove('open','show');
});
    openCards=[];
 }


// Game finish (win)
 function gameWin(matchedCards){
 if (matchedCards.length == 16) {
    clearInterval(gametimer);

     
const modal = document.querySelector('#myModal');
const span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";

//  close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
    
 }
 }

 

 //Stars 
 let stars = document.querySelectorAll('.stars li');

 //Moves count and Update
 function movesCount(){
     moves++;
     moveSpan.textContent = moves;
     if (moves == 1) {
          startTimer();
            } 
            else if (moves == 11) {
				stars[2].classList.add('hidden');
            } 
            else if (moves == 16) {
				stars[1].classList.add('hidden');
            } 
            else if (moves == 22) {
				stars[0].classList.add('hidden');
			}
    // console.log('moves:', moves);
    
 }

 


//timer
let scorepanel = document.querySelector('.score-panel');
let timer = document.createElement('div');
timer.classList.add('timer');
 scorepanel.append(timer);
 let timerDiv = document.querySelector('.timer');

let sec=0;let min=0;let hours =0 ;

function startTimer(){let gametimer = setInterval(function(){
    sec++;
    if (60 > sec ) {
        timerDiv.innerText = `GameTime :${hours} hours : ${min} min : ${sec} sec`;
  }
  else if(sec>=60){
      min++;
    sec=sec-60;
    timerDiv.innerText = `GameTime :${hours} hours : ${min} min : ${sec} sec`;
   }
   else{
    hours++;
    min-=60;
    sec-=60;
    timerDiv.innerText = `GameTime :${hours} hours : ${min} min : ${sec} sec`;
   }
   gameWin(matchedCards);
}, 1000);

}

