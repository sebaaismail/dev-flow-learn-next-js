"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { toast } from "sonner";

import ROUTES from "@/constants/routes";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react"; // ⬅️ spinner icon

const SocialAuthForm = () => {
  const [loadingProvider, setLoadingProvider] = useState<
    "github" | "google" | null
  >(null);

  const buttonClass =
    "background-dark400_light900 body-medium text-dark200_light800 min-h-12 flex-1 rounded-2 px-4 py-3.5";

  const handleSignIn = async (provider: "github" | "google") => {
    if (loadingProvider) return; // prevent double-clicks
    setLoadingProvider(provider);

    try {
      const result = await signIn(provider, {
        callbackUrl: ROUTES.HOME,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Sign-in failed", { description: result.error });
      } else if (result?.url) {
        window.location.href = result.url;
      }
    } catch (error) {
      console.error(error);
      toast.error("Sign-in failed", {
        description:
          error instanceof Error
            ? error.message
            : "An error occurred during sign-in",
      });
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <div className="mt-10 flex flex-wrap gap-2.5">
      {/* GitHub */}
      <Button
        className={buttonClass}
        onClick={() => handleSignIn("github")}
        disabled={loadingProvider !== null}
      >
        {loadingProvider === "github" ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>Connecting GitHub...</span>
          </>
        ) : (
          <>
            <Image
              src="/icons/github.svg"
              alt="GitHub Logo"
              width={20}
              height={20}
              className="invert-colors mr-2.5 object-contain"
            />
            <span>Log in with GitHub</span>
          </>
        )}
      </Button>

      {/* Google */}
      <Button
        className={buttonClass}
        onClick={() => handleSignIn("google")}
        disabled={loadingProvider !== null}
      >
        {loadingProvider === "google" ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>Connecting Google...</span>
          </>
        ) : (
          <>
            <Image
              src="/icons/google.svg"
              alt="Google Logo"
              width={20}
              height={20}
              className="mr-2.5 object-contain"
            />
            <span>Log in with Google</span>
          </>
        )}
      </Button>
    </div>
  );
};

export default SocialAuthForm;
