import React from "react";
import styles from "./Modal.module.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  steps: string[];
  currentStep: number;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  steps,
  currentStep,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Requesting the quote</h2>
        {steps.map((step, index) => (
          <p key={index}>
            Step {index + 1}: {step} {index < currentStep ? "✅" : "..."}
          </p>
        ))}
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default Modal;
