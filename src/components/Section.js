export default class Section {
    constructor({initialCards, renderer}, containerSelector) {
      this._items = initialCards;
      this._renderer = renderer;
      
      this._container = document.querySelector(containerSelector);
    }
  // отрисовка начальных карточек
    renderItems() {
      this._items.forEach((item) => {
        this._renderer(item, this._container);
      });
    }
  // добавление новой карточки
    addItem(item) {
      this._renderer(item, this._container);
    }
  }