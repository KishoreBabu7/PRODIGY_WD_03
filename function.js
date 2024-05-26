console.log("Welcome to TicTakToe Console");
let winAudio = new Audio("WinAudio.mp3");
let clickAudio = new Audio("clickAudio.mp3");
let turn = "X";
let gameOver = false;
let gameMode = "player";

const changeTurn = () => {
  return turn === "X" ? "O" : "X";
};

const checkDraw = () => {
  let boxtext = document.querySelectorAll(".boxText");
  for (let i = 0; i < boxtext.length; i++) {
    if (boxtext[i].innerText === "") {
      return false;
    }
  }
  return true;
};

const checkWin = () => {
  let boxtext = document.getElementsByClassName("boxText");
  let wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < wins.length; i++) {
    let [a, b, c] = wins[i];
    if (
      boxtext[a].innerText === boxtext[b].innerText &&
      boxtext[b].innerText === boxtext[c].innerText &&
      boxtext[a].innerText !== ""
    ) {
      document.querySelector(".turn").innerText =
        "The Winner is: " + boxtext[a].innerText;
      gameOver = true;
      winAudio.play();
      document.querySelector(".winImg").style.width = "20vw";
      return;
    }
  }
  if (checkDraw()) {
    document.querySelector(".turn").innerText = "It's a Draw!";
    gameOver = true;
    return;
  }
};

const makeMove = (element) => {
  if (element.innerText === "") {
    element.innerText = turn;
    clickAudio.play();
    checkWin();
    if (!gameOver) {
      turn = changeTurn();
      document.querySelector(".turn").innerText = "Turn for: " + turn;
    }
  }
};

const playComputer = () => {
  let emptyCells = [];
  document.querySelectorAll(".boxText").forEach((element, index) => {
    if (element.innerText === "") {
      emptyCells.push(index);
    }
  });
  let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  let boxtext = document.querySelectorAll(".boxText")[randomIndex];
  makeMove(boxtext);
};

const startGame = (mode) => {
  gameMode = mode;
  turn = "X";
  gameOver = false;
  document.querySelectorAll(".boxText").forEach((element) => {
    element.innerText = "";
  });
  document.querySelector(".turn").innerText = "Turn for: " + turn;
  document.querySelector(".winImg").style.width = "0vw";
  document.querySelector(".modeSelection").style.display = "none";
};

document.querySelectorAll(".box").forEach((element) => {
  element.addEventListener("click", (e) => {
    if (!gameOver && e.target.innerText === "") {
      makeMove(e.target.querySelector(".boxText"));
      if (gameMode === "computer" && turn === "O" && !gameOver) {
        setTimeout(playComputer, 500);
      }
    }
  });
});

document.getElementById("restart").addEventListener("click", () => {
  document.querySelectorAll(".boxText").forEach((element) => {
    element.innerText = "";
  });
  turn = "X";
  gameOver = false;
  document.querySelector(".turn").innerText = "Turn for: " + turn;
  document.querySelector(".winImg").style.width = "0vw";
  document.querySelector(".modeSelection").style.display = "block";
});
