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
const popupShowImage = document.querySelector('.popup__image');
const popupToggleImage = document.querySelector('.popup__toggle_image')
const popupImage = document.querySelector('.image__full-size');
const popupImageTitle = document.querySelector('.image__signature');



function renderCards(item) {
  const newElement = cardTemplate.cloneNode(true);
  const newElementImage = newElement.querySelector('.card__image');
  const newElementTitle = newElement.querySelector('.card__title');
  newElementTitle.textContent = item.name;
  newElementImage.src = item.link;
  newElementImage.alt = item.name;

  const cardLike = newElement.querySelector('.card__like');
  cardLike.addEventListener('click', function(evt) {
    evt.target.classList.toggle('card__like_active');
  });

  const cardDelete = newElement.querySelector('.card__delete');
  cardDelete.addEventListener('click', function(evt) {
    evt.target.parentNode.remove('card');
  });

  const cardImage = newElement.querySelector('.card__image');
  cardImage.addEventListener('click', function (itemData) {
    popupShowImage.classList.add('popup_opened');
    popupShowImage.style.display = 'flex';
    popupImage.src = newElementImage.src;
    popupImage.alt = newElementTitle.alt;
    popupImageTitle.textContent = newElementTitle.textContent;
    popupToggleImage.addEventListener('click', function (){
      popupShowImage.classList.remove('popup_opened');
    });
  })

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



function popupClose(evt) {
  addPopup.classList.remove('popup_opened');
}



function formSubmitHandler (evt) {
  evt.preventDefault();
  if (formTitle.textContent === 'Новое место') {
    const newElement = cardTemplate.cloneNode(true);
    const newElementImage = newElement.querySelector('.card__image');
    const newElementTitle = newElement.querySelector('.card__title');
    newElementImage.src = jobInput.value;
    newElementTitle.innerText = nameInput.value;

    const cardLike = newElement.querySelector('.card__like');
    cardLike.addEventListener('click', function(evt) {
      evt.target.classList.toggle('card__like_active');
    });

    const cardDelete = newElement.querySelector('.card__delete');
    cardDelete.addEventListener('click', function(evt) {
      evt.target.parentNode.remove('card');
    });

    const cardImage = newElement.querySelector('.card__image');
    cardImage.addEventListener('click', function (itemData) {
    popupShowImage.classList.add('popup_opened');
    popupShowImage.style.display = 'flex';
    popupImage.src = newElementImage.src;
    popupImage.alt = newElementTitle.alt;
    popupImageTitle.textContent = newElementTitle.textContent;
    popupToggleImage.addEventListener('click', function (){
      popupShowImage.classList.remove('popup_opened');
    });
  })
      
    cardsList.prepend(newElement);
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