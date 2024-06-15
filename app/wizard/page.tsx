import { CurrencyComboBox } from "@/components/CurrencyComboBox";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  return (
    <div className="container  flex max-w-2xl flex-col font-medium items-center justify-center gap-4">
      <div className="">
        <h1 className="text-center text-3xl">
          Welcome, <span className="ml-2 font-bold">{user.firstName} 👋</span>
        </h1>
        <h2 className="mt-4 text-center text-base text-muted-foreground">
          Let &apos;s get Started By Setting Up Your Currency
        </h2>
        <h3 className="mt-2 text-center capitalize text-sm text-muted-foreground">
          You can change this later in your profile settings
        </h3>
      </div>
      <Separator />
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Currency</CardTitle>
          <CardDescription>
            Set Your Default Currency For Transaction
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CurrencyComboBox />
        </CardContent>
      </Card>

      <Separator />
      <Button className="w-full" asChild>
        <Link href={"/protectedroutes/dashboard"}>
          I&apos;m done! Take Me To Dashboard
        </Link>
      </Button>
      <div className="mt-8 ">
        <Logo />
      </div>
    </div>
  );
};

export default page;
