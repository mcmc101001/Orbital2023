"use client";

import axios from "axios";
import { StarIcon } from "lucide-react";
import { useState } from "react";
import { updateStarredModuleType } from "@/pages/api/updateStarredModule";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ModuleStarProps {
  moduleCode: string;
  userId: string;
  starred: boolean;
}

export default function ModuleStar({
  moduleCode,
  userId,
  starred,
}: ModuleStarProps) {
  let router = useRouter();

  const [star, setStar] = useState(starred);

  const handleClick = async () => {
    if (star) {
      toast.success("Module removed from bookmarks!");
    } else {
      toast.success("Module added to bookmarks!");
    }
    setStar(!star);
    let body: updateStarredModuleType = {
      moduleCode: moduleCode,
      userId: userId,
      value: !star,
    };
    try {
      const res = await axios.post("/api/updateStarredModule", body);
    } catch (error) {
      toast.error("Error updating bookmarked module, please try again later.");
    }
    router.refresh();
  };

  return (
    <StarIcon
      aria-label="Bookmark module"
      onClick={handleClick}
      className={
        "h-8 w-8 cursor-pointer text-slate-900 transition-colors dark:text-slate-100 " +
        (star
          ? "fill-slate-900 hover:fill-slate-500 hover:text-slate-500 dark:fill-slate-100 dark:hover:fill-slate-400 dark:hover:text-slate-400"
          : "hover:text-slate-500 dark:hover:text-slate-400")
      }
    />
  );
}
