function enableValidation() {
    const formNewPlace = document.querySelector('.form__data[name="new-place"]');

    formNewPlace.addEventListener('submit', handleFormSubmit);
    formNewPlace.addEventListener('input', handleFormInput);

    const formEditProfile = document.querySelector('.form__data[name="edit-profile"]');

    formEditProfile.addEventListener('submit', handleFormSubmit);
    formEditProfile.addEventListener('input', handleFormInput);
}

function handleFormSubmit(evt) {
    evt.preventDefault();
}

function handleFormInput(evt) {
    const input = evt.target;
    const form = evt.currentTarget;

    setCustomError(input);

    setFieldError(input);

    setSubmitButtonState(form);
}

function setSubmitButtonState(form) {
    const button = form.querySelector('.form__button');
    const isValid = form.checkValidity();

    if (isValid) {
        button.classList.remove('form__button_disable');
        button.classList.add('form__button_enable');
        button.removeAttribute('disabled');
    } else {
        button.classList.remove('form__button_enable');
        button.classList.add('form__button_disable');
        button.setAttribute('disabled', 'disabled');
    }
}

function setCustomError(input) {
    const validity = input.validity;

    input.setCustomValidity('');

    if (validity.tooShort || validity.tooLong) {
        const currentLenght = input.value.length;
        const min = input.getAttribute('minlength');
        input.setCustomValidity(`Минимальное количество символов: ${min}. Длина текста сейчас: ${currentLenght} символ.`);
    }

    if (validity.typeMismatch) {
        input.setCustomValidity('Введите адрес сайта.');
    }
}

function setFieldError(input) {
    const spanError = document.querySelector(`#${input.id}-error`);
    spanError.textContent = input.validationMessage;
}

enableValidation(); 