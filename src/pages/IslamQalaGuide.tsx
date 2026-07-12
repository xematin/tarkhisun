import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleBreadcrumb from "@/components/ArticleBreadcrumb";
import RelatedArticles from "@/components/RelatedArticles";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  MapPin,
  FileText,
  TrendingUp,
  Shield,
  AlertCircle,
  CheckCircle2,
  Clock,
  Users,
  Building2,
} from "lucide-react";
import ArticleImage from "@/components/ArticleImage";

const IslamQalaGuide = () => {
  useEffect(() => {
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "fa");
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "اسلام قلعه | راهنمای کامل گذرگاه مرزی ایران و افغانستان",
    description:
      "راهنمای جامع گذرگاه مرزی اسلام قلعه: موقعیت جغرافیایی، خدمات گمرکی، مراحل ترانزیت، مدارک لازم، تجهیزات، ساعات کاری، تعرفه‌ها و نکات مهم تجارت با افغانستان",
    author: {
      "@type": "Organization",
      name: "ترخیصان - مشاوره امور گمرکی",
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
    datePublished: "2025-10-09",
    dateModified: "2025-10-09",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": typeof window !== "undefined" ? window.location.href : "",
    },
    keywords:
      "اسلام قلعه, گذرگاه مرزی, مرز ایران و افغانستان, گمرک اسلام قلعه, ترانزیت به افغانستان, صادرات به افغانستان, واردات از افغانستان, تجارت با افغانستان, مرز دوغارون, هرات",
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://tarkhisun.com/blog/islam-qala-border-crossing-guide" />
        <title>اسلام قلعه | راهنمای کامل گذرگاه مرزی ایران و افغانستان | ترخیصان</title>
        <meta
          name="description"
          content="راهنمای گذرگاه مرزی اسلام قلعه: خدمات گمرکی، مراحل ترانزیت، مدارک و تعرفه‌های تجارت با افغانستان"
        />
        <meta
          name="keywords"
          content="اسلام قلعه, گذرگاه مرزی, مرز ایران و افغانستان, گمرک اسلام قلعه, ترانزیت به افغانستان, صادرات به افغانستان, واردات از افغانستان, تجارت با افغانستان, مرز دوغارون, هرات, مشاوره گمرکی, ترخیص کالا, حمل و نقل بین المللی"
        />
        

        {/* Open Graph Tags */}
        <meta property="og:title" content="اسلام قلعه | راهنمای کامل گذرگاه مرزی ایران و افغانستان" />
        <meta
          property="og:description"
          content="راهنمای جامع گذرگاه مرزی اسلام قلعه: موقعیت، خدمات، مراحل و نکات تجارت با افغانستان"
        />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="fa_IR" />

        {/* Schema.org Structured Data */}
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main>
          <ArticleBreadcrumb
            category="گذرگاه‌های مرزی"
            articleTitle="اسلام قلعه - راهنمای کامل گذرگاه مرزی ایران و افغانستان"
          />

          {/* Hero Section */}
          <section className="py-20 bg-gradient-to-br from-secondary to-white">
            <div className="container mx-auto px-4" dir="rtl">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <MapPin className="w-4 h-4" />
                  گذرگاه‌های مرزی
                </div>

                <h1 className="heading-primary mb-6 text-persian">
                  اسلام قلعه
                  <br />
                  <span className="text-accent">راهنمای کامل گذرگاه مرزی ایران و افغانستان</span>
                </h1>

                <p className="text-xl text-muted-foreground mb-8 text-persian leading-relaxed">
                  راهنمای جامع گذرگاه مرزی اسلام قلعه: موقعیت جغرافیایی، خدمات گمرکی، مراحل ترانزیت و صادرات، مدارک لازم
                  و نکات کلیدی تجارت با افغانستان
                </p>

                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  <div className="flex items-center gap-2 bg-background/80 backdrop-blur px-4 py-2 rounded-lg shadow-sm text-persian">
                    <Clock className="w-4 h-4 text-accent" />
                    زمان مطالعه: ۱۵ دقیقه
                  </div>
                  <div className="flex items-center gap-2 bg-background/80 backdrop-blur px-4 py-2 rounded-lg shadow-sm text-persian">
                    <Users className="w-4 h-4 text-accent" />
                    تیم ترخیصان
                  </div>
                </div>

                <ArticleImage
                  src="/images/blog/islam-qala-border-crossing-guide.webp"
                  alt="اسلام قلعه | راهنمای کامل گذرگاه مرزی ایران و افغانستان"
                  caption="موقعیت جغرافیایی گذرگاه مرزی اسلام قلعه در مرز ایران و افغانستان"
                  className="mt-8"
                />
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-16">
            <div className="container mx-auto px-4" dir="rtl">
              <article className="max-w-4xl mx-auto prose prose-lg text-persian">
                {/* Introduction */}
                <Card className="mb-12 border-r-4 border-r-accent">
                  <CardContent className="p-6">
                    <h2 className="text-2xl mb-4 text-persian flex items-center gap-2">
                      <MapPin className="w-6 h-6 text-accent" />
                      <strong>گذرگاه مرزی اسلام قلعه چیست؟</strong>
                    </h2>
                    <p className="text-muted-foreground leading-relaxed text-persian">
                      اسلام قلعه یکی از مهم‌ترین و استراتژیک‌ترین گذرگاه‌های مرزی ایران در مرز با افغانستان است که در
                      استان خراسان رضوی واقع شده و نقش حیاتی در{" "}
                      <Link to="/blog/import-export-guide-iran" className="text-accent hover:underline">
                        تجارت دو کشور
                      </Link>{" "}
                      ایفا می‌کند. این مرز در مقابل شهر و گذرگاه دوغارون افغانستان قرار دارد و یکی از اصلی‌ترین مسیرهای
                      صادرات کالا به افغانستان و{" "}
                      <Link to="/blog/kuwait-afghanistan-transit-guide" className="text-accent hover:underline">
                        ترانزیت به کشورهای آسیای میانه
                      </Link>{" "}
                      محسوب می‌شود. برای آشنایی با{" "}
                      <Link to="/blog/manifest-guide" className="text-accent hover:underline">
                        مانیفست و مدارک گمرکی
                      </Link>
                      ، مقاله مربوطه را مطالعه کنید.
                    </p>
                  </CardContent>
                </Card>

                {/* Geographic Location */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 text-persian flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-accent" />
                    موقعیت جغرافیایی
                  </h2>

                  <Card className="mb-6">
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-bold text-lg mb-3 text-persian">سمت ایران</h3>
                          <ul className="space-y-2 text-muted-foreground text-persian">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                              <span>استان: خراسان رضوی</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                              <span>شهرستان: تایباد</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                              <span>فاصله از مشهد: حدود ۲۹۰ کیلومتر</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                              <span>نزدیک‌ترین شهر: تایباد</span>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-bold text-lg mb-3 text-persian">سمت افغانستان</h3>
                          <ul className="space-y-2 text-muted-foreground text-persian">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                              <span>نام گذرگاه: دوغارون (Dogharoun)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                              <span>استان: هرات</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                              <span>فاصله از هرات: حدود ۱۲۰ کیلومتر</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                              <span>دسترسی به شهرهای اصلی افغانستان</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <ArticleImage
                  src="/images/blog/islam-qala-border.webp"
                  alt="گمرک اسلام قلعه - حمل و نقل کالا در مرز ایران و افغانستان"
                  caption="حمل و نقل کالا در گمرک اسلام قلعه"
                  className="my-8"
                />

                {/* Importance */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 text-persian flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-accent" />
                    اهمیت استراتژیک اسلام قلعه
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="border-t-4 border-t-accent">
                      <CardContent className="p-6">
                        <h3 className="font-bold text-lg mb-3 text-persian flex items-center gap-2">
                          <Building2 className="w-5 h-5 text-accent" />
                          اهمیت تجاری
                        </h3>
                        <ul className="space-y-2 text-muted-foreground text-persian text-sm">
                          <li className="flex items-start gap-2">
                            <span className="text-accent font-bold">•</span>
                            <span>بیش از ۶۰٪ صادرات ایران به افغانستان</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-accent font-bold">•</span>
                            <span>دروازه اصلی تجارت با آسیای میانه</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-accent font-bold">•</span>
                            <span>مسیر ترانزیتی به ترکمنستان و ازبکستان</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-accent font-bold">•</span>
                            <span>حجم بالای عبور کامیون و کالا</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-t-4 border-t-accent">
                      <CardContent className="p-6">
                        <h3 className="font-bold text-lg mb-3 text-persian flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-accent" />
                          مزایای جغرافیایی
                        </h3>
                        <ul className="space-y-2 text-muted-foreground text-persian text-sm">
                          <li className="flex items-start gap-2">
                            <span className="text-accent font-bold">•</span>
                            <span>نزدیکی به مراکز صنعتی شرق ایران</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-accent font-bold">•</span>
                            <span>دسترسی آسان به بندر چابهار و بندرعباس</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-accent font-bold">•</span>
                            <span>جاده‌های مناسب و زیرساخت قوی</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-accent font-bold">•</span>
                            <span>کمترین مسافت تا هرات افغانستان</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Customs Services */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 text-persian flex items-center gap-2">
                    <Building2 className="w-6 h-6 text-accent" />
                    خدمات و تجهیزات گمرک اسلام قلعه
                  </h2>

                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-bold text-lg mb-3 text-persian text-accent">تجهیزات گمرکی</h3>
                          <ul className="grid md:grid-cols-2 gap-3 text-muted-foreground text-persian">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                              <span>سیستم بازرسی اشعه ایکس (X-Ray)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                              <span>سیستم وزن‌کشی الکترونیک</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                              <span>انبارهای مدرن نگهداری کالا</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                              <span>پایانه صادرات و واردات مجزا</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                              <span>سیستم‌های امنیتی پیشرفته</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                              <span>اتصال به سیستم جامع گمرکی</span>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-bold text-lg mb-3 text-persian text-accent">خدمات پشتیبانی</h3>
                          <ul className="grid md:grid-cols-2 gap-3 text-muted-foreground text-persian">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                              <span>صرافی‌های مجاز ارزی</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                              <span>شرکت‌های حمل و نقل بین‌المللی</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                              <span>دفاتر ترخیص کالا</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                              <span>خدمات بانکی و اعتباری</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                              <span>بیمه محموله‌های صادراتی</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                              <span>پارکینگ و رفاهیات رانندگان</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Export Process */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 text-persian flex items-center gap-2">
                    <FileText className="w-6 h-6 text-accent" />
                    مراحل صادرات کالا از اسلام قلعه
                  </h2>

                  <div className="space-y-4">
                    {[
                      {
                        step: "۱",
                        title: "ثبت سفارش در سامانه جامع تجارت",
                        description: "ثبت اطلاعات کالا، خریدار و مقصد در سامانه ntsw.ir و دریافت کد رهگیری",
                      },
                      {
                        step: "۲",
                        title: "تهیه اسناد و مدارک",
                        description: "آماده‌سازی پروفرما، لیست بسته‌بندی، گواهی مبدا و سایر مدارک مورد نیاز",
                      },
                      {
                        step: "۳",
                        title: "حمل کالا به گمرک",
                        description: "انتقال کالا توسط باربری مجاز به پایانه صادراتی اسلام قلعه",
                      },
                      {
                        step: "۴",
                        title: "ثبت اظهارنامه گمرکی",
                        description: "تکمیل اظهارنامه صادراتی در سیستم گمرک توسط کارشناس ترخیص",
                      },
                      {
                        step: "۵",
                        title: "بازرسی و معاینه فیزیکی",
                        description: "بررسی کالا توسط مامورین گمرک و تایید مطابقت با اسناد",
                      },
                      {
                        step: "۶",
                        title: "پرداخت هزینه‌ها و عوارض",
                        description: "تسویه عوارض صادراتی، هزینه خدمات و سایر بهای خدمات",
                      },
                      {
                        step: "۷",
                        title: "دریافت مجوز خروج",
                        description: "اخذ برگ ترخیص و تایید نهایی برای خروج کالا از مرز",
                      },
                      {
                        step: "۸",
                        title: "تحویل به طرف افغانستانی",
                        description: "عبور کالا از مرز و تحویل به گمرک دوغارون افغانستان",
                      },
                    ].map((item, index) => (
                      <Card
                        key={index}
                        className="border-r-4 border-r-accent/30 hover:border-r-accent transition-colors"
                      >
                        <CardContent className="p-6">
                          <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                              <span className="text-accent font-bold text-persian">{item.step}</span>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-lg mb-2 text-persian">{item.title}</h3>
                              <p className="text-muted-foreground text-persian">{item.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Required Documents */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 text-persian flex items-center gap-2">
                    <FileText className="w-6 h-6 text-accent" />
                    مدارک لازم برای صادرات
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="font-bold text-lg mb-4 text-persian text-accent">مدارک اصلی</h3>
                        <ul className="space-y-2 text-muted-foreground text-persian">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                            <span>کارت بازرگانی معتبر</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                            <span>پروفرمای فروش (Invoice)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                            <span>لیست بسته‌بندی (Packing List)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                            <span>کد رهگیری ثبت سفارش</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                            <span>بارنامه حمل (CMR یا CIM)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                            <span>کارنت TIR (در صورت ترانزیت)</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <h3 className="font-bold text-lg mb-4 text-persian text-accent">مدارک تکمیلی</h3>
                        <ul className="space-y-2 text-muted-foreground text-persian">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                            <span>گواهی مبدا (Certificate of Origin)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                            <span>استاندارد ملی (در صورت نیاز)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                            <span>مجوزهای سازمان‌های ذی‌ربط</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                            <span>گواهی بهداشت (کالاهای غذایی)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                            <span>مجوز کشاورزی (محصولات کشاورزی)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                            <span>بیمه‌نامه محموله</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Working Hours and Fees */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 text-persian flex items-center gap-2">
                    <Clock className="w-6 h-6 text-accent" />
                    ساعات کاری و تعرفه‌ها
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="border-t-4 border-t-accent">
                      <CardContent className="p-6">
                        <h3 className="font-bold text-lg mb-4 text-persian flex items-center gap-2">
                          <Clock className="w-5 h-5 text-accent" />
                          ساعات کاری
                        </h3>
                        <div className="space-y-3 text-muted-foreground text-persian">
                          <div className="flex justify-between items-center p-3 bg-secondary/10 rounded">
                            <span className="font-medium">روزهای کاری:</span>
                            <span>شنبه تا چهارشنبه</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-secondary/10 rounded">
                            <span className="font-medium">ساعت کار:</span>
                            <span>۸:۰۰ صبح تا ۱۸:۰۰</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-secondary/10 rounded">
                            <span className="font-medium">نوبت عصر:</span>
                            <span>با هماهنگی قبلی</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-accent/5 rounded border border-accent/20">
                            <span className="font-medium text-accent">تعطیلات رسمی:</span>
                            <span className="text-accent">بسته</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-t-4 border-t-accent">
                      <CardContent className="p-6">
                        <h3 className="font-bold text-lg mb-4 text-persian flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-accent" />
                          تعرفه‌های تقریبی
                        </h3>
                        <div className="space-y-3 text-muted-foreground text-persian">
                          <div className="flex justify-between items-center p-3 bg-secondary/10 rounded">
                            <span>هزینه بازرسی:</span>
                            <span className="font-medium">بر اساس وزن</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-secondary/10 rounded">
                            <span>عوارض صادراتی:</span>
                            <span className="font-medium">متغیر (نوع کالا)</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-secondary/10 rounded">
                            <span>هزینه انبارداری:</span>
                            <span className="font-medium">روزانه محاسبه</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-accent/5 rounded border border-accent/20">
                            <span className="font-medium">کارمزد ترخیص:</span>
                            <span className="font-medium">۵-۱۰ میلیون</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Top Exported Goods */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 text-persian flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-accent" />
                    کالاهای پرتردد از اسلام قلعه
                  </h2>

                  <Card>
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <h3 className="font-bold mb-3 text-persian text-accent">مواد غذایی</h3>
                          <ul className="space-y-2 text-sm text-muted-foreground text-persian">
                            <li>• میوه‌های تازه و خشک</li>
                            <li>• محصولات لبنی</li>
                            <li>• روغن‌های خوراکی</li>
                            <li>• برنج و حبوبات</li>
                            <li>• شکر و قند</li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-bold mb-3 text-persian text-accent">مصالح ساختمانی</h3>
                          <ul className="space-y-2 text-sm text-muted-foreground text-persian">
                            <li>• سیمان و گچ</li>
                            <li>• میلگرد و تیرآهن</li>
                            <li>• شیشه و سرامیک</li>
                            <li>• رنگ و چسب</li>
                            <li>• لوله و اتصالات</li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-bold mb-3 text-persian text-accent">کالاهای صنعتی</h3>
                          <ul className="space-y-2 text-sm text-muted-foreground text-persian">
                            <li>• لوازم خانگی</li>
                            <li>• قطعات خودرو</li>
                            <li>• ماشین‌آلات</li>
                            <li>• محصولات پلاستیکی</li>
                            <li>• منسوجات</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Important Tips */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 text-persian flex items-center gap-2">
                    <Shield className="w-6 h-6 text-accent" />
                    نکات مهم و توصیه‌ها
                  </h2>

                  <div className="space-y-4">
                    <Card className="border-r-4 border-r-green-500">
                      <CardContent className="p-6">
                        <div className="flex gap-3">
                          <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                          <div>
                            <h3 className="font-bold mb-2 text-persian">بررسی قوانین افغانستان</h3>
                            <p className="text-muted-foreground text-persian">
                              پیش از صادرات، از مجوزها و محدودیت‌های وارداتی طرف افغانستانی اطمینان حاصل کنید و قوانین
                              گمرکی افغانستان را بررسی نمایید.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-r-4 border-r-blue-500">
                      <CardContent className="p-6">
                        <div className="flex gap-3">
                          <CheckCircle2 className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                          <div>
                            <h3 className="font-bold mb-2 text-persian">بیمه محموله</h3>
                            <p className="text-muted-foreground text-persian">
                              حتماً بیمه جامع محموله را تهیه کنید. با توجه به مسافت و شرایط جاده‌ای، بیمه کامل ضروری
                              است.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-r-4 border-r-orange-500">
                      <CardContent className="p-6">
                        <div className="flex gap-3">
                          <AlertCircle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                          <div>
                            <h3 className="font-bold mb-2 text-persian">انتخاب باربری مطمئن</h3>
                            <p className="text-muted-foreground text-persian">
                              از شرکت‌های حمل و نقل با سابقه و مجوز رسمی استفاده کنید. راننده باید کارت TIR معتبر داشته
                              باشد.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-r-4 border-r-purple-500">
                      <CardContent className="p-6">
                        <div className="flex gap-3">
                          <CheckCircle2 className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
                          <div>
                            <h3 className="font-bold mb-2 text-persian">مشاوره تخصصی</h3>
                            <p className="text-muted-foreground text-persian">
                              برای صادرات موفق و بدون دردسر، از خدمات مشاوران گمرکی مجرب استفاده کنید و با آنها هماهنگی
                              کامل داشته باشید.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-r-4 border-r-red-500">
                      <CardContent className="p-6">
                        <div className="flex gap-3">
                          <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                          <div>
                            <h3 className="font-bold mb-2 text-persian">پیگیری مستمر</h3>
                            <p className="text-muted-foreground text-persian">
                              وضعیت کالا را از طریق سامانه‌های آنلاین پیگیری کنید و با راننده در تماس باشید تا از عبور
                              موفق از مرز اطمینان حاصل کنید.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Contact and Support */}
                <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-2 border-accent/20">
                  <CardContent className="p-8 text-center">
                    <h2 className="text-2xl font-bold mb-4 text-persian">نیاز به مشاوره دارید؟</h2>
                    <p className="text-muted-foreground mb-6 text-persian max-w-2xl mx-auto">
                      تیم متخصص ترخیصان آماده ارائه مشاوره رایگان در زمینه صادرات از طریق اسلام قلعه و ترانزیت به
                      افغانستان است. با ما تماس بگیرید.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                      <Link to="/">
                        <Button size="lg" className="text-persian gap-2">
                          <Users className="w-5 h-5" />
                          مشاوره رایگان
                        </Button>
                      </Link>
                      <Link to="/blog">
                        <Button size="lg" variant="outline" className="text-persian gap-2">
                          <FileText className="w-5 h-5" />
                          مقالات بیشتر
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </article>

              {/* Related Articles */}
              <RelatedArticles currentPostId={13} limit={3} />

              {/* Back to Blog */}
              <div className="max-w-4xl mx-auto mt-12">
                <Link to="/blog">
                  <Button variant="outline" className="group text-persian">
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    بازگشت به بلاگ
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default IslamQalaGuide;
