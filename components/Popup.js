export default class Popup {
    constructor(popupSelector) {
        this._popupContainer = document.querySelector(popupSelector);
        this._buttonClosePopup = this._popupContainer.querySelector('.popup__toggle');
    }

    setEventListeners() {
        this._buttonClosePopup.addEventListener('click', this.close.bind(this));

        document.addEventListener('click', this._handleOverleyClick.bind(this));

        document.addEventListener('keydown', this._handleEscClose.bind(this));
    }

    removeEventListeners() {
        this._buttonClosePopup.removeEventListener('click', this.close.bind(this));

        document.removeEventListener('click', this._handleOverleyClick.bind(this));

        document.removeEventListener('keydown', this._handleEscClose.bind(this));
    }

    open() {
        this.setEventListeners();

        this._popupContainer.classList.add('popup_opened');
    }

    close() {
        this.removeEventListeners()

        this._popupContainer.classList.remove('popup_opened');
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _handleOverleyClick(evt) {
        if  (evt.target.classList.contains('popup')) {
            this.close();
        }
    }
}