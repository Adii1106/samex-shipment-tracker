import { STATUSES } from "../utils/constants";

export function FilterBar({ filters, onChange }) {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="filter-status">Status</label>
        <select
          id="filter-status"
          value={filters.status}
          onChange={(e) => onChange({ ...filters, status: e.target.value })}
        >
          <option value="">All</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="filter-dest">Destination</label>
        <input
          id="filter-dest"
          type="text"
          placeholder="Search city…"
          value={filters.destination}
          onChange={(e) => onChange({ ...filters, destination: e.target.value })}
        />
      </div>
    </div>
  );
}
