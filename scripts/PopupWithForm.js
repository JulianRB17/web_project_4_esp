import { Popup } from "./Popup.js";
import { newFormValidator } from "./FormValidator.js";
import { newUserInfo } from "./UserInfo.js";
import { newCards } from "./Section.js";
import { apiHandler } from "./Api.js";

export class PopupWithForms extends Popup {
  constructor(popupWindow, card) {
    super(popupWindow);
    this._setEventListeners();
    this._formValidator = newFormValidator(
      {
        formSelector: ".popup__input-container",
        inputSelector: ".popup__input",
        submitButtonSelector: ".popup__save-btn",
        inactiveButtonClass: "popup__save-btn_inactive",
        errorClass: "popup__input-error_active",
      },
      this._popupWindow
    );
    this._popupProfile = document.querySelector("#edit-profile");
    this._popupNewPlace = document.querySelector("#new-place");
    this._popupProfilePic = document.querySelector("#profile-pic");
    this._card = card;
  }

  openPopup() {
    super.openPopup();
    this._formValidator.resetValidation();
    newUserInfo.setUserInfo();
  }

  _getInputValues() {
    if (this._popupWindow === this._popupProfile) {
      this._popupInputName = document.querySelector("#popup__input_name").value;
      this._popupInputAboutMe = document.querySelector(
        "#popup__input_about-me"
      ).value;
      newUserInfo.name = this._popupInputName;
      newUserInfo.about = this._popupInputAboutMe;
    }

    if (this._popupWindow === this._popupNewPlace) {
      this._popupInputNewPlacePic = document.querySelector(
        "#popup__input_new-place-pic"
      ).value;
      this._popupInputnewPlaceTitle = document.querySelector(
        "#popup__input_new-place-title"
      ).value;
    }
    if (this._popupWindow === this._popupProfilePic) {
      this._popupInputProfilePic = document.querySelector(
        "#popup__input_profile-pic"
      ).value;
    }
  }

  _setEventListeners() {
    this._popupWindow.addEventListener("submit", (e) => {
      e.preventDefault();
      this._getInputValues();
      this._popupWindow.querySelector(".popup__save-btn").textContent =
        "Guardando...";

      if (this._popupWindow === this._popupNewPlace) {
        apiHandler
          .setNewPlace(this)
          .then((data) => {
            this._card = newCards([data], newUserInfo).renderItems();
          })
          .catch((err) => console.log(err))
          .finally((data) => {
            this._closePopup();
            this._popupWindow.querySelector(".popup__save-btn").textContent =
              "Crear";
          });
      }

      if (this._popupWindow === this._popupProfile) {
        const profileName = document.querySelector(".profile__name");
        const profileAboutMe = document.querySelector(".profile__about-me");
        profileName.textContent = newUserInfo.name;
        profileAboutMe.textContent = newUserInfo.about;
        apiHandler
          .changeUserInfo(this)
          .catch((err) => console.log(err))
          .finally((data) => {
            this._closePopup();
            this._popupWindow.querySelector(".popup__save-btn").textContent =
              "Guardar";
          });
      }

      if (this._popupWindow === this._popupProfilePic) {
        const profilePic = document.querySelector(".profile__pic");
        apiHandler
          .setProfilePic(this._popupInputProfilePic)
          .then(
            (data) => (profilePic.style.backgroundImage = `url(${data.avatar})`)
          )
          .catch((err) => console.log(err))
          .finally((data) => {
            this._closePopup();
            this._popupWindow.querySelector(".popup__save-btn").textContent =
              "Guardar";
          });
      }
    });
    super._setEventListeners();
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
