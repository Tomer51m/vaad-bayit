import React from "react";
import ReactDOM from "react-dom";
import "./modal.scss";

function Modal({ children, showModal, handleClose }) {
  let showHideClassName = showModal
    ? "display-block"
    : "display-none";

  return ReactDOM.createPortal(
    <div className={`modal-container ${showHideClassName}`}>
      {children}
      <button onClick={handleClose}>close</button>
    </div>,
    document.getElementById("modal-root")
  );
}

export default Modal;
