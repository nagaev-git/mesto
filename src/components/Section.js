export default class Section {
    constructor({items, renderer},containerSelector) {
        this._container = document.querySelector(containerSelector);

        this._renderer = renderer;
        this._items = items;
    }
// отрисовка начальных элементов
    renderItems() {
        this._items.forEach((item) => {
            this._renderer(item);
        })
    }
// добавление элемента
    addItem(element) {
        this._container.prepend(element);
    }
}