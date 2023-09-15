import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { deleteUser } from '../../services/user.services';
import { User } from '../../types/user.types';
import styles from './UserDeleteModal.module.css';

type UserDeleteModalProps = {
  user: User;
  closeModalCallback: () => void;
};

function UserDeleteModal({ user, closeModalCallback }: UserDeleteModalProps) {
  const backdropRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleUserDelete = async () => {
    setIsLoading(true);

    try {
      const message = await deleteUser(user._id);
      toast.success(message);
      setIsLoading(false);
      closeModalCallback();
    } catch (error) {
      toast.error('Server Error, Please Try Later');
      setIsLoading(false);
    }
  };

  const handleModalClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (isLoading) return;
    if (event.target !== backdropRef.current) return;
    closeModalCallback();
  };

  return (
    // Todo: Remove the eslint disables properly
    // eslint-disable-next-line max-len
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
    <div
      role="alert"
      onClick={handleModalClick}
      className={styles.UserDeleteModal}
      id="modalBackdrop"
      ref={backdropRef}
    >
      <div className={styles.container}>
        <h2 className={styles.title}>Delete User?</h2>
        <p className={styles.content}>
          By Clicking Delete Button the user (
          {`${user.firstName} ${user.middleName} ${user.lastName}`}) will be
          Removed from the Inventory Management System!!
        </p>

        <div className={styles.buttons}>
          <button
            type="button"
            onClick={handleUserDelete}
            className={styles.deleteButton}
            disabled={isLoading}
          >
            Delete
          </button>
          <input
            className={styles.backButton}
            onClick={closeModalCallback}
            type="button"
            value="Close"
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
}

export default UserDeleteModal;
