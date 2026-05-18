import { useState, useEffect, useCallback } from "react";
import { LoginPage } from "./components/LoginPage";
import { StatsStrip } from "./components/StatsStrip";
import { FilterBar } from "./components/FilterBar";
import { CreateShipmentForm } from "./components/CreateShipmentForm";
import { ShipmentTable } from "./components/ShipmentTable";
import { useShipments } from "./hooks/useShipments";

const DEFAULT_FILTERS = { status: "", destination: "" };

export default function App() {
  const [authed, setAuthed] = useState(!!localStorage.getItem("samex_token"));
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [showForm, setShowForm] = useState(false);
  const { shipments, loading, error, fetchShipments, createShipment, updateStatus } = useShipments();

  const load = useCallback(() => fetchShipments(filters), [fetchShipments, filters]);

  useEffect(() => {
    if (authed) load();
  }, [authed, load]);

  const handleLogin = () => setAuthed(true);

  const handleLogout = () => {
    localStorage.removeItem("samex_token");
    setAuthed(false);
  };

  const handleCreate = async (data) => {
    await createShipment(data);
    setShowForm(false);
  };

  if (!authed) return <LoginPage onLogin={handleLogin} />;

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="header-logo">
            <span className="logo-mark">S</span>
            <div>
              <div className="logo-title">SAMEX</div>
              <div className="logo-sub">DELIVERY</div>
            </div>
          </div>
          <div className="header-actions">
            <button
              className="btn-outline"
              onClick={() => setShowForm((v) => !v)}
            >
              {showForm ? "✕ Cancel" : "+ New Shipment"}
            </button>
            <button className="btn-ghost" onClick={handleLogout}>
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        <StatsStrip shipments={shipments} />

        {showForm && (
          <CreateShipmentForm onCreate={handleCreate} />
        )}

        <FilterBar filters={filters} onChange={setFilters} />

        {error && <div className="banner-error">⚠ {error}</div>}

        <ShipmentTable
          shipments={shipments}
          onUpdate={updateStatus}
          loading={loading}
        />
      </main>
    </div>
  );
}
