const addPopup = document.querySelector('.popup');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const nameInput = document.querySelector('.form__input_js_name');
const jobInput = document.querySelector('.form__input_js_job');
const openPopup = document.querySelector('.profile__button-edit');
const closePopup = document.querySelector('.popup__toggle');
const formData = document.querySelector('.form__data');
const cardsList = document.querySelector('.cards__list');
const card = document.querySelector('.card');

// const userTemplate = document.querySelector('.cards__list').content;
// const usersOnline = document.querySelector('.cards');

// // клонируем содержимое тега template
// const userElement = userTemplate.querySelector('.card').cloneNode(true);

// // наполняем содержимым
// userElement.querySelector('.card__image').src = 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg';
// userElement.querySelector('.card__title').textContent = 'Архыз';

// // отображаем на странице
// usersOnline.append(userElement);

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