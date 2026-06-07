import React, { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { Button, Toast } from "../ui/UIComponents";

export default function ContactManager() {
  const { contact, saveContact } = useApp();
  const [form,  setForm]  = useState(contact);
  const [toast, setToast] = useState({ visible:false, message:"", type:"success" });
  const [saving, setSaving] = useState(false);

  useEffect(() => { setForm(contact); }, [contact]);

  const showToast = (message, type="success") => {
    setToast({ visible:true, message, type });
    setTimeout(() => setToast((t) => ({ ...t, visible:false })), 3000);
  };

  const setField = (path) => (e) => {
    const keys = path.split(".");
    setForm((prev) => {
      const next = { ...prev };
      let node = next;
      for (let i=0; i<keys.length-1; i++) { node[keys[i]] = { ...node[keys[i]] }; node = node[keys[i]]; }
      node[keys[keys.length-1]] = e.target.value;
      return next;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try { await saveContact(form); showToast("Información guardada"); }
    catch { showToast("Error al guardar","error"); }
    finally { setSaving(false); }
  };

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <div>
          <h2 className="admin-section-title">Información de Contacto</h2>
          <p className="admin-section-sub">Datos visibles en el sitio público</p>
        </div>
        <div className="admin-header-actions">
          <Button variant="ghost" size="sm" onClick={() => setForm(contact)}>Descartar</Button>
          <Button variant="solid" onClick={handleSave} disabled={saving}>{saving?"Guardando…":"Guardar cambios"}</Button>
        </div>
      </div>

      <div className="contact-mgr-grid">
        <div className="contact-mgr-card">
          <h3 className="contact-mgr-subtitle">Datos básicos</h3>
          <div className="admin-field"><label className="admin-label">Teléfono</label><input className="admin-input" value={form.telefono} onChange={setField("telefono")} /></div>
          <div className="admin-field"><label className="admin-label">Email de reservas</label><input className="admin-input" value={form.email} onChange={setField("email")} /></div>
          <div className="admin-field"><label className="admin-label">Dirección</label><input className="admin-input" value={form.direccion} onChange={setField("direccion")} /></div>
          <div className="admin-field"><label className="admin-label">Enlace al menú PDF</label><input className="admin-input" value={form.menuPdf} onChange={setField("menuPdf")} /></div>
        </div>

        <div className="contact-mgr-card">
          <h3 className="contact-mgr-subtitle">Horario de atención</h3>
          <div className="admin-field"><label className="admin-label">Días</label><input className="admin-input" value={form.horario.dias} onChange={setField("horario.dias")} /></div>
          <div className="admin-field"><label className="admin-label">Horas</label><input className="admin-input" value={form.horario.horas} onChange={setField("horario.horas")} /></div>
          <div className="admin-field"><label className="admin-label">Nota adicional</label><input className="admin-input" value={form.horario.nota} onChange={setField("horario.nota")} /></div>
        </div>

        <div className="contact-mgr-card contact-mgr-full">
          <h3 className="contact-mgr-subtitle">Redes sociales</h3>
          <div className="socials-mgr-grid">
            <div className="admin-field"><label className="admin-label">Instagram</label><input className="admin-input" value={form.redes.instagram} onChange={setField("redes.instagram")} /></div>
            <div className="admin-field"><label className="admin-label">Facebook</label><input className="admin-input" value={form.redes.facebook} onChange={setField("redes.facebook")} /></div>
            <div className="admin-field"><label className="admin-label">TikTok</label><input className="admin-input" value={form.redes.tiktok} onChange={setField("redes.tiktok")} /></div>
            <div className="admin-field"><label className="admin-label">WhatsApp</label><input className="admin-input" value={form.redes.whatsapp} onChange={setField("redes.whatsapp")} /></div>
          </div>
        </div>
      </div>

      <div className="contact-preview">
        <p className="contact-preview-label">Vista previa</p>
        <div className="contact-preview-box">
          <p>📞 {form.telefono}</p>
          <p>✉️ {form.email}</p>
          <p>📍 {form.direccion}</p>
          <p>🕐 {form.horario.dias} · {form.horario.horas}</p>
          {form.horario.nota && <p className="preview-note">{form.horario.nota}</p>}
        </div>
      </div>

      <Toast message={toast.message} type={toast.type} visible={toast.visible} />
    </div>
  );
}
