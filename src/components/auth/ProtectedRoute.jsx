import React from "react";
import { Navigate } from "react-router-dom";
import { authService } from "../../lib/authService";

/**
 * ProtectedRoute — Principio S: solo verifica autenticación y redirige.
 * Envuelve cualquier ruta que requiera login.
 */
export default function ProtectedRoute({ children }) {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
