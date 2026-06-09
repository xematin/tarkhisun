import { Suspense, lazy, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import {
  CreditCard,
  Building2,
  Factory,
  Briefcase,
  Sparkles,
  CheckCircle2,
  FileText,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  Send,
  BookOpen,
  AlertTriangle,
  UserCheck,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitLead, normalizeDigits, isValidIranMobile } from "@/lib/lead-tracking";
import CardConsultDialog from "@/components/business-card/CardConsultDialog";

const Hero3D = lazy(() => import("@/components/services/BusinessCardHero3D"));

const cardTypes = [
  {
    icon: UserCheck,
    title: "کارت بازرگانی حقیقی",
    desc: "ویژه اشخاص حقیقی برای واردات و صادرات شخصی با مدارک هویتی کامل.",
    accent: "from-emerald-500/20 to-teal-500/10",
  },
  {
    icon: Building2,
    title: "کارت بازرگانی حقوقی",
    desc: "مخصوص شرکت‌ها و اشخاص حقوقی ثبت‌شده برای فعالیت تجاری منظم.",
    accent: "from-blue-500/20 to-indigo-500/10",
  },
  {
    icon: Factory,
    title: "تولیدی و خدماتی",
    desc: "کارت ویژه واحدهای تولیدی و شرکت‌های خدماتی دارای پروانه بهره‌برداری.",
    accent: "from-amber-500/20 to-orange-500/10",
  },
  {
    icon: Briefcase,
    title: "کارت موردی",
    desc: "اخذ کارت برای یک محموله مشخص بدون نیاز به ثبت دائمی در اتاق بازرگانی.",
    accent: "from-purple-500/20 to-pink-500/10",
  },
];

const benefits = [
  "واردات و صادرات رسمی کالا",
  "اخذ کوتاژ گمرکی به نام خود",
  "افتتاح اعتبار اسنادی (LC) در بانک",
  "حضور رسمی در نمایشگاه‌های بین‌المللی",
  "استفاده از تسهیلات ارزی و بانکی",
  "ثبت سفارش در سامانه جامع تجارت",
];

const documentsReal = [
  "اصل و کپی شناسنامه و کارت ملی",
  "مدرک تحصیلی (حداقل دیپلم)",
  "گواهی عدم سوءپیشینه",
  "سند مالکیت یا اجاره‌نامه دفتر",
  "کد اقتصادی و گواهی مالیاتی",
  "حساب جاری معتبر بانکی",
];

const documentsLegal = [
  "اساسنامه و آگهی تأسیس شرکت",
  "آخرین آگهی تغییرات روزنامه رسمی",
  "اظهارنامه ثبت شرکت",
  "کارت ملی و شناسنامه مدیرعامل",
  "سند یا اجاره‌نامه دفتر شرکت",
  "گواهی مالیاتی و کد اقتصادی",
];

const steps = [
  { t: "ثبت‌نام در سامانه جامع تجارت", d: "ایجاد پروفایل و دریافت نام کاربری در ntsw.ir" },
  { t: "ثبت‌نام در اتاق بازرگانی", d: "تکمیل اطلاعات و انتخاب اتاق محل فعالیت" },
  { t: "بارگذاری مدارک", d: "آپلود مدارک هویتی، تحصیلی، مالی و دفتر کار" },
  { t: "پرداخت حق عضویت", d: "واریز هزینه عضویت و صدور کارت" },
  { t: "صدور و تحویل کارت", d: "بررسی کارشناسی و صدور کارت در سامانه" },
];

const phoneRe = /^09\d{9}$/;

const BusinessCardService = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cardType, setCardType] = useState("");
  const [province, setProvince] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [consultOpen, setConsultOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "fa");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanPhone = normalizeDigits(phone.trim());
    const cleanProvince = province.trim();
    const cleanNote = note.trim().slice(0, 1000);

    if (cleanName.length < 3 || cleanName.length > 100) {
      toast.error("نام را به‌درستی وارد کنید (۳ تا ۱۰۰ کاراکتر).");
      return;
    }
    if (!isValidIranMobile(cleanPhone)) {
      toast.error("شماره موبایل معتبر نیست. نمونه: 09123456789");
      return;
    }
    if (!cardType) {
      toast.error("نوع کارت بازرگانی را انتخاب کنید.");
      return;
    }

    setSubmitting(true);
    const query =
      `[business-card-service] نام: ${cleanName} | نوع: ${cardType}` +
      (cleanProvince ? ` | استان: ${cleanProvince}` : "") +
      (cleanNote ? ` | توضیح: ${cleanNote}` : "");
    try {
      await submitLead(cleanPhone, query);
      toast.success("درخواست شما ثبت شد. کارشناس ترخیصان به‌زودی تماس می‌گیرد.");
      setName("");
      setPhone("");
      setCardType("");
      setProvince("");
      setNote("");
    } catch {
      toast.error("ارسال با خطا مواجه شد. لطفاً دوباره تلاش کنید.");
    } finally {
      setSubmitting(false);
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "اخذ کارت بازرگانی",
    serviceType: "اخذ کارت بازرگانی",
    description:
      "خدمات اخذ، تمدید و مشاوره کارت بازرگانی حقیقی، حقوقی، تولیدی، خدماتی و موردی در بندرعباس و سراسر ایران.",
    provider: { "@id": "https://tarkhisun.com/#organization" },
    areaServed: { "@type": "Country", name: "ایران" },
    url: "https://tarkhisun.com/services/business-card",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "IRR",
    },
  };

  return (
    <>
      <Helmet>
        <title>اخذ کارت بازرگانی | انواع، مدارک و مراحل صدور</title>
        <meta
          name="description"
          content="اخذ کارت بازرگانی حقیقی، حقوقی، تولیدی، خدماتی و موردی؛ مدارک، مراحل صدور و درخواست آنلاین مشاوره تخصصی در بندرعباس."
        />
        <meta
          name="keywords"
          content="اخذ کارت بازرگانی, کارت بازرگانی حقیقی, کارت بازرگانی حقوقی, کارت بازرگانی تولیدی, کارت بازرگانی موردی, مدارک کارت بازرگانی, تمدید کارت بازرگانی"
        />
        <meta property="og:title" content="اخذ کارت بازرگانی | انواع، مدارک و مراحل صدور" />
        <meta
          property="og:description"
          content="خدمت اخذ و تمدید انواع کارت بازرگانی با مشاوره تخصصی، تهیه مدارک و پیگیری کامل تا صدور."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tarkhisun.com/services/business-card" />
        <meta property="og:locale" content="fa_IR" />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main>
          <PageBreadcrumb
            items={[
              { label: "خدمات", href: "/services" },
              { label: "اخذ کارت بازرگانی" },
            ]}
          />

          {/* Hero */}
          <section className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary to-primary-light" aria-hidden="true" />
            <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse" />
              <div
                className="absolute -bottom-24 -left-24 w-[28rem] h-[28rem] bg-accent-light/20 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "1.5s" }}
              />
            </div>

            <div className="container mx-auto px-4 py-16 lg:py-24 relative" dir="rtl">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="text-white">
                  <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span className="text-sm text-persian">خدمات تخصصی ترخیصان</span>
                  </div>

                  <h1 className="heading-primary !text-white mb-6 text-persian leading-tight">
                    اخذ <strong>کارت بازرگانی</strong> | حقیقی، حقوقی، تولیدی و موردی
                  </h1>

                  <p className="text-lg md:text-xl text-white/85 mb-8 text-persian leading-relaxed">
                    از تهیه مدارک تا ثبت‌نام در اتاق بازرگانی و صدور نهایی کارت؛ تمام مسیر را با تیم متخصص ترخیصان طی کنید.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <a
                      href="#request-form"
                      className="px-6 py-3 rounded-xl bg-white text-primary font-bold text-persian shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all inline-flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      مشاوره رایگان
                    </a>
                    <button
                      type="button"
                      onClick={() => setConsultOpen(true)}
                      className="px-6 py-3 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white font-bold text-persian transition-all inline-flex items-center gap-2"
                    >
                      <BookOpen className="w-4 h-4" />
                      راهنمای کارت بازرگانی و مراحل اخذ آن
                    </button>

                  </div>
                </div>

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

            <div className="relative h-12 bg-gradient-to-b from-transparent to-background" aria-hidden="true" />
          </section>

          {/* Types */}
          <section className="relative py-20 bg-background">
            <div className="container mx-auto px-4 relative" dir="rtl">
              <div className="text-center mb-14 max-w-2xl mx-auto">
                <h2 className="heading-secondary mb-4 text-persian">
                  انواع <strong>کارت بازرگانی</strong>
                </h2>
                <p className="text-muted-foreground text-persian text-lg">
                  بر اساس نوع فعالیت شما، یکی از چهار کارت زیر مناسب است.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {cardTypes.map((c, i) => {
                  const Icon = c.icon;
                  return (
                    <div
                      key={i}
                      className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl p-6 transition-all hover:-translate-y-1 hover:shadow-2xl hover:border-accent/40"
                      style={{ boxShadow: "0 8px 32px -8px hsl(var(--primary) / 0.08)" }}
                    >
                      <div
                        className={`absolute -top-12 -left-12 w-40 h-40 bg-gradient-to-br ${c.accent} rounded-full blur-2xl opacity-70 group-hover:opacity-100 transition-opacity`}
                        aria-hidden="true"
                      />
                      <div className="relative">
                        <div className="w-14 h-14 mb-5 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                          <Icon className="w-7 h-7 text-white" strokeWidth={1.8} />
                        </div>
                        <h3 className="text-lg font-bold mb-3 text-foreground text-persian">
                          <strong>{c.title}</strong>
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed text-persian">
                          {c.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-center mt-10">
                <Link
                  to="/blog/business-card-complete-guide"
                  className="inline-flex items-center gap-2 text-accent-dark font-semibold text-persian hover:gap-3 transition-all"
                >
                  <BookOpen className="w-4 h-4" />
                  مطالعه راهنمای کامل کارت بازرگانی
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section className="relative py-20 bg-gradient-to-br from-secondary/40 via-background to-accent/5">
            <div className="container mx-auto px-4" dir="rtl">
              <div className="text-center mb-12 max-w-2xl mx-auto">
                <h2 className="heading-secondary mb-4 text-persian">
                  <strong>مزایا</strong> و کاربردهای کارت بازرگانی
                </h2>
                <p className="text-muted-foreground text-persian">
                  چرا داشتن کارت بازرگانی برای تجارت بین‌المللی ضروری است؟
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
                {benefits.map((b, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/60 backdrop-blur-xl px-5 py-4"
                  >
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-persian text-foreground">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Documents */}
          <section className="relative py-20 bg-background">
            <div className="container mx-auto px-4" dir="rtl">
              <div className="text-center mb-12 max-w-2xl mx-auto">
                <h2 className="heading-secondary mb-4 text-persian">
                  <strong>مدارک</strong> لازم برای اخذ کارت
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl p-7">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-persian"><strong>اشخاص حقیقی</strong></h3>
                  </div>
                  <ul className="space-y-3">
                    {documentsReal.map((d, i) => (
                      <li key={i} className="flex items-start gap-2 text-persian text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl p-7">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-persian"><strong>اشخاص حقوقی</strong></h3>
                  </div>
                  <ul className="space-y-3">
                    {documentsLegal.map((d, i) => (
                      <li key={i} className="flex items-start gap-2 text-persian text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Steps */}
          <section className="relative py-20 bg-gradient-to-br from-secondary/40 via-background to-accent/5">
            <div className="container mx-auto px-4" dir="rtl">
              <div className="text-center mb-12 max-w-2xl mx-auto">
                <h2 className="heading-secondary mb-4 text-persian">
                  <strong>مراحل</strong> اخذ کارت بازرگانی
                </h2>
              </div>

              <ol className="max-w-3xl mx-auto space-y-4">
                {steps.map((s, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-5 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl p-5"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold flex-shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1 text-persian"><strong>{s.t}</strong></h3>
                      <p className="text-muted-foreground text-persian">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Exempt / Barred */}
          <section className="relative py-20 bg-background">
            <div className="container mx-auto px-4" dir="rtl">
              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-card/60 backdrop-blur-xl p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <UserCheck className="w-7 h-7 text-emerald-500" />
                    <h2 className="text-xl font-bold text-persian"><strong>افراد معاف</strong> از کارت بازرگانی</h2>
                  </div>
                  <p className="text-muted-foreground text-persian leading-relaxed">
                    شرکت‌های دولتی، مرزنشینان، ملوانان، کارگران ایرانی شاغل در خارج، تعاونی‌های مرزنشینی و واردات نمونه تجاری در سقف مشخص، نیازی به کارت بازرگانی ندارند.
                  </p>
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-rose-500/30 bg-card/60 backdrop-blur-xl p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="w-7 h-7 text-rose-500" />
                    <h2 className="text-xl font-bold text-persian"><strong>افراد محروم</strong> از اخذ کارت</h2>
                  </div>
                  <p className="text-muted-foreground text-persian leading-relaxed">
                    کارمندان دولت، افراد دارای سوءپیشینه مؤثر، ورشکستگان به تقصیر، محجورین و افراد زیر سن قانونی، از اخذ کارت بازرگانی محروم هستند.
                  </p>
                </div>
              </div>

              <div className="text-center mt-10">
                <Link
                  to="/blog/business-card-complete-guide"
                  className="inline-flex items-center gap-2 text-accent-dark font-semibold text-persian hover:gap-3 transition-all"
                >
                  <BookOpen className="w-4 h-4" />
                  جزئیات کامل افراد معاف و محروم در مقاله
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* Request Form */}
          <section id="request-form" className="relative py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
            <div className="container mx-auto px-4" dir="rtl">
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-accent/10 border border-accent/20">
                    <ShieldCheck className="w-4 h-4 text-accent-dark" />
                    <span className="text-sm text-persian text-accent-dark">رایگان و بدون تعهد</span>
                  </div>
                  <h2 className="heading-secondary mb-3 text-persian">
                    فرم <strong>درخواست</strong> کارت بازرگانی
                  </h2>
                  <p className="text-muted-foreground text-persian">
                    اطلاعات زیر را تکمیل کنید؛ کارشناس ترخیصان در کمتر از ۲۴ ساعت با شما تماس می‌گیرد.
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 backdrop-blur-xl p-7 md:p-9 space-y-5"
                  style={{ boxShadow: "0 12px 40px -10px hsl(var(--primary) / 0.15)" }}
                >
                  <div>
                    <Label htmlFor="bc-name" className="text-persian mb-2 block">نام و نام خانوادگی</Label>
                    <Input
                      id="bc-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      maxLength={100}
                      required
                      className="text-persian"
                      placeholder="مثلاً علی محمدی"
                    />
                  </div>

                  <div>
                    <Label htmlFor="bc-phone" className="text-persian mb-2 block">شماره موبایل</Label>
                    <Input
                      id="bc-phone"
                      type="tel"
                      dir="ltr"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      maxLength={11}
                      required
                      placeholder="09xxxxxxxxx"
                    />
                  </div>

                  <div>
                    <Label htmlFor="bc-type" className="text-persian mb-2 block">نوع کارت</Label>
                    <Select value={cardType} onValueChange={setCardType}>
                      <SelectTrigger id="bc-type" className="text-persian">
                        <SelectValue placeholder="انتخاب کنید" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="حقیقی">حقیقی</SelectItem>
                        <SelectItem value="حقوقی">حقوقی</SelectItem>
                        <SelectItem value="تولیدی">تولیدی</SelectItem>
                        <SelectItem value="خدماتی">خدماتی</SelectItem>
                        <SelectItem value="موردی">موردی</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="bc-prov" className="text-persian mb-2 block">استان (اختیاری)</Label>
                    <Input
                      id="bc-prov"
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      maxLength={50}
                      className="text-persian"
                      placeholder="مثلاً هرمزگان"
                    />
                  </div>

                  <div>
                    <Label htmlFor="bc-note" className="text-persian mb-2 block">توضیحات (اختیاری)</Label>
                    <Textarea
                      id="bc-note"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      maxLength={1000}
                      rows={4}
                      className="text-persian"
                      placeholder="هرگونه توضیح یا سؤال خود را اینجا بنویسید..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-l from-accent to-primary text-white font-bold text-persian shadow-xl hover:shadow-2xl transition-all disabled:opacity-60 inline-flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {submitting ? "در حال ارسال..." : "ارسال درخواست"}
                  </button>

                  <p className="text-xs text-muted-foreground text-center text-persian">
                    با ارسال این فرم با تماس کارشناسان ترخیصان موافقت می‌کنید.
                  </p>
                </form>
              </div>
            </div>
          </section>

          {/* Related article bar */}
          <section className="py-10 bg-background">
            <div className="container mx-auto px-4" dir="rtl">
              <Link
                to="/blog/business-card-complete-guide"
                className="group max-w-4xl mx-auto flex items-center justify-between gap-4 rounded-2xl border border-accent/30 bg-gradient-to-l from-accent/10 to-primary/5 backdrop-blur-xl p-6 hover:border-accent/60 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground text-persian mb-1">
                      مطالعه مقاله کامل کارت بازرگانی
                    </div>
                    <div className="text-sm text-muted-foreground text-persian">
                      راهنمای جامع انواع، شرایط، معایب و افراد معاف و محروم
                    </div>
                  </div>
                </div>
                <ArrowLeft className="w-6 h-6 text-accent-dark group-hover:-translate-x-1 transition-transform" />
              </Link>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4" dir="rtl">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary-light to-accent p-10 md:p-16 text-center text-white">
                <div className="absolute inset-0 opacity-30" aria-hidden="true">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-300/20 rounded-full blur-3xl" />
                </div>
                <div className="relative max-w-2xl mx-auto">
                  <CreditCard className="w-12 h-12 mx-auto mb-4 text-amber-300" />
                  <h2 className="heading-secondary !text-white mb-4 text-persian">
                    نیاز به <strong>مشاوره سریع‌تر</strong> دارید؟
                  </h2>
                  <p className="text-white/85 mb-8 text-lg text-persian">
                    کارشناسان ترخیصان آماده پاسخگویی فوری و ارائه مشاوره رایگان هستند.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <a
                      href="tel:+989177380080"
                      className="px-7 py-3.5 rounded-xl bg-white text-primary font-bold text-persian shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all"
                    >
                      تماس مستقیم
                    </a>
                    <button
                      disabled
                      className="px-7 py-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/40 text-white/60 font-bold text-persian cursor-not-allowed opacity-60"
                    >
                      چت با ترخیصان‌یار
                    </button>
                    <Link
                      to="/services"
                      className="px-7 py-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/40 text-white font-bold text-persian hover:bg-white/20 transition-all inline-flex items-center gap-2"
                    >
                      <ArrowRight className="w-4 h-4" />
                      سایر خدمات
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
      <CardConsultDialog open={consultOpen} onOpenChange={setConsultOpen} />
    </>
  );
};

export default BusinessCardService;
