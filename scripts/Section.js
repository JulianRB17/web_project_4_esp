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

  addInitItem(item) {
    this._container.append(item);
  }
}

export const newCards = function (dataArray, userData) {
  return new Section(
    {
      items: dataArray,
      renderer: function ({ name, link, _id, owner, likes = [] }) {
        const newCard = document
          .querySelector("#cards__template")
          .content.cloneNode(true);
        newCard.querySelector(".cards__name").textContent = name;
        newCard.querySelector(".cards__img").alt = name;
        newCard.querySelector(".cards__img").src = link;
        newCard.querySelector(".cards__like-number").textContent = likes.length;
        newCard.querySelector(".cards__card-container").id = _id;
        if (userData._id !== owner._id) {
          newCard.querySelector(".cards__trash-btn").style.display = "none";
        }
        likes.forEach((like) => {
          if (like._id === userData._id) {
            newCard
              .querySelector(".cards__like-btn")
              .classList.add("cards__like-btn_active");
          }
        });
        if (dataArray.length > 1) {
          this.addInitItem(newCard);
        } else {
          this.addItem(newCard);
        }
      },
    },
    document.querySelector(".cards")
  );
};
