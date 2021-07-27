import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector)

        this._submitCallback = submitCallback;
        this._formData = this._popupContainer.querySelector('.form__data');
    }
// закрытие попапа
    close() {
        super.close();
    }
// колбек submita
    setSubmitCallback(callback) {
        this._submitCallback = callback;
      }
// обработчик submita
    setEventListeners() {
        super.setEventListeners();
        this._formData.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitCallback();
        });
    }
}