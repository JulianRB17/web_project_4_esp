// Clase padre de las ventanas popupes
export class Popup {
  constructor(popupWindow) {
    this._popupWindow = popupWindow;
  }

  //Abrir ventana popup y agregar eventListener para cerrar con escape.
  _openPopup() {
    this._popupWindow.classList.add("popup_opened");
    this._handleEscClose();
  }

  //Cerrar ventanas popupes
  _closePopup() {
    this._popupWindow.classList.remove("popup_opened");
  }

  _handleEscClose() {
    const escapeClosePopup = (e) => {
      if (e.key === "Escape") {
        this._popupWindow.classList.remove("popup_opened");
        document.removeEventListener("keydown", escapeClosePopup);
      }
    };
    document.addEventListener("keydown", escapeClosePopup);
  }

  _setEventListeners() {
    this._popupWindow
      .querySelector(".popup__close-btn")
      .addEventListener("click", () => {
        this._closePopup();
      });
    this._popupWindow
      .querySelector(".popup__overlay")
      .addEventListener("click", () => {
        {
          this._closePopup();
        }
      });
  }
}
