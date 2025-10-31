import LeftSideBar from "@/components/LeftSideBar";
import Navbar from "@/components/navigation/navbar";
import { ClerkProvider } from "@clerk/nextjs";
import React, { ReactNode } from "react";
import { Toaster } from "sonner";

const RootLayout = ({ children }: { children: ReactNode }) => {
  // make main take all available height

  return (
    <main className="flex flex-col min-h-screen">
      <ClerkProvider>
        <Navbar />
        <div className="flex flex-1">
          <LeftSideBar />
          {children}
        </div>
        <Toaster richColors position="top-center" />
      </ClerkProvider>
    </main>
  );
};

export default RootLayout;
