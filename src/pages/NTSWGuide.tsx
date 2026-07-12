import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleBreadcrumb from "@/components/ArticleBreadcrumb";
import RelatedArticles from "@/components/RelatedArticles";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Globe, FileText, Users, Shield, Clock, BarChart } from "lucide-react";
import ArticleImage from "@/components/ArticleImage";

const NTSWGuide = () => {
  useEffect(() => {
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "fa");
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "سامانه جامع تجارت (ntsw.ir) - راهنمای کامل ثبت‌نام و استفاده",
    description:
      "راهنمای جامع سامانه ملی تجارت ایران (NTSW) - آموزش گام به گام ثبت‌نام، صدور مجوز واردات و صادرات، خدمات الکترونیک تجاری و ارتباط با گمرک",
    image: "https://tarkhisun.com/og-image.jpg",
    author: {
      "@type": "Organization",
      name: "ترخیصان",
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
    datePublished: "2025-10-01",
    dateModified: "2025-10-01",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://tarkhisun.com/blog/ntsw-guide",
    },
    keywords: "سامانه جامع تجارت, ntsw, واردات و صادرات, مجوز واردات, گمرک",
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
        name: "سامانه جامع تجارت ایران",
      },
    ],
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://tarkhisun.com/blog/ntsw-complete-guide" />
        <title>سامانه جامع تجارت (ntsw.ir) | راهنمای کامل ثبت‌نام و استفاده</title>
        <meta
          name="description"
          content="راهنمای سامانه جامع تجارت (NTSW): ثبت‌نام، صدور مجوز واردات و صادرات و خدمات الکترونیک تجاری"
        />
        <meta
          name="keywords"
          content="سامانه جامع تجارت, ntsw, سامانه ملی تجارت, ثبت نام ntsw, واردات و صادرات, مجوز واردات, گواهی ثبت سفارش, پروانه گمرکی, تجارت الکترونیک"
        />
        
        <meta property="og:title" content="سامانه جامع تجارت (ntsw.ir) | راهنمای کامل ثبت‌نام و استفاده" />
        <meta
          property="og:description"
          content="راهنمای جامع سامانه ملی تجارت ایران - آموزش ثبت‌نام، صدور مجوز واردات و صادرات"
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://tarkhisun.com/blog/ntsw-guide" />
        <meta property="og:locale" content="fa_IR" />
        <meta property="og:site_name" content="ترخیصان" />
        <meta property="og:image" content="https://tarkhisun.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="سامانه جامع تجارت (ntsw.ir) | راهنمای کامل ثبت‌نام و استفاده" />
        <meta
          name="twitter:description"
          content="راهنمای جامع سامانه ملی تجارت ایران - آموزش ثبت‌نام، صدور مجوز واردات و صادرات"
        />
        <meta name="twitter:image" content="https://tarkhisun.com/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <main>
          <ArticleBreadcrumb category="راهنمای سامانه‌ها" articleTitle="سامانه جامع تجارت ایران (ntsw.ir)" />

          {/* Hero Section */}
          <section className="py-20 bg-gradient-to-br from-secondary to-white">
            <div className="container mx-auto px-4" dir="rtl">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-block mb-6">
                  <span className="text-sm font-medium text-accent bg-accent/10 px-4 py-2 rounded-full text-persian">
                    راهنمای سامانه‌های تجاری
                  </span>
                </div>

                <h1 className="heading-primary mb-6 text-persian">
                  سامانه جامع تجارت ایران
                  <br />
                  <span className="text-accent">(ntsw.ir)</span>
                </h1>

                <p className="text-xl text-muted-foreground mb-8 text-persian leading-relaxed">
                  راهنمای کامل ثبت‌نام، استفاده و دریافت خدمات الکترونیک تجاری از سامانه ملی تجارت
                </p>

                <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground text-persian">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    <span>آموزش ثبت‌نام</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    <span>صدور مجوز</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    <span>خدمات الکترونیک</span>
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
                  src="/images/blog/ntsw-complete-guide.webp"
                  alt="سامانه جامع تجارت ایران - پلتفرم دیجیتال تجارت الکترونیک"
                  caption="سامانه جامع تجارت (NTSW) - پنجره واحد تجارت خارجی ایران"
                  priority
                />

                {/* Introduction */}
                <section className="mb-12">
                  <h2 className="heading-secondary mb-6 text-persian">
                    <strong>سامانه جامع تجارت چیست؟</strong>
                  </h2>
                  <div className="prose-persian space-y-4">
                    <p className="text-lg leading-relaxed">
                      <strong>سامانه جامع تجارت (National Trade Single Window)</strong> یک پلتفرم الکترونیکی یکپارچه است
                      که توسط وزارت صنعت، معدن و تجارت ایران راه‌اندازی شده و تمامی خدمات تجاری مرتبط با{" "}
                      <Link to="/blog/import-export-complete-guide" className="text-accent hover:underline">
                        واردات و صادرات
                      </Link>{" "}
                      را در یک بستر واحد ارائه می‌دهد.
                    </p>
                    <p className="text-lg leading-relaxed">
                      این سامانه با هدف تسهیل فرآیندهای تجاری، کاهش زمان و هزینه‌های مبادلات بین‌المللی و ایجاد شفافیت
                      در معاملات طراحی شده است. NTSW به عنوان دروازه الکترونیکی{" "}
                      <Link to="/blog/import-export-complete-guide" className="text-accent hover:underline">
                        تجارت خارجی
                      </Link>{" "}
                      ایران، ارتباط مستقیم بین بازرگانان و دستگاه‌های مختلف دولتی از جمله گمرک، بانک مرکزی، وزارتخانه‌ها
                      و سازمان‌های نظارتی را فراهم می‌کند.
                    </p>
                  </div>
                </section>

                {/* Key Features */}
                <section className="mb-12">
                  <h2 className="heading-secondary mb-6 text-persian">ویژگی‌های کلیدی سامانه NTSW</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="card-service">
                      <CardHeader>
                        <Globe className="w-10 h-10 text-accent mb-3" />
                        <CardTitle className="text-persian">پنجره واحد تجاری</CardTitle>
                      </CardHeader>
                      <CardContent className="text-persian">
                        دسترسی به تمام خدمات تجاری در یک پلتفرم یکپارچه بدون نیاز به مراجعه حضوری
                      </CardContent>
                    </Card>

                    <Card className="card-service">
                      <CardHeader>
                        <Clock className="w-10 h-10 text-accent mb-3" />
                        <CardTitle className="text-persian">صرفه‌جویی در زمان</CardTitle>
                      </CardHeader>
                      <CardContent className="text-persian">
                        کاهش قابل توجه زمان صدور مجوزها و انجام فرآیندهای تجاری از هفته‌ها به روزها
                      </CardContent>
                    </Card>

                    <Card className="card-service">
                      <CardHeader>
                        <Shield className="w-10 h-10 text-accent mb-3" />
                        <CardTitle className="text-persian">امنیت بالا</CardTitle>
                      </CardHeader>
                      <CardContent className="text-persian">
                        استفاده از بالاترین استانداردهای امنیتی و رمزنگاری اطلاعات
                      </CardContent>
                    </Card>

                    <Card className="card-service">
                      <CardHeader>
                        <BarChart className="w-10 h-10 text-accent mb-3" />
                        <CardTitle className="text-persian">شفافیت کامل</CardTitle>
                      </CardHeader>
                      <CardContent className="text-persian">
                        رهگیری لحظه‌ای وضعیت درخواست‌ها و دسترسی به آمار و گزارش‌های جامع
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* Second Image */}
                <ArticleImage
                  src="/images/blog/ntsw-business.webp"
                  alt="خدمات الکترونیکی سامانه جامع تجارت برای بازرگانان"
                  caption="خدمات الکترونیک تجاری در سامانه NTSW"
                />

                {/* Services */}
                <section className="mb-12">
                  <h2 className="heading-secondary mb-6 text-persian">خدمات ارائه شده در سامانه NTSW</h2>
                  <Card className="card-service">
                    <CardContent className="pt-6">
                      <div className="space-y-4 text-persian">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                          <div>
                            <strong className="block mb-1">ثبت سفارش کالا (Registration)</strong>
                            <p className="text-muted-foreground">
                              ثبت اطلاعات سفارش واردات کالا و دریافت کد رهگیری ثبت سفارش
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                          <div>
                            <strong className="block mb-1">تخصیص ارز</strong>
                            <p className="text-muted-foreground">درخواست و تخصیص ارز از بانک مرکزی برای واردات کالا</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                          <div>
                            <strong className="block mb-1">صدور مجوزهای تخصصی</strong>
                            <p className="text-muted-foreground">
                              دریافت مجوزهای لازم از وزارتخانه‌ها و سازمان‌های ذیربط (بهداشت، استاندارد، محیط زیست و...)
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                          <div>
                            <strong className="block mb-1">گواهی سلامت و استاندارد</strong>
                            <p className="text-muted-foreground">صدور گواهی‌های سلامت کالا و استاندارد محصولات</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                          <div>
                            <strong className="block mb-1">پروانه گمرکی</strong>
                            <p className="text-muted-foreground">دریافت پروانه ورود یا خروج کالا از گمرک</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                          <div>
                            <strong className="block mb-1">اعلام آمادگی ترخیص</strong>
                            <p className="text-muted-foreground">اعلام آمادگی کالا برای ترخیص از گمرک</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                          <div>
                            <strong className="block mb-1">پیگیری اظهارنامه گمرکی</strong>
                            <p className="text-muted-foreground">رهگیری وضعیت اظهارنامه‌های گمرکی و مراحل ترخیص</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Registration Guide */}
                <section className="mb-12">
                  <h2 className="heading-secondary mb-6 text-persian">مراحل ثبت‌نام در سامانه NTSW</h2>
                  <div className="space-y-6">
                    <Card className="card-service">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                            <span className="text-accent font-bold">۱</span>
                          </div>
                          <CardTitle className="text-persian">ورود به سامانه</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="text-persian">
                        <p className="mb-3">
                          به وب‌سایت رسمی سامانه جامع تجارت به آدرس <strong className="text-accent">ntsw.ir</strong>{" "}
                          مراجعه کنید
                        </p>
                        <p className="text-muted-foreground">
                          از مرورگرهای مدرن مانند Chrome، Firefox یا Edge استفاده کنید
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="card-service">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                            <span className="text-accent font-bold">۲</span>
                          </div>
                          <CardTitle className="text-persian">تکمیل اطلاعات هویتی</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="text-persian">
                        <p className="mb-3">مدارک مورد نیاز:</p>
                        <ul className="list-disc mr-6 space-y-2 text-muted-foreground">
                          <li>کد ملی یا شناسه ملی (برای اشخاص حقوقی)</li>
                          <li>کد اقتصادی</li>
                          <li>شماره همراه معتبر</li>
                          <li>آدرس پست الکترونیکی فعال</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="card-service">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                            <span className="text-accent font-bold">۳</span>
                          </div>
                          <CardTitle className="text-persian">احراز هویت</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="text-persian">
                        <p className="mb-3">احراز هویت از طریق یکی از روش‌های زیر:</p>
                        <ul className="list-disc mr-6 space-y-2 text-muted-foreground">
                          <li>سامانه احراز هویت ثنا (پیشنهادی)</li>
                          <li>مراجعه حضوری به دفاتر پیشخوان دولت</li>
                          <li>استفاده از امضای الکترونیکی</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="card-service">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                            <span className="text-accent font-bold">۴</span>
                          </div>
                          <CardTitle className="text-persian">فعال‌سازی حساب</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="text-persian">
                        <p className="text-muted-foreground">
                          پس از تایید احراز هویت، حساب کاربری شما فعال شده و می‌توانید از تمامی خدمات سامانه استفاده
                          کنید
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* Important Tips */}
                <section className="mb-12">
                  <h2 className="heading-secondary mb-6 text-persian">نکات مهم در استفاده از NTSW</h2>
                  <Card className="card-service bg-accent/5 border-accent/20">
                    <CardContent className="pt-6">
                      <div className="space-y-4 text-persian">
                        <div className="flex items-start gap-3">
                          <FileText className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                          <div>
                            <strong className="block mb-1">دقت در اطلاعات</strong>
                            <p className="text-muted-foreground">
                              همه اطلاعات وارد شده باید دقیق و مطابق با مدارک رسمی باشد
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Users className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                          <div>
                            <strong className="block mb-1">استفاده از کارشناس</strong>
                            <p className="text-muted-foreground">
                              برای مواردی پیچیده، از خدمات مشاوران گمرکی و کارشناسان ترخیص کالا استفاده کنید
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Shield className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                          <div>
                            <strong className="block mb-1">امنیت حساب</strong>
                            <p className="text-muted-foreground">
                              از رمز عبور قوی استفاده کنید و اطلاعات ورود خود را با دیگران به اشتراک نگذارید
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Clock className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                          <div>
                            <strong className="block mb-1">پیگیری مداوم</strong>
                            <p className="text-muted-foreground">وضعیت درخواست‌های خود را به صورت منظم پیگیری کنید</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Benefits */}
                <section className="mb-12">
                  <h2 className="heading-secondary mb-6 text-persian">مزایای استفاده از سامانه جامع تجارت</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-secondary/30 rounded-xl p-6 text-persian">
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-accent" />
                        کاهش زمان انجام کار
                      </h3>
                      <p className="text-muted-foreground">
                        انجام تمام مراحل به صورت الکترونیکی و کاهش زمان از هفته‌ها به چند روز
                      </p>
                    </div>

                    <div className="bg-secondary/30 rounded-xl p-6 text-persian">
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-accent" />
                        کاهش هزینه‌ها
                      </h3>
                      <p className="text-muted-foreground">
                        حذف نیاز به مراجعات حضوری و کاهش هزینه‌های رفت و آمد و زمان
                      </p>
                    </div>

                    <div className="bg-secondary/30 rounded-xl p-6 text-persian">
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-accent" />
                        شفافیت کامل
                      </h3>
                      <p className="text-muted-foreground">دسترسی لحظه‌ای به وضعیت پرونده و شفافیت در تمام مراحل</p>
                    </div>

                    <div className="bg-secondary/30 rounded-xl p-6 text-persian">
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-accent" />
                        یکپارچگی خدمات
                      </h3>
                      <p className="text-muted-foreground">دسترسی به تمام خدمات تجاری در یک پلتفرم واحد</p>
                    </div>
                  </div>
                </section>

                {/* CTA Section */}
                <section className="mb-12">
                  <Card className="card-service bg-gradient-to-br from-accent/5 to-secondary/50 border-accent/20">
                    <CardContent className="pt-8 pb-8 text-center">
                      <h3 className="heading-tertiary mb-4 text-persian">
                        نیاز به راهنمایی برای استفاده از سامانه جامع تجارت دارید؟
                      </h3>
                      <p className="text-lg text-muted-foreground mb-6 text-persian">
                        تیم متخصص ترخیصان آماده است تا شما را در تمام مراحل ثبت‌نام، استفاده از سامانه NTSW و انجام امور
                        گمرکی یاری کند
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link to="/#contact">
                          <Button size="lg" className="text-persian gap-2">
                            تماس با ما
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </Link>
                        <a href="tel:09177380080" className="text-persian">
                          <Button size="lg" variant="outline" className="gap-2">
                            <span className="font-bold">۰۹۱۷۷۳۸۰۰۸۰</span>
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Related Articles */}
                <RelatedArticles currentPostId={14} limit={3} />

                {/* Back to Blog */}
                <div className="text-center pt-8 border-t">
                  <Link to="/blog">
                    <Button variant="ghost" className="text-persian gap-2">
                      <ArrowRight className="w-4 h-4" />
                      بازگشت به بلاگ
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default NTSWGuide;
