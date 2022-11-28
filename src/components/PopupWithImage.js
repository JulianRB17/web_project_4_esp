import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupWindow) {
    super(popupWindow);
    this._popupImg = popupWindow.querySelector("img");
    this._caption = popupWindow.querySelector(".popup__pic-name");
    this._setEventListeners();
  }

  openPopup() {
    super.openPopup();
    this._popupImg.src = this._img.src;
    this._popupImg.alt = this._img.alt;
    this._caption.textContent = this._img.alt;
  }

  _setEventListeners() {
    super._setEventListeners();
    document.querySelector(".cards").addEventListener("click", (e) => {
      this._img = e.target.closest(".cards__img");
      if (!this._img) return;
      this.openPopup();
    });
  }
}
