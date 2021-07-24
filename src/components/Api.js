export default class Api {
    constructor({url, headers}) {
        this._url = url;
        this._headers = headers;
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers
        }).then(this._handleResponse);
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers
        }).then(this._handleResponse);
    }

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

    editUserAvatar(userAvatar) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: userAvatar
            })
        }).then(this._handleResponse);
    }

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

    addLikeCard(cardId) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this._headers,
        }).then(this._handleResponse);
    }

    deleteLikeCard(cardId) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then(this._handleResponse);
    }
}