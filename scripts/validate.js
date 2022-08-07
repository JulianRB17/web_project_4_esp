"use strict";

//Mostrar mensaje de error
const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  errorClass
) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  formElement
    .querySelector(`#${inputElement.id}-underline`)
    .classList.add("modal__input-underline_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

//Ocultar mensaje de error
const hideInputError = (formElement, inputElement, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  formElement
    .querySelector(`#${inputElement.id}-underline`)
    .classList.remove("modal__input-underline_error");
  errorElement.textContent = "";
  errorElement.classList.remove(errorClass);
};

//Restablece la validación de formularios
const resetValidation = (modalWindow) => {
  modalWindow.querySelectorAll(".modal__input").forEach((inputElement) => {
    hideInputError(modalWindow, inputElement, "modal__input-error_active");
  });
};

//Verificar validez de datos en input para mostrar error
const checkInputValidity = (formElement, inputElement, errorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      errorClass
    );
  } else {
    hideInputError(formElement, inputElement, errorClass);
  }
};

// Determinar si un elemento input del form no es válido
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//Modificar botón dependiendo de validez de form
const toggleSaveButtonState = (
  inputList,
  buttonElement,
  inactiveButtonClass
) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute("disabled", "");
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute("disabled", "");
  }
};

//Seleccionar form y llamar a la modificación del botón, agrega un event listener a cada acción de "input" y a partir de la validez llama a modificar el botón.
const setEventListeners = (
  formElement,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  errorClass
) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleSaveButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, errorClass);
      toggleSaveButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

//Detona la validación en cada form
const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(
      formElement,
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      errorClass
    );
  });
};

enableValidation({
  formSelector: ".modal__input-container",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-btn",
  inactiveButtonClass: "modal__save-btn_inactive",
  inputErrorClass: "modal__input_error",
  errorClass: "modal__input-error_active",
});

//Exportación de resetValidation

export { resetValidation };
