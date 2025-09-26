import {
  titleColors,
  roundedSizes,
  shadowSizes,
  gridCols,
  bgColors,
  BgColorKey
} from "@/utils/tailwindMaps";

type DashboardSectionProps = {
  children?: React.ReactNode;
  title: string;
  titleColor?: keyof typeof titleColors;
  bgColor?: BgColorKey;
  rounded?: keyof typeof roundedSizes;
  shadow?: keyof typeof shadowSizes;
  cols?: keyof typeof gridCols;
  description?: string;
  padding?: boolean;
};

export default function DashboardSection({
  title,
  children,
  titleColor = "gray",
  bgColor = "none",
  rounded = "none",
  shadow = "none",
  cols = 3,
  description,
  padding = true,
}: DashboardSectionProps) {
  const sectionClasses = `
    space-y-4
    ${padding ? "p-4" : ""}
    ${bgColors[bgColor ?? "none"]}
    ${roundedSizes[rounded]}
    ${shadowSizes[shadow]}
  `;

  const gridClasses = `grid gap-6 grid-cols-1 ${gridCols[cols]}`;

  return (
    <section className={sectionClasses}>
      <header>
        <h2 className={`text-2xl font-bold ${titleColors[titleColor]}`}>
          {title}
        </h2>
        {description && (
          <p className="text-sm text-gray-500">{description}</p>
        )}
      </header>

      <div className={gridClasses}>{children}</div>
    </section>
  );
}
