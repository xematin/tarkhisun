import { Bot, Phone, Mail, MapPin, Sparkles, ArrowUp, Send, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import tarkhisunLogo from "@/assets/tarkhisun-logo.png";

const quickLinks = [
  { title: "خدمات ترخیص", href: "/#services", isAnchor: true },
  { title: "نرخ ارز", href: "/currencies", isAnchor: false },
  { title: "جستجوی تعرفه گمرکی", href: "/hscode", isAnchor: false },
  { title: "ترخیصان‌یار", href: "/tarkhisan-yar", isAnchor: false },
  { title: "بلاگ", href: "/blog", isAnchor: false },
  { title: "تماس با ما", href: "/contact", isAnchor: false },
];

const popularArticles = [
  { title: "راهنمای ترخیص کالا", slug: "/blog/complete-guide-customs-clearance-shahid-rajaei" },
  { title: "کد HS چیست؟", slug: "/blog/hs-code-guide" },
  { title: "تعرفه گمرکی", slug: "/blog/customs-tariff-guide" },
  { title: "سامانه جامع تجارت", slug: "/blog/ntsw-complete-guide" },
];

const ColumnHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="flex items-center justify-between mb-4">
    <div className="flex flex-col items-end text-right">
      <strong className="text-base text-primary text-persian">{title}</strong>
      <span className="text-[10px] tracking-[0.2em] text-muted-foreground">{subtitle}</span>
    </div>
    <span className="icon-badge-gradient w-9 h-9">
      <Sparkles className="w-4 h-4" />
    </span>
  </div>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const persianYear = currentYear - 621;
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="footer-bg pt-16 pb-8">
      <div className="container mx-auto px-4" dir="rtl">
        <div className="glass-card mx-auto max-w-6xl p-5 sm:p-8">
          {/* Top row: socials + brand */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/60">
            <div className="flex items-center gap-1.5 order-2 sm:order-1">
              <button
                onClick={scrollTop}
                aria-label="بازگشت به بالا"
                className="icon-badge-soft w-9 h-9 sm:w-10 sm:h-10"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
              <a href="tel:+989177380080" aria-label="تماس" className="icon-badge-gradient w-9 h-9 sm:w-10 sm:h-10">
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="https://t.me/N8NAutoBotBot"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="تلگرام"
                className="icon-badge-gradient w-9 h-9 sm:w-10 sm:h-10"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="mailto:info@tarkhisun.com"
                aria-label="ایمیل"
                className="icon-badge-gradient w-9 h-9 sm:w-10 sm:h-10"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 order-1 sm:order-2 min-w-0">
              <div className="flex flex-col items-end leading-tight min-w-0">
                <strong className="text-base sm:text-xl text-primary text-persian">ترخیصان</strong>
                <span className="text-[9px] sm:text-[10px] tracking-[0.18em] sm:tracking-[0.25em] text-muted-foreground truncate">
                  TARKHISUN · CUSTOMS
                </span>
              </div>
              <img
                src={tarkhisunLogo}
                alt="لوگو ترخیصان"
                className="h-10 w-10 sm:h-12 sm:w-12 object-contain shrink-0"
                width={48}
                height={48}
              />
            </div>
          </div>

          {/* Three columns */}
          <div className="grid md:grid-cols-3 gap-5 py-7">
            {/* Contact */}
            <div>
              <ColumnHeader title="اطلاعات تماس" subtitle="CONTACT" />
              <div className="flex flex-col gap-2">
                <a
                  href="https://B2n.ir/tarkhisun-map"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill-row"
                  aria-label="نقشه شعبه ۱ - چهارراه سازمان"
                >
                  <span className="text-persian">بندرعباس — چهارراه سازمان</span>
                  <MapPin className="w-4 h-4 text-accent" />
                </a>
                <a
                  href="https://B2n.ir/Tarkhisun-Map1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill-row"
                  aria-label="نقشه شعبه ۲ - بلوار رسالت"
                >
                  <span className="text-persian">بندرعباس — بلوار رسالت</span>
                  <MapPin className="w-4 h-4 text-accent" />
                </a>
                <a href="tel:+989177380080" className="pill-row" dir="ltr">
                  <span className="tabular-nums">09177380080</span>
                  <Phone className="w-4 h-4 text-accent" />
                </a>
                <a href="mailto:info@tarkhisun.com" className="pill-row" dir="ltr">
                  <span>info@tarkhisun.com</span>
                  <Mail className="w-4 h-4 text-accent" />
                </a>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <ColumnHeader title="دسترسی سریع" subtitle="QUICK LINKS" />
              <div className="grid grid-cols-2 gap-2">
                {quickLinks.map((l) =>
                  l.isAnchor ? (
                    <a key={l.title} href={l.href} className="pill-row text-persian">
                      <span>{l.title}</span>
                    </a>
                  ) : (
                    <Link key={l.title} to={l.href} className="pill-row text-persian">
                      <span>{l.title}</span>
                    </Link>
                  ),
                )}
                <Link
                  to="/blog/business-card-guide"
                  className="pill-row text-persian col-span-2"
                >
                  <span>اخذ کارت بازرگانی</span>
                </Link>
              </div>
            </div>

            {/* Articles */}
            <div>
              <ColumnHeader title="مقالات پربازدید" subtitle="ARTICLES" />
              <div className="flex flex-col gap-2">
                {popularArticles.map((a) => (
                  <Link key={a.slug} to={a.slug} className="pill-row text-persian">
                    <span>{a.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* AI Assistant CTA */}
          <div className="rounded-3xl p-6 sm:p-7 bg-gradient-to-l from-primary to-accent text-primary-foreground shadow-[0_18px_50px_-18px_hsl(var(--primary)/0.55)] relative overflow-hidden">
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-12 -right-8 w-44 h-44 rounded-full bg-white/10 blur-2xl" />
            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-12 h-12 rounded-full bg-white/15 backdrop-blur inline-flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </span>
                <div>
                  <strong className="block text-lg text-persian">ترخیصان‌یار</strong>
                  <span className="text-sm text-primary-foreground/85 text-persian">
                    اولین هوش مصنوعی گمرکات — کاملاً رایگان
                  </span>
                </div>
              </div>
              <a
                href="https://t.me/N8NAutoBotBot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-primary px-6 py-3 text-sm font-semibold hover:bg-white/90 transition-colors text-persian"
              >
                شروع مشاوره رایگان
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-6 pt-5 border-t border-white/60 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs sm:text-sm text-muted-foreground text-persian text-center md:text-right">
              © {persianYear} — تمامی حقوق برای تیم ترخیصان محفوظ است. طراحی و توسعه توسط{" "}
              <a
                href="https://octanco.de"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-primary transition-colors"
              >
                OctanCode
              </a>
            </p>
            <div className="inline-flex items-center gap-2 rounded-2xl bg-white/70 border border-white/70 px-3 py-2 text-[11px] text-foreground/75">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span className="text-persian leading-tight">نماد اعتماد الکترونیکی</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
