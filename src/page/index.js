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

const userInfo = apiHandler
  .getUserInfo()
  .then((data) => new UserInfo(data, apiHandler))
  .catch((err) => console.error(err));

const userId = userInfo
  .then((userInfoObj) => userInfoObj.getUserInfo())
  .then((userInfo) => userInfo._id);

const cardRenderer = function (data) {
  const newCard = new Card(
    userId,
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
  apiHandler
    .setNewPlace(data)
    .then((data) => {
      const dataArray = [data];
      section.addItem(dataArray);
      section.renderItems();
      this._closePopup();
    })
    .catch((err) => console.error(err))
    .finally(() => {
      this._popupWindow.querySelector(".popup__save-btn").textContent = "Crear";
    });
};

const handleProfilePicSubmit = function (data) {
  apiHandler
    .setProfilePic(data)
    .then((data) => {
      document.querySelector(
        ".profile__pic"
      ).style.backgroundImage = `url(${data.avatar})`;
      this._closePopup();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      this._popupWindow.querySelector(".popup__save-btn").textContent =
        "Guardar";
    });
};

const handleProfileSubmit = function (data) {
  userInfo
    .then((userInfoObj) => userInfoObj.setUserInfo(data))
    .then((data) => {
      document.querySelector(".profile__name").textContent = data.name;
      document.querySelector(".profile__about-me").textContent = data.about;
    })
    .catch((err) => console.error(err))
    .finally(() => {
      this._closePopup();
      this._popupWindow.querySelector(".popup__save-btn").textContent = "Crear";
    });
};

const handleEraseCard = function () {
  apiHandler
    .deleteCard(this._card.id)
    .then(() => {
      this._card.remove();
      this._closePopup();
      this._popupEraseCardSelector.querySelector(
        ".popup__save-btn"
      ).textContent = "Sí";
    })
    .catch((err) => console.log(err));
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
});

document.querySelector(".profile__add-btn").addEventListener("click", () => {
  popupNewPlace.openPopup();
});

document.querySelector(".profile__pic").addEventListener("click", () => {
  popupProfilePic.openPopup();
});

const init = function () {
  Promise.all([
    apiHandler.getInitialCards(),
    userInfo.then((userInfoObj) => userInfoObj.getUserInfo()),
  ]).then(([cards, userInfo]) => {
    document.querySelector(".profile__name").textContent = userInfo.name;
    document.querySelector(".profile__about-me").textContent = userInfo.about;
    document.querySelector(
      ".profile__pic"
    ).style.backgroundImage = `url(${userInfo.avatar})`;
    section.addItem(cards);
    section.renderItems();
  });
};

init();
