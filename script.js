function randomInt(min, max) {
  return min + Math.floor((max - min) * Math.random());
}
function randomFloat(min, max) {
  return min + (max - min) * Math.random();
}
function toggleButton(id) {
  var x = document.getElementById(id);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
const initialAmount = 10000;
let amount = initialAmount;
let pop = randomInt(5, 50);
let reward = randomFloat(1.2, 1.8).toFixed(1);
function playAgain() {
  amount = initialAmount;
  displayAmount(amount);
  displayFailure("");
  displaySuccess("");
  toggleButton("play");
  toggleButton("play-again");
  toggleButton("heading");
  toggleButton("bet");
  toggleButton("question");
}
function displayAmount(amount) {
  document.getElementById("amount").innerHTML = amount;
}
function displayPOP(p) {
  document.getElementById("pop").innerHTML = p;
}
function displayReward(r) {
  document.getElementById("reward").innerHTML = r;
}
function displaySuccess(message) {
  document.getElementById("won").innerHTML = message;
}
function displayFailure(message) {
  document.getElementById("lost").innerHTML = message;
}
function bet() {
  const roll = randomInt(0, 100);
  return roll < pop ? 1 : 0;
}
function validateAmount(a) {
  if (isNaN(a) || a < 1) {
    displaySuccess("Dont be afraid! bet something");
    return false;
  }
  if (a > amount) {
    displayFailure("You cant bet more than what you have!!");
    return false;
  }
  return true;
}
function handleResult(won, prize, betAmount) {
  if (won) {
    
    amount = Math.floor(amount + prize - betAmount);
    if(amount > initialAmount*2){
      displaySuccess("Great!! You have doubled the amount!");  
      toggleButton("play");
      toggleButton("heading");
      toggleButton("bet");
      toggleButton("question");
      toggleButton("play-again");               
    }else{
      displaySuccess("You won " + prize);  
    }
  } else {
    amount = Math.floor(amount - betAmount);
    if (amount > 0) {
      displayFailure("Oops.. you lost " + betAmount);
    } else {
      displayFailure("Game Over!!!");
      toggleButton("heading");
      toggleButton("bet");
      toggleButton("question");
      toggleButton("play");
      toggleButton("play-again");
    }
  }
}
function getBetAmount() {
  return parseInt(document.getElementById("bet-amount").value);
}
function play(e) {
  e.preventDefault();
  displaySuccess("");
  displayFailure("");
  const won = bet();
  const betAmount = getBetAmount();
  if (!validateAmount(betAmount)) {
    return;
  }
  const prize = won * reward * betAmount;
  handleResult(won, prize, betAmount);
  displayAmount(amount);
  pop = randomInt(5, 50);
  reward = randomFloat(1.2, 1.8).toFixed(1);
  displayPOP(pop);
  displayReward(reward);
  document.getElementById("form").reset();
  document.getElementById("bet-amount").focus();
}

displayAmount(initialAmount);
displayPOP(pop);
displayReward(reward);
toggleButton("play-again");
document.getElementById("play").addEventListener("click", play);
document.getElementById("play-again").addEventListener("click", playAgain);
// document.getElementById("bet-amount").focus();
