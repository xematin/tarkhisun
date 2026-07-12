import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleBreadcrumb from "@/components/ArticleBreadcrumb";
import RelatedArticles from "@/components/RelatedArticles";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, User, Phone, Mail } from "lucide-react";
import ArticleImage from "@/components/ArticleImage";

const CustomsTariffGuide = () => {
  useEffect(() => {
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', 'fa');
    window.scrollTo(0, 0);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "headline": "تعریف و اهمیت تعرفه گمرکی در واردات و صادرات",
        "description": "آشنایی کامل با تعرفه گمرکی، تعریف تعرفه کالا، انواع تعرفه واردات و صادرات، نحوه محاسبه حقوق ورودی و عوارض گمرکی",
        "image": "https://tarkhisun.com/og-image.jpg",
        "author": {
          "@type": "Organization",
          "name": "ترخیصان - مشاوره امور گمرکی بندرعباس"
        },
        "publisher": {
          "@type": "Organization",
          "name": "ترخیصان",
          "logo": {
            "@type": "ImageObject",
            "url": "https://tarkhisun.com/logo.png"
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "بندرعباس",
            "addressRegion": "هرمزگان",
            "addressCountry": "IR"
          }
        },
        "datePublished": "2024-09-30",
        "dateModified": "2024-09-30",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://tarkhisun.com/blog/customs-tariff-guide"
        },
        "keywords": "تعرفه گمرکی, تعرفه کالا, عوارض گمرکی, تعرفه واردات, حقوق ورودی"
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "خانه",
            "item": "https://tarkhisun.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "بلاگ",
            "item": "https://tarkhisun.com/blog"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "تعریف و اهمیت تعرفه گمرکی"
          }
        ]
      }
    ]
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://tarkhisun.com/blog/customs-tariff-guide" />
        <title>تعریف و اهمیت تعرفه گمرکی در واردات و صادرات | راهنمای جامع تعرفه کالا</title>
        <meta name="description" content="آشنایی کامل با تعرفه گمرکی، تعریف تعرفه کالا، انواع تعرفه واردات و صادرات، نحوه محاسبه حقوق ورودی و عوارض گمرکی، اهمیت تعرفه در تجارت بین‌المللی" />
        <meta name="keywords" content="تعرفه گمرکی, تعرفه کالا, عوارض گمرکی, تعرفه واردات, تعرفه صادرات, حقوق ورودی, مالیات واردات, تعرفه هماهنگ, گمرک ایران, محاسبه تعرفه, انواع تعرفه گمرکی" />
        
        <meta property="og:title" content="تعریف و اهمیت تعرفه گمرکی در واردات و صادرات" />
        <meta property="og:description" content="راهنمای کامل تعرفه گمرکی، انواع تعرفه کالا و نحوه محاسبه حقوق ورودی" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://tarkhisun.com/blog/customs-tariff-guide" />
        <meta property="og:image" content="https://tarkhisun.com/og-image.jpg" />
        <meta property="og:locale" content="fa_IR" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          <ArticleBreadcrumb 
            category="تعرفه و مالیات"
            articleTitle="تعریف و اهمیت تعرفه گمرکی"
          />

          {/* Hero Section */}
          <section className="py-12 bg-gradient-to-br from-secondary to-white">
            <div className="container mx-auto px-4" dir="rtl">
              <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                  <span className="text-sm font-medium text-accent bg-accent/15 px-3 py-2 rounded-full text-persian">
                    تعرفه و مالیات
                  </span>
                </div>

                <h1 className="heading-primary mb-6 text-persian">
                  تعریف و اهمیت تعرفه گمرکی
                  <span className="text-accent block">در واردات و صادرات</span>
                </h1>

                <p className="text-xl text-muted-foreground mb-8 text-persian leading-relaxed">
                  آشنایی کامل با تعرفه گمرکی، انواع تعرفه کالا، نحوه محاسبه حقوق ورودی و عوارض گمرکی و اهمیت آن در تجارت بین‌المللی
                </p>

                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground text-persian">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    ۱۴۰۳/۷/۱۰
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    ۱۴ دقیقه مطالعه
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    تیم ترخیصان
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-16">
            <div className="container mx-auto px-4" dir="rtl">
              <div className="max-w-4xl mx-auto">
                <div className="grid lg:grid-cols-3 gap-12">
                  
                  {/* Main Content */}
                  <div className="lg:col-span-2 space-y-8">
                    
                    {/* Hero Image */}
                    <ArticleImage
                      src="/images/blog/customs-tariff-guide.webp"
                      alt="محاسبه تعرفه گمرکی و حقوق ورودی کالا"
                      caption="محاسبه دقیق تعرفه گمرکی برای تعیین هزینه نهایی واردات ضروری است"
                      priority
                    />

                    {/* Introduction */}
                    <div className="prose prose-lg max-w-none text-persian">
                      <p className="text-lg leading-relaxed text-muted-foreground">
                        <strong>تعرفه گمرکی</strong> یکی از مهم‌ترین مفاهیم در{" "}
                        <Link to="/blog/import-export-guide-iran" className="text-primary hover:underline">
                          تجارت بین‌المللی
                        </Link>{" "}
                        است که تأثیر مستقیم بر هزینه نهایی کالاهای وارداتی و صادراتی دارد. درک صحیح تعرفه گمرکی به بازرگانان کمک می‌کند تا محاسبات دقیق‌تری از هزینه‌های خود داشته باشند.
                      </p>
                    </div>

                    {/* Definition */}
                    <Card className="card-service">
                      <CardContent className="p-6">
                        <h2 className="heading-tertiary text-persian mb-4">تعرفه گمرکی چیست؟</h2>
                        <div className="space-y-4 text-persian">
                          <p>
                            <strong>تعرفه گمرکی</strong> به مجموعه قوانین و مقرراتی گفته می‌شود که نرخ حقوق ورودی و خروجی کالاها را تعیین می‌کند. 
                            این تعرفه‌ها بر اساس{" "}
                            <Link to="/blog/hs-code-guide" className="text-primary hover:underline">
                              کد HS کالا
                            </Link>{" "}
                            مشخص می‌شوند.
                          </p>
                          <p>
                            تعرفه گمرکی ابزاری برای کنترل واردات و صادرات، حمایت از تولید داخلی و کسب درآمد برای دولت است.
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Types of Tariffs */}
                    <div>
                      <h2 className="heading-tertiary mb-6 text-persian">انواع تعرفه گمرکی</h2>
                      
                      <div className="space-y-4">
                        <Card className="card-service">
                          <CardContent className="p-6">
                            <h3 className="font-bold text-lg mb-2 text-persian">۱. تعرفه ارزشی (Ad Valorem)</h3>
                            <p className="text-muted-foreground text-persian">
                              درصدی از ارزش کالا که به عنوان حقوق گمرکی پرداخت می‌شود. مثلاً ۱۵٪ ارزش CIF کالا.
                            </p>
                          </CardContent>
                        </Card>
                        
                        <Card className="card-service">
                          <CardContent className="p-6">
                            <h3 className="font-bold text-lg mb-2 text-persian">۲. تعرفه خاص (Specific)</h3>
                            <p className="text-muted-foreground text-persian">
                              مبلغ ثابتی به ازای هر واحد کالا (وزن، تعداد، حجم). مثلاً ۱۰۰ دلار به ازای هر تن.
                            </p>
                          </CardContent>
                        </Card>
                        
                        <Card className="card-service">
                          <CardContent className="p-6">
                            <h3 className="font-bold text-lg mb-2 text-persian">۳. تعرفه مرکب (Mixed)</h3>
                            <p className="text-muted-foreground text-persian">
                              ترکیبی از تعرفه ارزشی و خاص. مثلاً ۱۰٪ ارزش به علاوه ۵۰ دلار به ازای هر واحد.
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    {/* Importance */}
                    <div>
                      <h2 className="heading-tertiary mb-6 text-persian">اهمیت تعرفه گمرکی</h2>
                      
                      <div className="space-y-3">
                        {[
                          "تعیین هزینه نهایی کالای وارداتی",
                          "حمایت از تولیدات داخلی",
                          "کسب درآمد برای دولت",
                          "کنترل حجم واردات و صادرات",
                          "اجرای سیاست‌های تجاری",
                          "تنظیم بازار داخلی"
                        ].map((item, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg text-persian">
                            <span className="w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Image 2 */}
                    <ArticleImage
                      src="/images/blog/tariff-documents.webp"
                      alt="مدارک و اسناد گمرکی برای محاسبه تعرفه"
                      caption="اسناد گمرکی نقش مهمی در تعیین تعرفه و حقوق ورودی دارند"
                    />

                    {/* Calculation */}
                    <Card className="card-service">
                      <CardContent className="p-6">
                        <h2 className="heading-tertiary text-persian mb-4">نحوه محاسبه تعرفه گمرکی</h2>
                        <div className="space-y-4 text-persian">
                          <p>
                            برای محاسبه تعرفه گمرکی، ابتدا باید <strong>ارزش گمرکی</strong> کالا مشخص شود:
                          </p>
                          <div className="bg-accent/10 p-4 rounded-lg">
                            <p className="font-mono text-center text-lg">
                              ارزش گمرکی = ارزش CIF کالا × <Link to="/blog/customs-exchange-rate-guide" className="text-accent hover:underline">نرخ ارز گمرکی</Link>
                            </p>
                          </div>
                          <p>
                            سپس حقوق ورودی بر اساس درصد تعرفه محاسبه می‌شود:
                          </p>
                          <div className="bg-accent/10 p-4 rounded-lg">
                            <p className="font-mono text-center text-lg">
                              حقوق ورودی = ارزش گمرکی × درصد تعرفه
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Factors */}
                    <div>
                      <h2 className="heading-tertiary mb-6 text-persian">عوامل مؤثر بر تعرفه گمرکی</h2>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          { title: "نوع کالا", desc: "کالاهای ضروری تعرفه کمتری دارند" },
                          { title: "کشور مبدأ", desc: "توافقات تجاری بر تعرفه تأثیر می‌گذارد" },
                          { title: "سیاست‌های حمایتی", desc: "حمایت از تولید داخلی" },
                          { title: "شرایط اقتصادی", desc: "تورم و نرخ ارز" }
                        ].map((item, index) => (
                          <Card key={index} className="card-service">
                            <CardContent className="p-4">
                              <h3 className="font-bold mb-1 text-persian">{item.title}</h3>
                              <p className="text-sm text-muted-foreground text-persian">{item.desc}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-8 rounded-2xl">
                      <h2 className="text-2xl font-bold mb-4 text-persian">نیاز به مشاوره در محاسبه تعرفه دارید؟</h2>
                      <p className="mb-6 opacity-90 text-persian">
                        تیم متخصص ترخیصان با دانش کامل از تعرفه‌های گمرکی، آماده کمک به شما در محاسبه هزینه‌های{" "}
                        <Link to="/blog/bandar-abbas-comprehensive-clearance-guide" className="text-primary-foreground underline">ترخیص کالا</Link> است.
                      </p>
                      <Button asChild size="lg" variant="secondary">
                        <Link to="/#contact">
                          درخواست مشاوره رایگان
                          <ArrowLeft className="mr-2 w-5 h-5" />
                        </Link>
                      </Button>
                    </div>

                  </div>

                  {/* Sidebar */}
                  <div className="lg:col-span-1 space-y-6">
                    <Card className="card-service sticky top-24">
                      <CardContent className="p-6">
                        <h3 className="font-bold text-lg mb-4 text-persian">مشاوره تخصصی گمرکی</h3>
                        <p className="text-muted-foreground mb-4 text-persian text-sm">
                          تیم ترخیصان با بیش از ۲۰ سال تجربه آماده پاسخگویی به سؤالات شماست.
                        </p>
                        <div className="space-y-3">
                          <a href="tel:+989177380080" className="flex items-center gap-2 text-accent hover:underline text-persian">
                            <Phone className="w-4 h-4" />
                            ۰۹۱۷۷۳۸۰۰۸۰
                          </a>
                          <a href="mailto:info@tarkhisun.com" className="flex items-center gap-2 text-accent hover:underline">
                            <Mail className="w-4 h-4" />
                            info@tarkhisun.com
                          </a>
                        </div>
                        <Button asChild className="w-full mt-4">
                          <Link to="/#contact">تماس با ما</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                </div>

                {/* HS Code Search Tool CTA */}
                <Card className="mt-12 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
                  <CardContent className="p-6 md:p-8 text-center space-y-3">
                    <h3 className="text-xl font-bold text-persian">
                      جستجوی آنلاین کد تعرفه گمرکی کالای شما
                    </h3>
                    <p className="text-muted-foreground text-persian">
                      با ابزار رایگان ترخیصان، کد HS، حقوق ورودی و سود بازرگانی هر کالا را در چند ثانیه پیدا کنید.
                    </p>
                    <Button asChild size="lg" className="text-primary-foreground">
                      <Link to="/hscode">ورود به ابزار جستجوی تعرفه گمرکی</Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Related Articles */}
                <div className="mt-16">
                  <RelatedArticles currentPostId={3} />
                </div>

                {/* Back to Blog */}
                <div className="text-center mt-12">
                  <Button asChild variant="outline">
                    <Link to="/blog">
                      <ArrowLeft className="ml-2 w-4 h-4 rotate-180" />
                      بازگشت به بلاگ
                    </Link>
                  </Button>
                </div>

              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CustomsTariffGuide;
