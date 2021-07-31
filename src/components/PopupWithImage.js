import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._itemImagePopupShowImage = document.querySelector(".image__item");
    this._titleImagePopupShowImage = document.querySelector(".image__caption");
  }
  // открытие попапа изображения карточки
  open({ link, name }) {
    this._itemImagePopupShowImage.src = link;
    this._itemImagePopupShowImage.alt = name;
    this._titleImagePopupShowImage.textContent = name;

    super.open();
  }
}
