import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);

        this._itemImagePopupShowImage = document.querySelector('.image__item');
        this._titleImagePopupShowImage = document.querySelector('.image__caption');
    }
// открытие попапа изображения карточки
    open(evt) {
        const element = evt.target;

        this._itemImagePopupShowImage.src = element.src;
        this._itemImagePopupShowImage.alt = element.alt;
        this._titleImagePopupShowImage.textContent = element.alt;

        super.open();
    }
}