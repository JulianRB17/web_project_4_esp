import { Popup } from "./Popup.js";

export class PopupWithForms extends Popup {
  constructor(popupWindow, userInfo, apiHandler, newFormValidator, newCard) {
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
    this._userInfo = userInfo;
    this._apiHandler = apiHandler;
    this._newCard = newCard;
  }

  openPopup() {
    super.openPopup();
    this._formValidator.resetValidation();
    this._userInfo.setUserInfo();
  }

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

  _setEventListeners() {
    this._popupWindow.addEventListener("submit", (e) => {
      e.preventDefault();
      this._getInputValues();
      this._popupWindow.querySelector(".popup__save-btn").textContent =
        "Guardando...";

      if (this._popupWindow === this._popupNewPlace) {
        this._apiHandler
          .setNewPlace(this)
          .then((data) => {
            const dataArray = [data];
            this._newCard.addItem(dataArray);
            this._newCard.renderItems();
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
        this._apiHandler
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
        this._apiHandler
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
