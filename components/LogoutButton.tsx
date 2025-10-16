"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import ROUTES from "@/constants/routes";
import { signOut } from "next-auth/react";
import { Loader2 } from "lucide-react";

const LogoutButton = () => {
  const [isPending, setIsPending] = useState(false);

  const handleLogout = async () => {
    try {
      if (isPending) return;
      setIsPending(true);
      await signOut({ redirectTo: ROUTES.SIGN_IN });
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  return (
    <Button disabled={isPending} onClick={handleLogout}>
      {isPending ? (
        <Loader2
          className="mr-2 w-4 h-
       animate-spin"
        />
      ) : (
        ""
      )}
      Log out
    </Button>
  );
};

export default LogoutButton;
