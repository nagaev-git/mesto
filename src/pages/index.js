import './index.css'; // импорт главного файла стилей

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  formDataProfileEdit,
  formDataNewPlace,
  buttonOpenPopupProfileEdit,
  buttonOpenPopupNewPlace,
  inputNameFormProfileEdit,
  inputJobFormProfileEdit,
  cardList,
  cardSelector,
  validationConfig,
  initialCards
} from "../utils/constants.js";



// валидация форм
const profileValidation = new FormValidator(validationConfig, formDataProfileEdit);
profileValidation.enableValidation();

const placeValidation = new FormValidator(validationConfig, formDataNewPlace);
placeValidation.enableValidation();

// создание экземпляра карточки
const createCard = (item) => {
  const card = new Card(
    item, 
    cardSelector, 
    imagePopup.open.bind(imagePopup)
    )
    .generateCard();
  return card;
}

const createCardWithForm = (item) => {
  const newCard = createCard(item);
  cardSection.addItem(newCard);
}

// отправка данных, редактирование профиля
const handleProfileFormSubmit = ({user, job}) => {
  userInfo.setUserInfo(user, job);
  editProfilePopup.close();
}

// отправка данных, создание новой карточки
const handleCreatCardFormSubmit = ({place, link}) => {
  const newCard = {name: place, link: link};
  createCardWithForm(newCard);
  createCardPopup.close();
}

// открыть попап редактирования профиля
const openPopupProfile = () => {
  const profileData = userInfo.getUserInfo();
  inputNameFormProfileEdit.value = profileData.userName;
  inputJobFormProfileEdit.value = profileData.userJob;
  editProfilePopup.open();
}

// открыть попап создания новой карточки
const openPopupNewPlace = () => {
  placeValidation.setSubmitButtonState();
  createCardPopup.open();
}


// данные пользователя
const userInfo = new UserInfo('.profile__name', '.profile__job');
// попап изображения карточки
const imagePopup = new PopupWithImage('.popup_show-image');
// попап редактирования профиля
const editProfilePopup = new PopupWithForm('.popup_edit-profile', handleProfileFormSubmit);
// попап создания новой карточки
const createCardPopup = new PopupWithForm('.popup_new-place', handleCreatCardFormSubmit);
// создание секции
const cardSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item);
    cardSection.addItem(card);
  }
}, cardList)



// слушатель открытия попапа профиля
buttonOpenPopupProfileEdit.addEventListener('click', openPopupProfile);
// слушатель открытия попапа новой карточки
buttonOpenPopupNewPlace.addEventListener('click', openPopupNewPlace);

// навешиваем слушатели на попапы
imagePopup.setEventListeners();
editProfilePopup.setEventListeners();
createCardPopup.setEventListeners();

//Рендерим начальные карточки
cardSection.renderItems();