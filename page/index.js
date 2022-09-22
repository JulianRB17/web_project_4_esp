import "../vendor/normalize.css";
import "./index.css";

import img1 from "../images/cards_1.jpg";
import img2 from "../images/cards_2.jpg";
import img3 from "../images/cards_3.jpg";
import img4 from "../images/cards_4.jpg";
import img5 from "../images/cards_5.jpg";
import img6 from "../images/cards_6.jpg";
import logoImg from "../images/logo.svg";

document.querySelector(".header__logo").src = logoImg;

import { Card } from "../scripts/Card.js";
import { PopupWithImage } from "../scripts/PopupWithImage.js";
import { PopupWithForms } from "../scripts/PopupWithForm.js";
import { newCards } from "../scripts/Section.js";

const initialCards = [
  {
    nameValue: "Cenotes",
    linkValue: img1,
  },
  {
    nameValue: "Ushuaia",
    linkValue: img2,
  },
  {
    nameValue: "Iguazú",
    linkValue: img3,
  },
  {
    nameValue: "Uyuni",
    linkValue: img4,
  },
  {
    nameValue: "Bacalar",
    linkValue: img5,
  },
  {
    nameValue: "Las Coloradas",
    linkValue: img6,
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
