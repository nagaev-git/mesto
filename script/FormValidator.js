export default class FormValidator {
    constructor(config, formElement) {
        this._formElement = formElement;
        this._formButton = config.formButton;
        this._missmatchErrorMessage = config.missmatchErrorMessage;
        this._buttonDisable = config.buttonDisable;
        this._buttonEnable = config.buttonEnable;
    }
    // функция валидации
    enableValidation() {
        this._formElement.addEventListener('submit', this._handleFormSubmit);
        this._formElement.addEventListener('input', (evt) => this._handleFormInput(evt));
    }
    // отправка формы
    _handleFormSubmit(evt) {
        evt.preventDefault();
    }
    // валидация инпутов
    _handleFormInput(evt) {
        this._input = evt.target;

        this._setCustomError();

        this._setFieldError();

        this._setSubmitButtonState();
    }
    // активация кнопки отправки
    _setSubmitButtonState() {
        const button = this._formElement.querySelector(this._formButton);
        const isValid = this._formElement.checkValidity();
    
        if (isValid) {
            button.classList.remove(this._buttonDisable);
            button.classList.add(this._buttonEnable);
            button.removeAttribute('disabled');
        } else {
            button.classList.remove(this._buttonEnable);
            button.classList.add(this._buttonDisablee);
            button.setAttribute('disabled', 'disabled');
        }
    }

    // отправка сообщений об ошибке в валидации
    _setCustomError() {
        const validity = this._input.validity;

        this._input.setCustomValidity('');

        if (validity.tooShort || validity.tooLong) {
            const currentLenght = this._input.value.length;
            const min = this._input.getAttribute('minlength');
            this._input.setCustomValidity(`Минимальное количество символов: ${min}. Длина текста сейчас: ${currentLenght} символ.`);
        }

        if (validity.typeMismatch) {
            this._input.setCustomValidity(this._missmatchErrorMessage);
        }
    }
    // span с сообщением об ошибке
    _setFieldError() {
        const spanError = document.querySelector(`#${this._input.id}-error`);
        spanError.textContent = this._input.validationMessage;
    }
    
}