import { Card } from "../scripts/Card.js";
import { PopupWithImage } from "../scripts/PopupWithImage.js";
import { PopupWithForms } from "../scripts/PopupWithForm.js";
import { newCards } from "../scripts/Section.js";
import { getInitialCardsApi } from "../scripts/Api.js";
import { newUserInfo } from "../scripts/UserInfo.js";

import "../vendor/normalize.css";
import "./index.css";

import logoImg from "../images/logo.svg";

document.querySelector(".header__logo").src = logoImg;

const setInitialCards = function () {
  newUserInfo
    .getUserInfo()
    .then((userData) => {
      return getInitialCardsApi()
        .getData()
        .then((data) => {
          return { cardData: data, userData: userData };
        });
    })
    .then((data) => {
      const card = newCards(data.cardData, data.userData);
      card.renderItems();
    });
};
setInitialCards();

const popupImages = new PopupWithImage();
const popupNewPlace = new PopupWithForms(document.querySelector("#new-place"));
const popupProfilePic = new PopupWithForms(
  document.querySelector("#profile-pic")
);
const popupProfile = new PopupWithForms(
  document.querySelector("#edit-profile")
);
export const popupEraseCard = function (element) {
  return new PopupWithForms(
    document.querySelector("#popup-erase-card"),
    element
  );
};
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
