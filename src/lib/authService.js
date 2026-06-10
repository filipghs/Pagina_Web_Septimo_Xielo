const SESSION_KEY     = "sx_admin_session";
const CREDENTIALS_KEY = "sx_admin_credentials";

const DEFAULT_CREDENTIALS = {
  username: "admin",
  password: "septimoxielo2026",
};

export const authService = {
  getCredentials() {
    try {
      const stored = localStorage.getItem(CREDENTIALS_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_CREDENTIALS;
    } catch {
      return DEFAULT_CREDENTIALS;
    }
  },

  updateCredentials(newUsername, newPassword) {
    const creds = { username: newUsername, password: newPassword };
    localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(creds));
  },

  login(username, password) {
    const creds = this.getCredentials();
    if (username === creds.username && password === creds.password) {
      const session = {
        user: username,
        loginAt: new Date().toISOString(),
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
      return !!sessionStorage.getItem(SESSION_KEY);
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
