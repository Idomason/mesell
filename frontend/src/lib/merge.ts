import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = function (...inputs: string[]) {
  return twMerge(clsx(inputs));
};
