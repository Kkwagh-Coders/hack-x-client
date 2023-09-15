import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { deleteItem } from '../../services/inventory.services';
import { Item } from '../../types/inventory.types';
import styles from './InventoryDeleteModal.module.css';

type InventoryDeleteModalProps = {
  item: Item;
  closeModalCallback: () => void;
};

function InventoryDeleteModal({
  item,
  closeModalCallback,
}: InventoryDeleteModalProps) {
  const backdropRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleUserDelete = async () => {
    setIsLoading(true);

    try {
      const message = await deleteItem(item._id);
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
      className={styles.InventoryDeleteModal}
      id="modalBackdrop"
      ref={backdropRef}
    >
      <div className={styles.container}>
        <h2 className={styles.title}>Delete Item?</h2>
        <p className={styles.content}>
          By Clicking Delete Button the item ({item.name}) will be Removed from
          the Inventory Management System!!
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

export default InventoryDeleteModal;
