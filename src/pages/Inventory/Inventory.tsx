import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BiDetail, BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi';
import { getInventory } from '../../services/inventory.services';
import { Item } from '../../types/inventory.types';
import InventoryDeleteModal from '../InventoryDeleteModal/InventoryDeleteModal';
import InventoryEditModal from '../InventoryEditModal/InventoryEditModal';
import InventoryViewModal from '../InventoryViewModal/InventoryViewModal';
import styles from './Inventory.module.css';

const userTableHeader = [
  { title: 'name', name: 'name' },
  { title: 'location', name: 'location' },
  { title: 'category', name: 'category' },
  { title: 'working', name: 'working' },
  { title: 'Faulty', name: 'notWorking' },
  { title: 'View', name: null },
  { title: 'Edit', name: null },
  { title: 'Delete', name: null },
];

function Inventory() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  const [inventoryForEdit, setInventoryForEdit] = useState<Item | null>(null);
  const [inventoryForView, setInventoryForView] = useState<Item | null>(null);
  const [inventoryForDelete, setInventoryForDelete] = useState<Item | null>(
    null,
  );

  const { data: inventoryTableData, isLoading } = useQuery(
    ['inventory', pageNumber, sortBy, search],
    () => getInventory(pageNumber, search, sortBy),
  );

  const handleSortByFilter = (columnName: string | null) => {
    if (!columnName) return;
    if (columnName === sortBy) setSortBy(`-${columnName}`);
    else setSortBy(columnName);
  };

  return (
    <>
      {/* Inventory View Modal */}
      {inventoryForView ? (
        <InventoryViewModal
          item={inventoryForView}
          closeModalCallback={() => setInventoryForView(null)}
        />
      ) : null}

      {/* Inventory Edit Modal */}
      {inventoryForEdit ? (
        <InventoryEditModal
          item={inventoryForEdit}
          closeModalCallback={() => setInventoryForEdit(null)}
        />
      ) : null}

      {/* Inventory Delete Modal */}
      {inventoryForDelete ? (
        <InventoryDeleteModal
          item={inventoryForDelete}
          closeModalCallback={() => setInventoryForDelete(null)}
        />
      ) : null}

      {/* Inventory Table */}
      <div className={styles.Inventory}>
        <h1>Inventory</h1>

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
            {inventoryTableData?.map((item) => {
              return (
                <tr key={item.itemId}>
                  <td>{item.name}</td>
                  <td>{item.location}</td>
                  <td>{item.category}</td>
                  <td>{item.working}</td>
                  <td>{item.notWorking}</td>

                  <td className={styles.actionCell}>
                    <BiDetail
                      className={styles.viewButton}
                      onClick={() => setInventoryForView(item)}
                    />
                  </td>

                  <td className={styles.actionCell}>
                    <AiOutlineEdit
                      className={styles.editButton}
                      onClick={() => setInventoryForEdit(item)}
                    />
                  </td>
                  <td className={styles.actionCell}>
                    <AiOutlineDelete
                      className={styles.deleteButton}
                      onClick={() => setInventoryForDelete(item)}
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
            disabled={!inventoryTableData || inventoryTableData.length === 0}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default Inventory;
