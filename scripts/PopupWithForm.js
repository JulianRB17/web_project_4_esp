import { Popup } from "./Popup.js";
import { newFormValidator } from "./FormValidator.js";
import { newUserInfo } from "./UserInfo.js";
import { newCards } from "./Section.js";
import { changeUserInfoApi, setNewPlaceApi, setProfilePic } from "./Api.js";
import { eraseCardApi } from "./Api.js";

export class PopupWithForms extends Popup {
  _userInfo = newUserInfo;
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
    this._popupEraseCard = document.querySelector("#popup-erase-card");
    this._card = card;
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
      this._userInfo.name = this._popupInputName;
      this._userInfo.about = this._popupInputAboutMe;
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

  // Agrega los eventListeners de submit de la ventana popup
  _setEventListeners() {
    this._popupWindow.addEventListener("submit", (e) => {
      e.preventDefault();
      this._getInputValues();
      this._popupWindow.querySelector(".popup__save-btn").textContent =
        "Guardando...";

      if (this._popupWindow === this._popupNewPlace) {
        setNewPlaceApi(this)
          .getData()
          .then((data) => {
            this._card = newCards([data], this._userInfo).renderItems();
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
        profileName.textContent = this._userInfo.name;
        profileAboutMe.textContent = this._userInfo.about;
        changeUserInfoApi(this)
          .getData()
          .catch((err) => console.log(err))
          .finally((data) => {
            this._closePopup();
            this._popupWindow.querySelector(".popup__save-btn").textContent =
              "Guardar";
          });
      }

      if (this._popupWindow === this._popupProfilePic) {
        const profilePic = document.querySelector(".profile__pic");
        setProfilePic(this._popupInputProfilePic)
          .getData()
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

      if (this._popupWindow === this._popupEraseCard) {
        this._card.closest(".cards__card-container").remove();
        eraseCardApi(this._card)
          .getData()
          .catch((err) => console.log(err))
          .finally((data) => {
            this._closePopup();
            this._popupWindow.querySelector(".popup__save-btn").textContent =
              "Sí";
          });
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
