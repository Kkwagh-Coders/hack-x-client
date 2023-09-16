import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import {
  BiDetail,
  BiSolidAddToQueue,
  BiSolidDownArrow,
  BiSolidUpArrow,
} from 'react-icons/bi';
import AddInventoryItemModal from '../../components/AddInventoryItemModal/AddInventoryItemModal';
import InventoryDeleteModal from '../../components/InventoryDeleteModal/InventoryDeleteModal';
import InventoryEditModal from '../../components/InventoryEditModal/InventoryEditModal';
import InventoryViewModal from '../../components/InventoryViewModal/InventoryViewModal';
import TableBodySkeleton from '../../components/TableBodySkeleton/TableBodySkeleton';
import { useAppSelector } from '../../redux/store';
import { getInventory } from '../../services/inventory.services';
import { Item } from '../../types/inventory.types';
import getDaysBetween from '../../utils/getDaysBetween';
import getFormattedDate, {
  getNormalFormattedDate,
} from '../../utils/getFormattedDate';
import styles from './Inventory.module.css';

const inventoryTableHeaderAdminAndStaff = [
  { title: 'name', name: 'name' },
  { title: 'location', name: 'location' },
  { title: 'category', name: 'category' },
  { title: 'Quantity', name: 'notWorking' },
  { title: 'Expiry', name: 'expiry' },
  { title: 'Expires In', name: null },
  { title: 'View', name: null },
  { title: 'Edit', name: null },
  { title: 'Delete', name: null },
];

const inventoryTableHeaderTeacher = [
  { title: 'name', name: 'name' },
  { title: 'location', name: 'location' },
  { title: 'category', name: 'category' },
  { title: 'Quantity', name: 'notWorking' },
  { title: 'Expiry', name: 'expiry' },
  { title: 'Expires In', name: null },
  { title: 'View', name: null },
];

function Inventory() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<string | null>('expiry');
  const [pageNumber, setPageNumber] = useState(1);

  const [inventoryForEdit, setInventoryForEdit] = useState<Item | null>(null);
  const [inventoryForView, setInventoryForView] = useState<Item | null>(null);
  const [inventoryForDelete, setInventoryForDelete] = useState<Item | null>(
    null,
  );

  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const role = useAppSelector((state) => state.userState.user?.role);

  let inventoryTableHeader = inventoryTableHeaderAdminAndStaff;
  if (role === 'teacher') inventoryTableHeader = inventoryTableHeaderTeacher;

  const {
    data: inventoryTableData,
    isLoading,
    isFetching,
  } = useQuery(['inventory', pageNumber, sortBy, search], () =>
    getInventory(pageNumber, search, sortBy),
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

      {/* Add Item */}
      {isAddItemModalOpen ? (
        <AddInventoryItemModal
          closeModalCallback={() => setIsAddItemModalOpen(false)}
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

            <button
              type="button"
              className={styles.addButton}
              onClick={() => setIsAddItemModalOpen(true)}
            >
              Add Item
              <BiSolidAddToQueue />
            </button>

            <tr>
              {inventoryTableHeader.map((column) => (
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
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.location}</td>
                  <td>{item.category}</td>
                  <td>{item.notWorking}</td>
                  <td
                    className={
                      new Date(getFormattedDate(item.expiry)).getTime() <
                      new Date().getTime()
                        ? styles.expired
                        : ''
                    }
                  >
                    {getNormalFormattedDate(item.expiry)}
                  </td>

                  <td
                    className={
                      new Date(getFormattedDate(item.expiry)).getTime() <
                      new Date().getTime()
                        ? styles.expired
                        : ''
                    }
                  >
                    {getDaysBetween(new Date(), new Date(item.expiry)) >= 0
                      ? `${getDaysBetween(
                          new Date(),
                          new Date(item.expiry),
                        )} Days`
                      : 'Expired'}
                  </td>

                  <td className={styles.actionCell}>
                    <BiDetail
                      className={styles.viewButton}
                      onClick={() => setInventoryForView(item)}
                    />
                  </td>

                  {role !== 'teacher' ? (
                    <>
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
                    </>
                  ) : null}
                </tr>
              );
            })}
            {isLoading || isFetching ? (
              <TableBodySkeleton columnCount={inventoryTableHeader.length} />
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
