import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Button from "../Button/Button";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
}

const Modal: React.FunctionComponent<ModalProps> = ({
  children,
  isOpen,
  onClose,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <dialog ref={dialogRef} aria-modal="true" aria-labelledby="dialog-title">
      <Button type="button" label="x" onClick={onClose}/>
      {children}
    </dialog>,
    document.body
  );
};

export default Modal;
