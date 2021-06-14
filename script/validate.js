// функция валидации
function enableValidation(config) {
    const formNewPlace = document.querySelector(config.form);

    formNewPlace.addEventListener('submit', handleFormSubmit);
    formNewPlace.addEventListener('input', (evt) => handleFormInput(evt, config));
}
// отправка формы
function handleFormSubmit(evt) {
    evt.preventDefault();
}
// валидация инпутов
function handleFormInput(evt, config) {
    const input = evt.target;
    const form = evt.currentTarget;

    setCustomError(input, config);

    setFieldError(input);

    setSubmitButtonState(form, config);
}
// активация кнопки отправки
function setSubmitButtonState(form, config) {
    const button = form.querySelector(config.formButton);
    const isValid = form.checkValidity();

    if (isValid) {
        button.classList.remove(config.buttonDisable);
        button.classList.add(config.buttonEnable);
        button.removeAttribute('disabled');
    } else {
        button.classList.remove(config.buttonEnable);
        button.classList.add(config.buttonDisable);
        button.setAttribute('disabled', 'disabled');
    }
}
// отправка сообщений об ошибке в валидации
function setCustomError(input, config) {
    const validity = input.validity;

    input.setCustomValidity('');

    if (validity.tooShort || validity.tooLong) {
        const currentLenght = input.value.length;
        const min = input.getAttribute('minlength');
        input.setCustomValidity(`Минимальное количество символов: ${min}. Длина текста сейчас: ${currentLenght} символ.`);
    }

    if (validity.typeMismatch) {
        input.setCustomValidity(config.missmatchErrorMessage);
    }
}
// span с сообщением об ошибке
function setFieldError(input) {
    const spanError = document.querySelector(`#${input.id}-error`);
    spanError.textContent = input.validationMessage;
}
// валидация формы новое место
enableValidation({
    form: '.form__data[name="new-place"]',
    formButton: '.form__button',
    missmatchErrorMessage: 'Введите адрес сайта.',
    buttonDisable: 'form__button_disable',
    buttonEnable: 'form__button_enable'
});
// валидация формы редактировать профиль
enableValidation({
    form: '.form__data[name="edit-profile"]',
    formButton: '.form__button',
    buttonDisable: 'form__button_disable',
    buttonEnable: 'form__button_enable'
});