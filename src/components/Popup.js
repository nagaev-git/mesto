export default class Popup {
    constructor(popupSelector) {
        this._popupContainer = document.querySelector(popupSelector);
        this._buttonClosePopup = this._popupContainer.querySelector('.popup__toggle');

        this.close = this.close.bind(this);
        this._handleOverleyClick = this._handleOverleyClick.bind(this);
        this._handleEscClose = this._handleEscClose.bind(this);
    }
// навешиваем обработчики на попап
    setEventListeners() {
        this._buttonClosePopup.addEventListener('click', this.close);

        document.addEventListener('click', this._handleOverleyClick);
    }
// удаляем обработчики с попапа
    removeEventListeners() {
        this._buttonClosePopup.removeEventListener('click', this.close);

        document.removeEventListener('click', this._handleOverleyClick);
    }
// открыть попап
    open() {
        document.addEventListener('keydown', this._handleEscClose);

        this._popupContainer.classList.add('popup_opened');
    }
// закрыть попап
    close() {
        document.removeEventListener('keydown', this._handleEscClose);

        this._popupContainer.classList.remove('popup_opened');
    }
// закрыть нажатием esc
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }
// закрыть нажатием на overlay
    _handleOverleyClick(evt) {
        if  (evt.target.classList.contains('popup')) {
            this.close();
        }
    }
}