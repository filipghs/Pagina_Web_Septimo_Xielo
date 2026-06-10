import React, { useMemo } from "react";
import { useApp } from "../../context/AppContext";

function StatCard({ icon, label, value, sub, color = "gold" }) {
    return (
        <div className={`dash-stat-card dash-stat-${color}`}>
            <div className="dash-stat-icon">{icon}</div>
            <div className="dash-stat-body">
                <p className="dash-stat-value">{value}</p>
                <p className="dash-stat-label">{label}</p>
                {sub && <p className="dash-stat-sub">{sub}</p>}
            </div>
        </div>
    );
}

function ProgressBar({ label, value, max, color }) {
    const pct = max > 0 ? Math.round((value / max) * 100) : 0;
    return (
        <div className="dash-progress-row">
            <div className="dash-progress-top">
                <span className="dash-progress-label">{label}</span>
                <span className="dash-progress-pct">{value} platos</span>
            </div>
            <div className="dash-progress-track">
                <div className="dash-progress-fill" style={{ width: `${pct}%`, background: color }} />
            </div>
        </div>
    );
}

function UpcomingReservations({ reservations }) {
    const today = new Date().toISOString().split("T")[0];
    const upcoming = reservations
        .filter((r) => r.fecha >= today && r.status !== "cancelada")
        .sort((a, b) => {
            if (a.fecha !== b.fecha) return a.fecha.localeCompare(b.fecha);
            return a.hora.localeCompare(b.hora);
        })
        .slice(0, 5);

    const fmtDate = (iso) => {
        try {
            const [y, m, d] = iso.split("-");
            const months = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
            return `${d} ${months[parseInt(m) - 1]}`;
        } catch { return iso; }
    };

    return (
        <div className="dash-card">
            <h3 className="dash-card-title">Próximas reservaciones</h3>
            {upcoming.length === 0 ? (
                <p className="dash-empty">No hay reservaciones próximas</p>
            ) : (
                <div className="dash-upcoming-list">
                    {upcoming.map((r) => (
                        <div key={r.id} className="dash-upcoming-row">
                            <div className="dash-upcoming-date">
                                <span className="dash-upcoming-day">{fmtDate(r.fecha)}</span>
                                <span className="dash-upcoming-hora">{r.hora}</span>
                            </div>
                            <div className="dash-upcoming-info">
                                <p className="dash-upcoming-name">{r.nombre}</p>
                                <p className="dash-upcoming-meta">{r.personas} persona{r.personas > 1 ? "s" : ""}{r.ocasion ? ` · ${r.ocasion}` : ""}</p>
                            </div>
                            <span className={`dash-upcoming-status status-${r.status}`}>{r.status}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function RecentActivity({ reservations }) {
    const recent = [...reservations]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 6);

    const fmtRelative = (iso) => {
        try {
            const diff  = Date.now() - new Date(iso).getTime();
            const mins  = Math.floor(diff / 60000);
            const hours = Math.floor(diff / 3600000);
            const days  = Math.floor(diff / 86400000);
            if (mins < 1)   return "Ahora mismo";
            if (mins < 60)  return `Hace ${mins} min`;
            if (hours < 24) return `Hace ${hours}h`;
            return `Hace ${days}d`;
        } catch { return ""; }
    };

    return (
        <div className="dash-card">
            <h3 className="dash-card-title">Actividad reciente</h3>
            {recent.length === 0 ? (
                <p className="dash-empty">Sin actividad reciente</p>
            ) : (
                <div className="dash-activity-list">
                    {recent.map((r) => (
                        <div key={r.id} className="dash-activity-row">
                            <div className="dash-activity-dot" />
                            <div className="dash-activity-body">
                                <p className="dash-activity-text">
                                    Nueva reserva de <strong>{r.nombre}</strong> para el {r.fecha} a las {r.hora}
                                </p>
                                <p className="dash-activity-time">{fmtRelative(r.created_at)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function Dashboard() {
    const { menu, reservations, categories } = useApp();

    const stats = useMemo(() => {
        const today     = new Date().toISOString().split("T")[0];
        const thisMonth = today.slice(0, 7);

        const totalRes        = reservations.length;
        const pendientes      = reservations.filter((r) => r.status === "pendiente").length;
        const confirmadas     = reservations.filter((r) => r.status === "confirmada").length;
        const canceladas      = reservations.filter((r) => r.status === "cancelada").length;
        const esteMes         = reservations.filter((r) => r.fecha?.startsWith(thisMonth)).length;
        const hoy             = reservations.filter((r) => r.fecha === today && r.status !== "cancelada").length;
        const platosActivos   = menu.filter((i) => i.disponible).length;
        const platosInactivos = menu.filter((i) => !i.disponible).length;

        const precioPromedio = menu.length > 0
            ? Math.round(menu.reduce((acc, i) => acc + i.precio, 0) / menu.length)
            : 0;
        const personasConfirmadas = reservations
            .filter((r) => r.status === "confirmada")
            .reduce((acc, r) => acc + (r.personas || 0), 0);
        const ingresosEstimados = precioPromedio * personasConfirmadas;

        const porCategoria = categories.map((c) => ({
            nombre: c.nombre,
            count:  menu.filter((i) => i.cat === c.nombre).length,
        })).sort((a, b) => b.count - a.count);

        const maxCat = Math.max(...porCategoria.map((c) => c.count), 1);

        return {
            totalRes, pendientes, confirmadas, canceladas,
            esteMes, hoy, platosActivos, platosInactivos,
            ingresosEstimados, precioPromedio, personasConfirmadas,
            porCategoria, maxCat,
        };
    }, [menu, reservations, categories]);

    const fmt = (n) => new Intl.NumberFormat("es-CO", {
        style: "currency", currency: "COP", minimumFractionDigits: 0,
    }).format(n);

    const catColors = ["#c8a97e","#8ba4c8","#8bc8a4","#c88ba4","#c8c88b","#a48bc8"];

    return (
        <div className="admin-section">
            <div className="admin-section-header">
                <div>
                    <h2 className="admin-section-title">Dashboard</h2>
                    <p className="admin-section-sub">Resumen general del restaurante</p>
                </div>
            </div>

            <div className="dash-stats-grid">
                <StatCard icon="📅" label="Reservaciones totales"   value={stats.totalRes}             sub={`${stats.esteMes} este mes`}           color="gold"   />
                <StatCard icon="⏳" label="Pendientes de confirmar" value={stats.pendientes}           sub={`${stats.hoy} reservas hoy`}            color="yellow" />
                <StatCard icon="✅" label="Confirmadas"             value={stats.confirmadas}          sub={`${stats.canceladas} canceladas`}       color="green"  />
                <StatCard icon="🍽️" label="Platos activos"          value={stats.platosActivos}        sub={`${stats.platosInactivos} inactivos`}   color="blue"   />
                <StatCard icon="👥" label="Personas confirmadas"    value={stats.personasConfirmadas}  sub="total acumulado"                        color="purple" />
                <StatCard icon="💰" label="Ingresos estimados"      value={fmt(stats.ingresosEstimados)} sub={`Precio prom. ${fmt(stats.precioPromedio)}`} color="gold" />
            </div>

            <div className="dash-mid-grid">
                <div className="dash-card">
                    <h3 className="dash-card-title">Platos por categoría</h3>
                    {stats.porCategoria.length === 0 ? (
                        <p className="dash-empty">Sin datos</p>
                    ) : (
                        <div className="dash-progress-list">
                            {stats.porCategoria.map((c, i) => (
                                <ProgressBar key={c.nombre} label={c.nombre} value={c.count} max={stats.maxCat} color={catColors[i % catColors.length]} />
                            ))}
                        </div>
                    )}
                </div>

                <div className="dash-card">
                    <h3 className="dash-card-title">Estado de reservaciones</h3>
                    <div className="dash-donut-legend">
                        {[
                            { label: "Pendientes",  value: stats.pendientes,  color: "#c8a032" },
                            { label: "Confirmadas", value: stats.confirmadas, color: "#6dba8a" },
                            { label: "Canceladas",  value: stats.canceladas,  color: "#e07070" },
                        ].map((item) => (
                            <div key={item.label} className="dash-legend-row">
                                <div className="dash-legend-dot" style={{ background: item.color }} />
                                <span className="dash-legend-label">{item.label}</span>
                                <span className="dash-legend-value">{item.value}</span>
                                <div className="dash-legend-bar-track">
                                    <div className="dash-legend-bar-fill" style={{
                                        width: stats.totalRes > 0 ? `${Math.round((item.value / stats.totalRes) * 100)}%` : "0%",
                                        background: item.color
                                    }} />
                                </div>
                                <span className="dash-legend-pct">
                  {stats.totalRes > 0 ? Math.round((item.value / stats.totalRes) * 100) : 0}%
                </span>
                            </div>
                        ))}
                    </div>
                    {stats.totalRes === 0 && <p className="dash-empty">Sin reservaciones aún</p>}
                </div>
            </div>

            <div className="dash-bottom-grid">
                <UpcomingReservations reservations={reservations} />
                <RecentActivity reservations={reservations} />
            </div>
        </div>
    );
}