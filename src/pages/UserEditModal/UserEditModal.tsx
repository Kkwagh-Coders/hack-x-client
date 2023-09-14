import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { editUser } from '../../services/user.services';
import { User } from '../../types/user.types';
import styles from './UserEditModal.module.css';

type UserEditModalProps = {
  user: User;
  closeModalCallback: () => void;
};

function UserEditModal({ user, closeModalCallback }: UserEditModalProps) {
  const backdropRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUserDelete = async () => {
    setIsLoading(true);

    try {
      const message = await editUser(user);
      toast.success(message);
      setIsLoading(false);
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
      className={styles.UserEditModal}
      id="modalBackdrop"
      ref={backdropRef}
    >
      <div className={styles.container}>
        <h2 className={styles.title}>Edit User</h2>

        <div>
          <p>hi</p>
        </div>

        <div className={styles.buttons}>
          <button
            type="button"
            onClick={handleUserDelete}
            className={styles.editButton}
            disabled={isLoading}
          >
            Save
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

export default UserEditModal;
