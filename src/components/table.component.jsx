import React, { useState, useMemo } from "react";

// ---------------------------------------------------------
// DataTable - reusable table component (React + Bootstrap)
//
// Requirements in your project:
//   npm install bootstrap
//   import 'bootstrap/dist/css/bootstrap.min.css'; (once, in your entry file)
//
// Works for any tabular data in the school management system:
// students, teachers, grades, attendance, fees, assessments, etc.
// ---------------------------------------------------------

/**
 * @param {Object[]} columns - column definitions
 *   { key: string, label: string, sortable?: boolean,
 *     render?: (row) => ReactNode, align?: 'start'|'center'|'end' }
 * @param {Object[]} data - array of row objects
 * @param {string} keyField - unique field name used as React key (default "id")
 * @param {number} pageSize - rows per page (default 10, pass 0 to disable pagination)
 * @param {string} emptyMessage - shown when data is empty
 * @param {function} onRowClick - optional (row) => void, makes rows clickable
 * @param {boolean} striped - Bootstrap table-striped (default true)
 * @param {boolean} hover - Bootstrap table-hover (default true)
 * @param {boolean} bordered - Bootstrap table-bordered (default false)
 * @param {string} size - "sm" for compact table, or undefined for default
 */
export default function DataTable({
  columns,
  data,
  keyField = "id",
  pageSize = 10,
  emptyMessage = "No records found.",
  onRowClick,
  striped = true,
  hover = true,
  bordered = false,
  size,
}) {
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc"); // "asc" | "desc"
  const [page, setPage] = useState(1);

  const sortedData = useMemo(() => {
    if (!sortKey) return data;
    const col = columns.find((c) => c.key === sortKey);
    const sorted = [...data].sort((a, b) => {
      const valA = col?.sortValue ? col.sortValue(a) : a[sortKey];
      const valB = col?.sortValue ? col.sortValue(b) : b[sortKey];
      if (valA == null) return 1;
      if (valB == null) return -1;
      if (typeof valA === "number" && typeof valB === "number") return valA - valB;
      return String(valA).localeCompare(String(valB));
    });
    return sortDir === "asc" ? sorted : sorted.reverse();
  }, [data, sortKey, sortDir, columns]);

  const totalPages = pageSize > 0 ? Math.max(1, Math.ceil(sortedData.length / pageSize)) : 1;
  const currentPage = Math.min(page, totalPages);

  const visibleData = useMemo(() => {
    if (pageSize <= 0) return sortedData;
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  function handleSort(col) {
    if (!col.sortable) return;
    if (sortKey === col.key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(col.key);
      setSortDir("asc");
    }
    setPage(1);
  }

  function sortIcon(col) {
    if (!col.sortable) return null;
    if (sortKey !== col.key) return <span className="text-muted ms-1">↕</span>;
    return <span className="ms-1">{sortDir === "asc" ? "▲" : "▼"}</span>;
  }

  const tableClasses = [
    "table",
    "align-middle",
    "mb-0",
    striped && "table-striped",
    hover && "table-hover",
    bordered && "table-bordered",
    size && `table-${size}`,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div>
      <div className="table-responsive">
        <table className={tableClasses}>
          <thead>
            <tr className="text-muted small text-uppercase">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`text-${col.align || "start"} ${col.sortable ? "user-select-none" : ""}`}
                  style={col.sortable ? { cursor: "pointer" } : undefined}
                  onClick={() => handleSort(col)}
                >
                  {col.label}
                  {sortIcon(col)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center text-muted py-4">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              visibleData.map((row) => (
                <tr
                  key={row[keyField]}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  style={onRowClick ? { cursor: "pointer" } : undefined}
                >
                  {columns.map((col) => (
                    <td key={col.key} className={`text-${col.align || "start"}`}>
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pageSize > 0 && totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <span className="text-muted small">
            Page {currentPage} of {totalPages} · {sortedData.length} records
          </span>
          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setPage((p) => Math.max(1, p - 1))}>
                  Prev
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <li key={n} className={`page-item ${n === currentPage ? "active" : ""}`}>
                  <button className="page-link" onClick={() => setPage(n)}>
                    {n}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
