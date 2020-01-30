import React from "react";
import ReactDOM from "react-dom";

function Modal({ component: Component, ...rest }) {
  return ReactDOM.createPortal(
    <Component {...rest} />,
    document.getElementById("modal-root")
  );
}

export default Modal;
