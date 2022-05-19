const buttonColors = [
  new GameButton("red", new Audio("sounds/red.mp3")),
  new GameButton("blue", new Audio("sounds/blue.mp3")),
  new GameButton("green", new Audio("sounds/green.mp3")),
  new GameButton("yellow", new Audio("sounds/yellow.mp3")),
];
const buttonAudioMap = new Map(
  buttonColors.map(object => {
    return [object.color, object.audio];
  }),
);

const wrongAudio = new Audio("sounds/wrong.mp3");

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

$(".btn").click(handleUserClick);

$(document).keydown(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber].color;
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playAudio(randomChosenColor);
  level++;

  $("#level-title").text("Level " + level);
}

function playAudio(color) {
  var audio = buttonAudioMap.get(color);
  audio.play();
}

function handleUserClick(event) {
  var userChosenColor = event.currentTarget.id;
  userClickedPattern.push(userChosenColor);

  playAudio(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (currentLevel + 1 === level) {
      setTimeout(function() {
        nextSequence();
        userClickedPattern = [];
      }, 500);
    }
  } else {
    wrongAnswer();
    resetGame();
  }
}

function resetGame() {
  started = false;
  userClickedPattern = [];
  gamePattern = [];
  level = 0;
}

function wrongAnswer() {
  wrongAudio.play();
  $("body").addClass("game-over");
  $("#level-title").text("Game Over, Press Any Key to Restart");

  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass('pressed');
  }, 100);
}

// Constructor function
function GameButton(color, audio) {
  this.color = color;
  this.audio = audio;
}
