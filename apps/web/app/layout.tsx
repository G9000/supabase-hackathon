import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { cn } from "lib/cn";
import Footer from "components/layout/Footer";
import Header from "components/layout/Header";

const fontSans = Nunito({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "DishDash",
  description: "Your Personalized Meal Planner Assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen h-full flex flex-col items-center justify-between bg-[#FAFAFA] scroll-smooth font-sans antialiased",
          fontSans.variable
        )}
      >
        <Header />
        <main className="grow flex items-center">{children}</main>
        {/* @ts-expect-error Server Component */}
        <Footer />
      </body>
    </html>
  );
}
