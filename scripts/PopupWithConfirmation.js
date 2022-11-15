import { Popup } from "./Popup.js";
import { apiHandler } from "./Api.js";

const popupEraseCardWindow = document.querySelector("#popup-erase-card");
class PopupWithConfirmation extends Popup {
  constructor(trashBtn) {
    super(popupEraseCardWindow);
    this._popupEraseCardWindow = popupEraseCardWindow;
    this._card = trashBtn.closest(".cards__card-container");
    this._setEventListeners();
    super._setEventListeners();
  }

  _setEventListeners() {
    this._popupEraseCardWindow.addEventListener("submit", (e) => {
      e.preventDefault();
      this._popupEraseCardWindow.querySelector(".popup__save-btn").textContent =
        "Guardando...";
      this._eraseCard();
    });
  }

  _eraseCard() {
    this._card.remove();
    apiHandler
      .deleteCard(this._card)
      .catch((err) => console.log(err))
      .finally(() => {
        this._closePopup();
        this._popupEraseCardWindow.querySelector(
          ".popup__save-btn"
        ).textContent = "Sí";
      });
  }
}

export const popupEraseCard = function (trashBtn) {
  return new PopupWithConfirmation(trashBtn);
};
