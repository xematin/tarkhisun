import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Bot, MessageCircle, FileCheck2, Search, ShieldCheck, Zap, ChevronDown, Sparkles, Send, Clock, Award, Infinity } from "lucide-react";

const TELEGRAM_URL = "https://t.me/N8NAutoBotBot";

const features = [
  {
    icon: MessageCircle,
    title: "پاسخ به سؤالات گمرکی",
    desc: "پاسخ‌های تخصصی، دقیق و مستند برای تمام پرسش‌های ترخیص کالا در چند ثانیه.",
    tone: "emerald",
  },
  {
    icon: Search,
    title: "جستجوی هوشمند HS Code",
    desc: "یافتن سریع کد تعرفه با پردازش زبان طبیعی و تطبیق با کتاب تعرفه ایران.",
    tone: "amber",
  },
  {
    icon: FileCheck2,
    title: "بررسی مدارک و مجوزها",
    desc: "کنترل اولیه مدارک، تشخیص مجوزهای لازم و راهنمایی سازمان‌های ذی‌ربط.",
    tone: "emerald",
  },
  {
    icon: Zap,
    title: "راهنمایی گام‌به‌گام ترخیص",
    desc: "از اظهار کالا تا خروج، هر مرحله را با دستورالعمل شفاف در کنارتان است.",
    tone: "amber",
  },
];

const stats = [
  { icon: Award, value: "۱۰۰۰+", label: "پرونده موفق" },
  { icon: Clock, value: "۲۴/۷", label: "در دسترس" },
  { icon: Infinity, value: "۱۰۰٪", label: "رایگان" },
  { icon: ShieldCheck, value: "۲۰+", label: "سال دانش گمرکی" },
];

