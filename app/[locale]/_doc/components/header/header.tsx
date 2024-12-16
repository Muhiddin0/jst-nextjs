import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Code, Menu } from "lucide-react";
import ThemeToggle from "@/components/theme/theme";

export function Header() {
  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Code className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">MK</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/docs"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Docs
            </Link>
            <Link
              href="/api"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              API
            </Link>
            <Link
              href="/examples"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Examples
            </Link>
            <Link
              href="/community"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Community
            </Link>
          </nav>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none"></div>
          <nav className="flex items-center">
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
