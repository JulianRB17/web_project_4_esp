import { popupEraseCard } from "./PopupWithConfirmation";
import { apiHandler } from "./Api.js";

export class Card {
  constructor() {
    this._toggleLikeBtn();
    // this._eraseCard();
  }

  _toggleLikeBtn() {
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

  // _eraseCard() {
  //     document.querySelector(".cards").addEventListener("click", (e) => {
  //       if (e.target.classList.contains("cards__trash-btn")) {
  //         popupEraseCard(e.target).openPopup();
  //       }
  //     });
  // }
}
