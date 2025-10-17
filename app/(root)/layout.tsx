import Navbar from "@/components/navigation/navbar";
import React, { ReactNode } from "react";
import { Toaster } from "sonner";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <Navbar />
      {children}
      <Toaster richColors position="top-center" />
    </main>
  );
};

export default RootLayout;
