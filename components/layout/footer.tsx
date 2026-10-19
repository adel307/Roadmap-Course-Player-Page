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
    <footer id="contact" className="relative z-20 border-t border-line bg-card/95 text-ink backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-4 text-xs text-muted">
        
        {/* الصف الأول: اللوجو ونص إضافي/وصف */}
        <div className="flex flex-col items-center justify-between gap-2 pb-3 md:flex-row">
          <Link href="/" className="flex shrink-0 items-center gap-1.5" aria-label="Roadmap home">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand text-white">
              <BookOpen size={13} strokeWidth={2} />
            </span>
            <span className="text-sm font-bold tracking-tight text-ink">
              Road<span className="text-brand-dark">map</span>
            </span>
          </Link>
          
          <p className="text-[11px] text-muted text-center md:text-right">
            Empowering students with structured roadmaps and high-quality learning resources.
          </p>
        </div>

        {/* الصف الثاني: تفاصيل الروابط ومعلومات الاتصال والسوشيال ميديا */}
        <div className="grid grid-cols-1 gap-4 border-y border-line/60 py-4 sm:grid-cols-2 md:grid-cols-3">
          
          {/* العمود الأول: روابط التنقل */}
          <div>
            <h4 className="mb-2 text-[11px] font-bold uppercase tracking-wider text-ink">
              Useful Links
            </h4>
            <ul className="space-y-1 text-[11px]">
              {footerNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-brand-dark"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* العمود الثاني: وسائل التواصل والبريد */}
          <div>
            <h4 className="mb-2 text-[11px] font-bold uppercase tracking-wider text-ink">
              Contact Us
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <a href="tel:+201026046022" className="inline-flex items-center gap-1.5 transition-colors hover:text-brand-dark">
                  <Phone size={12} />
                  +20 102 604 6022
                </a>
              </li>
              <li>
                <a href="mailto:adel.alboshy.dev@gmail.com" className="inline-flex items-center gap-1.5 transition-colors hover:text-brand-dark">
                  <Mail size={12} />
                  adel.alboshy.dev@gmail.com
                </a>
              </li>
              <li className="inline-flex items-center gap-1.5">
                <MapPin size={12} />
                Cairo, Egypt
              </li>
            </ul>
          </div>

          {/* العمود الثالث: التواصل الاجتماعي */}
          <div className="flex flex-col items-start sm:items-end">
            <h4 className="mb-2 text-[11px] font-bold uppercase tracking-wider text-ink">
              Follow Us
            </h4>
            <div className="flex items-center gap-1.5">
              {socialLinks.map(({ label, Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  aria-label={label}
                  className="flex h-7 w-7 items-center justify-center rounded-md border border-line bg-card/50 text-muted transition hover:border-brand hover:text-brand-dark"
                >
                  <Icon size={13} strokeWidth={1.8} />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* الصف الثالث: حقوق الملكية والنشر */}
        <div className="flex flex-col items-center justify-center pt-3 text-center text-[10px] text-muted/80">
          <p>© {new Date().getFullYear()} Adel Al-boshy. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}