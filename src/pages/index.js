import './index.css'; // импорт главного файла стилей

import Api from '../components/Api.js';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
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

// изменение текста кнопки при отправке запроса на сервер
const toggleLoading = (popup, isLoaded) => {
  if (isLoaded) {
    popup.setSubmitButtonText('Сохранить');
  } else {
    popup.setSubmitButtonText('Сохранение...');
  }
}

// создание экземпляра карточки
const createCard = (item) => {
  const card = new Card(
    item, 
    cardSelector, 
    imagePopup.open.bind(imagePopup),
    userInfo.getUserId(),
    handleDeleteCard,
    likeCardCallback
    )
    .generateCard();
  return card;
}

// создание карточки из попапа
const createCardWithForm = (item) => {
  const newCard = createCard(item);
  const cardSection = new Section({}, cardList)
  cardSection.addItem(newCard);
}

// колбек удаление карточки 
const handleDeleteCard = (evt, data) => {
  
  deleteCardPopup.setSubmitCallback(() => {
    api.deleteCard(data._id)
    .then(() => {
      deleteCardPopup.close();
      const target = evt.target;
      target.closest('.card').remove();
    })
    .catch((err) => {
      console.log(err);
    });
  })
  deleteCardPopup.open();
}

// колбек постановки или удаление лайка
const likeCardCallback = (isLiked, data, card) => {
  if (isLiked) {
    api.addLikeCard(data._id)
    .then(answer => {
      card.setLikeCounter(answer.likes.length);
    })
    .catch((err) => {
      console.log(err);
    });
  } else {
    api.deleteLikeCard(data._id)
    .then(answer => {
      card.setLikeCounter(answer.likes.length);
    }).catch((err) => {
      console.log(err);
    });
  }
}

// обработчик редактирования профиля
const handleProfileFormSubmit = ({user, job}) => {
  toggleLoading(editProfilePopup, false);

  api.editUserProfile(user, job)
  .then(answer => {
    userInfo.setUserInfo(answer.name, answer.about);
    editProfilePopup.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    toggleLoading(editProfilePopup, true);
  });
}

// обработчик создания новой карточки
const handleCreatCardFormSubmit = ({place, link}) => {
  toggleLoading(createCardPopup, false);

  api.addCard(place, link)
    .then(newCard => {
      createCardWithForm(newCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      toggleLoading(createCardPopup, true);
    });
  createCardPopup.close();
}
// обработчик изменения аватара
const handleAvatarFormSubmit = ({avatar}) => {
  toggleLoading(editAvatarPopup, false);

  const editAvatarPromise = api.editUserAvatar(avatar);
  editAvatarPromise.then(data => {
    userInfo.setUserAvatar(data.avatar);
    }).catch((err) => {
      console.log(err)
    })
    .finally(() => {
      toggleLoading(createCardPopup, true);
    });
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

// данные для отправки запроса на сервер
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-26',
  headers: {
    authorization: 'bd92b376-a12a-4ae7-a181-e2ffac2d35f6',
    'Content-Type': 'application/json'
  }
});

// Получаем с сервера данные пользователя
const userInfoPromise = api.getUserInfo();
const serverUserInfo = (name, about, avatar, id) => {
  userInfo.setUserInfo(name, about);
  userInfo.setUserId(id);
  if (avatar) {
    userInfo.setUserAvatar(avatar);
  }
} 

userInfoPromise.then(data => {
  serverUserInfo(data.name, data.about, data.avatar, data._id)
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
      const card = createCard(item);
      cardSection.addItem(card);
    }
  }, cardList);

  cardSection.renderItems(data.reverse());
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
// попап удаления карточки
const deleteCardPopup = new PopupWithSubmit('.popup_delete-card', handleDeleteCard);



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
deleteCardPopup.setEventListeners();