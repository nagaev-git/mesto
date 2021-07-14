// блоки попап
export const popupProfileEdit = document.querySelector('.popup_edit-profile');
export const buttonClosePopupProfileEdit = popupProfileEdit.querySelector('.popup__toggle');
export const formDataProfileEdit = popupProfileEdit.querySelector('.form__data');

export const popupNewPlace = document.querySelector('.popup_new-place');
export const buttonClosePopupNewPlace = popupNewPlace.querySelector('.popup__toggle');
export const formDataNewPlace = popupNewPlace.querySelector('.form__data');
export const SubmitButtonNewPlace = popupNewPlace.querySelector('.form__button');

export const popupShowImage = document.querySelector('.popup_show-image');
export const buttonClosePopupShowImage = popupShowImage.querySelector('.popup__toggle');

// редактирование профиля
export const profileSection = document.querySelector('.profile');
export const buttonOpenPopupProfileEdit = profileSection.querySelector('.profile__button-edit');
export const buttonOpenPopupNewPlace = profileSection.querySelector('.profile__button-add');
export const profileName = profileSection.querySelector('.profile__name');
export const profileJob = profileSection.querySelector('.profile__job');

// инпуты формы
export const inputNameFormProfileEdit = document.querySelector('.form__input_js_name');
export const inputJobFormProfileEdit = document.querySelector('.form__input_js_job');
export const inputPlaceFormNewPlace = document.querySelector('.form__input_js_place');
export const inputLinkFormNewPlace = document.querySelector('.form__input_js_link');

// список карточек
// export const cardList = document.querySelector('.cards__list');
export const cardList = '.cards__list';

// селектор шаблона карточки
export const cardSelector = '.card-template';

// объекты класса валидации
export const validationConfig = {
  formButton: '.form__button',
  missmatchErrorMessage: 'Введите адрес сайта.',
  buttonDisable: 'form__button_disable',
  buttonEnable: 'form__button_enable'
}

// значение клавиши esc
export const keyEscape = 'Escape';

// шаблоны начальгых карточек
export const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];