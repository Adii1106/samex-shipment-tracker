import { useState } from "react";
import { api } from "../utils/api";

export function LoginPage({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { token } = await api.login(form.username, form.password);
      localStorage.setItem("samex_token", token);
      onLogin();
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="login-logo">
          <span className="logo-mark">S</span>
          <div>
            <div className="logo-title">SAMEX</div>
            <div className="logo-sub">DELIVERY</div>
          </div>
        </div>
        <h2 className="login-heading">Sign in to continue</h2>
        <p className="login-hint">Use <code>admin</code> / <code>samex123</code></p>
        <form onSubmit={handleSubmit} className="login-form">
          <label>Username
            <input
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              placeholder="admin"
              required
            />
          </label>
          <label>Password
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              required
            />
          </label>
          {error && <p className="form-error">{error}</p>}
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Signing in…" : "Sign In →"}
          </button>
        </form>
      </div>
    </div>
  );
}
