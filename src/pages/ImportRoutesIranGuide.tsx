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
  Plane,
  Truck,
  FileText,
  DollarSign,
  Clock,
  AlertCircle,
  CheckCircle,
  Package,
  Globe,
  TrendingUp,
  MapPin,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ArticleImage from "@/components/ArticleImage";

const ImportRoutesIranGuide = () => {
  useEffect(() => {
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "fa");
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://tarkhisun.com/blog/import-routes-iran-guide" />
        <title>بهترین مسیرهای واردات کالا به ایران در ۱۴۰۴ | چین، امارات، ترکیه</title>
        <meta
          name="description"
          content="راهنمای کامل بهترین مسیرهای واردات کالا به ایران در سال ۱۴۰۴: مقایسه واردات از چین، امارات و ترکیه با هزینه‌ها، زمان حمل و مزایای هر مسیر"
        />
        <meta
          name="keywords"
          content="واردات کالا به ایران, مسیر واردات از چین, واردات از امارات, واردات از ترکیه, واردات ۱۴۰۴, بهترین مسیر واردات, هزینه واردات, حمل کالا به ایران, تجارت بین‌المللی ایران, گمرک ایران"
        />
        

        {/* Open Graph Tags */}
        <meta property="og:title" content="بهترین مسیرهای واردات کالا به ایران در ۱۴۰۴ | چین، امارات، ترکیه" />
        <meta
          property="og:description"
          content="راهنمای کامل مقایسه مسیرهای واردات از چین، امارات و ترکیه به ایران با هزینه‌ها و زمان حمل"
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://tarkhisun.com/blog/import-routes-iran-guide" />
        <meta property="og:image" content="https://tarkhisun.com/images/blog/import-routes-iran-container.webp" />
        <meta property="og:locale" content="fa_IR" />

        {/* Article Tags */}
        <meta property="article:published_time" content="2025-03-15" />
        <meta property="article:modified_time" content="2025-03-15" />
        <meta property="article:author" content="تیم ترخیصان" />
        <meta property="article:section" content="تجارت بین‌الملل" />
        <meta property="article:tag" content="واردات از چین" />
        <meta property="article:tag" content="واردات از امارات" />
        <meta property="article:tag" content="واردات از ترکیه" />

        {/* Structured Data - Article */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "بهترین مسیرهای واردات کالا به ایران در ۱۴۰۴ | چین، امارات، ترکیه",
            description:
              "راهنمای کامل بهترین مسیرهای واردات کالا به ایران در سال ۱۴۰۴: مقایسه واردات از چین، امارات و ترکیه",
            image: "https://tarkhisun.com/images/blog/import-routes-iran-container.webp",
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
            datePublished: "2025-03-15",
            dateModified: "2025-03-15",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://tarkhisun.com/blog/import-routes-iran-guide",
            },
            keywords: ["واردات کالا به ایران", "واردات از چین", "واردات از امارات", "واردات از ترکیه", "مسیر واردات ۱۴۰۴"],
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
                name: "بهترین مسیر واردات کالا به ایران کدام است؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "بهترین مسیر واردات به نوع کالا، حجم، بودجه و زمان بستگی دارد. چین برای کالاهای صنعتی و الکترونیکی، امارات برای کالاهای متنوع با سرعت بالا، و ترکیه برای پوشاک و مواد غذایی مناسب‌تر هستند.",
                },
              },
              {
                "@type": "Question",
                name: "هزینه واردات از چین به ایران چقدر است؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "هزینه حمل دریایی از چین حدود ۸۰ تا ۱۵۰ دلار به ازای هر CBM است. هزینه حمل هوایی بین ۳ تا ۶ دلار به ازای هر کیلوگرم متغیر است.",
                },
              },
              {
                "@type": "Question",
                name: "زمان واردات کالا از ترکیه به ایران چقدر است؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "حمل زمینی از ترکیه به ایران معمولاً ۵ تا ۱۰ روز طول می‌کشد. این زمان برای حمل دریایی ۱۰ تا ۱۵ روز است.",
                },
              },
              {
                "@type": "Question",
                name: "واردات از امارات بهتر است یا چین؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "واردات از امارات سریع‌تر (۳-۷ روز) اما گران‌تر است. واردات از چین ارزان‌تر اما زمان‌بر (۲۵-۴۵ روز) است. برای حجم بالا و بودجه محدود چین، برای سرعت و تنوع امارات مناسب‌تر است.",
                },
              },
            ],
          })}
        </script>
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background pt-24 md:pt-28">
        <article className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Breadcrumb */}
          <ArticleBreadcrumb category="تجارت بین‌الملل" articleTitle="بهترین مسیرهای واردات کالا به ایران در ۱۴۰۴" />

          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-relaxed">
              بهترین مسیرهای واردات کالا به ایران در ۱۴۰۴ | چین، امارات، ترکیه
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                ۲۰ دقیقه مطالعه
              </span>
              <span>تاریخ انتشار: ۱۴۰۴/۱/۲۵</span>
              <span>نویسنده: تیم ترخیصان</span>
            </div>
          </header>

          {/* Featured Image */}
          <ArticleImage
            src="/images/blog/import-routes-iran-container.webp"
            alt="مسیرهای واردات کالا به ایران - کانتینرهای صادراتی و وارداتی در بندر"
            caption="انتخاب مسیر مناسب واردات، کلید موفقیت در تجارت بین‌المللی است"
          />

          {/* Introduction */}
          <section className="prose prose-lg max-w-none mb-8">
            <p className="text-lg text-foreground leading-relaxed mb-6">
              <strong>واردات کالا به ایران</strong> یکی از ارکان اصلی تجارت و اقتصاد کشور محسوب می‌شود. در سال <strong>۱۴۰۴</strong>، انتخاب <strong>بهترین مسیر واردات</strong> با توجه به تحولات اقتصادی، نرخ ارز، هزینه‌های حمل و تغییرات در روابط تجاری اهمیت ویژه‌ای پیدا کرده است. در این راهنمای جامع، سه مسیر اصلی واردات یعنی <strong>چین</strong>، <strong>امارات متحده عربی</strong> و <strong>ترکیه</strong> را بررسی می‌کنیم.
            </p>
          </section>

          <Separator className="my-8" />

          {/* Table of Contents */}
          <nav className="bg-muted/50 rounded-lg p-6 mb-8" aria-label="فهرست مطالب">
            <h2 className="text-xl font-bold text-foreground mb-4">فهرست مطالب</h2>
            <ul className="space-y-2 text-primary">
              <li>
                <a href="#china-import" className="hover:underline flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  واردات کالا از چین به ایران
                </a>
              </li>
              <li>
                <a href="#uae-import" className="hover:underline flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  واردات کالا از امارات به ایران
                </a>
              </li>
              <li>
                <a href="#turkey-import" className="hover:underline flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  واردات کالا از ترکیه به ایران
                </a>
              </li>
              <li>
                <a href="#comparison" className="hover:underline flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  مقایسه سه مسیر واردات
                </a>
              </li>
              <li>
                <a href="#best-route" className="hover:underline flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  انتخاب بهترین مسیر بر اساس نوع کالا
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:underline flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  سوالات متداول
                </a>
              </li>
            </ul>
          </nav>

          {/* China Import Section */}
          <section id="china-import" className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Globe className="w-8 h-8 text-primary" />
              واردات کالا از چین به ایران
            </h2>

            <p className="text-foreground leading-relaxed mb-6">
              <strong>چین</strong> بزرگ‌ترین شریک تجاری ایران و مهم‌ترین منبع واردات کالا به کشور است. با توجه به تنوع تولیدات، قیمت‌های رقابتی و ظرفیت تولید بالا، واردات از چین همچنان محبوب‌ترین گزینه برای بازرگانان ایرانی محسوب می‌شود.
            </p>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ship className="w-5 h-5 text-primary" />
                  روش‌های حمل از چین به ایران
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                      <Ship className="w-4 h-4" />
                      حمل دریایی
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• زمان: ۲۵ تا ۴۵ روز</li>
                      <li>• هزینه: ۸۰-۱۵۰ دلار/CBM</li>
                      <li>• مناسب برای حجم بالا</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                      <Plane className="w-4 h-4" />
                      حمل هوایی
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• زمان: ۳ تا ۷ روز</li>
                      <li>• هزینه: ۳-۶ دلار/کیلوگرم</li>
                      <li>• مناسب کالای سبک و فوری</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                      <Truck className="w-4 h-4" />
                      حمل ریلی
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• زمان: ۱۵ تا ۲۵ روز</li>
                      <li>• هزینه: متوسط</li>
                      <li>• گزینه جدید و رو به رشد</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <h3 className="text-xl font-bold text-foreground mb-4">مزایای واردات از چین</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h4 className="font-bold text-foreground">قیمت رقابتی</h4>
                  <p className="text-sm text-muted-foreground">پایین‌ترین قیمت تولید در جهان</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h4 className="font-bold text-foreground">تنوع محصولات</h4>
                  <p className="text-sm text-muted-foreground">از الکترونیک تا ماشین‌آلات صنعتی</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h4 className="font-bold text-foreground">ظرفیت تولید بالا</h4>
                  <p className="text-sm text-muted-foreground">امکان سفارش در حجم‌های بالا</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h4 className="font-bold text-foreground">تجربه همکاری</h4>
                  <p className="text-sm text-muted-foreground">سابقه طولانی تجارت با ایران</p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-foreground mb-4">معایب و چالش‌های واردات از چین</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600 mt-1" />
                <div>
                  <h4 className="font-bold text-foreground">زمان حمل طولانی</h4>
                  <p className="text-sm text-muted-foreground">۲۵ تا ۴۵ روز برای حمل دریایی</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600 mt-1" />
                <div>
                  <h4 className="font-bold text-foreground">کنترل کیفیت</h4>
                  <p className="text-sm text-muted-foreground">نیاز به بازرسی کالا قبل از ارسال</p>
                </div>
              </div>
            </div>
          </section>

          <Separator className="my-8" />

          {/* UAE Import Section */}
          <section id="uae-import" className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Package className="w-8 h-8 text-primary" />
              واردات کالا از امارات به ایران
            </h2>

            <p className="text-foreground leading-relaxed mb-6">
              <strong>امارات متحده عربی</strong> به‌ویژه <strong>دبی</strong> به عنوان هاب تجاری منطقه، نقش مهمی در واردات کالا به ایران ایفا می‌کند. نزدیکی جغرافیایی، مناطق آزاد تجاری و تنوع کالاها، امارات را به گزینه‌ای جذاب برای واردکنندگان تبدیل کرده است.
            </p>

            <ArticleImage
              src="/images/blog/import-routes-iran-cargo.webp"
              alt="واردات کالا از امارات به ایران - کشتی‌های باری در بندر دبی"
              caption="بندر جبل علی دبی یکی از بزرگ‌ترین بنادر جهان است"
            />

            <Card className="mb-6 mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ship className="w-5 h-5 text-primary" />
                  روش‌های حمل از امارات به ایران
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-bold text-foreground mb-2">حمل دریایی</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• زمان: ۳ تا ۷ روز</li>
                      <li>• هزینه: ۱۵۰-۳۰۰ دلار/CBM</li>
                      <li>• مسیر: دبی به بندرعباس</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-bold text-foreground mb-2">حمل هوایی</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• زمان: ۱ تا ۲ روز</li>
                      <li>• هزینه: ۲-۴ دلار/کیلوگرم</li>
                      <li>• مسیر: دبی به تهران/شیراز</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <h3 className="text-xl font-bold text-foreground mb-4">مزایای واردات از امارات</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h4 className="font-bold text-foreground">سرعت بالا</h4>
                  <p className="text-sm text-muted-foreground">رسیدن کالا در کمتر از یک هفته</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h4 className="font-bold text-foreground">نزدیکی جغرافیایی</h4>
                  <p className="text-sm text-muted-foreground">کاهش هزینه و ریسک حمل</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h4 className="font-bold text-foreground">تنوع کالا</h4>
                  <p className="text-sm text-muted-foreground">دسترسی به برندهای جهانی</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h4 className="font-bold text-foreground">خرید خرده</h4>
                  <p className="text-sm text-muted-foreground">امکان خرید در حجم‌های کوچک</p>
                </div>
              </div>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Turkey Import Section */}
          <section id="turkey-import" className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Truck className="w-8 h-8 text-primary" />
              واردات کالا از ترکیه به ایران
            </h2>

            <p className="text-foreground leading-relaxed mb-6">
              <strong>ترکیه</strong> به عنوان همسایه شمال غربی ایران، یکی از مهم‌ترین شرکای تجاری کشور است. مرز مشترک زمینی، کیفیت بالای محصولات و قیمت‌های مناسب، ترکیه را به گزینه‌ای عالی برای واردات پوشاک، مواد غذایی و کالاهای مصرفی تبدیل کرده است.
            </p>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary" />
                  روش‌های حمل از ترکیه به ایران
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-bold text-foreground mb-2">حمل زمینی (TIR)</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• زمان: ۵ تا ۱۰ روز</li>
                      <li>• هزینه: ۲۰۰۰-۴۰۰۰ دلار/کامیون</li>
                      <li>• مرز بازرگان</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-bold text-foreground mb-2">حمل دریایی</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• زمان: ۱۰ تا ۱۵ روز</li>
                      <li>• هزینه: ۱۰۰-۲۰۰ دلار/CBM</li>
                      <li>• مسیر: استانبول به بندرعباس</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-bold text-foreground mb-2">حمل ریلی</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• زمان: ۷ تا ۱۲ روز</li>
                      <li>• هزینه: متوسط</li>
                      <li>• در حال توسعه</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <h3 className="text-xl font-bold text-foreground mb-4">کالاهای پرطرفدار واردات از ترکیه</h3>
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <Package className="w-8 h-8 mx-auto mb-2 text-primary" />
                <span className="font-medium text-foreground">پوشاک و نساجی</span>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <Package className="w-8 h-8 mx-auto mb-2 text-primary" />
                <span className="font-medium text-foreground">مواد غذایی</span>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <Package className="w-8 h-8 mx-auto mb-2 text-primary" />
                <span className="font-medium text-foreground">لوازم خانگی</span>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <Package className="w-8 h-8 mx-auto mb-2 text-primary" />
                <span className="font-medium text-foreground">مصالح ساختمانی</span>
              </div>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Comparison Section */}
          <section id="comparison" className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-primary" />
              مقایسه سه مسیر واردات
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border p-4 text-right">معیار</th>
                    <th className="border border-border p-4 text-center">چین 🇨🇳</th>
                    <th className="border border-border p-4 text-center">امارات 🇦🇪</th>
                    <th className="border border-border p-4 text-center">ترکیه 🇹🇷</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border p-4 font-medium">زمان حمل دریایی</td>
                    <td className="border border-border p-4 text-center">۲۵-۴۵ روز</td>
                    <td className="border border-border p-4 text-center">۳-۷ روز</td>
                    <td className="border border-border p-4 text-center">۱۰-۱۵ روز</td>
                  </tr>
                  <tr className="bg-muted/30">
                    <td className="border border-border p-4 font-medium">هزینه حمل (CBM)</td>
                    <td className="border border-border p-4 text-center">۸۰-۱۵۰ دلار</td>
                    <td className="border border-border p-4 text-center">۱۵۰-۳۰۰ دلار</td>
                    <td className="border border-border p-4 text-center">۱۰۰-۲۰۰ دلار</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-4 font-medium">قیمت کالا</td>
                    <td className="border border-border p-4 text-center text-green-600">پایین‌ترین</td>
                    <td className="border border-border p-4 text-center text-yellow-600">متوسط</td>
                    <td className="border border-border p-4 text-center text-yellow-600">متوسط</td>
                  </tr>
                  <tr className="bg-muted/30">
                    <td className="border border-border p-4 font-medium">کیفیت کالا</td>
                    <td className="border border-border p-4 text-center">متفاوت</td>
                    <td className="border border-border p-4 text-center">خوب</td>
                    <td className="border border-border p-4 text-center">خوب</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-4 font-medium">حداقل سفارش</td>
                    <td className="border border-border p-4 text-center">معمولاً بالا</td>
                    <td className="border border-border p-4 text-center">پایین</td>
                    <td className="border border-border p-4 text-center">متوسط</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Best Route by Product */}
          <section id="best-route" className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Star className="w-8 h-8 text-primary" />
              انتخاب بهترین مسیر بر اساس نوع کالا
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-2 border-blue-200 dark:border-blue-800">
                <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
                  <CardTitle className="text-center">🇨🇳 چین</CardTitle>
                  <CardDescription className="text-center">بهترین برای</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      لوازم الکترونیکی
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      ماشین‌آلات صنعتی
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      قطعات یدکی
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      لوازم خانگی
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      اسباب‌بازی و هدایا
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200 dark:border-green-800">
                <CardHeader className="bg-green-50 dark:bg-green-900/20">
                  <CardTitle className="text-center">🇦🇪 امارات</CardTitle>
                  <CardDescription className="text-center">بهترین برای</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      کالاهای برند
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      موبایل و تبلت
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      لوازم آرایشی
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      سفارشات فوری
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      نمونه و تست محصول
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-red-200 dark:border-red-800">
                <CardHeader className="bg-red-50 dark:bg-red-900/20">
                  <CardTitle className="text-center">🇹🇷 ترکیه</CardTitle>
                  <CardDescription className="text-center">بهترین برای</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      پوشاک و نساجی
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      مواد غذایی
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      مصالح ساختمانی
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      لوازم بهداشتی
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      مبلمان و دکوراسیون
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator className="my-8" />

          {/* FAQ Section */}
          <section id="faq" className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <FileText className="w-8 h-8 text-primary" />
              سوالات متداول
            </h2>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">بهترین مسیر واردات کالا به ایران کدام است؟</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    بهترین مسیر به نوع کالا، حجم، بودجه و زمان بستگی دارد. چین برای کالاهای صنعتی و الکترونیکی با حجم بالا، امارات برای سفارشات فوری و کالاهای برند، و ترکیه برای پوشاک و مواد غذایی مناسب‌تر هستند.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">هزینه واردات از چین به ایران چقدر است؟</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    هزینه حمل دریایی از چین حدود ۸۰ تا ۱۵۰ دلار به ازای هر مترمکعب (CBM) است. هزینه حمل هوایی بین ۳ تا ۶ دلار به ازای هر کیلوگرم متغیر است. این هزینه‌ها شامل حقوق گمرکی و مالیات نمی‌شود.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">زمان واردات کالا از ترکیه به ایران چقدر است؟</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    حمل زمینی از ترکیه به ایران از مرز بازرگان معمولاً ۵ تا ۱۰ روز طول می‌کشد. حمل دریایی از استانبول به بندرعباس ۱۰ تا ۱۵ روز زمان می‌برد.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">واردات از امارات بهتر است یا چین؟</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    واردات از امارات سریع‌تر (۳ تا ۷ روز) اما گران‌تر است. واردات از چین ارزان‌تر اما زمان‌بر (۲۵ تا ۴۵ روز) است. برای حجم بالا و بودجه محدود چین، برای سرعت و دسترسی به برندهای متنوع امارات مناسب‌تر است.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-primary/10 rounded-xl p-8 text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              نیاز به مشاوره برای انتخاب بهترین مسیر واردات دارید؟
            </h2>
            <p className="text-muted-foreground mb-6">
              کارشناسان ترخیصان با تجربه در واردات از چین، امارات و ترکیه آماده راهنمایی شما هستند.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link to="/contact">
                  مشاوره رایگان
                  <ArrowLeft className="w-4 h-4 mr-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:+989171070646">
                  تماس مستقیم: ۰۹۱۷۱۰۷۰۶۴۶
                </a>
              </Button>
            </div>
          </section>

          {/* Internal Links */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-foreground mb-4">مقالات مرتبط</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                to="/blog/dubai-to-abbas-import-guide"
                className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="text-primary font-medium">واردات از دبی به بندرعباس</span>
                <p className="text-sm text-muted-foreground">راهنمای کامل حمل و ترخیص</p>
              </Link>
              <Link
                to="/blog/international-shipping-guide"
                className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="text-primary font-medium">حمل و نقل بین‌المللی</span>
                <p className="text-sm text-muted-foreground">روش‌های حمل کالا به ایران</p>
              </Link>
              <Link
                to="/blog/customs-tariff-guide"
                className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="text-primary font-medium">تعرفه گمرکی</span>
                <p className="text-sm text-muted-foreground">محاسبه حقوق و عوارض واردات</p>
              </Link>
              <Link
                to="/blog/incoterms-guide"
                className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="text-primary font-medium">اینکوترمز</span>
                <p className="text-sm text-muted-foreground">شرایط تحویل بین‌المللی</p>
              </Link>
            </div>
          </section>

          {/* Related Articles */}
          <RelatedArticles currentPostId={29} />
        </article>
      </main>

      <Footer />
    </>
  );
};

export default ImportRoutesIranGuide;
