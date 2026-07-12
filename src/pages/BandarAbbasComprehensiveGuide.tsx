import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleBreadcrumb from "@/components/ArticleBreadcrumb";
import RelatedArticles from "@/components/RelatedArticles";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, FileText, Clock, Calculator, AlertTriangle, Ship, Package } from "lucide-react";
import ArticleImage from "@/components/ArticleImage";

const BandarAbbasComprehensiveGuide = () => {
  useEffect(() => {
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "fa");
    window.scrollTo(0, 0);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "صفر تا صد ترخیص کالا از بندرعباس | راهنمای کامل گمرک شهید رجایی",
        description: "راهنمای جامع و کامل ترخیص کالا از گمرک بندرعباس با تمام مراحل، مدارک و هزینه‌ها",
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
        },
        datePublished: "2025-10-17",
        dateModified: "2025-10-17",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": "https://tarkhisun.com/blog/bandar-abbas-comprehensive-clearance-guide",
        },
        keywords: "صفر تا صد ترخیص کالا, بندرعباس, گمرک شهید رجایی, مراحل ترخیص, واردات",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "خانه",
            item: "https://tarkhisun.com/",
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
            name: "صفر تا صد ترخیص کالا از بندرعباس",
          },
        ],
      },
    ],
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://tarkhisun.com/blog/bandar-abbas-comprehensive-clearance-guide" />
        <title>صفر تا صد ترخیص کالا از بندرعباس | راهنمای کامل گمرک شهید رجایی</title>
        <meta
          name="description"
          content="راهنمای ترخیص کالا از گمرک بندرعباس: مراحل، مدارک، هزینه‌ها و نکات کلیدی واردات از شهید رجایی"
        />
        <meta
          name="keywords"
          content="صفر تا صد ترخیص کالا, ترخیص کالا بندرعباس, گمرک شهید رجایی, مراحل ترخیص کالا, مدارک ترخیص گمرک, هزینه ترخیص بندرعباس, واردات از بندرعباس, ترخیص گمرکی, راهنمای ترخیص کالا, فرآیند ترخیص"
        />
        
        <meta property="og:title" content="صفر تا صد ترخیص کالا از بندرعباس | راهنمای کامل گمرک شهید رجایی" />
        <meta
          property="og:description"
          content="راهنمای جامع ترخیص کالا از گمرک بندرعباس با تمام مراحل، مدارک، هزینه‌ها و نکات کلیدی"
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://tarkhisun.com/blog/bandar-abbas-comprehensive-clearance-guide" />
        <meta property="og:image" content="https://tarkhisun.com/og-image.jpg" />
        <meta property="og:locale" content="fa_IR" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="min-h-screen bg-background" dir="rtl">
        <Header />

        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <ArticleBreadcrumb category="راهنمای ترخیص" articleTitle="صفر تا صد ترخیص کالا از بندرعباس" />

          <article className="prose prose-lg max-w-none" itemScope itemType="https://schema.org/Article">
            {/* Article Header */}
            <header className="mb-8 pb-6 border-b border-border">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4" itemProp="headline">
                صفر تا صد ترخیص کالا از <strong>بندرعباس</strong> | راهنمای کامل <strong>گمرک شهید رجایی</strong>
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <time dateTime="2025-10-17" itemProp="datePublished">
                  ۱۴۰۴/۷/۲۶
                </time>
                <span>•</span>
                <span itemProp="author">تیم ترخیصان</span>
                <span>•</span>
                <span>زمان مطالعه: ۲۵ دقیقه</span>
              </div>

              <ArticleImage
                src="/images/blog/bandar-abbas-comprehensive-clearance-guide.webp"
                alt="گمرک شهید رجایی بندرعباس - بزرگترین بندر تجاری ایران"
                caption="نمای بندر شهید رجایی - مرکز اصلی ترخیص کالا در ایران"
                priority
              />
            </header>

            {/* Introduction */}
            <section className="mb-8">
              <p className="text-lg leading-relaxed text-foreground">
                <strong>ترخیص کالا از بندرعباس</strong> یکی از مهم‌ترین فرآیندهای{" "}
                <Link to="/blog/import-export-guide-iran" className="text-accent hover:underline">
                  واردات در ایران
                </Link>{" "}
                است. <strong>گمرک شهید رجایی</strong> به عنوان بزرگترین بندر تجاری کشور، سالانه میلیون‌ها تن کالا را
                پردازش می‌کند. در این راهنمای جامع، تمام مراحل <strong>ترخیص کالا</strong> از صفر تا صد را به صورت
                گام‌به‌گام توضیح می‌دهیم. برای آشنایی با{" "}
                <Link to="/blog/hs-code-guide" className="text-accent hover:underline">
                  کدهای HS
                </Link>{" "}
                و{" "}
                <Link to="/blog/customs-tariff-guide" className="text-accent hover:underline">
                  تعرفه‌های گمرکی
                </Link>
                ، مقالات مرتبط را مطالعه کنید تا واردکنندگان بتوانند با آگاهی کامل اقدام به واردات کنند.
              </p>
            </section>

            {/* Main Content Sections */}

            {/* Section 1: Pre-import Preparations */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-primary" />
                مرحله اول: <strong>آماده‌سازی قبل از واردات</strong>
              </h2>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
                ۱. اخذ <strong>کارت بازرگانی</strong>
              </h3>
              <p className="leading-relaxed mb-4">
                اولین قدم برای <strong>ترخیص کالا از بندرعباس</strong>، داشتن <strong>کارت بازرگانی</strong> معتبر است.
                این کارت از اتاق بازرگانی صادر می‌شود و حاوی کدهای ۱۰ رقمی کالاهای مجاز برای واردات است.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <p className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  مدارک لازم برای دریافت کارت بازرگانی:
                </p>
                <ul className="space-y-2 mr-6">
                  <li>• اساسنامه شرکت</li>
                  <li>• روزنامه رسمی ثبت شرکت</li>
                  <li>• مدارک شناسایی مدیرعامل</li>
                  <li>• گواهی ارزش افزوده</li>
                  <li>• پروانه بهره‌برداری یا جواز کسب</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
                ۲. ثبت‌نام در <strong>سامانه جامع تجارت (NTSW)</strong>
              </h3>
              <p className="leading-relaxed mb-4">
                برای <strong>ترخیص کالا</strong>، ثبت‌نام در{" "}
                <Link to="/blog/ntsw-complete-guide" className="text-primary hover:underline">
                  <strong>سامانه جامع تجارت</strong>
                </Link>{" "}
                الزامی است. این سامانه تمام فرآیندهای ثبت سفارش، صدور مجوز و پیگیری ترخیص را دیجیتالی کرده است.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
                ۳. شناسایی دقیق <strong>کد تعرفه (HS Code)</strong>
              </h3>
              <p className="leading-relaxed mb-4">
                تعیین{" "}
                <Link to="/blog/hs-code-guide" className="text-primary hover:underline">
                  <strong>کد تعرفه صحیح</strong>
                </Link>{" "}
                از مهم‌ترین مراحل است. هر کالا یک کد ۱۰ رقمی دارد که <strong>حقوق گمرکی</strong> و مجوزهای لازم را مشخص
                می‌کند.
              </p>
            </section>

            {/* Section 2: Order Registration */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Ship className="w-6 h-6 text-primary" />
                مرحله دوم: <strong>ثبت سفارش و خرید کالا</strong>
              </h2>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">۱. ثبت سفارش در سامانه جامع تجارت</h3>
              <p className="leading-relaxed mb-4">
                پس از انتخاب کالا و تأمین‌کننده خارجی، باید <strong>ثبت سفارش</strong> انجام شود. این مرحله شامل وارد
                کردن اطلاعات کامل کالا، مبدأ، ارزش و مشخصات حمل است.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <p className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  اطلاعات مورد نیاز در ثبت سفارش:
                </p>
                <ul className="space-y-2 mr-6">
                  <li>• کد HS دقیق کالا</li>
                  <li>• کشور مبدأ و فروشنده</li>
                  <li>• وزن و تعداد کالا</li>
                  <li>• ارزش FOB یا CIF</li>
                  <li>• نوع حمل (دریایی، هوایی، زمینی)</li>
                  <li>• بندر ورودی (بندرعباس)</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">۲. تأمین ارز و انتقال وجه</h3>
              <p className="leading-relaxed mb-4">
                بعد از ثبت سفارش، باید ارز مورد نیاز از طریق <strong>سامانه نیما</strong> یا{" "}
                <strong>صرافی‌های مجاز</strong> تأمین شود.{" "}
                <Link to="/blog/sana-nima-exchange-rate-difference-guide" className="text-primary hover:underline">
                  نرخ ارز سنا و نیما
                </Link>{" "}
                در محاسبات بسیار حائز اهمیت است.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">۳. دریافت مجوزهای لازم</h3>
              <p className="leading-relaxed mb-4">
                برخی کالاها نیاز به <strong>مجوزهای ویژه</strong> دارند (استاندارد، بهداشت، محیط زیست، ارتباطات و...).
                این مجوزها قبل از ورود کالا به <strong>گمرک بندرعباس</strong> باید اخذ شوند.
              </p>
            </section>

            <ArticleImage
              src="/images/blog/cargo-ship-port.webp"
              alt="حمل کالا به بندر شهید رجایی بندرعباس"
              caption="کشتی‌های باری در اسکله بندر شهید رجایی"
            />

            {/* Section 3: Shipping and Arrival */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Package className="w-6 h-6 text-primary" />
                مرحله سوم: <strong>حمل و رسیدن کالا به بندرعباس</strong>
              </h2>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">۱. انتخاب نوع حمل</h3>
              <p className="leading-relaxed mb-4">
                حمل کالا به <strong>بندرعباس</strong> معمولاً از طریق <strong>دریا</strong> انجام می‌شود. حمل دریایی
                اقتصادی‌تر است اما زمان‌برتر. حمل هوایی برای کالاهای فوری و با ارزش مناسب است.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
                ۲. تهیه و ارسال <strong>مدارک حمل</strong>
              </h3>
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <p className="font-semibold mb-2 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  مدارک حمل ضروری:
                </p>
                <ul className="space-y-2 mr-6">
                  <li>
                    • <strong>بارنامه (Bill of Lading)</strong> - سند مالکیت کالا
                  </li>
                  <li>
                    • <strong>پکینگ لیست (Packing List)</strong> - لیست بسته‌بندی
                  </li>
                  <li>
                    • <strong>اینویس (Commercial Invoice)</strong> - فاکتور تجاری
                  </li>
                  <li>
                    • <strong>گواهی مبدأ (Certificate of Origin)</strong>
                  </li>
                  <li>• گواهی‌های استاندارد و کیفیت</li>
                  <li>• بیمه‌نامه (در صورت بیمه کردن)</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
                ۳. ثبت{" "}
                <Link to="/blog/manifest-guide" className="text-primary hover:underline">
                  <strong>مانیفست</strong>
                </Link>{" "}
                در گمرک
              </h3>
              <p className="leading-relaxed mb-4">
                پس از رسیدن کشتی به <strong>بندرعباس</strong>، خط کشتیرانی یا نماینده آن <strong>مانیفست بار</strong> را
                در سامانه گمرک ثبت می‌کند. این سند حاوی لیست تمام محموله‌های روی کشتی است.
              </p>
            </section>

            {/* Section 4: Customs Clearance Process */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-primary" />
                مرحله چهارم: <strong>فرآیند ترخیص در گمرک بندرعباس</strong>
              </h2>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
                ۱. تکمیل و ثبت <strong>اظهارنامه گمرکی</strong>
              </h3>
              <p className="leading-relaxed mb-4">
                <strong>اظهارنامه گمرکی</strong> مهم‌ترین سند در فرآیند <strong>ترخیص کالا از گمرک</strong> است. این سند
                توسط <strong>ترخیصکار گمرکی</strong> یا واردکننده در <strong>سامانه جامع گمرکی</strong> تکمیل می‌شود.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <p className="font-semibold mb-2 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  اطلاعات اظهارنامه:
                </p>
                <ul className="space-y-2 mr-6">
                  <li>• مشخصات کامل واردکننده</li>
                  <li>• مشخصات کالا (نوع، تعداد، وزن)</li>
                  <li>• ارزش گمرکی کالا</li>
                  <li>• کد تعرفه و منشأ کالا</li>
                  <li>• نوع اظهار (قطعی، موقت، ترانزیت)</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">۲. ارزیابی و بازرسی کالا</h3>
              <p className="leading-relaxed mb-4">
                پس از ثبت اظهارنامه، کالا توسط <strong>ارزیاب گمرک</strong> بررسی می‌شود. بازرسی می‌تواند{" "}
                <strong>سبز</strong> (بدون بازرسی فیزیکی)، <strong>زرد</strong> (بررسی اسنادی) یا <strong>قرمز</strong>{" "}
                (بازرسی کامل فیزیکی) باشد.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
                ۳. محاسبه و پرداخت <strong>حقوق و عوارض گمرکی</strong>
              </h3>
              <p className="leading-relaxed mb-4">
                پس از تأیید اظهارنامه،{" "}
                <Link to="/blog/customs-tariff-guide" className="text-primary hover:underline">
                  <strong>حقوق گمرکی</strong>
                </Link>{" "}
                محاسبه می‌شود. این هزینه‌ها شامل حقوق ورودی، سود بازرگانی، مالیات بر ارزش افزوده و عوارض مختلف است.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">۴. ترخیص نهایی و خروج کالا</h3>
              <p className="leading-relaxed mb-4">
                پس از پرداخت تمام هزینه‌ها و تأیید نهایی، <strong>پروانه سبز گمرکی</strong> صادر شده و کالا از{" "}
                <strong>گمرک بندرعباس</strong> خارج می‌شود.
              </p>
            </section>

            {/* Section 5: Costs */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Calculator className="w-6 h-6 text-primary" />
                هزینه‌های ترخیص کالا از بندرعباس
              </h2>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border border-border p-3 text-right">نوع هزینه</th>
                      <th className="border border-border p-3 text-right">توضیحات</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border p-3">
                        <strong>حقوق ورودی</strong>
                      </td>
                      <td className="border border-border p-3">۴ تا ۵۵ درصد ارزش CIF (بسته به کد تعرفه)</td>
                    </tr>
                    <tr className="bg-muted/30">
                      <td className="border border-border p-3">
                        <strong>سود بازرگانی</strong>
                      </td>
                      <td className="border border-border p-3">۱ تا ۱۰ درصد ارزش CIF</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">
                        <strong>مالیات ارزش افزوده</strong>
                      </td>
                      <td className="border border-border p-3">۹ درصد ارزش کالا + حقوق ورودی</td>
                    </tr>
                    <tr className="bg-muted/30">
                      <td className="border border-border p-3">
                        <strong>هزینه انبارداری</strong>
                      </td>
                      <td className="border border-border p-3">روزانه ۵۰,۰۰۰ تا ۵۰۰,۰۰۰ تومان</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">
                        <strong>حق‌الزحمه ترخیصکار</strong>
                      </td>
                      <td className="border border-border p-3">۰.۵ تا ۲ درصد ارزش کالا</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 6: Timeline */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Clock className="w-6 h-6 text-primary" />
                زمان‌بندی فرآیند ترخیص
              </h2>

              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    ۱
                  </div>
                  <div>
                    <p className="font-semibold">ثبت اظهارنامه و بررسی اولیه</p>
                    <p className="text-muted-foreground">۱ تا ۲ روز کاری</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    ۲
                  </div>
                  <div>
                    <p className="font-semibold">ارزیابی و بازرسی کالا</p>
                    <p className="text-muted-foreground">۱ تا ۳ روز کاری</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    ۳
                  </div>
                  <div>
                    <p className="font-semibold">محاسبه و پرداخت حقوق</p>
                    <p className="text-muted-foreground">۱ روز کاری</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    ۴
                  </div>
                  <div>
                    <p className="font-semibold">صدور پروانه و خروج کالا</p>
                    <p className="text-muted-foreground">۱ روز کاری</p>
                  </div>
                </div>
              </div>

              <div className="bg-accent/10 p-4 rounded-lg mt-6">
                <p className="font-semibold text-accent">مجموع زمان تقریبی: ۴ تا ۷ روز کاری</p>
                <p className="text-sm text-muted-foreground mt-2">
                  این زمان‌بندی برای کالاهای معمولی است. کالاهای نیازمند مجوزهای خاص ممکن است زمان بیشتری نیاز داشته
                  باشند.
                </p>
              </div>
            </section>

            {/* Section 7: Tips */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-amber-500" />
                نکات مهم و هشدارها
              </h2>

              <div className="space-y-4">
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                  <p className="font-semibold text-amber-800 mb-2">⚠️ انتخاب ترخیصکار معتبر</p>
                  <p className="text-amber-700">حتماً از ترخیصکارهای دارای کارت معتبر و سابقه استفاده کنید.</p>
                </div>
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                  <p className="font-semibold text-amber-800 mb-2">⚠️ دقت در کد تعرفه</p>
                  <p className="text-amber-700">
                    انتخاب کد تعرفه اشتباه می‌تواند منجر به جریمه سنگین یا توقیف کالا شود.
                  </p>
                </div>
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                  <p className="font-semibold text-amber-800 mb-2">⚠️ زمان‌بندی مناسب</p>
                  <p className="text-amber-700">تأخیر در ترخیص موجب افزایش هزینه انبارداری و دپو می‌شود.</p>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-8 rounded-2xl mb-10">
              <h2 className="text-2xl font-bold mb-4">نیاز به مشاوره تخصصی دارید؟</h2>
              <p className="mb-6 opacity-90">
                تیم متخصص ترخیصان با بیش از ۲۰ سال تجربه در ترخیص کالا از بندرعباس آماده کمک به شماست.
              </p>
              <Button asChild size="lg" variant="secondary">
                <Link to="/#contact">
                  درخواست مشاوره رایگان
                  <ArrowRight className="mr-2 w-5 h-5" />
                </Link>
              </Button>
            </section>
          </article>

          {/* Related Articles */}
          <RelatedArticles currentPostId={20} />

          {/* Back to Blog */}
          <div className="mt-12 text-center">
            <Button asChild variant="outline">
              <Link to="/blog">
                <ArrowRight className="ml-2 w-4 h-4" />
                بازگشت به بلاگ
              </Link>
            </Button>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BandarAbbasComprehensiveGuide;
