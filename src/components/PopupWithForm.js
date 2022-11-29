import { Popup } from "./Popup.js";

export class PopupWithForms extends Popup {
  constructor(popupWindow, newFormValidator, onSubmit) {
    super(popupWindow);
    this._onSubmit = onSubmit;
    this._submitBtn = this._popupWindow.querySelector(".popup__save-btn");
    this._submitBtnText = "Guardar";
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
    this._inputList = this._popupWindow.querySelectorAll(".popup__input");
    this._inputNameSelector = document.querySelector("#popup__input_name");
    this._inputAboutSelector = document.querySelector("#popup__input_about-me");
    this._setEventListeners();
  }

  openPopup() {
    super.openPopup();
    this._formValidator.resetValidation();
    // this._setInputValues();
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  _setEventListeners() {
    super._setEventListeners();
    this._popupWindow.addEventListener("submit", (e) => {
      this._renderLoading(true);
      e.preventDefault();
      this._onSubmit(this._getInputValues())
        .then(() => {
          this._closePopup();
          this._renderLoading(false);
        })
        .catch((err) => console.error(err));
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

  _renderLoading(isLoading, loadingText = "Guardando...") {
    if (isLoading) {
      this._submitBtn.textContent = loadingText;
    } else {
      this._submitBtn.textContent = this._submitBtnText;
    }
  }
}
