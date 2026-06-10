import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Button, Modal, Toast } from "../ui/UIComponents";

export default function CategoryManager() {
    const { categories, menu, addCategory, editCategory, removeCategory } = useApp();
    const [modalType,   setModalType]   = useState(null);
    const [selected,    setSelected]    = useState(null);
    const [inputNombre, setInputNombre] = useState("");
    const [inputError,  setInputError]  = useState("");
    const [toast,       setToast]       = useState({ visible: false, message: "", type: "success" });

    const showToast = (message, type = "success") => {
        setToast({ visible: true, message, type });
        setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3000);
    };

    const openAdd = () => { setInputNombre(""); setInputError(""); setModalType("add"); };
    const openEdit = (cat) => { setSelected(cat); setInputNombre(cat.nombre); setInputError(""); setModalType("edit"); };
    const openDelete = (cat) => { setSelected(cat); setModalType("delete"); };

    const validate = (nombre) => {
        if (!nombre.trim()) return "El nombre no puede estar vacío";
        if (categories.find((c) => c.nombre.toLowerCase() === nombre.trim().toLowerCase() && c.id !== selected?.id))
            return "Ya existe una categoría con ese nombre";
        return "";
    };

    const handleAdd = async () => {
        const err = validate(inputNombre);
        if (err) { setInputError(err); return; }
        try { await addCategory(inputNombre.trim()); setModalType(null); showToast("Categoría creada"); }
        catch { showToast("Error al crear categoría", "error"); }
    };

    const handleEdit = async () => {
        const err = validate(inputNombre);
        if (err) { setInputError(err); return; }
        try { await editCategory(selected.id, { nombre: inputNombre.trim() }); setModalType(null); showToast("Categoría actualizada"); }
        catch { showToast("Error al actualizar", "error"); }
    };

    const handleDelete = async () => {
        try { await removeCategory(selected.id); setModalType(null); showToast("Categoría eliminada", "error"); }
        catch { showToast("Error al eliminar", "error"); }
    };

    const countByCategory = (nombre) => menu.filter((i) => i.cat === nombre).length;

    return (
        <div className="admin-section">
            <div className="admin-section-header">
                <div>
                    <h2 className="admin-section-title">Categorías del Menú</h2>
                    <p className="admin-section-sub">{categories.length} categorías en total</p>
                </div>
                <Button variant="solid" onClick={openAdd}>+ Nueva categoría</Button>
            </div>

            <div className="cats-grid">
                {categories.map((cat) => (
                    <div key={cat.id} className="cat-card">
                        <div className="cat-card-top">
                            <span className="cat-card-name">{cat.nombre}</span>
                            <span className="cat-card-count">{countByCategory(cat.nombre)} platos</span>
                        </div>
                        <div className="cat-card-actions">
                            <button className="tbl-btn" onClick={() => openEdit(cat)} title="Editar">✏️</button>
                            <button
                                className="tbl-btn"
                                onClick={() => openDelete(cat)}
                                title="Eliminar"
                                disabled={countByCategory(cat.nombre) > 0}
                                style={{ opacity: countByCategory(cat.nombre) > 0 ? 0.3 : 0.6 }}
                            >🗑</button>
                        </div>
                    </div>
                ))}
            </div>

            <Modal isOpen={modalType === "add"} onClose={() => setModalType(null)} title="Nueva categoría">
                <div className="admin-form">
                    <div className="admin-field">
                        <label className="admin-label">Nombre de la categoría</label>
                        <input className={`admin-input ${inputError ? "admin-input-error" : ""}`} value={inputNombre}
                               onChange={(e) => { setInputNombre(e.target.value); setInputError(""); }} placeholder="Ej: Bebidas, Especialidades..." autoFocus />
                        {inputError && <span className="admin-error">{inputError}</span>}
                    </div>
                    <div className="admin-form-actions">
                        <Button variant="ghost" onClick={() => setModalType(null)}>Cancelar</Button>
                        <Button variant="solid" onClick={handleAdd}>Crear categoría</Button>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={modalType === "edit"} onClose={() => setModalType(null)} title="Editar categoría">
                <div className="admin-form">
                    <div className="admin-field">
                        <label className="admin-label">Nombre de la categoría</label>
                        <input className={`admin-input ${inputError ? "admin-input-error" : ""}`} value={inputNombre}
                               onChange={(e) => { setInputNombre(e.target.value); setInputError(""); }} autoFocus />
                        {inputError && <span className="admin-error">{inputError}</span>}
                    </div>
                    <div className="admin-form-actions">
                        <Button variant="ghost" onClick={() => setModalType(null)}>Cancelar</Button>
                        <Button variant="solid" onClick={handleEdit}>Guardar cambios</Button>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={modalType === "delete"} onClose={() => setModalType(null)} title="Eliminar categoría">
                <div className="delete-confirm">
                    <p>¿Eliminar la categoría <strong>{selected?.nombre}</strong>?</p>
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