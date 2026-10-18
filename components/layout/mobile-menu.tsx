"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
}

export function MobileMenu({ navigation }: { navigation: NavItem[] }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-white transition hover:bg-white/10 md:hidden"
      >
        {menuOpen ? <X size={19} /> : <Menu size={19} />}
      </button>

      {menuOpen && (
        <nav aria-label="Mobile navigation" className="absolute left-0 right-0 top-[72px] border-t border-white/10 bg-[#061f43] px-5 py-4 md:hidden shadow-lg">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/5"
              >
                {item.label}
              </a>
            ))}
            <Link
              href="/#courses"
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[#3B82F6] px-4 py-3 text-sm font-bold text-white shadow-[0_0_22px_rgba(59,130,246,0.32)]"
            >
              Explore learning paths <ArrowUpRight size={16} />
            </Link>
          </div>
        </nav>
      )}
    </>
  );
}