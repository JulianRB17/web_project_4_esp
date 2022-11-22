import { Popup } from "./Popup.js";
import { apiHandler } from "./Api.js";

const popupEraseCardWindow = document.querySelector("#popup-erase-card");

class PopupWithConfirmation extends Popup {
  constructor() {
    super(popupEraseCardWindow);
    this._popupEraseCardWindow = popupEraseCardWindow;
    this._setEventListeners();
    super._setEventListeners();
  }

  openPopup(trashBtn) {
    super.openPopup();
    this._card = trashBtn.closest(".cards__card-container");
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

export const newPopupWithConfirmation = new PopupWithConfirmation();
