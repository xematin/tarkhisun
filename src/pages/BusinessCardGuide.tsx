import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleBreadcrumb from "@/components/ArticleBreadcrumb";
import RelatedArticles from "@/components/RelatedArticles";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, FileText, Calendar, Clock, User, AlertCircle } from "lucide-react";
import ArticleImage from "@/components/ArticleImage";
import businessCardTypesImg from "@/assets/business-card-types.jpg";
import businessCardDocumentsImg from "@/assets/business-card-documents.jpg";
import businessCardProcessImg from "@/assets/business-card-process.jpg";

const BusinessCardGuide = () => {
  useEffect(() => {
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', 'fa');
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "کارت بازرگانی چیست؟ انواع، شرایط، معایب و افراد معاف و محروم",
    "description": "راهنمای کامل کارت بازرگانی: انواع تولیدی، خدماتی و موردی، مدارک، شرایط، معایب، افراد معاف و محرومین از دریافت کارت",
    "image": "https://tarkhisun.com/og-image.jpg",
    "author": {
      "@type": "Organization",
      "name": "ترخیصان"
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
    "datePublished": "2025-10-03",
    "dateModified": "2026-06-09",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://tarkhisun.com/blog/business-card-complete-guide"
    },
    "keywords": "کارت بازرگانی, کارت بازرگانی تولیدی, کارت بازرگانی خدماتی, کارت بازرگانی موردی, معایب کارت بازرگانی, معافیت کارت بازرگانی, محرومین کارت بازرگانی, شرایط کارت بازرگانی, مدارک کارت بازرگانی"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "خانه", "item": "https://tarkhisun.com" },
      { "@type": "ListItem", "position": 2, "name": "بلاگ", "item": "https://tarkhisun.com/blog" },
      { "@type": "ListItem", "position": 3, "name": "کارت بازرگانی چیست؟" }
    ]
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://tarkhisun.com/blog/business-card-complete-guide" />
        <title>کارت بازرگانی چیست؟ انواع، شرایط، معایب و افراد معاف و محروم</title>
        <meta name="description" content="راهنمای کامل کارت بازرگانی: انواع تولیدی، خدماتی و موردی، مدارک، شرایط، معایب، افراد معاف و محرومین از دریافت کارت" />
        <meta name="keywords" content="کارت بازرگانی, کارت بازرگانی تولیدی, کارت بازرگانی خدماتی, کارت بازرگانی موردی, معایب کارت بازرگانی, معافیت کارت بازرگانی, محرومین کارت بازرگانی, شرایط کارت بازرگانی, مدارک کارت بازرگانی, اتاق بازرگانی, صدور کارت بازرگانی" />
        
        <meta property="og:title" content="کارت بازرگانی چیست؟ انواع، شرایط، معایب و افراد معاف و محروم" />
        <meta property="og:description" content="راهنمای کامل کارت بازرگانی: انواع تولیدی، خدماتی و موردی، مدارک، شرایط، معایب، افراد معاف و محرومین" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://tarkhisun.com/blog/business-card-complete-guide" />
        <meta property="og:locale" content="fa_IR" />
        <meta property="og:site_name" content="ترخیصان" />
        <meta property="og:image" content="https://tarkhisun.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="کارت بازرگانی: انواع، شرایط، معایب، معاف و محروم" />
        <meta name="twitter:description" content="راهنمای کامل کارت بازرگانی: انواع، شرایط، معایب و افراد معاف و محروم" />
        <meta name="twitter:image" content="https://tarkhisun.com/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
      
      <main>
        <ArticleBreadcrumb category="تجارت بین‌الملل" articleTitle="کارت بازرگانی چیست؟ راهنمای کامل دریافت و شرایط صدور" />
        
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-secondary to-white">
          <div className="container mx-auto px-4" dir="rtl">
            <div className="max-w-4xl mx-auto">
              <Link to="/blog" className="inline-flex items-center text-accent hover:text-accent/80 mb-6 transition-colors text-persian">
                <ArrowRight className="ml-2 h-4 w-4" />
                بازگشت به بلاگ
              </Link>
              
              <h1 className="heading-primary mb-6 text-persian">
                کارت بازرگانی چیست؟ انواع، شرایط، معایب و افراد معاف و محروم
              </h1>
              
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-8 text-persian">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>۱۴۰۴/۷/۱۳</span>
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
                <strong>کارت بازرگانی</strong> یکی از مهم‌ترین مدارک برای فعالیت در حوزه تجارت خارجی است. در این مقاله به طور کامل با تعریف، انواع، شرایط دریافت و مدارک لازم برای <Link to="/business-card" className="text-accent hover:underline">اخذ کارت بازرگانی</Link> آشنا می‌شوید.
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
                src="/images/blog/business-card-complete-guide.webp"
                alt="کارت بازرگانی چیست؟ راهنمای کامل دریافت و شرایط صدور"
                caption="کارت بازرگانی مجوز رسمی فعالیت در تجارت خارجی است"
              />

              {/* Definition Section */}
              <section className="mb-12">
                <h2 className="heading-secondary mb-6 text-persian">کارت بازرگانی چیست؟</h2>
                <p className="text-body mb-6 text-persian">
                  <strong>کارت بازرگانی</strong> سندی است که توسط <strong>اتاق بازرگانی، صنایع، معادن و کشاورزی ایران</strong> صادر می‌شود و به دارنده آن اجازه می‌دهد تا فعالیت‌های تجاری خود را به‌ویژه در حوزه <Link to="/blog/import-export-guide-iran" className="text-accent hover:underline">واردات و صادرات</Link> انجام دهد. این کارت نشان‌دهنده مجوز قانونی برای انجام معاملات تجاری بین‌المللی است و بر اساس <strong>ماده ۳ قانون مقررات صادرات و واردات</strong>، هرگونه ورود و خروج کالا با مقاصد تجاری بدون داشتن این کارت ممنوع است. اگر به دنبال <Link to="/business-card" className="text-accent hover:underline">اخذ کارت بازرگانی حقیقی، حقوقی یا موردی</Link> هستید، مجموعه ترخیصان به‌صورت تخصصی شما را همراهی می‌کند.
                </p>
                <p className="text-body mb-6 text-persian">
                  داشتن کارت بازرگانی برای تمامی اشخاص حقیقی و حقوقی که قصد ورود به عرصه تجارت خارجی را دارند، الزامی است و بدون آن امکان ثبت سفارش در <strong>سامانه جامع تجارت</strong>، <Link to="/blog/complete-guide-customs-clearance-shahid-rajaei" className="text-accent hover:underline">ترخیص کالا از گمرک</Link>، تخصیص ارز بانکی و انجام فعالیت‌های صادراتی وجود ندارد. این کارت یک سند هویتی برای فعال اقتصادی محسوب می‌شود و برخلاف تصور برخی، با <strong>ثبت برند</strong> یا <strong>پروانه کسب</strong> متفاوت است.
                </p>
                <p className="text-body mb-6 text-persian">
                  <strong>مدت اعتبار کارت بازرگانی</strong> به‌صورت پیش‌فرض یک سال است و دارنده باید پیش از پایان اعتبار، نسبت به <strong>تمدید کارت بازرگانی</strong> اقدام کند. برای متقاضیانی که برای اولین بار اقدام می‌کنند، اعتبار کارت در سال اول معمولاً یک‌ساله صادر می‌شود و در سال‌های بعد بر اساس عملکرد تجاری دارنده تا ۵ سال نیز قابل تمدید است. در صورت عدم تمدید به‌موقع، تمامی فعالیت‌های تجاری دارنده در گمرک و سامانه جامع تجارت متوقف می‌شود.
                </p>
              </section>

              {/* Types Section */}
              <section className="mb-12">
                <h2 className="heading-secondary mb-6 text-persian">انواع کارت بازرگانی</h2>
                
                <div className="grid gap-6 mb-6">
                  <Card className="card-service">
                    <CardHeader>
                      <CardTitle className="text-persian flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-accent" />
                        کارت بازرگانی اشخاص حقیقی
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-body text-persian">
                        این نوع کارت برای افراد حقیقی صادر می‌شود که به‌صورت شخصی قصد انجام فعالیت‌های تجاری دارند. دارنده این کارت می‌تواند به‌صورت مستقیم اقدام به واردات یا صادرات کالا کند.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="card-service">
                    <CardHeader>
                      <CardTitle className="text-persian flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-accent" />
                        کارت بازرگانی اشخاص حقوقی
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-body text-persian">
                        این کارت برای شرکت‌ها و موسسات حقوقی صادر می‌شود. برای دریافت این نوع کارت، شرکت باید در مرجع ثبت شرکت‌ها ثبت شده باشد و شناسه ملی دریافت کرده باشد.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="card-service">
                    <CardHeader>
                      <CardTitle className="text-persian flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-accent" />
                        کارت بازرگانی ویژه (صادرکنندگان نمونه)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-body text-persian">
                        این کارت برای صادرکنندگانی صادر می‌شود که عملکرد برجسته‌ای در زمینه صادرات داشته‌اند و از امتیازات و تسهیلات ویژه‌ای برخوردارند.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <p className="text-body mb-6 text-persian">
                  انتخاب نوع کارت بازرگانی بستگی به ماهیت فعالیت تجاری شما دارد. <strong>سقف ارزی</strong>، نوع مدارک و حتی هزینه صدور برای هر دسته متفاوت است؛ برای مثال کارت بازرگانی موردی فقط برای یک محموله مشخص و حداکثر تا ۶ ماه اعتبار دارد، در حالی که کارت حقوقی برای فعالیت مستمر و چندساله طراحی شده است. برای راهنمایی دقیق‌تر در <Link to="/business-card" className="text-accent hover:underline">انتخاب و اخذ کارت بازرگانی مناسب</Link> با کارشناسان ترخیصان مشورت کنید.
                </p>

                <ArticleImage
                  src={businessCardTypesImg}
                  alt="انواع کارت بازرگانی حقیقی، حقوقی، تولیدی و موردی صادره از اتاق بازرگانی"
                  caption="انواع کارت بازرگانی بسته به ماهیت فعالیت و نوع متقاضی متفاوت است"
                />

                <h3 className="heading-tertiary mb-4 mt-8 text-persian">تقسیم‌بندی بر اساس نوع درخواست</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="card-service">
                    <CardContent className="pt-6">
                      <h4 className="text-persian mb-2"><strong>کارت بازرگانی تولیدی</strong></h4>
                      <p className="text-sm text-muted-foreground text-persian">
                        مخصوص واحدهای تولیدی دارای پروانه بهره‌برداری برای واردات مواد اولیه و ماشین‌آلات و صادرات محصولات تولیدی. جهت <Link to="/business-card" className="text-accent hover:underline">اخذ کارت بازرگانی تولیدی</Link> مدارک مخصوص صنعتی مورد نیاز است.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="card-service">
                    <CardContent className="pt-6">
                      <h4 className="text-persian mb-2"><strong>کارت بازرگانی خدماتی</strong></h4>
                      <p className="text-sm text-muted-foreground text-persian">
                        برای شرکت‌ها و افرادی که در حوزه ارائه خدمات بین‌المللی فعالیت می‌کنند. برای <Link to="/business-card" className="text-accent hover:underline">دریافت کارت بازرگانی خدماتی</Link> باید مجوزهای مربوط به حوزه فعالیت خود را داشته باشید.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="card-service">
                    <CardContent className="pt-6">
                      <h4 className="text-persian mb-2"><strong>کارت بازرگانی موردی</strong></h4>
                      <p className="text-sm text-muted-foreground text-persian">
                        برای انجام یک‌بار واردات یا صادرات محدود به یک محموله خاص و در زمان مشخص صادر می‌شود. <Link to="/business-card" className="text-accent hover:underline">اخذ کارت بازرگانی موردی</Link> سریع‌تر و با مدارک کم‌تری انجام می‌شود.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Image 2 */}
              <ArticleImage
                src="/images/blog/business-card-handshake.webp"
                alt="معامله تجاری و توافق بین‌المللی با کارت بازرگانی"
                caption="کارت بازرگانی امکان فعالیت رسمی در تجارت بین‌المللی را فراهم می‌کند"
              />

              {/* Requirements Section */}
              <section className="mb-12">
                <h2 className="heading-secondary mb-6 text-persian">شرایط دریافت کارت بازرگانی</h2>
                <p className="text-body mb-6 text-persian">
                  پیش از <Link to="/business-card" className="text-accent hover:underline">اقدام برای اخذ کارت بازرگانی</Link> باید از داشتن تمامی شرایط زیر اطمینان حاصل کنید. تیم ترخیصان در تمام این مراحل همراه شما خواهد بود.
                </p>
                
                <div className="bg-secondary/30 rounded-xl p-6 mb-6">
                  <h3 className="heading-tertiary mb-4 text-persian">برای اشخاص حقیقی:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-persian">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                      <span>دارا بودن حداقل ۱۸ سال سن</span>
                    </li>
                    <li className="flex items-start gap-3 text-persian">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                      <span>عدم محکومیت کیفری مؤثر</span>
                    </li>
                    <li className="flex items-start gap-3 text-persian">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                      <span>داشتن کد اقتصادی</span>
                    </li>
                    <li className="flex items-start gap-3 text-persian">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                      <span>عضویت در اتاق بازرگانی</span>
                    </li>
                    <li className="flex items-start gap-3 text-persian">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                      <span>پرداخت حق عضویت و هزینه صدور کارت</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-secondary/30 rounded-xl p-6">
                  <h3 className="heading-tertiary mb-4 text-persian">برای اشخاص حقوقی:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-persian">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                      <span>ثبت رسمی شرکت در مراجع ثبتی</span>
                    </li>
                    <li className="flex items-start gap-3 text-persian">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                      <span>دریافت شناسه ملی</span>
                    </li>
                    <li className="flex items-start gap-3 text-persian">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                      <span>داشتن کد اقتصادی</span>
                    </li>
                    <li className="flex items-start gap-3 text-persian">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                      <span>عضویت در اتاق بازرگانی</span>
                    </li>
                    <li className="flex items-start gap-3 text-persian">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                      <span>ارائه اساسنامه و صورتجلسات شرکت</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Documents Section */}
              <section className="mb-12">
                <h2 className="heading-secondary mb-6 text-persian">مدارک لازم برای صدور کارت بازرگانی</h2>
                <p className="text-body mb-6 text-persian">
                  جمع‌آوری و تنظیم صحیح مدارک، مهم‌ترین گام برای <Link to="/business-card" className="text-accent hover:underline">دریافت کارت بازرگانی بدون ریجکتی</Link> است. در ادامه فهرست کامل مدارک مورد نیاز برای هر دو گروه حقیقی و حقوقی آمده است. توجه داشته باشید که علاوه بر مدارک پایه، اتاق بازرگانی معمولاً مدارکی نظیر <strong>گواهی پلمب دفاتر قانونی</strong>، <strong>اظهارنامه مالیاتی سال قبل</strong>، <strong>اجاره‌نامه یا سند مالکیت محل کار</strong> و <strong>تأییدیه کد پستی محل اقامت و کسب</strong> را نیز مطالبه می‌کند.
                </p>

                <ArticleImage
                  src={businessCardDocumentsImg}
                  alt="مدارک لازم برای اخذ کارت بازرگانی شامل شناسنامه، کارت ملی، فرم‌ها و گواهی‌ها"
                  caption="جمع‌آوری دقیق و کامل مدارک، کلید دریافت کارت بازرگانی بدون ریجکت است"
                />
                
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
                        <span className="text-accent font-bold">•</span>
                        <span>تصویر شناسنامه و کارت ملی</span>
                      </li>
                      <li className="flex items-start gap-2 text-persian">
                        <span className="text-accent font-bold">•</span>
                        <span>عکس پرسنلی</span>
                      </li>
                      <li className="flex items-start gap-2 text-persian">
                        <span className="text-accent font-bold">•</span>
                        <span>گواهی عدم سوء پیشینه</span>
                      </li>
                      <li className="flex items-start gap-2 text-persian">
                        <span className="text-accent font-bold">•</span>
                        <span>کد اقتصادی</span>
                      </li>
                      <li className="flex items-start gap-2 text-persian">
                        <span className="text-accent font-bold">•</span>
                        <span>فرم درخواست تکمیل شده</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="card-service">
                  <CardHeader>
                    <CardTitle className="text-persian flex items-center gap-2">
                      <FileText className="w-5 h-5 text-accent" />
                      مدارک اشخاص حقوقی
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-persian">
                        <span className="text-accent font-bold">•</span>
                        <span>روزنامه رسمی ثبت شرکت</span>
                      </li>
                      <li className="flex items-start gap-2 text-persian">
                        <span className="text-accent font-bold">•</span>
                        <span>اساسنامه شرکت</span>
                      </li>
                      <li className="flex items-start gap-2 text-persian">
                        <span className="text-accent font-bold">•</span>
                        <span>آگهی تأسیس و آخرین تغییرات</span>
                      </li>
                      <li className="flex items-start gap-2 text-persian">
                        <span className="text-accent font-bold">•</span>
                        <span>شناسه ملی و کد اقتصادی شرکت</span>
                      </li>
                      <li className="flex items-start gap-2 text-persian">
                        <span className="text-accent font-bold">•</span>
                        <span>مدارک هویتی مدیرعامل و اعضای هیئت مدیره</span>
                      </li>
                      <li className="flex items-start gap-2 text-persian">
                        <span className="text-accent font-bold">•</span>
                        <span>فرم درخواست تکمیل شده</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </section>

              {/* Process Section */}
              <section className="mb-12">
                <h2 className="heading-secondary mb-6 text-persian">مراحل دریافت کارت بازرگانی</h2>
                <p className="text-body mb-6 text-persian">
                  فرآیند <Link to="/business-card" className="text-accent hover:underline">اخذ کارت بازرگانی</Link> شامل چند مرحله مشخص است که با رعایت دقیق آن‌ها می‌توانید در کمترین زمان ممکن کارت خود را دریافت کنید. تیم ترخیصان آماده انجام این مراحل به نیابت از شما است.
                </p>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-l from-accent/15 to-accent/5 border-r-4 border-accent rounded-lg p-6">
                    <h3 className="text-lg mb-2 text-persian"><strong>مرحله ۱: عضویت در اتاق بازرگانی</strong></h3>
                    <p className="text-body text-persian">
                      ابتدا باید در اتاق بازرگانی محل اقامت یا محل فعالیت خود عضو شوید و حق عضویت را پرداخت کنید.
                    </p>
                  </div>

                  <div className="bg-gradient-to-l from-accent/15 to-accent/5 border-r-4 border-accent rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-2 text-persian">مرحله ۲: دریافت کد اقتصادی</h3>
                    <p className="text-body text-persian">
                      از سازمان امور مالیاتی کد اقتصادی دریافت کنید. این کد برای شناسایی فعالیت اقتصادی شما ضروری است.
                    </p>
                  </div>

                  <div className="bg-gradient-to-l from-accent/15 to-accent/5 border-r-4 border-accent rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-2 text-persian">مرحله ۳: تکمیل فرم درخواست</h3>
                    <p className="text-body text-persian">
                      فرم درخواست کارت بازرگانی را از سایت اتاق بازرگانی دانلود کرده و با دقت تکمیل کنید.
                    </p>
                  </div>

                  <div className="bg-gradient-to-l from-accent/15 to-accent/5 border-r-4 border-accent rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-2 text-persian">مرحله ۴: ارائه مدارک</h3>
                    <p className="text-body text-persian">
                      مدارک لازم را به همراه فرم تکمیل شده به اتاق بازرگانی تحویل دهید یا از طریق سامانه آنلاین بارگذاری کنید.
                    </p>
                  </div>

                  <div className="bg-gradient-to-l from-accent/15 to-accent/5 border-r-4 border-accent rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-2 text-persian">مرحله ۵: پرداخت هزینه</h3>
                    <p className="text-body text-persian">
                      هزینه صدور کارت بازرگانی را پرداخت کنید. مبلغ این هزینه سالانه متفاوت است و بر اساس نوع کارت تعیین می‌شود.
                    </p>
                  </div>

                  <div className="bg-gradient-to-l from-accent/15 to-accent/5 border-r-4 border-accent rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-2 text-persian">مرحله ۶: دریافت کارت</h3>
                    <p className="text-body text-persian">
                      پس از بررسی و تأیید مدارک، کارت بازرگانی شما صادر و ارسال می‌شود. این فرآیند معمولاً ۷ تا ۱۴ روز کاری طول می‌کشد.
                    </p>
                  </div>
                </div>
              </section>

              <ArticleImage
                src={businessCardProcessImg}
                alt="مراحل اخذ کارت بازرگانی در اتاق بازرگانی ایران - امضای مدارک و ثبت نام"
                caption="مراحل اخذ کارت بازرگانی با همراهی کارشناس ترخیصان سریع‌تر و بدون ریجکت طی می‌شود"
              />

              {/* Costs Section */}
              <section className="mb-12">
                <h2 className="heading-secondary mb-6 text-persian">هزینه‌های اخذ کارت بازرگانی</h2>
                <p className="text-body mb-6 text-persian">
                  یکی از پرتکرارترین سؤالات متقاضیان درباره <strong>هزینه اخذ کارت بازرگانی</strong> است. هزینه‌ها به سه دسته تقسیم می‌شود: حق عضویت اتاق بازرگانی، هزینه‌های جانبی صدور، و دستمزد کارگزار یا مشاور (در صورت استفاده از خدمات تخصصی مانند <Link to="/business-card" className="text-accent hover:underline">خدمات اخذ کارت بازرگانی ترخیصان</Link>).
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <Card className="card-service">
                    <CardContent className="pt-6">
                      <h3 className="text-persian mb-2"><strong>حق عضویت اتاق بازرگانی</strong></h3>
                      <p className="text-sm text-muted-foreground text-persian">
                        بسته به نوع کارت (حقیقی، حقوقی یا تولیدی) و اتاق محل ثبت، سالانه پرداخت می‌شود و معمولاً بیشترین سهم از هزینه را تشکیل می‌دهد.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="card-service">
                    <CardContent className="pt-6">
                      <h3 className="text-persian mb-2"><strong>هزینه آموزش اجباری</strong></h3>
                      <p className="text-sm text-muted-foreground text-persian">
                        گذراندن دوره مقدماتی تجارت برای متقاضیان جدید الزامی است و هزینه‌ای جداگانه برای صدور گواهی پایان دوره دریافت می‌شود.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="card-service">
                    <CardContent className="pt-6">
                      <h3 className="text-persian mb-2"><strong>پلمب دفاتر قانونی</strong></h3>
                      <p className="text-sm text-muted-foreground text-persian">
                        هزینه پلمب دفاتر روزنامه و کل در اداره ثبت شرکت‌ها، به‌علاوه هزینه چاپ و تهیه دفاتر.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="card-service">
                    <CardContent className="pt-6">
                      <h3 className="text-persian mb-2"><strong>گواهی‌های جانبی</strong></h3>
                      <p className="text-sm text-muted-foreground text-persian">
                        گواهی عدم سوء پیشینه، تأییدیه کد پستی، استعلام بانکی و هزینه‌های دفترخانه‌ای از موارد متغیر این بخش هستند.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <p className="text-body text-persian">
                  چون نرخ‌های اتاق بازرگانی هر سال به‌روزرسانی می‌شود، برای دریافت برآورد دقیق و به‌روز مناسب با نوع فعالیت خود، با مشاوران ترخیصان تماس بگیرید تا فهرست کامل هزینه‌ها بر اساس آخرین تعرفه‌های اتاق بازرگانی به شما ارائه شود.
                </p>
              </section>

              {/* FAQ Section */}
              <section className="mb-12">
                <h2 className="heading-secondary mb-6 text-persian">سؤالات متداول درباره کارت بازرگانی</h2>
                <div className="space-y-4">
                  <Card className="card-service">
                    <CardContent className="pt-6">
                      <h3 className="text-persian mb-2"><strong>تفاوت کارت بازرگانی حقیقی و حقوقی چیست؟</strong></h3>
                      <p className="text-body text-persian">
                        کارت حقیقی به نام یک شخص حقیقی صادر می‌شود و دارنده آن، خود مسئول تمامی تعهدات گمرکی و مالیاتی است. کارت حقوقی به نام یک شرکت ثبت‌شده با شناسه ملی صادر می‌شود و مسئولیت‌ها بر عهده شخصیت حقوقی است. برای فعالیت‌های سازمانی و بلندمدت، <Link to="/business-card" className="text-accent hover:underline">اخذ کارت بازرگانی حقوقی</Link> توصیه می‌شود.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="card-service">
                    <CardContent className="pt-6">
                      <h3 className="text-persian mb-2"><strong>مدت اعتبار کارت بازرگانی چقدر است؟</strong></h3>
                      <p className="text-body text-persian">
                        کارت بازرگانی معمولی یک سال اعتبار دارد و قابل تمدید است. کارت بازرگانی موردی فقط برای یک محموله و حداکثر ۶ ماه صادر می‌شود.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="card-service">
                    <CardContent className="pt-6">
                      <h3 className="text-persian mb-2"><strong>آیا بدون مدرک تحصیلی می‌توان کارت بازرگانی گرفت؟</strong></h3>
                      <p className="text-body text-persian">
                        بله؛ حداقل مدرک مورد نیاز برای اشخاص حقیقی <strong>دیپلم متوسطه</strong> است و نیازی به مدرک دانشگاهی نیست. در صورت نداشتن دیپلم، باید پیش از اقدام، گواهی معادل دریافت کنید.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="card-service">
                    <CardContent className="pt-6">
                      <h3 className="text-persian mb-2"><strong>تمدید کارت بازرگانی چگونه انجام می‌شود؟</strong></h3>
                      <p className="text-body text-persian">
                        برای تمدید کارت بازرگانی باید پیش از اتمام اعتبار، اظهارنامه مالیاتی سال قبل، مفاصاحساب بیمه و سایر مدارک به‌روز را به اتاق بازرگانی ارائه دهید. عدم تمدید به‌موقع موجب تعلیق فعالیت‌های گمرکی شما خواهد شد.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="card-service">
                    <CardContent className="pt-6">
                      <h3 className="text-persian mb-2"><strong>آیا اجاره دادن کارت بازرگانی قانونی است؟</strong></h3>
                      <p className="text-body text-persian">
                        خیر؛ بر اساس <strong>ماده ۱۱ قانون مبارزه با قاچاق کالا و ارز</strong>، اجاره یا واگذاری کارت بازرگانی به دیگران جرم محسوب شده و علاوه بر ابطال دائمی کارت، جرایم سنگین مالی و کیفری برای دارنده اصلی به همراه دارد.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="card-service">
                    <CardContent className="pt-6">
                      <h3 className="text-persian mb-2"><strong>چه مدت زمانی برای اخذ کارت بازرگانی نیاز است؟</strong></h3>
                      <p className="text-body text-persian">
                        با ارائه کامل مدارک و عدم وجود نقص، فرآیند صدور کارت بازرگانی برای متقاضیان حقیقی بین ۷ تا ۱۴ روز کاری و برای اشخاص حقوقی ۱۵ تا ۳۰ روز کاری به طول می‌انجامد. همراهی <Link to="/business-card" className="text-accent hover:underline">کارشناس ترخیصان</Link> این زمان را به‌طور قابل توجهی کاهش می‌دهد.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>



              {/* Benefits Section */}
              <section className="mb-12">
                <h2 className="heading-secondary mb-6 text-persian">مزایای داشتن کارت بازرگانی</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="card-service">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-bold mb-2 text-persian">امکان واردات و صادرات</h3>
                          <p className="text-sm text-muted-foreground text-persian">
                            اصلی‌ترین مزیت، امکان قانونی انجام معاملات تجاری بین‌المللی
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="card-service">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-bold mb-2 text-persian">دریافت تسهیلات بانکی</h3>
                          <p className="text-sm text-muted-foreground text-persian">
                            امکان استفاده از تسهیلات و خدمات بانکی ویژه تجارت خارجی
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="card-service">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-bold mb-2 text-persian">اعتبار تجاری</h3>
                          <p className="text-sm text-muted-foreground text-persian">
                            افزایش اعتبار و اعتماد در معاملات تجاری داخلی و بین‌المللی
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="card-service">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-bold mb-2 text-persian">عضویت در انجمن‌های تجاری</h3>
                          <p className="text-sm text-muted-foreground text-persian">
                            امکان عضویت در انجمن‌ها و تشکل‌های تجاری ملی و بین‌المللی
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="card-service">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-bold mb-2 text-persian">دسترسی به نمایشگاه‌ها</h3>
                          <p className="text-sm text-muted-foreground text-persian">
                            شرکت در نمایشگاه‌های تجاری داخلی و بین‌المللی
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="card-service">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-bold mb-2 text-persian">مشاوره تخصصی</h3>
                          <p className="text-sm text-muted-foreground text-persian">
                            دریافت خدمات مشاوره‌ای و آموزشی از اتاق بازرگانی
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Disadvantages Section */}
              <section className="mb-12">
                <h2 className="heading-secondary mb-6 text-persian">معایب اخذ کارت بازرگانی</h2>
                <p className="text-body mb-4 text-persian">
                  در کنار مزایا، دارندگان کارت بازرگانی مشمول تعهداتی نیز هستند که آگاهی از آن‌ها پیش از اقدام ضروری است:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-persian">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                    <span>الزام به ثبت‌نام در سامانه‌های مالیاتی و پرداخت <strong>مالیات بر ارزش افزوده</strong> و مالیات بر واردات کالا.</span>
                  </li>
                  <li className="flex items-start gap-3 text-persian">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                    <span>اخذ کارت برای کسانی که فقط چند بار محدود قصد واردات یا صادرات دارند مقرون‌به‌صرفه نیست.</span>
                  </li>
                  <li className="flex items-start gap-3 text-persian">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                    <span><strong>اجاره یا فروش کارت بازرگانی</strong> تبعات حقوقی، مالی و کیفری بسیار سنگینی برای دارنده اصلی به همراه دارد و اکیداً توصیه نمی‌شود.</span>
                  </li>
                  <li className="flex items-start gap-3 text-persian">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                    <span>مسئولیت کلیه عملکرد مالی و گمرکی ثبت‌شده با کارت، بر عهده دارنده آن است.</span>
                  </li>
                </ul>
              </section>

              {/* Exempt People Section */}
              <section className="mb-12">
                <h2 className="heading-secondary mb-6 text-persian">افراد معاف از اخذ کارت بازرگانی</h2>
                <p className="text-body mb-4 text-persian">
                  قانون‌گذار برخی از اشخاص را به‌دلیل ماهیت شغلی یا محل جغرافیایی فعالیت، از ارائه کارت بازرگانی معاف کرده است:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-persian">
                    <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                    <span><strong>پیله‌وران</strong> ساکن در نوار مرزی کشور</span>
                  </li>
                  <li className="flex items-start gap-3 text-persian">
                    <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                    <span><strong>ملوانان ایرانی</strong> شاغل در شناورهای واقع در مرزها و سواحل ایران (در حدی که گمرک کالا را برای فروش تشخیص ندهد)</span>
                  </li>
                  <li className="flex items-start gap-3 text-persian">
                    <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                    <span><strong>کارگران ایرانی</strong> شاغل در خارج از کشور، دارای کارنامه شغلی از وزارت کار</span>
                  </li>
                  <li className="flex items-start gap-3 text-persian">
                    <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                    <span><strong>شرکت‌های تعاونی مرزنشینان</strong> برای واردات کالاهای مورد نیاز اعضا</span>
                  </li>
                </ul>
              </section>

              {/* Deprived People Section */}
              <section className="mb-12">
                <h2 className="heading-secondary mb-6 text-persian">محرومین از کارت بازرگانی</h2>
                <p className="text-body mb-4 text-persian">
                  گروه‌هایی از اشخاص بر اساس قانون از دریافت کارت بازرگانی محروم هستند؛ شامل:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-persian">
                    <AlertCircle className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
                    <span>افرادی که به موجب قانون از تمام یا بخشی از <strong>حقوق اجتماعی</strong> محروم شده‌اند.</span>
                  </li>
                  <li className="flex items-start gap-3 text-persian">
                    <AlertCircle className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
                    <span>افرادی که هنوز <strong>ارز حاصل از صادرات</strong> خود را به سیستم بانکی بازنگردانده‌اند.</span>
                  </li>
                  <li className="flex items-start gap-3 text-persian">
                    <AlertCircle className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
                    <span>افرادی که <strong>فساد اخلاقی</strong> آن‌ها محرز و قطعی شده باشد.</span>
                  </li>
                  <li className="flex items-start gap-3 text-persian">
                    <AlertCircle className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
                    <span>افراد <strong>ورشکسته به تقصیر و تقلب</strong> که حکم آن‌ها قطعی شده باشد.</span>
                  </li>
                  <li className="flex items-start gap-3 text-persian">
                    <AlertCircle className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
                    <span>ورشکستگانی که هنوز <strong>امور تسویه</strong> آن‌ها انجام نشده است.</span>
                  </li>
                </ul>
              </section>

              {/* Important Notes */}
              <section className="mb-12">
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-r-4 border-yellow-500 rounded-lg p-6">
                  <div className="flex gap-3">
                    <AlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-lg mb-3 text-persian">نکات مهم</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="text-persian">• کارت بازرگانی سالانه باید تمدید شود و در صورت عدم تمدید به موقع، اعتبار آن از بین می‌رود</li>
                        <li className="text-persian">• تغییر هر گونه اطلاعات در کارت بازرگانی باید به اتاق بازرگانی اطلاع داده شود</li>
                        <li className="text-persian">• کارت بازرگانی قابل انتقال به دیگران نیست</li>
                        <li className="text-persian">• در صورت گم شدن یا آسیب دیدن کارت، باید فوراً به اتاق بازرگانی اطلاع دهید</li>
                        <li className="text-persian">• برای فعالیت در برخی کشورها، ممکن است نیاز به اخذ مجوزهای اضافی باشد</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Conclusion */}
              <section className="mb-12">
                <h2 className="heading-secondary mb-6 text-persian">نتیجه‌گیری</h2>
                <p className="text-body mb-4 text-persian">
                  <strong>کارت بازرگانی</strong> دروازه ورود به دنیای تجارت بین‌المللی است. داشتن این کارت نه‌تنها یک الزام قانونی، بلکه نشان‌دهنده جدیت و حرفه‌ای بودن شما در فضای تجاری است. با آگاهی از شرایط، مدارک لازم و مراحل دریافت، می‌توانید به‌راحتی این کارت را دریافت کرده و فعالیت تجاری خود را آغاز کنید.
                </p>
                <p className="text-body mb-4 text-persian">
                  در سال‌های اخیر و با گسترش <Link to="/blog/import-export-guide-iran" className="text-accent hover:underline">واردات و صادرات</Link> در کشور، اخذ کارت بازرگانی به یکی از پرتقاضاترین خدمات حوزه تجارت تبدیل شده است. انتخاب نوع صحیح کارت، تنظیم دقیق مدارک و هماهنگی با اتاق بازرگانی محل اقامت، نقش تعیین‌کننده‌ای در سرعت و موفقیت فرآیند دارد. اشتباه در هر یک از این مراحل می‌تواند به <strong>ریجکت شدن پرونده</strong> و تأخیر چند ماهه منجر شود.
                </p>
                <p className="text-body text-persian">
                  اگر قصد <Link to="/business-card" className="text-accent hover:underline">اخذ کارت بازرگانی حقیقی، حقوقی، تولیدی یا موردی</Link> را دارید، تیم متخصص ترخیصان با سال‌ها تجربه در امور گمرکی و بازرگانی، آماده است تا در تمامی مراحل ثبت‌نام، تهیه مدارک، آموزش‌های اتاق بازرگانی و پیگیری فرآیند صدور کارت شما را همراهی کند. برای دریافت <Link to="/business-card" className="text-accent hover:underline">مشاوره تخصصی اخذ کارت بازرگانی</Link> و برآورد دقیق هزینه و زمان، همین حالا با کارشناسان ما در ارتباط باشید.
                </p>
              </section>

              {/* CTA Section */}
              <section className="mt-16">
                <Card className="card-service bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20">
                  <CardContent className="p-8 text-center">
                    <h3 className="heading-tertiary mb-4 text-persian">
                      نیاز به مشاوره تخصصی دارید؟
                    </h3>
                    <p className="text-body mb-6 text-persian">
                      تیم ترخیصان آماده است تا در تمامی مراحل دریافت کارت بازرگانی و امور گمرکی شما را همراهی کند
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                      <Link to="/business-card">
                        <Button size="lg" className="text-persian">
                          درخواست اخذ کارت بازرگانی
                        </Button>
                      </Link>
                      <Link to="/#contact">
                        <Button variant="outline" size="lg" className="text-persian">
                          تماس با ما
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </section>

            </div>
          </div>
        </article>

        {/* Related Articles */}
        <RelatedArticles currentPostId={7} />
      </main>
      
      <Footer />
    </div>
    </>
  );
};

export default BusinessCardGuide;
