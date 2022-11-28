import { Popup } from "./Popup.js";

export class PopupWithForms extends Popup {
  constructor(popupWindow, newFormValidator, onSubmit) {
    super(popupWindow);
    this._onSubmit = onSubmit;
    this._formValidator = newFormValidator(
      {
        formSelector: ".popup__input-container",
        inputSelector: ".popup__input",
        submitButtonSelector: ".popup__save-btn",
        inactiveButtonClass: "popup__save-btn_inactive",
        errorClass: "popup__input-error_active",
        underlineErrorClass: "popup__input-underline_error",
      },
      this._popupWindow
    );
    this._setEventListeners();
  }

  openPopup() {
    super.openPopup();
    this._formValidator.resetValidation();
    this._setInputValues();
  }

  _getInputValues() {
    return {
      name: document.querySelector("#popup__input_name").value,
      about: document.querySelector("#popup__input_about-me").value,
      newPlace: document.querySelector("#popup__input_new-place-pic").value,
      newPlaceCaption: document.querySelector("#popup__input_new-place-title")
        .value,
      avatar: document.querySelector("#popup__input_profile-pic").value,
    };
  }

  _setInputValues() {
    document.querySelector("#popup__input_name").value =
      document.querySelector(".profile__name").textContent;
    document.querySelector("#popup__input_about-me").value =
      document.querySelector(".profile__about-me").textContent;
  }

  _setEventListeners() {
    super._setEventListeners();
    this._popupWindow.addEventListener("submit", (e) => {
      e.preventDefault();
      this._popupWindow.querySelector(".popup__save-btn").textContent =
        "Guardando...";
      this._onSubmit(this._getInputValues());
    });
  }

  _closePopup() {
    super._closePopup();
    this._popupWindow
      .querySelectorAll(".popup__input")
      .forEach((inputElement) => {
        inputElement.value = "";
      });
  }
}
