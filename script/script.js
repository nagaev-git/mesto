let addPopup = document.querySelector('.popup');
let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__job');
let nameInput = document.querySelector('.form__item_name');
let jobInput = document.querySelector('.form__item_job');
let openPopup = document.querySelector('.profile__button-edit');
let closePopup = document.querySelector('.form__toogle');
let formData = document.querySelector('.form__data');

function popupOpen() {
    addPopup.classList.add('popup_opened');
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    addPopup.classList.remove('popup_opened');
}

function popupClose() {
    addPopup.classList.remove('popup_opened');
}

openPopup.addEventListener('click', popupOpen);

closePopup.addEventListener('click', popupClose);

formData.addEventListener('submit', formSubmitHandler);