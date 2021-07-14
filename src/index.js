import './index.css'; // импорт главного файла стилей

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  popupProfileEdit,
  buttonClosePopupProfileEdit,
  formDataProfileEdit,
  popupNewPlace,
  buttonClosePopupNewPlace,
  formDataNewPlace,
  SubmitButtonNewPlace,
  popupShowImage,
  buttonClosePopupShowImage,
  profileSection,
  buttonOpenPopupProfileEdit,
  buttonOpenPopupNewPlace,
  profileName,
  profileJob,
  inputNameFormProfileEdit,
  inputJobFormProfileEdit,
  // inputPlaceFormNewPlace,
  // inputLinkFormNewPlace,
  cardList,
  cardSelector,
  validationConfig,
  keyEscape,
  initialCards
} from "../utils/constants.js";

// export { openPopup };



// валидация форм
const profileValidation = new FormValidator(validationConfig, formDataProfileEdit);
profileValidation.enableValidation();

const placeValidation = new FormValidator(validationConfig, formDataNewPlace);
placeValidation.enableValidation();


/*
// функция закрытия попапа с кнопки
function pressEscape(evt) {
  if (evt.key === keyEscape) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// открыть попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', pressEscape);
}

// закрыть попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', pressEscape);
}

// попап редактирования профиля
function openEditProfilePopup(evt) {
  inputNameFormProfileEdit.value = profileName.textContent;
  inputJobFormProfileEdit.value = profileJob.textContent;
  openPopup(popupProfileEdit);
}

function closeEditProfilePopupOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(popupProfileEdit);
  }
}

// попап добавления нового места
function openNewPlacePopup() {
  formDataNewPlace.reset();
  SubmitButtonNewPlace.classList.add('form__button_disable');
  SubmitButtonNewPlace.setAttribute('disabled', 'disabled');
  openPopup(popupNewPlace);
}

function closeNewPlacePopupOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(popupNewPlace);
  }
}
// попап изображения карточки
function closeShowImagePopupOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(popupShowImage);
  }
}
*/
// отправка данных, редактирование профиля
const handleProfileFormSubmit = ({user, job}) => {
  // evt.preventDefault();
  // profileName.textContent = inputNameFormProfileEdit.value;
  // profileJob.textContent = inputJobFormProfileEdit.value;
  userInfo.setUserInfo(user, job);
  // closePopup(popupProfileEdit);
  editProfilePopup.close();
}

// отправка данных, создание новой карточки
const handleCreatCardFormSubmit = ({place, link}) => {
  // evt.preventDefault();
  const newCard = {name: place, link: link};
  // const name = inputPlaceFormNewPlace.value;
  // const link = inputLinkFormNewPlace.value;
  // const initialCards = [{name, link}];
  // const section = new Section({initialCards, renderer}, cardList);
  section.addItem(newCard);
  // closePopup(popupNewPlace);
  createCardPopup.close();
}

/*
// попап редактирования профиля
buttonOpenPopupProfileEdit.addEventListener('click', openEditProfilePopup);
popupProfileEdit.addEventListener('click', closeEditProfilePopupOverlay);
buttonClosePopupProfileEdit.addEventListener('click', () => closePopup(popupProfileEdit));

// попап добавления нового места
buttonOpenPopupNewPlace.addEventListener('click', openNewPlacePopup);
popupNewPlace.addEventListener('click', closeNewPlacePopupOverlay);
buttonClosePopupNewPlace.addEventListener('click', () => closePopup(popupNewPlace));

// попап изображения карточки
popupShowImage.addEventListener('click', closeShowImagePopupOverlay);
buttonClosePopupShowImage.addEventListener('click', () => closePopup(popupShowImage));


// submit редактирования профиля 
formDataProfileEdit.addEventListener('submit', handleProfileFormSubmit);

// submit новой карточки
formDataNewPlace.addEventListener('submit', handleCreatCardFormSubmit);
*/

const userInfo = new UserInfo('.profile__name', '.profile__job');

const openPopupProfile = () => {
  const profileData = userInfo.getUserInfo();

  inputNameFormProfileEdit.value = profileData.userName;
  inputJobFormProfileEdit.value = profileData.userJob;

  editProfilePopup.open();
}

const openPopupNewPlace = () => {
  createCardPopup.open();
}


const imagePopup = new PopupWithImage('.popup_show-image');

const editProfilePopup = new PopupWithForm('.popup_edit-profile', handleProfileFormSubmit);
const createCardPopup = new PopupWithForm('.popup_new-place', handleCreatCardFormSubmit);

buttonOpenPopupProfileEdit.addEventListener('click', openPopupProfile);
buttonOpenPopupNewPlace.addEventListener('click', openPopupNewPlace);

// formDataProfileEdit.addEventListener('submit', editProfilePopup.close.bind(editProfilePopup));
// formDataNewPlace.addEventListener('submit', createCardPopup.close.bind(createCardPopup));


//Колбек отрисовки карточки. Создаёт карточку и добавляет её в контейнер
const renderer = (item, container) => {
  const card = new Card(item, cardSelector, imagePopup.open.bind(imagePopup));
  const cardElement = card.generateCard();
  container.prepend(cardElement);
}

const section = new Section({initialCards, renderer}, cardList);
//Рендерим начальные карточки
section.renderItems();
