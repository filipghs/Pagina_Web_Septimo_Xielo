import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../lib/authService";

/**
 * LoginPage — Principio S: solo gestiona el formulario de autenticación.
 */
export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm]       = useState({ username: "", password: "" });
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  const set = (field) => (e) =>
    setForm((p) => ({ ...p, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Pequeño delay para UX (simula verificación)
    setTimeout(() => {
      const result = authService.login(form.username, form.password);
      if (result.ok) {
        navigate("/admin", { replace: true });
      } else {
        setError(result.error);
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="login-page">
      <div className="login-box">
        {/* Logo / Brand */}
        <div className="login-brand">
          <h1 className="login-logo">Séptimo Xielo</h1>
          <p className="login-subtitle">Panel de Administración</p>
        </div>

        <div className="login-divider" />

        {/* Formulario */}
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className="login-field">
            <label className="login-label">Usuario</label>
            <input
              type="text"
              className="login-input"
              value={form.username}
              onChange={set("username")}
              placeholder="admin"
              autoComplete="username"
              autoFocus
            />
          </div>

          <div className="login-field">
            <label className="login-label">Contraseña</label>
            <input
              type="password"
              className="login-input"
              value={form.password}
              onChange={set("password")}
              placeholder="••••••••••••"
              autoComplete="current-password"
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button
            type="submit"
            className={`login-btn ${loading ? "login-btn-loading" : ""}`}
            disabled={loading}
          >
            {loading ? "Verificando…" : "Ingresar"}
          </button>
        </form>

        <a href="/" className="login-back">← Volver al sitio</a>
      </div>

      {/* Background */}
      <div className="login-bg" />
    </div>
  );
}
