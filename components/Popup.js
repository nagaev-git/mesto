export default class Popup {
    constructor(popupSelector) {
        this._popupContainer = document.querySelector(popupSelector);
        this._buttonClosePopup = this._popupContainer.querySelector('.popup__toggle');
    }
// навешиваем обработчики на попап
    setEventListeners() {
        this._buttonClosePopup.addEventListener('click', this.close.bind(this));

        document.addEventListener('click', this._handleOverleyClick.bind(this));

        document.addEventListener('keydown', this._handleEscClose.bind(this));
    }
// удаляем обработчики с попапа
    removeEventListeners() {
        this._buttonClosePopup.removeEventListener('click', this.close.bind(this));

        document.removeEventListener('click', this._handleOverleyClick.bind(this));

        document.removeEventListener('keydown', this._handleEscClose.bind(this));
    }
// открыть попап
    open() {
        this.setEventListeners();

        this._popupContainer.classList.add('popup_opened');
    }
// закрыть попап
    close() {
        this.removeEventListeners()

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