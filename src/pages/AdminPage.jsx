import React from "react";
import { useApp } from "../context/AppContext";
import AdminLayout from "../components/admin/AdminLayout";

export default function AdminPage() {
  const { loading, error } = useApp();

  if (loading) return (
    <div className="app-loading">
      <span className="app-loading-logo">Séptimo Xielo</span>
      <div className="app-loading-spinner" />
    </div>
  );

  if (error) return (
    <div className="app-loading">
      <span className="app-loading-logo">Séptimo Xielo</span>
      <p className="app-loading-error">{error}</p>
    </div>
  );

  return <AdminLayout />;
}
