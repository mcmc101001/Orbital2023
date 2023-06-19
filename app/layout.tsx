import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import NavBar from "@/components/nav/NavBar";
import { Suspense } from "react";
import { ThemeProvider } from "@/components/nav/ThemeProvider";
// import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Orbital 2023",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark overflow-hidden">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <Toaster />
          <main className="flex w-full min-w-fit flex-row bg-white transition-colors duration-500 dark:bg-slate-950">
            {/* @ts-expect-error Server component */}
            <NavBar />
            <div className="h-screen w-[calc(100vw-8rem)]">{children}</div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
