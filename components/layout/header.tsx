import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { MobileMenu } from "./mobile-menu";
import { ThemeToggle } from "./ThemeToggle";

const navigation = [
  { label: "home", href: "/" },
  { label: "My courses", href: "/my-courses" },
  { label: "All courses", href: "/courses" },
  { label: "saved lessons", href: "/lessons/saved" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-card/95 text-ink backdrop-blur-lg">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        {/* Brand */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Roadmap home">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white">
            <BookOpen size={20} strokeWidth={1.8} />
          </span>
          <span className="text-lg font-bold tracking-tight sm:text-xl">
            Road<span className="text-brand-dark">map</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted transition-colors duration-300 ease-in-out hover:text-brand-dark"
            >
              {item.label === "home" ? "Home" : item.label}
            </a>
          ))}
        </nav>

        {/* Theme and primary actions */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <ThemeToggle />

          {/* Desktop call to action */}
          <Link
            href="/courses"
            className="hidden items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-bold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-brand-dark sm:inline-flex"
          >
            Start learning
            <ArrowUpRight size={16} />
          </Link>

          {/* Mobile navigation */}
          <MobileMenu navigation={navigation} />
        </div>
      </div>
    </header>
  );
}