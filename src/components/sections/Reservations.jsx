import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Divider, SectionLabel, Toast } from "../ui/UIComponents";

function validateForm(data) {
  const errors = {};
  if (!data.nombre.trim()) errors.nombre = "El nombre es requerido";
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Ingresa un email válido";
  if (!data.telefono.trim()) errors.telefono = "El teléfono es requerido";
  if (!data.fecha) errors.fecha = "Selecciona una fecha";
  else {
    const sel = new Date(data.fecha + "T00:00");
    const today = new Date(); today.setHours(0,0,0,0);
    if (sel < today) errors.fecha = "La fecha no puede ser en el pasado";
  }
  if (!data.hora) errors.hora = "Selecciona una hora";
  if (!data.personas || data.personas < 1 || data.personas > 20)
    errors.personas = "Entre 1 y 20 personas";
  return errors;
}

function Field({ label, error, children }) {
  return (
    <div className="field">
      <label className="field-label">{label}</label>
      {children}
      {error && <span className="field-error">{error}</span>}
    </div>
  );
}

const HORARIOS = [
  "12:00","12:30","13:00","13:30","14:00","14:30",
  "19:00","19:30","20:00","20:30","21:00","21:30","22:00","22:30",
];

const INITIAL_FORM = {
  nombre:"", email:"", telefono:"", fecha:"", hora:"",
  personas:2, ocasion:"", notas:"",
};

export default function Reservations() {
  const { addReservation } = useApp();
  const [form,       setForm]       = useState(INITIAL_FORM);
  const [errors,     setErrors]     = useState({});
  const [toast,      setToast]      = useState({ visible:false, message:"", type:"success" });
  const [submitting, setSubmitting] = useState(false);

  const set = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }));

  const showToast = (message, type = "success") => {
    setToast({ visible:true, message, type });
    setTimeout(() => setToast((t) => ({ ...t, visible:false })), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateForm(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setSubmitting(true);
    try {
      await addReservation({ ...form, personas: Number(form.personas) });
      setForm(INITIAL_FORM);
      showToast("¡Reserva recibida! Te confirmaremos pronto por email.");
    } catch {
      showToast("Error al enviar la reserva. Intenta de nuevo.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <section id="reservaciones" className="section">
      <div className="container">
        <SectionLabel>Asegura tu lugar</SectionLabel>
        <h2 className="section-title">Reservaciones</h2>
        <Divider />
        <div className="reservation-layout">
          <div className="reservation-info">
            <div className="res-info-card">
              <h3 className="res-info-title">Una experiencia que trasciende los sentidos</h3>
              <p className="res-info-text">Reserva tu mesa con anticipación y garantiza tu acceso al rooftop más exclusivo de Bogotá.</p>
              <div className="res-details">
                <div className="res-detail-row">
                  <span className="res-detail-icon">🕐</span>
                  <div><p className="res-detail-label">Horario de reservas</p><p className="res-detail-value">Mar – Dom · 12:00 – 22:30</p></div>
                </div>
                <div className="res-detail-row">
                  <span className="res-detail-icon">👥</span>
                  <div><p className="res-detail-label">Grupos privados</p><p className="res-detail-value">Hasta 20 personas · Eventos especiales</p></div>
                </div>
                <div className="res-detail-row">
                  <span className="res-detail-icon">✉️</span>
                  <div><p className="res-detail-label">Confirmación</p><p className="res-detail-value">Te contactaremos en menos de 2 horas</p></div>
                </div>
              </div>
            </div>
          </div>

          <form className="reservation-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <Field label="Nombre completo *" error={errors.nombre}>
                <input type="text" className={`form-input ${errors.nombre?"input-error":""}`} value={form.nombre} onChange={set("nombre")} placeholder="Tu nombre" />
              </Field>
              <Field label="Correo electrónico *" error={errors.email}>
                <input type="email" className={`form-input ${errors.email?"input-error":""}`} value={form.email} onChange={set("email")} placeholder="tu@email.com" />
              </Field>
            </div>
            <div className="form-row">
              <Field label="Teléfono *" error={errors.telefono}>
                <input type="tel" className={`form-input ${errors.telefono?"input-error":""}`} value={form.telefono} onChange={set("telefono")} placeholder="+57 300 000 0000" />
              </Field>
              <Field label="N° de personas *" error={errors.personas}>
                <input type="number" className={`form-input ${errors.personas?"input-error":""}`} value={form.personas} onChange={set("personas")} min="1" max="20" />
              </Field>
            </div>
            <div className="form-row">
              <Field label="Fecha *" error={errors.fecha}>
                <input type="date" className={`form-input ${errors.fecha?"input-error":""}`} value={form.fecha} onChange={set("fecha")} min={today} />
              </Field>
              <Field label="Hora *" error={errors.hora}>
                <select className={`form-input ${errors.hora?"input-error":""}`} value={form.hora} onChange={set("hora")}>
                  <option value="">Seleccionar hora</option>
                  {HORARIOS.map((h) => <option key={h} value={h}>{h}</option>)}
                </select>
              </Field>
            </div>
            <Field label="Ocasión especial" error={null}>
              <select className="form-input" value={form.ocasion} onChange={set("ocasion")}>
                <option value="">Ninguna en particular</option>
                <option value="Cumpleaños">Cumpleaños</option>
                <option value="Aniversario">Aniversario</option>
                <option value="Reunión de negocios">Reunión de negocios</option>
                <option value="Celebración">Celebración</option>
                <option value="Otro">Otro</option>
              </select>
            </Field>
            <Field label="Notas adicionales" error={null}>
              <textarea className="form-textarea" value={form.notas} onChange={set("notas")} placeholder="Alergias, solicitudes especiales..." rows={3} />
            </Field>
            <button type="submit" className={`submit-btn ${submitting?"submit-btn-loading":""}`} disabled={submitting}>
              {submitting ? "Enviando reserva…" : "Confirmar reserva"}
            </button>
          </form>
        </div>
      </div>
      <Toast message={toast.message} type={toast.type} visible={toast.visible} />
    </section>
  );
}
