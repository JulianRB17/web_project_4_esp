export class Section {
  constructor({ items, renderer }, container) {
    this._items = items;
    this._renderer = renderer;
    this._container = container;
  }

  // renderiza elementos de un array
  renderItems() {
    this._items.forEach((item) => this._renderer(item));
  }

  // Agrega elemento al DOM
  addItem(item) {
    this._container.prepend(item);
  }
}

// Creación de nuevas tarjetas
export const newCards = function (dataArray) {
  return new Section(
    {
      items: dataArray,
      renderer: function (data) {
        // console.log(this);
        const { nameValue, linkValue } = data;
        const newCard = document
          .querySelector("#cards__template")
          .content.cloneNode(true);
        newCard.querySelector(".cards__name").textContent = nameValue;
        newCard.querySelector(".cards__img").alt = nameValue;
        newCard.querySelector(".cards__img").src = linkValue;
        this.addItem(newCard);
      },
    },
    document.querySelector(".cards")
  );
};
