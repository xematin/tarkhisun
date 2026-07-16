import { useEffect, useState } from "react";
import { Menu, X, Phone, ChevronDown, ChevronUp } from "lucide-react";
import { useLocation } from "react-router-dom";
import tarkhisunLogo from "@/assets/tarkhisun-logo.png";

interface NavItem {
  title: string;
  href: string;
  children?: { title: string; href: string }[];
}

const navItems: NavItem[] = [
  { title: "خانه", href: "/" },
  {
    title: "خدمات",
    href: "/services",
    children: [
      { title: "اخذ کارت بازرگانی", href: "/services/business-card" },
    ],
  },
  { title: "نرخ ارز", href: "/currencies" },
  { title: "جستجوی تعرفه", href: "/hscode" },
  { title: "بلاگ", href: "/blog" },
  { title: "ترخیصان‌یار", href: "/tarkhisan-yar" },
  { title: "تماس", href: "/contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
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

  const toggleMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      setExpandedMobileItem(null);
    } else {
      setIsMenuOpen(true);
    }
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
            {navItems.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              if (!hasChildren) {
                return (
                  <a
                    key={item.title}
                    href={item.href}
                    className={`pill-nav-link text-persian ${isActive(item.href) ? "pill-nav-active" : ""}`}
                  >
                    {item.title}
                  </a>
                );
              }
              return (
                <div key={item.title} className="relative group">
                  <a
                    href={item.href}
                    className={`pill-nav-link text-persian inline-flex items-center gap-1 ${isActive(item.href) ? "pill-nav-active" : ""}`}
                  >
                    {item.title}
                    <ChevronDown className="w-3.5 h-3.5 opacity-70 transition-transform group-hover:rotate-180" />
                  </a>
                  {/* Hover bridge to avoid gap flicker */}
                  <div className="absolute right-0 left-0 top-full h-3" aria-hidden="true" />
                  <div
                    className="absolute right-0 top-[calc(100%+0.5rem)] min-w-[220px] opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 focus-within:opacity-100 focus-within:visible focus-within:translate-y-0 transition-all duration-200 z-50"
                    role="menu"
                  >
                    <div className="glass-card p-2 flex flex-col gap-1">
                      {item.children!.map((child) => (
                        <a
                          key={child.title}
                          href={child.href}
                          className={`pill-row text-persian text-sm ${isActive(child.href) ? "!bg-gradient-to-l !from-primary !to-accent !text-primary-foreground !border-transparent" : ""}`}
                        >
                          <span>{child.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>


          {/* Desktop CTA */}
          <a
            href="/contact"
            className="hidden lg:inline-flex items-center gap-2 rounded-full bg-gradient-to-l from-accent to-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-[0_8px_22px_-6px_hsl(var(--accent)/0.55)] hover:shadow-[0_12px_28px_-8px_hsl(var(--primary)/0.6)] transition-shadow text-persian"
          >
            <Phone className="w-4 h-4" />
            تماس با ما
          </a>

          {/* Mobile actions: contact shine + hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <a
              href="/contact"
              aria-label="تماس با ما"
              title="تماس با ما"
              className="icon-badge-gradient w-10 h-10 shadow-[0_8px_22px_-6px_hsl(var(--accent)/0.55)] hover:shadow-[0_12px_28px_-8px_hsl(var(--primary)/0.6)] transition-shadow"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={toggleMenu}
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
              {navItems.map((item) => {
                const hasChildren = item.children && item.children.length > 0;
                const isExpanded = expandedMobileItem === item.title;

                return (
                  <div key={item.title} className="flex flex-col gap-1">
                    {hasChildren ? (
                      <>
                        <button
                          type="button"
                          onClick={() => setExpandedMobileItem(isExpanded ? null : item.title)}
                          className={`pill-row text-persian ${isActive(item.href) ? "!bg-gradient-to-l !from-primary !to-accent !text-primary-foreground !border-transparent" : ""}`}
                        >
                          <span>{item.title}</span>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                        {isExpanded && (
                          <div className="flex flex-col gap-1 pr-3 border-r-2 border-primary/20 mr-2">
                            <a
                              href={item.href}
                              onClick={() => {
                                setIsMenuOpen(false);
                                setExpandedMobileItem(null);
                              }}
                              className="pill-row text-persian text-sm"
                            >
                              <span>مشاهده همه خدمات</span>
                            </a>
                            {item.children!.map((child) => (
                              <a
                                key={child.title}
                                href={child.href}
                                onClick={() => {
                                  setIsMenuOpen(false);
                                  setExpandedMobileItem(null);
                                }}
                                className={`pill-row text-persian text-sm ${isActive(child.href) ? "!bg-gradient-to-l !from-primary !to-accent !text-primary-foreground !border-transparent" : ""}`}
                              >
                                <span>{child.title}</span>
                              </a>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <a
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`pill-row text-persian ${isActive(item.href) ? "!bg-gradient-to-l !from-primary !to-accent !text-primary-foreground !border-transparent" : ""}`}
                      >
                        <span>{item.title}</span>
                      </a>
                    )}
                  </div>
                );
              })}
              <a
                href="/contact"
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
