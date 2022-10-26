import { newUserInfoApi } from "./Api.js";

class UserInfo {
  constructor() {
    this.getUserInfo();
  }

  getUserInfo() {
    return newUserInfoApi.getData().then((data) => {
      this.userName = data.name;
      this.userAbout = data.about;
      this.avatar = data.avatar;
      this._id = data._id;
      document.querySelector(".profile__name").textContent = data.name;
      document.querySelector(".profile__about-me").textContent = data.about;
      document.querySelector(
        ".profile__pic"
      ).style.backgroundImage = `url(${data.avatar})`;
      return this;
    });
  }

  setUserInfo() {
    this.getUserInfo().then((data) => {
      const inputProfileName = document.querySelector("#popup__input_name");
      const inputProfileAboutMe = document.querySelector(
        "#popup__input_about-me"
      );
      const inputProfilePic = document.querySelector(
        "#popup__input_profile-pic"
      );
      inputProfileName.value = this.userName;
      inputProfileAboutMe.value = this.userAbout;
      inputProfilePic.value = this.avatar;
    });
  }
}

export const newUserInfo = new UserInfo();
