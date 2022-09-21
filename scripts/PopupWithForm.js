import { Popup } from "./Popup.js";
import { FormValidator } from "./FormValidator.js";
import { UserInfo } from "./UserInfo.js";
import { Card } from "./Card.js";

export const cardsTemplate = document.querySelector("#cards__template").content;

export class PopupWithForms extends Popup {
  #formValidator;
  #userInfo = new UserInfo({
    userName: "Jacques Cousteau",
    userJob: "Explorador",
  });
  #card;

  #popupProfile = document.querySelector("#edit-profile");
  #popupNewPlace = document.querySelector("#new-place");
  #popupProfilePic = document.querySelector("#profile-pic");

  constructor(popupWindow) {
    super(popupWindow);
    this._setEventListeners();
    this.#formValidator = new FormValidator(
      {
        formSelector: ".popup__input-container",
        inputSelector: ".popup__input",
        submitButtonSelector: ".popup__save-btn",
        inactiveButtonClass: "popup__save-btn_inactive",
        errorClass: "popup__input-error_active",
      },
      this._popupWindow
    );
  }

  // Abre ventana popup
  openPopup() {
    super._openPopup();
    this.#formValidator.resetValidation();
    this.#userInfo.setUserInfo();
  }

  // Toma los datos de input de las ventanas popups y los almacena
  _getInputValues() {
    if (this._popupWindow === this.#popupProfile) {
      this._popupInputName = document.querySelector("#popup__input_name").value;
      this._popupInputAboutMe = document.querySelector(
        "#popup__input_about-me"
      ).value;
      this.#userInfo = new UserInfo({
        userName: this._popupInputName,
        userJob: this._popupInputAboutMe,
      });
    }
    if (this._popupWindow === this.#popupNewPlace) {
      this._popupInputNewPlacePic = document.querySelector(
        "#popup__input_new-place-pic"
      ).value;
      this._popupInputnewPlaceTitle = document.querySelector(
        "#popup__input_new-place-title"
      ).value;
    }
    if (this._popupWindow === this.#popupProfilePic) {
      this._popupInputProfilePic = document.querySelector(
        "#popup__input_profile-pic"
      ).value;
      this._popupInputProfilePicDescription = document.querySelector(
        "#popup__input_profile-pic-description"
      ).value;
    }
  }

  // Agrega los eventListeners de submit de la ventana popup
  _setEventListeners() {
    this._popupWindow.addEventListener("submit", (e) => {
      this._getInputValues();
      this._closePopup();

      if (this._popupWindow === this.#popupNewPlace) {
        this.#card = new Card(
          this._popupInputnewPlaceTitle,
          this._popupInputNewPlacePic,
          cardsTemplate
        );
        this.#card.addCard();
      }

      if (this._popupWindow === this.#popupProfile) {
        const profileName = document.querySelector(".profile__name");
        const profileAboutMe = document.querySelector(".profile__about-me");
        profileName.textContent = this.#userInfo._userName;
        profileAboutMe.textContent = this.#userInfo._userJob;
      }

      if (this._popupWindow === this.#popupProfilePic) {
        const profilePic = document.querySelector(".profile__pic");
        profilePic.style.backgroundImage = `url(${this._popupInputProfilePic})`;
        profilePic.setAttribute(
          "alt",
          `${this._popupInputProfilePicDescription}`
        );
      }
    });
    super._setEventListeners();
  }

  // Cierra ventana popup
  _closePopup() {
    super._closePopup();
    if (this._popupWindow === this.#popupProfile) return;
    this._popupWindow
      .querySelectorAll(".popup__input")
      .forEach((inputElement) => {
        inputElement.value = "";
      });
  }
}
