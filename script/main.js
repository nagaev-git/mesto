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



function renderCards(item) {
  const newElement = cardTemplate.cloneNode(true);
  newElement.querySelector('.card__title').innerText = item['name'];
  newElement.querySelector('.card__image').src = item['link'];
  newElement.querySelector('.card__image').alt = item['name'];

  const cardLike = newElement.querySelector('.card__like');
  cardLike.addEventListener('click', function(evt) {
    evt.target.classList.toggle('card__like_active');
  });

  const cardDelete = newElement.querySelector('.card__delete');
  cardDelete.addEventListener('click', function(evt) {
    evt.target.parentNode.remove('card');
  });
  return newElement;
}



initialCards.forEach((itemData) => {
  const newCard = renderCards(itemData);
  cardsList.appendChild(newCard);
});



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

    const cardLike = newCard.querySelector('.card__like');
    cardLike.addEventListener('click', function(evt) {
      evt.target.classList.toggle('card__like_active');
    });

    const cardDelete = newCard.querySelector('.card__delete');
    cardDelete.addEventListener('click', function(evt) {
      evt.target.parentNode.remove('card');
    });
      
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