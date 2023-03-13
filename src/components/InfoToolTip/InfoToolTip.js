import './InfoTooltip.css';

function InfoTooltip({ onClose, isOpen, isSubmitOk, data }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__tooltip-container">
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
        <div
          className={isSubmitOk ? "popup__tooltip-icon" : "popup__tooltip-icon_error"}
        ></div>
        <p className="popup__tooltip-text">
          {isSubmitOk
            ? `${data.text}`
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;