import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../lib/authService";
import { Button, Toast } from "../ui/UIComponents";

export default function SettingsManager() {
    const navigate = useNavigate();
    const currentCreds = authService.getCredentials();

    const [form, setForm] = useState({
        username:        currentCreds.username,
        currentPassword: "",
        newPassword:     "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    const [toast,  setToast]  = useState({ visible: false, message: "", type: "success" });

    const showToast = (message, type = "success") => {
        setToast({ visible: true, message, type });
        setTimeout(() => setToast((t) => ({ ...t, visible: false })), 4000);
    };

    const set = (field) => (e) =>
        setForm((p) => ({ ...p, [field]: e.target.value }));

    const validate = () => {
        const errs = {};
        const creds = authService.getCredentials();

        if (!form.username.trim())
            errs.username = "El usuario no puede estar vacío";

        if (!form.currentPassword)
            errs.currentPassword = "Debes ingresar tu contraseña actual para confirmar";
        else if (form.currentPassword !== creds.password)
            errs.currentPassword = "La contraseña actual es incorrecta";

        if (form.newPassword && form.newPassword.length < 6)
            errs.newPassword = "La nueva contraseña debe tener al menos 6 caracteres";

        if (form.newPassword && form.newPassword !== form.confirmPassword)
            errs.confirmPassword = "Las contraseñas no coinciden";

        return errs;
    };

    const handleSave = () => {
        const errs = validate();
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }
        setErrors({});

        const newPassword = form.newPassword || authService.getCredentials().password;
        authService.updateCredentials(form.username.trim(), newPassword);

        showToast("Credenciales actualizadas. Inicia sesión de nuevo.");

        setTimeout(() => {
            authService.logout();
            navigate("/login", { replace: true });
        }, 2000);
    };

    return (
        <div className="admin-section">
            <div className="admin-section-header">
                <div>
                    <h2 className="admin-section-title">Configuración de acceso</h2>
                    <p className="admin-section-sub">Cambia tu usuario y contraseña de administrador</p>
                </div>
            </div>

            <div className="settings-grid">
                <div className="settings-card">
                    <h3 className="contact-mgr-subtitle">Cambiar usuario</h3>
                    <div className="admin-field">
                        <label className="admin-label">Nuevo nombre de usuario</label>
                        <input
                            className={`admin-input ${errors.username ? "admin-input-error" : ""}`}
                            value={form.username}
                            onChange={set("username")}
                            placeholder="Ej: admin"
                            autoComplete="off"
                        />
                        {errors.username && <span className="admin-error">{errors.username}</span>}
                    </div>
                </div>

                <div className="settings-card">
                    <h3 className="contact-mgr-subtitle">Cambiar contraseña</h3>
                    <div className="admin-field">
                        <label className="admin-label">Nueva contraseña (dejar vacío para no cambiar)</label>
                        <input
                            type="password"
                            className={`admin-input ${errors.newPassword ? "admin-input-error" : ""}`}
                            value={form.newPassword}
                            onChange={set("newPassword")}
                            placeholder="Mínimo 6 caracteres"
                            autoComplete="new-password"
                        />
                        {errors.newPassword && <span className="admin-error">{errors.newPassword}</span>}
                    </div>
                    <div className="admin-field">
                        <label className="admin-label">Confirmar nueva contraseña</label>
                        <input
                            type="password"
                            className={`admin-input ${errors.confirmPassword ? "admin-input-error" : ""}`}
                            value={form.confirmPassword}
                            onChange={set("confirmPassword")}
                            placeholder="Repite la nueva contraseña"
                            autoComplete="new-password"
                        />
                        {errors.confirmPassword && <span className="admin-error">{errors.confirmPassword}</span>}
                    </div>
                </div>

                <div className="settings-card settings-card-full">
                    <h3 className="contact-mgr-subtitle">Confirmar cambios</h3>
                    <p className="admin-section-sub" style={{ marginBottom: "1rem" }}>
                        Para aplicar cualquier cambio debes ingresar tu contraseña actual.
                    </p>
                    <div className="admin-field">
                        <label className="admin-label">Contraseña actual *</label>
                        <input
                            type="password"
                            className={`admin-input ${errors.currentPassword ? "admin-input-error" : ""}`}
                            value={form.currentPassword}
                            onChange={set("currentPassword")}
                            placeholder="Ingresa tu contraseña actual"
                            autoComplete="current-password"
                        />
                        {errors.currentPassword && <span className="admin-error">{errors.currentPassword}</span>}
                    </div>
                    <div className="admin-form-actions" style={{ marginTop: "1rem" }}>
                        <Button variant="solid" onClick={handleSave}>Guardar cambios</Button>
                    </div>
                </div>

                <div className="settings-info-box">
                    <p className="settings-info-title">⚠️ Importante</p>
                    <p className="settings-info-text">
                        Al guardar los cambios tu sesión se cerrará automáticamente y deberás iniciar sesión con las nuevas credenciales.
                    </p>
                    <p className="settings-info-text" style={{ marginTop: "0.5rem" }}>
                        Las credenciales por defecto son: usuario <strong>admin</strong> / contraseña <strong>septimoxielo2026</strong>. Si las olvidas, borra el almacenamiento local del navegador para restablecerlas.
                    </p>
                </div>
            </div>

            <Toast message={toast.message} type={toast.type} visible={toast.visible} />
        </div>
    );
}