import React from "react";
import styles from "../styles/DeleteConfirmModal.module.css";
import { FaExclamationTriangle } from "react-icons/fa";

const DeleteConfirmModal = ({ onClose, onConfirm }) => (
  <div className={styles.modalBackdrop}>
    <div className={styles.modalContent}>
      <FaExclamationTriangle className={styles.icon} />
      <p>Are you sure you want to delete this book?</p>
      <div className={styles.actions}>
        <button onClick={onConfirm} className={styles.confirmBtn}>
          Yes, Delete
        </button>
        <button onClick={onClose} className={styles.cancelBtn}>
          Cancel
        </button>
      </div>
    </div>
  </div>
);

export default DeleteConfirmModal;
