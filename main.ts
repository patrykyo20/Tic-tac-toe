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
  });

  setUser(players, turn);
}

function setUser(players: Players, turn: number) {
  const paragraph = document.querySelector(".paragraph");

  paragraph.innerHTML = `Now it's ${players[turn].name}'s turn`;
}

init();
