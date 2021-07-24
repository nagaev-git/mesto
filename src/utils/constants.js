// блоки попап
export const popupProfileEdit = document.querySelector('.popup_edit-profile');
export const formDataProfileEdit = popupProfileEdit.querySelector('.form__data');

export const popupNewPlace = document.querySelector('.popup_new-place');
export const formDataNewPlace = popupNewPlace.querySelector('.form__data');

export const popupAvatar = document.querySelector('.popup_update-avatar');
export const formDataAvatar = popupAvatar.querySelector('.form__data');

// редактирование профиля
export const profileSection = document.querySelector('.profile');
export const buttonOpenPopupProfileEdit = profileSection.querySelector('.profile__button-edit');
export const buttonOpenPopupNewPlace = profileSection.querySelector('.profile__button-add');
export const buttonOpenPopupAvatar = profileSection.querySelector('.profile__overlay');

// инпуты формы
export const inputNameFormProfileEdit = document.querySelector('.form__input_js_name');
export const inputJobFormProfileEdit = document.querySelector('.form__input_js_job');

// список карточек
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