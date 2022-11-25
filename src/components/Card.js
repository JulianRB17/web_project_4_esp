export class Card {
  constructor(userInfo, apiHandler, popupWithConfirmation, popupWithImage) {
    this._handleLikeBtn();
    this._handleCardClick();
    this._userInfo = userInfo.getUserInfo();
    this._apiHandler = apiHandler;
    this._popupWithConfirmation = popupWithConfirmation;
    this._popupWithImage = popupWithImage;
  }

  _handleLikeBtn() {
    document.querySelector(".cards").addEventListener("click", (e) => {
      if (e.target.classList.contains("cards__like-btn")) {
        e.target.classList.toggle("cards__like-btn_active");
        this._apiHandler
          .toggleLikeBtn(e.target)
          .then(
            (data) =>
              (e.target
                .closest(".cards__like-container")
                .querySelector(".cards__like-number").textContent =
                data.likes.length)
          )
          .catch((error) => console.error(error));
      }
    });
  }

  _handleCardClick() {
    const popupPic = document.querySelector("#popup-pic");
    document.querySelector(".cards").addEventListener("click", (e) => {
      const img = e.target.closest(".cards__img");
      if (!img) return;
      this._popupWithImage.openPopup();
      popupPic.querySelector(".popup__pic").src = img.src;
      popupPic.querySelector(".popup__pic").alt = img.alt;
      popupPic.querySelector(".popup__pic-name").textContent = img.alt;
    });
  }

  getTemplate({ name, link, _id, likes }) {
    const newCard = document
      .querySelector("#cards__template")
      .content.cloneNode(true);
    newCard.querySelector(".cards__name").textContent = name;
    newCard.querySelector(".cards__img").alt = name;
    newCard.querySelector(".cards__img").src = link;
    newCard.querySelector(".cards__like-number").textContent = likes.length;
    newCard.querySelector(".cards__card-container").id = _id;

    return newCard;
  }

  _handleLikeToggle(likes, likeBtn) {
    this._userInfo.then((userInfo) => {
      likes.forEach((like) => {
        if (like._id === userInfo._id) {
          likeBtn.classList.add("cards__like-btn_active");
        }
      });
    });
  }

  _handleTrashButton(owner, trashBtn) {
    this._userInfo.then((userInfo) => {
      if (userInfo._id !== owner._id) trashBtn.style.display = "none";
      trashBtn.addEventListener("click", (e) =>
        this._popupWithConfirmation.openPopup(e.target)
      );
    });
  }
}
