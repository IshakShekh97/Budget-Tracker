import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const page = () => {
  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center ">
        <div className=" bg-gradient-to-t from-amber-400 to bg-orange-700 bg-clip-text text-transparent pb-5 flex flex-col items-center justify-center">
          <p className="text-7xl max-sm:text-4xl font-bold">Budget Tracking</p>
          <p className="text-lg max-sm:text-base my-5 font-semibold">
            A handy Budget tracker Tool
          </p>
          <Separator />
        </div>

        <div className="pt-4">
          <SignedOut>
            <div className="flex flex-col items-center gap-4 justify-center">
              <p className="text-sm">Register Or Log In To Get Started</p>
              <div className="flex gap-5 max-sm:flex-col">
                <Link
                  className="focus:ring-offset mx-auto animate-shimmer rounded-full border border-slate-700 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-10 py-2 font-poppins font-medium text-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-slate-50"
                  href={"/sign-in"}
                >
                  Login
                </Link>
                <Link
                  className="focus:ring-offset mx-auto animate-shimmer rounded-full border border-slate-700 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-10 py-2 font-poppins font-medium text-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-slate-50"
                  href={"/sign-up"}
                >
                  Register
                </Link>
              </div>
            </div>
          </SignedOut>
          <SignedIn>
            <div className="flex items-center justify-center flex-col gap-4">
              <Link href={"/protectedroutes/dashboard"}>
                <Button
                  variant={"outline"}
                  className="bg-gradient-to-r  from-amber-300 to-orange-400 bg-clip-text text-transparent hover:bg-clip-border hover:text-black"
                >
                  Go to DashBoard
                </Button>
              </Link>
              <Button variant={"outline"} className="px-5 py-6 ">
                <UserButton showName />
              </Button>
            </div>
          </SignedIn>
        </div>
      </div>
    </>
  );
};
export default page;
