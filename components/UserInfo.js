export default class UserInfo {
    constructor(selectorName, selectorJob) {
        this._inputName = document.querySelector(selectorName);
        this._inputJob = document.querySelector(selectorJob);
    }

    getUserInfo() {
        return {userName: this._inputName.textContent, userJob: this._inputJob.textContent};
    }

    setUserInfo(userName, userJob) {
        this._inputName.textContent = userName;
        this._inputJob.textContent = userJob;
      }
}