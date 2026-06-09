import { Suspense, lazy, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import {
  Truck,
  CreditCard,
  FileCheck,
  Users,
  Search,
  Shield,
  Clock,
  Ship,
  ArrowLeft,
  Sparkles,
  Award,
  TrendingUp,
  HeadphonesIcon,
} from "lucide-react";

const Hero3D = lazy(() => import("@/components/services/Hero3D"));

const services = [
  {
    icon: Truck,
    title: "ترخیص کالا",
    description: "ترخیص سریع و مطمئن انواع کالاهای وارداتی و صادراتی در تمام بنادر کشور",
    features: ["ترخیص در کمترین زمان", "مشاوره تخصصی", "پیگیری ۲۴ ساعته"],
    link: "/blog/bandar-abbas-comprehensive-clearance-guide",
    accent: "from-emerald-500/20 to-teal-500/10",
  },
  {
    icon: CreditCard,
    title: "اخذ کارت بازرگانی",
    description: "اخذ، تمدید و مشاوره کارت بازرگانی حقیقی، حقوقی، تولیدی، خدماتی و موردی",
    features: ["تهیه مدارک", "ثبت‌نام در اتاق بازرگانی", "تمدید سالانه"],
    link: "/blog/business-card-complete-guide",
    accent: "from-amber-500/20 to-orange-500/10",
  },
  {
    icon: FileCheck,
    title: "صدور مجوزها",
    description: "اخذ مجوزهای واردات، صادرات و مجوزهای تخصصی از سازمان‌های مختلف",
    features: ["مجوز استاندارد", "مجوز بهداشت", "مجوزهای ویژه"],
    link: "/blog/ntsw-complete-guide",
    accent: "from-blue-500/20 to-indigo-500/10",
  },
  {
    icon: Users,
    title: "مشاوره گمرکی",
    description: "مشاوره تخصصی در زمینه امور گمرکی، تعرفه و قوانین تجارت بین‌الملل",
    features: ["مشاوره حقوقی", "بررسی تعرفه", "راهنمایی قوانین"],
    link: "/blog/customs-tariff-guide",
    accent: "from-purple-500/20 to-pink-500/10",
  },
  {
    icon: Search,
    title: "پیگیری پرونده",
    description: "پیگیری مستمر وضعیت پرونده‌های ترخیص و ارائه گزارش‌های لحظه‌ای",
    features: ["پیگیری آنلاین", "گزارش مرحله‌ای", "اطلاع‌رسانی SMS"],
    link: "/blog/manifest-guide",
    accent: "from-cyan-500/20 to-blue-500/10",
  },
  {
    icon: Shield,
    title: "خدمات بیمه",
    description: "بیمه کالا و مشاوره انواع پوشش‌های بیمه‌ای برای محموله‌های تجاری",
    features: ["بیمه حمل", "بیمه کالا", "مشاوره پوشش"],
    link: "/blog/incoterms-guide",
    accent: "from-rose-500/20 to-red-500/10",
  },
  {
    icon: Ship,
    title: "حمل بین‌المللی",
    description: "حمل دریایی، زمینی و هوایی کالا از مبدا تا مقصد با بهترین نرخ",
    features: ["حمل دریایی", "حمل زمینی", "ترانزیت"],
    link: "/blog/international-shipping-guide",
    accent: "from-sky-500/20 to-cyan-500/10",
  },
  {
    icon: Clock,
    title: "خدمات ۲۴ ساعته",
    description: "پشتیبانی و مشاوره در تمام ساعات شبانه‌روز برای پاسخ‌گویی فوری",
    features: ["پشتیبانی شبانه‌روزی", "پاسخ‌گویی فوری", "مشاوره تلفنی"],
    link: "/blog/customs-clearance-company-guide",
    accent: "from-violet-500/20 to-purple-500/10",
  },
];

const stats = [
  { icon: Award, value: "+۱۵", label: "سال تجربه" },
  { icon: TrendingUp, value: "+۵۰۰۰", label: "پرونده موفق" },
  { icon: Users, value: "+۱۲۰۰", label: "مشتری راضی" },
  { icon: HeadphonesIcon, value: "۲۴/۷", label: "پشتیبانی" },
];

const Services = () => {
  useEffect(() => {
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "fa");
  }, []);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "خدمات تخصصی ترخیص و امور گمرکی",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.title,
      description: s.description,
      url: `https://tarkhisun.com${s.link}`,
    })),
  };

  return (
    <>
      <Helmet>
        <title>خدمات تخصصی ترخیص و امور گمرکی | ترخیص کالا و کارت بازرگانی</title>
        <meta
          name="description"
          content="خدمات تخصصی ترخیص کالا، اخذ کارت بازرگانی، صدور مجوز، مشاوره گمرکی، بیمه و حمل بین‌المللی در بندرعباس و سراسر ایران"
        />
        <meta
          name="keywords"
          content="خدمات ترخیص کالا, اخذ کارت بازرگانی, مشاوره گمرکی, ترخیص بندرعباس, صدور مجوز, حمل بین‌المللی, ترخیص کار رسمی"
        />
        <meta property="og:title" content="خدمات تخصصی ترخیص و امور گمرکی" />
        <meta
          property="og:description"
          content="ترخیص کالا، اخذ کارت بازرگانی، صدور مجوز، مشاوره گمرکی و حمل بین‌المللی با تیم متخصص"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tarkhisun.com/services" />
        <meta property="og:locale" content="fa_IR" />
        <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main>
          <PageBreadcrumb items={[{ label: "خدمات" }]} />

          {/* Hero with 3D */}
          <section className="relative overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary to-primary-light" aria-hidden="true" />
            {/* Animated blobs */}
            <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse" />
              <div
                className="absolute -bottom-24 -left-24 w-[28rem] h-[28rem] bg-accent-light/20 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "1.5s" }}
              />
              <div
                className="absolute top-1/3 left-1/3 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "3s" }}
              />
            </div>

            <div className="container mx-auto px-4 py-16 lg:py-24 relative" dir="rtl">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Text */}
                <div className="text-white">
                  <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span className="text-sm text-persian">خدمات تخصصی ترخیصان</span>
                  </div>

                  <h1 className="heading-primary !text-white mb-6 text-persian leading-tight">
                    خدمات تخصصی ترخیص و امور گمرکی
                  </h1>

                  <p className="text-lg md:text-xl text-white/85 mb-8 text-persian leading-relaxed">
                    از ترخیص کالا تا اخذ کارت بازرگانی، تمام نیازهای تجارت بین‌الملل شما را با تیم مجرب و فناوری روز پوشش می‌دهیم.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <a
                      href="#services-grid"
                      className="px-6 py-3 rounded-xl bg-white text-primary font-bold text-persian shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all"
                    >
                      مشاهده خدمات
                    </a>
                    <button
                      onClick={() => window.open("https://t.me/N8NAutoBotBot", "_blank")}
                      className="px-6 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold text-persian hover:bg-white/20 transition-all"
                    >
                      مشاوره با ترخیصان‌یار
                    </button>
                  </div>
                </div>

                {/* 3D Canvas */}
                <div className="relative h-[380px] md:h-[460px] lg:h-[520px]">
                  <Suspense
                    fallback={
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md animate-pulse" />
                      </div>
                    }
                  >
                    <Hero3D />
                  </Suspense>
                </div>
              </div>
            </div>

            {/* Bottom wave */}
            <div className="relative h-12 bg-gradient-to-b from-transparent to-background" aria-hidden="true" />
          </section>

          {/* Services Glass Grid */}
          <section id="services-grid" className="relative py-20 bg-background">
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
              <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative" dir="rtl">
              <div className="text-center mb-14 max-w-2xl mx-auto">
                <h2 className="heading-secondary mb-4 text-persian">
                  هر <strong>خدمت</strong> یک پرونده موفق
                </h2>
                <p className="text-muted-foreground text-persian text-lg">
                  ۸ سرفصل خدماتی برای پوشش کامل تجارت خارجی شما
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {services.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <Link
                      key={i}
                      to={s.link}
                      className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl p-6 transition-all hover:-translate-y-1 hover:shadow-2xl hover:border-accent/40"
                      style={{
                        boxShadow: "0 8px 32px -8px hsl(var(--primary) / 0.08)",
                      }}
                    >
                      {/* Gradient accent */}
                      <div
                        className={`absolute -top-12 -left-12 w-40 h-40 bg-gradient-to-br ${s.accent} rounded-full blur-2xl opacity-70 group-hover:opacity-100 transition-opacity`}
                        aria-hidden="true"
                      />

                      <div className="relative">
                        <div className="w-14 h-14 mb-5 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                          <Icon className="w-7 h-7 text-white" strokeWidth={1.8} />
                        </div>

                        <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-accent-dark transition-colors text-persian">
                          <strong>{s.title}</strong>
                        </h3>

                        <p className="text-sm text-muted-foreground mb-5 leading-relaxed text-persian min-h-[60px]">
                          {s.description}
                        </p>

                        <ul className="space-y-2 mb-5">
                          {s.features.map((f, fi) => (
                            <li key={fi} className="flex items-center text-xs text-muted-foreground text-persian">
                              <div className="w-1.5 h-1.5 bg-accent rounded-full ml-2 flex-shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>

                        <div className="pt-4 border-t border-border/60 flex items-center justify-between text-accent-dark font-semibold text-sm text-persian">
                          <span>اطلاعات بیشتر</span>
                          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-20 bg-gradient-to-br from-secondary/50 via-background to-accent/5">
            <div className="container mx-auto px-4" dir="rtl">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div
                      key={i}
                      className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl p-6 text-center"
                    >
                      <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-3xl font-bold text-primary mb-1 text-persian">{s.value}</div>
                      <div className="text-sm text-muted-foreground text-persian">{s.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4" dir="rtl">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary-light to-accent p-10 md:p-16 text-center text-white">
                <div className="absolute inset-0 opacity-30" aria-hidden="true">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-300/20 rounded-full blur-3xl" />
                </div>
                <div className="relative max-w-2xl mx-auto">
                  <h2 className="heading-secondary !text-white mb-4 text-persian">
                    نیاز به <strong>مشاوره تخصصی</strong> دارید؟
                  </h2>
                  <p className="text-white/85 mb-8 text-lg text-persian">
                    کارشناسان ترخیصان آماده ارائه مشاوره رایگان و بررسی پرونده شما هستند.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Link
                      to="/#contact"
                      className="px-7 py-3.5 rounded-xl bg-white text-primary font-bold text-persian shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all"
                    >
                      درخواست مشاوره رایگان
                    </Link>
                    <button
                      onClick={() => window.open("https://t.me/N8NAutoBotBot", "_blank")}
                      className="px-7 py-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/40 text-white font-bold text-persian hover:bg-white/20 transition-all"
                    >
                      چت با ترخیصان‌یار
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Services;
