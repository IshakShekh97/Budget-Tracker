import Logo from "@/components/Logo";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen w-full">
      <Logo />
      <div className="mt-12">{children}</div>
    </div>
  );
};

export default layout;
