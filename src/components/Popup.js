export class Popup {
  constructor(popupWindow) {
    this._popupWindow = popupWindow;
  }

  openPopup() {
    this._popupWindow.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  _closePopup() {
    this._popupWindow.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (e) => {
    if (e.key === "Escape") {
      this._closePopup();
    }
  };

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
