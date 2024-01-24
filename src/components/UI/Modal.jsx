import React from 'react';
import ReactDOM from 'react-dom';

export function Backdrop({ onClose }) {
  return (
    <div
      onClick={onClose}
      onKeyDown={onClose}
      className="fixed z-10 w-full h-full bg-gray-bg-modal bg-opacity-70"
      role="button"
      tabIndex={0}
      aria-label="close-modal"
    />
  );
}

export const portalElement = document.getElementById('overlays');

function ModalOverlay({ children, styles }) {
  return <div className={styles}>{children}</div>;
}

function Modal({ children, onClose, styles }) {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay styles={styles}>{children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
}

export default Modal;
