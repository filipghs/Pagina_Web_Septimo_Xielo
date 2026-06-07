// ─── Componentes atómicos UI ─────────────────────────────────────────────────
// Principio I: cada componente recibe solo las props que necesita.
// Principio S: cada componente renderiza UN elemento visual.

import React from "react";

// ── Button ────────────────────────────────────────────────────────────────────
export function Button({
  children,
  onClick,
  variant = "outline", // "outline" | "solid" | "ghost" | "danger"
  size = "md",         // "sm" | "md" | "lg"
  type = "button",
  disabled = false,
  fullWidth = false,
  className = "",
}) {
  const base = "btn-base";
  const variants = {
    outline: "btn-outline",
    solid: "btn-solid",
    ghost: "btn-ghost",
    danger: "btn-danger",
  };
  const sizes = { sm: "btn-sm", md: "btn-md", lg: "btn-lg" };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? "btn-full" : ""} ${className}`}
    >
      {children}
    </button>
  );
}

// ── Divider ───────────────────────────────────────────────────────────────────
export function Divider({ className = "" }) {
  return <div className={`divider ${className}`} />;
}

// ── SectionLabel ──────────────────────────────────────────────────────────────
export function SectionLabel({ children }) {
  return <div className="section-label">{children}</div>;
}

// ── Badge de status ───────────────────────────────────────────────────────────
const STATUS_MAP = {
  pendiente: { label: "Pendiente", cls: "badge-pending" },
  confirmada: { label: "Confirmada", cls: "badge-confirmed" },
  cancelada: { label: "Cancelada", cls: "badge-cancelled" },
};

export function StatusBadge({ status }) {
  const config = STATUS_MAP[status] ?? STATUS_MAP.pendiente;
  return <span className={`status-badge ${config.cls}`}>{config.label}</span>;
}

// ── Modal ─────────────────────────────────────────────────────────────────────
export function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

// ── Toast notification ────────────────────────────────────────────────────────
export function Toast({ message, type = "success", visible }) {
  return (
    <div className={`toast toast-${type} ${visible ? "toast-visible" : ""}`}>
      {type === "success" ? "✓" : "✕"} {message}
    </div>
  );
}
