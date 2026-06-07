import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Button, StatusBadge, Modal, Toast } from "../ui/UIComponents";

const STATUS_OPTIONS = ["pendiente","confirmada","cancelada"];

function ReservationDetail({ res, onStatusChange, onDelete, onClose }) {
  const fmt = (iso) => { try { return new Date(iso).toLocaleString("es-CO",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"}); } catch { return iso; } };
  return (
    <div className="res-detail">
      <div className="res-detail-grid">
        <div><p className="rd-label">Cliente</p><p className="rd-value">{res.nombre}</p></div>
        <div><p className="rd-label">Contacto</p><p className="rd-value">{res.email}</p><p className="rd-value">{res.telefono}</p></div>
        <div><p className="rd-label">Fecha y hora</p><p className="rd-value">{res.fecha} · {res.hora}</p></div>
        <div><p className="rd-label">Personas</p><p className="rd-value">{res.personas} persona{res.personas>1?"s":""}</p></div>
        {res.ocasion && <div><p className="rd-label">Ocasión</p><p className="rd-value">{res.ocasion}</p></div>}
        {res.notas   && <div className="rd-full"><p className="rd-label">Notas</p><p className="rd-value">{res.notas}</p></div>}
        <div><p className="rd-label">Recibida</p><p className="rd-value">{fmt(res.created_at)}</p></div>
      </div>
      <div className="rd-status-section">
        <p className="rd-label">Cambiar estado</p>
        <div className="rd-status-btns">
          {STATUS_OPTIONS.map((s) => (
            <button key={s} onClick={() => onStatusChange(s)} className={`rd-status-btn rd-status-${s} ${res.status===s?"rd-status-active":""}`}>
              {s.charAt(0).toUpperCase()+s.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="admin-form-actions">
        <Button variant="danger" size="sm" onClick={onDelete}>Eliminar reserva</Button>
        <Button variant="ghost" onClick={onClose}>Cerrar</Button>
      </div>
    </div>
  );
}

export default function ReservationsManager() {
  const { reservations, changeReservationStatus, removeReservation } = useApp();
  const [filter,   setFilter]   = useState("todas");
  const [selected, setSelected] = useState(null);
  const [toast,    setToast]    = useState({ visible:false, message:"", type:"success" });

  const showToast = (message, type="success") => {
    setToast({ visible:true, message, type });
    setTimeout(() => setToast((t) => ({ ...t, visible:false })), 3000);
  };

  const handleStatusChange = async (status) => {
    try { await changeReservationStatus(selected.id, status); setSelected((p) => ({ ...p, status })); showToast(`Marcada como "${status}"`); }
    catch { showToast("Error al cambiar estado","error"); }
  };

  const handleDelete = async () => {
    try { await removeReservation(selected.id); setSelected(null); showToast("Reserva eliminada","error"); }
    catch { showToast("Error al eliminar","error"); }
  };

  const filtered = filter==="todas" ? reservations : reservations.filter((r) => r.status===filter);
  const counts = {
    todas:     reservations.length,
    pendiente: reservations.filter((r) => r.status==="pendiente").length,
    confirmada:reservations.filter((r) => r.status==="confirmada").length,
    cancelada: reservations.filter((r) => r.status==="cancelada").length,
  };
  const fmtDate = (iso) => { try { const [y,m,d]=iso.split("-"); return `${d}/${m}/${y}`; } catch { return iso; } };

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <div>
          <h2 className="admin-section-title">Reservaciones</h2>
          <p className="admin-section-sub">{counts.pendiente} pendientes de confirmar</p>
        </div>
      </div>

      <div className="res-stats">
        {[{key:"todas",label:"Total",color:"stat-all"},{key:"pendiente",label:"Pendientes",color:"stat-pending"},{key:"confirmada",label:"Confirmadas",color:"stat-confirmed"},{key:"cancelada",label:"Canceladas",color:"stat-cancelled"}].map(({key,label,color}) => (
          <button key={key} className={`stat-card ${color} ${filter===key?"stat-active":""}`} onClick={() => setFilter(key)}>
            <span className="stat-num">{counts[key]}</span>
            <span className="stat-label">{label}</span>
          </button>
        ))}
      </div>

      {filtered.length===0 ? (
        <div className="admin-empty-box"><p className="admin-empty">{filter==="todas"?"Aún no hay reservaciones.":`No hay reservaciones "${filter}".`}</p></div>
      ) : (
        <div className="res-list">
          {filtered.map((res) => (
            <div key={res.id} className={`res-card ${res.status}`} onClick={() => setSelected(res)}>
              <div className="res-card-main">
                <div>
                  <p className="res-card-name">{res.nombre}</p>
                  <p className="res-card-meta">{fmtDate(res.fecha)} · {res.hora} · {res.personas} persona{res.personas>1?"s":""}</p>
                  {res.ocasion && <p className="res-card-ocasion">{res.ocasion}</p>}
                </div>
                <StatusBadge status={res.status} />
              </div>
              <p className="res-card-contact">{res.email} · {res.telefono}</p>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={`Reserva de ${selected?.nombre}`}>
        {selected && <ReservationDetail res={selected} onStatusChange={handleStatusChange} onDelete={handleDelete} onClose={() => setSelected(null)} />}
      </Modal>
      <Toast message={toast.message} type={toast.type} visible={toast.visible} />
    </div>
  );
}
