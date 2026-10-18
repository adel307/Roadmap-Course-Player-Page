import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { MobileMenu } from "./mobile-menu";

const navigation = [
  { label: "home", href: "/" },
  { label: "All courses", href: "/courses" },
  { label: "My courses", href: "/my-courses" },
  { label: "Student stories", href: "/#testimonials" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#061f43]/95 text-white backdrop-blur-lg">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        {/* الشعار */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Roadmap home">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white">
            <BookOpen size={20} strokeWidth={1.8} />
          </span>
          <span className="text-lg font-bold tracking-tight sm:text-xl">
            Road<span className="text-[#58cfac]">map</span>
          </span>
        </Link>

        {/* القائمة الرئيسية للشاشات الكبيرة (Server-rendered بالكامل) */}
        <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-300 transition-colors duration-300 ease-in-out hover:text-[#58cfac]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* زر البدء للشاشات الكبيرة */}
        <Link
          href="/courses"
          className="hidden items-center gap-2 rounded-xl bg-[#3B82F6] px-4 py-2.5 text-sm font-bold text-white shadow-[0_0_22px_rgba(59,130,246,0.42)] transition hover:-translate-y-0.5 hover:bg-blue-500 sm:inline-flex"
        >
          Start learning
          <ArrowUpRight size={16} />
        </Link>

        {/* قائمة الموبايل التفاعلية (تم فصلها في Client Component) */}
        <MobileMenu navigation={navigation} />
      </div>
    </header>
  );
}