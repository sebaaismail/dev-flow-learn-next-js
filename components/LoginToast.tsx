// components/ToastOnLogin.tsx
"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export default function ToastOnLogin() {
  useEffect(() => {
    if (sessionStorage.getItem("login_success") === "true") {
      const timer = setTimeout(() => {
        toast.success("Welcome back! 👋");
        console.log("✅ Welcome back! 👋");
        sessionStorage.removeItem("login_success");
      }, 500); // ⏱️ half a second delay

      return () => clearTimeout(timer);
    }
  }, []);

  return null;
}
