import "../styles/Filter.styles.css";

function Filters({
  searchTerm,
  onSearchChange,
  resultsCount = 0,
  totalCount = 0,
  classOptions = [],
  streamOptions = [],
  classFilter = "all",
  streamFilter = "all",
  feeFilter = "all",
  onClassChange,
  onStreamChange,
  onFeeChange,
}) {
  return (
    <section className="filters-panel">
      <div className="filter-row">
        <label className="filter-search">
          <span className="filter-search-icon">⏷</span>
          <input
            placeholder="Filter by name or ID..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </label>

        <select value={classFilter} onChange={(e) => onClassChange?.(e.target.value)}>
          <option value="all">All Classes</option>
          {classOptions.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select value={streamFilter} onChange={(e) => onStreamChange?.(e.target.value)}>
          <option value="all">All Streams</option>
          {streamOptions.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <select value={feeFilter} onChange={(e) => onFeeChange?.(e.target.value)}>
          <option value="all">Fee Status</option>
          <option value="paid">Paid</option>
          <option value="partial">Partial</option>
          <option value="pending">Pending</option>
        </select>

        <div className="filter-meta">
          Showing {resultsCount} of {totalCount} students
        </div>
      </div>
    </section>
  );
}

export default Filters;
