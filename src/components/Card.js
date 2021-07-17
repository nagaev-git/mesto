export default class Card {
    constructor(data, cardSelector, imagePopup) {
      this._name = data.name;
      this._link = data.link;
      this._cardSelector = cardSelector;
      this._imagePopup = imagePopup;
    }
//  шаблон карточки
    _getTemplate() {
      const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.card')
        .cloneNode(true);
      return cardElement;
    }
//  созданик карточки и навешивание обработчиков
    generateCard() {
      this._element = this._getTemplate();
      this._setEventListeners();
      
      this._image = this._element.querySelector('.card__image');
      this._title = this._element.querySelector('.card__title');

      this._image.src = this._link;
      this._image.alt = this._name;
      this._title.textContent = this._name;
  
      return this._element;
    }
//  удалить карточку
    _deleteCardElement() {
      this._element.closest('.card').remove();
    }
//  лайк карточки
    _toggleLikeCard() {
      this._element.querySelector('.card__like').classList.toggle('card__like_active');
    }
//  обрабочкики карточки
    _setEventListeners() {
      this._element.querySelector('.card__image').addEventListener('click', () => {
        this._imagePopup({name: this._name, link: this._link});
      });

      this._element.querySelector('.card__like').addEventListener('click', () => {
          this._toggleLikeCard();
        });
  
      this._element.querySelector('.card__delete').addEventListener('click', () => {
          this._deleteCardElement();
        });
    }
  }