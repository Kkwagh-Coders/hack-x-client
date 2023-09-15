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
      {/* logId: string;
    _id: string;
    user: User;
    oldItem: Item;
    newItem: Item;
    createdAt: string;
    action: ActionType;
 */}

      <div className={styles.container}>
        <h2 className={styles.title}>Log Detail</h2>
        <p>User: {log.userId.email}</p>
        <div className={styles.contentBlock}>
          <p className={styles.contentTitle}>Date</p>
          <p className={styles.content}>{log.createdAt}</p>
        </div>
        <div className={styles.contentBlock}>
          <p className={styles.contentTitle}>Action</p>
          <p className={styles.content}>{log.action}</p>
        </div>

        <div className={styles.oldNewDataContainer}>
          <div>
            <h2>Old Data</h2>
            <div>
              <div className={styles.contentBlock}>
                <p className={styles.contentTitle}>{log.oldItem.name}</p>
              </div>

              <div className={styles.contentBlock}>
                <p className={styles.contentTitle}>Description</p>
                <p className={styles.content}>{log.oldItem.description}</p>
              </div>

              <div className={styles.contentBlock}>
                <p className={styles.contentTitle}>Category</p>
                <p className={styles.content}>{log.oldItem.category}</p>
              </div>

              <div className={styles.contentBlock}>
                <p className={styles.contentTitle}>Location</p>
                <p className={styles.content}>{log.oldItem.location}</p>
              </div>

              <p className={styles.content}>
                Items Working: {log.oldItem.working}
              </p>
              <p className={styles.content}>
                Items Not Working: {log.oldItem.notWorking}
              </p>
            </div>
          </div>

          <div>
            <h2>New Data</h2>
            <div>
              <div className={styles.contentBlock}>
                <p className={styles.contentTitle}>{log.newItem.name}</p>
              </div>

              <div className={styles.contentBlock}>
                <p className={styles.contentTitle}>Description</p>
                <p className={styles.content}>{log.newItem.description}</p>
              </div>

              <div className={styles.contentBlock}>
                <p className={styles.contentTitle}>Category</p>
                <p className={styles.content}>{log.newItem.category}</p>
              </div>

              <div className={styles.contentBlock}>
                <p className={styles.contentTitle}>Location</p>
                <p className={styles.content}>{log.newItem.location}</p>
              </div>

              <p className={styles.content}>
                Items Working: {log.newItem.working}
              </p>
              <p className={styles.content}>
                Items Not Working: {log.newItem.notWorking}
              </p>
            </div>
          </div>
        </div>

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
