export class Popup {
  constructor(popupWindow) {
    this._popupWindow = popupWindow;
  }

  openPopup() {
    this._popupWindow.classList.add("popup_opened");
    this._handleEscClose();
  }

  _closePopup() {
    this._popupWindow.classList.remove("popup_opened");
  }

  _handleEscClose() {
    const escapeClosePopup = (e) => {
      if (e.key === "Escape") {
        this._closePopup();
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
