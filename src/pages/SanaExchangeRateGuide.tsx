import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleBreadcrumb from "@/components/ArticleBreadcrumb";
import RelatedArticles from "@/components/RelatedArticles";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, DollarSign, TrendingUp, Scale, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import ArticleImage from "@/components/ArticleImage";

const SanaExchangeRateGuide = () => {
  useEffect(() => {
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "fa");
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "تفاوت ارز سنا و ارز نیمایی چیست؟ راهنمای کامل",
    description:
      "راهنمای جامع تفاوت ارز سنا (SANA) و ارز نیمایی (NIMA)، نحوه تخصیص، نرخ‌ها، مزایا و معایب هر کدام برای واردات و صادرات",
    image: "https://tarkhisun.com/og-image.jpg",
    datePublished: "2025-10-03",
    dateModified: "2025-10-03",
    author: {
      "@type": "Organization",
      name: "تیم ترخیصان",
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
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://tarkhisun.com/blog/sana-exchange-rate-guide",
    },
    keywords: "ارز سنا, ارز نیمایی, SANA, NIMA, تفاوت ارز سنا و نیمایی, نرخ ارز گمرکی, تخصیص ارز",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "خانه",
        item: "https://tarkhisun.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "بلاگ",
        item: "https://tarkhisun.com/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "تفاوت ارز سنا و نیمایی",
      },
    ],
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://tarkhisun.com/blog/sana-nima-exchange-rate-difference-guide" />
        <title>تفاوت ارز سنا و ارز نیمایی چیست؟ راهنمای کامل</title>
        <meta
          name="description"
          content="راهنمای تفاوت ارز سنا (SANA) و نیمایی (NIMA): نحوه تخصیص، نرخ‌ها و کاربرد در واردات و صادرات"
        />
        <meta
          name="keywords"
          content="ارز سنا, ارز نیمایی, SANA, NIMA, تفاوت ارز سنا و نیمایی, نرخ ارز گمرکی, تخصیص ارز, واردات, صادرات, گمرک, سامانه نیما, سامانه سنا"
        />
        
        <meta property="og:title" content="تفاوت ارز سنا و ارز نیمایی چیست؟ راهنمای کامل" />
        <meta
          property="og:description"
          content="راهنمای جامع تفاوت ارز سنا (SANA) و ارز نیمایی (NIMA)، نحوه تخصیص، نرخ‌ها و کاربرد در واردات و صادرات"
        />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="fa_IR" />
        <meta property="og:url" content="https://tarkhisun.com/blog/sana-exchange-rate-guide" />
        <meta property="og:site_name" content="ترخیصان" />
        <meta property="og:image" content="https://tarkhisun.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="تفاوت ارز سنا و ارز نیمایی چیست؟ راهنمای کامل" />
        <meta
          name="twitter:description"
          content="راهنمای جامع تفاوت ارز سنا و ارز نیمایی و نحوه استفاده در واردات و صادرات"
        />
        <meta name="twitter:image" content="https://tarkhisun.com/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <main>
          <ArticleBreadcrumb category="تجارت بین‌الملل" articleTitle="تفاوت ارز سنا و ارز نیمایی چیست؟ راهنمای کامل" />

          {/* Hero Section */}
          <section className="py-20 bg-gradient-to-br from-secondary to-white">
            <div className="container mx-auto px-4" dir="rtl">
              <div className="max-w-4xl mx-auto">
                <Link to="/blog">
                  <Button variant="ghost" className="mb-6 text-persian">
                    <ArrowRight className="ml-2 h-4 w-4" />
                    بازگشت به بلاگ
                  </Button>
                </Link>

                <h1 className="heading-primary mb-6 text-persian">
                  تفاوت ارز سنا و ارز نیمایی چیست؟
                  <br />
                  <span className="text-accent">راهنمای کامل SANA و NIMA</span>
                </h1>

                <p className="text-xl text-muted-foreground mb-8 text-persian">
                  آشنایی جامع با دو سیستم مهم ارزی ایران، نحوه تخصیص، تفاوت‌ها و کاربرد هر کدام در واردات و صادرات
                </p>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground text-persian">
                  <span>📅 ۱۴۰۴/۷/۱۴</span>
                  <span>⏱️ زمان مطالعه: ۱۶ دقیقه</span>
                  <span>✍️ تیم ترخیصان</span>
                </div>

                <ArticleImage
                  src="/images/blog/sana-nima-exchange-rate-difference-guide.webp"
                  alt="تفاوت ارز سنا و ارز نیمایی چیست؟ راهنمای کامل"
                  caption="مقایسه سامانه‌های ارزی سنا و نیما برای واردکنندگان و صادرکنندگان"
                  className="mt-8"
                />
              </div>
            </div>
          </section>

          {/* Content */}
          <section className="py-20">
            <div className="container mx-auto px-4" dir="rtl">
              <article className="max-w-4xl mx-auto prose prose-lg">
                {/* Introduction */}
                <Card className="mb-12 border-accent/20">
                  <CardHeader>
                    <CardTitle className="text-persian flex items-center gap-2">
                      <DollarSign className="w-6 h-6 text-accent" />
                      مقدمه
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-persian space-y-4">
                    <p className="leading-relaxed">
                      در سال‌های اخیر، دو سامانه مهم ارزی به نام‌های <strong>ارز نیمایی (NIMA)</strong> و{" "}
                      <strong>ارز سنا (SANA)</strong> در ایران راه‌اندازی شده‌اند که نقش بسیار مهمی در تأمین ارز مورد
                      نیاز واردکنندگان و بازگشت ارز صادرکنندگان دارند. برای درک بهتر هزینه‌های{" "}
                      <Link
                        to="/blog/complete-guide-customs-clearance-shahid-rajaei"
                        className="text-accent hover:underline"
                      >
                        ترخیص کالا
                      </Link>
                      ، آشنایی با{" "}
                      <Link to="/blog/customs-exchange-rate-guide" className="text-accent hover:underline">
                        نرخ ارز گمرکی
                      </Link>{" "}
                      نیز مفید است.
                    </p>
                    <p className="leading-relaxed">
                      درک تفاوت این دو سامانه برای فعالان اقتصادی، واردکنندگان و صادرکنندگان ضروری است تا بتوانند بهترین
                      تصمیم را در تأمین ارز مورد نیاز خود بگیرند.
                    </p>
                  </CardContent>
                </Card>

                {/* NIMA System */}
                <Card className="mb-12">
                  <CardHeader>
                    <CardTitle className="text-persian flex items-center gap-2">
                      <TrendingUp className="w-6 h-6 text-accent" />
                      <strong>سامانه نیما (NIMA) چیست؟</strong>
                    </CardTitle>
                    <CardDescription className="text-persian">سامانه نظارت یکپارچه معاملات ارزی</CardDescription>
                  </CardHeader>
                  <CardContent className="text-persian space-y-4">
                    <p className="leading-relaxed">
                      <strong>سامانه نیما (Integrated System for Foreign Exchange Dealing)</strong> در سال ۱۳۹۷
                      راه‌اندازی شد و به عنوان یک بازار ثانویه ارز عمل می‌کند که در آن صادرکنندگان می‌توانند ارز حاصل از
                      صادرات خود را به واردکنندگان بفروشند.
                    </p>

                    <div className="bg-secondary/30 rounded-lg p-6 my-6">
                      <h3 className="text-lg font-semibold mb-4 text-persian flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-accent" />
                        ویژگی‌های اصلی نیما
                      </h3>
                      <ul className="space-y-3 text-persian mr-6">
                        <li className="flex items-start gap-2">
                          <span className="text-accent mt-1">✓</span>
                          <span>نرخ ارز بر اساس عرضه و تقاضا تعیین می‌شود</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-accent mt-1">✓</span>
                          <span>صادرکنندگان ارز خود را به صورت مستقیم به واردکنندگان می‌فروشند</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-accent mt-1">✓</span>
                          <span>بانک‌ها نقش واسط را ایفا می‌کنند</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-accent mt-1">✓</span>
                          <span>نرخ ارز نیمایی معمولاً پایین‌تر از نرخ بازار آزاد است</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-accent mt-1">✓</span>
                          <span>برای اکثر کالاهای مجاز به واردات قابل استفاده است</span>
                        </li>
                      </ul>
                    </div>

                    <h3 className="text-lg font-semibold mt-8 mb-4 text-persian">نحوه عملکرد نیما</h3>
                    <ol className="space-y-3 text-persian mr-6 list-decimal">
                      <li>صادرکننده ارز حاصل از صادرات را وارد سامانه نیما می‌کند</li>
                      <li>واردکننده درخواست تخصیص ارز خود را ثبت می‌کند</li>
                      <li>بانک عامل، خریدار و فروشنده را مطابقت می‌دهد</li>
                      <li>معامله انجام شده و ارز به واردکننده تخصیص می‌یابد</li>
                    </ol>
                  </CardContent>
                </Card>

                {/* SANA System */}
                <Card className="mb-12">
                  <CardHeader>
                    <CardTitle className="text-persian flex items-center gap-2">
                      <Scale className="w-6 h-6 text-accent" />
                      سامانه سنا (SANA) چیست؟
                    </CardTitle>
                    <CardDescription className="text-persian">سامانه نظارت بر ارز دولتی و ترجیحی</CardDescription>
                  </CardHeader>
                  <CardContent className="text-persian space-y-4">
                    <p className="leading-relaxed">
                      <strong>سامانه سنا (Supervised Network for Allocation)</strong> در سال ۱۴۰۰ راه‌اندازی شد و برای
                      تخصیص ارز دولتی و ترجیحی به کالاهای اساسی و ضروری طراحی شده است.
                    </p>

                    <div className="bg-secondary/30 rounded-lg p-6 my-6">
                      <h3 className="text-lg font-semibold mb-4 text-persian flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-accent" />
                        ویژگی‌های اصلی سنا
                      </h3>
                      <ul className="space-y-3 text-persian mr-6">
                        <li className="flex items-start gap-2">
                          <span className="text-accent mt-1">✓</span>
                          <span>نرخ ارز توسط دولت تعیین می‌شود (ارز ترجیحی)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-accent mt-1">✓</span>
                          <span>فقط برای کالاهای اساسی و ضروری مانند دارو، گندم، و نهاده‌های کشاورزی</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-accent mt-1">✓</span>
                          <span>نرخ بسیار پایین‌تر از نیما و بازار آزاد</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-accent mt-1">✓</span>
                          <span>نظارت دقیق‌تر بر مصرف ارز</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-accent mt-1">✓</span>
                          <span>جلوگیری از سوءاستفاده و قاچاق ارز</span>
                        </li>
                      </ul>
                    </div>

                    <h3 className="text-lg font-semibold mt-8 mb-4 text-persian">کالاهای مشمول ارز سنا</h3>
                    <ul className="space-y-2 text-persian mr-6">
                      <li>• داروها و تجهیزات پزشکی</li>
                      <li>• گندم و محصولات غذایی اساسی</li>
                      <li>• نهاده‌های دامی و کشاورزی</li>
                      <li>• برخی مواد اولیه صنعتی استراتژیک</li>
                    </ul>
                  </CardContent>
                </Card>

                <ArticleImage
                  src="/images/blog/exchange-rate-currency.webp"
                  alt="مقایسه نرخ ارز نیما و سنا - تفاوت سامانه‌های ارزی"
                  caption="مقایسه تفاوت نرخ ارز در سامانه‌های نیما و سنا"
                />

                {/* Key Differences */}
                <Card className="mb-12 border-accent/30">
                  <CardHeader>
                    <CardTitle className="text-persian flex items-center gap-2">
                      <FileText className="w-6 h-6 text-accent" />
                      تفاوت‌های کلیدی ارز سنا و نیمایی
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-persian">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-secondary/50">
                            <th className="border border-border p-3 text-right text-persian">معیار مقایسه</th>
                            <th className="border border-border p-3 text-right text-persian">ارز نیمایی (NIMA)</th>
                            <th className="border border-border p-3 text-right text-persian">ارز سنا (SANA)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-border p-3 font-semibold">نرخ ارز</td>
                            <td className="border border-border p-3">بازار آزاد / عرضه و تقاضا</td>
                            <td className="border border-border p-3">دولتی / ترجیحی (پایین‌تر)</td>
                          </tr>
                          <tr className="bg-secondary/20">
                            <td className="border border-border p-3 font-semibold">کالاهای مشمول</td>
                            <td className="border border-border p-3">اکثر کالاهای مجاز</td>
                            <td className="border border-border p-3">فقط کالاهای اساسی</td>
                          </tr>
                          <tr>
                            <td className="border border-border p-3 font-semibold">منبع ارز</td>
                            <td className="border border-border p-3">صادرکنندگان</td>
                            <td className="border border-border p-3">ذخایر ارزی دولت</td>
                          </tr>
                          <tr className="bg-secondary/20">
                            <td className="border border-border p-3 font-semibold">نحوه تخصیص</td>
                            <td className="border border-border p-3">مستقیم بین صادرکننده و واردکننده</td>
                            <td className="border border-border p-3">از طریق بانک مرکزی</td>
                          </tr>
                          <tr>
                            <td className="border border-border p-3 font-semibold">نظارت</td>
                            <td className="border border-border p-3">نظارت متوسط</td>
                            <td className="border border-border p-3">نظارت شدید</td>
                          </tr>
                          <tr className="bg-secondary/20">
                            <td className="border border-border p-3 font-semibold">سرعت تخصیص</td>
                            <td className="border border-border p-3">سریع‌تر</td>
                            <td className="border border-border p-3">کندتر (بروکراسی بیشتر)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Advantages and Disadvantages */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-persian text-lg">مزایای ارز نیمایی</CardTitle>
                    </CardHeader>
                    <CardContent className="text-persian space-y-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>دسترسی آسان‌تر و سریع‌تر</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>پوشش طیف گسترده‌ای از کالاها</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>رقابتی بودن نرخ</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>شفافیت بیشتر در معاملات</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-persian text-lg">مزایای ارز سنا</CardTitle>
                    </CardHeader>
                    <CardContent className="text-persian space-y-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>نرخ بسیار پایین‌تر</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>کاهش هزینه کالاهای اساسی</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>حمایت از تولیدکنندگان</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>کنترل تورم کالاهای حیاتی</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* How to Choose */}
                <Card className="mb-12 border-accent/20">
                  <CardHeader>
                    <CardTitle className="text-persian flex items-center gap-2">
                      <AlertCircle className="w-6 h-6 text-accent" />
                      چگونه بین سنا و نیما انتخاب کنیم؟
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-persian space-y-4">
                    <p className="leading-relaxed">انتخاب بین ارز سنا و نیمایی به عوامل زیر بستگی دارد:</p>

                    <div className="space-y-4">
                      <div className="bg-secondary/30 rounded-lg p-4">
                        <h4 className="font-semibold mb-2">۱. نوع کالای وارداتی</h4>
                        <p className="text-sm">
                          اگر کالای شما جزو کالاهای اساسی است، ارز سنا گزینه بهتری است. در غیر این صورت، نیما انتخاب
                          مناسب‌تری خواهد بود.
                        </p>
                      </div>

                      <div className="bg-secondary/30 rounded-lg p-4">
                        <h4 className="font-semibold mb-2">۲. زمان مورد نیاز</h4>
                        <p className="text-sm">
                          اگر به ارز فوری نیاز دارید، نیما سریع‌تر است. ارز سنا ممکن است زمان بیشتری بگیرد.
                        </p>
                      </div>

                      <div className="bg-secondary/30 rounded-lg p-4">
                        <h4 className="font-semibold mb-2">۳. حجم واردات</h4>
                        <p className="text-sm">
                          برای واردات کم‌حجم، نیما انعطاف‌پذیرتر است. برای واردات حجیم کالاهای اساسی، سنا
                          مقرون‌به‌صرفه‌تر است.
                        </p>
                      </div>

                      <div className="bg-secondary/30 rounded-lg p-4">
                        <h4 className="font-semibold mb-2">۴. توانایی پرداخت</h4>
                        <p className="text-sm">
                          اگر بودجه محدود دارید و کالایتان مشمول سنا است، ارز سنا بار مالی کمتری دارد.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Conclusion */}
                <Card className="mb-12 bg-gradient-to-br from-secondary/50 to-accent/5">
                  <CardHeader>
                    <CardTitle className="text-persian">نتیجه‌گیری</CardTitle>
                  </CardHeader>
                  <CardContent className="text-persian space-y-4">
                    <p className="leading-relaxed">
                      درک تفاوت بین ارز سنا و نیمایی برای تصمیم‌گیری صحیح در واردات کالا ضروری است. هر دو سامانه مزایا و
                      محدودیت‌های خاص خود را دارند و انتخاب بین آن‌ها باید بر اساس نوع کالا، بودجه، زمان و شرایط
                      واردکننده صورت گیرد.
                    </p>
                    <p className="leading-relaxed">
                      مشاوران ترخیص کالا می‌توانند در انتخاب بهترین روش تأمین ارز و بهره‌مندی از مزایای هر سامانه به شما
                      کمک کنند.
                    </p>
                  </CardContent>
                </Card>

                {/* CTA */}
                <Card className="border-accent/30">
                  <CardContent className="p-8 text-center">
                    <h3 className="heading-tertiary mb-4 text-persian">نیاز به مشاوره تخصصی دارید؟</h3>
                    <p className="text-muted-foreground mb-6 text-persian">
                      تیم متخصص ترخیصان آماده است تا در انتخاب بهترین روش تأمین ارز و ترخیص کالای شما راهنمایی کند
                    </p>
                    <Link to="/#contact">
                      <Button size="lg" className="text-persian">
                        درخواست مشاوره رایگان
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </article>
            </div>
          </section>

          {/* Related Articles */}
          <RelatedArticles currentPostId={8} />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default SanaExchangeRateGuide;
