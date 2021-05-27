const addPopup = document.querySelector('.popup');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const nameInput = document.querySelector('.form__input_js_name');
const jobInput = document.querySelector('.form__input_js_job');
const openPopup = document.querySelector('.profile__button-edit');
const closePopup = document.querySelector('.popup__toggle');
const formData = document.querySelector('.form__data');


const cardTemplate = document.querySelector('.card_template').content;
const cardsList = document.querySelector('.cards__list');
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

renderCards();


function popupOpen() {
    addPopup.classList.add('popup_opened');
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
}

function popupClose() {
    addPopup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    popupClose();
}

openPopup.addEventListener('click', popupOpen);

closePopup.addEventListener('click', popupClose);

formData.addEventListener('submit', formSubmitHandler);

