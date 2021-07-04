import Card from "./Card.js";
import { initialCards } from "./initial-cards.js";
import FormValidator from "./FormValidator.js";
export { openPopup };

// блоки попап
const popupProfileEdit = document.querySelector('.popup_edit-profile');
const buttonClosePopupProfileEdit = popupProfileEdit.querySelector('.popup__toggle');
const formDataProfileEdit = popupProfileEdit.querySelector('.form__data');

const popupNewPlace = document.querySelector('.popup_new-place');
const buttonClosePopupNewPlace = popupNewPlace.querySelector('.popup__toggle');
const formDataNewPlace = popupNewPlace.querySelector('.form__data');
const SubmitButtonNewPlace = popupNewPlace.querySelector('.form__button');

const popupShowImage = document.querySelector('.popup_show-image');
const buttonClosePopupShowImage = popupShowImage.querySelector('.popup__toggle');
// редактирование профиля
const profileSection = document.querySelector('.profile');
const buttonOpenPopupProfileEdit = profileSection.querySelector('.profile__button-edit');
const buttonOpenPopupNewPlace = profileSection.querySelector('.profile__button-add');
const profileName = profileSection.querySelector('.profile__name');
const profileJob = profileSection.querySelector('.profile__job');
// инпуты формы
const inputNameFormProfileEdit = document.querySelector('.form__input_js_name');
const inputJobFormProfileEdit = document.querySelector('.form__input_js_job');
const inputPlaceFormNewPlace = document.querySelector('.form__input_js_place');
const inputLinkFormNewPlace = document.querySelector('.form__input_js_link');
// объекты класса валидации
const validationConfig = {
  formButton: '.form__button',
  missmatchErrorMessage: 'Введите адрес сайта.',
  buttonDisable: 'form__button_disable',
  buttonEnable: 'form__button_enable'
}

const profileValidation = createFormValidatorObj(validationConfig, formDataProfileEdit);
const placeValidation = createFormValidatorObj(validationConfig, formDataNewPlace);

//Функция создание объекта валидации
function createFormValidatorObj (config, formElement) {
  return new FormValidator(config, formElement);
}
// функция закрытия попапа с кнопки
const keyEscape = 'Escape';
const pressEscape = function(evt) {
  if (evt.key === keyEscape) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// открыть попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
  addListenerPopupEscape()
}

function addListenerPopupEscape() {
  document.addEventListener('keydown', pressEscape);
}
// закрыть попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  removeListenerPopupEscape()
}

function removeListenerPopupEscape() {
  document.removeEventListener('keydown', pressEscape);
}

// попап редактирования профиля
function openEditProfilePopup(evt) {
  inputNameFormProfileEdit.value = profileName.textContent;
  inputJobFormProfileEdit.value = profileJob.textContent;
  openPopup(popupProfileEdit);
}

function closeEditProfilePopup() {
  closePopup(popupProfileEdit);
}

function closeEditProfilePopupOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closeEditProfilePopup();
  }
}

// попап добавления нового места
function openNewPlacePopup() {
  formDataNewPlace.reset();
  SubmitButtonNewPlace.classList.add('form__button_disable');
  SubmitButtonNewPlace.setAttribute('disabled', 'disabled');
  openPopup(popupNewPlace);
}

function closeNewPlacePopup() {
  closePopup(popupNewPlace);
}

function closeNewPlacePopupOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closeNewPlacePopup();
  }
}

// попап изображения карточки
function closeShowImagePopup() {
  closePopup(popupShowImage);
}

function closeShowImagePopupOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closeShowImagePopup();
  }
}

// отправка данных, редактирование профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputNameFormProfileEdit.value;
  profileJob.textContent = inputJobFormProfileEdit.value;
  closeEditProfilePopup();
}

// отправка данных, создание новой карточки
export function handleCreatCardFormSubmit(evt) {
  evt.preventDefault();
  const name = inputPlaceFormNewPlace.value;
  const link = inputLinkFormNewPlace.value;
  const card = new Card({name, link});
  const cardElement = card.generateCard();
  document.querySelector('.cards__list').prepend(cardElement);
  closeNewPlacePopup();
}


// попап редактирования профиля
buttonOpenPopupProfileEdit.addEventListener('click', openEditProfilePopup);
popupProfileEdit.addEventListener('click', closeEditProfilePopupOverlay);
buttonClosePopupProfileEdit.addEventListener('click', closeEditProfilePopup);

// попап добавления нового места
buttonOpenPopupNewPlace.addEventListener('click', openNewPlacePopup);
popupNewPlace.addEventListener('click', closeNewPlacePopupOverlay);
buttonClosePopupNewPlace.addEventListener('click', closeNewPlacePopup);

// попап изображения карточки
popupShowImage.addEventListener('click', closeShowImagePopupOverlay);
buttonClosePopupShowImage.addEventListener('click', closeShowImagePopup);


// submit редактирования профиля 
formDataProfileEdit.addEventListener('submit', handleProfileFormSubmit);

// submit новой карточки
formDataNewPlace.addEventListener('submit', handleCreatCardFormSubmit);
// отобрашение шаблонных карточек
initialCards.forEach((item) => {
  const card = new Card(item);
  const cardElement = card.generateCard();

  document.querySelector('.cards__list').prepend(cardElement);
});

profileValidation.enableValidation();
placeValidation.enableValidation();