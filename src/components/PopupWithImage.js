import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor() {
    super(document.querySelector("#popup-pic"));
    super._setEventListeners();
  }
}
