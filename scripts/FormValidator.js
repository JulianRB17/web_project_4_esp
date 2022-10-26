class FormValidator {
  constructor(configObj, formElement) {
    this._popupWindow = formElement;
    this._formSelector = configObj.formSelector;
    this._inputSelector = configObj.inputSelector;
    this._submitButtonSelector = configObj.submitButtonSelector;
    this._inactiveButtonClass = configObj.inactiveButtonClass;
    this._errorClass = configObj.errorClass;

    this._formElement = this._popupWindow.querySelector(this._formSelector);
    this._inputList = Array.from(
      this._popupWindow.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._popupWindow.querySelector(
      this._submitButtonSelector
    );

    this._enableValidation();
  }

  _showInputError(inputElement) {
    const errorElement = this._popupWindow.querySelector(
      `#${inputElement.id}-error`
    );
    this._popupWindow
      .querySelector(`#${inputElement.id}-underline`)
      .classList.add("popup__input-underline_error");
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._popupWindow.querySelector(
      `#${inputElement.id}-error`
    );
    this._popupWindow
      .querySelector(`#${inputElement.id}-underline`)
      .classList.remove("popup__input-underline_error");
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleSaveButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute("disabled", "");
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled", "");
    }
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleSaveButtonState();
      });
    });
  }

  _enableValidation() {
    this._formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleSaveButtonState();
  }
}

export const newFormValidator = function (configObj, formElement) {
  return new FormValidator(configObj, formElement);
};
