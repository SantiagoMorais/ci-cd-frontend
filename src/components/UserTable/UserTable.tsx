import { FiChevronLeft, FiChevronRight, FiTrash2 } from "react-icons/fi";
import styles from "./UserTable.module.scss";
import { getInitials } from "../../utils/format";
import { useUserFilters } from "../../hooks/useUserFilters";
import { usePagination } from "../../hooks/usePagination";
import type { IUserRecord } from "../../types/user";

interface UserTableProps {
  users: IUserRecord[];
  onRemove: (id: number) => void;
}

export const UserTable = ({ users, onRemove }: UserTableProps) => {
  const { filters, setFilter, filteredUsers } = useUserFilters(users);
  const { page, pageSize, totalPages, pageStart, paginatedItems, setPage, setPageSize } =
    usePagination(filteredUsers);

  return (
    <section className={styles.listCard}>
      <div className={styles.listHeader}>
        <h2 className={styles.listTitle}>All users</h2>
        <span className={styles.count}>{filteredUsers.length}</span>
      </div>
      <div className={styles.filters}>
        <label className={styles.filterField}>
          <span>Name</span>
          <input
            className={styles.input}
            type="text"
            placeholder="Filter by name"
            value={filters.name}
            onChange={(e) => {
              setFilter("name", e.target.value);
              setPage(1);
            }}
          />
        </label>
        <label className={styles.filterField}>
          <span>Phone</span>
          <input
            className={styles.input}
            type="text"
            placeholder="Filter by phone"
            value={filters.phone}
            onChange={(e) => {
              setFilter("phone", e.target.value);
              setPage(1);
            }}
          />
        </label>
        <label className={styles.filterField}>
          <span>Email</span>
          <input
            className={styles.input}
            type="text"
            placeholder="Filter by email"
            value={filters.email}
            onChange={(e) => {
              setFilter("email", e.target.value);
              setPage(1);
            }}
          />
        </label>
      </div>
      {filteredUsers.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyTitle}>
            {users.length === 0 ? "No users yet" : "No users found"}
          </p>
          <p className={styles.emptyText}>
            {users.length === 0
              ? "Use the form on the right to add the first user."
              : "Try adjusting the filters above."}
          </p>
        </div>
      ) : (
        <>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {paginatedItems.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className={styles.userCell}>
                        <span className={styles.avatar}>
                          {getInitials(user.name)}
                        </span>
                        {user.name}
                      </div>
                    </td>
                    <td>{user.phone}</td>
                    <td className={!user.mail ? styles.muted : undefined}>
                      {user.mail || "-"}
                    </td>
                    <td className={user.age == null ? styles.muted : undefined}>
                      {user.age ?? "-"}
                    </td>
                    <td>
                      <button
                        type="button"
                        className={styles.removeButton}
                        aria-label={`Remove ${user.name}`}
                        onClick={() => onRemove(user.id)}
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.pagination}>
            <label className={styles.pageSizeControl}>
              <span>Rows per page</span>
              <select
                className={styles.select}
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </label>
            <span className={styles.pageInfo}>
              {pageStart + 1}-{Math.min(pageStart + pageSize, filteredUsers.length)}{" "}
              of {filteredUsers.length}
            </span>
            <div className={styles.pageButtons}>
              <button
                type="button"
                className={styles.pageNavButton}
                aria-label="Previous page"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                <FiChevronLeft />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    className={
                      pageNumber === page
                        ? styles.pageButtonActive
                        : styles.pageButton
                    }
                    onClick={() => setPage(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                ),
              )}
              <button
                type="button"
                className={styles.pageNavButton}
                aria-label="Next page"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};
