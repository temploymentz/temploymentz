"use client";

import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

export function useSessionWatcher() {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;

    // Handle page unload/tab close
    const handleBeforeUnload = () => {
      // Clear session from storage when leaving the form page
      if (typeof window !== "undefined") {
        sessionStorage.setItem("temploymentz_session_ended", "true");
      }
    };

    // Listen for storage changes (logout in other tab)
    const handleStorageChange = (e) => {
      if (e.key === "temploymentz_logout" && e.newValue === "true") {
        signOut({ redirect: true, callbackUrl: "/login" });
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [session]);
}
