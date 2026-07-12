import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleBreadcrumb from "@/components/ArticleBreadcrumb";
import RelatedArticles from "@/components/RelatedArticles";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Calendar,
  Clock,
  User,
  AlertCircle,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import ArticleImage from "@/components/ArticleImage";

const ExportCardGuide = () => {
  useEffect(() => {
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "fa");
    window.scrollTo(0, 0);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "کارت صادراتی چیست؟ تفاوت با کارت بازرگانی + نحوه دریافت فوری ۱۴۰۴",
    description:
      "راهنمای کامل کارت صادراتی: تعریف، تفاوت با کارت بازرگانی، مدارک لازم، شرایط دریافت و مراحل صدور فوری در سال ۱۴۰۴",
    image: "https://tarkhisun.com/images/blog/export-card-documents.webp",
    author: {
      "@type": "Organization",
      name: "ترخیصان",
      url: "https://tarkhisun.com",
    },
    publisher: {
      "@type": "Organization",
      name: "ترخیصان",
      logo: {
        "@type": "ImageObject",
        url: "https://tarkhisun.com/logo.png",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "بندرعباس",
        addressRegion: "هرمزگان",
        addressCountry: "IR",
      },
    },
    datePublished: "2025-12-09",
    dateModified: "2025-12-09",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://tarkhisun.com/blog/export-card-complete-guide",
    },
    articleSection: "تجارت بین‌الملل",
    wordCount: 2500,
    keywords: "کارت صادراتی, تفاوت کارت صادراتی و بازرگانی, دریافت کارت صادراتی, صادرات ایران, مجوز صادرات",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "خانه", item: "https://tarkhisun.com" },
      { "@type": "ListItem", position: 2, name: "بلاگ", item: "https://tarkhisun.com/blog" },
      { "@type": "ListItem", position: 3, name: "کارت صادراتی چیست؟" },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "تفاوت کارت صادراتی با کارت بازرگانی چیست؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "کارت بازرگانی مجوز عمومی واردات و صادرات است، اما کارت صادراتی مختص فعالیت‌های صادراتی بوده و شرایط دریافت آسان‌تری دارد. کارت صادراتی برای صادرکنندگان کوچک و متوسط مناسب‌تر است.",
        },
      },
      {
        "@type": "Question",
        name: "مدت زمان صدور کارت صادراتی چقدر است؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "با ارائه مدارک کامل، کارت صادراتی معمولاً ظرف ۷ تا ۱۴ روز کاری صادر می‌شود. در صورت استفاده از خدمات فوری، این زمان به ۳ تا ۵ روز کاهش می‌یابد.",
        },
      },
      {
        "@type": "Question",
        name: "آیا بدون کارت بازرگانی می‌توان کارت صادراتی گرفت؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "بله، کارت صادراتی به‌صورت مستقل قابل دریافت است و نیازی به داشتن کارت بازرگانی نیست. این یکی از مزایای اصلی کارت صادراتی برای صادرکنندگان جدید است.",
        },
      },
      {
        "@type": "Question",
        name: "هزینه صدور کارت صادراتی در سال ۱۴۰۴ چقدر است؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "هزینه صدور کارت صادراتی شامل حق عضویت اتاق بازرگانی و هزینه صدور کارت است که بسته به نوع شخص حقیقی یا حقوقی متفاوت بوده و معمولاً بین ۵ تا ۱۵ میلیون تومان است.",
        },
      },
    ],
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://tarkhisun.com/blog/export-card-complete-guide" />
        <title>کارت صادراتی چیست؟ تفاوت با کارت بازرگانی + نحوه دریافت فوری ۱۴۰۴</title>
        <meta
          name="description"
          content="راهنمای کارت صادراتی: تعریف، تفاوت با کارت بازرگانی، مدارک، شرایط و مراحل دریافت فوری در ۱۴۰۴"
        />
        <meta
          name="keywords"
          content="کارت صادراتی, تفاوت کارت صادراتی و بازرگانی, دریافت کارت صادراتی, صادرات ایران, مجوز صادرات, کارت صادرات, شرایط کارت صادراتی, مدارک کارت صادراتی, هزینه کارت صادراتی"
        />
        
        <meta property="og:title" content="کارت صادراتی چیست؟ تفاوت با کارت بازرگانی + دریافت فوری ۱۴۰۴" />
        <meta
          property="og:description"
          content="راهنمای جامع کارت صادراتی: تعریف، مقایسه با کارت بازرگانی، مدارک و مراحل صدور"
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://tarkhisun.com/blog/export-card-complete-guide" />
        <meta property="og:locale" content="fa_IR" />
        <meta property="og:site_name" content="ترخیصان" />
        <meta property="og:image" content="https://tarkhisun.com/images/blog/export-card-documents.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="کارت صادراتی چیست؟ تفاوت با کارت بازرگانی + دریافت فوری" />
        <meta name="twitter:description" content="راهنمای کامل کارت صادراتی با شرایط و مدارک لازم" />
        <meta name="twitter:image" content="https://tarkhisun.com/images/blog/export-card-documents.webp" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <main>
          <ArticleBreadcrumb
            category="تجارت بین‌الملل"
            articleTitle="کارت صادراتی چیست؟ تفاوت با کارت بازرگانی + نحوه دریافت فوری ۱۴۰۴"
          />

          {/* Hero Section */}
          <section className="py-20 bg-gradient-to-br from-secondary to-white">
            <div className="container mx-auto px-4" dir="rtl">
              <div className="max-w-4xl mx-auto">
                <Link
                  to="/blog"
                  className="inline-flex items-center text-accent hover:text-accent/80 mb-6 transition-colors text-persian"
                >
                  <ArrowRight className="ml-2 h-4 w-4" />
                  بازگشت به بلاگ
                </Link>

                <h1 className="heading-primary mb-6 text-persian">
                  کارت صادراتی چیست؟ تفاوت با کارت بازرگانی + نحوه دریافت فوری ۱۴۰۴
                </h1>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-8 text-persian">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>۱۴۰۴/۹/۱۹</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>۱۵ دقیقه مطالعه</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>تیم ترخیصان</span>
                  </div>
                </div>

                <p className="text-xl text-muted-foreground text-persian leading-relaxed">
                  <strong>کارت صادراتی</strong> یکی از مجوزهای کلیدی برای ورود به بازار صادرات ایران است. در این مقاله
                  به‌طور کامل با تعریف کارت صادراتی، تفاوت آن با{" "}
                  <Link to="/blog/business-card-complete-guide" className="text-accent hover:underline">
                    کارت بازرگانی
                  </Link>
                  ، شرایط دریافت و نحوه اخذ فوری آن در سال ۱۴۰۴ آشنا می‌شوید.
                </p>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <article className="py-16">
            <div className="container mx-auto px-4" dir="rtl">
              <div className="max-w-4xl mx-auto prose prose-lg">
                {/* Hero Image */}
                <ArticleImage
                  src="/images/blog/export-card-complete-guide.webp"
                  alt="مدارک و فرم‌های مربوط به کارت صادراتی ایران"
                  caption="کارت صادراتی مجوز رسمی فعالیت در بازار صادرات ایران است"
                  priority
                />

                {/* Definition Section */}
                <section className="mb-12">
                  <h2 className="heading-secondary mb-6 text-persian">کارت صادراتی چیست؟</h2>
                  <p className="text-body mb-6 text-persian">
                    <strong>کارت صادراتی</strong> مجوزی است که توسط اتاق بازرگانی، صنایع، معادن و کشاورزی ایران صادر
                    می‌شود و به دارنده آن امکان می‌دهد تا کالاهای تولیدی یا بازرگانی خود را به کشورهای دیگر صادر کند.
                    این کارت به‌ویژه برای تولیدکنندگان و بازرگانانی که قصد ورود به{" "}
                    <Link to="/blog/import-export-guide-iran" className="text-accent hover:underline">
                      بازار صادرات
                    </Link>{" "}
                    را دارند، ضروری است.
                  </p>
                  <p className="text-body mb-6 text-persian">
                    برخلاف تصور عمومی، کارت صادراتی با کارت بازرگانی متفاوت است. کارت صادراتی به‌صورت اختصاصی برای
                    فعالیت‌های صادراتی طراحی شده و شرایط دریافت آسان‌تری نسبت به کارت بازرگانی دارد. این ویژگی باعث شده
                    تا صادرکنندگان کوچک و متوسط بتوانند راحت‌تر وارد بازار صادرات شوند.
                  </p>

                  <div className="bg-accent/10 border-r-4 border-accent rounded-lg p-6 mb-6">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                      <div className="text-persian">
                        <strong className="block mb-2">نکته مهم:</strong>
                        <span>
                          با داشتن کارت صادراتی می‌توانید از تسهیلات و مشوق‌های صادراتی دولت مانند بازگشت ارز،
                          معافیت‌های مالیاتی و تسهیلات بانکی بهره‌مند شوید.
                        </span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Difference Section */}
                <section className="mb-12">
                  <h2 className="heading-secondary mb-6 text-persian">تفاوت کارت صادراتی با کارت بازرگانی</h2>
                  <p className="text-body mb-6 text-persian">
                    یکی از سؤالات رایج در میان فعالان تجاری، تفاوت کارت صادراتی و کارت بازرگانی است. در جدول زیر این
                    تفاوت‌ها را به‌صورت کامل بررسی می‌کنیم:
                  </p>

                  <div className="overflow-x-auto mb-8">
                    <table className="w-full border-collapse border border-border rounded-lg">
                      <thead className="bg-secondary">
                        <tr>
                          <th className="border border-border p-4 text-persian text-right">ویژگی</th>
                          <th className="border border-border p-4 text-persian text-right">کارت صادراتی</th>
                          <th className="border border-border p-4 text-persian text-right">کارت بازرگانی</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border p-4 text-persian">
                            <strong>حوزه فعالیت</strong>
                          </td>
                          <td className="border border-border p-4 text-persian">فقط صادرات</td>
                          <td className="border border-border p-4 text-persian">واردات و صادرات</td>
                        </tr>
                        <tr className="bg-secondary/30">
                          <td className="border border-border p-4 text-persian">
                            <strong>شرایط دریافت</strong>
                          </td>
                          <td className="border border-border p-4 text-persian">آسان‌تر</td>
                          <td className="border border-border p-4 text-persian">سخت‌تر</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-4 text-persian">
                            <strong>هزینه صدور</strong>
                          </td>
                          <td className="border border-border p-4 text-persian">کمتر</td>
                          <td className="border border-border p-4 text-persian">بیشتر</td>
                        </tr>
                        <tr className="bg-secondary/30">
                          <td className="border border-border p-4 text-persian">
                            <strong>مناسب برای</strong>
                          </td>
                          <td className="border border-border p-4 text-persian">تولیدکنندگان، SMEها</td>
                          <td className="border border-border p-4 text-persian">بازرگانان بزرگ</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-4 text-persian">
                            <strong>نیاز به کد اقتصادی</strong>
                          </td>
                          <td className="border border-border p-4 text-persian">بله</td>
                          <td className="border border-border p-4 text-persian">بله</td>
                        </tr>
                        <tr className="bg-secondary/30">
                          <td className="border border-border p-4 text-persian">
                            <strong>اعتبار کارت</strong>
                          </td>
                          <td className="border border-border p-4 text-persian">یک ساله</td>
                          <td className="border border-border p-4 text-persian">یک ساله</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="grid gap-6 mb-6">
                    <Card className="card-service">
                      <CardHeader>
                        <CardTitle className="text-persian flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-accent" />
                          مزایای کارت صادراتی نسبت به کارت بازرگانی
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2 text-persian">
                            <span className="text-accent font-bold">•</span>
                            <span>شرایط دریافت آسان‌تر برای صادرکنندگان جدید</span>
                          </li>
                          <li className="flex items-start gap-2 text-persian">
                            <span className="text-accent font-bold">•</span>
                            <span>هزینه صدور و تمدید کمتر</span>
                          </li>
                          <li className="flex items-start gap-2 text-persian">
                            <span className="text-accent font-bold">•</span>
                            <span>فرآیند صدور سریع‌تر</span>
                          </li>
                          <li className="flex items-start gap-2 text-persian">
                            <span className="text-accent font-bold">•</span>
                            <span>مناسب برای کسب‌وکارهای کوچک و متوسط</span>
                          </li>
                          <li className="flex items-start gap-2 text-persian">
                            <span className="text-accent font-bold">•</span>
                            <span>دسترسی به مشوق‌های صادراتی دولت</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* Image 2 */}
                <ArticleImage
                  src="/images/blog/export-card-office.webp"
                  alt="محیط اداری و فرآیند دریافت کارت صادراتی"
                  caption="فرآیند دریافت کارت صادراتی از طریق اتاق بازرگانی انجام می‌شود"
                />

                {/* Requirements Section */}
                <section className="mb-12">
                  <h2 className="heading-secondary mb-6 text-persian">شرایط دریافت کارت صادراتی در سال ۱۴۰۴</h2>

                  <div className="bg-secondary/30 rounded-xl p-6 mb-6">
                    <h3 className="heading-tertiary mb-4 text-persian">شرایط عمومی:</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-persian">
                        <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                        <span>داشتن تابعیت ایرانی (برای اشخاص حقیقی)</span>
                      </li>
                      <li className="flex items-start gap-3 text-persian">
                        <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                        <span>دارا بودن حداقل ۱۸ سال سن</span>
                      </li>
                      <li className="flex items-start gap-3 text-persian">
                        <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                        <span>عدم محکومیت کیفری مؤثر بر فعالیت تجاری</span>
                      </li>
                      <li className="flex items-start gap-3 text-persian">
                        <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                        <span>
                          داشتن{" "}
                          <Link to="/blog/ntsw-complete-guide" className="text-accent hover:underline">
                            کد اقتصادی
                          </Link>{" "}
                          معتبر
                        </span>
                      </li>
                      <li className="flex items-start gap-3 text-persian">
                        <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                        <span>عضویت در اتاق بازرگانی استان محل فعالیت</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-secondary/30 rounded-xl p-6">
                    <h3 className="heading-tertiary mb-4 text-persian">شرایط ویژه برای شرکت‌ها (اشخاص حقوقی):</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-persian">
                        <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                        <span>ثبت رسمی شرکت در اداره ثبت شرکت‌ها</span>
                      </li>
                      <li className="flex items-start gap-3 text-persian">
                        <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                        <span>دریافت شناسه ملی شرکت</span>
                      </li>
                      <li className="flex items-start gap-3 text-persian">
                        <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                        <span>فعالیت صادراتی در موضوع اساسنامه شرکت</span>
                      </li>
                      <li className="flex items-start gap-3 text-persian">
                        <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                        <span>ارائه صورت‌های مالی تأیید شده</span>
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Documents Section */}
                <section className="mb-12">
                  <h2 className="heading-secondary mb-6 text-persian">مدارک لازم برای صدور کارت صادراتی</h2>

                  <Card className="card-service mb-6">
                    <CardHeader>
                      <CardTitle className="text-persian flex items-center gap-2">
                        <FileText className="w-5 h-5 text-accent" />
                        مدارک اشخاص حقیقی
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-persian">
                          <span className="text-accent font-bold">۱.</span>
                          <span>تصویر شناسنامه و کارت ملی</span>
                        </li>
                        <li className="flex items-start gap-2 text-persian">
                          <span className="text-accent font-bold">۲.</span>
                          <span>عکس پرسنلی ۴×۳ (۲ قطعه)</span>
                        </li>
                        <li className="flex items-start gap-2 text-persian">
                          <span className="text-accent font-bold">۳.</span>
                          <span>گواهی عدم سوء پیشینه کیفری</span>
                        </li>
                        <li className="flex items-start gap-2 text-persian">
                          <span className="text-accent font-bold">۴.</span>
                          <span>گواهی کد اقتصادی از سازمان امور مالیاتی</span>
                        </li>
                        <li className="flex items-start gap-2 text-persian">
                          <span className="text-accent font-bold">۵.</span>
                          <span>فرم تکمیل‌شده درخواست کارت صادراتی</span>
                        </li>
                        <li className="flex items-start gap-2 text-persian">
                          <span className="text-accent font-bold">۶.</span>
                          <span>رسید پرداخت حق عضویت اتاق بازرگانی</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="card-service">
                    <CardHeader>
                      <CardTitle className="text-persian flex items-center gap-2">
                        <FileText className="w-5 h-5 text-accent" />
                        مدارک اشخاص حقوقی (شرکت‌ها)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-persian">
                          <span className="text-accent font-bold">۱.</span>
                          <span>روزنامه رسمی تأسیس و آخرین تغییرات شرکت</span>
                        </li>
                        <li className="flex items-start gap-2 text-persian">
                          <span className="text-accent font-bold">۲.</span>
                          <span>اساسنامه شرکت</span>
                        </li>
                        <li className="flex items-start gap-2 text-persian">
                          <span className="text-accent font-bold">۳.</span>
                          <span>تصویر شناسنامه و کارت ملی مدیرعامل و اعضای هیئت‌مدیره</span>
                        </li>
                        <li className="flex items-start gap-2 text-persian">
                          <span className="text-accent font-bold">۴.</span>
                          <span>گواهی کد اقتصادی شرکت</span>
                        </li>
                        <li className="flex items-start gap-2 text-persian">
                          <span className="text-accent font-bold">۵.</span>
                          <span>گواهی عدم سوء پیشینه مدیرعامل</span>
                        </li>
                        <li className="flex items-start gap-2 text-persian">
                          <span className="text-accent font-bold">۶.</span>
                          <span>اظهارنامه مالیاتی آخرین سال مالی</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </section>

                {/* Process Section */}
                <section className="mb-12">
                  <h2 className="heading-secondary mb-6 text-persian">مراحل دریافت فوری کارت صادراتی</h2>

                  <div className="space-y-4 mb-8">
                    <div className="flex gap-4 p-4 bg-secondary/30 rounded-lg">
                      <div className="flex-shrink-0 w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center font-bold">
                        ۱
                      </div>
                      <div className="text-persian">
                        <h3 className="font-bold mb-2">ثبت‌نام در سامانه جامع تجارت</h3>
                        <p className="text-muted-foreground">
                          ابتدا در{" "}
                          <Link to="/blog/ntsw-complete-guide" className="text-accent hover:underline">
                            سامانه ntsw.com
                          </Link>{" "}
                          ثبت‌نام کرده و احراز هویت انجام دهید.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 p-4 bg-secondary/30 rounded-lg">
                      <div className="flex-shrink-0 w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center font-bold">
                        ۲
                      </div>
                      <div className="text-persian">
                        <h3 className="font-bold mb-2">عضویت در اتاق بازرگانی</h3>
                        <p className="text-muted-foreground">
                          به اتاق بازرگانی استان محل فعالیت مراجعه کرده و فرم عضویت را تکمیل کنید.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 p-4 bg-secondary/30 rounded-lg">
                      <div className="flex-shrink-0 w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center font-bold">
                        ۳
                      </div>
                      <div className="text-persian">
                        <h3 className="font-bold mb-2">ارائه مدارک</h3>
                        <p className="text-muted-foreground">
                          تمامی مدارک لازم را به‌صورت فیزیکی و الکترونیکی ارائه دهید.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 p-4 bg-secondary/30 rounded-lg">
                      <div className="flex-shrink-0 w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center font-bold">
                        ۴
                      </div>
                      <div className="text-persian">
                        <h3 className="font-bold mb-2">پرداخت هزینه‌ها</h3>
                        <p className="text-muted-foreground">
                          حق عضویت اتاق بازرگانی و هزینه صدور کارت را پرداخت نمایید.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 p-4 bg-secondary/30 rounded-lg">
                      <div className="flex-shrink-0 w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center font-bold">
                        ۵
                      </div>
                      <div className="text-persian">
                        <h3 className="font-bold mb-2">دریافت کارت</h3>
                        <p className="text-muted-foreground">
                          پس از تأیید مدارک، کارت صادراتی ظرف ۷ تا ۱۴ روز کاری صادر می‌شود.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border-r-4 border-yellow-500 rounded-lg p-6">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                      <div className="text-persian">
                        <strong className="block mb-2">نکته مهم برای دریافت فوری:</strong>
                        <span>
                          برای دریافت فوری کارت صادراتی (۳ تا ۵ روز کاری)، می‌توانید از خدمات پیگیری ویژه اتاق بازرگانی
                          استفاده کنید. همچنین تکمیل دقیق مدارک و عدم نقص در پرونده، سرعت صدور را افزایش می‌دهد.
                        </span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Costs Section */}
                <section className="mb-12">
                  <h2 className="heading-secondary mb-6 text-persian">هزینه‌های صدور کارت صادراتی در سال ۱۴۰۴</h2>
                  <p className="text-body mb-6 text-persian">
                    هزینه‌های صدور کارت صادراتی شامل چند بخش است که بسته به نوع شخص حقیقی یا حقوقی و همچنین استان محل
                    فعالیت متفاوت است:
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <Card className="card-service">
                      <CardHeader>
                        <CardTitle className="text-persian">اشخاص حقیقی</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-persian">
                          <li>حق عضویت اتاق: ۳ تا ۵ میلیون تومان</li>
                          <li>هزینه صدور کارت: ۲ تا ۳ میلیون تومان</li>
                          <li className="font-bold border-t pt-2 mt-2">مجموع تقریبی: ۵ تا ۸ میلیون تومان</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="card-service">
                      <CardHeader>
                        <CardTitle className="text-persian">اشخاص حقوقی</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-persian">
                          <li>حق عضویت اتاق: ۵ تا ۱۰ میلیون تومان</li>
                          <li>هزینه صدور کارت: ۳ تا ۵ میلیون تومان</li>
                          <li className="font-bold border-t pt-2 mt-2">مجموع تقریبی: ۸ تا ۱۵ میلیون تومان</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* Benefits Section */}
                <section className="mb-12">
                  <h2 className="heading-secondary mb-6 text-persian">مزایای داشتن کارت صادراتی</h2>

                  <div className="grid gap-4">
                    {[
                      "امکان صادرات قانونی کالا به تمام کشورها",
                      "بهره‌مندی از مشوق‌های صادراتی و یارانه‌های دولتی",
                      "دسترسی به تسهیلات بانکی ویژه صادرکنندگان",
                      "معافیت از برخی مالیات‌های مرتبط با صادرات",
                      "عضویت در اتاق بازرگانی و دسترسی به شبکه تجاری",
                      "امکان شرکت در نمایشگاه‌های بین‌المللی",
                      "دریافت گواهی مبدأ برای کالاهای صادراتی",
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-center gap-3 p-4 bg-secondary/30 rounded-lg text-persian">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* FAQ Section */}
                <section className="mb-12">
                  <h2 className="heading-secondary mb-6 text-persian">سؤالات متداول درباره کارت صادراتی</h2>

                  <div className="space-y-4">
                    <Card className="card-service">
                      <CardHeader>
                        <CardTitle className="text-persian text-lg">
                          آیا بدون کارت بازرگانی می‌توان کارت صادراتی گرفت؟
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-body text-persian">
                          بله، کارت صادراتی به‌صورت مستقل قابل دریافت است و نیازی به داشتن کارت بازرگانی نیست. این یکی
                          از مزایای اصلی کارت صادراتی برای صادرکنندگان جدید است.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="card-service">
                      <CardHeader>
                        <CardTitle className="text-persian text-lg">مدت اعتبار کارت صادراتی چقدر است؟</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-body text-persian">
                          اعتبار کارت صادراتی یک سال است و باید قبل از انقضا تمدید شود. فرآیند تمدید ساده‌تر از صدور
                          اولیه بوده و معمولاً ظرف ۳ تا ۵ روز انجام می‌شود.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="card-service">
                      <CardHeader>
                        <CardTitle className="text-persian text-lg">
                          آیا با کارت صادراتی می‌توان واردات هم انجام داد؟
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-body text-persian">
                          خیر، کارت صادراتی فقط مجوز صادرات را می‌دهد. برای فعالیت در حوزه واردات باید{" "}
                          <Link to="/blog/business-card-complete-guide" className="text-accent hover:underline">
                            کارت بازرگانی
                          </Link>{" "}
                          دریافت کنید که شامل هر دو فعالیت واردات و صادرات می‌شود.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* Conclusion */}
                <section className="mb-12">
                  <h2 className="heading-secondary mb-6 text-persian">جمع‌بندی</h2>
                  <p className="text-body mb-6 text-persian">
                    <strong>کارت صادراتی</strong> یکی از مهم‌ترین مجوزها برای ورود به بازار صادرات ایران است. این کارت
                    با شرایط آسان‌تر و هزینه کمتر نسبت به کارت بازرگانی، فرصت مناسبی برای تولیدکنندگان و بازرگانان کوچک
                    و متوسط فراهم می‌کند. با رعایت مراحل و ارائه مدارک کامل، می‌توانید ظرف ۷ تا ۱۴ روز کاری کارت صادراتی
                    خود را دریافت کنید.
                  </p>
                  <p className="text-body text-persian">
                    برای دریافت مشاوره تخصصی در زمینه صدور کارت صادراتی و{" "}
                    <Link
                      to="/blog/zero-to-hundred-bandar-abbas-customs-clearance"
                      className="text-accent hover:underline"
                    >
                      ترخیص کالا از گمرک
                    </Link>
                    ، با کارشناسان ترخیصان تماس بگیرید.
                  </p>
                </section>

                {/* CTA Section */}
                <section className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-8 text-center mb-12">
                  <h3 className="heading-tertiary mb-4 text-persian">نیاز به مشاوره در زمینه صادرات دارید؟</h3>
                  <p className="text-body mb-6 text-persian">
                    کارشناسان ترخیصان آماده ارائه مشاوره تخصصی در زمینه صدور کارت صادراتی و امور گمرکی هستند.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild className="btn-primary text-persian">
                      <a href="tel:+989177380080">تماس: ۰۹۱۷۷۳۸۰۰۸۰</a>
                    </Button>
                    <Button asChild variant="outline" className="text-persian">
                      <Link to="/#contact">درخواست مشاوره رایگان</Link>
                    </Button>
                  </div>
                </section>
              </div>
            </div>
          </article>

          {/* Related Articles */}
          <section className="py-16 bg-secondary/30">
            <div className="container mx-auto px-4" dir="rtl">
              <RelatedArticles currentPostId={23} limit={3} />
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ExportCardGuide;
