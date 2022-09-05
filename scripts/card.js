export class Card {
  #nameValue;
  #linkValue;
  #card;
  #newCard;

  constructor(nameValue, linkValue, template) {
    this.#nameValue = nameValue;
    this.#linkValue = linkValue;
    this.#card = template.querySelector(".cards__card-container");
  }

  // Agregar carta de nuevo lugar
  addCard() {
    this.#newCard = this.#card.cloneNode(true);
    this.#newCard.querySelector(".cards__name").textContent = this.#nameValue;
    this.#newCard.querySelector(".cards__img").alt = this.#nameValue;
    this.#newCard.querySelector(".cards__img").src = this.#linkValue;
    this._toggleLikeBtn(this.#newCard);
    this._eraseCard(this.#newCard);
    return document.querySelector(".cards").prepend(this.#newCard);
  }

  _toggleLikeBtn() {
    this.#newCard
      .querySelector(".cards__like-btn")
      .addEventListener("click", (likeButton) => {
        likeButton.target.classList.toggle("cards__like-btn_active");
      });
  }

  _eraseCard() {
    this.#newCard
      .querySelector(".cards__trash-btn")
      .addEventListener("click", (trashBtn) =>
        trashBtn.target.closest(".cards__card-container").remove()
      );
  }
}
