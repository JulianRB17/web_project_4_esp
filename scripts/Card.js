// import popupEraseCard  from "./PopupWithConfirmation";
import { newUserInfo } from "./UserInfo.js";
import { apiHandler } from "./Api.js";
import { newPopupWithImage } from "./PopupWithImage.js";
import { newPopupWithConfirmation } from "./PopupWithConfirmation.js";

export class Card {
  constructor() {
    this._handleLikeBtn();
    this._handleCardClick();
  }

  _handleLikeBtn() {
    document.querySelector(".cards").addEventListener("click", (e) => {
      if (e.target.classList.contains("cards__like-btn")) {
        e.target.classList.toggle("cards__like-btn_active");
        apiHandler
          .toggleLikeBtn(e.target)
          .then(
            (data) =>
              (e.target
                .closest(".cards__like-container")
                .querySelector(".cards__like-number").textContent =
                data.likes.length)
          )
          .catch((error) => console.error(error));
      }
    });
  }

  _handleCardClick() {
    const popupPic = document.querySelector("#popup-pic");
    document.querySelector(".cards").addEventListener("click", (e) => {
      const img = e.target.closest(".cards__img");
      if (!img) return;
      newPopupWithImage.openPopup();
      popupPic.querySelector(".popup__pic").src = img.src;
      popupPic.querySelector(".popup__pic").alt = img.alt;
      popupPic.querySelector(".popup__pic-name").textContent = img.alt;
    });
  }

  getTemplate(name, link, _id, owner, likes) {
    return newUserInfo
      .getUserInfo()
      .then((userInfo) => {
        const newCard = document
          .querySelector("#cards__template")
          .content.cloneNode(true);
        newCard.querySelector(".cards__name").textContent = name;
        newCard.querySelector(".cards__img").alt = name;
        newCard.querySelector(".cards__img").src = link;
        newCard.querySelector(".cards__like-number").textContent = likes.length;
        newCard.querySelector(".cards__card-container").id = _id;

        this._handleTrashButton(userInfo, owner, newCard);
        this._handleLikeToggle(likes, userInfo), newCard;

        return newCard;
      })
      .catch((err) => console.error(err));
  }

  _handleLikeToggle(likes, userInfo, newCard) {
    likes.forEach((like) => {
      if (like._id === userInfo._id) {
        newCard
          .querySelector(".cards__like-btn")
          .classList.add("cards__like-btn_active");
      }
    });
  }

  _handleTrashButton(userInfo, owner, newCard) {
    const trashBtn = newCard.querySelector(".cards__trash-btn");

    if (userInfo._id !== owner._id) trashBtn.style.display = "none";
    trashBtn.addEventListener("click", (e) =>
      newPopupWithConfirmation.openPopup(e.target)
    );
  }
}
