import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "@/lib/puter";

/** Sends signed-out users to /auth and brings them back afterwards. */
export function useRequireAuth() {
  const { isLoading, auth, puterReady } = usePuterStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (puterReady && !isLoading && !auth.isAuthenticated) {
      navigate(`/auth?next=${encodeURIComponent(location.pathname + location.search)}`, { replace: true });
    }
  }, [puterReady, isLoading, auth.isAuthenticated, location.pathname, location.search, navigate]);

  return { ready: puterReady && !isLoading && auth.isAuthenticated };
}
