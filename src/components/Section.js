export class Section {
  constructor({ items, renderer }, container) {
    this._items = items;
    this._renderer = renderer;
    this._container = container;
  }

  renderItems() {
    this._items.forEach((item) => {
      const newItem = this._renderer(item);
      this._container.prepend(newItem);
      return newItem;
    });
  }

  addItem(item) {
    this._items = item;
  }
}
