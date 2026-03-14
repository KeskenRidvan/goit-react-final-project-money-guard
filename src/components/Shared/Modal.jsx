import { useEffect } from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";

const modalRoot = document.body;

export default function Modal({ children, title, onClose, size = "default" }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className={`modal modal--${size}`}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <button
          className="modal__close"
          onClick={onClose}
          type="button"
          aria-label="Close modal"
        >
          <IoClose size={24} />
        </button>
        {title ? <h2 className="modal__title">{title}</h2> : null}
        {children}
      </div>
    </div>,
    modalRoot
  );
}
