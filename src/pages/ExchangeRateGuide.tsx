import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleBreadcrumb from "@/components/ArticleBreadcrumb";
import RelatedArticles from "@/components/RelatedArticles";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Phone, Mail, MessageCircle } from "lucide-react";
import ArticleImage from "@/components/ArticleImage";

const ExchangeRateGuide = () => {
  useEffect(() => {
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "fa");
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "نرخ ارز گمرکی چیست؟ راهنمای کامل محاسبه حقوق و عوارض گمرکی",
    description: "نرخ ارز گمرکی و تفاوت آن با نرخ ارز آزاد، روش محاسبه حقوق ورودی، عوارض و سود بازرگانی در گمرک ایران",
    image: "https://tarkhisun.com/og-image.jpg",
    datePublished: "2025-10-01",
    dateModified: "2025-10-01",
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
      "@id": "https://tarkhisun.com/blog/customs-exchange-rate-guide",
    },
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
        name: "نرخ ارز گمرکی چیست؟",
      },
    ],
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://tarkhisun.com/blog/customs-exchange-rate-guide" />
        <title>نرخ ارز گمرکی چیست؟ راهنمای کامل محاسبه حقوق و عوارض گمرکی</title>
        <meta
          name="description"
          content="نرخ ارز گمرکی و تفاوت آن با نرخ ارز آزاد، روش محاسبه حقوق ورودی، عوارض و سود بازرگانی در گمرک ایران. راهنمای جامع واردکنندگان"
        />
        <meta
          name="keywords"
          content="نرخ ارز گمرکی, نرخ ارز گمرک, محاسبه حقوق گمرکی, عوارض گمرکی, سود بازرگانی, نرخ ارز بانک مرکزی, حقوق ورودی, ترخیص کالا, واردات, گمرک ایران, بندرعباس, شهید رجایی"
        />
        
        <meta property="og:title" content="نرخ ارز گمرکی چیست؟ راهنمای کامل محاسبه حقوق و عوارض گمرکی" />
        <meta
          property="og:description"
          content="نرخ ارز گمرکی و تفاوت آن با نرخ ارز آزاد، روش محاسبه حقوق ورودی در گمرک ایران"
        />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="fa_IR" />
        <meta property="og:url" content="https://tarkhisun.com/blog/customs-exchange-rate-guide" />
        <meta property="og:site_name" content="ترخیصان" />
        <meta property="og:image" content="https://tarkhisun.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="نرخ ارز گمرکی چیست؟ راهنمای کامل محاسبه حقوق و عوارض گمرکی" />
        <meta
          name="twitter:description"
          content="نرخ ارز گمرکی و تفاوت آن با نرخ ارز آزاد، روش محاسبه حقوق ورودی در گمرک ایران"
        />
        <meta name="twitter:image" content="https://tarkhisun.com/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <main>
          <ArticleBreadcrumb
            category="تعرفه و مالیات"
            articleTitle="نرخ ارز گمرکی چیست؟ راهنمای کامل محاسبه حقوق و عوارض گمرکی"
          />

          {/* Article Header */}
          <header className="py-12 bg-gradient-to-br from-secondary to-white">
            <div className="container mx-auto px-4" dir="rtl">
              <div className="max-w-4xl mx-auto text-center">
                <span className="inline-block text-xs font-medium text-accent bg-accent/10 px-4 py-2 rounded-full mb-6">
                  محاسبات گمرکی
                </span>

                <h1 className="heading-primary mb-6 text-persian">
                  نرخ ارز گمرکی چیست؟
                  <br />
                  <span className="text-accent">راهنمای کامل محاسبه حقوق و عوارض</span>
                </h1>

                <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                  <span>📅 ۱۴۰۴/۷/۱۰</span>
                  <span>⏱️ ۱۵ دقیقه مطالعه</span>
                  <span>✍️ تیم ترخیصان</span>
                </div>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <article className="py-16">
            <div className="container mx-auto px-4" dir="rtl">
              <div className="max-w-4xl mx-auto prose prose-lg">
                {/* Hero Image */}
                <ArticleImage
                  src="/images/blog/customs-exchange-rate-guide.webp"
                  alt="نمودار نرخ ارز و تأثیر آن بر هزینه‌های گمرکی"
                  caption="نرخ ارز گمرکی تأثیر مستقیم بر هزینه ترخیص کالا دارد"
                  priority
                />

                {/* Introduction */}
                <section className="mb-12">
                  <p className="text-lg text-muted-foreground leading-relaxed text-persian mb-6">
                    یکی از مهم‌ترین مفاهیم در فرآیند <strong>ترخیص کالا از گمرک</strong> و محاسبه هزینه‌های وارداتی،{" "}
                    <strong>نرخ ارز گمرکی</strong> است. واردکنندگان و فعالان حوزه تجارت بین‌المللی باید با این مفهوم و
                    تفاوت آن با نرخ ارز آزاد آشنایی کامل داشته باشند تا بتوانند هزینه‌های ترخیص کالا را به درستی محاسبه
                    کنند.
                  </p>

                  <Card className="bg-accent/5 border-accent/20 p-6">
                    <p className="text-persian font-semibold mb-2">💡 نکته مهم:</p>
                    <p className="text-persian text-sm leading-relaxed">
                      نرخ ارز گمرکی با نرخ ارز آزاد بازار متفاوت است و توسط بانک مرکزی جمهوری اسلامی ایران تعیین می‌شود.
                      این تفاوت می‌تواند تأثیر قابل توجهی بر هزینه نهایی واردات داشته باشد.
                    </p>
                  </Card>
                </section>

                {/* Main Content */}
                <section className="mb-12">
                  <h2 className="heading-secondary mb-6 text-persian">
                    <strong>نرخ ارز گمرکی چیست؟</strong>
                  </h2>

                  <p className="text-muted-foreground leading-relaxed text-persian mb-6">
                    <strong>نرخ ارز گمرکی</strong> یا <strong>نرخ مبادله‌ای</strong> نرخ رسمی ارز است که توسط بانک مرکزی
                    جمهوری اسلامی ایران اعلام می‌شود و برای محاسبه <strong>حقوق ورودی</strong>،{" "}
                    <strong>عوارض گمرکی</strong> و <strong>سود بازرگانی</strong> کالاهای وارداتی در گمرکات ایران استفاده
                    می‌شود. برای درک بهتر محاسبات، آشنایی با{" "}
                    <Link to="/blog/customs-tariff-guide" className="text-accent hover:underline">
                      تعرفه گمرکی
                    </Link>{" "}
                    و{" "}
                    <Link to="/blog/hs-code-guide" className="text-accent hover:underline">
                      کد HS کالا
                    </Link>{" "}
                    ضروری است.
                  </p>

                  <p className="text-muted-foreground leading-relaxed text-persian mb-6">
                    این نرخ معمولاً با <strong>نرخ ارز آزاد</strong> (بازار) تفاوت دارد و تمامی واردکنندگان ملزم به
                    استفاده از نرخ مبادله‌ای برای محاسبه حقوق و عوارض گمرکی هستند. برای انجام فرآیند{" "}
                    <Link
                      to="/blog/complete-guide-customs-clearance-shahid-rajaei"
                      className="text-accent hover:underline"
                    >
                      ترخیص کالا
                    </Link>{" "}
                    نیز این نرخ اهمیت بسزایی دارد.
                  </p>

                  <div className="bg-secondary/30 rounded-xl p-6 my-8">
                    <h3 className="heading-tertiary mb-4 text-persian">ویژگی‌های نرخ ارز گمرکی</h3>
                    <ul className="space-y-3 text-persian">
                      <li className="flex items-start gap-3">
                        <span className="text-accent font-bold mt-1">✓</span>
                        <span>تعیین توسط بانک مرکزی جمهوری اسلامی ایران</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent font-bold mt-1">✓</span>
                        <span>استفاده اجباری برای تمام محاسبات گمرکی</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent font-bold mt-1">✓</span>
                        <span>به‌روزرسانی منظم بر اساس سیاست‌های پولی و ارزی کشور</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent font-bold mt-1">✓</span>
                        <span>متفاوت از نرخ ارز آزاد (بازار)</span>
                      </li>
                    </ul>
                  </div>
                </section>

                <section className="mb-12">
                  <h2 className="heading-secondary mb-6 text-persian">تفاوت نرخ ارز گمرکی با نرخ ارز آزاد</h2>

                  <div className="overflow-x-auto my-8">
                    <table className="w-full border-collapse bg-card rounded-lg overflow-hidden">
                      <thead className="bg-secondary">
                        <tr>
                          <th className="p-4 text-right text-persian border-b border-border">معیار مقایسه</th>
                          <th className="p-4 text-right text-persian border-b border-border">نرخ ارز گمرکی</th>
                          <th className="p-4 text-right text-persian border-b border-border">نرخ ارز آزاد</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border">
                          <td className="p-4 text-persian font-semibold">تعیین‌کننده</td>
                          <td className="p-4 text-persian">بانک مرکزی</td>
                          <td className="p-4 text-persian">عرضه و تقاضای بازار</td>
                        </tr>
                        <tr className="border-b border-border">
                          <td className="p-4 text-persian font-semibold">کاربرد</td>
                          <td className="p-4 text-persian">محاسبات گمرکی</td>
                          <td className="p-4 text-persian">معاملات آزاد ارزی</td>
                        </tr>
                        <tr className="border-b border-border">
                          <td className="p-4 text-persian font-semibold">ثبات</td>
                          <td className="p-4 text-persian">نسبتاً ثابت</td>
                          <td className="p-4 text-persian">متغیر و پرنوسان</td>
                        </tr>
                        <tr>
                          <td className="p-4 text-persian font-semibold">الزام استفاده</td>
                          <td className="p-4 text-persian">اجباری برای واردکنندگان</td>
                          <td className="p-4 text-persian">اختیاری</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 p-6 my-8">
                    <p className="text-persian font-semibold mb-2">⚠️ هشدار مهم:</p>
                    <p className="text-persian text-sm leading-relaxed">
                      اگر نرخ ارز آزاد بسیار بالاتر از نرخ مبادله‌ای باشد، واردکنندگان ممکن است با کمبود ارز رسمی مواجه
                      شوند و مجبور به خرید ارز از بازار آزاد با قیمت بالاتر باشند.
                    </p>
                  </Card>
                </section>

                {/* Image 2 */}
                <ArticleImage
                  src="/images/blog/exchange-rate-currency.webp"
                  alt="ارز و دلار برای محاسبه نرخ گمرکی"
                  caption="تفاوت نرخ ارز گمرکی با نرخ ارز آزاد در محاسبات گمرکی"
                />

                <section className="mb-12">
                  <h2 className="heading-secondary mb-6 text-persian">
                    نحوه محاسبه حقوق و عوارض گمرکی با نرخ ارز گمرکی
                  </h2>

                  <p className="text-muted-foreground leading-relaxed text-persian mb-6">
                    برای محاسبه <strong>حقوق ورودی</strong> و <strong>عوارض گمرکی</strong>، ابتدا باید ارزش کالا را به
                    ریال تبدیل کنیم. این تبدیل با استفاده از <strong>نرخ ارز گمرکی</strong> انجام می‌شود.
                  </p>

                  <div className="bg-secondary/30 rounded-xl p-6 my-8">
                    <h3 className="heading-tertiary mb-4 text-persian">فرمول محاسبه:</h3>

                    <div className="space-y-6 font-mono text-sm">
                      <div className="bg-card p-4 rounded-lg">
                        <p className="text-accent font-bold mb-2 text-persian">مرحله ۱: تبدیل ارزش CIF به ریال</p>
                        <p className="text-persian" dir="ltr">
                          ارزش ریالی = ارزش CIF × نرخ ارز گمرکی
                        </p>
                      </div>

                      <div className="bg-card p-4 rounded-lg">
                        <p className="text-accent font-bold mb-2 text-persian">مرحله ۲: محاسبه حقوق ورودی</p>
                        <p className="text-persian" dir="ltr">
                          حقوق ورودی = ارزش ریالی × نرخ تعرفه
                        </p>
                      </div>

                      <div className="bg-card p-4 rounded-lg">
                        <p className="text-accent font-bold mb-2 text-persian">مرحله ۳: محاسبه سود بازرگانی</p>
                        <p className="text-persian" dir="ltr">
                          سود بازرگانی = ارزش ریالی × نرخ سود بازرگانی
                        </p>
                      </div>

                      <div className="bg-card p-4 rounded-lg">
                        <p className="text-accent font-bold mb-2 text-persian">
                          مرحله ۴: محاسبه مالیات بر ارزش افزوده (ماع)
                        </p>
                        <p className="text-persian" dir="ltr">
                          ماع = (ارزش ریالی + حقوق ورودی + سود بازرگانی) × ۱۰٪
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-accent/5 border-accent/20 border rounded-xl p-6 my-8">
                    <h3 className="heading-tertiary mb-4 text-persian">مثال کاربردی:</h3>
                    <p className="text-persian mb-4">فرض کنید کالایی با مشخصات زیر وارد می‌شود:</p>

                    <ul className="space-y-2 text-persian mb-4">
                      <li>• ارزش CIF: ۱۰,۰۰۰ دلار</li>
                      <li>• نرخ ارز گمرکی: ۲۸۵,۰۰۰ ریال</li>
                      <li>• نرخ تعرفه: ۲۰٪</li>
                      <li>• نرخ سود بازرگانی: ۴٪</li>
                    </ul>

                    <div className="space-y-3 text-persian bg-card p-4 rounded-lg">
                      <p>
                        ۱. ارزش ریالی = ۱۰,۰۰۰ × ۲۸۵,۰۰۰ = <strong className="text-accent">۲,۸۵۰,۰۰۰,۰۰۰ ریال</strong>
                      </p>
                      <p>
                        ۲. حقوق ورودی = ۲,۸۵۰,۰۰۰,۰۰۰ × ۲۰٪ = <strong className="text-accent">۵۷۰,۰۰۰,۰۰۰ ریال</strong>
                      </p>
                      <p>
                        ۳. سود بازرگانی = ۲,۸۵۰,۰۰۰,۰۰۰ × ۴٪ = <strong className="text-accent">۱۱۴,۰۰۰,۰۰۰ ریال</strong>
                      </p>
                      <p>
                        ۴. ماع = (۲,۸۵۰,۰۰۰,۰۰۰ + ۵۷۰,۰۰۰,۰۰۰ + ۱۱۴,۰۰۰,۰۰۰) × ۱۰٪ ={" "}
                        <strong className="text-accent">۳۵۳,۴۰۰,۰۰۰ ریال</strong>
                      </p>
                      <hr className="my-4 border-border" />
                      <p className="text-lg font-bold">
                        جمع کل حقوق و عوارض = <span className="text-accent">۱,۰۳۷,۴۰۰,۰۰۰ ریال</span>
                      </p>
                    </div>
                  </div>
                </section>

                <section className="mb-12">
                  <h2 className="heading-secondary mb-6 text-persian">اهمیت نرخ ارز گمرکی در واردات</h2>

                  <div className="grid md:grid-cols-2 gap-6 my-8">
                    <Card className="p-6 bg-card">
                      <h3 className="text-lg font-bold text-persian mb-3 text-accent">۱. تأثیر بر هزینه نهایی</h3>
                      <p className="text-sm text-persian leading-relaxed">
                        نرخ ارز گمرکی مستقیماً بر هزینه نهایی کالای وارداتی تأثیر می‌گذارد. هرچه این نرخ بالاتر باشد،
                        حقوق و عوارض گمرکی بیشتر خواهد بود.
                      </p>
                    </Card>

                    <Card className="p-6 bg-card">
                      <h3 className="text-lg font-bold text-persian mb-3 text-accent">۲. برنامه‌ریزی مالی</h3>
                      <p className="text-sm text-persian leading-relaxed">
                        واردکنندگان باید با دانستن نرخ ارز گمرکی، بتوانند هزینه‌های خود را به درستی پیش‌بینی کنند و
                        برنامه‌ریزی مالی دقیق‌تری داشته باشند.
                      </p>
                    </Card>

                    <Card className="p-6 bg-card">
                      <h3 className="text-lg font-bold text-persian mb-3 text-accent">۳. رقابت‌پذیری</h3>
                      <p className="text-sm text-persian leading-relaxed">
                        تفاوت بین نرخ ارز گمرکی و آزاد می‌تواند بر قیمت تمام شده کالا و در نتیجه رقابت‌پذیری آن در بازار
                        داخلی تأثیرگذار باشد.
                      </p>
                    </Card>

                    <Card className="p-6 bg-card">
                      <h3 className="text-lg font-bold text-persian mb-3 text-accent">۴. مدیریت ریسک</h3>
                      <p className="text-sm text-persian leading-relaxed">
                        آگاهی از نحوه تغییرات نرخ ارز گمرکی به واردکنندگان کمک می‌کند تا ریسک‌های ارزی خود را بهتر
                        مدیریت کنند.
                      </p>
                    </Card>
                  </div>
                </section>

                <section className="mb-12">
                  <h2 className="heading-secondary mb-6 text-persian">نکات کلیدی برای واردکنندگان</h2>

                  <div className="space-y-4">
                    <Card className="p-5 border-r-4 border-accent">
                      <h3 className="font-bold text-persian mb-2">۱. پیگیری نرخ ارز</h3>
                      <p className="text-sm text-persian leading-relaxed text-muted-foreground">
                        همواره نرخ ارز مبادله‌ای بانک مرکزی را پیگیری کنید و از تغییرات آن مطلع باشید.
                      </p>
                    </Card>

                    <Card className="p-5 border-r-4 border-accent">
                      <h3 className="font-bold text-persian mb-2">۲. مشاوره با کارشناسان</h3>
                      <p className="text-sm text-persian leading-relaxed text-muted-foreground">
                        برای محاسبه دقیق حقوق و عوارض، حتماً با <strong>کارشناسان گمرکی</strong> مشاوره کنید.
                      </p>
                    </Card>

                    <Card className="p-5 border-r-4 border-accent">
                      <h3 className="font-bold text-persian mb-2">۳. استفاده از ابزارهای محاسبه</h3>
                      <p className="text-sm text-persian leading-relaxed text-muted-foreground">
                        از{" "}
                        <Link to="/currencies" className="text-accent hover:underline">
                          ابزارهای آنلاین محاسبه نرخ ارز
                        </Link>{" "}
                        برای برآورد اولیه هزینه‌ها استفاده کنید.
                      </p>
                    </Card>

                    <Card className="p-5 border-r-4 border-accent">
                      <h3 className="font-bold text-persian mb-2">۴. برنامه‌ریزی زمانی</h3>
                      <p className="text-sm text-persian leading-relaxed text-muted-foreground">
                        زمان ترخیص کالا را با توجه به نوسانات احتمالی نرخ ارز برنامه‌ریزی کنید.
                      </p>
                    </Card>
                  </div>
                </section>

                <section className="mb-12">
                  <h2 className="heading-secondary mb-6 text-persian">سوالات متداول</h2>

                  <div className="space-y-6">
                    <Card className="p-6 bg-secondary/30">
                      <h3 className="font-bold text-persian mb-3 text-accent">
                        ❓ نرخ ارز گمرکی چه زمانی تغییر می‌کند؟
                      </h3>
                      <p className="text-sm text-persian leading-relaxed">
                        نرخ ارز مبادله‌ای توسط بانک مرکزی به صورت دوره‌ای (معمولاً روزانه یا هفتگی) بر اساس سیاست‌های
                        پولی و ارزی کشور به‌روزرسانی می‌شود.
                      </p>
                    </Card>

                    <Card className="p-6 bg-secondary/30">
                      <h3 className="font-bold text-persian mb-3 text-accent">
                        ❓ آیا می‌توانم از نرخ ارز آزاد برای محاسبات گمرکی استفاده کنم؟
                      </h3>
                      <p className="text-sm text-persian leading-relaxed">
                        خیر، استفاده از نرخ ارز مبادله‌ای (گمرکی) برای محاسبه حقوق و عوارض الزامی است و واردکنندگان حق
                        استفاده از نرخ آزاد را ندارند.
                      </p>
                    </Card>

                    <Card className="p-6 bg-secondary/30">
                      <h3 className="font-bold text-persian mb-3 text-accent">
                        ❓ چگونه از آخرین نرخ ارز گمرکی مطلع شوم؟
                      </h3>
                      <p className="text-sm text-persian leading-relaxed">
                        می‌توانید از{" "}
                        <Link to="/currencies" className="text-accent hover:underline">
                          صفحه نرخ ارز ما
                        </Link>{" "}
                        یا وب‌سایت رسمی بانک مرکزی جمهوری اسلامی ایران برای دریافت آخرین نرخ‌ها استفاده کنید.
                      </p>
                    </Card>
                  </div>
                </section>

                {/* CTA Section */}
                <section className="my-16">
                  <Card className="bg-gradient-to-br from-accent/10 to-secondary/50 border-accent/30 p-8">
                    <div className="text-center">
                      <h2 className="heading-secondary mb-4 text-persian">نیاز به مشاوره تخصصی دارید؟</h2>
                      <p className="text-muted-foreground mb-6 text-persian max-w-2xl mx-auto">
                        تیم کارشناسان <strong>ترخیصان</strong> آماده است تا در محاسبه دقیق حقوق و عوارض گمرکی، تعیین کد
                        تعرفه و فرآیند ترخیص کالای شما در <strong>گمرک بندرعباس شهید رجایی</strong> به شما کمک کند.
                      </p>

                      <div className="flex flex-wrap justify-center gap-4">
                        <a href="tel:09177380080">
                          <Button variant="cta" size="lg" className="gap-2">
                            <Phone className="w-5 h-5" />
                            تماس: ۰۹۱۷۷۳۸۰۰۸۰
                          </Button>
                        </a>

                        <a href="mailto:info@tarkhisan.com">
                          <Button variant="outline" size="lg" className="gap-2">
                            <Mail className="w-5 h-5" />
                            ایمیل به ما
                          </Button>
                        </a>

                        <a href="https://wa.me/989177380080" target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="lg" className="gap-2">
                            <MessageCircle className="w-5 h-5" />
                            واتساپ
                          </Button>
                        </a>
                      </div>
                    </div>
                  </Card>
                </section>

                {/* Related Articles */}
                <section className="mb-12">
                  <h2 className="heading-secondary mb-6 text-persian">مقالات مرتبط</h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Link to="/blog/customs-tariff-definition-importance">
                      <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                        <span className="text-xs text-accent font-medium">تعرفه و مالیات</span>
                        <h3 className="font-bold text-persian mt-2 mb-3">تعریف و اهمیت تعرفه گمرکی</h3>
                        <p className="text-sm text-muted-foreground text-persian">
                          آشنایی کامل با تعرفه گمرکی و نحوه محاسبه حقوق ورودی
                        </p>
                      </Card>
                    </Link>

                    <Link to="/blog/hs-code-guide-harmonized-system">
                      <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                        <span className="text-xs text-accent font-medium">تعرفه و کدگذاری</span>
                        <h3 className="font-bold text-persian mt-2 mb-3">کد HS کالا چیست؟</h3>
                        <p className="text-sm text-muted-foreground text-persian">
                          راهنمای کامل سیستم کد تعرفه هماهنگ کالاها
                        </p>
                      </Card>
                    </Link>
                  </div>
                </section>
              </div>
            </div>
          </article>

          {/* Back to Blog */}
          <section className="py-8 border-t border-border">
            <div className="container mx-auto px-4" dir="rtl">
              <div className="max-w-4xl mx-auto">
                <Link to="/blog">
                  <Button variant="ghost" className="gap-2 text-persian">
                    <ArrowRight className="w-4 h-4" />
                    بازگشت به بلاگ
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Related Articles */}
          <RelatedArticles currentPostId={4} />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ExchangeRateGuide;
