import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleBreadcrumb from "@/components/ArticleBreadcrumb";
import RelatedArticles from "@/components/RelatedArticles";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, AlertCircle, FileText, DollarSign, Package, Wrench } from "lucide-react";
import ArticleImage from "@/components/ArticleImage";

const ExcavationMachineryGuide = () => {
  useEffect(() => {
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', 'fa');
    window.scrollTo(0, 0);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "ترخیص ماشین آلات حفاری از گمرک | راهنمای کامل واردات ماشین آلات سنگین",
    "description": "راهنمای جامع ترخیص ماشین آلات حفاری از گمرک: مدارک لازم، تعرفه و حقوق گمرکی، کد HS، مراحل واردات، مجوزها و نکات مهم",
    "author": {
      "@type": "Organization",
      "name": "تیم ترخیصان"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ترخیصان",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "بندرعباس",
        "addressRegion": "هرمزگان",
        "addressCountry": "IR"
      }
    },
    "datePublished": "2025-10-07",
    "dateModified": "2025-10-07",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://tarkhisun.com/blog/excavation-machinery-import-guide"
    },
    "keywords": "ترخیص ماشین آلات حفاری, واردات ماشین آلات سنگین, گمرک ماشین آلات, حقوق گمرکی",
    "articleSection": "راهنمای گمرکی",
    "image": "https://tarkhisun.com/og-image.jpg"
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "آیا واردات ماشین آلات حفاری نیاز به مجوز دارد؟",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "بله، واردات ماشین آلات حفاری نیاز به کارت بازرگانی، ثبت سفارش در سامانه جامع تجارت (NTSW) و در برخی موارد مجوزهای استاندارد دارد."
        }
      },
      {
        "@type": "Question",
        "name": "حقوق گمرکی ماشین آلات حفاری چقدر است؟",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "حقوق گمرکی ماشین آلات حفاری بین ۴ تا ۱۵ درصد ارزش CIF کالا است که بسته به نوع، سال ساخت و کد تعرفه متغیر است."
        }
      },
      {
        "@type": "Question",
        "name": "آیا می‌توان ماشین آلات حفاری دست دوم وارد کرد؟",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "بله، با رعایت شرایط سنی (معمولاً کمتر از ۱۰ سال) و استانداردهای زیست محیطی می‌توان ماشین آلات حفاری دست دوم وارد کرد."
        }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "خانه",
        "item": "https://tarkhisun.com"
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
        "name": "ترخیص ماشین آلات حفاری از گمرک"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <link rel="canonical" href="https://tarkhisun.com/blog/excavation-machinery-import-guide" />
        <title>ترخیص ماشین آلات حفاری از گمرک | راهنمای کامل واردات ماشین آلات سنگین</title>
        <meta name="description" content="راهنمای ترخیص ماشین آلات حفاری از گمرک: مدارک، تعرفه، کد HS و مجوزهای واردات ماشین آلات سنگین" />
        <meta name="keywords" content="ترخیص ماشین آلات حفاری, واردات ماشین آلات سنگین, گمرک ماشین آلات, حقوق گمرکی ماشین حفاری, کد تعرفه ماشین آلات, ترخیص بیل مکانیکی, واردات لودر, ترخیص بلدوزر, ماشین آلات ساختمانی, ماشین آلات معدنی, مدارک ترخیص ماشین آلات, بندرعباس, شهید رجایی, تعرفه گمرکی ماشین آلات, مجوز واردات ماشین آلات" />
        
        <meta property="og:title" content="ترخیص ماشین آلات حفاری از گمرک | راهنمای کامل واردات ماشین آلات سنگین" />
        <meta property="og:description" content="راهنمای جامع ترخیص ماشین آلات حفاری از گمرک: مدارک لازم، تعرفه و حقوق گمرکی، کد HS، مراحل واردات و مجوزها" />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="fa_IR" />
        <meta property="og:url" content="https://tarkhisun.com/blog/excavation-machinery-import-guide" />
        <meta property="og:site_name" content="ترخیصان" />
        <meta property="og:image" content="https://tarkhisun.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ترخیص ماشین آلات حفاری از گمرک | راهنمای کامل" />
        <meta name="twitter:description" content="راهنمای جامع ترخیص ماشین آلات حفاری از گمرک بندرعباس" />
        <meta name="twitter:image" content="https://tarkhisun.com/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqStructuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      <Header />
      
      <main>
        <ArticleBreadcrumb 
          category="راهنمای ترخیص کالا"
          articleTitle="ترخیص ماشین آلات حفاری از گمرک"
        />
        
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-secondary to-white">
          <div className="container mx-auto px-4" dir="rtl">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="heading-primary mb-6 text-persian">
                ترخیص ماشین آلات حفاری از گمرک
                <br />
                <span className="text-accent">راهنمای کامل واردات ماشین آلات سنگین</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 text-persian leading-relaxed">
                راهنمای جامع ترخیص انواع ماشین آلات حفاری و ساختمانی شامل بیل مکانیکی، لودر، بلدوزر و کامیون معدنی از گمرک بندرعباس
              </p>
              <div className="flex flex-wrap justify-center gap-3 text-sm">
                <span className="badge-primary">ماشین آلات حفاری</span>
                <span className="badge-primary">تعرفه گمرکی</span>
                <span className="badge-primary">مدارک ترخیص</span>
                <span className="badge-primary">واردات قانونی</span>
              </div>

              <ArticleImage
                src="/images/blog/excavation-machinery.webp"
                alt="ماشین آلات حفاری و سنگین ساختمانی برای واردات و ترخیص از گمرک"
                caption="ماشین آلات حفاری - بیل مکانیکی و لودر برای پروژه‌های ساختمانی"
                priority
                className="mt-8 max-w-3xl mx-auto"
              />
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="py-16">
          <div className="container mx-auto px-4" dir="rtl">
            <div className="max-w-4xl mx-auto prose prose-lg">
              
              {/* Introduction */}
              <section className="mb-12">
                <p className="text-lg text-muted-foreground leading-relaxed text-persian mb-6">
                  ترخیص ماشین آلات حفاری و سنگین ساختمانی از گمرک، فرآیندی تخصصی است که نیازمند آگاهی از قوانین، مقررات و <Link to="/blog/customs-tariff-guide" className="text-accent hover:underline">تعرفه‌های گمرکی</Link> می‌باشد. این راهنما تمام اطلاعات لازم از جمله <Link to="/blog/hs-code-guide" className="text-accent hover:underline">کدهای HS</Link> برای واردات قانونی انواع ماشین آلات حفاری شامل بیل مکانیکی (Excavator)، لودر (Loader)، بلدوزر (Bulldozer)، گریدر و کامیون‌های معدنی را در اختیار شما قرار می‌دهد. برای <Link to="/blog/bandar-abbas-comprehensive-clearance-guide" className="text-accent hover:underline">ترخیص از بندرعباس</Link>، با مراحل گمرکی آشنا شوید.
                </p>
              </section>

              {/* Types of Excavation Machinery */}
              <section className="mb-12">
                <h2 className="heading-secondary mb-6 text-persian">انواع ماشین آلات حفاری قابل واردات</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="card-service">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-persian">
                        <Wrench className="w-5 h-5 text-accent" />
                        <strong>بیل مکانیکی (Excavator)</strong>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-persian">
                      <p className="text-muted-foreground">
                        بیل‌های هیدرولیکی، بیل‌های زنجیری و بیل‌های چرخ لاستیکی برای حفاری و بارگیری
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="card-service">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-persian">
                        <Wrench className="w-5 h-5 text-accent" />
                        لودر (Wheel Loader)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-persian">
                      <p className="text-muted-foreground">
                        لودرهای چرخ لاستیکی و زنجیری برای بارگیری و جابجایی مصالح
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="card-service">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-persian">
                        <Wrench className="w-5 h-5 text-accent" />
                        بلدوزر (Bulldozer)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-persian">
                      <p className="text-muted-foreground">
                        بلدوزرهای زنجیری و چرخ لاستیکی برای تسطیح و رانش خاک
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="card-service">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-persian">
                        <Wrench className="w-5 h-5 text-accent" />
                        گریدر و کامیون معدنی
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-persian">
                      <p className="text-muted-foreground">
                        گریدرهای موتوری، کامیون‌های معدنی و دامپ تراک‌های سنگین
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* HS Codes */}
              <section className="mb-12">
                <h2 className="heading-secondary mb-6 text-persian">کد تعرفه (HS Code) ماشین آلات حفاری</h2>
                
                <Card className="bg-secondary/50">
                  <CardContent className="p-6">
                    <p className="text-persian mb-4">
                      کد تعرفه هماهنگ (HS Code) برای ماشین آلات حفاری در فصل 84 قرار دارد:
                    </p>
                    <ul className="space-y-3 text-persian">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                        <span><strong>8429.11 - 8429.19:</strong> بلدوزرها و گریدرها (خودگردان)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                        <span><strong>8429.20:</strong> گریدرهای موتوری</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                        <span><strong>8429.40:</strong> غلتک‌های تسطیح راه</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                        <span><strong>8429.51:</strong> لودرهای جلو دار چرخ لاستیکی</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                        <span><strong>8429.52:</strong> ماشین‌های حفاری با بیل جلو</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                        <span><strong>8430.41:</strong> ماشین‌های حفر چاه و تونل</span>
                      </li>
                    </ul>
                    <div className="mt-4 p-4 bg-accent/10 rounded-lg">
                      <p className="text-sm text-persian">
                        <AlertCircle className="inline w-4 h-4 ml-1" />
                        <strong>نکته مهم:</strong> تعیین دقیق کد تعرفه توسط کارشناس گمرکی حائز اهمیت است، زیرا حقوق و عوارض بر اساس آن محاسبه می‌شود.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              <ArticleImage
                src="/images/blog/excavator-construction.webp"
                alt="بیل مکانیکی در پروژه ساختمانی - ماشین آلات حفاری"
                caption="ماشین آلات حفاری در حال کار در پروژه ساختمانی"
              />

              {/* Required Documents */}
              <section className="mb-12">
                <h2 className="heading-secondary mb-6 text-persian">
                  <FileText className="inline w-8 h-8 ml-2 text-accent" />
                  مدارک لازم برای ترخیص ماشین آلات حفاری
                </h2>
                
                <Card className="card-service">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-persian">مدارک اصلی</h3>
                    <ul className="space-y-3 text-persian mb-6">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                        <span><strong>کارت بازرگانی</strong> معتبر (با فعالیت واردات ماشین آلات)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                        <span><strong>بارنامه اصلی (Bill of Lading)</strong> یا Air Waybill</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                        <span><strong>فاکتور پروفرما (Proforma Invoice)</strong> از فروشنده</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                        <span><strong>پکینگ لیست (Packing List)</strong> شامل مشخصات فنی</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                        <span><strong>گواهی مبدأ (Certificate of Origin)</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                        <span><strong>ثبت سفارش الکترونیکی</strong> از سامانه جامع تجارت (NTSW)</span>
                      </li>
                    </ul>

                    <h3 className="text-xl font-semibold mb-4 text-persian">مدارک تکمیلی</h3>
                    <ul className="space-y-3 text-persian">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                        <span><strong>کاتالوگ فنی</strong> و مشخصات کامل ماشین آلات</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                        <span><strong>گواهی استاندارد</strong> (در صورت الزام)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                        <span><strong>گواهی تطابق زیست محیطی</strong> برای ماشین آلات دیزلی</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                        <span><strong>سند مالکیت</strong> قبلی (برای دست دوم)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                        <span><strong>بیمه‌نامه حمل</strong> (در صورت وجود)</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </section>

              {/* Clearance Process */}
              <section className="mb-12">
                <h2 className="heading-secondary mb-6 text-persian">
                  <Package className="inline w-8 h-8 ml-2 text-accent" />
                  مراحل ترخیص ماشین آلات حفاری از گمرک
                </h2>
                
                <div className="space-y-4">
                  <Card className="card-service border-r-4 border-r-accent">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-2 text-persian">مرحله ۱: اخذ کارت بازرگانی و ثبت سفارش</h3>
                      <p className="text-muted-foreground text-persian">
                        ابتدا باید کارت بازرگانی با فعالیت واردات ماشین آلات داشته باشید. سپس در سامانه جامع تجارت (ntsw.ir) ثبت سفارش انجام دهید.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="card-service border-r-4 border-r-accent">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-2 text-persian">مرحله ۲: تهیه مدارک و حمل کالا</h3>
                      <p className="text-muted-foreground text-persian">
                        تمام مدارک لازم را از فروشنده دریافت کنید و ماشین آلات را از طریق دریایی، هوایی یا زمینی به بندر ورودی ایران ارسال نمایید.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="card-service border-r-4 border-r-accent">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-2 text-persian">مرحله ۳: ثبت اظهارنامه گمرکی</h3>
                      <p className="text-muted-foreground text-persian">
                        ترخیصکار با استفاده از مدارک، اظهارنامه گمرکی را در سامانه جامع گمرکی ثبت و کد رهگیری دریافت می‌کند.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="card-service border-r-4 border-r-accent">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-2 text-persian">مرحله ۴: ارزیابی و بازرسی کالا</h3>
                      <p className="text-muted-foreground text-persian">
                        کارشناس گمرک ارزش و مشخصات فنی ماشین آلات را بررسی و در صورت نیاز بازرسی فیزیکی انجام می‌شود.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="card-service border-r-4 border-r-accent">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-2 text-persian">مرحله ۵: پرداخت حقوق و عوارض</h3>
                      <p className="text-muted-foreground text-persian">
                        پس از تأیید، حقوق گمرکی، سود بازرگانی، مالیات و سایر عوارض محاسبه و پرداخت می‌شود.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="card-service border-r-4 border-r-accent">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-2 text-persian">مرحله ۶: ترخیص و تحویل کالا</h3>
                      <p className="text-muted-foreground text-persian">
                        پس از تکمیل فرآیند، ماشین آلات ترخیص و از گمرک خارج می‌شود. زمان تخمینی: ۵ تا ۱۵ روز کاری.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Customs Tariffs */}
              <section className="mb-12">
                <h2 className="heading-secondary mb-6 text-persian">
                  <DollarSign className="inline w-8 h-8 ml-2 text-accent" />
                  تعرفه و هزینه‌های گمرکی ماشین آلات حفاری
                </h2>
                
                <Card className="bg-secondary/50">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-persian">حقوق و عوارض گمرکی</h3>
                    
                    <div className="space-y-4 text-persian">
                      <div className="p-4 bg-background rounded-lg">
                        <h4 className="font-semibold mb-2">۱. حقوق ورودی گمرکی</h4>
                        <p className="text-muted-foreground">
                          بین ۴٪ تا ۱۵٪ ارزش CIF کالا (بسته به نوع و سال ساخت)
                        </p>
                      </div>

                      <div className="p-4 bg-background rounded-lg">
                        <h4 className="font-semibold mb-2">۲. سود بازرگانی</h4>
                        <p className="text-muted-foreground">
                          ۴٪ ارزش گمرکی (CIF) کالا
                        </p>
                      </div>

                      <div className="p-4 bg-background rounded-lg">
                        <h4 className="font-semibold mb-2">۳. مالیات بر ارزش افزوده</h4>
                        <p className="text-muted-foreground">
                          ۹٪ از مجموع (ارزش گمرکی + حقوق ورودی + سود بازرگانی)
                        </p>
                      </div>

                      <div className="p-4 bg-background rounded-lg">
                        <h4 className="font-semibold mb-2">۴. هزینه‌های جانبی</h4>
                        <ul className="text-muted-foreground space-y-1 mt-2">
                          <li>• هزینه ترخیصکار: بین ۵۰ تا ۲۰۰ میلیون تومان</li>
                          <li>• هزینه بارگیری و حمل: متغیر بر اساس وزن و حجم</li>
                          <li>• هزینه انبارداری گمرک: روزانه بر اساس متراژ</li>
                          <li>• هزینه بیمه و بازرسی: در صورت نیاز</li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-accent/10 rounded-lg">
                      <p className="text-sm text-persian">
                        <AlertCircle className="inline w-4 h-4 ml-1" />
                        <strong>نکته:</strong> ماشین آلات نو معمولاً حقوق گمرکی کمتری نسبت به دست دوم دارند. همچنین برندهای معتبر ممکن است مشمول تعرفه متفاوت شوند.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Important Notes */}
              <section className="mb-12">
                <h2 className="heading-secondary mb-6 text-persian">نکات مهم و قوانین ترخیص ماشین آلات</h2>
                
                <div className="space-y-4">
                  <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                        <div className="text-persian">
                          <h3 className="font-semibold mb-2">محدودیت سنی ماشین آلات دست دوم</h3>
                          <p className="text-muted-foreground">
                            برای واردات ماشین آلات دست دوم، محدودیت سنی وجود دارد. معمولاً ماشین آلاتی که بیش از ۱۰ سال از سال ساخت آنها گذشته باشد، قابل واردات نیستند مگر با مجوزهای خاص.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                        <div className="text-persian">
                          <h3 className="font-semibold mb-2">استانداردهای زیست محیطی</h3>
                          <p className="text-muted-foreground">
                            ماشین آلاتی که دارای موتور دیزلی هستند باید استانداردهای آلایندگی یورو ۴ یا بالاتر را داشته باشند. گواهی تطابق زیست محیطی الزامی است.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                        <div className="text-persian">
                          <h3 className="font-semibold mb-2">بررسی دقیق مشخصات فنی</h3>
                          <p className="text-muted-foreground">
                            پیش از واردات، مشخصات فنی ماشین آلات شامل مدل، سریال نامبر، سال ساخت، ساعت کارکرد و قطعات موجود را دقیقاً بررسی کنید تا با مشکل در ترخیص مواجه نشوید.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                        <div className="text-persian">
                          <h3 className="font-semibold mb-2">مجوز سازمان استاندارد</h3>
                          <p className="text-muted-foreground">
                            برخی از ماشین آلات حفاری نیاز به گواهی استاندارد دارند. قبل از ثبت سفارش، از الزامات سازمان ملی استاندارد ایران مطلع شوید.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                        <div className="text-persian">
                          <h3 className="font-semibold mb-2">جلوگیری از واردات غیرقانونی</h3>
                          <p className="text-muted-foreground">
                            از واردات ماشین آلات از طریق ته لنجی یا ملوانی اکیداً خودداری کنید. این روش غیرقانونی است و می‌تواند منجر به جریمه‌های سنگین، ضبط کالا و پیگرد قضایی شود.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* FAQ Section */}
              <section className="mb-12">
                <h2 className="heading-secondary mb-6 text-persian">سوالات متداول</h2>
                
                <div className="space-y-4">
                  <Card className="card-service">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-3 text-persian">
                        آیا واردات ماشین آلات حفاری نیاز به مجوز دارد؟
                      </h3>
                      <p className="text-muted-foreground text-persian">
                        بله، واردات ماشین آلات حفاری نیاز به کارت بازرگانی معتبر، ثبت سفارش در سامانه جامع تجارت (NTSW) و در برخی موارد مجوزهای استاندارد و زیست محیطی دارد.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="card-service">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-3 text-persian">
                        حقوق گمرکی ماشین آلات حفاری چقدر است؟
                      </h3>
                      <p className="text-muted-foreground text-persian">
                        حقوق گمرکی ماشین آلات حفاری بین ۴ تا ۱۵ درصد ارزش CIF کالا است که بسته به نوع ماشین، سال ساخت، برند و کد تعرفه متغیر است. علاوه بر این، سود بازرگانی ۴٪ و مالیات بر ارزش افزوده ۹٪ نیز دریافت می‌شود.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="card-service">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-3 text-persian">
                        آیا می‌توان ماشین آلات حفاری دست دوم وارد کرد؟
                      </h3>
                      <p className="text-muted-foreground text-persian">
                        بله، با رعایت شرایط سنی (معمولاً کمتر از ۱۰ سال از سال ساخت)، استانداردهای زیست محیطی (یورو ۴ یا بالاتر) و ارائه مدارک مالکیت و سابقه سرویس، می‌توان ماشین آلات حفاری دست دوم را وارد کرد.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="card-service">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-3 text-persian">
                        مدت زمان ترخیص ماشین آلات از گمرک چقدر است؟
                      </h3>
                      <p className="text-muted-foreground text-persian">
                        با آماده بودن مدارک کامل، ترخیص ماشین آلات حفاری از گمرک بندرعباس معمولاً بین ۵ تا ۱۵ روز کاری طول می‌کشد. این مدت ممکن است بسته به نوع ماشین، نیاز به بازرسی فنی و تکمیل مدارک متفاوت باشد.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="card-service">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-3 text-persian">
                        چه برندهایی از ماشین آلات حفاری قابل واردات هستند؟
                      </h3>
                      <p className="text-muted-foreground text-persian">
                        تمامی برندهای معتبر جهانی مانند Caterpillar، Komatsu، Hitachi، Volvo، Liebherr، Doosan، Hyundai و سایر برندها قابل واردات هستند، مشروط بر اینکه شرایط سنی و استانداردهای لازم را داشته باشند.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Conclusion */}
              <section className="mb-12">
                <Card className="bg-gradient-to-br from-accent/10 to-secondary/50 border-accent/20">
                  <CardContent className="p-8">
                    <h2 className="heading-secondary mb-4 text-persian">جمع‌بندی</h2>
                    <p className="text-lg leading-relaxed text-persian mb-4">
                      ترخیص ماشین آلات حفاری از گمرک بندرعباس و شهید رجایی نیازمند دانش تخصصی، تجربه و آشنایی کامل با قوانین و مقررات گمرکی است. با رعایت نکات ذکر شده در این راهنما، تهیه مدارک کامل و همکاری با یک ترخیصکار حرفه‌ای، می‌توانید فرآیند واردات ماشین آلات خود را به صورت قانونی، ایمن و با کمترین زمان و هزینه انجام دهید.
                    </p>
                    <p className="text-muted-foreground text-persian">
                      تیم متخصص ترخیصان آماده است تا در تمامی مراحل واردات و ترخیص ماشین آلات حفاری شما را یاری کند و تجربه‌ای آسان و بدون دغدغه برای شما فراهم آورد.
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* Related Articles */}
              <RelatedArticles currentPostId={9} limit={3} />

              {/* CTA Section */}
              <section className="text-center">
                <Card className="bg-accent/5 border-accent/20">
                  <CardContent className="p-8">
                    <h2 className="heading-secondary mb-4 text-persian">نیاز به مشاوره تخصصی دارید؟</h2>
                    <p className="text-lg text-muted-foreground mb-6 text-persian">
                      تیم متخصص ترخیصان آماده ارائه مشاوره رایگان و خدمات ترخیص ماشین آلات حفاری شماست
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                      <Link to="/#contact">
                        <Button size="lg" className="text-persian">
                          درخواست مشاوره رایگان
                        </Button>
                      </Link>
                      <Link to="/blog">
                        <Button variant="outline" size="lg" className="text-persian">
                          <ArrowRight className="ml-2 w-5 h-5" />
                          بازگشت به بلاگ
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </section>

            </div>
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default ExcavationMachineryGuide;
