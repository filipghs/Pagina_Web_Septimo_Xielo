import React, { useEffect, useState } from "react";
import { useApp } from "../../context/AppContext";

export default function RealtimeNotification() {
    const { notification, dismissNotification } = useApp();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (notification) {
            requestAnimationFrame(() => setVisible(true));
        } else {
            setVisible(false);
        }
    }, [notification]);

    if (!notification) return null;

    return (
        <div className={`realtime-notif ${visible ? "realtime-notif-visible" : ""}`}>
            <div className="realtime-notif-icon">🔔</div>
            <div className="realtime-notif-body">
                <p className="realtime-notif-title">Nueva reservación recibida</p>
                <p className="realtime-notif-meta">
                    <strong>{notification.nombre}</strong> · {notification.fecha} a las {notification.hora}
                </p>
            </div>
            <button className="realtime-notif-close" onClick={dismissNotification}>✕</button>
        </div>
    );
}