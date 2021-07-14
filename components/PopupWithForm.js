import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        
        this._submitForm = submitForm;
        this._formData = this._popupContainer.querySelector('.form__data')
    }

    close() {
        super.close();
        this._formData.reset();
        this._formData.removeEventListener('submit', this._submitForm);
    }

    _getInputValues() {
        const inputsForm = this._formData.querySelectorAll('.form__input');

        let objData = {};
        if (objData === null) {
            return
        } else {
            inputsForm.forEach(input => {
                objData[input.name] = input.value;
            });
            console.log(objData)
            return objData;
        }
        
    }

    setEventListeners() {
        super.setEventListeners();
        this._formData.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitForm(this._getInputValues());
        });
    }
    
}