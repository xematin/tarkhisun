import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { useLocation } from "react-router-dom";
import tarkhisunLogo from "@/assets/tarkhisun-logo.png";

const navItems = [
  { title: "خانه", href: "/" },
  { title: "خدمات", href: "/services" },
  { title: "نرخ ارز", href: "/currencies" },
  { title: "جستجوی تعرفه", href: "/hscode" },
  { title: "بلاگ", href: "/blog" },
  { title: "ترخیصان‌یار", href: "/#ai-assistant" },
  { title: "تماس", href: "/#contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname, hash } = useLocation();
  const [currentHash, setCurrentHash] = useState<string>(typeof window !== "undefined" ? window.location.hash : "");

  useEffect(() => {
    setCurrentHash(hash);
  }, [hash]);

  useEffect(() => {
    if (pathname !== "/") return;
    const sectionIds = ["services", "ai-assistant", "contact"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setCurrentHash(`#${visible.target.id}`);
        else if (window.scrollY < 200) setCurrentHash("");
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) {
      const targetHash = href.slice(1);
      return pathname === "/" && currentHash === targetHash;
    }
    if (href === "/") return pathname === "/" && !currentHash;
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header className="sticky top-3 z-50 w-full">
      <div className="container mx-auto px-3 sm:px-4" dir="rtl">
        <div className="glass-pill mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 pl-2 pr-3 sm:pl-3 sm:pr-4">
          {/* Brand */}
          <a href="/" className="flex items-center gap-2 shrink-0">
            <img
              src={tarkhisunLogo}
              alt="لوگو ترخیصان"
              className="h-9 w-9 object-contain"
              width={36}
              height={36}
            />
            <div className="hidden sm:flex flex-col leading-tight text-right">
              <span className="text-base text-primary text-persian font-bold">ترخیصان</span>
              <span className="text-[10px] tracking-wider text-muted-foreground">TARKHISUN</span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {navItems.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className={`pill-nav-link text-persian ${isActive(item.href) ? "pill-nav-active" : ""}`}
              >
                {item.title}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href="/#contact"
            className="hidden lg:inline-flex items-center gap-2 rounded-full bg-gradient-to-l from-accent to-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-[0_8px_22px_-6px_hsl(var(--accent)/0.55)] hover:shadow-[0_12px_28px_-8px_hsl(var(--primary)/0.6)] transition-shadow text-persian"
          >
            <Phone className="w-4 h-4" />
            تماس با ما
          </a>

          {/* Mobile actions: contact shine + hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <a
              href="/#contact"
              aria-label="تماس با ما"
              title="تماس با ما"
              className="icon-badge-gradient w-10 h-10 shadow-[0_8px_22px_-6px_hsl(var(--accent)/0.55)] hover:shadow-[0_12px_28px_-8px_hsl(var(--primary)/0.6)] transition-shadow"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={() => setIsMenuOpen((v) => !v)}
              className="icon-badge-soft w-10 h-10"
              aria-label={isMenuOpen ? "بستن منو" : "باز کردن منو"}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden mx-auto max-w-6xl mt-2 glass-card p-3 animate-fade-in">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`pill-row text-persian ${isActive(item.href) ? "!bg-gradient-to-l !from-primary !to-accent !text-primary-foreground !border-transparent" : ""}`}
                >
                  <span>{item.title}</span>
                </a>
              ))}
              <a
                href="/#contact"
                onClick={() => setIsMenuOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-accent to-primary px-4 py-3 text-sm font-semibold text-primary-foreground text-persian"
              >
                <Phone className="w-4 h-4" />
                تماس با ما
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
