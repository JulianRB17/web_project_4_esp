import { Card } from "../components/Card.js";
import { PopupWithForms } from "../components/PopupWithForm.js";
import { apiHandler } from "../components/Api.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { newFormValidator } from "../components/FormValidator.js";

import "../vendor/normalize.css";
import "./index.css";

let userInfo = {};

const cardRenderer = function (data) {
  const newCard = new Card(
    userInfo,
    apiHandler,
    popUpEraseCard,
    popupWithImage,
    document.querySelector("#cards__template").content
  );
  newCard.getTemplate(data);
  return newCard.cardElement;
};

const section = new Section(
  { items: [], renderer: cardRenderer },
  document.querySelector(".cards")
);

const handleNewPlaceSubmit = function (data) {
  return apiHandler
    .setNewPlace(data)
    .then((data) => {
      const dataArray = [data];
      section.addItem(dataArray);
      section.renderItems();
    })
    .catch((err) => console.error(err));
};

const handleProfilePicSubmit = function (data) {
  userInfo.setUserInfo(data);
  const newUserInfo = userInfo.getUserInfo();
  document.querySelector(
    ".profile__pic"
  ).style.backgroundImage = `url(${newUserInfo.avatar})`;
  return apiHandler.setProfilePic(data).catch((err) => console.log(err));
};

const handleProfileSubmit = function (data) {
  userInfo.setUserInfo(data);
  const newUserInfo = userInfo.getUserInfo();
  document.querySelector(".profile__name").textContent = newUserInfo.name;
  document.querySelector(".profile__about-me").textContent = newUserInfo.about;
  return apiHandler.changeUserInfo(data).catch((err) => console.error(err));
};

const handleEraseCard = function (cardId) {
  return apiHandler.deleteCard(cardId).catch((err) => console.log(err));
};

const popupNewPlace = new PopupWithForms(
  document.querySelector("#new-place"),
  newFormValidator,
  handleNewPlaceSubmit
);
const popupProfilePic = new PopupWithForms(
  document.querySelector("#profile-pic"),
  newFormValidator,
  handleProfilePicSubmit
);
const popupProfile = new PopupWithForms(
  document.querySelector("#edit-profile"),
  newFormValidator,
  handleProfileSubmit
);
const popupWithImage = new PopupWithImage(document.querySelector("#popup-pic"));
const popUpEraseCard = new PopupWithConfirmation(
  handleEraseCard,
  document.querySelector("#popup-erase-card")
);

document.querySelector(".profile__edit-btn").addEventListener("click", () => {
  popupProfile.openPopup();
  popupProfile.setInputValues(userInfo.getUserInfo());
});

document.querySelector(".profile__add-btn").addEventListener("click", () => {
  popupNewPlace.openPopup();
});

document.querySelector(".profile__pic").addEventListener("click", () => {
  popupProfilePic.openPopup();
});

const init = function () {
  return Promise.all([apiHandler.getInitialCards(), apiHandler.getUserInfo()])
    .then(([cards, userData]) => {
      userInfo = new UserInfo(userData);
      document.querySelector(".profile__name").textContent = userData.name;
      document.querySelector(".profile__about-me").textContent = userData.about;
      document.querySelector(
        ".profile__pic"
      ).style.backgroundImage = `url(${userData.avatar})`;
      section.addItem(cards);
      section.renderItems();
    })
    .catch((err) => console.error(err));
};

init();
