class Api {
  constructor({
    specificUrl,
    options = {
      method: "GET",
      headers: { authorization: "793ccaf5-d27e-4116-b328-f4d0925cd1fb" },
    },
  }) {
    this._baseUrl = "https://around.nomoreparties.co/v1/web_es_cohort_02/";
    this._specificUrl = specificUrl;
    this._options = options;
  }

  _applyJson() {
    return fetch(this._baseUrl + this._specificUrl, this._options).then(
      (res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Error: ${res.status}`);
      }
    );
  }

  getData() {
    return this._applyJson();
  }
}

export const newUserInfoApi = new Api({
  specificUrl: "users/me",
});

export const cardLikeBtnApi = function (e) {
  const card = e.target.closest(".cards__card-container");
  return new Api({
    specificUrl: `/cards/likes/${card.id} `,
    options: {
      method: e.target.classList.contains("cards__like-btn_active")
        ? "PUT"
        : "DELETE",
      headers: {
        authorization: "793ccaf5-d27e-4116-b328-f4d0925cd1fb",
        "Content-Type": "application/json",
      },
    },
  });
};

export const eraseCardApi = function (trashBtn) {
  const card = trashBtn.closest(".cards__card-container");
  return new Api({
    specificUrl: `/cards/${card.id} `,
    options: {
      method: "DELETE",
      headers: { authorization: "793ccaf5-d27e-4116-b328-f4d0925cd1fb" },
    },
  });
};

export const setNewPlaceApi = function (data) {
  return new Api({
    specificUrl: "/cards",
    options: {
      method: "POST",
      headers: {
        authorization: "793ccaf5-d27e-4116-b328-f4d0925cd1fb",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data._popupInputnewPlaceTitle,
        link: data._popupInputNewPlacePic,
      }),
    },
  });
};

export const changeUserInfoApi = function (data) {
  return new Api({
    specificUrl: "users/me",
    options: {
      method: "PATCH",
      headers: {
        authorization: "793ccaf5-d27e-4116-b328-f4d0925cd1fb",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data._userInfo.name,
        about: data._userInfo.about,
      }),
    },
  });
};

export const getInitialCardsApi = function () {
  return new Api({ specificUrl: "cards" });
};

export const setProfilePic = function (data) {
  return new Api({
    specificUrl: "users/me/avatar",
    options: {
      method: "PATCH",
      headers: {
        authorization: "793ccaf5-d27e-4116-b328-f4d0925cd1fb",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ avatar: data }),
    },
  });
};
