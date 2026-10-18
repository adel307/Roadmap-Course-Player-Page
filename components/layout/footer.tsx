import Link from "next/link";
import {
  BookOpen,
  Facebook,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";

const footerNavigation = [
  { label: "home", href: "/" },
  { label: "All courses", href: "/courses" },
  { label: "My courses", href: "/my-courses" },
  { label: "Student stories", href: "/#testimonials" },
];

const socialLinks = [
  { label: "LinkedIn page coming soon", Icon: Linkedin },
  { label: "Facebook page coming soon", Icon: Facebook },
  { label: "YouTube channel coming soon", Icon: Youtube },
];

export function Footer() {
  return (
    <footer id="contact" className="bg-[#061f43] text-white">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.25fr_0.8fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5" aria-label="Roadmap home">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white">
                <BookOpen size={20} strokeWidth={1.8} />
              </span>
              <span className="text-lg font-bold">
                Road<span className="text-[#58cfac]">map</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-300">
              Practical software and technology education to help engineers and
              developers prepare for the opportunities ahead.
            </p>
            <div className="mt-5 flex gap-2.5">
              {socialLinks.map(({ label, Icon }) => (
                <span
                  key={label}
                  title={label}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-slate-300"
                >
                  <Icon size={16} strokeWidth={1.7} />
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold text-white">Explore</h2>
            <ul className="mt-4 space-y-3">
              {footerNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-300 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-bold text-white">Contact</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Official contact information will be added when available.
            </p>
            <ul className="mt-4 space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <Phone size={14} className="mt-0.5 shrink-0 text-[#58cfac]" />
                <span>Phone number coming soon</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail size={14} className="mt-0.5 shrink-0 text-[#58cfac]" />
                <span>Email address coming soon</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="mt-0.5 shrink-0 text-[#58cfac]" />
                <span>Company address coming soon</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/15 pt-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Roadmap. All rights reserved.</p>
          <p>Designed with care for the next generation of tech talent.</p>
        </div>
      </div>
    </footer>
  );
}
