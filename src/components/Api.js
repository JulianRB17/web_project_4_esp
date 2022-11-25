class Api {
  constructor(
    options = {
      headers: {
        authorization: "793ccaf5-d27e-4116-b328-f4d0925cd1fb",
        "Content-Type": "application/json",
      },
    }
  ) {
    this._baseUrl = "https://around.nomoreparties.co/v1/web_es_cohort_02/";
    this._options = options;
  }

  _fetchData() {
    return fetch(this._baseUrl + this._specificUrl, this._options)
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((error) => console.error(error));
  }

  getUserInfo() {
    this._specificUrl = "users/me";
    this._options.method = "GET";
    delete this._options.body;
    return this._fetchData();
  }

  toggleLikeBtn(likeBtn) {
    const card = likeBtn.closest(".cards__card-container");
    this._specificUrl = `/cards/likes/${card.id} `;
    this._options.method = likeBtn.classList.contains("cards__like-btn_active")
      ? "PUT"
      : "DELETE";
    delete this._options.body;
    return this._fetchData();
  }

  deleteCard(trashBtn) {
    const card = trashBtn.closest(".cards__card-container");
    this._specificUrl = `/cards/${card.id} `;
    this._options.method = "DELETE";
    delete this._options.body;
    return this._fetchData();
  }

  setNewPlace(data) {
    this._specificUrl = "/cards";
    this._options.method = "POST";
    this._options.body = JSON.stringify({
      name: data._popupInputnewPlaceTitle,
      link: data._popupInputNewPlacePic,
    });
    return this._fetchData();
  }

  changeUserInfo(data) {
    this._specificUrl = "users/me";
    (this._options.method = "PATCH"),
      (this._options.body = JSON.stringify({
        name: data._popupInputName,
        about: data._popupInputAboutMe,
      }));
    return this._fetchData();
  }

  getInitialCards() {
    this._specificUrl = "cards";
    this._options.method = "GET";
    delete this._options._body;
    return this._fetchData();
  }

  setInitialCards() {
    this.getUserInfo()
      .then((userData) => {
        return this.getInitialCardsApi().then((data) => {
          return { cardData: data, userData: userData };
        });
      })
      .then((data) => {
        const card = newCards(data.cardData, data.userData);
        card.renderItems();
      });
  }

  setProfilePic(data) {
    this._specificUrl = "users/me/avatar";
    this._options.method = "PATCH";
    this._options.body = JSON.stringify({ avatar: data });
    return this._fetchData();
  }
}

export const apiHandler = new Api();
