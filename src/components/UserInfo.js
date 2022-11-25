export class UserInfo {
  constructor(apiHandler) {
    this._apiHandler = apiHandler;
    this.getUserInfo();
  }

  getUserInfo() {
    return this._apiHandler
      .getUserInfo()
      .then((data) => {
        document.querySelector(".profile__name").textContent = data.name;
        document.querySelector(".profile__about-me").textContent = data.about;
        document.querySelector(
          ".profile__pic"
        ).style.backgroundImage = `url(${data.avatar})`;
        return data;
      })
      .catch((error) => console.error(error));
  }

  setUserInfo() {
    this.getUserInfo()
      .then((data) => {
        const inputProfileName = document.querySelector("#popup__input_name");
        const inputProfileAboutMe = document.querySelector(
          "#popup__input_about-me"
        );
        const inputProfilePic = document.querySelector(
          "#popup__input_profile-pic"
        );
        inputProfileName.value = data.name;
        inputProfileAboutMe.value = data.about;
        inputProfilePic.value = data.avatar;
      })
      .catch((error) => console.error(error));
  }
}
