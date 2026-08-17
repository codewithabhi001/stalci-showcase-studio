import { logoutApi } from "./api";

export function clearAuthSession() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("stalci_access_token");
    localStorage.removeItem("stalci_refresh_token");
    localStorage.removeItem("stalci_user");
    localStorage.removeItem("stalci_simulated_role");
    document.cookie = "stalci_admin=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  const token = localStorage.getItem("stalci_access_token");
  return Boolean(token);
}

export async function handleLogout() {
  try {
    await logoutApi();
  } catch (e) {
    console.error("Logout API call error:", e);
  } finally {
    clearAuthSession();
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }
}
