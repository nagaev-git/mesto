const popupShowImage = document.querySelector('.popup_show-image');
const itemImagePopupShowImage = document.querySelector('.image__item');
const titleImagePopupShowImage = document.querySelector('.image__caption');

import { openPopup } from './index.js';

export default class Card {
    constructor(data, cardSelector) {
      this._name = data.name;
      this._link = data.link;
      this._cardSelector = cardSelector;
    }
  
    _getTemplate() {
      const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.card')
        .cloneNode(true);
      return cardElement;
    }
    
    generateCard() {
      this._element = this._getTemplate();
      this._setEventListeners();
      
      const image = this._element.querySelector('.card__image');
      const title = this._element.querySelector('.card__title');

      image.src = this._link;
      image.alt = this._name;
      title.textContent = this._name;
  
      return this._element;
    }

    _deleteCardElement() {
      this._element.closest('.card').remove();
    }

    _toggleLikeCard() {
      this._element.querySelector('.card__like').classList.toggle('card__like_active');
    }

    _handleOpenPopup() {
      itemImagePopupShowImage.src = this._link;
      titleImagePopupShowImage.textContent = this._name;
      titleImagePopupShowImage.alt = this._name;
      openPopup(popupShowImage);
    }
      
    _setEventListeners() {
      this._element.querySelector('.card__image').addEventListener('click', () => {
        this._handleOpenPopup();
      });

      this._element.querySelector('.card__like').addEventListener('click', () => {
          this._toggleLikeCard();
        });
  
      this._element.querySelector('.card__delete').addEventListener('click', () => {
          this._deleteCardElement();
        });
    }
  }