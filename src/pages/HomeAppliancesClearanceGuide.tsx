import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleBreadcrumb from "@/components/ArticleBreadcrumb";
import RelatedArticles from "@/components/RelatedArticles";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, CheckCircle2, AlertCircle, FileText, Package, Shield, DollarSign } from "lucide-react";
import ArticleImage from "@/components/ArticleImage";

const HomeAppliancesClearanceGuide = () => {
  const description =
    "راهنمای ترخیص لوازم خانگی از گمرک بندرعباس: مدارک، تعرفه، حقوق گمرکی و مجوزهای واردات یخچال، تلویزیون و ماشین لباسشویی";
  const keywordsContent =
    "ترخیص لوازم خانگی, گمرک بندرعباس, واردات لوازم خانگی, ترخیص یخچال از گمرک, ترخیص تلویزیون از گمرک, ترخیص ماشین لباسشویی, حقوق گمرکی لوازم خانگی, کد تعرفه لوازم خانگی, استاندارد لوازم خانگی, مجوز واردات لوازم خانگی, ترخیص ظرفشویی, ترخیص اجاق گاز, شهید رجایی بندرعباس, مدارک ترخیص لوازم خانگی, هزینه ترخیص لوازم خانگی";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "ترخیص لوازم خانگی از گمرک بندرعباس | راهنمای کامل واردات",
    description: description,
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
    datePublished: "2025-11-17",
    dateModified: "2025-11-17",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://tarkhisun.com/blog/home-appliances-clearance-bandar-abbas-guide",
    },
    keywords: keywordsContent,
  };

  useEffect(() => {
    // Set RTL direction for Persian content
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "fa");
  }, []);

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://tarkhisun.com/blog/home-appliances-clearance-bandar-abbas-guide" />
        <title>
          ترخیص لوازم خانگی از گمرک بندرعباس | راهنمای کامل واردات یخچال، تلویزیون، ماشین لباسشویی | ترخیصان
        </title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywordsContent} />
        <meta name="author" content="تیم ترخیصان" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="ترخیص لوازم خانگی از گمرک بندرعباس | راهنمای کامل واردات | ترخیصان" />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://tarkhisun.com/blog/home-appliances-clearance-bandar-abbas-guide" />
        <meta property="og:image" content="https://tarkhisun.com/og-image.jpg" />
        <meta property="og:locale" content="fa_IR" />
        <meta property="og:site_name" content="ترخیصان" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ترخیص لوازم خانگی از گمرک بندرعباس | راهنمای کامل واردات | ترخیصان" />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://tarkhisun.com/og-image.jpg" />

        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main>
          <article className="py-12">
            <div className="container mx-auto px-4" dir="rtl">
              <div className="max-w-4xl mx-auto">
                {/* Breadcrumb */}
                <ArticleBreadcrumb category="راهنمای ترخیص" articleTitle="ترخیص لوازم خانگی از گمرک بندرعباس" />

                {/* Article Header */}
                <header className="mb-8">
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-persian leading-relaxed">
                    <strong>ترخیص لوازم خانگی از گمرک بندرعباس</strong> | راهنمای کامل واردات
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                    <span className="flex items-center gap-1">
                      <Package className="w-4 h-4" />
                      راهنمای ترخیص
                    </span>
                    <span>•</span>
                    <span>۱۴۰۴/۸/۲۷</span>
                    <span>•</span>
                    <span>۲۰ دقیقه مطالعه</span>
                    <span>•</span>
                    <span>نویسنده: تیم ترخیصان</span>
                  </div>

                  <p className="text-xl text-muted-foreground leading-relaxed text-persian">
                    راهنمای جامع و تخصصی <strong>ترخیص لوازم خانگی از گمرک بندرعباس شهید رجایی</strong>: شامل انواع
                    لوازم خانگی قابل واردات، مدارک ضروری، کدهای تعرفه، محاسبه دقیق حقوق و عوارض گمرکی، استانداردهای ملی،
                    مجوزهای لازم و نکات کلیدی برای واردات یخچال، تلویزیون، ماشین لباسشویی و سایر لوازم خانگی
                  </p>
                </header>

                {/* Quick Contact CTA */}
                <div className="bg-accent/10 border-r-4 border-accent rounded-lg p-6 mb-8">
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2 text-persian">
                        نیاز به مشاوره تخصصی ترخیص لوازم خانگی دارید؟
                      </h3>
                      <p className="text-muted-foreground mb-4 text-persian">
                        کارشناسان ترخیصان با بیش از ۱۰ سال تجربه در ترخیص لوازم خانگی، آماده ارائه مشاوره رایگان و انجام
                        کلیه مراحل ترخیص کالای شما هستند
                      </p>
                      <a href="tel:+989177380080">
                        <Button className="bg-accent hover:bg-accent/90 text-persian">
                          <Phone className="ml-2 h-4 w-4" />
                          تماس با کارشناس: ۰۹۱۷۷۳۸۰۰۸۰
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Hero Image */}
                <ArticleImage
                  src="/images/blog/home-appliances-clearance-bandar-abbas-guide.webp"
                  alt="ترخیص لوازم خانگی از گمرک بندرعباس - کانتینر حاوی یخچال، ماشین لباسشویی و تلویزیون"
                  caption="ترخیص لوازم خانگی از گمرک شهید رجایی بندرعباس"
                  priority
                />

                {/* Article Content */}
                <div className="prose prose-lg max-w-none text-foreground">
                  {/* مقدمه */}
                  <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 text-persian text-foreground">
                      <strong>مقدمه: اهمیت ترخیص اصولی لوازم خانگی</strong>
                    </h2>
                    <p className="text-lg leading-relaxed mb-4 text-muted-foreground text-persian">
                      <strong>واردات و ترخیص لوازم خانگی از گمرک بندرعباس</strong> یکی از پرتقاضاترین خدمات ترخیص کالا
                      در این بندر است. با توجه به تنوع بالای لوازم خانگی (یخچال، تلویزیون، ماشین لباسشویی، ظرفشویی، اجاق
                      گاز، کولر، جاروبرقی و...) و پیچیدگی‌های مربوط به استانداردها، مجوزها و{" "}
                      <Link to="/blog/customs-tariff-guide" className="text-accent hover:underline">
                        تعرفه‌های گمرکی
                      </Link>
                      ، آگاهی از فرآیند ترخیص اصولی این کالاها بسیار ضروری است.
                    </p>
                    <p className="text-lg leading-relaxed mb-4 text-muted-foreground text-persian">
                      در این راهنمای جامع، تمامی جوانب ترخیص لوازم خانگی از <strong>گمرک بندرعباس شهید رجایی</strong> را
                      بررسی می‌کنیم. برای درک بهتر فرآیند، آشنایی با{" "}
                      <Link to="/blog/hs-code-guide" className="text-accent hover:underline">
                        کد HS کالا
                      </Link>{" "}
                      و نحوه{" "}
                      <Link to="/blog/ntsw-complete-guide" className="text-accent hover:underline">
                        ثبت سفارش در سامانه جامع تجارت
                      </Link>{" "}
                      ضروری است تا واردکنندگان بتوانند با اطمینان بیشتری نسبت به واردات و ترخیص کالاهای خود اقدام کنند.
                    </p>
                  </section>

                  {/* انواع لوازم خانگی */}
                  <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 text-persian text-foreground flex items-center gap-3">
                      <Package className="w-8 h-8 text-accent" />
                      <strong>انواع لوازم خانگی قابل واردات</strong>
                    </h2>

                    <div className="bg-secondary/30 rounded-lg p-6 mb-6">
                      <h3 className="text-2xl font-bold mb-4 text-persian text-foreground">
                        ۱. لوازم خانگی بزرگ (Major Appliances)
                      </h3>
                      <ul className="space-y-3 text-muted-foreground text-persian">
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span>
                            <strong>یخچال و فریزر</strong>: یخچال دو قلو، یخچال ساید بای ساید، فریزر ایستاده و افقی
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span>
                            <strong>ماشین لباسشویی</strong>: ماشین لباسشویی درب از جلو، درب از بالا، ماشین لباسشویی
                            خشک‌کن دار
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span>
                            <strong>ماشین ظرفشویی</strong>: ظرفشویی ایستاده، توکار و کامپکت
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span>
                            <strong>اجاق گاز و فر</strong>: اجاق گاز رومیزی، اجاق گاز فردار، فر توکار، فر برقی
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span>
                            <strong>کولر و سیستم گرمایش</strong>: کولر گازی اسپلیت، کولر کانالی، پکیج شوفاژ
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-secondary/30 rounded-lg p-6 mb-6">
                      <h3 className="text-2xl font-bold mb-4 text-persian text-foreground">
                        ۲. لوازم خانگی کوچک (Small Appliances)
                      </h3>
                      <ul className="space-y-3 text-muted-foreground text-persian">
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span>
                            <strong>لوازم آشپزخانه</strong>: مایکروویو، توستر، غذاساز، میکسر، آبمیوه‌گیری، قهوه‌ساز
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span>
                            <strong>لوازم نظافت</strong>: جاروبرقی، جاروبرقی رباتیک، اتو، اتو بخار
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span>
                            <strong>لوازم گرمایش و سرمایش</strong>: بخاری برقی، پنکه، هواساز، رطوبت‌ساز
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-secondary/30 rounded-lg p-6">
                      <h3 className="text-2xl font-bold mb-4 text-persian text-foreground">۳. لوازم صوتی و تصویری</h3>
                      <ul className="space-y-3 text-muted-foreground text-persian">
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span>
                            <strong>تلویزیون</strong>: تلویزیون LED، OLED، QLED، تلویزیون هوشمند (Smart TV)
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span>
                            <strong>سیستم صوتی</strong>: سینما خانگی، اسپیکر، ساندبار، پخش‌کننده
                          </span>
                        </li>
                      </ul>
                    </div>
                  </section>

                  {/* Second Image */}
                  <ArticleImage
                    src="/images/blog/home-appliances-warehouse.webp"
                    alt="انبار لوازم خانگی وارداتی - یخچال، ماشین لباسشویی، تلویزیون و اجاق گاز"
                    caption="انواع لوازم خانگی قابل واردات از طریق گمرک بندرعباس"
                  />

                  {/* مدارک لازم */}
                  <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 text-persian text-foreground flex items-center gap-3">
                      <FileText className="w-8 h-8 text-accent" />
                      <strong>مدارک ضروری برای ترخیص لوازم خانگی</strong>
                    </h2>

                    <div className="bg-accent/10 border-r-4 border-accent rounded-lg p-6 mb-6">
                      <h3 className="text-xl font-bold mb-4 text-persian text-foreground">مدارک پایه</h3>
                      <ul className="space-y-3 text-muted-foreground text-persian">
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span>
                            <strong>پروفرما اینویس (Proforma Invoice)</strong>: حاوی اطلاعات کامل کالا، قیمت، مشخصات فنی
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span>
                            <strong>بارنامه (Bill of Lading)</strong>: اصل یا کپی تاییدشده بارنامه دریایی یا هوایی
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span>
                            <strong>پکینگ لیست (Packing List)</strong>: لیست تفصیلی محتویات، وزن و ابعاد
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span>
                            <strong>گواهی مبدأ (Certificate of Origin)</strong>: تاییدیه کشور سازنده کالا
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span>
                            <strong>ثبت سفارش</strong>: ثبت سفارش معتبر از سامانه جامع تجارت (NTSW)
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-accent/10 border-r-4 border-accent rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-4 text-persian text-foreground">
                        مدارک تکمیلی (بسته به نوع کالا)
                      </h3>
                      <ul className="space-y-3 text-muted-foreground text-persian">
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span>
                            <strong>کاتالوگ فنی و بروشور</strong>: مشخصات کامل فنی محصول از سازنده
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span>
                            <strong>گواهی استاندارد کشور مبدأ</strong>: استانداردهای CE، UL، CSA یا معادل
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span>
                            <strong>مجوز واردات از وزارتخانه ذیربط</strong>: برای برخی اقلام خاص
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span>
                            <strong>گواهی انطباق با استانداردهای ایران</strong>: صادره از سازمان ملی استاندارد
                          </span>
                        </li>
                      </ul>
                    </div>
                  </section>

                  {/* کد تعرفه */}
                  <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 text-persian text-foreground flex items-center gap-3">
                      <DollarSign className="w-8 h-8 text-accent" />
                      <strong>کدهای تعرفه گمرکی (HS Code) لوازم خانگی</strong>
                    </h2>

                    <p className="text-lg leading-relaxed mb-6 text-muted-foreground text-persian">
                      هر نوع لوازم خانگی دارای <strong>کد تعرفه HS مخصوص به خود</strong> است که تعیین‌کننده میزان حقوق و
                      عوارض گمرکی می‌باشد. در زیر نمونه‌هایی از کدهای تعرفه رایج آورده شده است:
                    </p>

                    <div className="overflow-x-auto mb-6">
                      <table className="w-full border-collapse bg-secondary/30 rounded-lg overflow-hidden">
                        <thead className="bg-accent text-white">
                          <tr>
                            <th className="p-4 text-right text-persian">نوع کالا</th>
                            <th className="p-4 text-right text-persian">کد HS</th>
                            <th className="p-4 text-right text-persian">حقوق گمرکی تقریبی</th>
                          </tr>
                        </thead>
                        <tbody className="text-muted-foreground text-persian">
                          <tr className="border-t border-border">
                            <td className="p-4">یخچال خانگی</td>
                            <td className="p-4 font-mono">8418.10</td>
                            <td className="p-4">۲۶٪ حقوق + ۹٪ VAT</td>
                          </tr>
                          <tr className="border-t border-border">
                            <td className="p-4">ماشین لباسشویی</td>
                            <td className="p-4 font-mono">8450.11</td>
                            <td className="p-4">۲۶٪ حقوق + ۹٪ VAT</td>
                          </tr>
                          <tr className="border-t border-border">
                            <td className="p-4">ماشین ظرفشویی</td>
                            <td className="p-4 font-mono">8422.11</td>
                            <td className="p-4">۱۵٪ حقوق + ۹٪ VAT</td>
                          </tr>
                          <tr className="border-t border-border">
                            <td className="p-4">تلویزیون LED</td>
                            <td className="p-4 font-mono">8528.72</td>
                            <td className="p-4">۳۲٪ حقوق + ۹٪ VAT</td>
                          </tr>
                          <tr className="border-t border-border">
                            <td className="p-4">مایکروویو</td>
                            <td className="p-4 font-mono">8516.50</td>
                            <td className="p-4">۲۶٪ حقوق + ۹٪ VAT</td>
                          </tr>
                          <tr className="border-t border-border">
                            <td className="p-4">جاروبرقی</td>
                            <td className="p-4 font-mono">8508.11</td>
                            <td className="p-4">۲۶٪ حقوق + ۹٪ VAT</td>
                          </tr>
                          <tr className="border-t border-border">
                            <td className="p-4">کولر گازی اسپلیت</td>
                            <td className="p-4 font-mono">8415.10</td>
                            <td className="p-4">۲۶٪ حقوق + ۹٪ VAT</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="bg-orange-50 dark:bg-orange-950/30 border-r-4 border-orange-500 rounded-lg p-6">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-lg mb-2 text-foreground text-persian">نکته مهم</h4>
                          <p className="text-muted-foreground text-persian">
                            کد تعرفه دقیق بر اساس مشخصات فنی کالا (ظرفیت، توان، ویژگی‌های خاص) تعیین می‌شود. حتماً قبل
                            از واردات با کارشناسان ترخیصکار مشورت کنید تا کد تعرفه صحیح اعلام شود.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* محاسبه هزینه */}
                  <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 text-persian text-foreground flex items-center gap-3">
                      <DollarSign className="w-8 h-8 text-accent" />
                      <strong>محاسبه هزینه‌های ترخیص لوازم خانگی</strong>
                    </h2>

                    <p className="text-lg leading-relaxed mb-6 text-muted-foreground text-persian">
                      <strong>هزینه کل ترخیص لوازم خانگی</strong> شامل موارد زیر است:
                    </p>

                    <div className="bg-secondary/30 rounded-lg p-6 mb-6">
                      <h3 className="text-xl font-bold mb-4 text-persian text-foreground">۱. حقوق ورودی گمرکی</h3>
                      <p className="text-muted-foreground text-persian mb-4">
                        حقوق ورودی بر اساس ارزش CIF کالا (قیمت کالا + هزینه حمل + بیمه) و کد تعرفه محاسبه می‌شود.
                        معمولاً بین ۱۵٪ تا ۳۲٪ متغیر است.
                      </p>
                      <div className="bg-accent/10 rounded p-4 text-persian">
                        <strong>فرمول:</strong> حقوق ورودی = ارزش CIF × نرخ ارز گمرکی × درصد حقوق گمرکی
                      </div>
                    </div>

                    <div className="bg-secondary/30 rounded-lg p-6 mb-6">
                      <h3 className="text-xl font-bold mb-4 text-persian text-foreground">
                        ۲. مالیات بر ارزش افزوده (VAT)
                      </h3>
                      <p className="text-muted-foreground text-persian mb-4">
                        ۹٪ از مجموع (ارزش کالا + حقوق گمرکی) به عنوان مالیات بر ارزش افزوده محاسبه می‌شود.
                      </p>
                    </div>

                    <div className="bg-secondary/30 rounded-lg p-6 mb-6">
                      <h3 className="text-xl font-bold mb-4 text-persian text-foreground">۳. هزینه‌های جانبی</h3>
                      <ul className="space-y-2 text-muted-foreground text-persian">
                        <li>• هزینه بازرسی و معاینه کالا</li>
                        <li>• هزینه انبارداری (در صورت تأخیر)</li>
                        <li>• هزینه استاندارد (آزمایش و صدور گواهی)</li>
                        <li>• هزینه ترخیصکار (حق‌الوکاله)</li>
                        <li>• هزینه باربری و حمل داخلی</li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-950/30 border-r-4 border-blue-500 rounded-lg p-6">
                      <h4 className="font-bold text-lg mb-2 text-foreground text-persian">
                        مثال محاسبه (یخچال ساید بای ساید)
                      </h4>
                      <div className="text-muted-foreground text-persian space-y-2">
                        <p>• ارزش FOB کالا: ۱۰۰۰ دلار</p>
                        <p>• هزینه حمل و بیمه: ۲۰۰ دلار</p>
                        <p>• ارزش CIF: ۱۲۰۰ دلار</p>
                        <p>• نرخ ارز گمرکی: ۴۲,۰۰۰ تومان</p>
                        <p>• حقوق گمرکی (۲۶٪): ۱۳,۱۰۴,۰۰۰ تومان</p>
                        <p>• مالیات بر ارزش افزوده (۹٪): ۵,۰۱۹,۰۰۰ تومان</p>
                        <p className="font-bold text-foreground">• جمع کل تقریبی: ۶۸,۵۰۰,۰۰۰ تومان</p>
                      </div>
                    </div>
                  </section>

                  {/* استانداردها */}
                  <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 text-persian text-foreground flex items-center gap-3">
                      <Shield className="w-8 h-8 text-accent" />
                      <strong>استانداردها و مجوزهای لازم</strong>
                    </h2>

                    <div className="bg-secondary/30 rounded-lg p-6 mb-6">
                      <h3 className="text-2xl font-bold mb-4 text-persian text-foreground">
                        سازمان ملی استاندارد ایران
                      </h3>
                      <p className="text-muted-foreground text-persian mb-4">
                        تمامی لوازم خانگی وارداتی باید دارای <strong>گواهی انطباق استاندارد ایران</strong> باشند. برخی
                        از استانداردهای مهم عبارتند از:
                      </p>
                      <ul className="space-y-3 text-muted-foreground text-persian">
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span>
                            <strong>استاندارد ایمنی الکتریکی</strong>: ISIRI 3768 برای دستگاه‌های برقی
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span>
                            <strong>استاندارد بهره‌وری انرژی</strong>: برچسب انرژی برای یخچال، کولر، ماشین لباسشویی
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span>
                            <strong>استاندارد سازگاری الکترومغناطیسی (EMC)</strong>: کنترل تداخلات الکتریکی
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span>
                            <strong>استاندارد محیط زیست</strong>: عدم استفاده از مواد مضر (RoHS)
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-secondary/30 rounded-lg p-6">
                      <h3 className="text-2xl font-bold mb-4 text-persian text-foreground">
                        فرآیند اخذ گواهی استاندارد
                      </h3>
                      <ol className="space-y-3 text-muted-foreground text-persian list-decimal mr-6">
                        <li>ارسال مدارک فنی و کاتالوگ به سازمان استاندارد</li>
                        <li>نمونه‌برداری از محموله در گمرک</li>
                        <li>آزمایش نمونه در آزمایشگاه‌های مجاز</li>
                        <li>صدور گواهی انطباق (در صورت تأیید)</li>
                        <li>امکان ترخیص کالا پس از دریافت گواهی</li>
                      </ol>
                    </div>
                  </section>

                  {/* مراحل ترخیص */}
                  <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 text-persian text-foreground">
                      <strong>مراحل ترخیص لوازم خانگی از گمرک بندرعباس</strong>
                    </h2>

                    <div className="space-y-6">
                      <div className="bg-secondary/30 rounded-lg p-6">
                        <div className="flex items-start gap-4">
                          <div className="bg-accent text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                            1
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold mb-2 text-foreground text-persian">
                              ثبت سفارش در سامانه جامع تجارت
                            </h3>
                            <p className="text-muted-foreground text-persian">
                              ثبت سفارش باید قبل از ورود کالا به گمرک انجام شود و شامل تمام مشخصات دقیق کالا باشد.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-secondary/30 rounded-lg p-6">
                        <div className="flex items-start gap-4">
                          <div className="bg-accent text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                            2
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold mb-2 text-foreground text-persian">
                              ورود کالا و صدور بارنامه
                            </h3>
                            <p className="text-muted-foreground text-persian">
                              پس از ورود کالا به بندر، بارنامه دریافت و اطلاعات در سیستم گمرکی ثبت می‌شود.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-secondary/30 rounded-lg p-6">
                        <div className="flex items-start gap-4">
                          <div className="bg-accent text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                            3
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold mb-2 text-foreground text-persian">
                              تکمیل و ثبت اظهارنامه گمرکی
                            </h3>
                            <p className="text-muted-foreground text-persian">
                              ترخیصکار با استفاده از مدارک، اظهارنامه گمرکی را در سیستم جامع گمرکی ثبت می‌کند.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-secondary/30 rounded-lg p-6">
                        <div className="flex items-start gap-4">
                          <div className="bg-accent text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                            4
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold mb-2 text-foreground text-persian">
                              ارزیابی و تعیین ارزش گمرکی
                            </h3>
                            <p className="text-muted-foreground text-persian">
                              کارشناسان گمرک ارزش کالا را بررسی و در صورت نیاز اصلاحات لازم را اعمال می‌کنند.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-secondary/30 rounded-lg p-6">
                        <div className="flex items-start gap-4">
                          <div className="bg-accent text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                            5
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold mb-2 text-foreground text-persian">بازرسی فیزیکی کالا</h3>
                            <p className="text-muted-foreground text-persian">
                              بسته به نوع کالا، ممکن است بازرسی فیزیکی انجام شود تا از مطابقت با اسناد اطمینان حاصل شود.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-secondary/30 rounded-lg p-6">
                        <div className="flex items-start gap-4">
                          <div className="bg-accent text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                            6
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold mb-2 text-foreground text-persian">
                              دریافت گواهی استاندارد
                            </h3>
                            <p className="text-muted-foreground text-persian">
                              نمونه‌برداری توسط سازمان استاندارد و صدور گواهی انطباق (این مرحله ممکن است ۳ تا ۷ روز زمان
                              ببرد).
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-secondary/30 rounded-lg p-6">
                        <div className="flex items-start gap-4">
                          <div className="bg-accent text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                            7
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold mb-2 text-foreground text-persian">پرداخت حقوق و عوارض</h3>
                            <p className="text-muted-foreground text-persian">
                              پرداخت حقوق گمرکی، مالیات و سایر هزینه‌ها از طریق سیستم بانکی.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-secondary/30 rounded-lg p-6">
                        <div className="flex items-start gap-4">
                          <div className="bg-accent text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                            8
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold mb-2 text-foreground text-persian">
                              صدور برگ سبز و ترخیص کالا
                            </h3>
                            <p className="text-muted-foreground text-persian">
                              پس از تکمیل مراحل، برگ سبز صادر و کالا آماده خروج از گمرک می‌شود.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* نکات مهم */}
                  <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 text-persian text-foreground">
                      <strong>نکات کلیدی برای ترخیص موفق لوازم خانگی</strong>
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-green-50 dark:bg-green-950/30 border-r-4 border-green-500 rounded-lg p-6">
                        <h3 className="font-bold text-lg mb-3 text-foreground text-persian flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                          انتخاب برند معتبر
                        </h3>
                        <p className="text-muted-foreground text-persian">
                          لوازم خانگی برندهای شناخته‌شده معمولاً دارای مدارک فنی کامل‌تر و فرآیند ترخیص راحت‌تری هستند.
                        </p>
                      </div>

                      <div className="bg-green-50 dark:bg-green-950/30 border-r-4 border-green-500 rounded-lg p-6">
                        <h3 className="font-bold text-lg mb-3 text-foreground text-persian flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                          بررسی محدودیت‌ها
                        </h3>
                        <p className="text-muted-foreground text-persian">
                          برخی لوازم خانگی ممکن است محدودیت واردات داشته باشند. قبل از خرید حتماً بررسی کنید.
                        </p>
                      </div>

                      <div className="bg-green-50 dark:bg-green-950/30 border-r-4 border-green-500 rounded-lg p-6">
                        <h3 className="font-bold text-lg mb-3 text-foreground text-persian flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                          مدارک فنی کامل
                        </h3>
                        <p className="text-muted-foreground text-persian">
                          داشتن کاتالوگ، دفترچه راهنما و گواهی‌های استاندارد از کشور مبدأ فرآیند را تسریع می‌کند.
                        </p>
                      </div>

                      <div className="bg-green-50 dark:bg-green-950/30 border-r-4 border-green-500 rounded-lg p-6">
                        <h3 className="font-bold text-lg mb-3 text-foreground text-persian flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                          بسته‌بندی مناسب
                        </h3>
                        <p className="text-muted-foreground text-persian">
                          بسته‌بندی اصلی و محافظت مناسب از آسیب‌دیدگی در حین حمل جلوگیری می‌کند.
                        </p>
                      </div>

                      <div className="bg-green-50 dark:bg-green-950/30 border-r-4 border-green-500 rounded-lg p-6">
                        <h3 className="font-bold text-lg mb-3 text-foreground text-persian flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                          مشاوره تخصصی
                        </h3>
                        <p className="text-muted-foreground text-persian">
                          استفاده از خدمات ترخیصکار با تجربه می‌تواند زمان و هزینه شما را به طور قابل توجهی کاهش دهد.
                        </p>
                      </div>

                      <div className="bg-green-50 dark:bg-green-950/30 border-r-4 border-green-500 rounded-lg p-6">
                        <h3 className="font-bold text-lg mb-3 text-foreground text-persian flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                          زمان‌بندی مناسب
                        </h3>
                        <p className="text-muted-foreground text-persian">
                          برای فرآیند کامل ترخیص لوازم خانگی، حداقل ۱۰ تا ۱۵ روز کاری زمان در نظر بگیرید.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* نتیجه‌گیری */}
                  <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 text-persian text-foreground">
                      <strong>نتیجه‌گیری</strong>
                    </h2>
                    <p className="text-lg leading-relaxed mb-4 text-muted-foreground text-persian">
                      <strong>ترخیص لوازم خانگی از گمرک بندرعباس</strong> نیازمند دانش تخصصی در زمینه مقررات گمرکی،
                      استانداردها و فرآیندهای اداری است. با آگاهی از مدارک لازم، کدهای تعرفه صحیح، محاسبه دقیق هزینه‌ها
                      و رعایت استانداردهای ملی، می‌توانید فرآیند ترخیص را به صورت روان و بدون مشکل طی کنید.
                    </p>
                    <p className="text-lg leading-relaxed mb-4 text-muted-foreground text-persian">
                      تیم ترخیصان با سال‌ها تجربه در زمینه ترخیص انواع لوازم خانگی، آماده است تا شما را در تمام مراحل
                      واردات و ترخیص همراهی کند. از مشاوره اولیه تا تحویل کالا در محل، ما در کنار شما هستیم.
                    </p>
                  </section>

                  {/* CTA Final */}
                  <div className="bg-gradient-to-br from-accent/20 to-accent/10 border-2 border-accent rounded-2xl p-8 text-center">
                    <h3 className="text-2xl font-bold mb-4 text-foreground text-persian">
                      آماده واردات لوازم خانگی خود هستید؟
                    </h3>
                    <p className="text-lg text-muted-foreground mb-6 text-persian">
                      برای دریافت مشاوره رایگان و محاسبه دقیق هزینه‌های ترخیص، همین حالا با ما تماس بگیرید
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <a href="tel:+989177380080">
                        <Button size="lg" className="bg-accent hover:bg-accent/90 text-white text-lg px-8 text-persian">
                          <Phone className="ml-2 h-5 w-5" />
                          ۰۹۱۷۷۳۸۰۰۸۰
                        </Button>
                      </a>
                      <Link to="/contact">
                        <Button size="lg" variant="outline" className="text-lg px-8 text-persian">
                          فرم تماس
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Back to Blog */}
                <div className="mt-12 pt-8 border-t border-border">
                  <Link to="/blog">
                    <Button variant="outline" className="text-persian">
                      <ArrowRight className="ml-2 h-4 w-4" />
                      بازگشت به لیست مقالات
                    </Button>
                  </Link>
                </div>

                {/* Related Articles */}
                <RelatedArticles currentPostId={21} />
              </div>
            </div>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default HomeAppliancesClearanceGuide;
