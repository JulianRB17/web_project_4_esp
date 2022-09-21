export class Section {
  constructor({ items, renderer }, container) {
    this._items = items;
    this._renderer = renderer;
    this._container = container;
  }

  // renderiza elementos de un array
  renderItem() {
    this._items.forEach((item) => this._renderer(item));
  }

  // Agrega elemento al DOM
  addItem(item) {
    this._container.prepend(item);
  }
}
