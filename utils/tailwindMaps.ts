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
import {
  textRed,
  textBlue,
  textGray,
  textGreen,
  textOrange,
  textPurple,
  textSlate,
  textYellow
} from "@/utils/textColors";

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

export const textColors = {
  ...textGray,
  ...textBlue,
  ...textRed,
  ...textYellow,
  ...textGreen,
  ...textOrange,
  ...textPurple,
  ...textSlate,
  white: "bg-white",
  none: "",
} as const;

export type TextColorKey = keyof typeof textColors;

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
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
} as const;
