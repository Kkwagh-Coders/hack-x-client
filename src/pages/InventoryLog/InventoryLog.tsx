import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { BiDetail } from 'react-icons/bi';
import InventoryLogViewModal from '../../components/InventoryLogViewModal/InventoryLogViewModal';
import TableBodySkeleton from '../../components/TableBodySkeleton/TableBodySkeleton';
import { getInventoryLog } from '../../services/inventory.services';
import { InventoryLog as InventoryLogType } from '../../types/inventory.types';
import styles from './InventoryLog.module.css';

const inventoryLogTableHeader = [
  { title: 'By', name: 'userId.firstName' },
  { title: 'Email', name: 'userId.email' },
  { title: 'Created At', name: 'createdAt' },
  { title: 'Action', name: 'action' },
  { title: 'View', name: null },
];

function InventoryLog() {
  const [pageNumber, setPageNumber] = useState(1);

  const [inventoryLogForView, setInventoryLogForView] =
    useState<InventoryLogType | null>(null);

  const {
    data: logTableData,
    isLoading,
    isFetching,
  } = useQuery(['inventory-log', pageNumber], () =>
    getInventoryLog(pageNumber),
  );

  return (
    <>
      {/* InventoryLog View Modal */}
      {inventoryLogForView ? (
        <InventoryLogViewModal
          log={inventoryLogForView}
          closeModalCallback={() => setInventoryLogForView(null)}
        />
      ) : null}

      {/* InventoryLog Table */}
      <div className={styles.InventoryLog}>
        <h1>Inventory Log</h1>

        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              {inventoryLogTableHeader.map((column) => (
                <th key={column.title} className={styles.tableHeadCell}>
                  <div className={styles.cellItem}>{column.title}</div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className={styles.tableBody}>
            {logTableData?.map((log) => {
              return (
                <tr key={log._id}>
                  <td>{log.userId.firstName}</td>
                  <td>{log.userId.email}</td>
                  <td>{log.createdAt}</td>

                  {/* TODO: Assign color to the action like the user */}
                  <td>{log.action}</td>

                  <td className={styles.actionCell}>
                    <BiDetail
                      className={styles.viewButton}
                      onClick={() => setInventoryLogForView(log)}
                    />
                  </td>
                </tr>
              );
            })}

            {isLoading || isFetching ? (
              <TableBodySkeleton columnCount={inventoryLogTableHeader.length} />
            ) : null}
          </tbody>
        </table>

        <div className={styles.pageButtons}>
          <button
            type="button"
            className={styles.pageButton}
            onClick={() => setPageNumber((state) => state - 1)}
            disabled={pageNumber === 1}
          >
            Previous
          </button>
          <p className={styles.pageNumber}>{pageNumber}</p>
          <button
            type="button"
            className={styles.pageButton}
            onClick={() => setPageNumber((state) => state + 1)}
            disabled={!logTableData || logTableData.length === 0}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default InventoryLog;
