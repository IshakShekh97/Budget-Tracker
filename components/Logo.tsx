import { BanknoteIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"} className="flex items-center gap-2">
      <BanknoteIcon className="stroke h-11 w-11 stroke-orange-500 stroke-[1.5]" />
      <p className="bg-gradient-to-r from-amber-400  to-orange-500 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent">
        Budget Tracking
      </p>
    </Link>
  );
};

export const LogoMobile = () => {
  return (
    <Link href={"/"} className="flex items-center gap-2">
      <BanknoteIcon className="stroke h-6 w-6 stroke-orange-500 stroke-[1.5]" />
      <p className="bg-gradient-to-r from-amber-400  to-orange-500 bg-clip-text max-sm:text-lg sm:text-3xl  font-bold leading-tight tracking-tighter text-transparent">
        Budget Tracking
      </p>
    </Link>
  );
};

export default Logo;
