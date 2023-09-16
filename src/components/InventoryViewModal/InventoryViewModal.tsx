import { useRef } from 'react';
import { Item } from '../../types/inventory.types';
import { getNormalFormattedDate } from '../../utils/getFormattedDate';
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
          <p className={styles.contentTitle}>
            Name: <span className={styles.itemValue}>{item.name}</span>
          </p>
        </div>

        <div className={styles.contentBlock}>
          <p className={styles.contentTitle}>Description</p>
          <p className={styles.content}>
            <span className={styles.itemValue}>{item.description}</span>
          </p>
        </div>

        <div className={styles.contentBlock}>
          <p className={styles.contentTitle}>
            Category: <span className={styles.itemValue}>{item.category}</span>
          </p>
        </div>

        <div className={styles.contentBlock}>
          <p className={styles.contentTitle}>
            Location: <span className={styles.itemValue}>{item.location}</span>
          </p>
        </div>

        <div className={styles.contentBlock}>
          <p className={styles.contentTitle}>
            Quantity:{' '}
            <span className={styles.itemValue}>{item.notWorking}</span>
          </p>
        </div>

        <table>
          <thead>
            <tr>
              <th>Created</th>
              <th>Updated</th>
              <th>Expires On</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{getNormalFormattedDate(item.createdAt)}</td>
              <td>{getNormalFormattedDate(item.updatedAt)}</td>
              <td>{getNormalFormattedDate(item.expiry)}</td>
            </tr>
          </tbody>
        </table>

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
