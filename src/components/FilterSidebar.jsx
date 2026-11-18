// Presentational component: it only displays what it's given
// and reports user actions back through the callback props.
function FilterSidebar({
  search,
  onSearchChange,
  origins,
  selectedOrigins,
  onToggleOrigin,
  onClear,
}) {
  const hasFilters = search !== "" || selectedOrigins.length > 0;

  return (
    <aside className="sidebar">
      <input
        type="search"
        className="search-input"
        placeholder="Search"
        aria-label="Search coffees"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />

      <h3>Origin</h3>
      <ul className="origin-list">
        {origins.map((origin) => (
          <li key={origin}>
            {/* Wrapping the input in the label links them without needing an id */}
            <label>
              <input
                type="checkbox"
                checked={selectedOrigins.includes(origin)}
                onChange={() => onToggleOrigin(origin)}
              />
              {origin}
            </label>
          </li>
        ))}
      </ul>

      {hasFilters && (
        <button type="button" className="clear-btn" onClick={onClear}>
          Clear filters
        </button>
      )}
    </aside>
  );
}

export default FilterSidebar;
