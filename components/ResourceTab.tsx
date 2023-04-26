"use client";

import { FC } from "react";
import Link from "next/link";
import { ResourceOptionsProps } from "@/lib/content";
import { useSelectedLayoutSegment } from "next/navigation";
import { motion } from "framer-motion";

interface ResourceTabProps {
  moduleCode: string;
  resourceOptions: ResourceOptionsProps[];
}

const ResourceTab: FC<ResourceTabProps> = ({ moduleCode, resourceOptions }) => {
  let segment = useSelectedLayoutSegment();
  return (
    <div className="my-4 flex flex-row items-center justify-center bg-slate-200 p-2 dark:bg-slate-900">
      {resourceOptions.map((option) => {
        return (
          <Link
            key={option.name}
            href={`/database/${moduleCode}/${option.href}`}
            className={
              "relative w-1/3 rounded-md bg-inherit p-3 text-center text-xl font-medium transition duration-300 " +
              (segment === option.href
                ? "text-black dark:text-white"
                : "text-slate-600 dark:text-slate-400")
            }
          >
            {segment === option.href && (
              <motion.div
                layout
                layoutId="active-pill"
                className="absolute inset-0 z-10 rounded-lg bg-white dark:bg-slate-950"
                transition={{ type: "spring", duration: 0.5 }}
                initial={false}
              />
            )}
            <span className="relative z-20">{option.name}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default ResourceTab;
