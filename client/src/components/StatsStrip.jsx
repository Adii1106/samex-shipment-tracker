import { STATUSES, STATUS_META } from "../utils/constants";

export function StatsStrip({ shipments }) {
  const counts = STATUSES.reduce((acc, s) => {
    acc[s] = shipments.filter((sh) => sh.status === s).length;
    return acc;
  }, {});

  return (
    <div className="stats-strip">
      <div className="stat-total">
        <span className="stat-num">{shipments.length}</span>
        <span className="stat-label">Total</span>
      </div>
      {STATUSES.map((s) => (
        <div key={s} className="stat-item" style={{ "--dot": STATUS_META[s].dot }}>
          <span className="stat-dot" />
          <span className="stat-num">{counts[s]}</span>
          <span className="stat-label">{s}</span>
        </div>
      ))}
    </div>
  );
}
