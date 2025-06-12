import React from "react";
import { useForm } from "react-hook-form";
import styles from "../styles/BookFormModal.module.css";

const BookFormModal = ({ onClose, onSubmit, defaultValues = {} }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const submit = (data) => {
    onSubmit(data);
    onClose();
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h3>{defaultValues?.id ? "Edit Book" : "Add Book"}</h3>
        <form onSubmit={handleSubmit(submit)} className={styles.form}>
          <label>
            Title
            <input {...register("title", { required: true })} />
            {errors.title && (
              <span className={styles.error}>Title is required</span>
            )}
          </label>

          <label>
            Author
            <input {...register("author", { required: true })} />
            {errors.author && (
              <span className={styles.error}>Author is required</span>
            )}
          </label>

          <label>
            Genre
            <input {...register("genre", { required: true })} />
            {errors.genre && (
              <span className={styles.error}>Genre is required</span>
            )}
          </label>

          <label>
            Published Year
            <input type="number" {...register("year", { required: true })} />
            {errors.year && (
              <span className={styles.error}>Year is required</span>
            )}
          </label>

          <label>
            Status
            <select {...register("status", { required: true })}>
              <option value="Available">Available</option>
              <option value="Issued">Issued</option>
            </select>
          </label>

          <div className={styles.actions}>
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookFormModal;
