import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function containsOnlyNumbers(str: string) {
  return /^[0-9]+$/.test(str);
}
