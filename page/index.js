import { Card } from "../scripts/Card.js";
import { PopupWithImage } from "../scripts/PopupWithImage.js";
import { PopupWithForms } from "../scripts/PopupWithForm.js";
import { apiHandler } from "../scripts/Api.js";
import { newCards } from "../scripts/Section.js";

import "../vendor/normalize.css";
import "./index.css";

import logoImg from "../images/logo.svg";

apiHandler.getInitialCards().then((cards) => newCards(cards).renderItems());

document.querySelector(".header__logo").src = logoImg;

// const popupImages = new PopupWithImage();
const popupNewPlace = new PopupWithForms(document.querySelector("#new-place"));
const popupProfilePic = new PopupWithForms(
  document.querySelector("#profile-pic")
);
const popupProfile = new PopupWithForms(
  document.querySelector("#edit-profile")
);

const cardHandler = new Card();

document.querySelector(".profile__edit-btn").addEventListener("click", () => {
  popupProfile.openPopup();
});
document.querySelector(".profile__add-btn").addEventListener("click", () => {
  popupNewPlace.openPopup();
});
document.querySelector(".profile__pic").addEventListener("click", () => {
  popupProfilePic.openPopup();
});
