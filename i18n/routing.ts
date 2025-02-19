import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const localeConfig = {
  // A list of all locales that are supported
  locales: ["en", "de"],

  // Used when no locale matches
  defaultLocale: "en",
};

export const routing = defineRouting(localeConfig);

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
