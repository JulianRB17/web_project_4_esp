class UserInfo {
  constructor({ userName, userJob }) {
    this._userName = userName;
    this._userJob = userJob;
  }
  // Almacena los datos de la popup de edición de perfil
  getUserInfo() {
    return { name: this._userName, job: this._userJob };
  }

  // Coloca los datos de edición de perfil en la popup respectiva cuando se abre
  setUserInfo() {
    const inputProfileName = document.querySelector("#popup__input_name");
    const inputProfileAboutMe = document.querySelector(
      "#popup__input_about-me"
    );
    inputProfileName.value = this._userName;
    inputProfileAboutMe.value = this._userJob;
  }
}

export const newUserInfo = function (data) {
  return new UserInfo(data);
};
