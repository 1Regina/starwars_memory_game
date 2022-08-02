let user = {
  name: "",
  fastest: "",
};

// Base cards collection
const baseCollection = [
  { id: 1, art: "1.jpg" },
  { id: 2, art: "2.jpg" },
  { id: 3, art: "3.jpg" },
  { id: 4, art: "4.jpg" },
  { id: 5, art: "5.jpg" },
  { id: 6, art: "6.jpg" },
  { id: 7, art: "7.jpg" },
  { id: 8, art: "8.jpg" },
];
// C:\Users\regin\Desktop\Learning\Rocket_Acad\Rocket_Academy_Projects\Bootcamp\Project3_Memory_Game\public\assets\js\app.js
// C:\Users\regin\Desktop\Learning\Rocket_Acad\Rocket_Academy_Projects\Bootcamp\Project3_Memory_Game\public\assets\audio\gypsy.mp3

const board = document.querySelector(".board");
const startButton = document.getElementById("startButton");
const timer = document.getElementById("timer");
const gameArt = document.getElementById("gameArt");
const backgroundMusic = new Audio(
  "assets/audio/gypsy-jaxx-jonny-boyle-main-version-02-23-13.mp3"
);
const winEffect = new Audio("assets/audio/win.mp3");

// shuffle cards and generate pairs
const shuffled = [...shuffle(baseCollection), ...shuffle(baseCollection)];

const queryString = window.location.search;
const params = new URLSearchParams(queryString.substring(1));
const token = params.get("token");
// console.log(`aaaa`, )

async function verifyUser() {
  try {
    if (!token) window.location.replace("signin.html");
    // check token
    const response = await fetch("/api/verify", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    if (response.status !== 200) throw new Error("Unauthorized");

    const data = await response.json();
    // set the user name and fastest time
    user.name = data.username;
    user.fastest = data.fastest;
    document.getElementById("bestTimer").innerHTML =
      "My Best Record " + user.fastest + "s";

    // generate Board
    generateBoard(shuffled);
  } catch (e) {
    window.location.replace("signin.html");
  }
}

verifyUser();

generateBoard(shuffled);
gameArt.addEventListener("change", () => {
  generateBoard(shuffled);
});
startButton.addEventListener("click", startGame);
let tm1; // setInterval ID

// Functions

// Start Game
function startGame() {
  backgroundMusic.volume = 0.3;
  backgroundMusic.play();
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.classList.remove("flipped");
    card.addEventListener("click", () => flip(card));
  });
  gameArt.remove();
  startButton.remove();
  tm1 = setInterval(() => {
    let timeLeft = parseInt(timer.textContent) + 1;
    // timer.textContent = timeLeft < 10 ? `0${timeLeft}` : timeLeft;
    timer.textContent = timeLeft
  }, 1000);
}

// flip card ?
function flip(card) {
  card.classList.add("flipped");
  const flippedCards = document.querySelectorAll(".flipped");
  if (flippedCards.length === 2) {
    preventClick();
    checkForMatch(flippedCards[0], flippedCards[1]);
  }
}

// Stop user from flipping cards
function preventClick() {
  board.classList.add("prevent-click");
  setTimeout(() => {
    board.classList.remove("prevent-click");
  }, 500);
}

// check if flipped cards match
async function checkForMatch(cardOne, cardTwo) {
  const idOne = cardOne.getAttribute("data-card-id");
  const idTwo = cardTwo.getAttribute("data-card-id");
  if (idOne === idTwo) {
    cardOne.classList.remove("flipped");
    cardTwo.classList.remove("flipped");
    cardOne.classList.add("matched");
    cardTwo.classList.add("matched");
  } else {
    setTimeout(() => {
      cardOne.classList.remove("flipped");
      cardTwo.classList.remove("flipped");
    }, 800);
  }

  // check all cards found and end the game
  const matchedCards = document.querySelectorAll(".matched");
  if (matchedCards.length / 2 === baseCollection.length) {
    backgroundMusic.pause();
    winEffect.play();
    clearInterval(tm1);
    board.innerHTML = `You Won! You find them all in ${timer.textContent} seconds.`;
    board.classList.add("win");

    console.log(`timer is `, timer, timer.innerText);
    await fetch("/api/faster", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        fastest: parseInt(timer.innerText),
      }),
    });
    document.getElementById("bestTimer").remove();
    timer.remove();
    let restartButton = document.createElement("button");
    restartButton.classList.add("restart");
    restartButton.innerText = "Play Again ?";
    board.appendChild(restartButton);
  }
}

// Generate Card Element + Add it to DOM
function generateBoard(cardsArray) {
  board.innerHTML = "";
  cardsArray.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card", "flipped");
    cardElement.setAttribute("data-card-id", card.id);

    const front = document.createElement("div");
    front.classList.add("front");
    cardElement.appendChild(front);

    const back = document.createElement("div");
    back.classList.add("back");
    const img = document.createElement("img");
    img.src = `assets/img/${gameArt.value}/${card.art}`;
    back.appendChild(img);
    cardElement.appendChild(back);

    board.appendChild(cardElement);
  });
}

// Shuffle Array - Fisher Yates Algorithm
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("restart")) {
    location.reload();
  }
});
