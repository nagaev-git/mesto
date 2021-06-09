// блоки попап
const popupProfileEdit = document.querySelector('.popup_edit-profile');
const toggleProfileEdit = popupProfileEdit.querySelector('.popup__toggle');
const dataProfileEdit = popupProfileEdit.querySelector('.form__data');

const popupNewPlace = document.querySelector('.popup_new-place');
const toggleNewPlace = popupNewPlace.querySelector('.popup__toggle');
const dataNewPlace = popupNewPlace.querySelector('.form__data');

const popupShowImage = document.querySelector('.popup_show-image');
const toggleShowImage = popupShowImage.querySelector('.popup__toggle');
// редактирование профиля
const profileSection = document.querySelector('.profile');
const profileButtonEdit = profileSection.querySelector('.profile__button-edit');
const profileButtonAdd = profileSection.querySelector('.profile__button-add');
const profileName = profileSection.querySelector('.profile__name');
const profileJob = profileSection.querySelector('.profile__job');
// инпуты формы
const formNameInput = document.querySelector('.form__input_js_name');
const formJobInput = document.querySelector('.form__input_js_job');
const formPlaceInput = document.querySelector('.form__input_js_place');
const formLinkInput = document.querySelector('.form__input_js_link');
// шаблон новой карточки
const cardTemplate = document.querySelector('.card-template').content;
// список карточек
const cardsList = document.querySelector('.cards__list');
// елементы попапа с изображением карточки
const imageItem = document.querySelector('.image__item');
const imageTitle = document.querySelector('.image__caption');


// создание карточек на странице
function createCard({name, link}) {
  const newElement = cardTemplate.cloneNode(true);
  const newElementImage = newElement.querySelector('.card__image');
  const newElementTitle = newElement.querySelector('.card__title');
  newElementTitle.textContent = name;
  newElementImage.src = link;
  newElementImage.alt = name;

// слушатель события лайк
  const cardLike = newElement.querySelector('.card__like');
  cardLike.addEventListener('click', toggleLikeCard);
// слушатель события удалить карточку
  const cardDelete = newElement.querySelector('.card__delete');
  cardDelete.addEventListener('click', deleteCardElement);
// слушатель отображения попапа с изображением карточки
  newElementImage.addEventListener('click', showImageCard);

  return newElement;
}

// создание карточек из массива
initialCards.forEach((itemData) => {
  const card = createCard(itemData);
  renderCard(card);
});


// добавление новых карточек
function renderCard(card) {
  cardsList.prepend(card);
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
  imageItem.src = evt.target.src;
  imageItem.alt = evt.target.alt;
  imageTitle.textContent = evt.target.alt;
}


// открыть попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
}
// закрыть попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// function keyDownEscapePopup(item) {
//   item.addEventListener('keydown', function(evt) {
//     if (evt.key === 'Escape') {
//       console.log('ok');
//     }
//   })
// }

// попап редактирования профиля
function openEditProfilePopup(evt) {
  formNameInput.value = profileName.textContent;
  formJobInput.value = profileJob.textContent;
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
  dataNewPlace.reset();
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
  profileName.textContent = formNameInput.value;
  profileJob.textContent = formJobInput.value;
  closeEditProfilePopup();
}

// отправка данных, создание новой карточки
function handleCreatCardFormSubmit(evt) {
  evt.preventDefault();
  const name = formPlaceInput.value;
  const link = formLinkInput.value;
  const card = createCard({name, link});
  renderCard(card);
  closeNewPlacePopup();
}

// попап редактирования профиля
profileButtonEdit.addEventListener('click', openEditProfilePopup);
popupProfileEdit.addEventListener('click', closeEditProfilePopupOverlay);
toggleProfileEdit.addEventListener('click', closeEditProfilePopup);

// попап добавления нового места
profileButtonAdd.addEventListener('click', openNewPlacePopup);
popupNewPlace.addEventListener('click', closeNewPlacePopupOverlay);
toggleNewPlace.addEventListener('click', closeNewPlacePopup);

// попап изображения карточки
popupShowImage.addEventListener('click', closeShowImagePopupOverlay);
toggleShowImage.addEventListener('click', closeShowImagePopup);


// submit редактирования профиля 
dataProfileEdit.addEventListener('submit', handleProfileFormSubmit);

// submit новой карточки
dataNewPlace.addEventListener('submit', handleCreatCardFormSubmit);