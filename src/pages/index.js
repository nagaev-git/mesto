import './index.css'; // импорт главного файла стилей

import Api from '../components/Api.js';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  formDataProfileEdit,
  formDataNewPlace,
  formDataAvatar,
  buttonOpenPopupProfileEdit,
  buttonOpenPopupNewPlace,
  buttonOpenPopupAvatar,
  inputNameFormProfileEdit,
  inputJobFormProfileEdit,
  cardList,
  cardSelector,
  validationConfig,
} from "../utils/constants.js";



// валидация форм
const profileValidation = new FormValidator(validationConfig, formDataProfileEdit);
profileValidation.enableValidation();

const placeValidation = new FormValidator(validationConfig, formDataNewPlace);
placeValidation.enableValidation();

const avatarValidation = new FormValidator(validationConfig, formDataAvatar);
avatarValidation.enableValidation();

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

const handleAvatarFormSubmit = () => {
  editAvatarPopup.close();
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

// открыть попап редактирования аватара
const openPopupAvatar = () => {
  avatarValidation.setSubmitButtonState();
  editAvatarPopup.open();
}

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-26',
  headers: {
    authorization: 'bd92b376-a12a-4ae7-a181-e2ffac2d35f6',
    'Content-Type': 'application/json'
  }
});

// Получаем с сервера данные пользователя
const userInfoPromise = api.getUserInfo();
const serverUserInfo = (name, about, avatar) => {
  userInfo.setUserInfo(name, about);
  if (avatar) {
    userInfo.setUserAvatar(avatar);
  }
} 

userInfoPromise.then(data => {
  serverUserInfo(data.name, data.about, data.avatar)
})
  .catch((err) => {
    console.log(err);
  });

// Рендерим карточки с сервера
const initialCardFromServer = api.getInitialCards();

initialCardFromServer.then(data => {
  const cardSection = new Section({
    items: data,
    renderer: (item) => {
      // debugger
      const card = createCard(item);
      cardSection.addItem(card);
    }
  }, cardList);

  cardSection.renderItems();
})
  .catch((err) => {
    console.log(err);
  });

// данные пользователя
const userInfo = new UserInfo('.profile__name', '.profile__job', '.profile__image');
// попап изображения карточки
const imagePopup = new PopupWithImage('.popup_show-image');
// попап редактирования профиля
const editProfilePopup = new PopupWithForm('.popup_edit-profile', handleProfileFormSubmit);
// попап создания новой карточки
const createCardPopup = new PopupWithForm('.popup_new-place', handleCreatCardFormSubmit);
// попап редактирования аватара
const editAvatarPopup = new PopupWithForm('.popup_update-avatar', handleAvatarFormSubmit);



// слушатель открытия попапа профиля
buttonOpenPopupProfileEdit.addEventListener('click', openPopupProfile);
// слушатель открытия попапа новой карточки
buttonOpenPopupNewPlace.addEventListener('click', openPopupNewPlace);
// слушатель открытия попапа аватара
buttonOpenPopupAvatar.addEventListener('click', openPopupAvatar);

// навешиваем слушатели на попапы
imagePopup.setEventListeners();
editProfilePopup.setEventListeners();
createCardPopup.setEventListeners();
editAvatarPopup.setEventListeners();