import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { CATEGORIES } from "../../data/initialData";
import { Button, Modal, Toast } from "../ui/UIComponents";

function MenuItemForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial ?? { nombre:"", precio:"", cat:"Entradas", desc:"", disponible:true });
  const [errors, setErrors] = useState({});

  const set = (field) => (e) => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((p) => ({ ...p, [field]: val }));
  };

  const validate = () => {
    const errs = {};
    if (!form.nombre.trim()) errs.nombre = "Nombre requerido";
    const p = Number(form.precio);
    if (!form.precio || isNaN(p) || p <= 0) errs.precio = "Precio válido requerido";
    if (!form.desc.trim()) errs.desc = "Descripción requerida";
    return errs;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    onSave({ ...form, precio: Number(form.precio) });
  };

  const CATS = CATEGORIES.filter((c) => c !== "Todos");

  return (
    <div className="admin-form">
      <div className="admin-form-row">
        <div className="admin-field">
          <label className="admin-label">Nombre del plato *</label>
          <input className={`admin-input ${errors.nombre?"admin-input-error":""}`} value={form.nombre} onChange={set("nombre")} placeholder="Ej: Ceviche de chicharrón" />
          {errors.nombre && <span className="admin-error">{errors.nombre}</span>}
        </div>
        <div className="admin-field">
          <label className="admin-label">Precio (COP) *</label>
          <input className={`admin-input ${errors.precio?"admin-input-error":""}`} type="number" value={form.precio} onChange={set("precio")} placeholder="Ej: 24000" min="0" />
          {errors.precio && <span className="admin-error">{errors.precio}</span>}
        </div>
      </div>
      <div className="admin-form-row">
        <div className="admin-field">
          <label className="admin-label">Categoría</label>
          <select className="admin-input" value={form.cat} onChange={set("cat")}>
            {CATS.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="admin-field admin-field-check">
          <label className="admin-check-label">
            <input type="checkbox" checked={form.disponible} onChange={set("disponible")} className="admin-check" />
            Disponible en el menú
          </label>
        </div>
      </div>
      <div className="admin-field">
        <label className="admin-label">Descripción *</label>
        <textarea className={`admin-input admin-textarea ${errors.desc?"admin-input-error":""}`} value={form.desc} onChange={set("desc")} placeholder="Descripción del plato..." rows={3} />
        {errors.desc && <span className="admin-error">{errors.desc}</span>}
      </div>
      <div className="admin-form-actions">
        <Button variant="ghost" onClick={onCancel}>Cancelar</Button>
        <Button variant="solid" onClick={handleSubmit}>{initial ? "Guardar cambios" : "Agregar plato"}</Button>
      </div>
    </div>
  );
}

export default function MenuManager() {
  const { menu, addMenuItem, editMenuItem, removeMenuItem, toggleItem } = useApp();
  const [modalType,     setModalType]     = useState(null);
  const [selectedItem,  setSelectedItem]  = useState(null);
  const [toast,         setToast]         = useState({ visible:false, message:"", type:"success" });
  const [filterCat,     setFilterCat]     = useState("Todos");
  const [saving,        setSaving]        = useState(false);

  const showToast = (message, type = "success") => {
    setToast({ visible:true, message, type });
    setTimeout(() => setToast((t) => ({ ...t, visible:false })), 3000);
  };

  const fmt = (n) => new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",minimumFractionDigits:0}).format(n);

  const handleAdd = async (data) => {
    setSaving(true);
    try { await addMenuItem(data); setModalType(null); showToast("Plato agregado"); }
    catch { showToast("Error al agregar plato","error"); }
    finally { setSaving(false); }
  };

  const handleEdit = async (data) => {
    setSaving(true);
    try { await editMenuItem(selectedItem.id, data); setModalType(null); showToast("Plato actualizado"); }
    catch { showToast("Error al actualizar","error"); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    try { await removeMenuItem(selectedItem.id); setModalType(null); showToast("Plato eliminado","error"); }
    catch { showToast("Error al eliminar","error"); }
  };

  const handleToggle = async (item) => {
    try { await toggleItem(item.id, item.disponible); showToast(item.disponible?"Plato desactivado":"Plato activado"); }
    catch { showToast("Error al cambiar estado","error"); }
  };

  const filtered = filterCat === "Todos" ? menu : menu.filter((i) => i.cat === filterCat);
  const CATS = CATEGORIES.filter((c) => c !== "Todos");

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <div>
          <h2 className="admin-section-title">Gestión del Menú</h2>
          <p className="admin-section-sub">{menu.length} platos en total</p>
        </div>
        <Button variant="solid" onClick={() => setModalType("add")}>+ Agregar plato</Button>
      </div>

      <div className="admin-filters">
        <button className={`admin-filter-btn ${filterCat==="Todos"?"active":""}`} onClick={() => setFilterCat("Todos")}>Todos</button>
        {CATS.map((c) => (
          <button key={c} className={`admin-filter-btn ${filterCat===c?"active":""}`} onClick={() => setFilterCat(c)}>{c}</button>
        ))}
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>Plato</th><th>Categoría</th><th>Precio</th><th>Estado</th><th>Acciones</th></tr></thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className={!item.disponible?"row-inactive":""}>
                <td><p className="table-name">{item.nombre}</p><p className="table-desc">{item.desc}</p></td>
                <td><span className="cat-tag">{item.cat}</span></td>
                <td className="table-price">{fmt(item.precio)}</td>
                <td><span className={`avail-badge ${item.disponible?"avail-yes":"avail-no"}`}>{item.disponible?"Disponible":"Inactivo"}</span></td>
                <td>
                  <div className="table-actions">
                    <button className="tbl-btn" onClick={() => handleToggle(item)} title={item.disponible?"Desactivar":"Activar"}>{item.disponible?"⏸":"▶"}</button>
                    <button className="tbl-btn" onClick={() => { setSelectedItem(item); setModalType("edit"); }} title="Editar">✏️</button>
                    <button className="tbl-btn" onClick={() => { setSelectedItem(item); setModalType("delete"); }} title="Eliminar">🗑</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="admin-empty">No hay platos en esta categoría.</p>}
      </div>

      <Modal isOpen={modalType==="add"} onClose={() => setModalType(null)} title="Agregar nuevo plato">
        <MenuItemForm onSave={handleAdd} onCancel={() => setModalType(null)} />
      </Modal>
      <Modal isOpen={modalType==="edit"} onClose={() => setModalType(null)} title="Editar plato">
        {selectedItem && <MenuItemForm initial={selectedItem} onSave={handleEdit} onCancel={() => setModalType(null)} />}
      </Modal>
      <Modal isOpen={modalType==="delete"} onClose={() => setModalType(null)} title="Eliminar plato">
        <div className="delete-confirm">
          <p>¿Eliminar <strong>{selectedItem?.nombre}</strong>?</p>
          <p className="delete-warn">Esta acción no se puede deshacer.</p>
          <div className="admin-form-actions">
            <Button variant="ghost" onClick={() => setModalType(null)}>Cancelar</Button>
            <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
          </div>
        </div>
      </Modal>

      <Toast message={toast.message} type={toast.type} visible={toast.visible} />
    </div>
  );
}
