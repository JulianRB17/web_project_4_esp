export class FormValidator {
  #modalWindow;
  #formSelector;
  #inputSelector;
  #submitButtonSelector;
  #inactiveButtonClass;
  #errorClass;
  #formElement;
  #inputList;
  #buttonElement;

  constructor(configObj, formElement) {
    this.#modalWindow = formElement;
    this.#formSelector = configObj.formSelector;
    this.#inputSelector = configObj.inputSelector;
    this.#submitButtonSelector = configObj.submitButtonSelector;
    this.#inactiveButtonClass = configObj.inactiveButtonClass;
    this.#errorClass = configObj.errorClass;

    // Selectores de form element, lista de inputs y botón de submit.

    this.#formElement = this.#modalWindow.querySelector(this.#formSelector);
    this.#inputList = Array.from(
      this.#modalWindow.querySelectorAll(this.#inputSelector)
    );
    this.#buttonElement = this.#modalWindow.querySelector(
      this.#submitButtonSelector
    );

    this._enableValidation();
  }

  //Mostrar mensaje de error
  _showInputError(inputElement) {
    const errorElement = this.#modalWindow.querySelector(
      `#${inputElement.id}-error`
    );
    this.#modalWindow
      .querySelector(`#${inputElement.id}-underline`)
      .classList.add("modal__input-underline_error");
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this.#errorClass);
  }

  //Ocultar mensaje de error
  _hideInputError(inputElement) {
    const errorElement = this.#modalWindow.querySelector(
      `#${inputElement.id}-error`
    );
    this.#modalWindow
      .querySelector(`#${inputElement.id}-underline`)
      .classList.remove("modal__input-underline_error");
    errorElement.textContent = "";
    errorElement.classList.remove(this.#errorClass);
  }

  // Determinar si un elemento input del form no es válido
  _hasInvalidInput() {
    return this.#inputList.some((inputElement) => {
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
    if (this._hasInvalidInput(this.#inputList)) {
      this.#buttonElement.classList.add(this.#inactiveButtonClass);
      this.#buttonElement.setAttribute("disabled", "");
    } else {
      this.#buttonElement.classList.remove(this.#inactiveButtonClass);
      this.#buttonElement.removeAttribute("disabled", "");
    }
  }

  //Seleccionar form y llamar a la modificación del botón, agrega un event listener a cada acción de "input" y a partir de la validez llama a modificar el botón.
  _setEventListeners() {
    this._toggleSaveButtonState();
    this.#inputList.forEach(
      function (inputElement) {
        inputElement.addEventListener(
          "input",
          function () {
            this._checkInputValidity(inputElement);
            this._toggleSaveButtonState();
          }.bind(this)
        );
      }.bind(this)
    );
  }

  //Detona la validación en cada form
  _enableValidation() {
    this.#formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  //Restablece la validación de formularios
  resetValidation() {
    this.#inputList.forEach(
      function (inputElement) {
        this._hideInputError(inputElement);
      }.bind(this)
    );
    this._toggleSaveButtonState();
  }
}
