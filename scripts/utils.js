import { FormValidator } from "./formValidator.js";
import { Card } from "./card.js";

const modalNewPlace = document.querySelector("#new-place");
const modalProfilePic = document.querySelector("#profile-pic");
const modalProfile = document.querySelector("#edit-profile");
const modalPic = document.querySelector("#modal-pic");

// Clase padre de las ventanas modales
class Modal {
  #modalWindow;
  _formValidator;

  constructor(modalWindow) {
    this.#modalWindow = modalWindow;
    if (!modalWindow.querySelector("input")) return;
    this._formValidator = new FormValidator(
      {
        formSelector: ".modal__input-container",
        inputSelector: ".modal__input",
        submitButtonSelector: ".modal__save-btn",
        inactiveButtonClass: "modal__save-btn_inactive",
        errorClass: "modal__input-error_active",
      },
      modalWindow
    );
  }

  //Resetear valores de los inputs
  _resetInputValues = () =>
    this.#modalWindow
      .querySelectorAll(".modal__input")
      .forEach((inputElement) => {
        inputElement.value = "";
      });

  //Abrir ventana modal y agregar eventListener para cerrar con escape.
  _openModal() {
    this.#modalWindow.classList.add("modal_opened");
    const escapeCloseModal = function (e) {
      if (e.key === "Escape") {
        this.#modalWindow.classList.remove("modal_opened");
        this._resetInputValues();
        document.removeEventListener("keydown", escapeCloseModal);
      }
    }.bind(this);
    document.addEventListener("keydown", escapeCloseModal);
  }

  //Cerrar ventanas modales
  _closeModal() {
    this.#modalWindow.classList.remove("modal_opened");
    this._resetInputValues();
  }

  _btnCloseModal() {
    this.#modalWindow.querySelector(".modal__close-btn").addEventListener(
      "click",
      function () {
        this._closeModal();
      }.bind(this)
    );
    this.#modalWindow
      .querySelector(".modal__overlay")
      .addEventListener("click", () => {
        {
          this._closeModal();
        }
      });
  }

  // Salvar datos en ventana modal
  _saveAndCloseModal(saveFunction) {
    const saveAndClose = function () {
      saveFunction();
      this._closeModal();
    }.bind(this);

    this.#modalWindow
      .querySelector(".modal__save-btn")
      .addEventListener("click", function () {
        saveAndClose();
      });
  }
}

// Ventana modal para edición de datos de perfil.
export class ProfileModal extends Modal {
  constructor() {
    super(modalProfile);
    this._openProfileModal();
    super._btnCloseModal();
    super._saveAndCloseModal(this._saveProfile);
  }

  //Abrir ventana de edición de perfil
  _openProfileModal() {
    const modalInputName = document.querySelector("#modal__input_name");
    const modalInputAboutMe = document.querySelector("#modal__input_about-me");
    const profileName = document.querySelector(".profile__name");
    const profileAboutMe = document.querySelector(".profile__about-me");

    document.querySelector(".profile__edit-btn").addEventListener(
      "click",
      function () {
        this._openModal();
        modalInputName.value = profileName.textContent;
        modalInputAboutMe.value = profileAboutMe.textContent;
        this._formValidator.resetValidation();
      }.bind(this)
    );
  }

  //Salvar datos de edición de perfil
  _saveProfile() {
    const modalInputName = document.querySelector("#modal__input_name");
    const modalInputAboutMe = document.querySelector("#modal__input_about-me");
    const profileName = document.querySelector(".profile__name");
    const profileAboutMe = document.querySelector(".profile__about-me");

    profileName.textContent = modalInputName.value;
    profileAboutMe.textContent = modalInputAboutMe.value;
  }
}

// Ventana modal para nuevo lugar
export class NewPlaceModal extends Modal {
  constructor() {
    super(modalNewPlace);
    this._openNewPlaceModal();
    super._btnCloseModal();
    super._saveAndCloseModal(this._saveNewPlace);
  }

  _openNewPlaceModal() {
    document.querySelector(".profile__add-btn").addEventListener(
      "click",
      function () {
        this._openModal();
        this._formValidator.resetValidation();
      }.bind(this)
    );
  }

  //Salvar datos de nuevo lugar
  _saveNewPlace() {
    const newPlacePic = modalNewPlace.querySelector(
      "#modal__input_new-place-pic"
    ).value;
    const newPlaceTitle = modalNewPlace.querySelector(
      "#modal__input_new-place-title"
    ).value;
    const cardsTemplate = document.querySelector("#cards__template").content;

    const card = new Card(newPlaceTitle, newPlacePic, cardsTemplate);
    card.addCard();
    modalNewPlace.querySelectorAll("input").forEach((inputs) => {
      inputs.value = "";
    });
  }
}

// Ventana modal para cambio de imagen de perfil
export class ProfilePicModal extends Modal {
  constructor() {
    super(modalProfilePic);
    super._btnCloseModal();
    super._saveAndCloseModal(this._saveProfilePic);
    this._openProfilePicModal();
  }

  _openProfilePicModal() {
    document.querySelector(".profile__pic").addEventListener("click", () => {
      this._openModal();
      this._formValidator.resetValidation();
    });
  }

  //Salvar datos de ventana de foto de perfil
  _saveProfilePic() {
    const profilePic = document.querySelector(".profile__pic");

    profilePic.style.backgroundImage = `url(${
      modalProfilePic.querySelector("#modal__input_profile-pic").value
    })`;
    profilePic.setAttribute(
      "alt",
      `${
        modalProfilePic.querySelector("#modal__input_profile-pic-description")
          .value
      }`
    );
  }
}

//Imagen en ventana modal
export class PicModal extends Modal {
  constructor() {
    super(modalPic);
    super._btnCloseModal();
    this._openImgModal();
  }

  _openImgModal() {
    document.querySelector(".cards").addEventListener("click", (e) => {
      const img = e.target.closest(".cards__img");
      if (!img) return;
      super._openModal();
      modalPic.querySelector(".modal__pic").src = img.src;
      modalPic.querySelector(".modal__pic").alt = img.alt;
      modalPic.querySelector(".modal__pic-name").textContent = img.alt;
    });
  }
}
