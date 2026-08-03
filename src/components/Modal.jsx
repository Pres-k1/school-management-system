import "./Modal.css";

function Modal({
  isOpen,
  type = "confirm",
  title,
  message,
  children,
  icon,
  size = "md",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  showCancel = true,
  showConfirm = true,
  footer,
  closeOnOverlayClick = true,
  className = "",
}) {
  if (!isOpen) return null;

  const handleOverlayClick = () => {
    if (closeOnOverlayClick && onCancel) onCancel();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div
        className={`modal-box modal-${type} modal-${size} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {icon && <div className="modal-icon">{icon}</div>}
        {title && <h3>{title}</h3>}

        {children ? (
          <div className="modal-body">{children}</div>
        ) : (
          message && <p>{message}</p>
        )}

        {footer ? (
          <div className="modal-actions">{footer}</div>
        ) : (
          <div className="modal-actions">
            {showCancel && (
              <button className="btn-cancel" onClick={onCancel}>
                {cancelText}
              </button>
            )}
            {showConfirm && (
              <button className={`btn-${type}`} onClick={onConfirm}>
                {confirmText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;