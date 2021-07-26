export default class UserInfo {
    constructor(selectorName, selectorJob, selectorAvatar) {
        this._inputName = document.querySelector(selectorName);
        this._inputJob = document.querySelector(selectorJob);
        this._selectorAvatar = document.querySelector(selectorAvatar);
    }
//  объект с данными пользователя
    getUserInfo() {
        return {userName: this._inputName.textContent, userJob: this._inputJob.textContent};
    }
//  данные профиля пользователя
    setUserInfo(userName, userJob) {
        this._inputName.textContent = userName;
        this._inputJob.textContent = userJob;
    }
// данные аватара пользователя
    setUserAvatar(avatarLink) {
        this._selectorAvatar.src = avatarLink;
    }
// данные ID пользователя
    setUserId(userId) {
        this._userId = userId;
    }
// ID пользователя
    getUserId() {
        return this._userId;
    }
}