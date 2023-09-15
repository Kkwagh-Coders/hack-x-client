import { useRef } from 'react';
import { InventoryLog } from '../../types/inventory.types';
import styles from './InventoryLogViewModal.module.css';

type InventoryLogViewModalProps = {
  log: InventoryLog;
  closeModalCallback: () => void;
};

function InventoryLogViewModal({
  log,
  closeModalCallback,
}: InventoryLogViewModalProps) {
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
      className={styles.InventoryLogViewModal}
      id="modalBackdrop"
      ref={backdropRef}
    >
      <div className={styles.container}>
        <h2 className={styles.title}>Item Detail</h2>
        <p className={styles.content}>Name: {log.action}</p>
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

export default InventoryLogViewModal;
