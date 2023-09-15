import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { editItem } from '../../services/inventory.services';
import { Item } from '../../types/inventory.types';
import styles from './InventoryEditModal.module.css';

type InventoryEditModalProps = {
  item: Item;
  closeModalCallback: () => void;
};

function InventoryEditModal({
  item,
  closeModalCallback,
}: InventoryEditModalProps) {
  const backdropRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInventoryEdit = async () => {
    setIsLoading(true);

    try {
      const message = await editItem(item);
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
      className={styles.InventoryEditModal}
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
            onClick={handleInventoryEdit}
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

export default InventoryEditModal;
