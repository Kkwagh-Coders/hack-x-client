import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi';
import { getUsers } from '../../services/user.services';
import { User } from '../../types/user.types';
import UserDeleteModal from '../UserDeleteModal/UserDeleteModal';
import UserEditModal from '../UserEditModal/UserEditModal';
import styles from './UserTable.module.css';

const userTableHeader = [
  { title: 'Name', name: 'firstName' },
  { title: 'Email', name: 'email' },
  { title: 'Designation', name: 'designation' },
  { title: 'Department', name: 'department' },
  { title: 'Role', name: 'role' },
  { title: 'Edit', name: null },
  { title: 'Delete', name: null },
];

function UserTable() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  const [userForEdit, setUserForEdit] = useState<User | null>(null);
  const [userForDelete, setUserForDelete] = useState<User | null>(null);

  const { data: userTableData, isLoading } = useQuery(
    ['users', pageNumber, sortBy, search],
    () => getUsers(pageNumber, search, sortBy),
  );

  const handleSortByFilter = (columnName: string | null) => {
    if (!columnName) return;
    if (columnName === sortBy) setSortBy(`-${columnName}`);
    else setSortBy(columnName);
  };

  return (
    <>
      {/* User Edit Modal */}
      {userForEdit ? (
        <UserEditModal
          user={userForEdit}
          closeModalCallback={() => setUserForEdit(null)}
        />
      ) : null}

      {/* User Delete Modal */}
      {userForDelete ? (
        <UserDeleteModal
          user={userForDelete}
          closeModalCallback={() => setUserForDelete(null)}
        />
      ) : null}

      {/* User Table */}
      <div className={styles.UserTable}>
        <h1>User Table</h1>

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
            {userTableData?.map((user) => {
              let roleClass = '';
              if (user.role === 'Admin') roleClass = styles.adminRole;
              else if (user.role === 'Staff') roleClass = styles.staffRole;
              else roleClass = styles.teacherRole;

              return (
                <tr key={user.userId}>
                  <td>{`${user.firstName} ${user.middleName} ${user.lastName}`}</td>
                  <td>{user.email}</td>
                  <td>{user.designation}</td>
                  <td>{user.department}</td>
                  <td>
                    <p className={`${styles.role} ${roleClass}`}>{user.role}</p>
                  </td>
                  <td className={styles.actionCell}>
                    <AiOutlineEdit
                      className={styles.editButton}
                      onClick={() => setUserForEdit(user)}
                    />
                  </td>
                  <td className={styles.actionCell}>
                    <AiOutlineDelete
                      className={styles.deleteButton}
                      onClick={() => setUserForDelete(user)}
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
            disabled={!userTableData || userTableData.length === 0}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default UserTable;
