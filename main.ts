"use strict";

import { Players } from "./types/players";

function init() {
  const form = document.querySelector(".form");
  const players = [
    {
      name: "",
      symbol: "X",
    },
    {
      name: "",
      symbol: "O",
    },
  ];

  form.addEventListener("submit", (e) => onFormSent(e, players));
}

function onFormSent(e: Event, players: Players): void {
  e.preventDefault();

  if (e.target[0].value && e.target[1].value) {
    players[0].name = e.target[0].value;
    players[1].name = e.target[1].value;
  }

  if (players[0].name && players[1].name) {
    clearForm();
    startGame(players);
  }
}

function clearForm() {
  const form: HTMLFormElement = document.querySelector(".form");
  form.style.display = "none";
}

function startGame(players) {
  let turn = 0;
  const board = document.querySelector(".board") as HTMLDivElement;

  board.addEventListener("click", (event) => {
    if (turn % 2 === 0) {
      turn = 1;
    } else if (turn % 2 !== 0) {
      turn = 0;
    }

    setUser(players, turn);
    fillBox(event, players, turn);
  });

  setUser(players, turn);
}

function setUser(players: Players, turn: number) {
  const paragraph = document.querySelector(".paragraph");

  paragraph.innerHTML = `Now it's ${players[turn].name}'s turn`;
}

function fillBox(event, players: Players, turn: number) {
  event.target.innerHTML = players[turn].symbol;

  checkWin(players);
}

function checkWin(players: Players) {
  const board = document.querySelectorAll(".board__box");

  if (
    (board[0].innerHTML === board[4].innerHTML &&
      board[4].innerHTML === board[8].innerHTML &&
      board[8].innerHTML !== "") ||
    (board[2].innerHTML === board[4].innerHTML &&
      board[4].innerHTML === board[6].innerHTML &&
      board[6].innerHTML !== "")
  ) {
    displayWinner(players, board[4].innerHTML);
  }

  for (let i = 0; i < 3; i++) {
    const rowSize = i * 3;

    if (
      board[rowSize].innerHTML === board[rowSize + 1].innerHTML &&
      board[rowSize + 1].innerHTML === board[rowSize + 2].innerHTML &&
      board[rowSize].innerHTML !== ""
    ) {
      displayWinner(players, board[rowSize].innerHTML);
    }

    if (
      board[rowSize].innerHTML === board[rowSize + 3].innerHTML &&
      board[rowSize + 3].innerHTML === board[rowSize + 6].innerHTML &&
      board[rowSize].innerHTML !== ""
    ) {
      displayWinner(players, board[rowSize].innerHTML);
    }
  }
}

function displayWinner(players: Players, value: string) {
  const paragraph = document.querySelector(".paragraph");

  if (value === players[0].symbol) {
    paragraph.innerHTML = `${players[0].name} is Winner!`;
  } else if (value === players[1].symbol) {
    paragraph.innerHTML = `${players[1].name} is Winner!`;
  }
}

init();
