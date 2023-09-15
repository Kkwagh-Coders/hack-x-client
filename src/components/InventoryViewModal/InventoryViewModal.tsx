import { useRef } from 'react';
import { Item } from '../../types/inventory.types';
import getFormattedDate from '../../utils/getFormattedDate';
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

  console.log(item);

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

        <div className={styles.contentBlock}>
          <p className={styles.contentTitle}>{item.name}</p>
        </div>

        <div className={styles.contentBlock}>
          <p className={styles.contentTitle}>Description</p>
          <p className={styles.content}>{item.description}</p>
        </div>

        <div className={styles.contentBlock}>
          <p className={styles.contentTitle}>Category</p>
          <p className={styles.content}>{item.category}</p>
        </div>

        <div className={styles.contentBlock}>
          <p className={styles.contentTitle}>Location</p>
          <p className={styles.content}>{item.location}</p>
        </div>

        <p className={styles.content}>Items Working: {item.working}</p>
        <p className={styles.content}>Items Not Working: {item.notWorking}</p>

        <p className={styles.content}>
          Expiry Date: {getFormattedDate(item.expiry)}
        </p>
        <p className={styles.content}>
          Item Created On: {getFormattedDate(item.createdAt)}
        </p>
        <p className={styles.content}>
          Item Updated On: {getFormattedDate(item.updatedAt)}
        </p>

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
