import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleBreadcrumb from "@/components/ArticleBreadcrumb";
import RelatedArticles from "@/components/RelatedArticles";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Ship,
  FileText,
  DollarSign,
  Clock,
  AlertCircle,
  CheckCircle,
  Package,
  Globe,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ArticleImage from "@/components/ArticleImage";

const DubaiToAbbasImportGuide = () => {
  useEffect(() => {
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "fa");
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://tarkhisun.com/blog/dubai-to-abbas-import-guide" />
        <title>واردات کالا از دبی به بندرعباس | راهنمای کامل حمل و ترخیص کالا از امارات</title>
        <meta
          name="description"
          content="راهنمای واردات کالا از دبی به بندرعباس: روش‌های حمل، مدارک، هزینه‌ها و مراحل ترخیص از امارات"
        />
        <meta
          name="keywords"
          content="واردات از دبی, واردات از امارات, بندرعباس, حمل کالا از دبی, ترخیص کالا از دبی, تجارت با امارات, واردات کالا, گمرک بندرعباس, کشتیرانی دبی, حمل دریایی, ترانزیت کالا"
        />
        

        {/* Open Graph Tags */}
        <meta property="og:title" content="واردات کالا از دبی به بندرعباس | راهنمای کامل حمل و ترخیص" />
        <meta
          property="og:description"
          content="راهنمای جامع واردات کالا از دبی به بندرعباس: روش‌های حمل، مدارک، هزینه‌ها و نکات مهم"
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://tarkhisun.com/blog/dubai-to-abbas-import-guide" />
        <meta property="og:image" content="https://tarkhisun.com/og-image.jpg" />
        <meta property="og:locale" content="fa_IR" />

        {/* Article Tags */}
        <meta property="article:published_time" content="2025-10-21" />
        <meta property="article:modified_time" content="2025-10-21" />
        <meta property="article:author" content="تیم ترخیصان" />
        <meta property="article:section" content="تجارت بین‌المللی" />
        <meta property="article:tag" content="واردات از دبی" />
        <meta property="article:tag" content="بندرعباس" />
        <meta property="article:tag" content="حمل کالا" />

        {/* Structured Data - Article */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "واردات کالا از دبی به بندرعباس | راهنمای کامل حمل و ترخیص کالا از امارات",
            description:
              "راهنمای جامع واردات کالا از دبی به بندرعباس: روش‌های حمل، مدارک لازم، هزینه‌ها، زمان ترخیص، مراحل گمرکی و نکات کلیدی تجارت با امارات",
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
            datePublished: "2025-10-21",
            dateModified: "2025-10-21",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://tarkhisun.com/blog/dubai-to-abbas-import-guide",
            },
            keywords: ["واردات از دبی", "بندرعباس", "حمل کالا", "ترخیص کالا", "امارات", "تجارت خارجی"],
          })}
        </script>

        {/* FAQ Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "چه کالاهایی از دبی به بندرعباس وارد می‌شود؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "کالاهای متنوعی از دبی وارد می‌شود از جمله: لوازم الکترونیکی، پوشاک و کفش، مواد غذایی، لوازم خانگی، قطعات خودرو، ماشین‌آلات صنعتی، لوازم آرایشی و بهداشتی، موبایل و تبلت.",
                },
              },
              {
                "@type": "Question",
                name: "زمان حمل کالا از دبی به بندرعباس چقدر است؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "زمان حمل بسته به روش حمل متفاوت است: حمل دریایی معمولی 3-5 روز، حمل هوایی 1-2 روز و حمل زمینی 5-7 روز طول می‌کشد. مدت زمان ترخیص کالا نیز 3-7 روز اضافه می‌شود.",
                },
              },
              {
                "@type": "Question",
                name: "هزینه واردات از دبی به بندرعباس چقدر است؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "هزینه‌ها شامل: هزینه حمل (دریایی 200-500 دلار، هوایی 800-2000 دلار)، حقوق گمرکی 4-55% ارزش کالا، مالیات بر ارزش افزوده 9%، سود بازرگانی 1-10%، هزینه انبارداری، بیمه و هزینه ترخیصکار می‌باشد.",
                },
              },
              {
                "@type": "Question",
                name: "آیا واردات از دبی سودآور است؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "بله، واردات از دبی به دلیل نزدیکی جغرافیایی، قیمت‌های رقابتی، تنوع بالای کالا، سرعت حمل و امکان خرید نقدی بدون نیاز به LC بسیار سودآور و مقرون‌به‌صرفه است.",
                },
              },
            ],
          })}
        </script>

        {/* BreadcrumbList Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
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
                name: "واردات کالا از دبی به بندرعباس",
              },
            ],
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main>
          <article className="py-12" dir="rtl">
            <div className="container mx-auto px-4 max-w-4xl">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 text-persian">
                <Link to="/" className="hover:text-accent transition-colors">
                  خانه
                </Link>
                <span>/</span>
                <Link to="/blog" className="hover:text-accent transition-colors">
                  بلاگ
                </Link>
                <span>/</span>
                <span className="text-foreground">واردات کالا از دبی به بندرعباس</span>
              </nav>

              {/* Article Header */}
              <header className="mb-12">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-full text-persian">
                    تجارت بین‌المللی
                  </span>
                  <span className="text-sm text-muted-foreground text-persian">زمان مطالعه: ۲۰ دقیقه</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-persian leading-tight">
                  واردات کالا از دبی به بندرعباس
                  <br />
                  <span className="text-accent">راهنمای کامل حمل و ترخیص کالا از امارات</span>
                </h1>

                <p className="text-xl text-muted-foreground text-persian leading-relaxed">
                  راهنمای جامع واردات کالا از دبی به بندرعباس: روش‌های حمل دریایی و هوایی، مدارک لازم، هزینه‌ها، زمان
                  ترخیص، مراحل گمرکی، مزایا و نکات کلیدی برای تجارت موفق با امارات
                </p>

                <div className="flex items-center gap-4 mt-6 text-sm text-muted-foreground text-persian">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>۱۴۰۴/۷/۲۱</span>
                  </div>
                  <Separator orientation="vertical" className="h-4" />
                  <span>نویسنده: تیم ترخیصان</span>
                </div>
              </header>

              <Separator className="my-8" />

              {/* Hero Image */}
              <ArticleImage
                src="/images/blog/dubai-to-abbas-import-guide.webp"
                alt="بندر دبی - کشتی‌های باری و کانتینرهای صادراتی به ایران"
                caption="بندر جبل علی دبی - مبدأ واردات کالا به بندرعباس"
                priority
              />

              {/* Introduction */}
              <section className="mb-12">
                <p className="text-lg text-foreground/90 text-persian leading-relaxed mb-6">
                  واردات کالا از <strong>دبی به بندرعباس</strong> یکی از محبوب‌ترین و پرسودترین روش‌های تجارت خارجی در
                  ایران است. با توجه به نزدیکی جغرافیایی دبی به بندرعباس، سهولت حمل کالا، تنوع بالای محصولات و قیمت‌های
                  رقابتی، بسیاری از بازرگانان و واردکنندگان این مسیر را برای واردات کالاهای خود انتخاب می‌کنند. برای
                  انتخاب صحیح شرایط تحویل، مطالعه{" "}
                  <Link to="/blog/incoterms-guide" className="text-accent hover:underline">
                    راهنمای اینکوترمز
                  </Link>{" "}
                  توصیه می‌شود.
                </p>

                <p className="text-lg text-foreground/90 text-persian leading-relaxed">
                  در این راهنما به صورت جامع با انواع روش‌های حمل کالا از دبی، مدارک مورد نیاز، هزینه‌های واردات، مراحل
                  گمرکی، زمان ترخیص و نکات مهم برای یک تجارت موفق آشنا خواهید شد. برای آشنایی با{" "}
                  <Link to="/blog/hs-code-guide" className="text-accent hover:underline">
                    کدهای HS
                  </Link>{" "}
                  و{" "}
                  <Link to="/blog/manifest-guide" className="text-accent hover:underline">
                    مانیفست گمرکی
                  </Link>
                  ، مقالات مرتبط را مطالعه کنید.
                </p>
              </section>

              {/* Table of Contents */}
              <Card className="mb-12 bg-muted/30">
                <CardHeader>
                  <CardTitle className="text-persian flex items-center gap-2">
                    <Package className="w-5 h-5 text-accent" />
                    <strong>فهرست مطالب</strong>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-persian">
                    <li>
                      <a href="#why-dubai" className="text-accent hover:underline">
                        چرا واردات از دبی؟
                      </a>
                    </li>
                    <li>
                      <a href="#goods-types" className="text-accent hover:underline">
                        انواع کالاهای قابل واردات از دبی
                      </a>
                    </li>
                    <li>
                      <a href="#transport-methods" className="text-accent hover:underline">
                        روش‌های حمل کالا از دبی به بندرعباس
                      </a>
                    </li>
                    <li>
                      <a href="#required-documents" className="text-accent hover:underline">
                        مدارک لازم برای واردات
                      </a>
                    </li>
                    <li>
                      <a href="#customs-process" className="text-accent hover:underline">
                        مراحل ترخیص کالا در گمرک بندرعباس
                      </a>
                    </li>
                    <li>
                      <a href="#costs" className="text-accent hover:underline">
                        هزینه‌های واردات از دبی
                      </a>
                    </li>
                    <li>
                      <a href="#time-duration" className="text-accent hover:underline">
                        زمان حمل و ترخیص کالا
                      </a>
                    </li>
                    <li>
                      <a href="#advantages" className="text-accent hover:underline">
                        مزایای واردات از دبی
                      </a>
                    </li>
                    <li>
                      <a href="#important-points" className="text-accent hover:underline">
                        نکات مهم و کلیدی
                      </a>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Section 1 */}
              <section id="why-dubai" className="mb-12">
                <h2 className="text-3xl font-bold mb-6 text-persian flex items-center gap-3">
                  <Globe className="w-8 h-8 text-accent" />
                  چرا واردات از دبی؟
                </h2>

                <p className="text-lg text-foreground/90 text-persian leading-relaxed mb-6">
                  دبی به عنوان یکی از مهم‌ترین مراکز تجاری خاورمیانه، مزایای بی‌شماری برای واردکنندگان ایرانی دارد. در
                  اینجا مهم‌ترین دلایل انتخاب دبی برای واردات را بررسی می‌کنیم:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-accent/20">
                    <CardHeader>
                      <CardTitle className="text-persian text-lg flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-accent" />
                        <strong>نزدیکی جغرافیایی</strong>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-persian text-foreground/80">
                      فاصله دبی تا بندرعباس حدود ۲۰۰ کیلومتر است که امکان حمل سریع و کم‌هزینه را فراهم می‌کند
                    </CardContent>
                  </Card>

                  <Card className="border-accent/20">
                    <CardHeader>
                      <CardTitle className="text-persian text-lg flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-accent" />
                        تنوع بالای کالا
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-persian text-foreground/80">
                      دبی به عنوان مرکز تجارت جهانی، انواع محصولات از سراسر دنیا را در خود جای داده است
                    </CardContent>
                  </Card>

                  <Card className="border-accent/20">
                    <CardHeader>
                      <CardTitle className="text-persian text-lg flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-accent" />
                        قیمت‌های رقابتی
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-persian text-foreground/80">
                      به دلیل رقابت شدید و عدم مالیات، قیمت‌ها در دبی معمولاً پایین‌تر از سایر بازارها است
                    </CardContent>
                  </Card>

                  <Card className="border-accent/20">
                    <CardHeader>
                      <CardTitle className="text-persian text-lg flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-accent" />
                        سهولت خرید
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-persian text-foreground/80">
                      امکان خرید نقدی بدون نیاز به LC و سایر ابزارهای پیچیده بانکی
                    </CardContent>
                  </Card>
                </div>
              </section>

              <Separator className="my-12" />

              {/* Second Image */}
              <ArticleImage
                src="/images/blog/dubai-shipping.webp"
                alt="حمل دریایی کالا از دبی به بندرعباس - کشتی باری در حال بارگیری"
                caption="حمل دریایی کالا از دبی به بندرعباس - سریع‌ترین مسیر واردات"
              />

              {/* Section 2 */}
              <section id="goods-types" className="mb-12">
                <h2 className="text-3xl font-bold mb-6 text-persian flex items-center gap-3">
                  <Package className="w-8 h-8 text-accent" />
                  انواع کالاهای قابل واردات از دبی
                </h2>

                <p className="text-lg text-foreground/90 text-persian leading-relaxed mb-6">
                  طیف گسترده‌ای از کالاها از دبی به ایران وارد می‌شود. در اینجا محبوب‌ترین دسته‌بندی‌ها را معرفی
                  می‌کنیم:
                </p>

                <div className="space-y-4">
                  <Card className="bg-muted/30">
                    <CardHeader>
                      <CardTitle className="text-persian text-lg">۱. لوازم الکترونیکی و دیجیتال</CardTitle>
                    </CardHeader>
                    <CardContent className="text-persian text-foreground/80">
                      موبایل، تبلت، لپ‌تاپ، دوربین، کنسول بازی، لوازم جانبی کامپیوتر، هدفون و اسپیکر
                    </CardContent>
                  </Card>

                  <Card className="bg-muted/30">
                    <CardHeader>
                      <CardTitle className="text-persian text-lg">۲. پوشاک و منسوجات</CardTitle>
                    </CardHeader>
                    <CardContent className="text-persian text-foreground/80">
                      لباس، کفش، کیف، چمدان، عینک آفتابی، ساعت مچی و اکسسوری
                    </CardContent>
                  </Card>

                  <Card className="bg-muted/30">
                    <CardHeader>
                      <CardTitle className="text-persian text-lg">۳. لوازم خانگی</CardTitle>
                    </CardHeader>
                    <CardContent className="text-persian text-foreground/80">
                      لوازم آشپزخانه، دکوراسیون منزل، فرش، پرده، روشنایی و ابزار برقی
                    </CardContent>
                  </Card>

                  <Card className="bg-muted/30">
                    <CardHeader>
                      <CardTitle className="text-persian text-lg">۴. قطعات و لوازم یدکی خودرو</CardTitle>
                    </CardHeader>
                    <CardContent className="text-persian text-foreground/80">
                      قطعات اصلی و غیراصلی، لوازم جانبی خودرو، لاستیک و روغن موتور
                    </CardContent>
                  </Card>

                  <Card className="bg-muted/30">
                    <CardHeader>
                      <CardTitle className="text-persian text-lg">۵. مواد غذایی و نوشیدنی</CardTitle>
                    </CardHeader>
                    <CardContent className="text-persian text-foreground/80">
                      شکلات، قهوه، چای، ادویه‌جات، محصولات ارگانیک و مکمل‌های غذایی
                    </CardContent>
                  </Card>

                  <Card className="bg-muted/30">
                    <CardHeader>
                      <CardTitle className="text-persian text-lg">۶. لوازم آرایشی و بهداشتی</CardTitle>
                    </CardHeader>
                    <CardContent className="text-persian text-foreground/80">
                      عطر و ادکلن، کرم و لوسیون، محصولات مراقبت پوست و مو، آرایش
                    </CardContent>
                  </Card>

                  <Card className="bg-muted/30">
                    <CardHeader>
                      <CardTitle className="text-persian text-lg">۷. ماشین‌آلات و تجهیزات صنعتی</CardTitle>
                    </CardHeader>
                    <CardContent className="text-persian text-foreground/80">
                      ابزارآلات صنعتی، دستگاه‌های تولیدی، پمپ و کمپرسور، ژنراتور
                    </CardContent>
                  </Card>
                </div>
              </section>

              <Separator className="my-12" />

              {/* Section 3 */}
              <section id="transport-methods" className="mb-12">
                <h2 className="text-3xl font-bold mb-6 text-persian flex items-center gap-3">
                  <Ship className="w-8 h-8 text-accent" />
                  روش‌های حمل کالا از دبی به بندرعباس
                </h2>

                <p className="text-lg text-foreground/90 text-persian leading-relaxed mb-6">
                  سه روش اصلی برای حمل کالا از دبی به بندرعباس وجود دارد که هر کدام مزایا و معایب خاص خود را دارند:
                </p>

                <div className="space-y-6">
                  <Card className="border-accent/20">
                    <CardHeader>
                      <CardTitle className="text-persian text-xl">۱. حمل دریایی (Sea Freight)</CardTitle>
                      <CardDescription className="text-persian">محبوب‌ترین و مقرون‌به‌صرفه‌ترین روش</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 text-persian">
                      <div>
                        <h4 className="font-semibold mb-2">مزایا:</h4>
                        <ul className="list-disc list-inside space-y-1 text-foreground/80">
                          <li>هزینه بسیار پایین نسبت به حمل هوایی</li>
                          <li>امکان حمل محموله‌های بزرگ و سنگین</li>
                          <li>مناسب برای کالاهای عمده و غیرضروری</li>
                          <li>ایمنی بالا و کمترین خطر آسیب</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">معایب:</h4>
                        <ul className="list-disc list-inside space-y-1 text-foreground/80">
                          <li>زمان حمل طولانی‌تر (۳-۵ روز)</li>
                          <li>وابستگی به شرایط آب و هوایی</li>
                        </ul>
                      </div>
                      <div className="bg-accent/10 p-4 rounded-lg">
                        <p className="font-semibold">هزینه تقریبی: ۲۰۰-۵۰۰ دلار بسته به حجم</p>
                        <p className="text-sm text-muted-foreground mt-1">زمان حمل: ۳-۵ روز</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-accent/20">
                    <CardHeader>
                      <CardTitle className="text-persian text-xl">۲. حمل هوایی (Air Freight)</CardTitle>
                      <CardDescription className="text-persian">سریع‌ترین روش حمل</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 text-persian">
                      <div>
                        <h4 className="font-semibold mb-2">مزایا:</h4>
                        <ul className="list-disc list-inside space-y-1 text-foreground/80">
                          <li>سرعت بالا (۱-۲ روز)</li>
                          <li>امنیت بیشتر</li>
                          <li>مناسب کالاهای فوری و با ارزش بالا</li>
                          <li>عدم وابستگی به شرایط دریایی</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">معایب:</h4>
                        <ul className="list-disc list-inside space-y-1 text-foreground/80">
                          <li>هزینه بسیار بالا</li>
                          <li>محدودیت در وزن و حجم بار</li>
                          <li>محدودیت برای کالاهای خاص</li>
                        </ul>
                      </div>
                      <div className="bg-accent/10 p-4 rounded-lg">
                        <p className="font-semibold">هزینه تقریبی: ۸۰۰-۲۰۰۰ دلار بسته به وزن</p>
                        <p className="text-sm text-muted-foreground mt-1">زمان حمل: ۱-۲ روز</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-accent/20">
                    <CardHeader>
                      <CardTitle className="text-persian text-xl">۳. حمل زمینی (Land Freight)</CardTitle>
                      <CardDescription className="text-persian">روش جایگزین و انعطاف‌پذیر</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 text-persian">
                      <div>
                        <h4 className="font-semibold mb-2">مزایا:</h4>
                        <ul className="list-disc list-inside space-y-1 text-foreground/80">
                          <li>انعطاف‌پذیری در زمان حمل</li>
                          <li>امکان حمل درب به درب</li>
                          <li>هزینه متوسط</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">معایب:</h4>
                        <ul className="list-disc list-inside space-y-1 text-foreground/80">
                          <li>زمان حمل طولانی‌تر از دریایی</li>
                          <li>نیاز به مجوزهای ترانزیت</li>
                          <li>محدودیت در برخی کالاها</li>
                        </ul>
                      </div>
                      <div className="bg-accent/10 p-4 rounded-lg">
                        <p className="font-semibold">هزینه تقریبی: ۴۰۰-۱۰۰۰ دلار</p>
                        <p className="text-sm text-muted-foreground mt-1">زمان حمل: ۵-۷ روز</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <Separator className="my-12" />

              {/* Section 4 */}
              <section id="required-documents" className="mb-12">
                <h2 className="text-3xl font-bold mb-6 text-persian flex items-center gap-3">
                  <FileText className="w-8 h-8 text-accent" />
                  مدارک لازم برای واردات از دبی
                </h2>

                <p className="text-lg text-foreground/90 text-persian leading-relaxed mb-6">
                  برای واردات کالا از دبی به بندرعباس، مدارک زیر الزامی است:
                </p>

                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-persian">۱. مدارک شخصی و تجاری</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-persian">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>کارت بازرگانی:</strong> برای انجام تجارت خارجی ضروری است
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>کد اقتصادی:</strong> شناسه اقتصادی واحد تجاری
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>ثبت نام در سامانه جامع تجارت (NTSW):</strong> لازم برای ثبت سفارش
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-persian">۲. مدارک کالا و حمل</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-persian">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>اینویس (Invoice):</strong> صورتحساب فروشنده با مشخصات کامل کالا
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>بارنامه (Bill of Lading یا Airway Bill):</strong> مدرک حمل کالا
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>پکینگ لیست (Packing List):</strong> لیست بسته‌بندی محموله
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>گواهی مبدأ (Certificate of Origin):</strong> اثبات کشور سازنده
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-persian">۳. مجوزهای ویژه (بر اساس نوع کالا)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-persian">
                      <li className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>مجوز استاندارد:</strong> برای کالاهای مشمول استاندارد اجباری
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>مجوز بهداشتی:</strong> برای مواد غذایی، دارویی و آرایشی
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>مجوز وزارت ارتباطات:</strong> برای تجهیزات مخابراتی
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>مجوز محیط زیست:</strong> برای برخی ماشین‌آلات
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </section>

              <Separator className="my-12" />

              {/* Section 5 */}
              <section id="customs-process" className="mb-12">
                <h2 className="text-3xl font-bold mb-6 text-persian flex items-center gap-3">
                  <FileText className="w-8 h-8 text-accent" />
                  مراحل ترخیص کالا در گمرک بندرعباس
                </h2>

                <p className="text-lg text-foreground/90 text-persian leading-relaxed mb-6">
                  فرآیند ترخیص کالا از گمرک بندرعباس شامل مراحل زیر است:
                </p>

                <div className="space-y-4">
                  {[
                    {
                      step: "۱",
                      title: "ثبت سفارش در سامانه جامع تجارت",
                      description: "قبل از ورود کالا باید ثبت سفارش انجام شود و کد رهگیری دریافت گردد",
                    },
                    {
                      step: "۲",
                      title: "ورود کالا به بندر",
                      description: "پس از رسیدن کالا، بارنامه و مانیفست در سیستم گمرک ثبت می‌شود",
                    },
                    {
                      step: "۳",
                      title: "اظهار گمرکی",
                      description: "ترخیصکار اظهارنامه گمرکی را با جزئیات کالا تکمیل و ثبت می‌کند",
                    },
                    {
                      step: "۴",
                      title: "ارزیابی و محاسبه حقوق",
                      description: "گمرک ارزش کالا را ارزیابی و حقوق و عوارض را محاسبه می‌کند",
                    },
                    {
                      step: "۵",
                      title: "بازرسی کالا",
                      description: "بسته به نوع کالا و میزان ریسک، بازرسی فیزیکی یا اسنادی انجام می‌شود",
                    },
                    {
                      step: "۶",
                      title: "پرداخت حقوق و عوارض",
                      description: "واردکننده حقوق گمرکی، مالیات و سایر هزینه‌ها را پرداخت می‌کند",
                    },
                    {
                      step: "۷",
                      title: "ترخیص کالا",
                      description: "پس از تایید نهایی، مجوز خروج کالا صادر و محموله تحویل می‌شود",
                    },
                  ].map((item, index) => (
                    <Card
                      key={index}
                      className="bg-gradient-to-l from-accent/5 to-transparent border-r-4 border-r-accent"
                    >
                      <CardContent className="pt-6">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                            <span className="text-xl font-bold text-accent text-persian">{item.step}</span>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-2 text-persian">{item.title}</h3>
                            <p className="text-foreground/80 text-persian">{item.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              <Separator className="my-12" />

              {/* Section 6 */}
              <section id="costs" className="mb-12">
                <h2 className="text-3xl font-bold mb-6 text-persian flex items-center gap-3">
                  <DollarSign className="w-8 h-8 text-accent" />
                  هزینه‌های واردات از دبی
                </h2>

                <p className="text-lg text-foreground/90 text-persian leading-relaxed mb-6">
                  هزینه‌های واردات کالا از دبی به بندرعباس شامل موارد زیر است:
                </p>

                <Card className="mb-6 bg-gradient-to-br from-accent/5 to-transparent">
                  <CardHeader>
                    <CardTitle className="text-persian">هزینه‌های اصلی</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-persian">
                    <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                      <span className="font-semibold">هزینه حمل دریایی</span>
                      <span className="text-accent">۲۰۰-۵۰۰ دلار</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                      <span className="font-semibold">هزینه حمل هوایی</span>
                      <span className="text-accent">۸۰۰-۲۰۰۰ دلار</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                      <span className="font-semibold">حقوق گمرکی</span>
                      <span className="text-accent">۴-۵۵٪ ارزش کالا</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                      <span className="font-semibold">مالیات بر ارزش افزوده</span>
                      <span className="text-accent">۹٪</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                      <span className="font-semibold">سود بازرگانی</span>
                      <span className="text-accent">۱-۱۰٪</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-persian">هزینه‌های جانبی</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-persian">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>هزینه ترخیصکار:</strong> ۱۰۰-۵۰۰ دلار بسته به پیچیدگی کالا
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>هزینه انبارداری:</strong> ۱۰-۵۰ دلار در روز
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>بیمه محموله:</strong> ۰.۵-۲٪ ارزش کالا
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>هزینه بارگیری و تخلیه:</strong> ۵۰-۲۰۰ دلار
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-amber-500/30 bg-amber-50/10">
                  <CardHeader>
                    <CardTitle className="text-persian flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-amber-500" />
                      نکته مهم
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-persian text-foreground/80">
                    هزینه‌ها ممکن است بسته به نوع کالا، حجم، وزن و شرایط بازار متفاوت باشد. برای دریافت قیمت دقیق با
                    ترخیصکار مشاوره کنید.
                  </CardContent>
                </Card>
              </section>

              <Separator className="my-12" />

              {/* Section 7 */}
              <section id="time-duration" className="mb-12">
                <h2 className="text-3xl font-bold mb-6 text-persian flex items-center gap-3">
                  <Clock className="w-8 h-8 text-accent" />
                  زمان حمل و ترخیص کالا
                </h2>

                <p className="text-lg text-foreground/90 text-persian leading-relaxed mb-6">
                  زمان کل فرآیند واردات از دبی به بندرعباس به شرح زیر است:
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <Card className="text-center bg-gradient-to-b from-accent/15 to-accent/5">
                    <CardHeader>
                      <CardTitle className="text-persian">حمل دریایی</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-accent mb-2 text-persian">۳-۵</p>
                      <p className="text-sm text-muted-foreground text-persian">روز حمل</p>
                    </CardContent>
                  </Card>

                  <Card className="text-center bg-gradient-to-b from-accent/15 to-accent/5">
                    <CardHeader>
                      <CardTitle className="text-persian">حمل هوایی</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-accent mb-2 text-persian">۱-۲</p>
                      <p className="text-sm text-muted-foreground text-persian">روز حمل</p>
                    </CardContent>
                  </Card>

                  <Card className="text-center bg-gradient-to-b from-accent/15 to-accent/5">
                    <CardHeader>
                      <CardTitle className="text-persian">ترخیص گمرکی</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-accent mb-2 text-persian">۳-۷</p>
                      <p className="text-sm text-muted-foreground text-persian">روز کاری</p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-muted/30">
                  <CardHeader>
                    <CardTitle className="text-persian">عوامل موثر بر زمان ترخیص</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-persian text-foreground/80">
                      <li>• نوع کالا و نیاز به مجوزهای خاص</li>
                      <li>• کامل بودن مدارک و اسناد</li>
                      <li>• وضعیت شلوغی گمرک</li>
                      <li>• انتخاب ترخیصکار با تجربه</li>
                      <li>• تطابق کالا با اظهارنامه</li>
                      <li>• تعطیلات رسمی</li>
                    </ul>
                  </CardContent>
                </Card>
              </section>

              <Separator className="my-12" />

              {/* Section 8 */}
              <section id="advantages" className="mb-12">
                <h2 className="text-3xl font-bold mb-6 text-persian flex items-center gap-3">
                  <TrendingUp className="w-8 h-8 text-accent" />
                  مزایای واردات از دبی
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-accent/20">
                    <CardHeader>
                      <CardTitle className="text-persian flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-accent" />
                        صرفه اقتصادی
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-persian text-foreground/80">
                      هزینه حمل و ترخیص بسیار کمتر از سایر کشورها، قیمت‌های رقابتی کالا در بازار دبی
                    </CardContent>
                  </Card>

                  <Card className="border-accent/20">
                    <CardHeader>
                      <CardTitle className="text-persian flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-accent" />
                        سرعت بالا
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-persian text-foreground/80">
                      نزدیکی جغرافیایی باعث کاهش زمان حمل و دسترسی سریع به کالا می‌شود
                    </CardContent>
                  </Card>

                  <Card className="border-accent/20">
                    <CardHeader>
                      <CardTitle className="text-persian flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-accent" />
                        تنوع محصولات
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-persian text-foreground/80">
                      دسترسی به محصولات از سراسر جهان در یک مکان، امکان انتخاب از برندهای معتبر
                    </CardContent>
                  </Card>

                  <Card className="border-accent/20">
                    <CardHeader>
                      <CardTitle className="text-persian flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-accent" />
                        سهولت معاملات
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-persian text-foreground/80">
                      عدم نیاز به LC، امکان خرید نقدی، فرآیند ساده تجاری و گمرکی
                    </CardContent>
                  </Card>

                  <Card className="border-accent/20">
                    <CardHeader>
                      <CardTitle className="text-persian flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-accent" />
                        کیفیت تضمین شده
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-persian text-foreground/80">
                      محصولات اصل و با گارانتی، قوانین سخت‌گیرانه دبی در مورد کالاهای تقلبی
                    </CardContent>
                  </Card>

                  <Card className="border-accent/20">
                    <CardHeader>
                      <CardTitle className="text-persian flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-accent" />
                        شرایط پرداخت منعطف
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-persian text-foreground/80">
                      امکان پرداخت نقدی، چک، انتقال بانکی یا ترکیبی از روش‌های مختلف
                    </CardContent>
                  </Card>
                </div>
              </section>

              <Separator className="my-12" />

              {/* Section 9 */}
              <section id="important-points" className="mb-12">
                <h2 className="text-3xl font-bold mb-6 text-persian flex items-center gap-3">
                  <AlertCircle className="w-8 h-8 text-accent" />
                  نکات مهم و کلیدی
                </h2>

                <div className="space-y-4">
                  <Card className="border-amber-500/30 bg-amber-50/10">
                    <CardHeader>
                      <CardTitle className="text-persian flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-amber-500" />
                        بررسی محدودیت‌های واردات
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-persian text-foreground/80">
                      قبل از خرید، لیست کالاهای ممنوعه و مشروط را بررسی کنید. برخی کالاها نیاز به مجوزهای خاص دارند.
                    </CardContent>
                  </Card>

                  <Card className="border-amber-500/30 bg-amber-50/10">
                    <CardHeader>
                      <CardTitle className="text-persian flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-amber-500" />
                        دقت در اینویس و اسناد
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-persian text-foreground/80">
                      مشخصات کالا در اینویس باید کاملاً دقیق و مطابق با واقعیت باشد. هرگونه تفاوت می‌تواند باعث تاخیر
                      شود.
                    </CardContent>
                  </Card>

                  <Card className="border-amber-500/30 bg-amber-50/10">
                    <CardHeader>
                      <CardTitle className="text-persian flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-amber-500" />
                        بیمه محموله
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-persian text-foreground/80">
                      حتماً محموله خود را بیمه کنید. در صورت بروز هر مشکلی، خسارات شما جبران می‌شود.
                    </CardContent>
                  </Card>

                  <Card className="border-amber-500/30 bg-amber-50/10">
                    <CardHeader>
                      <CardTitle className="text-persian flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-amber-500" />
                        انتخاب ترخیصکار متخصص
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-persian text-foreground/80">
                      همکاری با ترخیصکار با تجربه می‌تواند زمان و هزینه شما را کاهش دهد و از مشکلات احتمالی جلوگیری کند.
                    </CardContent>
                  </Card>

                  <Card className="border-amber-500/30 bg-amber-50/10">
                    <CardHeader>
                      <CardTitle className="text-persian flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-amber-500" />
                        محاسبه دقیق هزینه‌ها
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-persian text-foreground/80">
                      قبل از خرید، تمام هزینه‌ها شامل حمل، گمرک و مالیات را محاسبه کنید تا از سودآوری معامله مطمئن شوید.
                    </CardContent>
                  </Card>

                  <Card className="border-amber-500/30 bg-amber-50/10">
                    <CardHeader>
                      <CardTitle className="text-persian flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-amber-500" />
                        بررسی استانداردها
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-persian text-foreground/80">
                      کالاهای مشمول استاندارد اجباری باید قبل از ترخیص، گواهی استاندارد دریافت کنند.
                    </CardContent>
                  </Card>

                  <Card className="border-amber-500/30 bg-amber-50/10">
                    <CardHeader>
                      <CardTitle className="text-persian flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-amber-500" />
                        پیگیری مستمر
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-persian text-foreground/80">
                      پس از ارسال کالا، مرتباً وضعیت محموله را پیگیری کنید و از رسیدن به موقع آن اطمینان حاصل کنید.
                    </CardContent>
                  </Card>
                </div>
              </section>

              <Separator className="my-12" />

              {/* Conclusion */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-6 text-persian">جمع‌بندی</h2>

                <div className="bg-gradient-to-br from-accent/15 to-accent/5 p-8 rounded-lg border border-accent/20">
                  <p className="text-lg text-foreground/90 text-persian leading-relaxed mb-4">
                    واردات کالا از دبی به بندرعباس یک مسیر تجاری پرسود و کارآمد برای بازرگانان ایرانی است. با توجه به
                    نزدیکی جغرافیایی، تنوع کالاها، قیمت‌های مناسب و سهولت فرآیند، این مسیر به یکی از محبوب‌ترین
                    گزینه‌های واردات تبدیل شده است.
                  </p>

                  <p className="text-lg text-foreground/90 text-persian leading-relaxed mb-4">
                    برای موفقیت در این کسب‌وکار، رعایت قوانین گمرکی، انتخاب روش حمل مناسب، تهیه مدارک کامل و همکاری با
                    ترخیصکاران متخصص ضروری است.
                  </p>

                  <p className="text-lg text-foreground/90 text-persian leading-relaxed">
                    تیم ترخیصان آماده ارائه مشاوره تخصصی و خدمات ترخیص کالای شما از گمرک بندرعباس است.
                  </p>
                </div>
              </section>

              {/* Related Articles */}
              <RelatedArticles currentPostId={15} limit={3} />

              {/* CTA Section */}
              <Card className="bg-gradient-to-br from-accent/10 via-accent/5 to-transparent border-accent/30">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4 text-persian">نیاز به مشاوره تخصصی واردات از دبی دارید؟</h3>
                  <p className="text-muted-foreground mb-6 text-persian">
                    کارشناسان ما آماده پاسخگویی و راهنمایی شما در تمام مراحل واردات هستند
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Link to="/#contact">
                      <Button size="lg" className="text-persian">
                        تماس با ما
                        <ArrowLeft className="mr-2 h-5 w-5" />
                      </Button>
                    </Link>
                    <Link to="/blog">
                      <Button size="lg" variant="outline" className="text-persian">
                        مقالات بیشتر
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Back to Blog */}
              <div className="mt-12 text-center">
                <Link to="/blog">
                  <Button variant="ghost" className="text-persian">
                    <ArrowLeft className="ml-2 h-4 w-4" />
                    بازگشت به لیست مقالات
                  </Button>
                </Link>
              </div>
            </div>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default DubaiToAbbasImportGuide;
