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
  Car,
  FileText,
  DollarSign,
  Clock,
  AlertCircle,
  CheckCircle,
  Zap,
  Leaf,
  Calculator,
  TrendingDown,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ArticleImage from "@/components/ArticleImage";

const ElectricCarTariffGuide = () => {
  useEffect(() => {
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "fa");
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://tarkhisun.com/blog/electric-car-tariff-guide" />
        <title>تعرفه واردات خودرو برقی و هیبریدی ۱۴۰۴ | حقوق گمرکی ۴ درصدی</title>
        <meta
          name="description"
          content="راهنمای کامل تعرفه جدید واردات خودرو برقی و هیبریدی در سال ۱۴۰۴: حقوق گمرکی ۴ درصد، شرایط واردات، مدارک لازم و مزایای خودروهای پاک"
        />
        <meta
          name="keywords"
          content="تعرفه واردات خودرو برقی, واردات خودرو هیبریدی, حقوق گمرکی خودرو برقی, تعرفه خودرو ۱۴۰۴, واردات خودرو پاک, گمرک خودرو برقی, ترخیص خودرو برقی, خودرو الکتریکی ایران"
        />
        

        {/* Open Graph Tags */}
        <meta property="og:title" content="تعرفه واردات خودرو برقی و هیبریدی ۱۴۰۴ | حقوق گمرکی ۴ درصدی" />
        <meta
          property="og:description"
          content="راهنمای کامل تعرفه جدید واردات خودرو برقی و هیبریدی با حقوق گمرکی ۴ درصد"
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://tarkhisun.com/blog/electric-car-tariff-guide" />
        <meta property="og:image" content="https://tarkhisun.com/images/blog/electric-car-charging.webp" />
        <meta property="og:locale" content="fa_IR" />

        {/* Article Tags */}
        <meta property="article:published_time" content="2025-03-20" />
        <meta property="article:modified_time" content="2025-03-20" />
        <meta property="article:author" content="تیم ترخیصان" />
        <meta property="article:section" content="تعرفه و مالیات" />
        <meta property="article:tag" content="خودرو برقی" />
        <meta property="article:tag" content="خودرو هیبریدی" />
        <meta property="article:tag" content="تعرفه گمرکی" />

        {/* Structured Data - Article */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "تعرفه واردات خودرو برقی و هیبریدی ۱۴۰۴ | حقوق گمرکی ۴ درصدی",
            description:
              "راهنمای کامل تعرفه جدید واردات خودرو برقی و هیبریدی در سال ۱۴۰۴ با حقوق گمرکی ۴ درصد",
            image: "https://tarkhisun.com/images/blog/electric-car-charging.webp",
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
            datePublished: "2025-03-20",
            dateModified: "2025-03-20",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://tarkhisun.com/blog/electric-car-tariff-guide",
            },
            keywords: ["تعرفه خودرو برقی", "واردات خودرو هیبریدی", "حقوق گمرکی ۴ درصد", "خودرو پاک"],
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
                name: "تعرفه واردات خودرو برقی در سال ۱۴۰۴ چقدر است؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "طبق مصوبه جدید، حقوق گمرکی واردات خودرو برقی در سال ۱۴۰۴ فقط ۴ درصد است که کاهش چشمگیری نسبت به خودروهای بنزینی دارد.",
                },
              },
              {
                "@type": "Question",
                name: "تفاوت تعرفه خودرو برقی و هیبریدی چیست؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "خودروهای تمام برقی (EV) با حقوق گمرکی ۴ درصد و خودروهای هیبریدی پلاگین با ۸ درصد مشمول تعرفه ترجیحی هستند.",
                },
              },
              {
                "@type": "Question",
                name: "شرایط واردات خودرو برقی به ایران چیست؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "شرایط شامل داشتن کارت بازرگانی، ثبت سفارش در سامانه جامع تجارت، گواهی استاندارد و رعایت محدودیت سن خودرو (حداکثر ۳ سال) است.",
                },
              },
              {
                "@type": "Question",
                name: "آیا واردات خودرو برقی دست دوم مجاز است؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "بله، واردات خودرو برقی کارکرده با حداکثر ۳ سال سن از سال ساخت مجاز است و از تعرفه ترجیحی برخوردار می‌شود.",
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
          <ArticleBreadcrumb category="تعرفه و مالیات" articleTitle="تعرفه واردات خودرو برقی و هیبریدی ۱۴۰۴" />

          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-relaxed">
              تعرفه جدید واردات خودرو برقی و هیبریدی در ۱۴۰۴: حقوق گمرکی ۴ درصدی
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                ۱۸ دقیقه مطالعه
              </span>
              <span>تاریخ انتشار: ۱۴۰۴/۱/۳۰</span>
              <span>نویسنده: تیم ترخیصان</span>
            </div>
          </header>

          {/* Featured Image */}
          <ArticleImage
            src="/images/blog/electric-car-charging.webp"
            alt="خودرو برقی در حال شارژ - تعرفه واردات خودرو برقی ۱۴۰۴"
            caption="کاهش تعرفه واردات خودرو برقی به ۴ درصد، فرصتی برای توسعه حمل‌ونقل پاک"
          />

          {/* Introduction */}
          <section className="prose prose-lg max-w-none mb-8">
            <p className="text-lg text-foreground leading-relaxed mb-6">
              در راستای حمایت از محیط زیست و کاهش آلودگی هوا، دولت در سال <strong>۱۴۰۴</strong> تعرفه‌های ویژه‌ای برای واردات <strong>خودروهای برقی</strong> و <strong>هیبریدی</strong> تصویب کرده است. با کاهش <strong>حقوق گمرکی به ۴ درصد</strong>، واردات خودروهای پاک به صرفه‌تر از همیشه شده است. در این راهنما، تمام جزئیات تعرفه جدید، شرایط واردات و مزایای خودروهای الکتریکی را بررسی می‌کنیم.
            </p>
          </section>

          <Separator className="my-8" />

          {/* Table of Contents */}
          <nav className="bg-muted/50 rounded-lg p-6 mb-8" aria-label="فهرست مطالب">
            <h2 className="text-xl font-bold text-foreground mb-4">فهرست مطالب</h2>
            <ul className="space-y-2 text-primary">
              <li>
                <a href="#new-tariff" className="hover:underline flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  تعرفه جدید واردات خودرو برقی ۱۴۰۴
                </a>
              </li>
              <li>
                <a href="#ev-vs-hybrid" className="hover:underline flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  تفاوت تعرفه خودرو برقی و هیبریدی
                </a>
              </li>
              <li>
                <a href="#import-conditions" className="hover:underline flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  شرایط واردات خودرو برقی
                </a>
              </li>
              <li>
                <a href="#documents" className="hover:underline flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  مدارک لازم برای ترخیص
                </a>
              </li>
              <li>
                <a href="#cost-calculation" className="hover:underline flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  محاسبه هزینه واردات
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

          {/* New Tariff Section */}
          <section id="new-tariff" className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Zap className="w-8 h-8 text-primary" />
              تعرفه جدید واردات خودرو برقی ۱۴۰۴
            </h2>

            <p className="text-foreground leading-relaxed mb-6">
              بر اساس مصوبه هیئت وزیران در اسفند ۱۴۰۳، <strong>حقوق ورودی خودروهای برقی</strong> از سال ۱۴۰۴ به <strong>۴ درصد</strong> کاهش یافته است. این تعرفه ترجیحی در مقایسه با خودروهای بنزینی که تعرفه ۱۰۰ تا ۱۳۰ درصدی دارند، فرصت استثنایی برای واردکنندگان ایجاد کرده است.
            </p>

            <Card className="mb-6 border-2 border-green-200 dark:border-green-800">
              <CardHeader className="bg-green-50 dark:bg-green-900/20">
                <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                  <TrendingDown className="w-5 h-5" />
                  خلاصه تعرفه‌های جدید ۱۴۰۴
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <Zap className="w-10 h-10 mx-auto mb-2 text-green-600" />
                    <h4 className="font-bold text-foreground text-lg">خودرو تمام برقی</h4>
                    <p className="text-3xl font-bold text-green-600 my-2">۴٪</p>
                    <p className="text-sm text-muted-foreground">حقوق گمرکی</p>
                  </div>
                  <div className="text-center p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Leaf className="w-10 h-10 mx-auto mb-2 text-blue-600" />
                    <h4 className="font-bold text-foreground text-lg">هیبریدی پلاگین</h4>
                    <p className="text-3xl font-bold text-blue-600 my-2">۸٪</p>
                    <p className="text-sm text-muted-foreground">حقوق گمرکی</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                    <Car className="w-10 h-10 mx-auto mb-2 text-yellow-600" />
                    <h4 className="font-bold text-foreground text-lg">هیبریدی معمولی</h4>
                    <p className="text-3xl font-bold text-yellow-600 my-2">۱۵٪</p>
                    <p className="text-sm text-muted-foreground">حقوق گمرکی</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-6">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <h4 className="font-bold text-foreground">نکته مهم</h4>
                <p className="text-sm text-muted-foreground">
                  این تعرفه‌ها فقط شامل حقوق ورودی است. مالیات بر ارزش افزوده (۱۰٪) و سایر عوارض جداگانه محاسبه می‌شود.
                </p>
              </div>
            </div>
          </section>

          <Separator className="my-8" />

          {/* EV vs Hybrid Section */}
          <section id="ev-vs-hybrid" className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Car className="w-8 h-8 text-primary" />
              تفاوت تعرفه خودرو برقی و هیبریدی
            </h2>

            <ArticleImage
              src="/images/blog/hybrid-car-showroom.webp"
              alt="نمایشگاه خودروهای برقی و هیبریدی - مقایسه تعرفه واردات"
              caption="انتخاب بین خودرو برقی و هیبریدی به نیاز و شرایط استفاده بستگی دارد"
            />

            <div className="overflow-x-auto mt-6">
              <table className="w-full border-collapse border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border p-4 text-right">نوع خودرو</th>
                    <th className="border border-border p-4 text-center">حقوق ورودی</th>
                    <th className="border border-border p-4 text-center">مالیات ارزش افزوده</th>
                    <th className="border border-border p-4 text-center">عوارض شهرداری</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border p-4 font-medium">
                      <span className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-green-600" />
                        خودرو تمام برقی (BEV)
                      </span>
                    </td>
                    <td className="border border-border p-4 text-center text-green-600 font-bold">۴٪</td>
                    <td className="border border-border p-4 text-center">۱۰٪</td>
                    <td className="border border-border p-4 text-center">معاف</td>
                  </tr>
                  <tr className="bg-muted/30">
                    <td className="border border-border p-4 font-medium">
                      <span className="flex items-center gap-2">
                        <Leaf className="w-4 h-4 text-blue-600" />
                        هیبریدی پلاگین (PHEV)
                      </span>
                    </td>
                    <td className="border border-border p-4 text-center text-blue-600 font-bold">۸٪</td>
                    <td className="border border-border p-4 text-center">۱۰٪</td>
                    <td className="border border-border p-4 text-center">۵٪</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-4 font-medium">
                      <span className="flex items-center gap-2">
                        <Car className="w-4 h-4 text-yellow-600" />
                        هیبریدی معمولی (HEV)
                      </span>
                    </td>
                    <td className="border border-border p-4 text-center text-yellow-600 font-bold">۱۵٪</td>
                    <td className="border border-border p-4 text-center">۱۰٪</td>
                    <td className="border border-border p-4 text-center">۱۰٪</td>
                  </tr>
                  <tr className="bg-muted/30">
                    <td className="border border-border p-4 font-medium">
                      <span className="flex items-center gap-2">
                        <Car className="w-4 h-4 text-red-600" />
                        بنزینی (مقایسه)
                      </span>
                    </td>
                    <td className="border border-border p-4 text-center text-red-600 font-bold">۱۰۰-۱۳۰٪</td>
                    <td className="border border-border p-4 text-center">۱۰٪</td>
                    <td className="border border-border p-4 text-center">۱۵٪</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Import Conditions Section */}
          <section id="import-conditions" className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Shield className="w-8 h-8 text-primary" />
              شرایط واردات خودرو برقی به ایران
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    شرایط مجاز
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1" />
                      <span>حداکثر ۳ سال از سال ساخت</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1" />
                      <span>داشتن گواهی استاندارد ملی</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1" />
                      <span>ثبت سفارش در سامانه جامع تجارت</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1" />
                      <span>داشتن کارت بازرگانی معتبر</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1" />
                      <span>برند و مدل مجاز (لیست وزارت صمت)</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <AlertCircle className="w-5 h-5" />
                    محدودیت‌ها
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 mt-1" />
                      <span>خودروهای بیش از ۳ سال ممنوع</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 mt-1" />
                      <span>سقف ارزش: ۷۰,۰۰۰ دلار</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 mt-1" />
                      <span>تعداد محدود برای هر کارت بازرگانی</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 mt-1" />
                      <span>خودروهای آمریکایی ممنوع (تحریم)</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Documents Section */}
          <section id="documents" className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <FileText className="w-8 h-8 text-primary" />
              مدارک لازم برای ترخیص خودرو برقی
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-bold text-foreground mb-3">مدارک اصلی</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• پروفرما و اینویس نهایی</li>
                  <li>• بارنامه (B/L یا AWB)</li>
                  <li>• گواهی مبدأ</li>
                  <li>• بیمه‌نامه حمل</li>
                  <li>• پکینگ لیست</li>
                </ul>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-bold text-foreground mb-3">مدارک خودرو</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• سند مالکیت خودرو (Title)</li>
                  <li>• کارت شناسایی خودرو (VIN)</li>
                  <li>• گواهی استاندارد باتری</li>
                  <li>• مشخصات فنی خودرو</li>
                  <li>• تأییدیه سازمان محیط زیست</li>
                </ul>
              </div>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Cost Calculation Section */}
          <section id="cost-calculation" className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Calculator className="w-8 h-8 text-primary" />
              محاسبه هزینه واردات خودرو برقی
            </h2>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>مثال محاسبه: خودرو برقی ۵۰,۰۰۰ دلاری</CardTitle>
                <CardDescription>فرض: نرخ ارز گمرکی ۶۰,۰۰۰ تومان</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-muted/50 rounded">
                    <span>ارزش CIF خودرو</span>
                    <span className="font-bold">۵۰,۰۰۰ دلار = ۳,۰۰۰,۰۰۰,۰۰۰ تومان</span>
                  </div>
                  <div className="flex justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded">
                    <span>حقوق ورودی (۴٪)</span>
                    <span className="font-bold text-green-600">۱۲۰,۰۰۰,۰۰۰ تومان</span>
                  </div>
                  <div className="flex justify-between p-3 bg-muted/50 rounded">
                    <span>مالیات ارزش افزوده (۱۰٪)</span>
                    <span className="font-bold">۳۱۲,۰۰۰,۰۰۰ تومان</span>
                  </div>
                  <div className="flex justify-between p-3 bg-muted/50 rounded">
                    <span>هزینه حمل و بیمه (تقریبی)</span>
                    <span className="font-bold">۵۰,۰۰۰,۰۰۰ تومان</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between p-3 bg-primary/10 rounded">
                    <span className="font-bold">هزینه کل تقریبی</span>
                    <span className="font-bold text-primary">۳,۴۸۲,۰۰۰,۰۰۰ تومان</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <DollarSign className="w-5 h-5 text-yellow-600 mt-1" />
              <div>
                <h4 className="font-bold text-foreground">صرفه‌جویی نسبت به بنزینی</h4>
                <p className="text-sm text-muted-foreground">
                  اگر همین خودرو بنزینی بود، با تعرفه ۱۰۰٪ حدود ۶ میلیارد تومان هزینه داشت. یعنی <strong>حدود ۲.۵ میلیارد تومان صرفه‌جویی!</strong>
                </p>
              </div>
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
                  <CardTitle className="text-lg">تعرفه واردات خودرو برقی در سال ۱۴۰۴ چقدر است؟</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    حقوق گمرکی واردات خودروهای تمام برقی (BEV) در سال ۱۴۰۴ فقط <strong>۴ درصد</strong> است. خودروهای هیبریدی پلاگین ۸ درصد و هیبریدی معمولی ۱۵ درصد تعرفه دارند.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">تفاوت تعرفه خودرو برقی و هیبریدی چیست؟</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    خودروهای تمام برقی با ۴٪، هیبریدی پلاگین با ۸٪ و هیبریدی معمولی با ۱۵٪ حقوق گمرکی مشمول تعرفه هستند. هرچه سهم موتور الکتریکی بیشتر باشد، تعرفه کمتر است.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">شرایط واردات خودرو برقی به ایران چیست؟</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    داشتن کارت بازرگانی، ثبت سفارش در سامانه جامع تجارت، گواهی استاندارد ملی، تأییدیه محیط زیست و رعایت محدودیت سن خودرو (حداکثر ۳ سال) از شرایط اصلی است.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">آیا واردات خودرو برقی دست دوم مجاز است؟</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    بله، واردات خودرو برقی کارکرده با <strong>حداکثر ۳ سال سن</strong> از سال ساخت مجاز است و از تعرفه ترجیحی ۴ درصدی برخوردار می‌شود.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-primary/10 rounded-xl p-8 text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              نیاز به مشاوره برای واردات خودرو برقی دارید؟
            </h2>
            <p className="text-muted-foreground mb-6">
              کارشناسان ترخیصان با تجربه در ترخیص خودروهای برقی و هیبریدی آماده راهنمایی شما هستند.
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
                to="/blog/customs-tariff-guide"
                className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="text-primary font-medium">تعرفه گمرکی</span>
                <p className="text-sm text-muted-foreground">راهنمای کامل انواع تعرفه و محاسبه</p>
              </Link>
              <Link
                to="/blog/imported-car-system-guide"
                className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="text-primary font-medium">سامانه خودروهای وارداتی</span>
                <p className="text-sm text-muted-foreground">ثبت‌نام و پیگیری واردات خودرو</p>
              </Link>
              <Link
                to="/blog/hs-code-guide"
                className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="text-primary font-medium">کد HS کالا</span>
                <p className="text-sm text-muted-foreground">کد تعرفه خودرو برقی و هیبریدی</p>
              </Link>
              <Link
                to="/blog/import-routes-iran-guide"
                className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="text-primary font-medium">مسیرهای واردات</span>
                <p className="text-sm text-muted-foreground">بهترین مسیر واردات خودرو</p>
              </Link>
            </div>
          </section>

          {/* Related Articles */}
          <RelatedArticles currentPostId={30} />
        </article>
      </main>

      <Footer />
    </>
  );
};

export default ElectricCarTariffGuide;
