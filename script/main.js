// шаблоны попапа
const popupProfileEdit = document.querySelector('.popup_edit-profile');
const popupNewPlace = document.querySelector('.popup_new-place');
const popupShowImage = document.querySelector('.popup_show-image');
// редактирование профиля
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
// submit формы
const formData = document.querySelector('.form__data');
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

//удаление крточек
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


// попап редактирования профиля
document.querySelector('.profile__button-edit').addEventListener('click', openEditProfilePopup);
popupProfileEdit.querySelector('.popup__toggle').addEventListener('click', closeEditProfilePopup);

function openEditProfilePopup() {
  formNameInput.value = profileName.textContent;
  formJobInput.value = profileJob.textContent;
  openPopup(popupProfileEdit);
}

function closeEditProfilePopup() {
  closePopup(popupProfileEdit);
}

// попап добавления нового места
document.querySelector('.profile__button-add').addEventListener('click', openNewPlacePopup);
popupNewPlace.querySelector('.popup__toggle').addEventListener('click', closeNewPlacePopup);

function openNewPlacePopup() {
  formPlaceInput.value = '';
  formLinkInput.value = '';
  openPopup(popupNewPlace);
}

function closeNewPlacePopup() {
  closePopup(popupNewPlace);
}

// попап изображения карточки
cardsList.querySelector('.card__image').addEventListener('click', openShowImagePopup);
popupShowImage.querySelector('.popup__toggle').addEventListener('click', closeShowImagePopup);

function openShowImagePopup() {
  openPopup(popupShowImage);
}

function closeShowImagePopup() {
  closePopup(popupShowImage);
}


// отправка данных, редактирование профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = formNameInput.value;
  profileJob.textContent = formJobInput.value;
  closeEditProfilePopup();
}

popupProfileEdit.querySelector('.form__data').addEventListener('submit', handleProfileFormSubmit);


// отправка данных, создание новой карточки
function handleCreatCardFormSubmit(evt) {
  evt.preventDefault();
  const name = formPlaceInput.value;
  const link = formLinkInput.value;
  const card = createCard({name, link});
  renderCard(card);
  closeNewPlacePopup();
}

popupNewPlace.querySelector('.form__data').addEventListener('submit', handleCreatCardFormSubmit);