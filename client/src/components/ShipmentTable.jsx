import { useState } from "react";
import { STATUS_META, TRANSITIONS } from "../utils/constants";

function StatusBadge({ status }) {
  const meta = STATUS_META[status];
  return (
    <span
      className="status-badge"
      style={{ color: meta.color, background: meta.bg }}
    >
      <span className="status-dot" style={{ background: meta.dot }} />
      {status}
    </span>
  );
}

function StatusControl({ shipment, onUpdate }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const next = TRANSITIONS[shipment.status] || [];

  if (!next.length) return <StatusBadge status={shipment.status} />;

  const handle = async (status) => {
    setError("");
    setLoading(true);
    try {
      await onUpdate(shipment.id, status);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="status-control">
      <StatusBadge status={shipment.status} />
      <select
        disabled={loading}
        defaultValue=""
        onChange={(e) => e.target.value && handle(e.target.value)}
        className="status-select"
      >
        <option value="" disabled>Move to…</option>
        {next.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      {error && <span className="inline-error">{error}</span>}
    </div>
  );
}

export function ShipmentTable({ shipments, onUpdate, loading }) {
  if (loading) {
    return <div className="table-state">Loading shipments…</div>;
  }

  if (!shipments.length) {
    return <div className="table-state">No shipments found.</div>;
  }

  return (
    <div className="table-wrap">
      <table className="shipment-table">
        <thead>
          <tr>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Status</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((s) => (
            <tr key={s.id}>
              <td>{s.sender}</td>
              <td>{s.receiver}</td>
              <td>{s.origin}</td>
              <td>{s.destination}</td>
              <td><StatusControl shipment={s} onUpdate={onUpdate} /></td>
              <td className="date-cell">
                {new Date(s.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit", month: "short", year: "numeric",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
