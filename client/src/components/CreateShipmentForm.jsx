import { useState } from "react";

const EMPTY = { sender: "", receiver: "", origin: "", destination: "" };

export function CreateShipmentForm({ onCreate }) {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await onCreate(form);
      setForm(EMPTY);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const field = (key, label, placeholder) => (
    <label key={key}>
      {label}
      <input
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        placeholder={placeholder}
        required
      />
    </label>
  );

  return (
    <form className="create-form" onSubmit={handleSubmit}>
      <h2 className="form-title">New Shipment</h2>
      <div className="form-grid">
        {field("sender", "Sender", "Full name")}
        {field("receiver", "Receiver", "Full name")}
        {field("origin", "Origin", "City")}
        {field("destination", "Destination", "City")}
      </div>
      {error && <p className="form-error">{error}</p>}
      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? "Creating…" : "Create Shipment"}
      </button>
    </form>
  );
}