const TarkhisanYar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.title = "ترخیصان‌یار | هوش مصنوعی گمرکی رایگان";
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta(
      "description",
      "ترخیصان‌یار، اولین هوش مصنوعی تخصصی گمرکی ایران؛ مشاوره رایگان ۲۴ ساعته درباره ترخیص کالا، تعرفه، مجوز و مدارک گمرکی."
    );
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://tarkhisun.com/tarkhisan-yar");
  }, []);

  const openBot = () => window.open(TELEGRAM_URL, "_blank", "noopener,noreferrer");

  return (
    <div className="min-h-screen bg-[#fafaf9]">
      <Header />

      <main className="relative overflow-hidden">
        {/* Ambient background orbs */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
          <div className="absolute top-24 -right-32 w-[520px] h-[520px] bg-emerald-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 -left-32 w-[520px] h-[520px] bg-amber-500/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] bg-primary/5 rounded-full blur-[140px]" />
        </div>

        <div dir="rtl" className="relative z-10 flex items-start justify-center px-4 lg:px-8 py-10 lg:py-16">
          <div className="max-w-5xl w-full bg-white/60 backdrop-blur-2xl border border-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(15,23,42,0.12)] overflow-hidden relative">

            {/* Hero */}
            <section className="relative p-8 lg:p-14 text-center overflow-hidden">
              <div aria-hidden className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px]" />
              <div aria-hidden className="absolute -bottom-24 -left-24 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px]" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-white/70 border border-white shadow-sm backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-xs text-slate-600 text-persian">اولین هوش مصنوعی گمرکی ایران — رایگان</span>
                </div>

                <div className="inline-flex items-center justify-center w-28 h-28 mb-8 relative">
                  <div aria-hidden className="absolute inset-0 bg-emerald-500/25 blur-2xl rounded-full scale-125" />
                  <div className="relative bg-gradient-to-br from-[#0f172a] to-[#1e293b] p-6 rounded-[2rem] shadow-2xl border border-white/20">
                    <Bot className="w-12 h-12 text-emerald-400" strokeWidth={1.5} />
                  </div>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0f172a] mb-5 tracking-tight leading-tight text-persian">
                  دستیار هوشمند <span className="text-emerald-600">ترخیصان‌یار</span>
                </h1>
                <p className="text-slate-600 text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-loose text-persian">
                  هوش مصنوعی اختصاصی برای حل پیچیدگی‌های گمرکی، محاسبه دقیق تعرفه‌ها و مشاوره آنی قوانین بازرگانی.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={openBot}
                    className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#0f172a] text-white font-bold shadow-lg shadow-slate-900/20 hover:shadow-emerald-500/20 transition-all hover:-translate-y-0.5"
                  >
                    <Send className="w-5 h-5 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
                    <span className="text-persian">شروع گفتگوی رایگان در تلگرام</span>
                  </button>
                  <a
                    href="#features"
                    className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-white/70 border border-white text-slate-700 hover:bg-white transition-all backdrop-blur-md text-persian"
                  >
                    آشنایی با قابلیت‌ها
                    <ChevronDown className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </section>

            {/* Stats bar */}
            <section className="px-8 lg:px-14 -mt-2">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-white/70 backdrop-blur-md border border-white rounded-3xl p-4 shadow-sm">
                {stats.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div key={i} className="flex items-center gap-3 px-2 py-2">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[#0f172a] text-lg leading-tight"><strong className="font-bonyade-koodak-bold">{s.value}</strong></div>
                        <div className="text-xs text-slate-500 text-persian leading-tight">{s.label}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Features Bento */}
            <section id="features" className="px-8 lg:px-14 py-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-1.5 h-7 rounded-full bg-emerald-500" />
                <h2 className="text-xl md:text-2xl font-bold text-[#0f172a] text-persian">قابلیت‌های ترخیصان‌یار</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {features.map((f, i) => {
                  const Icon = f.icon;
                  const isEmerald = f.tone === "emerald";
                  return (
                    <div
                      key={i}
                      className={`group p-6 bg-white/80 backdrop-blur-md border border-white rounded-3xl transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 ${
                        isEmerald ? "hover:border-emerald-200 hover:shadow-emerald-500/10" : "hover:border-amber-200 hover:shadow-amber-500/10"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${
                          isEmerald ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        <Icon className="w-6 h-6" strokeWidth={2} />
                      </div>
                      <h3 className="text-lg font-bold text-[#0f172a] mb-2 text-persian">{f.title}</h3>
                      <p className="text-slate-500 text-sm leading-loose text-persian">{f.desc}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Expandable dark section + CTA */}
            <section className="px-8 lg:px-14 pb-12">
              <div className="bg-[#0f172a] rounded-[2rem] p-8 lg:p-10 text-white relative overflow-hidden">
                <div aria-hidden className="absolute -top-20 -left-20 w-72 h-72 bg-emerald-500/15 rounded-full blur-[100px]" />
                <div aria-hidden className="absolute top-0 right-0 p-4 opacity-10">
                  <Sparkles className="w-32 h-32" />
                </div>

                <div className="relative z-10">
                  <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-3 text-persian">
                    <span className="w-2 h-8 bg-emerald-500 rounded-full" />
                    ترخیصان‌یار چیست و چگونه کار می‌کند؟
                  </h2>

                  <div className={`text-slate-300 leading-relaxed border-r border-slate-700 pr-6 text-persian space-y-4 transition-all duration-500 ${isOpen ? "" : "max-h-40 overflow-hidden [mask-image:linear-gradient(180deg,#000_60%,transparent)]"}`}>
                    <p>
                      <strong className="text-white">ترخیصان‌یار</strong> اولین و پیشرفته‌ترین سیستم هوش مصنوعی تخصصی گمرکی در ایران است که با بهره‌گیری از پردازش زبان طبیعی و تحلیل هزاران پرونده ترخیصی، مشاوره تخصصی فوری و راهنمایی گام‌به‌گام در تمام مراحل واردات و صادرات ارائه می‌دهد.
                    </p>
                    <p>
                      این سیستم می‌تواند کالا را بر اساس <strong className="text-white">HS Code</strong> شناسایی کند، حقوق ورودی، سود بازرگانی و ارزش افزوده را محاسبه کند، کالاهای <strong className="text-white">ممنوعه و مشروط</strong> را تشخیص دهد و لیست کامل مجوزهای مورد نیاز از وزارت بهداشت، استاندارد و سایر مراجع را ارائه دهد.
                    </p>
                    <p>
                      ترخیصان‌یار همچنین اطلاعات جامعی از گمرکات مختلف ایران شامل بندر شهید رجایی، بندرعباس، بندر امام خمینی، فرودگاه امام خمینی، بندر چابهار و مرزهای زمینی در اختیار کاربران قرار می‌دهد و بهترین مسیر ترخیص را پیشنهاد می‌کند.
                    </p>
                    <p>
                      برخلاف مشاوره‌های سنتی، این ابزار <strong className="text-white">کاملاً رایگان</strong> و <strong className="text-white">۲۴ ساعته</strong> در دسترس است، بر اساس آخرین قوانین به‌روز می‌شود و مخصوص واردکنندگان، صادرکنندگان، بازرگانان، ترخیص‌کاران و شرکت‌های حمل‌ونقل بین‌المللی طراحی شده است.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsOpen((v) => !v)}
                    className="mt-4 inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors text-sm text-persian"
                  >
                    {isOpen ? "بستن توضیحات" : "مشاهده توضیحات کامل"}
                    <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-slate-800 pt-8">
                    <div className="text-right">
                      <span className="block text-emerald-400 font-bold text-lg text-persian">آماده گفتگو هستید؟</span>
                      <span className="text-slate-500 text-xs text-persian">پاسخگویی آنی در تلگرام — بدون ثبت‌نام</span>
                    </div>
                    <button
                      onClick={openBot}
                      className="w-full sm:w-auto px-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-[#0f172a] rounded-2xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/25 hover:-translate-y-0.5"
                    >
                      <strong className="font-bonyade-koodak-bold text-persian">شروع گفتگو در تلگرام</strong>
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TarkhisanYar;
