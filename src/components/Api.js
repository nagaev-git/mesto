export default class Api {
    constructor({url, headers}) {
        this._url = url;
        this._headers = headers;
    }
// обработчик запроса
    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
// запрос данных профиля
    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers
        }).then(this._handleResponse);
    }
// запрос карточек с сервера
    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers
        }).then(this._handleResponse);
    }
// запрос редактирования профиля
    editUserProfile(userName, userAbout) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: userName,
                about: userAbout
            })
        }).then(this._handleResponse);
    }
// запрос редактирования аватара
    editUserAvatar(userAvatar) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: userAvatar
            })
        }).then(this._handleResponse);
    }
// запрос добавления карточки
    addCard(placeName, placeLink) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: placeName,
                link: placeLink
            })
        }).then(this._handleResponse);
    }
// запрос добавление лайка
    addLikeCard(cardId) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this._headers,
        }).then(this._handleResponse);
    }
// запрос удаления лайка
    deleteLikeCard(cardId) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then(this._handleResponse);
    }
// запрос удаления карточки
    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then(this._handleResponse);
    }
}