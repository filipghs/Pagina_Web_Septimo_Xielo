import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { authService } from "../../lib/authService";
import MenuManager from "./MenuManager";
import ReservationsManager from "./ReservationsManager";
import ContactManager from "./ContactManager";
import SettingsManager from "./SettingsManager";
import CategoryManager from "./CategoryManager";
import RealtimeNotification from "./RealtimeNotification";

const TABS = [
  { id: "reservaciones", label: "Reservaciones", icon: "📅" },
  { id: "menu",          label: "Menú",          icon: "🍽️" },
  { id: "categorias",    label: "Categorías",    icon: "🏷️" },
  { id: "contacto",      label: "Contacto",      icon: "📞" },
  { id: "configuracion", label: "Configuración", icon: "⚙️" },
];

export default function AdminLayout() {
  const { reservations } = useApp();
  const navigate = useNavigate();
  const [activeTab,   setActiveTab]   = useState("reservaciones");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pendingCount = reservations.filter((r) => r.status === "pendiente").length;

  const handleLogout = () => {
    authService.logout();
    navigate("/login", { replace: true });
  };

  const renderTab = () => {
    switch (activeTab) {
      case "menu":          return <MenuManager />;
      case "categorias":    return <CategoryManager />;
      case "contacto":      return <ContactManager />;
      case "configuracion": return <SettingsManager />;
      default:              return <ReservationsManager />;
    }
  };

  return (
      <div className="admin-layout">
        <aside className={`admin-sidebar ${sidebarOpen ? "admin-sidebar-open" : ""}`}>
          <div className="admin-brand">
            <span className="admin-brand-name">Séptimo Xielo</span>
            <span className="admin-brand-sub">Panel de Administración</span>
          </div>
          <nav className="admin-nav">
            {TABS.map((tab) => (
                <button key={tab.id} onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                        className={`admin-nav-btn ${activeTab === tab.id ? "admin-nav-btn-active" : ""}`}>
                  <span className="admin-nav-icon">{tab.icon}</span>
                  <span>{tab.label}</span>
                  {tab.id === "reservaciones" && pendingCount > 0 && (
                      <span className="admin-badge">{pendingCount}</span>
                  )}
                </button>
            ))}
          </nav>
          <div className="admin-sidebar-footer">
            <a href="/" className="admin-back-link">← Ver sitio público</a>
            <button className="admin-logout-btn" onClick={handleLogout}>Cerrar sesión</button>
          </div>
        </aside>

        <div className="admin-main">
          <div className="admin-topbar">
            <button className="admin-hamburger" onClick={() => setSidebarOpen((p) => !p)}>☰</button>
            <span className="admin-topbar-title">{TABS.find((t) => t.id === activeTab)?.label}</span>
            <button className="admin-topbar-logout" onClick={handleLogout}>Salir</button>
          </div>
          <div className="admin-content">{renderTab()}</div>
        </div>

        {sidebarOpen && <div className="admin-overlay" onClick={() => setSidebarOpen(false)} />}
        <RealtimeNotification />
      </div>
  );
}