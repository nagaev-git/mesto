const addPopup = document.querySelector('.popup');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const nameInput = document.querySelector('.form__input_js_name');
const jobInput = document.querySelector('.form__input_js_job');
const openPopup = document.querySelector('.profile__button-edit');
const closePopup = document.querySelector('.popup__toggle');
const formData = document.querySelector('.form__data');
const formTitle = document.querySelector('.form__title');
const cardPopup = document.querySelector('.profile__button-add');



const cardTemplate = document.querySelector('.card_template').content;
const cardsList = document.querySelector('.cards__list');
const cardLike = cardsList.querySelectorAll('.card__like');
const initialCards = [
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



function renderCards() {
    initialCards.forEach((item) => {
        const newCard = cardTemplate.cloneNode(true);
        newCard.querySelector('.card__title').innerText = item['name'];
        newCard.querySelector('.card__image').src = item['link'];
        cardsList.appendChild(newCard);
     });
}

function popupOpen(evt) {
  if (evt.target.className === 'profile__button-add') {
    addPopup.classList.add('popup_opened');
    formTitle.textContent = 'Новое место';
    nameInput.value = '';
    jobInput.value = '';
    nameInput.placeholder = 'Название';
    jobInput.placeholder = 'Ссылка на картинку';
  } else if (evt.target.className === 'profile__button-edit') {
    addPopup.classList.add('popup_opened');
    formTitle.textContent = 'Редактировать профиль';
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
  }
}

function popupClose() {
    addPopup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    if (formTitle.textContent === 'Новое место') {
      const newCard = cardTemplate.cloneNode(true);
      newCard.querySelector('.card__title').innerText = nameInput.value;
      newCard.querySelector('.card__image').src = jobInput.value;
      cardsList.prepend(newCard);
      popupClose();
    } else if (formTitle.textContent === 'Редактировать профиль') {
      nameProfile.textContent = nameInput.value;
      jobProfile.textContent = jobInput.value;
      popupClose();
    }
}


cardPopup.addEventListener('click', popupOpen);

openPopup.addEventListener('click', popupOpen);

closePopup.addEventListener('click', popupClose);

formData.addEventListener('submit', formSubmitHandler);

cardsList.addEventListener('click', function (evt) {
  evt.target.classList.toggle('card__like_active');
});

renderCards();