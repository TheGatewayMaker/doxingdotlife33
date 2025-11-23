import { useState, useCallback, useEffect } from "react";

interface AuthState {
  token: string | null;
  username: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    token: localStorage.getItem("auth_token"),
    username: localStorage.getItem("auth_username"),
    isAuthenticated: !!localStorage.getItem("auth_token"),
    isLoading: false,
  });

  // Trigger a re-render when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const username = localStorage.getItem("auth_username");
    setAuthState({
      token,
      username,
      isAuthenticated: !!token,
      isLoading: false,
    });
  }, []);

  const login = useCallback((token: string, username: string) => {
    localStorage.setItem("auth_token", token);
    localStorage.setItem("auth_username", username);
    setAuthState({
      token,
      username,
      isAuthenticated: true,
      isLoading: false,
    });
  }, []);

  const logout = useCallback(async () => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));
    try {
      if (authState.token) {
        await fetch("/api/auth/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_username");
      setAuthState({
        token: null,
        username: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }, [authState.token]);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      setAuthState({
        token: null,
        username: null,
        isAuthenticated: false,
        isLoading: false,
      });
      return false;
    }

    try {
      const response = await fetch("/api/auth/check", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_username");
        setAuthState({
          token: null,
          username: null,
          isAuthenticated: false,
          isLoading: false,
        });
        return false;
      }

      return true;
    } catch (error) {
      console.error("Auth check error:", error);
      return false;
    }
  }, []);

  return {
    ...authState,
    login,
    logout,
    checkAuth,
  };
};
