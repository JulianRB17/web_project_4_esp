import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
  constructor() {
    super(document.querySelector("#popup-pic"));
    super._setEventListeners();
  }
}

export const newPopupWithImage = new PopupWithImage();
