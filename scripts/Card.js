import { popupWithImage } from "../src/index.js";
import { Section } from "./Section.js";

export class Card {
  constructor(nameValue, linkValue, template) {
    this._nameValue = nameValue;
    this._linkValue = linkValue;
    this._card = template.querySelector(".cards__card-container");
    popupWithImage._handleCardClick();
  }

  // Agregar carta de nuevo lugar
  addCard() {
    const newCardSection = new Section(
      {
        items: [this._newCard],
        renderer: function () {
          this._newCard = this._card.cloneNode(true);
          this._newCard.querySelector(".cards__name").textContent =
            this._nameValue;
          this._newCard.querySelector(".cards__img").alt = this._nameValue;
          this._newCard.querySelector(".cards__img").src = this._linkValue;
          this._toggleLikeBtn(this._newCard);
          this._eraseCard(this._newCard);
        }.bind(this),
      },
      document.querySelector(".cards")
    );

    newCardSection.renderItem();

    return newCardSection.addItem(this._newCard);
  }

  _toggleLikeBtn() {
    this._newCard
      .querySelector(".cards__like-btn")
      .addEventListener("click", (likeButton) => {
        likeButton.target.classList.toggle("cards__like-btn_active");
      });
  }

  _eraseCard() {
    this._newCard
      .querySelector(".cards__trash-btn")
      .addEventListener("click", (trashBtn) =>
        trashBtn.target.closest(".cards__card-container").remove()
      );
  }
}
