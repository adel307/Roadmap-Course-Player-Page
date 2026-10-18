import Link from "next/link";
import {
  BookOpen,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";

const footerNavigation = [
  { label: "Home", href: "/" },
  { label: "All courses", href: "/courses" },
  { label: "My courses", href: "/my-courses" },
  { label: "Student stories", href: "/#testimonials" },
];

const socialLinks = [
  { label: "LinkedIn", Icon: Linkedin, href: "https://www.linkedin.com/in/adel-ahmed-alboshy" },
  { label: "GitHub", Icon: Github, href: "https://github.com/adel307" },
  { label: "Portfolio", Icon: User, href: "https://adel307.github.io/portfulio" },
];

export function Footer() {
  return (
    <footer id="contact" className="relative z-20 bg-navy-deep text-white shadow-2xl">
      <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8 sm:py-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr]">
          {/* Brand Info */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2" aria-label="Roadmap home">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white">
                <BookOpen size={18} strokeWidth={1.8} />
              </span>
              <span className="text-base font-bold">
                Road<span className="text-heading-on-dark">map</span>
              </span>
            </Link>
            <p className="mt-2 max-w-sm text-xs leading-5 text-slate-300">
              Practical software and technology education to help engineers prepare for the opportunities ahead.
            </p>
            <div className="mt-3 flex gap-2">
              {socialLinks.map(({ label, Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 text-slate-300 transition hover:border-brand hover:text-heading-on-dark"
                >
                  <Icon size={15} strokeWidth={1.7} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-white">Explore</h2>
            <ul className="mt-2.5 space-y-1.5">
              {footerNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs text-slate-300 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-white">Contact Us</h2>
            <ul className="mt-2.5 space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Phone size={14} className="shrink-0 text-heading-on-dark" />
                <a href="tel:+201026046022" className="transition hover:text-white">
                  +20 102 604 6022
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="shrink-0 text-heading-on-dark" />
                <a href="mailto:adel.alboshy.dev@gmail.com" className="transition hover:text-white">
                  adel.alboshy.dev@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} className="shrink-0 text-heading-on-dark" />
                <span>Cairo, Egypt</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 flex flex-col gap-2 border-t border-white/15 pt-4 text-[11px] text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Adel Al-boshy. All rights reserved.</p>
          <p>Designed with care for the next generation of tech talent.</p>
        </div>
      </div>
    </footer>
  );
}