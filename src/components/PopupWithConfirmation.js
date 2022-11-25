import { Popup } from "./Popup.js";

const popupEraseCardWindow = document.querySelector("#popup-erase-card");

export class PopupWithConfirmation extends Popup {
  constructor(apiHandler) {
    super(popupEraseCardWindow);
    this._popupEraseCardWindow = popupEraseCardWindow;
    this._setEventListeners();
    super._setEventListeners();
    this._apiHandler = apiHandler;
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
    this._apiHandler
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
