let addPopup = document.querySelector('.popup');
let profile = document.querySelector('.profile');
let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__job');
let nameInput = document.querySelector('.form__item_name');
let jobInput = document.querySelector('.form__item_job');
let openPopup = document.querySelector('.profile__button_edit');
let closePopup = document.querySelector('.form__toogle');
let formButton = document.querySelector('.form__button')

function popupOpen() {
    addPopup.classList.add('popup_opened');
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
}

function popupClose() {
    addPopup.classList.remove('popup_opened');
}

openPopup.addEventListener('click', popupOpen);

closePopup.addEventListener('click', popupClose);

formButton.addEventListener('submit', formSubmitHandler);