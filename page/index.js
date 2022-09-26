import { Card } from "../scripts/Card.js";
import { PopupWithImage } from "../scripts/PopupWithImage.js";
import { PopupWithForms } from "../scripts/PopupWithForm.js";
import { newCards } from "../scripts/Section.js";

const initialCards = [
  {
    nameValue: "Cenotes",
    linkValue: "./images/cards_1.jpg",
  },
  {
    nameValue: "Ushuaia",
    linkValue: "./images/cards_2.jpg",
  },
  {
    nameValue: "Iguazú",
    linkValue: "./images/cards_3.jpg",
  },
  {
    nameValue: "Uyuni",
    linkValue: "./images/cards_4.jpg",
  },
  {
    nameValue: "Bacalar",
    linkValue: "./images/cards_5.jpg",
  },
  {
    nameValue: "Las Coloradas",
    linkValue: "./images/cards_6.jpg",
  },
];

// Creación de los objetos de cada clase
const popupImages = new PopupWithImage();
const popupNewPlace = new PopupWithForms(document.querySelector("#new-place"));
const popupProfilePic = new PopupWithForms(
  document.querySelector("#profile-pic")
);
const popupProfile = new PopupWithForms(
  document.querySelector("#edit-profile")
);
const cardHandler = new Card();

// Agregar eventListeners a los botones que abren cada ventana popup
document.querySelector(".profile__edit-btn").addEventListener("click", () => {
  popupProfile.openPopup();
});
document.querySelector(".profile__add-btn").addEventListener("click", () => {
  popupNewPlace.openPopup();
});
document.querySelector(".profile__pic").addEventListener("click", () => {
  popupProfilePic.openPopup();
});

//Inicio con 6 tarjetas
const card = newCards(initialCards);
card.renderItems();
