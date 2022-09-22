class FormValidator {
  constructor(configObj, formElement) {
    this._popupWindow = formElement;
    this._formSelector = configObj.formSelector;
    this._inputSelector = configObj.inputSelector;
    this._submitButtonSelector = configObj.submitButtonSelector;
    this._inactiveButtonClass = configObj.inactiveButtonClass;
    this._errorClass = configObj.errorClass;

    // Selectores de form element, lista de inputs y botón de submit.
    this._formElement = this._popupWindow.querySelector(this._formSelector);
    this._inputList = Array.from(
      this._popupWindow.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._popupWindow.querySelector(
      this._submitButtonSelector
    );

    this._enableValidation();
  }

  //Mostrar mensaje de error
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

  //Ocultar mensaje de error
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

  // Determinar si un elemento input del form no es válido
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //Verificar validez de datos en input para mostrar error
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //Modificar botón dependiendo de validez de form
  _toggleSaveButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute("disabled", "");
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled", "");
    }
  }

  //Seleccionar form y llamar a la modificación del botón, agrega un event listener a cada acción de "input" y a partir de la validez llama a modificar el botón.
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleSaveButtonState();
      });
    });
  }

  //Detona la validación en cada form
  _enableValidation() {
    this._formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  //Restablece la validación de formularios
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
