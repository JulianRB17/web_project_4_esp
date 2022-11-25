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

const userInfo = new UserInfo(apiHandler);
const popUpEraseCard = new PopupWithConfirmation(apiHandler);
const popupWithImage = new PopupWithImage();

const cardHandler = new Card(
  userInfo,
  apiHandler,
  popUpEraseCard,
  popupWithImage
);

const cardRenderer = function (data) {
  const newCard = cardHandler.getTemplate(data);
  cardHandler._handleTrashButton(
    data.owner,
    newCard.querySelector(".cards__trash-btn")
  );
  cardHandler._handleLikeToggle(
    data.likes,
    newCard.querySelector(".cards__like-btn")
  );
  return newCard;
};

const section = new Section(
  { items: [], renderer: cardRenderer },
  document.querySelector(".cards")
);

apiHandler.getInitialCards().then((cards) => {
  section.addItem(cards);
  section.renderItems();
});

const popupNewPlace = new PopupWithForms(
  document.querySelector("#new-place"),
  userInfo,
  apiHandler,
  newFormValidator,
  section
);
const popupProfilePic = new PopupWithForms(
  document.querySelector("#profile-pic"),
  userInfo,
  apiHandler,
  newFormValidator
);
const popupProfile = new PopupWithForms(
  document.querySelector("#edit-profile"),
  userInfo,
  apiHandler,
  newFormValidator
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
