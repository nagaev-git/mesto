import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        
        this._submitForm = submitForm;
        this._formData = this._popupContainer.querySelector('.form__data');
        this._cardList = this._formData.querySelectorAll('.form__input');
    }
// закрытие попапа, сброс инпутов, удаление обработчика
    close() {
        super.close();
        this._formData.reset();
    }
// перебор инпутов
    _getInputValues() {
        const inputValue = {};

        this._cardList.forEach(input => {
            inputValue[input.name] = input.value;
        });

        return inputValue;
    }
// обработчик submita
    setEventListeners() {
        super.setEventListeners();
        this._formData.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitForm(this._getInputValues());
        });
    }
    
}