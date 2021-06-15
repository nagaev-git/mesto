// блоки попап
const popupItem = document.querySelector('.popup')

const popupProfileEdit = document.querySelector('.popup_edit-profile');
const buttonClosePopupProfileEdit = popupProfileEdit.querySelector('.popup__toggle');
const formDataProfileEdit = popupProfileEdit.querySelector('.form__data');

const popupNewPlace = document.querySelector('.popup_new-place');
const buttonClosePopupNewPlace = popupNewPlace.querySelector('.popup__toggle');
const formDataNewPlace = popupNewPlace.querySelector('.form__data');
const SubmitButtonNewPlace = popupNewPlace.querySelector('.form__button');

const popupShowImage = document.querySelector('.popup_show-image');
const buttonClosePopupShowImage = popupShowImage.querySelector('.popup__toggle');
// редактирование профиля
const profileSection = document.querySelector('.profile');
const buttonOpenPopupProfileEdit = profileSection.querySelector('.profile__button-edit');
const buttonOpenPopupNewPlace = profileSection.querySelector('.profile__button-add');
const profileName = profileSection.querySelector('.profile__name');
const profileJob = profileSection.querySelector('.profile__job');
// инпуты формы
const inputNameFormProfileEdit = document.querySelector('.form__input_js_name');
const inputJobFormProfileEdit = document.querySelector('.form__input_js_job');
const inputPlaceFormNewPlace = document.querySelector('.form__input_js_place');
const inputLinkFormNewPlace = document.querySelector('.form__input_js_link');
// шаблон новой карточки
const cardTemplate = document.querySelector('.card-template').content;
// список карточек
const cardList = document.querySelector('.cards__list');
// елементы попапа с изображением карточки
const itemImagePopupShowImage = document.querySelector('.image__item');
const titleImagePopupShowImage = document.querySelector('.image__caption');
// функция закрытия попапа с кнопки
const keyEscape = 'Escape';
const pressEscape = function(evt) {
  if (evt.key === keyEscape) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}


// создание карточек на странице
function createCard({name, link}) {
  const newElement = cardTemplate.cloneNode(true);
  const newElementImage = newElement.querySelector('.card__image');
  const newElementTitle = newElement.querySelector('.card__title');
  newElementTitle.textContent = name;
  newElementImage.src = link;
  newElementImage.alt = name;

// слушатель события лайк
  const buttonLikeCard = newElement.querySelector('.card__like');
  buttonLikeCard.addEventListener('click', toggleLikeCard);
// слушатель события удалить карточку
  const buttonDeleteCard = newElement.querySelector('.card__delete');
  buttonDeleteCard.addEventListener('click', deleteCardElement);
// слушатель отображения попапа с изображением карточки
  newElementImage.addEventListener('click', showImageCard);

  return newElement;
}


// добавление новых карточек
function renderCard(card) {
  cardList.prepend(card);
}

// удаление крточек
function deleteCardElement(evt) {
  evt.target.closest('.card').remove();
}

// изменение состтояния кнопки лайк
function toggleLikeCard(evt) {
  evt.target.classList.toggle('card__like_active');
}

// отображение изображения в попапе
function showImageCard(evt) {
  openShowImagePopup();
  itemImagePopupShowImage.src = evt.target.src;
  itemImagePopupShowImage.alt = evt.target.alt;
  titleImagePopupShowImage.textContent = evt.target.alt;
}


// открыть попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
  addListenerPopupEscape()
}

function addListenerPopupEscape() {
  document.addEventListener('keydown', pressEscape);
}
// закрыть попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  removeListenerPopupEscape()
}

function removeListenerPopupEscape() {
  document.removeEventListener('keydown', pressEscape);
}

// попап редактирования профиля
function openEditProfilePopup(evt) {
  inputNameFormProfileEdit.value = profileName.textContent;
  inputJobFormProfileEdit.value = profileJob.textContent;
  openPopup(popupProfileEdit);
}

function closeEditProfilePopup() {
  closePopup(popupProfileEdit);
}

function closeEditProfilePopupOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closeEditProfilePopup();
  }
}

// попап добавления нового места
function openNewPlacePopup() {
  formDataNewPlace.reset();
  SubmitButtonNewPlace.classList.add('form__button_disable');
  SubmitButtonNewPlace.setAttribute('disabled', 'disabled');
  openPopup(popupNewPlace);
}

function closeNewPlacePopup() {
  closePopup(popupNewPlace);
}

function closeNewPlacePopupOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closeNewPlacePopup();
  }
}

// попап изображения карточки
function openShowImagePopup() {
  openPopup(popupShowImage);
}

function closeShowImagePopup() {
  closePopup(popupShowImage);
}

function closeShowImagePopupOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closeShowImagePopup();
  }
}

// отправка данных, редактирование профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputNameFormProfileEdit.value;
  profileJob.textContent = inputJobFormProfileEdit.value;
  closeEditProfilePopup();
}

// отправка данных, создание новой карточки
function handleCreatCardFormSubmit(evt) {
  evt.preventDefault();
  const name = inputPlaceFormNewPlace.value;
  const link = inputLinkFormNewPlace.value;
  const card = createCard({name, link});
  renderCard(card);
  closeNewPlacePopup();
}


// попап редактирования профиля
buttonOpenPopupProfileEdit.addEventListener('click', openEditProfilePopup);
popupProfileEdit.addEventListener('click', closeEditProfilePopupOverlay);
buttonClosePopupProfileEdit.addEventListener('click', closeEditProfilePopup);

// попап добавления нового места
buttonOpenPopupNewPlace.addEventListener('click', openNewPlacePopup);
popupNewPlace.addEventListener('click', closeNewPlacePopupOverlay);
buttonClosePopupNewPlace.addEventListener('click', closeNewPlacePopup);

// попап изображения карточки
popupShowImage.addEventListener('click', closeShowImagePopupOverlay);
buttonClosePopupShowImage.addEventListener('click', closeShowImagePopup);


// submit редактирования профиля 
formDataProfileEdit.addEventListener('submit', handleProfileFormSubmit);

// submit новой карточки
formDataNewPlace.addEventListener('submit', handleCreatCardFormSubmit);


// создание карточек из массива
initialCards.forEach((itemData) => {
  const card = createCard(itemData);
  renderCard(card);
});