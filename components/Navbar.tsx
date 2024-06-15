"use client";
import React, { useState } from "react";
import Logo, { LogoMobile } from "./Logo";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import { UserButton } from "@clerk/nextjs";
import { ThemeSwitcherBtn } from "./ThemeSwitcherBtn";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { BanknoteIcon, MenuIcon } from "lucide-react";

const Navbar = () => {
  return (
    <>
      <DesktopNav />
      <MobileNav />
    </>
  );
};

const items = [
  { label: "Dashboard", link: "/protectedroutes/dashboard" },
  { label: "Transaction ", link: "/protectedroutes/transaction" },
  { label: "Manage", link: "/protectedroutes/manage" },
];

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="block border-separate bg-transparent backdrop-blur-[2px] md:hidden">
      <nav className="container flex items-center justify-between px-8">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size={"icon"} className="rounded-xl">
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SheetContent
            className="w-[300px] sm:w-[540px] bg-transparent backdrop-blur-[2px]"
            side={"left"}
          >
            <Link href={"/"} className="flex items-center gap-2">
              <BanknoteIcon className="stroke h-6 w-6 stroke-orange-500 stroke-[1.5]" />
              <p className="bg-gradient-to-r from-amber-400  to-orange-500 bg-clip-text text-2xl font-bold leading-tight tracking-tighter text-transparent">
                Budget Tracker
              </p>
            </Link>

            <div className="flex flex-col gap-1 pt-4">
              {items.map((item) => (
                <NavbarItem
                  link={item.link}
                  key={item.label}
                  label={item.label}
                  clickCallBack={() => setIsOpen((prev) => !prev)}
                />
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
          <LogoMobile />
        </div>
        <div className="flex items-center gap-2">
          <ThemeSwitcherBtn />
          <UserButton afterSignOutUrl="/" />
        </div>
      </nav>
    </div>
  );
}

function DesktopNav() {
  return (
    <div className="hidden border-separate border-b bg-transparent backdrop-blur-[2px] md:block">
      <nav className="container flex items-center justify-between px-8">
        <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
          <Logo />
          <div className="flex h-full">
            {items.map((item) => (
              <NavbarItem
                key={item.label}
                link={item.link}
                label={item.label}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeSwitcherBtn />
          <UserButton afterSignOutUrl="/" />
        </div>
      </nav>
    </div>
  );
}

function NavbarItem({
  label,
  link,
  clickCallBack,
}: {
  label: string;
  link: string;
  clickCallBack?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <div className="relative flex items-center">
      <Link
        href={link}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "w-full justify-start text-lg text-muted-foreground hover:text-foreground",
          isActive && "text-foreground"
        )}
        onClick={() => {
          if (clickCallBack) clickCallBack();
        }}
      >
        {label}
      </Link>
      {isActive && (
        <div className="absolute -bottom-[2px] left-1/2 hidden h-[2px] w-[80%] -translate-x-1/2 rounded-xl bg-foreground md:block "></div>
      )}
    </div>
  );
}

export default Navbar;
