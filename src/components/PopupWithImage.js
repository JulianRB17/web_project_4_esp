import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupWindow) {
    super(popupWindow);
    this._popupImg = popupWindow.querySelector("img");
    this._caption = popupWindow.querySelector(".popup__pic-name");
    this._setEventListeners();
  }

  openPopup({ name, link }) {
    super.openPopup();
    this._popupImg.src = link;
    this._popupImg.alt = name;
    this._caption.textContent = name;
  }

  _setEventListeners() {
    super._setEventListeners();
  }
}
