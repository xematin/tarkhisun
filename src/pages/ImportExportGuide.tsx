import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleBreadcrumb from "@/components/ArticleBreadcrumb";
import RelatedArticles from "@/components/RelatedArticles";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, FileText, TrendingUp, Scale, Globe, ShieldCheck, Package } from "lucide-react";
import ArticleImage from "@/components/ArticleImage";

const ImportExportGuide = () => {
  useEffect(() => {
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "fa");
    window.scrollTo(0, 0);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "راهنمای کامل صادرات و واردات در ایران",
    description: "راهنمای جامع صادرات و واردات کالا در ایران: مراحل، مدارک، قوانین، مجوزها و نکات مهم",
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
    datePublished: "2025-10-05",
    dateModified: "2025-12-01",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://tarkhisun.com/blog/import-export-guide-iran",
    },
    keywords: "صادرات و واردات, صادرات ایران, واردات کالا, تجارت خارجی, گمرک ایران",
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
        name: "راهنمای کامل صادرات و واردات در ایران",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <link rel="canonical" href="https://tarkhisun.com/blog/import-export-guide-iran" />
        <title>راهنمای کامل صادرات و واردات در ایران | قوانین، مراحل و نکات مهم</title>
        <meta
          name="description"
          content="راهنمای صادرات و واردات کالا در ایران: مراحل، مدارک، قوانین، مجوزها و نکات تجارت بین‌المللی"
        />
        <meta
          name="keywords"
          content="صادرات و واردات, صادرات ایران, واردات کالا, تجارت خارجی, گمرک ایران, صادرات کالا, واردات محصول, مجوز صادرات, قوانین واردات, تعرفه گمرکی, بازرگانی خارجی"
        />
        
        <meta property="og:title" content="راهنمای کامل صادرات و واردات در ایران" />
        <meta property="og:description" content="راهنمای جامع صادرات و واردات کالا در ایران با تمام جزئیات" />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="fa_IR" />
        <meta property="og:url" content="https://tarkhisun.com/blog/import-export-guide-iran" />
        <meta property="og:site_name" content="ترخیصان" />
        <meta property="og:image" content="https://tarkhisun.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="راهنمای کامل صادرات و واردات در ایران" />
        <meta name="twitter:description" content="راهنمای جامع صادرات و واردات کالا در ایران با تمام جزئیات" />
        <meta name="twitter:image" content="https://tarkhisun.com/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      <Header />

      <main dir="rtl">
        <ArticleBreadcrumb category="تجارت بین‌المللی" articleTitle="راهنمای کامل صادرات و واردات در ایران" />

        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="heading-primary mb-6 text-persian">راهنمای کامل صادرات و واردات در ایران</h1>
              <p className="text-xl text-muted-foreground mb-8 text-persian leading-relaxed">
                آشنایی جامع با فرآیند صادرات و واردات کالا در ایران، مراحل، مدارک لازم، قوانین، محدودیت‌ها و نکات کلیدی
                برای موفقیت در تجارت بین‌المللی
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <article className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Hero Image */}
              <ArticleImage
                src="/images/blog/import-export-container.webp"
                alt="کانتینرهای صادراتی و وارداتی در بندر - راهنمای صادرات و واردات ایران"
                caption="تجارت بین‌المللی و حمل کالا از طریق کانتینر در بنادر ایران"
                priority
              />

              {/* Introduction */}
              <section className="mb-12">
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg text-muted-foreground leading-relaxed text-persian mb-6">
                    صادرات و واردات کالا یکی از مهم‌ترین ارکان اقتصاد هر کشور است که نقش بسزایی در توسعه اقتصادی، ایجاد
                    اشتغال و افزایش درآمد ملی دارد. در ایران نیز با توجه به موقعیت استراتژیک جغرافیایی و دسترسی به
                    بازارهای مختلف، تجارت خارجی اهمیت ویژه‌ای دارد. برای شروع فعالیت تجاری، دریافت{" "}
                    <Link to="/blog/business-card-complete-guide" className="text-accent hover:underline">
                      کارت بازرگانی
                    </Link>{" "}
                    و آشنایی با{" "}
                    <Link to="/blog/ntsw-complete-guide" className="text-accent hover:underline">
                      سامانه جامع تجارت
                    </Link>{" "}
                    ضروری است.
                  </p>
                </div>
              </section>

              {/* صادرات */}
              <section className="mb-12">
                <h2 className="heading-secondary mb-6 text-persian">صادرات کالا از ایران</h2>

                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="text-persian flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-accent" />
                      تعریف صادرات
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-persian leading-relaxed">
                      صادرات به فرآیند فروش و ارسال کالا یا خدمات از یک کشور به کشور دیگر گفته می‌شود. صادرات یکی از
                      راه‌های اصلی کسب درآمد ارزی برای کشور و افزایش تولید داخلی است.
                    </p>
                  </CardContent>
                </Card>

                <h3 className="text-xl mb-4 text-persian">
                  <strong>انواع صادرات در ایران</strong>
                </h3>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-persian">
                        <strong>۱. صادرات قطعی</strong>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-persian">
                        ارسال کالای تولید شده در ایران به خارج از کشور به صورت دائمی
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-persian">۲. صادرات موقت</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-persian">
                        ارسال کالا به خارج با هدف بازگشت مجدد به کشور (مانند نمایشگاه‌ها)
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-persian">۳. صادرات ترانزیت</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-persian">
                        عبور کالا از خاک ایران برای رسیدن به کشور مقصد
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-persian">۴. صادرات مجدد</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-persian">صادرات کالایی که قبلاً وارد ایران شده است</p>
                    </CardContent>
                  </Card>
                </div>

                <h3 className="text-xl font-semibold mb-4 text-persian">مراحل صادرات کالا</h3>
                <div className="space-y-4 mb-8">
                  {[
                    { step: "۱", title: "اخذ کارت بازرگانی", desc: "دریافت کارت بازرگانی از اتاق بازرگانی" },
                    {
                      step: "۲",
                      title: "ثبت سفارش در سامانه TPO",
                      desc: "ثبت سفارش صادراتی در سامانه سازمان توسعه تجارت",
                    },
                    { step: "۳", title: "دریافت مجوزهای لازم", desc: "اخذ مجوز استاندارد و سایر مجوزهای مورد نیاز" },
                    { step: "۴", title: "بسته‌بندی و حمل", desc: "آماده‌سازی کالا و ارسال به گمرک" },
                    { step: "۵", title: "اظهار گمرکی", desc: "ثبت اظهارنامه صادراتی در سامانه گمرک" },
                    { step: "۶", title: "معاینه و ترخیص", desc: "معاینه کالا توسط گمرک و صدور مجوز صادرات" },
                    { step: "۷", title: "حمل به مقصد", desc: "ارسال کالا به کشور مقصد" },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4 items-start">
                      <div className="bg-accent text-accent-foreground rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-semibold text-persian mb-1">{item.title}</h4>
                        <p className="text-muted-foreground text-persian">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Image 2 */}
              <ArticleImage
                src="/images/blog/import-export-shipping.webp"
                alt="کشتی باری در حال حمل کالا - واردات و صادرات بین‌المللی"
                caption="حمل دریایی کالا یکی از روش‌های اصلی تجارت بین‌المللی"
              />

              {/* واردات */}
              <section className="mb-12">
                <h2 className="heading-secondary mb-6 text-persian">واردات کالا به ایران</h2>

                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="text-persian flex items-center gap-2">
                      <Package className="w-5 h-5 text-accent" />
                      تعریف واردات
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-persian leading-relaxed">
                      واردات به فرآیند خرید و وارد کردن کالا یا خدمات از کشورهای دیگر به ایران گفته می‌شود. واردات برای
                      تأمین نیازهای داخلی، دسترسی به فناوری‌های جدید و تنوع در بازار ضروری است.
                    </p>
                  </CardContent>
                </Card>

                <h3 className="text-xl font-semibold mb-4 text-persian">انواع واردات در ایران</h3>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-persian">۱. واردات قطعی</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-persian">ورود کالا به کشور برای استفاده یا فروش دائمی</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-persian">۲. واردات موقت</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-persian">ورود موقت کالا با تعهد خروج مجدد از کشور</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-persian">۳. واردات تجهیزات خطوط تولید</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-persian">ورود ماشین‌آلات و تجهیزات صنعتی</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-persian">۴. واردات مواد اولیه</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-persian">ورود مواد خام برای تولید داخلی</p>
                    </CardContent>
                  </Card>
                </div>

                <h3 className="text-xl font-semibold mb-4 text-persian">مراحل واردات کالا</h3>
                <div className="space-y-4 mb-8">
                  {[
                    { step: "۱", title: "اخذ کارت بازرگانی", desc: "دریافت کارت بازرگانی با توجه به نوع کالا" },
                    { step: "۲", title: "ثبت سفارش", desc: "ثبت سفارش واردات در سامانه جامع تجارت (NTSW)" },
                    { step: "۳", title: "تأمین ارز", desc: "تأمین ارز از طریق نیما یا سنا" },
                    { step: "۴", title: "حمل کالا", desc: "ارسال کالا از کشور مبدأ به ایران" },
                    { step: "۵", title: "ثبت اظهارنامه", desc: "ثبت اظهارنامه گمرکی در سامانه" },
                    { step: "۶", title: "پرداخت حقوق گمرکی", desc: "محاسبه و پرداخت حقوق، عوارض و مالیات" },
                    { step: "۷", title: "معاینه و ترخیص", desc: "معاینه کالا و ترخیص از گمرک" },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4 items-start">
                      <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-semibold text-persian mb-1">{item.title}</h4>
                        <p className="text-muted-foreground text-persian">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* مدارک لازم */}
              <section className="mb-12">
                <h2 className="heading-secondary mb-6 text-persian">مدارک لازم برای صادرات و واردات</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-persian flex items-center gap-2">
                        <FileText className="w-5 h-5 text-accent" />
                        مدارک صادرات
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {[
                          "کارت بازرگانی معتبر",
                          "ثبت سفارش صادراتی",
                          "پروفرما اینویس",
                          "بسته‌بندی لیست",
                          "گواهی استاندارد (در صورت نیاز)",
                          "مجوزهای ویژه (برای کالاهای خاص)",
                          "گواهی مبدأ کالا",
                        ].map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-persian">
                            <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-persian flex items-center gap-2">
                        <FileText className="w-5 h-5 text-primary" />
                        مدارک واردات
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {[
                          "کارت بازرگانی معتبر",
                          "ثبت سفارش واردات",
                          "پروفرما اینویس",
                          "بارنامه (Bill of Lading)",
                          "اینویس تجاری",
                          "گواهی مبدأ کالا",
                          "گواهی بازرسی (در صورت نیاز)",
                        ].map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-persian">
                            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* قوانین و محدودیت‌ها */}
              <section className="mb-12">
                <h2 className="heading-secondary mb-6 text-persian">قوانین و محدودیت‌های مهم</h2>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-persian flex items-center gap-2">
                        <Scale className="w-5 h-5 text-accent" />
                        محدودیت‌های واردات
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-muted-foreground text-persian">
                        <li>• کالاهای ممنوع‌الورود (لیست کالاهای ممنوعه گمرک)</li>
                        <li>• کالاهای مشروط به مجوز (نیازمند تأییدیه‌های خاص)</li>
                        <li>• محدودیت‌های سلامت و بهداشت</li>
                        <li>• الزامات استاندارد کالا</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-persian flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-primary" />
                        مشوق‌های صادراتی
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-muted-foreground text-persian">
                        <li>• معافیت مالیاتی برای صادرکنندگان</li>
                        <li>• تخفیف در عوارض گمرکی</li>
                        <li>• تسهیلات ارزی و اعتباری</li>
                        <li>• بیمه صادراتی دولتی</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* نکات مهم */}
              <section className="mb-12">
                <h2 className="heading-secondary mb-6 text-persian">نکات کلیدی برای موفقیت</h2>

                <Card className="bg-accent/5 border-accent">
                  <CardContent className="pt-6">
                    <ul className="space-y-4">
                      {[
                        "بررسی دقیق بازار هدف و رقبا قبل از شروع فعالیت",
                        "آشنایی کامل با قوانین گمرکی و تعرفه‌ها",
                        "انتخاب صحیح کد HS برای کالا",
                        "استفاده از خدمات کارشناسان ترخیص کالا",
                        "رعایت استانداردها و کیفیت محصولات",
                        "مدیریت صحیح ارز و پرداخت‌های بین‌المللی",
                        "بیمه کامل کالا در حین حمل",
                        "انتخاب درست اینکوترمز مناسب",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-3 text-persian">
                          <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </section>

              {/* CTA */}
              <section className="mb-12">
                <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-none">
                  <CardContent className="p-8 text-center">
                    <Globe className="w-16 h-16 mx-auto mb-4 text-accent" />
                    <h3 className="heading-tertiary mb-4 text-persian">نیاز به مشاوره تخصصی صادرات و واردات دارید؟</h3>
                    <p className="text-muted-foreground mb-6 text-persian max-w-2xl mx-auto">
                      تیم متخصص ترخیصان آماده ارائه مشاوره و خدمات جامع در زمینه صادرات و واردات، ترخیص کالا و امور
                      گمرکی است
                    </p>
                    <Link to="/#contact">
                      <Button size="lg" className="text-persian">
                        درخواست مشاوره رایگان
                        <ArrowRight className="mr-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </section>

              {/* Related Articles */}
              <RelatedArticles currentPostId={18} limit={4} />
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default ImportExportGuide;
