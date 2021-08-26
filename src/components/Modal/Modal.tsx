import './Modal.scss';

import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';
import { XIcon } from '@heroicons/react/outline';

interface ModalProps {
  show: boolean;
  close(): void;
}

function Modal({ show, close, children }: React.PropsWithChildren<ModalProps>) {
  if (!show) {
    return null;
  }

  return (
    <Dialog
      aria-label="view modal"
      className="Modal"
      isOpen
      onDismiss={() => close()}
    >
      {children}
      <button
        className="btn btn--icon Modal__close-button"
        onClick={() => close()}
      >
        <XIcon className="btn__icon" />
      </button>
    </Dialog>
  );
}

export default Modal;
