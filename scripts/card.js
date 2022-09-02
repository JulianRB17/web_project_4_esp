import { openModal, modalPic } from "./index.js";
const cardsTemplate = document.querySelector("#cards__template").content;

export class Card {
  constructor(nameValue, linkValue) {
    this._nameValue = nameValue;
    this._linkValue = linkValue;
  }

  // Agregar carta de nuevo lugar
  addCard() {
    const _card = cardsTemplate
      .querySelector(".cards__card-container")
      .cloneNode(true);
    const _cardImg = _card.querySelector(".cards__img");
    _card.querySelector(".cards__name").textContent = this._nameValue;
    _cardImg.alt = this._nameValue;
    _cardImg.src = this._linkValue;
    document.querySelector(".cards").prepend(_card);
    this.#toggleLikeBtn(_card);
    this.#eraseCard(_card);
    this.#openImgModal(_card);
  }

  //  Dar like a cada imagen
  //   #toggleLikeBtn(card) {
  //     card.querySelectorAll(".cards__like-btn").forEach((button) => {
  //       button.addEventListener("click", (likeButton) => {
  //         likeButton.target.classList.toggle("cards__like-btn_active");
  //       });
  //     });
  //   }

  #toggleLikeBtn(card) {
    card
      .querySelector(".cards__like-btn")
      .addEventListener("click", (likeButton) => {
        likeButton.target.classList.toggle("cards__like-btn_active");
      });
  }

  //   //Borrar imagen
  //   #eraseCard(card) {
  //     card.querySelectorAll(".cards__trash-btn").forEach((btn) => {
  //       btn.addEventListener("click", (trashBtn) =>
  //         trashBtn.target.closest(".cards__card-container").remove()
  //       );
  //     });
  //   }

  //Borrar imagen
  #eraseCard(card) {
    card
      .querySelector(".cards__trash-btn")
      .addEventListener("click", (trashBtn) =>
        trashBtn.target.closest(".cards__card-container").remove()
      );
  }

  //Abrir imagen en modal
  //   #openImgModal(card) {
  //     card.querySelectorAll(".cards__img").forEach((pic) => {
  //       pic.addEventListener("click", function (evt) {
  //         openModal(modalPic);
  //         modalPic.querySelector(".modal__pic").src = evt.target.src;
  //         modalPic.querySelector(".modal__pic").alt = evt.target.alt;
  //         modalPic.querySelector(".modal__pic-name").textContent = evt.target.alt;
  //       });
  //     });
  //   }

  #openImgModal(card) {
    card.querySelector(".cards__img").addEventListener("click", (evt) => {
      openModal(modalPic);
      modalPic.querySelector(".modal__pic").src = evt.target.src;
      modalPic.querySelector(".modal__pic").alt = evt.target.alt;
      modalPic.querySelector(".modal__pic-name").textContent = evt.target.alt;
    });
  }
}
