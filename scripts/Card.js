import { popupEraseCard } from "./PopupWithConfirmation";
import { apiHandler } from "./Api.js";
import { newPopupWithImage } from "./PopupWithImage.js";

export class Card {
  constructor() {
    this._handleLikeBtn();
    this._handleCardClick();
    // this._handleTrashBtn();
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
}

// _handleTrashBtn() {
//     document.querySelector(".cards").addEventListener("click", (e) => {
//       if (e.target.classList.contains("cards__trash-btn")) {
//         popupEraseCard(e.target).openPopup();
//       }
//     });
// }
