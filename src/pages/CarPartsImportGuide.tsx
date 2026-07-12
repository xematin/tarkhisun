import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleBreadcrumb from "@/components/ArticleBreadcrumb";
import RelatedArticles from "@/components/RelatedArticles";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, ArrowRight } from "lucide-react";
import ArticleImage from "@/components/ArticleImage";

const CarPartsImportGuide = () => {
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
        headline: "ترخیص قطعات یدکی خودرو از گمرک | راهنمای کامل واردات قطعات",
        description:
          "راهنمای جامع ترخیص قطعات یدکی خودرو از گمرک: انواع قطعات، مدارک لازم، کد تعرفه HS، حقوق گمرکی، استانداردها، مجوزهای لازم، مراحل واردات و نکات کلیدی خرید و ترخیص",
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
        },
        datePublished: "2025-10-13",
        dateModified: "2025-10-13",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": "https://tarkhisun.com/blog/car-parts-import-customs-clearance-guide",
        },
        keywords:
          "ترخیص قطعات یدکی خودرو، واردات قطعات خودرو، گمرک بندرعباس، قطعات یدکی وارداتی، کد HS قطعات خودرو، حقوق گمرکی قطعات، استاندارد قطعات خودرو، مجوز واردات قطعات، قطعات اصلی خودرو، قطعات بدنه خودرو",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "آیا واردات قطعات یدکی خودرو نیاز به مجوز دارد؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "بله، واردات قطعات یدکی خودرو نیاز به مجوز از وزارت صنعت، معدن و تجارت دارد. همچنین برخی قطعات نیاز به تایید استاندارد و گواهینامه کیفیت از سازمان ملی استاندارد ایران دارند.",
            },
          },
          {
            "@type": "Question",
            name: "حقوق گمرکی قطعات یدکی خودرو چقدر است؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "حقوق گمرکی قطعات یدکی خودرو بسته به نوع قطعه متفاوت است: قطعات موتور ۱۵-۲۵٪، قطعات بدنه ۲۰-۳۰٪، قطعات الکتریکی ۱۵-۲۰٪، و تایر و لاستیک ۲۵-۴۰٪ از ارزش گمرکی کالا.",
            },
          },
          {
            "@type": "Question",
            name: "کد HS قطعات یدکی خودرو چیست؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "کد HS قطعات خودرو بسته به نوع قطعه متفاوت است: موتور (8407-8408)، گیربکس (8708.40)، لنت و دیسک ترمز (8708.30)، تایر (4011)، باتری (8507)، فیلترها (8421) و سایر قطعات بدنه در فصل 8708.",
            },
          },
          {
            "@type": "Question",
            name: "چه مدارکی برای ترخیص قطعات خودرو لازم است؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "مدارک لازم شامل: پروفرما اینویس، بارنامه (Bill of Lading)، پکینگ لیست، سرتیفیکیت مبدا، گواهی کیفیت، کارت بازرگانی، کد اقتصادی، مجوز واردات از وزارت صمت، و استاندارد (در صورت نیاز).",
            },
          },
          {
            "@type": "Question",
            name: "چه قطعاتی نیاز به استاندارد اجباری دارند؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "قطعاتی که نیاز به استاندارد اجباری دارند شامل: تایر و لاستیک، لنت و دیسک ترمز، روغن موتور، باتری، چراغ و سیستم روشنایی، شیشه‌ها، کمربند ایمنی و سیستم‌های ایمنی هستند.",
            },
          },
          {
            "@type": "Question",
            name: "زمان ترخیص قطعات یدکی خودرو چقدر است؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "زمان ترخیص قطعات یدکی خودرو بسته به نوع قطعه و تکمیل مدارک متفاوت است: قطعات استاندارد ۳-۵ روز، قطعات نیازمند استاندارد ۷-۱۰ روز، و قطعات خاص یا نیازمند مجوزهای ویژه ۱۰-۱۵ روز زمان می‌برد.",
            },
          },
        ],
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
            name: "ترخیص قطعات یدکی خودرو از گمرک",
          },
        ],
      },
    ],
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://tarkhisun.com/blog/car-parts-import-customs-clearance-guide" />
        <title>ترخیص قطعات یدکی خودرو از گمرک | راهنمای کامل واردات قطعات</title>
        <meta
          name="description"
          content="راهنمای ترخیص قطعات یدکی خودرو از گمرک: مدارک، کد تعرفه، حقوق گمرکی و استانداردهای واردات"
        />
        <meta
          name="keywords"
          content="ترخیص قطعات یدکی خودرو، واردات قطعات خودرو، گمرک بندرعباس، قطعات یدکی وارداتی، کد HS قطعات خودرو، حقوق گمرکی قطعات، استاندارد قطعات خودرو، مجوز واردات قطعات، قطعات اصلی خودرو، قطعات بدنه خودرو، تایر وارداتی، روغن موتور وارداتی، لنت ترمز وارداتی، باتری خودرو وارداتی، فیلتر خودرو وارداتی"
        />
        
        <meta property="og:title" content="ترخیص قطعات یدکی خودرو از گمرک | راهنمای کامل واردات قطعات" />
        <meta
          property="og:description"
          content="راهنمای جامع ترخیص قطعات یدکی خودرو از گمرک بندرعباس: مدارک، کد HS، حقوق گمرکی، استانداردها و نکات کلیدی"
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://tarkhisun.com/blog/car-parts-import-customs-clearance-guide" />
        <meta property="og:image" content="https://tarkhisun.com/og-image.jpg" />
        <meta property="og:locale" content="fa_IR" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main>
          <article className="py-20">
            <div className="container mx-auto px-4" dir="rtl">
              <div className="max-w-4xl mx-auto">
                {/* Breadcrumb */}
                <nav className="mb-8 text-sm text-muted-foreground text-persian">
                  <Link to="/" className="hover:text-primary transition-colors">
                    خانه
                  </Link>
                  <span className="mx-2">/</span>
                  <Link to="/blog" className="hover:text-primary transition-colors">
                    بلاگ
                  </Link>
                  <span className="mx-2">/</span>
                  <span className="text-foreground">ترخیص قطعات یدکی خودرو از گمرک</span>
                </nav>

                {/* Article Header */}
                <header className="mb-12">
                  <h1 className="heading-primary mb-6 text-persian">
                    <strong>ترخیص قطعات یدکی خودرو از گمرک</strong> | راهنمای کامل واردات قطعات
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground text-persian mb-6">
                    <span>تاریخ انتشار: ۱۴۰۴/۷/۲۳</span>
                    <span>•</span>
                    <span>زمان مطالعه: ۲۲ دقیقه</span>
                    <span>•</span>
                    <span>نویسنده: تیم ترخیصان</span>
                  </div>

                  <p className="text-xl text-muted-foreground leading-relaxed text-persian">
                    راهنمای جامع <strong>ترخیص قطعات یدکی خودرو</strong> از گمرک: انواع قطعات، مدارک لازم، کد تعرفه HS،
                    حقوق گمرکی، استانداردها، مجوزهای لازم، مراحل واردات و نکات کلیدی خرید و ترخیص
                  </p>
                </header>

                {/* Hero Image */}
                <ArticleImage
                  src="/images/blog/car-parts-import-customs-clearance-guide.webp"
                  alt="قطعات یدکی خودرو - موتور، گیربکس و قطعات مکانیکی"
                  caption="انواع قطعات یدکی خودرو قابل واردات از گمرک"
                  priority
                />

                {/* Introduction */}
                <section className="mb-12">
                  <Card className="card-service">
                    <CardContent className="p-8">
                      <p className="text-lg leading-relaxed text-persian mb-4">
                        با توجه به رشد صنعت خودرو در ایران و نیاز روزافزون به <strong>قطعات یدکی باکیفیت</strong>،
                        واردات قطعات خودرو به یکی از حوزه‌های مهم تجاری تبدیل شده است.{" "}
                        <strong>ترخیص قطعات یدکی خودرو</strong> از گمرک نیازمند آگاهی از قوانین، مقررات، استانداردها و
                        فرآیندهای گمرکی است. برای درک بهتر{" "}
                        <Link to="/blog/hs-code-guide" className="text-accent hover:underline">
                          کدهای تعرفه HS
                        </Link>{" "}
                        و{" "}
                        <Link to="/blog/customs-tariff-guide" className="text-accent hover:underline">
                          نحوه محاسبه تعرفه گمرکی
                        </Link>
                        ، مقالات مرتبط را مطالعه کنید.
                      </p>
                      <p className="text-lg leading-relaxed text-persian">
                        در این مقاله جامع، به بررسی کامل <strong>مراحل واردات و ترخیص قطعات یدکی خودرو</strong>، انواع
                        قطعات، مدارک مورد نیاز، کدهای HS، حقوق گمرکی، استانداردهای اجباری، مجوزهای لازم و نکات کلیدی
                        برای موفقیت در این حوزه می‌پردازیم. برای ترخیص از{" "}
                        <Link
                          to="/blog/zero-to-hundred-bandar-abbas-customs-clearance"
                          className="text-accent hover:underline"
                        >
                          گمرک بندرعباس
                        </Link>
                        ، با فرآیندهای این بندر آشنا شوید.
                      </p>
                    </CardContent>
                  </Card>
                </section>

                {/* Main Content */}
                <div className="prose prose-lg max-w-none text-persian">
                  {/* Section 1 */}
                  <section className="mb-12">
                    <h2 className="heading-secondary mb-6">
                      <strong>انواع قطعات یدکی خودرو قابل واردات</strong>
                    </h2>
                    <Card className="card-service mb-6">
                      <CardContent className="p-8">
                        <p className="text-lg leading-relaxed mb-6">
                          <strong>قطعات یدکی خودرو</strong> به دسته‌های مختلفی تقسیم می‌شوند که هر کدام دارای کد HS،
                          حقوق گمرکی و الزامات خاص خود هستند:
                        </p>

                        <div className="space-y-6">
                          <div>
                            <h3 className="text-xl font-bold mb-4 text-primary">
                              <strong>۱. قطعات موتور و سیستم انتقال قدرت</strong>
                            </h3>
                            <ul className="list-disc list-inside space-y-2 mr-6 text-lg leading-relaxed">
                              <li>
                                <strong>موتور کامل</strong>: کد HS 8407-8408
                              </li>
                              <li>
                                <strong>گیربکس و دنده</strong>: کد HS 8708.40
                              </li>
                              <li>
                                <strong>کلاچ و فنر</strong>: کد HS 8708.93
                              </li>
                              <li>
                                <strong>شفت و مفصل</strong>: کد HS 8708.50
                              </li>
                              <li>
                                <strong>سیستم خنک کننده</strong>: رادیاتور، واتر پمپ
                              </li>
                              <li>
                                <strong>سیستم روغن‌رسانی</strong>: پمپ روغن، فیلتر
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h3 className="text-xl font-bold mb-4 text-primary">
                              <strong>۲. قطعات سیستم ترمز و تعلیق</strong>
                            </h3>
                            <ul className="list-disc list-inside space-y-2 mr-6 text-lg leading-relaxed">
                              <li>
                                <strong>لنت و دیسک ترمز</strong>: کد HS 8708.30 (نیازمند استاندارد)
                              </li>
                              <li>
                                <strong>کالیپر ترمز</strong>: سیستم ترمز هیدرولیک
                              </li>
                              <li>
                                <strong>فنر و کمک فنر</strong>: کد HS 8708.80
                              </li>
                              <li>
                                <strong>میل لنگ و پایه موتور</strong>
                              </li>
                              <li>
                                <strong>بلبرینگ و بوش</strong>
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h3 className="text-xl font-bold mb-4 text-primary">
                              <strong>۳. قطعات بدنه و شیشه</strong>
                            </h3>
                            <ul className="list-disc list-inside space-y-2 mr-6 text-lg leading-relaxed">
                              <li>
                                <strong>درب‌ها و گلگیرها</strong>: کد HS 8708.29
                              </li>
                              <li>
                                <strong>کاپوت و صندوق عقب</strong>
                              </li>
                              <li>
                                <strong>سپر جلو و عقب</strong>
                              </li>
                              <li>
                                <strong>شیشه‌های خودرو</strong>: کد HS 7007 (نیازمند استاندارد)
                              </li>
                              <li>
                                <strong>آینه‌ها و لاستیک درب</strong>
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h3 className="text-xl font-bold mb-4 text-primary">
                              <strong>۴. قطعات الکتریکی و الکترونیکی</strong>
                            </h3>
                            <ul className="list-disc list-inside space-y-2 mr-6 text-lg leading-relaxed">
                              <li>
                                <strong>باتری</strong>: کد HS 8507 (نیازمند استاندارد)
                              </li>
                              <li>
                                <strong>چراغ‌ها</strong>: کد HS 8512 (نیازمند استاندارد)
                              </li>
                              <li>
                                <strong>دینام و استارت</strong>
                              </li>
                              <li>
                                <strong>سیستم ABS</strong>
                              </li>
                              <li>
                                <strong>سنسورها و کنترلرها</strong>
                              </li>
                              <li>
                                <strong>سیستم صوتی و مالتی مدیا</strong>
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h3 className="text-xl font-bold mb-4 text-primary">
                              <strong>۵. تایر و لاستیک</strong>
                            </h3>
                            <ul className="list-disc list-inside space-y-2 mr-6 text-lg leading-relaxed">
                              <li>
                                <strong>تایر سواری</strong>: کد HS 4011.10 (استاندارد اجباری)
                              </li>
                              <li>
                                <strong>تایر باری</strong>: کد HS 4011.20
                              </li>
                              <li>
                                <strong>رینگ و چرخ</strong>: کد HS 8708.70
                              </li>
                              <li>
                                <strong>تیوب و والو</strong>
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h3 className="text-xl font-bold mb-4 text-primary">
                              <strong>۶. مواد مصرفی و روانکارها</strong>
                            </h3>
                            <ul className="list-disc list-inside space-y-2 mr-6 text-lg leading-relaxed">
                              <li>
                                <strong>روغن موتور</strong>: کد HS 2710 (نیازمند استاندارد)
                              </li>
                              <li>
                                <strong>فیلترهای هوا و روغن</strong>: کد HS 8421
                              </li>
                              <li>
                                <strong>ضد یخ و شیشه شور</strong>
                              </li>
                              <li>
                                <strong>لنت‌های لاستیکی</strong>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </section>

                  {/* Second Image */}
                  <ArticleImage
                    src="/images/blog/car-parts-warehouse.webp"
                    alt="انبار قطعات یدکی خودرو - لنت ترمز، فیلتر روغن و باتری"
                    caption="انبار قطعات یدکی خودرو وارداتی"
                  />

                  {/* Section 2 */}
                  <section className="mb-12">
                    <h2 className="heading-secondary mb-6">
                      <strong>مدارک مورد نیاز برای ترخیص قطعات یدکی خودرو</strong>
                    </h2>
                    <Card className="card-service mb-6">
                      <CardContent className="p-8">
                        <p className="text-lg leading-relaxed mb-6">
                          برای <strong>ترخیص قطعات یدکی خودرو</strong> از گمرک، مدارک زیر الزامی است:
                        </p>

                        <div className="space-y-6">
                          <div>
                            <h3 className="text-xl font-bold mb-4 text-primary">
                              <strong>مدارک تجاری</strong>
                            </h3>
                            <ul className="list-disc list-inside space-y-2 mr-6 text-lg leading-relaxed">
                              <li>
                                <strong>پروفرما اینویس</strong> (Proforma Invoice): شامل مشخصات کالا، قیمت، تعداد
                              </li>
                              <li>
                                <strong>بارنامه</strong> (Bill of Lading یا AWB): اصلی یا کپی تایید شده
                              </li>
                              <li>
                                <strong>پکینگ لیست</strong> (Packing List): جزئیات بسته‌بندی و وزن
                              </li>
                              <li>
                                <strong>سرتیفیکیت مبدا</strong> (Certificate of Origin): تایید کشور سازنده
                              </li>
                              <li>
                                <strong>اینویس تجاری</strong> (Commercial Invoice): اطلاعات کامل معامله
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h3 className="text-xl font-bold mb-4 text-primary">
                              <strong>مدارک هویتی و تجاری</strong>
                            </h3>
                            <ul className="list-disc list-inside space-y-2 mr-6 text-lg leading-relaxed">
                              <li>
                                <strong>کارت بازرگانی</strong> معتبر با کد فعالیت مرتبط
                              </li>
                              <li>
                                <strong>کد اقتصادی</strong> فعال
                              </li>
                              <li>
                                <strong>شناسه کالا</strong> (IRC) از سامانه جامع تجارت
                              </li>
                              <li>
                                <strong>گواهی ثبت شرکت</strong> یا مجوز کسب و کار
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h3 className="text-xl font-bold mb-4 text-primary">
                              <strong>مجوزها و تاییدیه‌ها</strong>
                            </h3>
                            <ul className="list-disc list-inside space-y-2 mr-6 text-lg leading-relaxed">
                              <li>
                                <strong>مجوز واردات</strong> از وزارت صنعت، معدن و تجارت
                              </li>
                              <li>
                                <strong>گواهینامه استاندارد</strong> (برای قطعات مشمول)
                              </li>
                              <li>
                                <strong>گواهی کیفیت</strong> از شرکت سازنده
                              </li>
                              <li>
                                <strong>کاتالوگ فنی</strong> قطعات
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h3 className="text-xl font-bold mb-4 text-primary">
                              <strong>مدارک اختصاصی بر اساس نوع قطعه</strong>
                            </h3>
                            <ul className="list-disc list-inside space-y-2 mr-6 text-lg leading-relaxed">
                              <li>
                                <strong>تایر</strong>: استاندارد اجباری + گواهی DOT
                              </li>
                              <li>
                                <strong>لنت ترمز</strong>: گواهی استاندارد ایمنی
                              </li>
                              <li>
                                <strong>باتری</strong>: گواهی استاندارد + MSDS
                              </li>
                              <li>
                                <strong>روغن موتور</strong>: گواهی کیفیت API/SAE
                              </li>
                              <li>
                                <strong>قطعات الکترونیکی</strong>: CE Mark یا تاییدیه فنی
                              </li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </section>

                  {/* Section 3 */}
                  <section className="mb-12">
                    <h2 className="heading-secondary mb-6">
                      <strong>کد HS و حقوق گمرکی قطعات یدکی خودرو</strong>
                    </h2>
                    <Card className="card-service mb-6">
                      <CardContent className="p-8">
                        <p className="text-lg leading-relaxed mb-6">
                          <strong>حقوق گمرکی قطعات یدکی خودرو</strong> بسته به نوع قطعه و کد HS متفاوت است:
                        </p>

                        <div className="overflow-x-auto">
                          <table className="w-full text-right border-collapse">
                            <thead>
                              <tr className="bg-secondary/20">
                                <th className="border border-border p-3 text-persian">
                                  <strong>نوع قطعه</strong>
                                </th>
                                <th className="border border-border p-3 text-persian">
                                  <strong>کد HS</strong>
                                </th>
                                <th className="border border-border p-3 text-persian">
                                  <strong>حقوق گمرکی</strong>
                                </th>
                                <th className="border border-border p-3 text-persian">
                                  <strong>استاندارد</strong>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="border border-border p-3 text-persian">موتور کامل</td>
                                <td className="border border-border p-3 text-persian">8407-8408</td>
                                <td className="border border-border p-3 text-persian">۱۵-۲۵٪</td>
                                <td className="border border-border p-3 text-persian">اختیاری</td>
                              </tr>
                              <tr>
                                <td className="border border-border p-3 text-persian">گیربکس</td>
                                <td className="border border-border p-3 text-persian">8708.40</td>
                                <td className="border border-border p-3 text-persian">۲۰٪</td>
                                <td className="border border-border p-3 text-persian">اختیاری</td>
                              </tr>
                              <tr>
                                <td className="border border-border p-3 text-persian">لنت و دیسک ترمز</td>
                                <td className="border border-border p-3 text-persian">8708.30</td>
                                <td className="border border-border p-3 text-persian">۲۵٪</td>
                                <td className="border border-border p-3 text-persian">اجباری</td>
                              </tr>
                              <tr>
                                <td className="border border-border p-3 text-persian">تایر سواری</td>
                                <td className="border border-border p-3 text-persian">4011.10</td>
                                <td className="border border-border p-3 text-persian">۳۰-۴۰٪</td>
                                <td className="border border-border p-3 text-persian">اجباری</td>
                              </tr>
                              <tr>
                                <td className="border border-border p-3 text-persian">باتری</td>
                                <td className="border border-border p-3 text-persian">8507</td>
                                <td className="border border-border p-3 text-persian">۲۰٪</td>
                                <td className="border border-border p-3 text-persian">اجباری</td>
                              </tr>
                              <tr>
                                <td className="border border-border p-3 text-persian">چراغ‌ها</td>
                                <td className="border border-border p-3 text-persian">8512</td>
                                <td className="border border-border p-3 text-persian">۲۰٪</td>
                                <td className="border border-border p-3 text-persian">اجباری</td>
                              </tr>
                              <tr>
                                <td className="border border-border p-3 text-persian">فنر و کمک فنر</td>
                                <td className="border border-border p-3 text-persian">8708.80</td>
                                <td className="border border-border p-3 text-persian">۲۰٪</td>
                                <td className="border border-border p-3 text-persian">اختیاری</td>
                              </tr>
                              <tr>
                                <td className="border border-border p-3 text-persian">شیشه خودرو</td>
                                <td className="border border-border p-3 text-persian">7007</td>
                                <td className="border border-border p-3 text-persian">۲۵٪</td>
                                <td className="border border-border p-3 text-persian">اجباری</td>
                              </tr>
                              <tr>
                                <td className="border border-border p-3 text-persian">روغن موتور</td>
                                <td className="border border-border p-3 text-persian">2710</td>
                                <td className="border border-border p-3 text-persian">۱۵٪</td>
                                <td className="border border-border p-3 text-persian">اجباری</td>
                              </tr>
                              <tr>
                                <td className="border border-border p-3 text-persian">فیلترها</td>
                                <td className="border border-border p-3 text-persian">8421</td>
                                <td className="border border-border p-3 text-persian">۱۵٪</td>
                                <td className="border border-border p-3 text-persian">اختیاری</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="mt-6 p-6 bg-accent/10 rounded-lg">
                          <h3 className="text-xl font-bold mb-4 text-primary">
                            <strong>نکته مهم:</strong>
                          </h3>
                          <p className="text-lg leading-relaxed">
                            علاوه بر <strong>حقوق گمرکی</strong>، باید{" "}
                            <strong>سود بازرگانی ۴٪، ارزش افزوده ۹٪ و سایر عوارض</strong> را نیز در نظر بگیرید. در مجموع
                            هزینه‌های گمرکی می‌تواند به <strong>۴۰-۶۰٪ ارزش کالا</strong> برسد.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </section>

                  {/* Section 4 */}
                  <section className="mb-12">
                    <h2 className="heading-secondary mb-6">
                      <strong>استانداردهای اجباری قطعات یدکی خودرو</strong>
                    </h2>
                    <Card className="card-service mb-6">
                      <CardContent className="p-8">
                        <p className="text-lg leading-relaxed mb-6">
                          برخی از <strong>قطعات یدکی خودرو</strong> مشمول <strong>استانداردهای اجباری</strong> هستند و
                          بدون اخذ گواهینامه استاندارد قابل ترخیص نیستند:
                        </p>

                        <div className="space-y-6">
                          <div>
                            <h3 className="text-xl font-bold mb-4 text-primary">
                              <strong>قطعات نیازمند استاندارد اجباری:</strong>
                            </h3>
                            <ul className="list-disc list-inside space-y-3 mr-6 text-lg leading-relaxed">
                              <li>
                                <strong>تایر و لاستیک</strong>: استاندارد ملی ایران شماره ۱۰۲۷
                              </li>
                              <li>
                                <strong>لنت و دیسک ترمز</strong>: استاندارد ایمنی ترمز
                              </li>
                              <li>
                                <strong>باتری خودرو</strong>: استاندارد ملی ایران شماره ۱۴۴۵
                              </li>
                              <li>
                                <strong>چراغ و سیستم روشنایی</strong>: استاندارد ECE R112
                              </li>
                              <li>
                                <strong>شیشه‌های خودرو</strong>: استاندارد ایمنی شیشه
                              </li>
                              <li>
                                <strong>روغن موتور</strong>: استاندارد API یا SAE
                              </li>
                              <li>
                                <strong>کمربند ایمنی</strong>: استاندارد ایمنی سرنشین
                              </li>
                              <li>
                                <strong>سیستم‌های ایمنی</strong> (ABS, Airbag): استانداردهای ایمنی اروپا
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h3 className="text-xl font-bold mb-4 text-primary">
                              <strong>مراحل اخذ استاندارد:</strong>
                            </h3>
                            <ol className="list-decimal list-inside space-y-3 mr-6 text-lg leading-relaxed">
                              <li>
                                ثبت درخواست در <strong>سامانه استاندارد ایران</strong>
                              </li>
                              <li>
                                ارسال <strong>کاتالوگ فنی و گواهی کیفیت</strong> از شرکت سازنده
                              </li>
                              <li>
                                بررسی مدارک توسط <strong>سازمان ملی استاندارد</strong>
                              </li>
                              <li>
                                نمونه‌برداری و <strong>آزمایش‌های آزمایشگاهی</strong> (در صورت نیاز)
                              </li>
                              <li>
                                صدور <strong>گواهینامه استاندارد</strong> (معمولاً ۷-۱۵ روز کاری)
                              </li>
                            </ol>
                          </div>

                          <div className="p-6 bg-accent/10 rounded-lg">
                            <h3 className="text-xl font-bold mb-4 text-primary">
                              <strong>هزینه استاندارد:</strong>
                            </h3>
                            <p className="text-lg leading-relaxed">
                              هزینه اخذ استاندارد بسته به نوع قطعه و ارزش محموله متغیر است و معمولاً بین{" "}
                              <strong>۵ تا ۱۵ میلیون تومان</strong> است. برای محموله‌های بزرگ، هزینه بیشتری محاسبه
                              می‌شود.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </section>

                  {/* Section 5 */}
                  <section className="mb-12">
                    <h2 className="heading-secondary mb-6">
                      <strong>مراحل واردات و ترخیص قطعات یدکی خودرو</strong>
                    </h2>
                    <Card className="card-service mb-6">
                      <CardContent className="p-8">
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-xl font-bold mb-4 text-primary">
                              <strong>مرحله ۱: تحقیق و انتخاب تامین‌کننده</strong>
                            </h3>
                            <ul className="list-disc list-inside space-y-2 mr-6 text-lg leading-relaxed">
                              <li>
                                شناسایی <strong>تامین‌کنندگان معتبر</strong> قطعات اصلی
                              </li>
                              <li>
                                بررسی <strong>گواهینامه‌های کیفیت</strong> (ISO، CE)
                              </li>
                              <li>مقایسه قیمت‌ها و شرایط پرداخت</li>
                              <li>
                                درخواست <strong>کاتالوگ فنی و نمونه</strong>
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h3 className="text-xl font-bold mb-4 text-primary">
                              <strong>مرحله ۲: بررسی مجوزها و کد HS</strong>
                            </h3>
                            <ul className="list-disc list-inside space-y-2 mr-6 text-lg leading-relaxed">
                              <li>
                                تعیین <strong>کد HS دقیق</strong> قطعات
                              </li>
                              <li>
                                بررسی نیاز به <strong>مجوز واردات</strong> از وزارت صمت
                              </li>
                              <li>
                                چک کردن الزام <strong>استاندارد اجباری</strong>
                              </li>
                              <li>
                                محاسبه <strong>حقوق گمرکی</strong> و هزینه‌های وارداتی
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h3 className="text-xl font-bold mb-4 text-primary">
                              <strong>مرحله ۳: ثبت سفارش</strong>
                            </h3>
                            <ul className="list-disc list-inside space-y-2 mr-6 text-lg leading-relaxed">
                              <li>
                                دریافت <strong>پروفرما اینویس</strong> از فروشنده
                              </li>
                              <li>
                                ثبت سفارش در <strong>سامانه جامع تجارت</strong> (TPO)
                              </li>
                              <li>
                                دریافت <strong>شناسه کالا (IRC)</strong>
                              </li>
                              <li>تخصیص ارز (ارز نیمایی یا سنا)</li>
                            </ul>
                          </div>

                          <div>
                            <h3 className="text-xl font-bold mb-4 text-primary">
                              <strong>مرحله ۴: حمل و ارسال کالا</strong>
                            </h3>
                            <ul className="list-disc list-inside space-y-2 mr-6 text-lg leading-relaxed">
                              <li>
                                انتخاب <strong>روش حمل</strong> (دریایی، هوایی، زمینی)
                              </li>
                              <li>بیمه کردن محموله</li>
                              <li>
                                پیگیری <strong>بارنامه و tracking</strong>
                              </li>
                              <li>دریافت اطلاعات ورود محموله</li>
                            </ul>
                          </div>

                          <div>
                            <h3 className="text-xl font-bold mb-4 text-primary">
                              <strong>مرحله ۵: اخذ استاندارد (در صورت نیاز)</strong>
                            </h3>
                            <ul className="list-disc list-inside space-y-2 mr-6 text-lg leading-relaxed">
                              <li>
                                ثبت درخواست در <strong>سازمان استاندارد</strong>
                              </li>
                              <li>ارسال مدارک فنی و گواهی‌های کیفیت</li>
                              <li>انجام آزمایش‌های لازم</li>
                              <li>
                                دریافت <strong>گواهینامه استاندارد</strong>
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h3 className="text-xl font-bold mb-4 text-primary">
                              <strong>مرحله ۶: اظهار گمرکی و ترخیص</strong>
                            </h3>
                            <ul className="list-disc list-inside space-y-2 mr-6 text-lg leading-relaxed">
                              <li>
                                ثبت <strong>اظهارنامه گمرکی</strong> در سامانه جامع گمرکی
                              </li>
                              <li>
                                بارگذاری مدارک در <strong>سامانه EPL</strong>
                              </li>
                              <li>
                                پرداخت <strong>حقوق و عوارض گمرکی</strong>
                              </li>
                              <li>معاینه فیزیکی کالا (در صورت نیاز)</li>
                              <li>
                                صدور <strong>برگ سبز ترخیص</strong>
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h3 className="text-xl font-bold mb-4 text-primary">
                              <strong>مرحله ۷: تحویل کالا</strong>
                            </h3>
                            <ul className="list-disc list-inside space-y-2 mr-6 text-lg leading-relaxed">
                              <li>
                                تحویل کالا از <strong>انبار گمرکی</strong>
                              </li>
                              <li>حمل به انبار نهایی</li>
                              <li>بررسی کیفیت و تطابق با سفارش</li>
                              <li>ارسال به مشتریان نهایی</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </section>

                  {/* Section 6 */}
                  <section className="mb-12">
                    <h2 className="heading-secondary mb-6">
                      <strong>هزینه‌های ترخیص قطعات یدکی خودرو</strong>
                    </h2>
                    <Card className="card-service mb-6">
                      <CardContent className="p-8">
                        <p className="text-lg leading-relaxed mb-6">
                          <strong>هزینه‌های کل واردات</strong> قطعات یدکی خودرو شامل موارد زیر است:
                        </p>

                        <div className="space-y-6">
                          <div>
                            <h3 className="text-xl font-bold mb-4 text-primary">
                              <strong>هزینه‌های گمرکی:</strong>
                            </h3>
                            <ul className="list-disc list-inside space-y-2 mr-6 text-lg leading-relaxed">
                              <li>
                                <strong>حقوق ورودی گمرک</strong>: ۱۵-۴۰٪ بسته به نوع قطعه
                              </li>
                              <li>
                                <strong>سود بازرگانی</strong>: ۴٪ ارزش گمرکی
                              </li>
                              <li>
                                <strong>ارزش افزوده (VAT)</strong>: ۹٪
                              </li>
                              <li>
                                <strong>عوارض خدمات گمرکی</strong>: حدود ۱٪
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h3 className="text-xl font-bold mb-4 text-primary">
                              <strong>هزینه‌های حمل و بیمه:</strong>
                            </h3>
                            <ul className="list-disc list-inside space-y-2 mr-6 text-lg leading-relaxed">
                              <li>
                                <strong>حمل دریایی</strong>: ۵۰۰-۱۵۰۰ دلار به ازای هر تن (بسته به مقصد)
                              </li>
                              <li>
                                <strong>حمل هوایی</strong>: ۳-۸ دلار به ازای هر کیلوگرم
                              </li>
                              <li>
                                <strong>بیمه محموله</strong>: ۰.۵-۱٪ ارزش کالا
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h3 className="text-xl font-bold mb-4 text-primary">
                              <strong>هزینه‌های جانبی:</strong>
                            </h3>
                            <ul className="list-disc list-inside space-y-2 mr-6 text-lg leading-relaxed">
                              <li>
                                <strong>استاندارد</strong>: ۵-۱۵ میلیون تومان (در صورت نیاز)
                              </li>
                              <li>
                                <strong>حق‌الوکاله ترخیصکار</strong>: ۱۰-۳۰ میلیون تومان
                              </li>
                              <li>
                                <strong>انبارداری</strong>: ۵۰۰ هزار تا ۲ میلیون تومان
                              </li>
                              <li>
                                <strong>حمل داخلی</strong>: بسته به مسافت
                              </li>
                            </ul>
                          </div>

                          <div className="p-6 bg-accent/10 rounded-lg">
                            <h3 className="text-xl font-bold mb-4 text-primary">
                              <strong>مثال محاسبه هزینه:</strong>
                            </h3>
                            <p className="text-lg leading-relaxed mb-4">برای یک محموله ۱۰۰۰۰ دلاری قطعات موتور:</p>
                            <ul className="list-disc list-inside space-y-2 mr-6 text-lg leading-relaxed">
                              <li>حقوق گمرکی (۲۰٪): ۲۰۰۰ دلار</li>
                              <li>سود بازرگانی (۴٪): ۴۰۰ دلار</li>
                              <li>ارزش افزوده (۹٪): ۹۰۰ دلار</li>
                              <li>حمل و بیمه: ۱۵۰۰ دلار</li>
                              <li>سایر هزینه‌ها: ۱۰۰۰ دلار</li>
                              <li>
                                <strong>جمع کل هزینه‌ها: حدود ۱۵۸۰۰ دلار</strong>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </section>

                  {/* Section 7 */}
                  <section className="mb-12">
                    <h2 className="heading-secondary mb-6">
                      <strong>نکات کلیدی و توصیه‌های مهم</strong>
                    </h2>
                    <Card className="card-service mb-6">
                      <CardContent className="p-8">
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-xl font-bold mb-4 text-primary">
                              <strong>۱. انتخاب تامین‌کننده مناسب</strong>
                            </h3>
                            <ul className="list-disc list-inside space-y-2 mr-6 text-lg leading-relaxed">
                              <li>
                                ترجیحاً از <strong>برندهای معتبر و اصلی</strong> خریداری کنید
                              </li>
                              <li>قطعات تقلبی مشکلات قانونی ایجاد می‌کنند</li>
                              <li>گواهینامه‌های کیفیت را بررسی کنید</li>
                              <li>از تامین‌کنندگانی که سابقه صادرات به ایران دارند استفاده کنید</li>
                            </ul>
                          </div>

                          <div>
                            <h3 className="text-xl font-bold mb-4 text-primary">
                              <strong>۲. دقت در کد HS و تعرفه</strong>
                            </h3>
                            <ul className="list-disc list-inside space-y-2 mr-6 text-lg leading-relaxed">
                              <li>
                                <strong>کد HS دقیق</strong> را قبل از ثبت سفارش مشخص کنید
                              </li>
                              <li>کد اشتباه می‌تواند منجر به جریمه سنگین شود</li>
                              <li>از مشاور تعرفه گمرکی استفاده کنید</li>
                              <li>تغییرات تعرفه‌ای را پیگیری کنید</li>
                            </ul>
                          </div>

                          <div>
                            <h3 className="text-xl font-bold mb-4 text-primary">
                              <strong>۳. استاندارد و کیفیت</strong>
                            </h3>
                            <ul className="list-disc list-inside space-y-2 mr-6 text-lg leading-relaxed">
                              <li>
                                قبل از خرید، الزامات <strong>استاندارد اجباری</strong> را بررسی کنید
                              </li>
                              <li>گواهی‌های کیفیت بین‌المللی (ISO، CE) را درخواست کنید</li>
                              <li>زمان اخذ استاندارد را در برنامه‌ریزی لحاظ کنید</li>
                              <li>برای قطعات ایمنی، استاندارد اجباری است</li>
                            </ul>
                          </div>

                          <div>
                            <h3 className="text-xl font-bold mb-4 text-primary">
                              <strong>۴. بسته‌بندی و برچسب‌گذاری</strong>
                            </h3>
                            <ul className="list-disc list-inside space-y-2 mr-6 text-lg leading-relaxed">
                              <li>
                                قطعات باید <strong>بسته‌بندی استاندارد</strong> داشته باشند
                              </li>
                              <li>برچسب‌ها باید شامل اطلاعات کامل (سازنده، کشور سازنده، مدل) باشند</li>
                              <li>قطعات شکستنی نیاز به بسته‌بندی ویژه دارند</li>
                              <li>مواد خطرناک (باتری، روغن) قوانین خاص دارند</li>
                            </ul>
                          </div>

                          <div>
                            <h3 className="text-xl font-bold mb-4 text-primary">
                              <strong>۵. مدیریت زمان</strong>
                            </h3>
                            <ul className="list-disc list-inside space-y-2 mr-6 text-lg leading-relaxed">
                              <li>
                                زمان کل واردات: <strong>۳۰-۶۰ روز</strong> (بسته به روش حمل)
                              </li>
                              <li>استاندارد: ۷-۱۵ روز اضافه</li>
                              <li>تاخیرات احتمالی گمرکی را در نظر بگیرید</li>
                              <li>برای قطعات پرفروش، موجودی ایمنی داشته باشید</li>
                            </ul>
                          </div>

                          <div>
                            <h3 className="text-xl font-bold mb-4 text-primary">
                              <strong>۶. ریسک‌های رایج و راه‌حل‌ها</strong>
                            </h3>
                            <ul className="list-disc list-inside space-y-2 mr-6 text-lg leading-relaxed">
                              <li>
                                <strong>ریسک قیمت ارز</strong>: از ابزارهای پوشش ریسک استفاده کنید
                              </li>
                              <li>
                                <strong>ریسک کیفیت</strong>: قبل از پرداخت، نمونه بگیرید
                              </li>
                              <li>
                                <strong>ریسک تاخیر</strong>: با تامین‌کنندگان مطمئن کار کنید
                              </li>
                              <li>
                                <strong>ریسک قانونی</strong>: از ترخیصکار مجرب استفاده کنید
                              </li>
                            </ul>
                          </div>

                          <div className="p-6 bg-accent/10 rounded-lg">
                            <h3 className="text-xl font-bold mb-4 text-primary">
                              <strong>توصیه مهم:</strong>
                            </h3>
                            <p className="text-lg leading-relaxed">
                              برای اولین بار واردات، حتماً از <strong>مشاور گمرکی یا ترخیصکار باتجربه</strong> استفاده
                              کنید. اشتباهات در واردات قطعات خودرو می‌تواند بسیار پرهزینه باشد و باعث توقیف کالا یا
                              جریمه‌های سنگین شود.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </section>

                  {/* FAQs */}
                  <section className="mb-12">
                    <h2 className="heading-secondary mb-6">
                      <strong>سوالات متداول</strong>
                    </h2>
                    <Card className="card-service mb-6">
                      <CardContent className="p-8">
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-xl font-bold mb-3 text-primary">
                              <strong>آیا واردات قطعات یدکی خودرو نیاز به مجوز دارد؟</strong>
                            </h3>
                            <p className="text-lg leading-relaxed mr-6">
                              بله، <strong>واردات قطعات یدکی خودرو</strong> نیاز به مجوز از وزارت صنعت، معدن و تجارت
                              دارد. همچنین برخی قطعات نیاز به تایید استاندارد و گواهینامه کیفیت از سازمان ملی استاندارد
                              ایران دارند.
                            </p>
                          </div>

                          <div>
                            <h3 className="text-xl font-bold mb-3 text-primary">
                              <strong>حقوق گمرکی قطعات یدکی خودرو چقدر است؟</strong>
                            </h3>
                            <p className="text-lg leading-relaxed mr-6">
                              <strong>حقوق گمرکی</strong> بسته به نوع قطعه متفاوت است: قطعات موتور ۱۵-۲۵٪، قطعات بدنه
                              ۲۰-۳۰٪، قطعات الکتریکی ۱۵-۲۰٪، و تایر و لاستیک ۲۵-۴۰٪ از ارزش گمرکی کالا.
                            </p>
                          </div>

                          <div>
                            <h3 className="text-xl font-bold mb-3 text-primary">
                              <strong>کد HS قطعات یدکی خودرو چیست؟</strong>
                            </h3>
                            <p className="text-lg leading-relaxed mr-6">
                              کد HS قطعات خودرو بسته به نوع قطعه متفاوت است: موتور (8407-8408)، گیربکس (8708.40)، لنت و
                              دیسک ترمز (8708.30)، تایر (4011)، باتری (8507)، فیلترها (8421) و سایر قطعات بدنه در فصل
                              8708.
                            </p>
                          </div>

                          <div>
                            <h3 className="text-xl font-bold mb-3 text-primary">
                              <strong>چه مدارکی برای ترخیص قطعات خودرو لازم است؟</strong>
                            </h3>
                            <p className="text-lg leading-relaxed mr-6">
                              مدارک لازم شامل:{" "}
                              <strong>
                                پروفرما اینویس، بارنامه، پکینگ لیست، سرتیفیکیت مبدا، گواهی کیفیت، کارت بازرگانی، کد
                                اقتصادی، مجوز واردات از وزارت صمت، و استاندارد
                              </strong>{" "}
                              (در صورت نیاز).
                            </p>
                          </div>

                          <div>
                            <h3 className="text-xl font-bold mb-3 text-primary">
                              <strong>چه قطعاتی نیاز به استاندارد اجباری دارند؟</strong>
                            </h3>
                            <p className="text-lg leading-relaxed mr-6">
                              قطعاتی که نیاز به استاندارد اجباری دارند شامل:{" "}
                              <strong>
                                تایر و لاستیک، لنت و دیسک ترمز، روغن موتور، باتری، چراغ و سیستم روشنایی، شیشه‌ها، کمربند
                                ایمنی و سیستم‌های ایمنی
                              </strong>{" "}
                              هستند.
                            </p>
                          </div>

                          <div>
                            <h3 className="text-xl font-bold mb-3 text-primary">
                              <strong>زمان ترخیص قطعات یدکی خودرو چقدر است؟</strong>
                            </h3>
                            <p className="text-lg leading-relaxed mr-6">
                              زمان ترخیص بسته به نوع قطعه و تکمیل مدارک متفاوت است: قطعات استاندارد{" "}
                              <strong>۳-۵ روز</strong>، قطعات نیازمند استاندارد <strong>۷-۱۰ روز</strong>، و قطعات خاص
                              یا نیازمند مجوزهای ویژه <strong>۱۰-۱۵ روز</strong> زمان می‌برد.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </section>

                  {/* Conclusion */}
                  <section className="mb-12">
                    <h2 className="heading-secondary mb-6">
                      <strong>جمع‌بندی</strong>
                    </h2>
                    <Card className="card-service">
                      <CardContent className="p-8">
                        <p className="text-lg leading-relaxed mb-4">
                          <strong>واردات و ترخیص قطعات یدکی خودرو</strong> از گمرک فرآیندی است که نیازمند دانش تخصصی،
                          تجربه و دقت بالا است. با رعایت نکات ذکر شده در این راهنما، درک صحیح از مقررات گمرکی،
                          استانداردها و اخذ مجوزهای لازم، می‌توانید واردات موفقی داشته باشید.
                        </p>
                        <p className="text-lg leading-relaxed mb-4">نکات کلیدی که باید به خاطر بسپارید:</p>
                        <ul className="list-disc list-inside space-y-2 mr-6 text-lg leading-relaxed mb-6">
                          <li>
                            از <strong>تامین‌کنندگان معتبر و برندهای اصلی</strong> خریداری کنید
                          </li>
                          <li>
                            <strong>کد HS دقیق</strong> را قبل از ثبت سفارش مشخص کنید
                          </li>
                          <li>
                            الزامات <strong>استاندارد اجباری</strong> را بررسی و رعایت کنید
                          </li>
                          <li>
                            تمام <strong>هزینه‌های گمرکی و جانبی</strong> را محاسبه کنید
                          </li>
                          <li>
                            از <strong>ترخیصکار باتجربه</strong> استفاده کنید
                          </li>
                          <li>
                            <strong>زمان کافی</strong> برای فرآیند واردات در نظر بگیرید
                          </li>
                        </ul>
                        <p className="text-lg leading-relaxed">
                          با مطالعه این راهنما و مشورت با متخصصان، می‌توانید <strong>واردات قطعات یدکی خودرو</strong> را
                          با موفقیت انجام دهید و از مشکلات احتمالی جلوگیری کنید.
                        </p>
                      </CardContent>
                    </Card>
                  </section>

                  {/* CTA Section */}
                  <section className="mb-12">
                    <Card className="card-service bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
                      <CardContent className="p-8 text-center">
                        <h2 className="heading-secondary mb-4 text-persian">
                          <strong>نیاز به مشاوره تخصصی دارید؟</strong>
                        </h2>
                        <p className="text-xl text-muted-foreground mb-8 text-persian">
                          تیم ترخیصان با سال‌ها تجربه در ترخیص قطعات یدکی خودرو، آماده ارائه مشاوره و خدمات تخصصی به
                          شماست
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                          <Button size="lg" className="gap-2 text-persian" asChild>
                            <Link to="/#contact">
                              <Phone className="w-5 h-5" />
                              تماس با ما
                            </Link>
                          </Button>
                          <Button size="lg" variant="outline" className="gap-2 text-persian" asChild>
                            <a href="mailto:info@tarkhisan.com">
                              <Mail className="w-5 h-5" />
                              ارسال ایمیل
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </section>

                  {/* Back to Blog */}
                  <div className="text-center">
                    <Button variant="outline" size="lg" className="gap-2 text-persian" asChild>
                      <Link to="/blog">
                        <ArrowRight className="w-5 h-5" />
                        بازگشت به بلاگ
                      </Link>
                    </Button>
                  </div>
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

export default CarPartsImportGuide;
