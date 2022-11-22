import { newUserInfo } from "./UserInfo.js";
import popupWithConfirmation from "./PopupWithConfirmation.js";
import { cardHandler } from "../page/index.js";

export class Section {
  constructor({ items, renderer }, container) {
    this._items = items;
    this._renderer = renderer;
    this._container = container;
  }

  renderItems() {
    this._items.forEach((item) => this._renderer(item));
  }

  addItem(item) {
    this._container.prepend(item);
  }
}

const cardRenderer = function ({ name, link, _id, owner, likes = [] }) {
  cardHandler
    .getTemplate(name, link, _id, owner, likes)
    .then((newCard) => this.addItem(newCard));
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
