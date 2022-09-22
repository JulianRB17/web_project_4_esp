import { Popup } from "./Popup.js";
import { newFormValidator } from "./FormValidator.js";
import { newUserInfo } from "./UserInfo.js";
import { newCard } from "./Section.js";

export class PopupWithForms extends Popup {
  _userInfo = newUserInfo({
    userName: "Jacques Cousteau",
    userJob: "Explorador",
  });

  constructor(popupWindow) {
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
  }

  // Abre ventana popup
  openPopup() {
    super._openPopup();
    this._formValidator.resetValidation();
    this._userInfo.setUserInfo();
  }

  // Toma los datos de input de las ventanas popups y los almacena
  _getInputValues() {
    if (this._popupWindow === this._popupProfile) {
      this._popupInputName = document.querySelector("#popup__input_name").value;
      this._popupInputAboutMe = document.querySelector(
        "#popup__input_about-me"
      ).value;
      this._userInfo = newUserInfo({
        userName: this._popupInputName,
        userJob: this._popupInputAboutMe,
      });
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

      if (this._popupWindow === this._popupNewPlace) {
        this._card = newCard([
          {
            nameValue: this._popupInputnewPlaceTitle,
            linkValue: this._popupInputNewPlacePic,
          },
        ]);
        this._card.renderItem();
      }

      if (this._popupWindow === this._popupProfile) {
        const profileName = document.querySelector(".profile__name");
        const profileAboutMe = document.querySelector(".profile__about-me");
        profileName.textContent = this._userInfo._userName;
        profileAboutMe.textContent = this._userInfo._userJob;
      }

      if (this._popupWindow === this._popupProfilePic) {
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
    if (this._popupWindow === this._popupProfile) return;
    this._popupWindow
      .querySelectorAll(".popup__input")
      .forEach((inputElement) => {
        inputElement.value = "";
      });
  }
}
