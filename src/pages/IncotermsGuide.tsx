import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleBreadcrumb from "@/components/ArticleBreadcrumb";
import RelatedArticles from "@/components/RelatedArticles";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Ship, Truck, Package, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import ArticleImage from "@/components/ArticleImage";

const IncotermsGuide = () => {
  useEffect(() => {
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "fa");
    window.scrollTo(0, 0);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "اینکوترمز چیست؟ راهنمای کامل شرایط تحویل بین‌المللی کالا",
    description:
      "راهنمای جامع اینکوترمز (Incoterms) - آشنایی با انواع شرایط تحویل بین‌المللی کالا، FOB، CIF، EXW، DAP، DDP و نحوه انتخاب اینکوترمز مناسب برای واردات و صادرات",
    author: {
      "@type": "Organization",
      name: "ترخیصان",
    },
    publisher: {
      "@type": "Organization",
      name: "ترخیصان",
      address: {
        "@type": "PostalAddress",
        addressLocality: "بندرعباس",
        addressRegion: "هرمزگان",
        addressCountry: "IR",
      },
    },
    datePublished: "2025-10-02",
    dateModified: "2025-12-01",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://tarkhisun.com/blog/incoterms-guide",
    },
    keywords: "اینکوترمز, Incoterms, شرایط تحویل کالا, FOB, CIF, EXW, DAP, DDP, تجارت بین المللی",
    articleSection: "تجارت بین‌المللی",
    image: "https://tarkhisun.com/og-image.jpg",
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
        name: "اینکوترمز چیست؟ راهنمای شرایط تحویل بین‌المللی کالا",
      },
    ],
  };

  const incotermsTypes = [
    {
      code: "EXW",
      name: "Ex Works",
      nameFa: "از کارخانه",
      description: "فروشنده کالا را در محل خود (کارخانه، انبار) در اختیار خریدار قرار می‌دهد",
      responsibility: "حداقل مسئولیت فروشنده",
      icon: Package,
    },
    {
      code: "FOB",
      name: "Free on Board",
      nameFa: "بر روی کشتی",
      description: "فروشنده کالا را روی کشتی در بندر مبدا قرار می‌دهد و هزینه حمل دریایی با خریدار",
      responsibility: "مسئولیت مشترک",
      icon: Ship,
    },
    {
      code: "CIF",
      name: "Cost, Insurance and Freight",
      nameFa: "هزینه، بیمه و حمل",
      description: "فروشنده هزینه حمل و بیمه تا بندر مقصد را پرداخت می‌کند",
      responsibility: "مسئولیت فروشنده تا بندر مقصد",
      icon: Ship,
    },
    {
      code: "DAP",
      name: "Delivered at Place",
      nameFa: "تحویل در محل",
      description: "فروشنده کالا را تا محل مورد توافق تحویل می‌دهد (قبل از تخلیه)",
      responsibility: "مسئولیت بالای فروشنده",
      icon: Truck,
    },
    {
      code: "DDP",
      name: "Delivered Duty Paid",
      nameFa: "تحویل با پرداخت حقوق",
      description: "فروشنده تمام هزینه‌ها شامل حقوق گمرکی را تا محل خریدار پرداخت می‌کند",
      responsibility: "حداکثر مسئولیت فروشنده",
      icon: Truck,
    },
  ];

  const selectionTips = [
    "نوع کالا و حساسیت آن به شرایط حمل",
    "تجربه و دانش طرفین در امور بین‌المللی",
    "هزینه‌های حمل و بیمه کالا",
    "قوانین و مقررات گمرکی کشور مقصد",
    "ریسک‌های احتمالی و میزان تحمل ریسک",
    "امکانات حمل و نقل در بنادر مبدا و مقصد",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <link rel="canonical" href="https://tarkhisun.com/blog/incoterms-guide" />
        <title>اینکوترمز چیست؟ راهنمای کامل شرایط تحویل بین‌المللی کالا</title>
        <meta
          name="description"
          content="راهنمای اینکوترمز: شرایط تحویل بین‌المللی کالا FOB، CIF، EXW، DAP، DDP و انتخاب مناسب برای واردات"
        />
        <meta
          name="keywords"
          content="اینکوترمز, Incoterms, شرایط تحویل کالا, FOB, CIF, EXW, DAP, DDP, تجارت بین المللی, واردات, صادرات, حمل کالا, بیمه کالا, ترخیص کالا, گمرک"
        />
        
        <meta property="og:title" content="اینکوترمز چیست؟ راهنمای کامل شرایط تحویل بین‌المللی کالا" />
        <meta
          property="og:description"
          content="راهنمای جامع اینکوترمز - آشنایی با انواع شرایط تحویل بین‌المللی کالا"
        />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="fa_IR" />
        <meta property="og:url" content="https://tarkhisun.com/blog/incoterms-guide" />
        <meta property="og:site_name" content="ترخیصان" />
        <meta property="og:image" content="https://tarkhisun.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="اینکوترمز چیست؟ راهنمای کامل شرایط تحویل بین‌المللی کالا" />
        <meta
          name="twitter:description"
          content="راهنمای جامع اینکوترمز - آشنایی با انواع شرایط تحویل بین‌المللی کالا"
        />
        <meta name="twitter:image" content="https://tarkhisun.com/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      <Header />

      <main>
        <ArticleBreadcrumb
          category="تجارت بین‌المللی"
          articleTitle="اینکوترمز چیست؟ راهنمای شرایط تحویل بین‌المللی کالا"
        />

        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-secondary to-white">
          <div className="container mx-auto px-4" dir="rtl">
            <div className="max-w-4xl mx-auto">
              <h1 className="heading-primary mb-6 text-persian">
                اینکوترمز چیست؟
                <br />
                <span className="text-accent">راهنمای شرایط تحویل بین‌المللی کالا</span>
              </h1>

              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-8 text-persian">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>راهنمای جامع</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>نویسنده: تیم ترخیصان</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>زمان مطالعه: ۱۴ دقیقه</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="py-16">
          <div className="container mx-auto px-4" dir="rtl">
            <div className="max-w-4xl mx-auto">
              {/* Hero Image */}
              <ArticleImage
                src="/images/blog/incoterms-guide.webp"
                alt="اینکوترمز چیست؟ راهنمای کامل شرایط تحویل بین‌المللی کالا"
                caption="اینکوترمز شرایط تحویل کالا در تجارت بین‌المللی را مشخص می‌کند"
              />

              {/* Introduction */}
              <section className="mb-12">
                <p className="text-lg leading-relaxed mb-6 text-persian">
                  <strong>اینکوترمز (Incoterms)</strong> مخفف عبارت International Commercial Terms به معنای "شرایط تجاری
                  بین‌المللی" است که توسط اتاق بازرگانی بین‌المللی (ICC) تدوین شده و مجموعه‌ای از قوانین استاندارد برای
                  تعیین مسئولیت‌ها، هزینه‌ها و ریسک‌های مربوط به حمل و تحویل کالا در{" "}
                  <Link to="/blog/import-export-guide-iran" className="text-accent hover:underline">
                    تجارت بین‌المللی
                  </Link>{" "}
                  را مشخص می‌کند. برای{" "}
                  <Link to="/blog/dubai-to-abbas-import-guide" className="text-accent hover:underline">
                    واردات از دبی
                  </Link>{" "}
                  یا سایر کشورها، آشنایی با این شرایط ضروری است.
                </p>

                <div className="bg-accent/10 border-r-4 border-accent p-6 rounded-lg mb-6">
                  <p className="text-persian font-medium">
                    نکته مهم: اینکوترمز تعیین می‌کند که چه کسی مسئول پرداخت هزینه حمل، بیمه، بارگیری، تخلیه و{" "}
                    <Link to="/blog/customs-tariff-guide" className="text-accent hover:underline">
                      حقوق گمرکی
                    </Link>{" "}
                    است و در چه نقطه‌ای مسئولیت و ریسک از فروشنده به خریدار منتقل می‌شود.
                  </p>
                </div>
              </section>

              {/* Why Incoterms Matter */}
              <section className="mb-12">
                <h2 className="heading-secondary mb-6 text-persian">چرا اینکوترمز مهم است؟</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="card-service">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-persian">
                        <CheckCircle2 className="w-6 h-6 text-accent" />
                        <strong>شفافیت مسئولیت‌ها</strong>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-persian">
                      تعیین دقیق مسئولیت فروشنده و خریدار در هر مرحله از حمل کالا
                    </CardContent>
                  </Card>

                  <Card className="card-service">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-persian">
                        <CheckCircle2 className="w-6 h-6 text-accent" />
                        کاهش اختلافات
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-persian">
                      پیشگیری از سوءتفاهم و اختلافات قراردادی بین طرفین معامله
                    </CardContent>
                  </Card>

                  <Card className="card-service">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-persian">
                        <CheckCircle2 className="w-6 h-6 text-accent" />
                        مدیریت هزینه‌ها
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-persian">
                      تعیین دقیق اینکه چه کسی کدام هزینه‌ها را پرداخت می‌کند
                    </CardContent>
                  </Card>

                  <Card className="card-service">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-persian">
                        <CheckCircle2 className="w-6 h-6 text-accent" />
                        استاندارد جهانی
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-persian">زبان مشترک برای تمام کشورها در تجارت بین‌المللی</CardContent>
                  </Card>
                </div>
              </section>

              {/* Types of Incoterms */}
              <section className="mb-12">
                <h2 className="heading-secondary mb-6 text-persian">مهم‌ترین انواع اینکوترمز</h2>

                <div className="space-y-6">
                  {incotermsTypes.map((incoterm) => {
                    const Icon = incoterm.icon;
                    return (
                      <Card key={incoterm.code} className="card-service">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-3 text-persian">
                            <div className="p-3 bg-accent/10 rounded-lg">
                              <Icon className="w-6 h-6 text-accent" />
                            </div>
                            <div>
                              <div className="text-2xl font-bold">{incoterm.code}</div>
                              <div className="text-sm text-muted-foreground font-normal">
                                {incoterm.name} ({incoterm.nameFa})
                              </div>
                            </div>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <p className="text-persian">{incoterm.description}</p>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="px-3 py-1 bg-secondary rounded-full text-persian">
                              {incoterm.responsibility}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                <div className="mt-8 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 p-6 rounded-lg">
                  <div className="flex gap-3">
                    <AlertCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2 text-persian">توجه مهم</h3>
                      <p className="text-sm text-persian">
                        اینکوترمز ۲۰۲۰ شامل ۱۱ قانون استاندارد است که در این مقاله به ۵ مورد پرکاربرد آن اشاره شده است.
                        سایر اینکوترمزها شامل FCA, CPT, CIP, FAS, CFR و DAT می‌باشند.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Image 2 */}
              <ArticleImage
                src="/images/blog/incoterms-contract.webp"
                alt="قرارداد تجاری بین‌المللی و تعیین شرایط تحویل کالا"
                caption="انتخاب صحیح اینکوترمز در قراردادهای تجاری بسیار مهم است"
              />

              {/* Selection Tips */}
              <section className="mb-12">
                <h2 className="heading-secondary mb-6 text-persian">نکات انتخاب اینکوترمز مناسب</h2>

                <Card className="card-service">
                  <CardContent className="pt-6">
                    <p className="mb-6 text-persian">
                      انتخاب اینکوترمز مناسب یکی از تصمیمات مهم در قراردادهای تجاری بین‌المللی است. عوامل زیر را در نظر
                      بگیرید:
                    </p>

                    <ul className="space-y-4">
                      {selectionTips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-persian">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </section>

              {/* Practical Example */}
              <section className="mb-12">
                <h2 className="heading-secondary mb-6 text-persian">مثال کاربردی</h2>

                <Card className="card-service bg-gradient-to-br from-accent/5 to-secondary/30">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-4 text-lg text-persian">
                      سناریو: واردات لوازم الکترونیکی از چین به ایران
                    </h3>

                    <div className="space-y-4 text-persian">
                      <div className="p-4 bg-white dark:bg-gray-900 rounded-lg">
                        <strong className="text-accent">اینکوترمز FOB:</strong>
                        <p className="mt-2">
                          فروشنده چینی کالا را در بندر شانگهای روی کشتی قرار می‌دهد. خریدار ایرانی مسئول پرداخت هزینه
                          حمل دریایی، بیمه و ترخیص گمرکی در بندر شهید رجایی است.
                        </p>
                      </div>

                      <div className="p-4 bg-white dark:bg-gray-900 rounded-lg">
                        <strong className="text-accent">اینکوترمز CIF:</strong>
                        <p className="mt-2">
                          فروشنده چینی علاوه بر بارگیری در بندر شانگهای، هزینه حمل دریایی و بیمه کالا تا بندر شهید رجایی
                          را نیز پرداخت می‌کند. خریدار فقط مسئول ترخیص گمرکی و حمل داخلی است.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Common Mistakes */}
              <section className="mb-12">
                <h2 className="heading-secondary mb-6 text-persian">اشتباهات رایج در استفاده از اینکوترمز</h2>

                <div className="space-y-4">
                  <div className="bg-red-50 dark:bg-red-950/20 border-r-4 border-red-500 p-5 rounded-lg">
                    <h3 className="font-semibold mb-2 text-persian">❌ عدم درج صریح اینکوترمز در قرارداد</h3>
                    <p className="text-sm text-persian">
                      همیشه اینکوترمز انتخابی را به صورت واضح در قرارداد درج کنید (مثلاً: CIF Bandar Abbas Incoterms
                      2020)
                    </p>
                  </div>

                  <div className="bg-red-50 dark:bg-red-950/20 border-r-4 border-red-500 p-5 rounded-lg">
                    <h3 className="font-semibold mb-2 text-persian">❌ عدم مطابقت اینکوترمز با نوع حمل</h3>
                    <p className="text-sm text-persian">
                      برخی اینکوترمزها فقط برای حمل دریایی (مثل FOB, CIF) و برخی برای تمام انواع حمل (مثل DAP, DDP)
                      کاربرد دارند
                    </p>
                  </div>

                  <div className="bg-red-50 dark:bg-red-950/20 border-r-4 border-red-500 p-5 rounded-lg">
                    <h3 className="font-semibold mb-2 text-persian">❌ عدم آگاهی از مسئولیت‌های بیمه</h3>
                    <p className="text-sm text-persian">
                      در برخی اینکوترمزها بیمه اجباری نیست، حتماً این موضوع را بررسی کنید
                    </p>
                  </div>
                </div>
              </section>

              {/* Consultation CTA */}
              <section className="mb-12">
                <Card className="card-service bg-gradient-to-br from-accent/10 to-secondary/30 border-accent/20">
                  <CardContent className="pt-6">
                    <h3 className="heading-tertiary mb-4 text-center text-persian">نیاز به مشاوره تخصصی دارید؟</h3>
                    <p className="text-center mb-6 text-persian">
                      تیم متخصص ترخیصان آماده است تا شما را در انتخاب اینکوترمز مناسب و کاهش هزینه‌های واردات یاری کند
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link to="/#contact">
                        <Button size="lg" className="text-persian">
                          درخواست مشاوره رایگان
                        </Button>
                      </Link>
                      <Link to="/blog">
                        <Button variant="outline" size="lg" className="text-persian">
                          مطالعه سایر مقالات
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Related Articles */}
              <RelatedArticles currentPostId={17} limit={3} />

              {/* Contact Info */}
              <section className="border-t pt-8">
                <div className="bg-secondary/30 rounded-xl p-6">
                  <h3 className="font-semibold mb-4 text-persian">تماس با ما</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-persian">
                    <div>
                      <strong>آدرس:</strong>
                      <p className="text-muted-foreground mt-1">بندرعباس، گمرک شهید رجایی</p>
                    </div>
                    <div>
                      <strong>موبایل:</strong>
                      <p className="text-muted-foreground mt-1 font-english">۰۹۱۷۷۳۸۰۰۸۰</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default IncotermsGuide;
