import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(onEraseCard, popupEraseCardSelector) {
    super(popupEraseCardSelector);
    this._popupEraseCardSelector = popupEraseCardSelector;
    this._setEventListeners();
    super._setEventListeners();
    this._onEraseCard = onEraseCard;
  }

  openPopup(trashBtn) {
    super.openPopup();
    this._card = trashBtn.closest(".cards__card-container");
  }

  _setEventListeners() {
    this._popupEraseCardSelector.addEventListener("submit", (e) => {
      e.preventDefault();
      this._popupEraseCardSelector.querySelector(
        ".popup__save-btn"
      ).textContent = "Guardando...";
      this._onEraseCard();
    });
  }
}
