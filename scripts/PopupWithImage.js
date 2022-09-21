import { Popup } from "./Popup.js";
const popupPic = document.querySelector("#popup-pic");

export class PopupWithImage extends Popup {
  constructor() {
    super(popupPic);
    super._setEventListeners();
  }

  // Agrega el eventListener para abrir la popup de imagen
  _handleCardClick() {
    document.querySelector(".cards").addEventListener("click", (e) => {
      const img = e.target.closest(".cards__img");
      if (!img) return;
      super._openPopup();
      popupPic.querySelector(".popup__pic").src = img.src;
      popupPic.querySelector(".popup__pic").alt = img.alt;
      popupPic.querySelector(".popup__pic-name").textContent = img.alt;
    });
  }
}
