import { Fragment } from "react";
import { createPortal } from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = ({ onClose }) => {
  return <div className={classes.backdrop} onClick={onClose}></div>;
};

const ModalOverlay = ({ children }) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

const Modal = ({ children, onClose }) => {
  const portal = document.getElementById("overlays");
  return (
    <Fragment>
      {createPortal(<Backdrop onClose={onClose} />, portal)}
      {createPortal(<ModalOverlay>{children}</ModalOverlay>, portal)}
    </Fragment>
  );
};

export default Modal;
