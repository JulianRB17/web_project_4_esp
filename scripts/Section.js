import { newUserInfo } from "./UserInfo.js";
import { popupEraseCard } from "./PopupWithConfirmation.js";

export class Section {
  constructor({ items, renderer }, container) {
    this._items = items;
    this._renderer = renderer;
    this._container = container;
  }

  renderItems() {
    this._items.forEach((item) => this._renderer(item, this._items.length));
  }

  addItem(item) {
    this._container.prepend(item);
  }

  addInitItem(item) {
    this._container.append(item);
  }
}

const cardRenderer = function (
  { name, link, _id, owner, likes = [] },
  arrayLength
) {
  newUserInfo.getUserInfo().then((userInfo) => {
    const newCard = document
      .querySelector("#cards__template")
      .content.cloneNode(true);
    newCard.querySelector(".cards__name").textContent = name;
    newCard.querySelector(".cards__img").alt = name;
    newCard.querySelector(".cards__img").src = link;
    newCard.querySelector(".cards__like-number").textContent = likes.length;
    newCard.querySelector(".cards__card-container").id = _id;

    const trashBtn = newCard.querySelector(".cards__trash-btn");

    if (userInfo._id !== owner._id) trashBtn.style.display = "none";

    trashBtn.addEventListener("click", (e) =>
      popupEraseCard(e.target).openPopup()
    );

    likes.forEach((like) => {
      if (like._id === userInfo._id) {
        newCard
          .querySelector(".cards__like-btn")
          .classList.add("cards__like-btn_active");
      }
    });

    if (arrayLength > 1) {
      this.addInitItem(newCard);
    } else {
      this.addItem(newCard);
    }
  });
};

export const newCards = function (dataArray) {
  return new Section(
    {
      items: dataArray,
      renderer: cardRenderer,
    },
    document.querySelector(".cards")
  );
};
