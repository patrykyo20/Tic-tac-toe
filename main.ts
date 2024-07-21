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
  }
}

init();
