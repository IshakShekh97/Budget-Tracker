import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import RootProviders from "@/components/providers/RootProviders";
import { Toaster } from "@/components/ui/sonner";
import StarBg from "@/components/StarBg";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Budget Tracker",
  description: "A Fantastic Budget Tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorText: "white",
          colorBackground: "black",
          borderRadius: "10px",
          colorInputText: "white",
          colorPrimary: "#3DA8F7",
        },
      }}
    >
      <html
        lang="en"
        className="dark subpixel-antialiased"
        style={{ colorScheme: "dark" }}
      >
        <body className={poppins.className}>
          <div className=" ">
            <StarBg />
          </div>

          <div className="relative z-10">
            <Toaster richColors position="bottom-right" />
            <RootProviders>{children}</RootProviders>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
