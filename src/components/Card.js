export class Card {
  constructor(
    userId,
    apiHandler,
    popupWithConfirmation,
    popupWithImage,
    template
  ) {
    this._userId = userId;
    this._apiHandler = apiHandler;
    this._popupWithConfirmation = popupWithConfirmation;
    this._popupWithImage = popupWithImage;
    this._template = template;
    this.isLiked = false;
  }

  getTemplate(data) {
    this._data = data;
    const { name, link, _id, likes } = this._data;

    this.cardElement = this._template.cloneNode(true);
    this.cardElement.querySelector(".cards__name").textContent = name;
    this.cardElement.querySelector(".cards__img").alt = name;
    this.cardElement.querySelector(".cards__img").src = link;
    this.cardElement.querySelector(".cards__like-number").textContent =
      likes.length;
    this.cardElement.querySelector(".cards__card-container").id = _id;
    this._trashBtn = this.cardElement.querySelector(".cards__trash-btn");
    this._likeBtn = this.cardElement.querySelector(".cards__like-btn");
    this._handleLike();
    this._addEventListeners();
  }

  _handleLike() {
    this._userId.then((userId) => {
      this._data.likes.forEach((like) => {
        if (like._id === userId) {
          this._likeBtn.classList.add("cards__like-btn_active");
          this.isLiked = true;
        }
      });
    });
  }

  _addEventListeners() {
    this._userId.then((userId) => {
      if (userId !== this._data.owner._id)
        this._trashBtn.style.display = "none";
      this._trashBtn.addEventListener("click", (e) =>
        this._popupWithConfirmation.openPopup(e.target)
      );
    });

    this._likeBtn.addEventListener("click", (e) => {
      this._apiHandler
        .toggleLikeBtn(
          e.target.closest(".cards__card-container").id,
          !this.isLiked
        )
        .then((data) => {
          e.target
            .closest(".cards__like-container")
            .querySelector(".cards__like-number").textContent =
            data.likes.length;
          e.target.classList.toggle("cards__like-btn_active");
          this.isLiked = !this.isLiked;
        })
        .catch((error) => console.error(error));
    });
  }
}
