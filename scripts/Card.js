export class Card {
  constructor(nameValue, linkValue) {
    this._nameValue = nameValue;
    this._linkValue = linkValue;
    this._toggleLikeBtn();
    this._eraseCard();
  }

  _toggleLikeBtn() {
    document.querySelector(".cards").addEventListener("click", (e) => {
      e.target.classList.contains("cards__like-btn") &&
        e.target.classList.toggle("cards__like-btn_active");
    });
  }

  _eraseCard() {
    document
      .querySelector(".cards")
      .addEventListener(
        "click",
        (e) =>
          e.target.classList.contains("cards__trash-btn") &&
          e.target.closest(".cards__card-container").remove()
      );
  }
}
