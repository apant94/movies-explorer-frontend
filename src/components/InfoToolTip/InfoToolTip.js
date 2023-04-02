import './InfoToolTip.css';

function InfoTooltip({ onClose, isOpen, isOk, text }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__tooltip-container">
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
        <div
          className={isOk ? "popup__tooltip-icon" : "popup__tooltip-icon_error"}
        ></div>
        <p className="popup__tooltip-text">
          {isOk
            ? `${text}`
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;