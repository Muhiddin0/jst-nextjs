import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  position?: {
    x: "left" | "right";
    y: "top" | "bottom";
  };
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
}

export default function ScreenQueryInfo({ position, size }: Props) {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <div
      className={cn(
        "fixed z-[10000] flex w-auto gap-2 bg-black p-3 text-white",
        position
          ? {
              "left-0": position.x === "left",
              "right-0": position.x === "right",
              "top-0": position.y === "top",
              "bottom-0": position.y === "bottom",
            }
          : {
              "bottom-0 left-0": true,
            },
        {
          "[&>*]:text-sm": size === "sm",
          "[&>*]:text-md": size === "md",
          "[&>*]:text-lg": size === "lg",
          "[&>*]:text-xl": size === "xl",
          "[&>*]:text-2xl": size === "2xl",
        },
      )}
    >
      <span>screen:</span>
      <span className="block sm:hidden">full</span>
      <span className="hidden sm:block md:hidden">sm</span>
      <span className="hidden md:block lg:hidden">md</span>
      <span className="hidden lg:block xl:hidden">lg</span>
      <span className="hidden xl:block 2xl:hidden">xl</span>
      <span className="hidden 2xl:block">2xl</span>
    </div>
  );
}
