import React from 'react';
import ReactDOM from 'react-dom';

function Backdrop({ onClose }) {
  return (
    <div
      onClick={onClose}
      onKeyDown={onClose}
      className="absolute z-10 w-screen h-screen bg-gray-bg-modal bg-opacity-70"
      role="button"
      tabIndex={0}
      aria-label="close-modal"
    />
  );
}

const portalElement = document.getElementById('overlays');

function ModalOverlay({ children }) {
  return (
    <div className="absolute z-20 top-[72px] right-4 bg-white w-[300px] rounded-md">
      {children}
    </div>
  );
}

function Modal({ children, onClose }) {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
}

export default Modal;
