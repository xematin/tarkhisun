import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleBreadcrumb from "@/components/ArticleBreadcrumb";
import RelatedArticles from "@/components/RelatedArticles";
import { Card, CardContent } from "@/components/ui/card";
import { Car, FileText, CreditCard, CheckCircle, AlertCircle, Clock, DollarSign, Settings, Shield, Phone, Globe, Calculator } from "lucide-react";
import ArticleImage from "@/components/ArticleImage";

const ImportedCarSystemGuide = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "سامانه خودروهای وارداتی | راهنمای کامل واردات و ترخیص خودرو ۱۴۰۴",
    description:
      "راهنمای جامع سامانه خودروهای وارداتی: ثبت‌نام، مراحل واردات، مدارک لازم، تعرفه گمرکی، استانداردها و شرایط ترخیص خودروی وارداتی در ایران",
    image: "https://tarkhisun.com/images/blog/imported-car-port.webp",
    datePublished: "2025-12-09",
    dateModified: "2025-12-09",
    author: {
      "@type": "Organization",
      name: "ترخیصان",
      url: "https://tarkhisun.com",
    },
    publisher: {
      "@type": "Organization",
      name: "ترخیصان",
      logo: {
        "@type": "ImageObject",
        url: "https://tarkhisun.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://tarkhisun.com/blog/imported-car-system-guide",
    },
    keywords:
      "سامانه خودروهای وارداتی، واردات خودرو، ترخیص خودرو، گمرک خودرو، تعرفه واردات خودرو، ثبت سفارش خودرو، شرایط واردات خودرو، خودروی وارداتی ۱۴۰۴",
    articleSection: "سیستم‌های گمرکی",
    wordCount: 2500,
    thumbnailUrl: "https://tarkhisun.com/images/blog/imported-car-port.webp",
  };

  const breadcrumbStructuredData = {
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
        name: "سامانه خودروهای وارداتی",
      },
    ],
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "سامانه خودروهای وارداتی چیست؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "سامانه خودروهای وارداتی یک پلتفرم دولتی برای مدیریت و نظارت بر واردات خودرو به ایران است که تمام مراحل ثبت سفارش، بازرسی، گمرک و شماره‌گذاری را یکپارچه می‌کند.",
        },
      },
      {
        "@type": "Question",
        name: "شرایط واردات خودرو در سال ۱۴۰۴ چیست؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "شرایط واردات خودرو شامل داشتن کارت بازرگانی، ثبت سفارش در سامانه جامع تجارت، واریز ارز در سامانه نیما، بازرسی قبل از حمل و رعایت استانداردهای ملی می‌شود.",
        },
      },
      {
        "@type": "Question",
        name: "تعرفه گمرکی واردات خودرو چقدر است؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "تعرفه گمرکی واردات خودرو بسته به حجم موتور و نوع خودرو متفاوت است. برای خودروهای زیر ۲۵۰۰ سی‌سی حدود ۹۰ تا ۱۲۰ درصد و برای خودروهای بالای ۲۵۰۰ سی‌سی حدود ۱۵۰ تا ۲۰۰ درصد ارزش CIF محاسبه می‌شود.",
        },
      },
    ],
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://tarkhisun.com/blog/imported-car-system-guide" />
        <title>سامانه خودروهای وارداتی | راهنمای کامل واردات و ترخیص خودرو ۱۴۰۴</title>
        <meta
          name="description"
          content="راهنمای سامانه خودروهای وارداتی: ثبت‌نام، مراحل واردات، مدارک، تعرفه گمرکی و ترخیص خودرو در ایران ۱۴۰۴"
        />
        <meta
          name="keywords"
          content="سامانه خودروهای وارداتی، واردات خودرو، ترخیص خودرو، گمرک خودرو، تعرفه واردات خودرو، ثبت سفارش خودرو، شرایط واردات خودرو، خودروی وارداتی ۱۴۰۴، سامانه واردات خودرو، قیمت خودروی وارداتی، استاندارد خودرو وارداتی، مجوز واردات خودرو"
        />
        
        <meta property="og:locale" content="fa_IR" />

        <meta property="og:title" content="سامانه خودروهای وارداتی | راهنمای کامل واردات و ترخیص خودرو ۱۴۰۴" />
        <meta
          property="og:description"
          content="راهنمای جامع سامانه خودروهای وارداتی: ثبت‌نام، مراحل واردات، مدارک لازم، تعرفه گمرکی و شرایط ترخیص"
        />
        <meta property="og:url" content="https://tarkhisun.com/blog/imported-car-system-guide" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://tarkhisun.com/images/blog/imported-car-port.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="سامانه خودروهای وارداتی | راهنمای کامل واردات و ترخیص خودرو ۱۴۰۴" />
        <meta
          name="twitter:description"
          content="راهنمای جامع سامانه خودروهای وارداتی: ثبت‌نام، مراحل، مدارک و هزینه‌های واردات خودرو"
        />
        <meta name="twitter:image" content="https://tarkhisun.com/images/blog/imported-car-port.webp" />

        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbStructuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqStructuredData)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-8 mt-20">
          <ArticleBreadcrumb category="سیستم‌های گمرکی" articleTitle="سامانه خودروهای وارداتی" />

          <article className="max-w-4xl mx-auto">
            <header className="mb-8">
              <h1 className="text-4xl font-bold mb-4 text-foreground">
                سامانه <strong>خودروهای وارداتی</strong> | راهنمای کامل واردات و ترخیص خودرو ۱۴۰۴
              </h1>
              <div className="flex items-center gap-4 text-muted-foreground text-sm">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  ۲۰ دقیقه مطالعه
                </span>
                <span>تاریخ انتشار: ۱۴۰۴/۹/۱۹</span>
              </div>

              <ArticleImage
                src="/images/blog/imported-car-port.webp"
                alt="خودروهای وارداتی در بندر شهید رجایی بندرعباس - سامانه واردات خودرو"
                caption="خودروهای وارداتی در انتظار ترخیص از گمرک بندرعباس"
                priority
              />
            </header>

            <div className="prose prose-lg max-w-none">
              <Card className="mb-8 border-primary/20 bg-primary/5">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Car className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold mb-2 text-foreground">خلاصه مطلب</h3>
                      <p className="text-foreground/90 leading-relaxed">
                        <strong>سامانه خودروهای وارداتی</strong> پلتفرم رسمی دولت برای مدیریت واردات خودرو به ایران است. در این راهنما، تمامی مراحل <strong>ثبت‌نام، ثبت سفارش، بازرسی، ترخیص گمرکی</strong>، مدارک لازم، تعرفه‌ها، استانداردها و نکات کلیدی واردات خودرو در سال ۱۴۰۴ را بررسی می‌کنیم.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-2">
                  <Globe className="w-6 h-6 text-primary" />
                  سامانه خودروهای وارداتی چیست؟
                </h2>
                <p className="text-foreground/90 leading-relaxed mb-4">
                  <strong>سامانه خودروهای وارداتی</strong> یک سیستم یکپارچه دولتی است که تمام فرآیندهای مربوط به واردات خودرو به ایران را مدیریت می‌کند. این سامانه توسط وزارت صنعت، معدن و تجارت راه‌اندازی شده و با همکاری گمرک ایران، سازمان استاندارد، سازمان حفاظت محیط زیست و پلیس راهور فعالیت می‌کند.
                </p>
                <p className="text-foreground/90 leading-relaxed mb-4">
                  پس از سال‌ها ممنوعیت، واردات خودرو از سال ۱۴۰۱ با شرایط جدید آزاد شد. این سامانه برای شفاف‌سازی فرآیند واردات، جلوگیری از تخلفات و اطمینان از کیفیت خودروهای وارداتی طراحی شده است. برای آشنایی با{" "}
                  <Link to="/blog/ntsw-complete-guide" className="text-accent hover:underline">
                    سامانه جامع تجارت
                  </Link>{" "}
                  که بخشی از فرآیند ثبت سفارش خودرو است، مقاله مربوطه را مطالعه کنید.
                </p>

                <Card className="mt-4 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm text-green-900 dark:text-green-100 font-bold mb-2">مزایای سامانه خودروهای وارداتی:</p>
                        <ul className="text-sm text-green-900 dark:text-green-100 space-y-1">
                          <li>• یکپارچه‌سازی تمام مراحل واردات</li>
                          <li>• شفافیت در قیمت‌گذاری و تعرفه‌ها</li>
                          <li>• نظارت بر کیفیت و استانداردهای خودرو</li>
                          <li>• جلوگیری از واردات خودروهای غیراستاندارد</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-2">
                  <FileText className="w-6 h-6 text-primary" />
                  شرایط واردات خودرو در سال ۱۴۰۴
                </h2>
                <p className="text-foreground/90 leading-relaxed mb-4">
                  واردات خودرو به ایران با رعایت شرایط خاصی امکان‌پذیر است. برای آشنایی با{" "}
                  <Link to="/blog/business-card-complete-guide" className="text-accent hover:underline">
                    کارت بازرگانی
                  </Link>{" "}
                  که پیش‌نیاز اصلی واردات است، مقاله مربوطه را مطالعه کنید.
                </p>

                <h3 className="text-xl font-bold mb-3 text-foreground mt-6">شرایط عمومی واردات خودرو:</h3>
                <ul className="list-disc list-inside space-y-2 mr-6 text-foreground/90 mb-6">
                  <li><strong>کارت بازرگانی</strong> فعال با اعتبار حداقل یک سال</li>
                  <li><strong>ثبت‌نام در سامانه</strong> خودروهای وارداتی</li>
                  <li><strong>ثبت سفارش</strong> در سامانه جامع تجارت (NTSW)</li>
                  <li><strong>واریز ارز</strong> در سامانه نیما یا سنا</li>
                  <li><strong>بازرسی قبل از حمل</strong> (PSI) توسط شرکت‌های معتبر</li>
                  <li>رعایت <strong>استانداردهای ملی</strong> و زیست‌محیطی</li>
                </ul>

                <h3 className="text-xl font-bold mb-3 text-foreground mt-6">محدودیت‌های واردات خودرو:</h3>
                <ul className="list-disc list-inside space-y-2 mr-6 text-foreground/90 mb-6">
                  <li>حداکثر <strong>عمر خودرو ۳ سال</strong> از تاریخ تولید</li>
                  <li>رعایت <strong>استاندارد آلایندگی یورو ۵</strong> به بالا</li>
                  <li>داشتن <strong>گارانتی رسمی</strong> در ایران</li>
                  <li>عدم تغییر در <strong>مشخصات فنی</strong> خودرو</li>
                  <li>محدودیت در <strong>حجم موتور</strong> برای برخی کشورها</li>
                </ul>

                <Card className="mt-4 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1" />
                      <p className="text-sm text-amber-900 dark:text-amber-100">
                        <strong>نکته مهم:</strong> واردات خودرو توسط اشخاص حقیقی فقط برای مصرف شخصی و با محدودیت سالیانه امکان‌پذیر است. واردات تجاری نیازمند شرایط خاص و مجوزهای ویژه است.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              <ArticleImage
                src="/images/blog/car-customs-clearance.webp"
                alt="مراحل ترخیص خودرو از گمرک - بازرسی و ارزیابی خودروی وارداتی"
                caption="فرآیند بازرسی و ترخیص خودرو در گمرک"
              />

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-2">
                  <Settings className="w-6 h-6 text-primary" />
                  مراحل ثبت‌نام و استفاده از سامانه
                </h2>

                <h3 className="text-xl font-bold mb-3 text-foreground mt-6">مرحله ۱: ثبت‌نام اولیه</h3>
                <p className="text-foreground/90 leading-relaxed mb-4">
                  برای شروع فرآیند واردات خودرو، ابتدا باید در سامانه خودروهای وارداتی ثبت‌نام کنید. این سامانه از طریق پورتال وزارت صنعت قابل دسترسی است.
                </p>
                <ol className="list-decimal list-inside space-y-2 mr-6 text-foreground/90 mb-6">
                  <li>ورود به سامانه با <strong>کد اقتصادی</strong></li>
                  <li>تکمیل <strong>اطلاعات هویتی</strong> و شرکتی</li>
                  <li>بارگذاری <strong>مدارک شرکت</strong> و کارت بازرگانی</li>
                  <li>تأیید <strong>صلاحیت حرفه‌ای</strong> توسط اتاق بازرگانی</li>
                  <li>دریافت <strong>کد کاربری</strong> فعال</li>
                </ol>

                <h3 className="text-xl font-bold mb-3 text-foreground mt-6">مرحله ۲: ثبت سفارش خودرو</h3>
                <p className="text-foreground/90 leading-relaxed mb-4">
                  پس از تأیید ثبت‌نام، می‌توانید درخواست واردات خودرو را ثبت کنید. این مرحله از طریق{" "}
                  <Link to="/blog/ntsw-complete-guide" className="text-accent hover:underline">
                    سامانه جامع تجارت
                  </Link>{" "}
                  انجام می‌شود.
                </p>
                <ul className="list-disc list-inside space-y-2 mr-6 text-foreground/90 mb-6">
                  <li>انتخاب <strong>مدل و برند</strong> خودرو</li>
                  <li>ثبت <strong>مشخصات فنی</strong> (حجم موتور، سال تولید، رنگ)</li>
                  <li>انتخاب <strong>کشور مبدأ</strong> و فروشنده</li>
                  <li>بارگذاری <strong>پروفرما</strong> (فاکتور پیش‌فرم)</li>
                  <li>پرداخت <strong>هزینه ثبت سفارش</strong></li>
                </ul>

                <h3 className="text-xl font-bold mb-3 text-foreground mt-6">مرحله ۳: بازرسی قبل از حمل (PSI)</h3>
                <p className="text-foreground/90 leading-relaxed mb-4">
                  <strong>بازرسی قبل از حمل</strong> (Pre-Shipment Inspection) یکی از مراحل الزامی واردات خودرو است که توسط شرکت‌های بازرسی بین‌المللی معتبر انجام می‌شود.
                </p>
                <ul className="list-disc list-inside space-y-2 mr-6 text-foreground/90">
                  <li>بررسی <strong>مطابقت مشخصات</strong> با ثبت سفارش</li>
                  <li>کنترل <strong>سال تولید</strong> و کیلومتر کارکرد</li>
                  <li>بازرسی <strong>سلامت فنی</strong> و بدنه خودرو</li>
                  <li>تأیید <strong>استانداردهای آلایندگی</strong></li>
                  <li>صدور <strong>گواهی بازرسی</strong></li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-primary" />
                  مدارک لازم برای واردات خودرو
                </h2>

                <h3 className="text-xl font-bold mb-3 text-foreground mt-6">مدارک حقوقی:</h3>
                <ul className="list-disc list-inside space-y-2 mr-6 text-foreground/90 mb-6">
                  <li><strong>کارت بازرگانی</strong> معتبر و فعال</li>
                  <li><strong>ثبت سفارش</strong> تأیید شده از سامانه جامع تجارت</li>
                  <li><strong>مجوز واردات</strong> از وزارت صنعت</li>
                  <li><strong>گواهی ثبت‌نام</strong> در سامانه خودروهای وارداتی</li>
                  <li><strong>کد اقتصادی</strong> فعال</li>
                </ul>

                <h3 className="text-xl font-bold mb-3 text-foreground mt-6">مدارک خودرو:</h3>
                <ul className="list-disc list-inside space-y-2 mr-6 text-foreground/90 mb-6">
                  <li><strong>سند مالکیت</strong> (Title) خودرو</li>
                  <li><strong>فاکتور خرید</strong> (Commercial Invoice)</li>
                  <li><strong>گواهی بازرسی PSI</strong></li>
                  <li><strong>بارنامه</strong> (Bill of Lading)</li>
                  <li><strong>لیست بسته‌بندی</strong> (Packing List)</li>
                  <li><strong>گواهی مبدأ</strong> (Certificate of Origin)</li>
                </ul>

                <h3 className="text-xl font-bold mb-3 text-foreground mt-6">مدارک گمرکی:</h3>
                <ul className="list-disc list-inside space-y-2 mr-6 text-foreground/90 mb-6">
                  <li><strong>اظهارنامه گمرکی</strong> تکمیل شده</li>
                  <li>رسید <strong>پرداخت حقوق گمرکی</strong></li>
                  <li><strong>گواهی استاندارد</strong> از سازمان ملی استاندارد</li>
                  <li><strong>گواهی زیست‌محیطی</strong> از سازمان محیط زیست</li>
                  <li><strong>بیمه‌نامه</strong> حمل دریایی</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-2">
                  <Calculator className="w-6 h-6 text-primary" />
                  تعرفه و هزینه‌های واردات خودرو
                </h2>
                <p className="text-foreground/90 leading-relaxed mb-4">
                  هزینه‌های واردات خودرو شامل چندین بخش است که باید در محاسبه قیمت نهایی خودرو در نظر گرفته شود. برای آشنایی با{" "}
                  <Link to="/blog/customs-tariff-guide" className="text-accent hover:underline">
                    تعرفه‌های گمرکی
                  </Link>{" "}
                  مقاله مربوطه را مطالعه کنید.
                </p>

                <div className="overflow-x-auto mb-6">
                  <table className="w-full border-collapse border border-border">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border border-border p-3 text-right">نوع هزینه</th>
                        <th className="border border-border p-3 text-right">درصد/مبلغ</th>
                        <th className="border border-border p-3 text-right">توضیحات</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border p-3 font-medium">حقوق گمرکی</td>
                        <td className="border border-border p-3">۴ درصد</td>
                        <td className="border border-border p-3">محاسبه بر اساس ارزش CIF</td>
                      </tr>
                      <tr className="bg-muted/50">
                        <td className="border border-border p-3 font-medium">سود بازرگانی</td>
                        <td className="border border-border p-3">۹۰ - ۱۵۰ درصد</td>
                        <td className="border border-border p-3">بسته به حجم موتور متفاوت</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-3 font-medium">مالیات ارزش افزوده</td>
                        <td className="border border-border p-3">۱۰ درصد</td>
                        <td className="border border-border p-3">محاسبه بر ارزش + تعرفه</td>
                      </tr>
                      <tr className="bg-muted/50">
                        <td className="border border-border p-3 font-medium">عوارض محیط زیست</td>
                        <td className="border border-border p-3">۱ - ۵ درصد</td>
                        <td className="border border-border p-3">بسته به استاندارد آلایندگی</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-3 font-medium">هزینه بازرسی PSI</td>
                        <td className="border border-border p-3">۵۰۰ - ۱۵۰۰ دلار</td>
                        <td className="border border-border p-3">بسته به کشور مبدأ</td>
                      </tr>
                      <tr className="bg-muted/50">
                        <td className="border border-border p-3 font-medium">حمل و بیمه</td>
                        <td className="border border-border p-3">متغیر</td>
                        <td className="border border-border p-3">بسته به مسافت و روش حمل</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <Card className="mt-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm text-blue-900 dark:text-blue-100 font-bold mb-2">مثال محاسبه هزینه:</p>
                        <p className="text-sm text-blue-900 dark:text-blue-100">
                          برای یک خودروی ۳۰,۰۰۰ دلاری با حجم موتور ۲۰۰۰ سی‌سی، تقریباً ۱۰۰ درصد ارزش خودرو به عنوان سود بازرگانی و تعرفه اضافه می‌شود. یعنی هزینه کل حدود ۶۵-۷۰ هزار دلار خواهد بود.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-2">
                  <Shield className="w-6 h-6 text-primary" />
                  استانداردها و الزامات فنی
                </h2>
                <p className="text-foreground/90 leading-relaxed mb-4">
                  خودروهای وارداتی باید استانداردهای خاصی را رعایت کنند که توسط سازمان ملی استاندارد و سازمان محیط زیست تعیین شده است.
                </p>

                <h3 className="text-xl font-bold mb-3 text-foreground mt-6">استانداردهای زیست‌محیطی:</h3>
                <ul className="list-disc list-inside space-y-2 mr-6 text-foreground/90 mb-6">
                  <li>رعایت <strong>استاندارد یورو ۵</strong> یا بالاتر</li>
                  <li><strong>گواهی آلایندگی</strong> از کشور مبدأ</li>
                  <li>عدم استفاده از <strong>سوخت‌های ممنوع</strong></li>
                  <li>محدودیت <strong>مصرف سوخت</strong> برای برخی کلاس‌ها</li>
                </ul>

                <h3 className="text-xl font-bold mb-3 text-foreground mt-6">استانداردهای ایمنی:</h3>
                <ul className="list-disc list-inside space-y-2 mr-6 text-foreground/90 mb-6">
                  <li>داشتن <strong>ایربگ‌های استاندارد</strong></li>
                  <li><strong>سیستم ترمز ABS</strong></li>
                  <li><strong>کمربند ایمنی</strong> سه‌نقطه‌ای</li>
                  <li>استاندارد <strong>تصادف</strong> (Crash Test)</li>
                  <li><strong>چراغ‌های روز</strong> (DRL) برای مدل‌های جدید</li>
                </ul>

                <h3 className="text-xl font-bold mb-3 text-foreground mt-6">الزامات فنی:</h3>
                <ul className="list-disc list-inside space-y-2 mr-6 text-foreground/90">
                  <li><strong>فرمان سمت چپ</strong> (مطابق با ایران)</li>
                  <li><strong>سیستم صوتی</strong> با فرکانس FM ایران</li>
                  <li><strong>کیلومترشمار</strong> به کیلومتر</li>
                  <li>قابلیت استفاده از <strong>بنزین استاندارد</strong> ایران</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-primary" />
                  مراحل ترخیص خودرو از گمرک
                </h2>
                <p className="text-foreground/90 leading-relaxed mb-4">
                  پس از رسیدن خودرو به بندر، مراحل ترخیص آغاز می‌شود. این فرآیند معمولاً در{" "}
                  <Link to="/blog/zero-to-hundred-bandar-abbas-customs-clearance" className="text-accent hover:underline">
                    گمرک بندرعباس
                  </Link>{" "}
                  انجام می‌شود که بزرگترین بندر واردات خودرو در ایران است.
                </p>

                <ol className="list-decimal list-inside space-y-3 mr-6 text-foreground/90 mb-6">
                  <li><strong>ثبت اظهارنامه</strong> در سامانه EPL گمرک</li>
                  <li><strong>ارزشیابی</strong> و تعیین ارزش گمرکی</li>
                  <li><strong>پرداخت حقوق</strong> و عوارض گمرکی</li>
                  <li><strong>بازرسی فنی</strong> توسط کارشناسان گمرک</li>
                  <li>تأیید <strong>استانداردها</strong> توسط سازمان استاندارد</li>
                  <li>صدور <strong>پروانه سبز</strong> گمرکی</li>
                  <li><strong>ترخیص</strong> و خروج از بندر</li>
                  <li><strong>شماره‌گذاری</strong> توسط پلیس راهور</li>
                </ol>

                <Card className="mt-4 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                      <p className="text-sm text-green-900 dark:text-green-100">
                        <strong>زمان ترخیص:</strong> مدت زمان ترخیص خودرو از گمرک معمولاً ۱۵ تا ۳۰ روز کاری است. این زمان با داشتن مدارک کامل و بدون مشکل می‌تواند کوتاه‌تر شود.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-primary" />
                  سوالات متداول درباره سامانه خودروهای وارداتی
                </h2>

                <div className="space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="font-bold mb-2 text-foreground">آیا واردات خودروی دست دوم مجاز است؟</h3>
                      <p className="text-foreground/90">
                        بله، واردات خودروی دست دوم با شرط حداکثر ۳ سال عمر از تاریخ تولید مجاز است. خودرو باید سالم و بدون خسارت سنگین باشد و گواهی بازرسی PSI داشته باشد.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="font-bold mb-2 text-foreground">چه برندهایی قابل واردات هستند؟</h3>
                      <p className="text-foreground/90">
                        تمامی برندهای خودرویی که دارای نمایندگی رسمی و گارانتی در ایران هستند قابل واردات هستند. برندهایی که نمایندگی ندارند، نیازمند ارائه ضمانت خدمات پس از فروش توسط واردکننده هستند.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="font-bold mb-2 text-foreground">واردات خودرو از کدام کشورها مجاز است؟</h3>
                      <p className="text-foreground/90">
                        واردات خودرو از اکثر کشورها مجاز است، اما امارات، آلمان، کره جنوبی و ژاپن از مبادی اصلی واردات هستند. واردات از برخی کشورهای تحت تحریم با محدودیت‌هایی همراه است.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="font-bold mb-2 text-foreground">آیا خودروی برقی و هیبریدی قابل واردات است؟</h3>
                      <p className="text-foreground/90">
                        بله، خودروهای برقی و هیبریدی با تعرفه ترجیحی قابل واردات هستند. این خودروها از تخفیف تعرفه‌ای برخوردار بوده و تشویق‌های خاصی برای واردات آنها وجود دارد.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-2">
                  <Phone className="w-6 h-6 text-primary" />
                  مشاوره تخصصی واردات خودرو
                </h2>
                <p className="text-foreground/90 leading-relaxed mb-4">
                  واردات خودرو فرآیند پیچیده‌ای است که نیازمند تخصص و تجربه است. تیم <strong>ترخیصان</strong> با سال‌ها تجربه در زمینه ترخیص خودرو، آماده ارائه خدمات مشاوره و ترخیص تخصصی به شماست.
                </p>

                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="pt-6">
                    <h3 className="font-bold mb-4 text-foreground">خدمات ترخیصان در زمینه واردات خودرو:</h3>
                    <ul className="space-y-2 text-foreground/90">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span>مشاوره <strong>انتخاب خودرو</strong> مناسب</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span>راهنمایی <strong>ثبت سفارش</strong> و مدارک</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span>هماهنگی <strong>بازرسی PSI</strong></span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span><strong>ترخیص کامل</strong> از گمرک</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span>پیگیری <strong>شماره‌گذاری</strong></span>
                      </li>
                    </ul>
                    <div className="mt-6 text-center">
                      <a
                        href="tel:+989177380080"
                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors"
                      >
                        <Phone className="w-5 h-5" />
                        تماس برای مشاوره رایگان
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </div>

            <RelatedArticles currentPostId={24} />
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ImportedCarSystemGuide;
