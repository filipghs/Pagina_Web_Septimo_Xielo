// ═══════════════════════════════════════════════════════════════════════════
// Servicio de autenticación
// Principio S: responsabilidad única — gestionar sesión admin.
// Credenciales hardcodeadas para presentación.
// En producción real esto iría en el backend con hash bcrypt.
// ═══════════════════════════════════════════════════════════════════════════

const ADMIN_USER     = "admin";
const ADMIN_PASSWORD = "septimoxielo2026";
const SESSION_KEY    = "sx_admin_session";

export const authService = {
  /**
   * Intenta hacer login. Retorna { ok: true } o { ok: false, error: string }
   */
  login(username, password) {
    if (username === ADMIN_USER && password === ADMIN_PASSWORD) {
      const session = {
        user: username,
        loginAt: new Date().toISOString(),
        // Token simple para demo — en producción sería JWT firmado
        token: btoa(`${username}:${Date.now()}`),
      };
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return { ok: true };
    }
    return { ok: false, error: "Usuario o contraseña incorrectos" };
  },

  logout() {
    sessionStorage.removeItem(SESSION_KEY);
  },

  isAuthenticated() {
    try {
      const session = sessionStorage.getItem(SESSION_KEY);
      return !!session;
    } catch {
      return false;
    }
  },

  getSession() {
    try {
      const session = sessionStorage.getItem(SESSION_KEY);
      return session ? JSON.parse(session) : null;
    } catch {
      return null;
    }
  },
};
