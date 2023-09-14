import { useRef } from 'react';
import { Item } from '../../types/inventory.types';
import styles from './InventoryViewModal.module.css';

type InventoryViewModalProps = {
  item: Item;
  closeModalCallback: () => void;
};

function InventoryViewModal({
  item,
  closeModalCallback,
}: InventoryViewModalProps) {
  const backdropRef = useRef(null);

  const handleModalClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
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
      className={styles.InventoryViewModal}
      id="modalBackdrop"
      ref={backdropRef}
    >
      <div className={styles.container}>
        <h2 className={styles.title}>Item Detail</h2>
        <p className={styles.content}>Name: {item.name}</p>
        <div className={styles.buttons}>
          <input
            className={styles.backButton}
            onClick={closeModalCallback}
            type="button"
            value="Close"
          />
        </div>
      </div>
    </div>
  );
}

export default InventoryViewModal;
