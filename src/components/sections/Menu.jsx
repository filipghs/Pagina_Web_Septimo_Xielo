import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Divider, SectionLabel } from "../ui/UIComponents";

function MenuCard({ item }) {
    const fmt = (n) => new Intl.NumberFormat("es-CO",{ style:"currency", currency:"COP", minimumFractionDigits:0 }).format(n);
    return (
        <div className="menu-card">
            <div className="menu-card-top">
                <span className="menu-card-cat">{item.cat}</span>
                {!item.disponible && <span className="menu-card-unavail">No disponible</span>}
            </div>
            <h3 className="menu-card-name">{item.nombre}</h3>
            <p className="menu-card-desc">{item.desc}</p>
            <div className="menu-card-price">{fmt(item.precio)}</div>
        </div>
    );
}

function CategoryFilter({ categories, active, onChange }) {
    return (
        <div className="category-filters">
            <button className={`cat-btn ${active === "Todos" ? "cat-btn-active" : ""}`} onClick={() => onChange("Todos")}>
                Todos
            </button>
            {categories.map((cat) => (
                <button key={cat.id} className={`cat-btn ${active === cat.nombre ? "cat-btn-active" : ""}`} onClick={() => onChange(cat.nombre)}>
                    {cat.nombre}
                </button>
            ))}
        </div>
    );
}

export default function Menu() {
    const { menu, categories } = useApp();
    const [activeCat, setActiveCat] = useState("Todos");

    const visible = menu.filter(
        (item) => item.disponible && (activeCat === "Todos" || item.cat === activeCat)
    );

    return (
        <section id="menu" className="section section-alt">
            <div className="container">
                <SectionLabel>Lo que ofrecemos</SectionLabel>
                <h2 className="section-title">Nuestra Carta</h2>
                <Divider />

                <a className="pdf-link" href="/menu.pdf" target="_blank" rel="noreferrer">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14,2 14,8 20,8" />
                        <line x1="12" y1="18" x2="12" y2="12" />
                        <polyline points="9,15 12,12 15,15" />
                    </svg>
                    Menú completo en PDF
                </a>

                <CategoryFilter categories={categories} active={activeCat} onChange={setActiveCat} />

                {visible.length === 0 ? (
                    <p className="empty-state">No hay platos en esta categoría por el momento.</p>
                ) : (
                    <div className="menu-grid">
                        {visible.map((item) => (
                            <MenuCard key={item.id} item={item} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}