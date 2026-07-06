import { useEffect, useState } from "react";
import { getStoredToken, restoreFarmerFromBackend } from "../api/authStore";

interface AuthGuardProps {
  children: React.ReactNode;
  onNavigate: (page: string) => void;
}

export function AuthGuard({ children, onNavigate }: AuthGuardProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = getStoredToken();

      if (!token) {
        onNavigate("farmer-login");
        return;
      }

      await restoreFarmerFromBackend();
      setLoading(false);
    };

    initAuth();
  }, []);

  if (loading) return null;

  return <>{children}</>;
}
