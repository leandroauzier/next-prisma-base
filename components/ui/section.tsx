// components/ui/Section.tsx
import React from "react";
import {
  titleColors,
  bgColors,
  roundedSizes,
  shadowSizes,
  BgColorKey,
} from "@/utils/tailwindMaps";

interface SectionProps {
  title?: string;
  description?: string;
  align?: "left" | "center" | "right";
  titleColor?: keyof typeof titleColors;
  bgColor?: BgColorKey;
  rounded?: keyof typeof roundedSizes;
  shadow?: keyof typeof shadowSizes;
  padding?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  title,
  description,
  align = "left",
  titleColor = "gray",
  bgColor = "none",
  rounded = "none",
  shadow = "none",
  padding = true,
  className = "",
  children,
}) => {
  const alignment =
    align === "center"
      ? "text-center items-center"
      : align === "right"
      ? "text-right items-end"
      : "text-left items-start";

  const sectionClasses = `
    w-full flex flex-col gap-4 ${alignment}
    ${padding ? "py-10 px-4 md:px-8" : ""}
    ${bgColors[bgColor ?? "none"]}
    ${roundedSizes[rounded]}
    ${shadowSizes[shadow]}
    ${className}
  `;

  return (
    <section className={sectionClasses}>
      {title && (
        <h2 className={`text-2xl md:text-3xl font-semibold ${titleColors[titleColor]}`}>
          {title}
        </h2>
      )}

      {description && (
        <p className="text-gray-600 max-w-3xl">{description}</p>
      )}

      <div className="w-full">{children}</div>
    </section>
  );
};

export default Section;
