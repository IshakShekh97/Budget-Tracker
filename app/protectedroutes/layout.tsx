import Navbar from "@/components/Navbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex h-screen w-full flex-col">
      <div className="w-full">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default layout;
