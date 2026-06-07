import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import PublicPage   from "./pages/PublicPage";
import AdminPage    from "./pages/AdminPage";
import LoginPage    from "./pages/LoginPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/"      element={<PublicPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          } />
          <Route path="*" element={<PublicPage />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
