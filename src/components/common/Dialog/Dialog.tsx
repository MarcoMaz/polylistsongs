import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Button from "../Button/Button";

interface DialogProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
}

const Dialog: React.FunctionComponent<DialogProps> = ({
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
    <dialog
      className="dialog"
      ref={dialogRef}
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      <Button type="button" additionalClassnames={["dialog__close"]} icon="x" onClick={onClose} />
      <div className="dialog__content">
        {children}
      </div>
    </dialog>,
    document.body
  );
};

export default Dialog;
