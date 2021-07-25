export default class Card {
    constructor(data, cardSelector, imagePopup, userId, deleteCard, likeCard) {
      this._data = data;
      this._name = data.name;
      this._link = data.link;
      this._like = data.likes;
      this._ownerId = data.owner._id;
      this._userId = userId;
      this._cardSelector = cardSelector;
      this._imagePopup = imagePopup;
      this._deleteCard = deleteCard;
      this._likeCard = likeCard;
      this._isLiked = false;
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
      this._buttonDelete = this._element.querySelector('.card__delete');
      this._likeCounter = this._element.querySelector('.card__like-counter');
      this._image.src = this._link;
      this._image.alt = this._name;
      this._title.textContent = this._name;
      this._likeCounter.textContent = this._like.length;

      if (this._userId !== this._ownerId) {
        this._buttonDelete.classList.add('card__delete_invisible');
      }

      this._data.likes.forEach(element => {
        if (element._id === this._userId) {
          this._toggleLikeCard();
          this._isLiked = true;
        }
      });
  
      return this._element;
    }

  //Функция выставляющая количество лайков
  setLikeCounter (number) {
    this._likeCounter.textContent = number;
  }

  //Обработчик клика по лайку
  _likeButtonHandler() {
    this._toggleLikeCard();
    this._isLiked = !this._isLiked;
     this._likeCard(this._isLiked, this._data, this);
  }

//  удалить карточку
    _deleteCardElement() {
      this._deleteCard(this._data)
        .then(() => {
          this._element.closest('.card').remove();
        })
        .catch((err) => {
          console.log(err);
        });
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
          this._likeButtonHandler();
        });
  
      this._element.querySelector('.card__delete').addEventListener('click', () => {
          this._deleteCardElement();
        });
    }
  }