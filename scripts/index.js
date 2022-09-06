import { Card } from "./card.js";
import {
  ProfileModal,
  NewPlaceModal,
  ProfilePicModal,
  PicModal,
} from "./utils.js";

const initialCards = [
  {
    name: "Cenotes",
    link: "./images/cards_1.jpg",
  },
  {
    name: "Ushuaia",
    link: "./images/cards_2.jpeg",
  },
  {
    name: "Iguazú",
    link: "./images/cards_3.jpeg",
  },
  {
    name: "Uyuni",
    link: "./images/cards_4.jpg",
  },
  {
    name: "Bacalar",
    link: "./images/cards_5.webp",
  },
  {
    name: "Las Coloradas",
    link: "./images/cards_6.jpg",
  },
];

const cardsTemplate = document.querySelector("#cards__template").content;

new ProfileModal();
new NewPlaceModal();
new ProfilePicModal();
new PicModal();

//Inicio con 6 tarjetas
initialCards.forEach(function (initialCard) {
  const card = new Card(initialCard.name, initialCard.link, cardsTemplate);
  card.addCard();
});
