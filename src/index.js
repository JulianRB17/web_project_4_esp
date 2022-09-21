import { Card } from "../scripts/Card.js";
import { PopupWithImage } from "../scripts/PopupWithImage.js";
import { PopupWithForms, cardsTemplate } from "../scripts/PopupWithForm.js";

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

// Creación de los objetos de cada clase
export const popupWithImage = new PopupWithImage();
const popupNewPlace = new PopupWithForms(document.querySelector("#new-place"));
const popupProfilePic = new PopupWithForms(
  document.querySelector("#profile-pic")
);
const popupProfile = new PopupWithForms(
  document.querySelector("#edit-profile")
);

// Agregar eventListeners a los botones que abren cada ventana popup
document.querySelector(".profile__edit-btn").addEventListener("click", (e) => {
  popupProfile.openPopup();
});
document.querySelector(".profile__add-btn").addEventListener("click", (e) => {
  popupNewPlace.openPopup();
});
document.querySelector(".profile__pic").addEventListener("click", (e) => {
  popupProfilePic.openPopup();
});

//Inicio con 6 tarjetas
initialCards.forEach(function (initialCard) {
  const card = new Card(initialCard.name, initialCard.link, cardsTemplate);
  card.addCard();
});
