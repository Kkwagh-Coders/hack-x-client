import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { BiDetail, BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi';
import { getInventoryLog } from '../../services/inventory.services';
import { InventoryLog as InventoryLogType } from '../../types/inventory.types';
import InventoryLogViewModal from '../InventoryLogViewModal/InventoryLogViewModal';
import styles from './InventoryLog.module.css';

const userTableHeader = [
  { title: 'By', name: 'user.firstName' },
  { title: 'Created At', name: 'createdAt' },
  { title: 'Action', name: 'action' },
  { title: 'View', name: null },
];

function InventoryLog() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  const [inventoryLogForView, setInventoryLogForView] =
    useState<InventoryLogType | null>(null);

  const { data: logTableData, isLoading } = useQuery(
    ['inventory-log', pageNumber, sortBy, search],
    () => getInventoryLog(pageNumber, search, sortBy),
  );

  const handleSortByFilter = (columnName: string | null) => {
    if (!columnName) return;
    if (columnName === sortBy) setSortBy(`-${columnName}`);
    else setSortBy(columnName);
  };

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
            <div className={styles.searchBar}>
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event?.target.value)}
                className={styles.searchBarInput}
                placeholder="Search..."
              />
            </div>
            <tr>
              {userTableHeader.map((column) => (
                <th
                  key={column.title}
                  onClick={() => handleSortByFilter(column.name)}
                  className={styles.tableHeadCell}
                >
                  <div className={styles.cellItem}>
                    {column.title}
                    {sortBy && sortBy === column.name ? (
                      <BiSolidUpArrow />
                    ) : null}
                    {sortBy && sortBy === `-${column.name}` ? (
                      <BiSolidDownArrow />
                    ) : null}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className={styles.tableBody}>
            {logTableData?.map((log) => {
              return (
                <tr key={log.logId}>
                  <td>{log.user.firstName}</td>
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
          </tbody>
        </table>

        {/* Show loading text */}
        {isLoading ? <p>Loading...</p> : null}

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
