import React from "react";
import "./Modal.css";

const Modal = ({ show, handleClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={handleClose}>
          &times;
        </button>
        <div className="modal-children">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
