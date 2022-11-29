import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(onEraseCard, popupEraseCardSelector) {
    super(popupEraseCardSelector);
    this._popupEraseCardSelector = popupEraseCardSelector;
    this._submitBtn =
      this._popupEraseCardSelector.querySelector(".popup__save-btn");
    this._submitBtnText = "Sí";
    this._setEventListeners();
    this._onEraseCard = onEraseCard;
  }

  openPopup(trashBtn) {
    super.openPopup();
    this._card = trashBtn.closest(".cards__card-container");
  }

  _setEventListeners() {
    super._setEventListeners();
    this._popupEraseCardSelector.addEventListener("submit", (e) => {
      e.preventDefault();
      this._renderLoading(true);
      this._onEraseCard(this._card.id)
        .then(() => {
          this._card.remove();
          this._closePopup();
          this._renderLoading(false);
        })
        .catch((err) => console.error(err));
    });
  }

  _renderLoading(isLoading, loadingText = "Guardando...") {
    if (isLoading) {
      this._submitBtn.textContent = loadingText;
    } else {
      this._submitBtn.textContent = this._submitBtnText;
    }
  }
}
