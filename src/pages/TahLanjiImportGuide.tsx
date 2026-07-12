import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleBreadcrumb from "@/components/ArticleBreadcrumb";
import RelatedArticles from "@/components/RelatedArticles";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Ship, Package, AlertTriangle, CheckCircle2, XCircle, Scale, FileText, Users } from "lucide-react";
import ArticleImage from "@/components/ArticleImage";

const TahLanjiImportGuide = () => {
  useEffect(() => {
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "fa");
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "واردات ته لنجی یا ملوانی چیست؟ راهنمای کامل و ریسک‌ها",
    description:
      "راهنمای جامع واردات ته لنجی (ملوانی): تعریف، تفاوت با واردات رسمی، روش انجام، ریسک‌های قانونی و جریمه‌ها",
    image: "https://tarkhisun.com/og-image.jpg",
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
    datePublished: "2025-10-05",
    dateModified: "2025-10-05",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://tarkhisun.com/blog/tah-lanji-import-guide",
    },
    articleSection: "تجارت خارجی",
    keywords: "واردات ته لنجی, واردات ملوانی, واردات غیررسمی, قاچاق کالا, گمرک",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "خانه", item: "https://tarkhisun.com" },
      { "@type": "ListItem", position: 2, name: "بلاگ", item: "https://tarkhisun.com/blog" },
      { "@type": "ListItem", position: 3, name: "واردات ته لنجی یا ملوانی" },
    ],
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://tarkhisun.com/blog/tah-lanji-import-guide" />
        <title>واردات ته لنجی یا ملوانی چیست؟ راهنمای کامل و ریسک‌ها</title>
        <meta
          name="description"
          content="راهنمای واردات ته لنجی (ملوانی): تعریف، تفاوت با واردات رسمی، ریسک‌های قانونی و جریمه‌ها"
        />
        <meta
          name="keywords"
          content="واردات ته لنجی, واردات ملوانی, واردات غیررسمی, قاچاق کالا, لنج, ترخیص کالا, گمرک بندرعباس, واردات رسمی, ریسک واردات, قوانین گمرکی, جریمه قاچاق"
        />
        
        <meta property="og:title" content="واردات ته لنجی یا ملوانی چیست؟ راهنمای کامل" />
        <meta
          property="og:description"
          content="راهنمای جامع واردات ته لنجی: تعریف، ریسک‌های قانونی، جریمه‌ها و تفاوت با واردات رسمی"
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://tarkhisun.com/blog/tah-lanji-import-guide" />
        <meta property="og:locale" content="fa_IR" />
        <meta property="og:site_name" content="ترخیصان" />
        <meta property="og:image" content="https://tarkhisun.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="واردات ته لنجی یا ملوانی چیست؟ راهنمای کامل" />
        <meta name="twitter:description" content="راهنمای جامع واردات ته لنجی و ریسک‌های قانونی آن" />
        <meta name="twitter:image" content="https://tarkhisun.com/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <main>
          <ArticleBreadcrumb
            category="راهنمای واردات"
            articleTitle="واردات ته لنجی یا ملوانی چیست؟ راهنمای کامل و ریسک‌ها"
          />

          <article>
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-br from-secondary to-white">
              <div className="container mx-auto px-4" dir="rtl">
                <div className="max-w-4xl mx-auto">
                  <h1 className="heading-primary mb-6 text-persian">
                    واردات ته لنجی یا ملوانی چیست؟
                    <br />
                    <span className="text-accent">راهنمای کامل و ریسک‌های قانونی</span>
                  </h1>

                  <p className="text-xl text-muted-foreground mb-8 text-persian leading-relaxed">
                    آشنایی جامع با واردات ته لنجی (ملوانی)، تفاوت آن با واردات رسمی، ریسک‌های قانونی، جریمه‌های سنگین و
                    دلایل استفاده از روش‌های قانونی برای واردات کالا
                  </p>

                  <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground text-persian">
                    <span className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      تیم ترخیصان
                    </span>
                    <span>۱۴۰۴/۷/۱۴</span>
                    <span>۱۶ دقیقه مطالعه</span>
                  </div>

                  <ArticleImage
                    src="/images/blog/tah-lanji-import-guide.webp"
                    alt="لنج سنتی در بنادر جنوب ایران - واردات ته لنجی"
                    caption="لنج‌های سنتی در بنادر جنوبی ایران"
                    priority
                    className="mt-8"
                  />
                </div>
              </div>
            </section>

            {/* Alert Warning */}
            <section className="py-8 bg-destructive/10">
              <div className="container mx-auto px-4" dir="rtl">
                <div className="max-w-4xl mx-auto">
                  <Card className="border-destructive/50 bg-background">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-lg font-bold mb-2 text-persian text-destructive">هشدار مهم</h3>
                          <p className="text-persian leading-relaxed">
                            این مقاله صرفاً با هدف آگاهی و اطلاع‌رسانی تهیه شده است. واردات ته لنجی یا ملوانی غیرقانونی
                            است و می‌تواند عواقب جدی قانونی، مالی و حقوقی برای افراد به همراه داشته باشد. ما به‌شدت
                            توصیه می‌کنیم تنها از روش‌های قانونی و رسمی برای واردات کالا استفاده کنید.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            {/* Content Sections */}
            <section className="py-16">
              <div className="container mx-auto px-4" dir="rtl">
                <div className="max-w-4xl mx-auto space-y-12">
                  {/* Section 1: تعریف واردات ته لنجی */}
                  <div>
                    <h2 className="heading-secondary mb-6 text-persian flex items-center gap-3">
                      <Ship className="w-8 h-8 text-accent" />
                      <strong>واردات ته لنجی (ملوانی) چیست؟</strong>
                    </h2>
                    <div className="space-y-4 text-lg leading-relaxed text-persian">
                      <p>
                        <strong>واردات ته لنجی</strong> یا <strong>ملوانی</strong> به روشی از ورود کالا به کشور گفته
                        می‌شود که از طریق لنج‌های سنتی و بدون طی مراحل رسمی گمرکی انجام می‌شود. این نوع واردات عمدتاً در
                        بنادر جنوبی ایران مانند بندرعباس، بندر لنگه و جزایر خلیج فارس رایج بوده است. برای آشنایی با{" "}
                        <Link to="/blog/import-export-guide-iran" className="text-accent hover:underline">
                          روش‌های قانونی واردات
                        </Link>
                        ، مقاله مربوطه را مطالعه کنید.
                      </p>
                      <p>
                        در این روش، کالاها بدون ارائه مدارک رسمی،{" "}
                        <Link to="/blog/ntsw-complete-guide" className="text-accent hover:underline">
                          ثبت سفارش
                        </Link>
                        ، پرداخت{" "}
                        <Link to="/blog/customs-tariff-guide" className="text-accent hover:underline">
                          حقوق گمرکی
                        </Link>{" "}
                        و عوارض قانونی وارد کشور می‌شوند و معمولاً از مسیرهای غیررسمی و دور از نظارت مقامات گمرکی حمل
                        می‌شوند.
                      </p>
                    </div>
                  </div>

                  {/* Section 2: تاریخچه */}
                  <Card className="bg-secondary/30">
                    <CardContent className="p-8">
                      <h3 className="heading-tertiary mb-4 text-persian">پیشینه تاریخی واردات ته لنجی</h3>
                      <p className="text-lg leading-relaxed text-persian">
                        استفاده از لنج‌ها برای حمل کالا در خلیج فارس سابقه‌ای طولانی دارد. در گذشته، به دلیل محدودیت‌های
                        زیرساختی و عدم وجود سیستم‌های گمرکی پیشرفته، بسیاری از معاملات تجاری از طریق لنج‌های سنتی انجام
                        می‌شد. اما امروزه با توسعه قوانین و مقررات گمرکی، این روش به‌صورت غیرقانونی طبقه‌بندی می‌شود.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Section 3: چرا افراد از این روش استفاده می‌کنند */}
                  <div>
                    <h2 className="heading-secondary mb-6 text-persian flex items-center gap-3">
                      <Package className="w-8 h-8 text-accent" />
                      چرا برخی از واردات ته لنجی استفاده می‌کنند؟
                    </h2>
                    <div className="space-y-6">
                      <Card>
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="bg-accent/10 p-3 rounded-lg">
                              <CheckCircle2 className="w-6 h-6 text-accent" />
                            </div>
                            <div>
                              <h4 className="font-bold text-lg mb-2 text-persian">
                                ۱. اجتناب از پرداخت حقوق و عوارض گمرکی
                              </h4>
                              <p className="text-muted-foreground text-persian leading-relaxed">
                                با عبور غیرقانونی از گمرک، واردکنندگان از پرداخت حقوق ورودی، مالیات، عوارض و سود
                                بازرگانی که می‌تواند تا ۱۰۰٪ ارزش کالا باشد، طفره می‌روند.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="bg-accent/10 p-3 rounded-lg">
                              <CheckCircle2 className="w-6 h-6 text-accent" />
                            </div>
                            <div>
                              <h4 className="font-bold text-lg mb-2 text-persian">۲. سرعت بیشتر در ورود کالا</h4>
                              <p className="text-muted-foreground text-persian leading-relaxed">
                                فرآیندهای گمرکی رسمی ممکن است چند روز تا چند هفته زمان ببرد. در واردات ته لنجی، کالا
                                بدون توقف و بررسی سریع‌تر منتقل می‌شود.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="bg-accent/10 p-3 rounded-lg">
                              <CheckCircle2 className="w-6 h-6 text-accent" />
                            </div>
                            <div>
                              <h4 className="font-bold text-lg mb-2 text-persian">۳. واردات کالاهای ممنوعه یا محدود</h4>
                              <p className="text-muted-foreground text-persian leading-relaxed">
                                برخی کالاها به دلیل مقررات ممنوع یا نیازمند مجوزهای خاص هستند. واردات غیرقانونی راهی
                                برای دور زدن این محدودیت‌هاست.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="bg-accent/10 p-3 rounded-lg">
                              <CheckCircle2 className="w-6 h-6 text-accent" />
                            </div>
                            <div>
                              <h4 className="font-bold text-lg mb-2 text-persian">۴. عدم نیاز به مدارک و مجوزها</h4>
                              <p className="text-muted-foreground text-persian leading-relaxed">
                                واردات رسمی نیازمند کارت بازرگانی، کد اقتصادی، ثبت سفارش و مدارک متعدد است که برای برخی
                                افراد دشوار یا زمان‌بر است.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <ArticleImage
                    src="/images/blog/lanji-port.webp"
                    alt="بندر لنج - واردات غیررسمی و ریسک‌های قانونی"
                    caption="بنادر جنوبی ایران - مسیر حمل کالاهای وارداتی"
                  />

                  {/* Section 4: ریسک‌ها و عواقب */}
                  <div>
                    <h2 className="heading-secondary mb-6 text-persian flex items-center gap-3">
                      <XCircle className="w-8 h-8 text-destructive" />
                      ریسک‌ها و عواقب قانونی واردات ته لنجی
                    </h2>
                    <div className="space-y-6">
                      <Card className="border-destructive/50">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                            <div>
                              <h4 className="font-bold text-lg mb-2 text-persian text-destructive">
                                ۱. جریمه‌های سنگین مالی
                              </h4>
                              <p className="text-muted-foreground text-persian leading-relaxed">
                                بر اساس قانون مبارزه با قاچاق کالا، جریمه‌های قاچاق می‌تواند{" "}
                                <strong>۲ تا ۴ برابر ارزش کالا</strong> باشد. همچنین کالای قاچاق ضبط و مصادره می‌شود.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-destructive/50">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                            <div>
                              <h4 className="font-bold text-lg mb-2 text-persian text-destructive">
                                ۲. محکومیت کیفری و زندان
                              </h4>
                              <p className="text-muted-foreground text-persian leading-relaxed">
                                قاچاق کالا جرم کیفری است و می‌تواند منجر به{" "}
                                <strong>حبس تعزیری از ۶ ماه تا ۳ سال</strong> شود. در موارد سنگین (قاچاق سازمان‌یافته یا
                                کالاهای استراتژیک)، مجازات‌ها شدیدتر است.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-destructive/50">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                            <div>
                              <h4 className="font-bold text-lg mb-2 text-persian text-destructive">
                                ۳. از دست دادن کالا
                              </h4>
                              <p className="text-muted-foreground text-persian leading-relaxed">
                                در صورت کشف، تمام کالا توسط مقامات گمرکی یا انتظامی توقیف و ضبط می‌شود و هیچ جبران
                                خسارتی دریافت نخواهید کرد.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-destructive/50">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                            <div>
                              <h4 className="font-bold text-lg mb-2 text-persian text-destructive">
                                ۴. محرومیت از فعالیت‌های تجاری
                              </h4>
                              <p className="text-muted-foreground text-persian leading-relaxed">
                                افراد محکوم به قاچاق ممکن است از دریافت کارت بازرگانی، انجام فعالیت‌های واردات-صادرات و
                                همکاری با ارگان‌های دولتی محروم شوند.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-destructive/50">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                            <div>
                              <h4 className="font-bold text-lg mb-2 text-persian text-destructive">
                                ۵. خطرات امنیتی و کلاهبرداری
                              </h4>
                              <p className="text-muted-foreground text-persian leading-relaxed">
                                معاملات غیرقانونی فاقد ضمانت اجرایی هستند. خطر کلاهبرداری، از دست رفتن سرمایه، دریافت
                                کالای مغایر و درگیری با افراد غیرقابل اعتماد بسیار بالاست.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-destructive/50">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                            <div>
                              <h4 className="font-bold text-lg mb-2 text-persian text-destructive">
                                ۶. عدم امکان اثبات مالکیت و فروش رسمی
                              </h4>
                              <p className="text-muted-foreground text-persian leading-relaxed">
                                کالای قاچاق فاقد مدارک گمرکی، فاکتور رسمی و اسناد مالکیت است. فروش این کالاها در بازار
                                رسمی غیرممکن یا با ریسک بالا همراه است.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Section 5: تفاوت با واردات رسمی */}
                  <div>
                    <h2 className="heading-secondary mb-6 text-persian flex items-center gap-3">
                      <Scale className="w-8 h-8 text-accent" />
                      تفاوت واردات ته لنجی با واردات رسمی
                    </h2>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-persian">
                        <thead>
                          <tr className="bg-secondary">
                            <th className="border border-border p-4 text-right">ویژگی</th>
                            <th className="border border-border p-4 text-right">واردات رسمی</th>
                            <th className="border border-border p-4 text-right">واردات ته لنجی</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-border p-4 font-bold">قانونی بودن</td>
                            <td className="border border-border p-4">✅ کاملاً قانونی</td>
                            <td className="border border-border p-4 text-destructive">❌ غیرقانونی</td>
                          </tr>
                          <tr className="bg-secondary/30">
                            <td className="border border-border p-4 font-bold">مدارک گمرکی</td>
                            <td className="border border-border p-4">دارای اظهارنامه و مدارک</td>
                            <td className="border border-border p-4">بدون مدارک</td>
                          </tr>
                          <tr>
                            <td className="border border-border p-4 font-bold">حقوق گمرکی</td>
                            <td className="border border-border p-4">پرداخت کامل</td>
                            <td className="border border-border p-4">عدم پرداخت</td>
                          </tr>
                          <tr className="bg-secondary/30">
                            <td className="border border-border p-4 font-bold">ریسک قانونی</td>
                            <td className="border border-border p-4">✅ هیچ ریسکی ندارد</td>
                            <td className="border border-border p-4 text-destructive">❌ جریمه، ضبط کالا، زندان</td>
                          </tr>
                          <tr>
                            <td className="border border-border p-4 font-bold">ضمانت و حمایت</td>
                            <td className="border border-border p-4">تحت حمایت قانون</td>
                            <td className="border border-border p-4">فاقد هرگونه حمایت</td>
                          </tr>
                          <tr className="bg-secondary/30">
                            <td className="border border-border p-4 font-bold">زمان ترخیص</td>
                            <td className="border border-border p-4">۳-۱۰ روز</td>
                            <td className="border border-border p-4">سریع‌تر (اما پرریسک)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Section 6: چرا واردات رسمی بهتر است */}
                  <Card className="bg-accent/5 border-accent">
                    <CardContent className="p-8">
                      <h2 className="heading-secondary mb-6 text-persian flex items-center gap-3">
                        <FileText className="w-8 h-8 text-accent" />
                        چرا باید از واردات رسمی استفاده کنیم؟
                      </h2>
                      <ul className="space-y-4 text-lg text-persian">
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                          <span>
                            <strong>امنیت کامل:</strong> هیچ خطر قانونی، جریمه یا ضبط کالا وجود ندارد
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                          <span>
                            <strong>اسناد قانونی:</strong> دریافت مدارک گمرکی برای اثبات مالکیت و فروش رسمی
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                          <span>
                            <strong>کیفیت تضمین‌شده:</strong> بازرسی کالا توسط گمرک و اطمینان از استانداردها
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                          <span>
                            <strong>حمایت قانونی:</strong> امکان پیگیری و شکایت در صورت بروز مشکل
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                          <span>
                            <strong>توسعه کسب‌وکار:</strong> امکان رشد پایدار و قانونی در تجارت بین‌المللی
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                          <span>
                            <strong>اعتماد مشتری:</strong> کسب اعتبار و اعتماد در بازار با ارائه کالای قانونی
                          </span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Section 7: راهنمای واردات رسمی */}
                  <div>
                    <h2 className="heading-secondary mb-6 text-persian">مراحل واردات رسمی و قانونی کالا</h2>
                    <div className="space-y-4">
                      <Card>
                        <CardContent className="p-6">
                          <h4 className="font-bold text-lg mb-2 text-persian">۱. اخذ کارت بازرگانی و کد اقتصادی</h4>
                          <p className="text-muted-foreground text-persian">
                            برای شروع فعالیت واردات، ابتدا باید از اتاق بازرگانی کارت بازرگانی دریافت کنید.
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-6">
                          <h4 className="font-bold text-lg mb-2 text-persian">۲. ثبت سفارش در سامانه جامع تجارت</h4>
                          <p className="text-muted-foreground text-persian">
                            کالای مورد نظر را در سامانه ntsw.ir ثبت و مجوزهای لازم را دریافت کنید.
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-6">
                          <h4 className="font-bold text-lg mb-2 text-persian">۳. واردات کالا و ارائه مدارک به گمرک</h4>
                          <p className="text-muted-foreground text-persian">
                            پس از ورود کالا به گمرک، مدارک شامل بارنامه، فاکتور، لیست بسته‌بندی و پروفرما را ارائه دهید.
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-6">
                          <h4 className="font-bold text-lg mb-2 text-persian">۴. پرداخت حقوق و عوارض گمرکی</h4>
                          <p className="text-muted-foreground text-persian">
                            بر اساس نرخ ارز گمرکی و تعرفه کالا، حقوق ورودی و سایر عوارض را پرداخت کنید.
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-6">
                          <h4 className="font-bold text-lg mb-2 text-persian">۵. ترخیص کالا و دریافت مدارک</h4>
                          <p className="text-muted-foreground text-persian">
                            پس از تایید نهایی گمرک، کالا ترخیص و اظهارنامه گمرکی به شما تحویل داده می‌شود.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Related Articles */}
                  <RelatedArticles currentPostId={11} limit={3} />

                  {/* Call to Action */}
                  <Card className="bg-gradient-to-br from-accent/10 to-secondary border-accent">
                    <CardContent className="p-8 text-center">
                      <h3 className="heading-tertiary mb-4 text-persian">نیاز به مشاوره واردات رسمی دارید؟</h3>
                      <p className="text-lg text-muted-foreground mb-6 text-persian">
                        تیم ترخیصان آماده است تا شما را در تمام مراحل واردات قانونی و ترخیص کالا از گمرک بندرعباس و شهید
                        رجایی یاری کند.
                      </p>
                      <div className="flex flex-wrap gap-4 justify-center">
                        <Link to="/">
                          <Button size="lg" className="text-persian">
                            دریافت مشاوره رایگان
                          </Button>
                        </Link>
                        <Link to="/blog/import-export-iran-complete-guide">
                          <Button size="lg" variant="outline" className="text-persian">
                            راهنمای کامل واردات و صادرات
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default TahLanjiImportGuide;
