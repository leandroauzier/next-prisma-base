import {
  bgRed,
  bgBlue,
  bgGray,
  bgGreen,
  bgOrange,
  bgPurple,
  bgSlate,
  bgYellow
} from "@/utils/bgColors";

export const bgColors = {
  ...bgGray,
  ...bgBlue,
  ...bgRed,
  ...bgYellow,
  ...bgGreen,
  ...bgOrange,
  ...bgPurple,
  ...bgSlate,
  white: "bg-white",
  none: "",
} as const;

export type BgColorKey = keyof typeof bgColors;

export const roundedSizes = {
  none: "",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  full: "rounded-full",
} as const;

export const shadowSizes = {
  none: "",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
  "2xl": "shadow-2xl",
} as const;

export const titleColors = {
  gray: "text-gray-800",
  blue: "text-blue-600",
  red: "text-red-600",
  green: "text-green-600",
  yellow: "text-yellow-600",
  purple: "text-purple-600",
} as const;

export const gridCols = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
  6: "md:grid-cols-6",
} as const;
