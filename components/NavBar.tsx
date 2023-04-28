import { Suspense } from "react";
import NavOptions, { NavOptionsProps } from "@/components/NavOptions";
import Link from "next/link";
import { Icons } from "@/components/Icons";
import UserProfilePic from "@/components/UserProfilePic";
import { Loader2 } from "lucide-react";
import DarkModeToggler from "@/components/DarkModeToggler";

export const navOptions: NavOptionsProps[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: "LayoutDashboard",
  },
  {
    name: "Cheatsheets and papers",
    href: "/database",
    icon: "Files",
  },
  {
    name: "Contribute!",
    href: "/addPDF",
    icon: "FilePlus",
  },
  {
    name: "Under development",
    href: "/pdf",
    icon: "Construction",
  },
];

export default function Navbar() {
  return (
    <div className="flex h-screen flex-col gap-y-5 overflow-y-hidden border-r border-gray-700 px-3 pt-4 dark:border-gray-300">
      <Link href="/" className="flex h-16 shrink-0 items-center justify-center">
        <Icons.Logo className="h-8 w-8 fill-current text-slate-800 dark:text-slate-200" />
      </Link>

      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          {navOptions.map((option) => {
            return (
              <NavOptions
                key={option.name}
                name={option.name}
                href={option.href}
                icon={option.icon}
              />
            );
          })}

          <DarkModeToggler />

          <Suspense
            fallback={
              <Loader2 className="h-6 w-6 animate-spin text-slate-800 dark:text-slate-200" />
            }
          >
            {/* @ts-expect-error Server Component */}
            <UserProfilePic />
          </Suspense>
        </ul>
      </nav>
    </div>
  );
}
