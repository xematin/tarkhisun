import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleBreadcrumb from "@/components/ArticleBreadcrumb";
import ArticleImage from "@/components/ArticleImage";
import RelatedArticles from "@/components/RelatedArticles";
import CustomsTariffCalculator from "@/components/CustomsTariffCalculator";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Car, 
  Smartphone, 
  Calculator, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  Zap,
  Fuel,
  Battery,
  DollarSign,
  Percent,
  Phone
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

const CustomsTariff2025Guide = () => {
  useEffect(() => {
    document.documentElement.dir = "rtl";
    document.documentElement.lang = "fa";
    window.scrollTo(0, 0);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": "https://tarkhisun.com/blog/customs-tariff-2025-guide#article",
        headline: "تعرفه گمرکی ۱۴۰۵ براساس لایحه بودجه | خودرو، گوشی و کالا",
        description: "راهنمای کامل تعرفه‌های گمرکی سال ۱۴۰۵ براساس لایحه بودجه: حقوق ورودی خودرو برقی ۴٪، هیبریدی ۱۵٪، بنزینی ۳۲٪ تا ۱۳۰٪، تعرفه گوشی موبایل ۴۰٪ و نرخ تسعیر ارز ۹۴,۳۰۰ تومان",
        image: "https://tarkhisun.com/images/blog/customs-tariff-2025-vehicles.webp",
        datePublished: "2025-01-15T10:00:00+03:30",
        dateModified: "2025-01-15T10:00:00+03:30",
        author: {
          "@type": "Organization",
          name: "تیم ترخیصان",
          url: "https://tarkhisun.com"
        },
        publisher: {
          "@type": "Organization",
          name: "ترخیصان",
          logo: {
            "@type": "ImageObject",
            url: "https://tarkhisun.com/logo.png"
          }
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": "https://tarkhisun.com/blog/customs-tariff-2025-guide"
        },
        keywords: "تعرفه گمرکی ۱۴۰۵، لایحه بودجه ۱۴۰۵، حقوق ورودی خودرو، تعرفه واردات گوشی، نرخ ارز گمرکی، خودرو برقی، خودرو هیبریدی"
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://tarkhisun.com/blog/customs-tariff-2025-guide#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "خانه",
            item: "https://tarkhisun.com"
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "بلاگ",
            item: "https://tarkhisun.com/blog"
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "تعرفه گمرکی ۱۴۰۵ براساس لایحه بودجه",
            item: "https://tarkhisun.com/blog/customs-tariff-2025-guide"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://tarkhisun.com/blog/customs-tariff-2025-guide#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "حقوق ورودی خودرو برقی در سال ۱۴۰۵ چند درصد است؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "براساس لایحه بودجه ۱۴۰۵، حقوق ورودی خودروهای برقی ۴ درصد تعیین شده است که کمترین تعرفه در بین انواع خودروها است."
            }
          },
          {
            "@type": "Question",
            name: "نرخ ارز گمرکی برای محاسبه حقوق ورودی در سال ۱۴۰۵ چقدر است؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "نرخ تسعیر ارز برای محاسبه حقوق ورودی گمرکی در لایحه بودجه ۱۴۰۵، مبلغ ۹۴,۳۰۰ تومان (۹۴۳,۰۰۰ ریال) تعیین شده است."
            }
          },
          {
            "@type": "Question",
            name: "تعرفه واردات گوشی موبایل بالای ۶۰۰ یورو در سال ۱۴۰۵ چقدر است؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "حقوق ورودی گوشی‌های موبایل با ارزش بیش از ۶۰۰ یورو، ۴۰ درصد تعیین شده و هزینه رجیستری ۹۰۰ هزار تومان است."
            }
          },
          {
            "@type": "Question",
            name: "تعرفه واردات خودرو بنزینی بالای ۳۰۰۰ سی‌سی چقدر است؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "براساس لایحه بودجه ۱۴۰۵، حقوق ورودی خودروهای بنزینی با حجم موتور بالای ۳۰۰۰ سی‌سی، ۱۳۰ درصد تعیین شده است."
            }
          },
          {
            "@type": "Question",
            name: "تفاوت نرخ ارز گمرکی با نرخ بازار آزاد چیست؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "نرخ ارز گمرکی ۹۴,۳۰۰ تومان نرخی ثابت است که در لایحه بودجه تعیین می‌شود و صرفاً برای محاسبه حقوق ورودی گمرکی استفاده می‌شود. این نرخ معمولاً با نرخ بازار آزاد تفاوت دارد."
            }
          },
          {
            "@type": "Question",
            name: "آیا تعرفه‌های گمرکی ۱۴۰۵ قطعی است؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "تعرفه‌های اعلام شده براساس لایحه بودجه است. پس از تصویب نهایی در مجلس و شورای نگهبان، این تعرفه‌ها قطعی خواهند شد و ممکن است تغییراتی داشته باشند."
            }
          },
          {
            "@type": "Question",
            name: "هزینه کامل ترخیص خودرو برقی چقدر است؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "برای خودرو برقی ۳۵,۰۰۰ دلاری: حقوق ورودی ۴٪ معادل ۱۳۲ میلیون تومان، مالیات ارزش افزوده ۱۰٪ معادل ۳۴۳ میلیون تومان و مجموع هزینه ترخیص حدود ۴۷۵ میلیون تومان است."
            }
          },
          {
            "@type": "Question",
            name: "تعرفه گوشی زیر ۶۰۰ یورو چقدر است؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "حقوق ورودی گوشی‌های موبایل با ارزش کمتر از ۶۰۰ یورو، ۱۲ درصد است و هزینه رجیستری ۹۰۰ هزار تومان به آن اضافه می‌شود."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://tarkhisun.com/blog/customs-tariff-2025-guide" />
        <title>تعرفه گمرکی ۱۴۰۵ براساس لایحه بودجه | خودرو، گوشی و کالا | ترخیصان</title>
        <meta
          name="description"
          content="راهنمای کامل تعرفه‌های گمرکی سال ۱۴۰۵ براساس لایحه بودجه: حقوق ورودی خودرو برقی ۴٪، هیبریدی ۱۵٪، بنزینی ۳۲٪ تا ۱۳۰٪، تعرفه گوشی موبایل و نرخ تسعیر ارز"
        />
        <meta
          name="keywords"
          content="تعرفه گمرکی ۱۴۰۵، لایحه بودجه ۱۴۰۵ گمرک، حقوق ورودی خودرو ۱۴۰۵، تعرفه واردات گوشی ۱۴۰۵، نرخ ارز گمرکی ۱۴۰۵، تعرفه خودرو برقی، تعرفه خودرو هیبریدی، حقوق گمرکی خودرو بنزینی، رجیستری گوشی ۱۴۰۵"
        />
        
        <meta property="og:title" content="تعرفه گمرکی ۱۴۰۵ براساس لایحه بودجه | خودرو، گوشی و کالا" />
        <meta property="og:description" content="راهنمای کامل تعرفه‌های گمرکی ۱۴۰۵: حقوق ورودی خودرو برقی ۴٪، هیبریدی ۱۵٪، تعرفه گوشی ۴۰٪ و نرخ ارز ۹۴,۳۰۰ تومان" />
        <meta property="og:url" content="https://tarkhisun.com/blog/customs-tariff-2025-guide" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://tarkhisun.com/images/blog/customs-tariff-2025-vehicles.webp" />
        <meta property="og:locale" content="fa_IR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="تعرفه گمرکی ۱۴۰۵ براساس لایحه بودجه" />
        <meta name="twitter:description" content="راهنمای کامل تعرفه‌های گمرکی ۱۴۰۵ براساس لایحه بودجه کشور" />
        <meta name="twitter:image" content="https://tarkhisun.com/images/blog/customs-tariff-2025-vehicles.webp" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <ArticleBreadcrumb category="تعرفه و مالیات" articleTitle="تعرفه گمرکی ۱۴۰۵ براساس لایحه بودجه" />
            
            <div className="mt-8 text-center max-w-4xl mx-auto">
              <span className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <FileText className="w-4 h-4" />
                براساس لایحه بودجه ۱۴۰۵
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-persian leading-relaxed">
                تعرفه گمرکی ۱۴۰۵ براساس لایحه بودجه
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground text-persian leading-relaxed">
                راهنمای کامل حقوق ورودی خودرو، گوشی موبایل و کالاها در سال ۱۴۰۵
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calculator className="w-4 h-4" />
                  ۲۵ دقیقه مطالعه
                </span>
                <span>تیم ترخیصان</span>
                <span>۱۴۰۴/۱۰/۲۵</span>
              </div>
            </div>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-card rounded-xl p-6 shadow-sm border">
              <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2 text-persian">
                <FileText className="w-5 h-5 text-primary" />
                فهرست مطالب
              </h2>
              <nav className="grid md:grid-cols-2 gap-2 text-persian">
                <a href="#vehicle-tariffs" className="text-muted-foreground hover:text-primary transition-colors py-1">
                  ۱. تعرفه واردات خودرو ۱۴۰۵
                </a>
                <a href="#mobile-tariffs" className="text-muted-foreground hover:text-primary transition-colors py-1">
                  ۲. تعرفه گوشی موبایل و تجهیزات هوشمند
                </a>
                <a href="#exchange-rate" className="text-muted-foreground hover:text-primary transition-colors py-1">
                  ۳. نرخ ارز گمرکی ۱۴۰۵
                </a>
                <a href="#taxes" className="text-muted-foreground hover:text-primary transition-colors py-1">
                  ۴. مالیات و عوارض گمرکی
                </a>
                <a href="#comparison" className="text-muted-foreground hover:text-primary transition-colors py-1">
                  ۵. مقایسه با سال ۱۴۰۴
                </a>
                <a href="#faq" className="text-muted-foreground hover:text-primary transition-colors py-1">
                  ۶. سوالات متداول
                </a>
              </nav>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Article */}
              <div className="lg:col-span-2 space-y-10">
                
                {/* Introduction */}
                <section className="prose prose-lg max-w-none text-persian">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    لایحه بودجه سال ۱۴۰۵ کل کشور با تغییرات مهمی در حوزه <strong>تعرفه‌های گمرکی</strong> همراه است. 
                    این تغییرات شامل <strong>کاهش چشمگیر حقوق ورودی خودروهای برقی</strong> به ۴ درصد، 
                    <strong>تعیین نرخ تسعیر ارز گمرکی</strong> ۹۴,۳۰۰ تومان و تغییرات در تعرفه گوشی موبایل می‌شود. 
                    در این مقاله، تمام جزئیات تعرفه‌های گمرکی ۱۴۰۵ را براساس لایحه بودجه بررسی می‌کنیم.
                  </p>
                </section>

                <ArticleImage 
                  src="/images/blog/customs-tariff-2025-guide.webp"
                  alt="تعرفه واردات خودرو در سال ۱۴۰۵ - جدول حقوق ورودی خودروهای برقی، هیبریدی و بنزینی"
                  caption="تعرفه واردات انواع خودرو در لایحه بودجه ۱۴۰۵"
                  priority={true}
                />

                {/* Vehicle Tariffs Section */}
                <section id="vehicle-tariffs" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <Car className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground text-persian">
                      تعرفه واردات خودرو در سال ۱۴۰۵
                    </h2>
                  </div>

                  <p className="text-muted-foreground mb-6 text-persian leading-relaxed">
                    براساس لایحه بودجه ۱۴۰۵، <strong>حقوق ورودی خودروها</strong> بر اساس نوع سوخت و حجم موتور تعیین شده است. 
                    خودروهای برقی با کمترین تعرفه و خودروهای بنزینی لوکس با بالاترین تعرفه مواجه هستند:
                  </p>

                  <div className="bg-card rounded-xl border overflow-hidden mb-8">
                    <div className="bg-primary/10 px-6 py-4 border-b">
                      <h3 className="font-bold text-lg text-foreground text-persian flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-primary" />
                        جدول کامل تعرفه واردات خودرو ۱۴۰۵
                      </h3>
                    </div>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-muted/50">
                            <TableHead className="text-right text-persian font-bold">نوع خودرو</TableHead>
                            <TableHead className="text-right text-persian font-bold">حجم موتور</TableHead>
                            <TableHead className="text-center text-persian font-bold">حقوق ورودی</TableHead>
                            <TableHead className="text-center text-persian font-bold">وضعیت</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="bg-green-500/10">
                            <TableCell className="text-persian font-medium">
                              <div className="flex items-center gap-2">
                                <Battery className="w-4 h-4 text-green-600" />
                                خودرو برقی
                              </div>
                            </TableCell>
                            <TableCell className="text-persian text-muted-foreground">همه حجم‌ها</TableCell>
                            <TableCell className="text-center">
                              <span className="bg-green-500/20 text-green-700 px-3 py-1 rounded-full font-bold">۴٪</span>
                            </TableCell>
                            <TableCell className="text-center">
                              <span className="text-green-600 text-sm">✓ کمترین تعرفه</span>
                            </TableCell>
                          </TableRow>
                          <TableRow className="bg-blue-500/10">
                            <TableCell className="text-persian font-medium">
                              <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4 text-blue-600" />
                                خودرو هیبریدی پلاگین
                              </div>
                            </TableCell>
                            <TableCell className="text-persian text-muted-foreground">همه حجم‌ها</TableCell>
                            <TableCell className="text-center">
                              <span className="bg-blue-500/20 text-blue-700 px-3 py-1 rounded-full font-bold">۱۵٪</span>
                            </TableCell>
                            <TableCell className="text-center">
                              <span className="text-blue-600 text-sm">تشویقی</span>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="text-persian font-medium">
                              <div className="flex items-center gap-2">
                                <Fuel className="w-4 h-4 text-orange-600" />
                                خودرو بنزینی
                              </div>
                            </TableCell>
                            <TableCell className="text-persian text-muted-foreground">زیر ۱۵۰۰ سی‌سی</TableCell>
                            <TableCell className="text-center">
                              <span className="bg-orange-500/20 text-orange-700 px-3 py-1 rounded-full font-bold">۳۲٪</span>
                            </TableCell>
                            <TableCell className="text-center">
                              <span className="text-orange-600 text-sm">کم‌مصرف</span>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="text-persian font-medium">
                              <div className="flex items-center gap-2">
                                <Fuel className="w-4 h-4 text-orange-600" />
                                خودرو بنزینی
                              </div>
                            </TableCell>
                            <TableCell className="text-persian text-muted-foreground">۱۵۰۰ تا ۲۰۰۰ سی‌سی</TableCell>
                            <TableCell className="text-center">
                              <span className="bg-orange-500/20 text-orange-700 px-3 py-1 rounded-full font-bold">۶۵٪</span>
                            </TableCell>
                            <TableCell className="text-center">
                              <span className="text-muted-foreground text-sm">متوسط</span>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="text-persian font-medium">
                              <div className="flex items-center gap-2">
                                <Fuel className="w-4 h-4 text-orange-600" />
                                خودرو بنزینی
                              </div>
                            </TableCell>
                            <TableCell className="text-persian text-muted-foreground">۲۰۰۰ تا ۲۵۰۰ سی‌سی</TableCell>
                            <TableCell className="text-center">
                              <span className="bg-orange-500/20 text-orange-700 px-3 py-1 rounded-full font-bold">۱۰۰٪</span>
                            </TableCell>
                            <TableCell className="text-center">
                              <span className="text-muted-foreground text-sm">پرمصرف</span>
                            </TableCell>
                          </TableRow>
                          <TableRow className="bg-red-500/10">
                            <TableCell className="text-persian font-medium">
                              <div className="flex items-center gap-2">
                                <Fuel className="w-4 h-4 text-red-600" />
                                خودرو بنزینی لوکس
                              </div>
                            </TableCell>
                            <TableCell className="text-persian text-muted-foreground">بالای ۳۰۰۰ سی‌سی</TableCell>
                            <TableCell className="text-center">
                              <span className="bg-red-500/20 text-red-700 px-3 py-1 rounded-full font-bold">۱۳۰٪</span>
                            </TableCell>
                            <TableCell className="text-center">
                              <span className="text-red-600 text-sm">بالاترین تعرفه</span>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>

                  {/* Key Points */}
                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    <div className="bg-green-500/10 rounded-xl p-5 border border-green-500/20">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-600 mt-1" />
                        <div>
                          <h4 className="font-bold text-foreground mb-2 text-persian">مزیت خودرو برقی</h4>
                          <p className="text-muted-foreground text-sm text-persian">
                            با تعرفه ۴ درصدی، واردات خودرو برقی تا ۸ برابر ارزان‌تر از خودرو بنزینی است.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-blue-500/10 rounded-xl p-5 border border-blue-500/20">
                      <div className="flex items-start gap-3">
                        <Zap className="w-6 h-6 text-blue-600 mt-1" />
                        <div>
                          <h4 className="font-bold text-foreground mb-2 text-persian">تشویق هیبریدی</h4>
                          <p className="text-muted-foreground text-sm text-persian">
                            خودروهای هیبریدی پلاگین با ۱۵٪ تعرفه، گزینه مناسبی برای واردات هستند.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Car Calculation Example */}
                  <div className="bg-gradient-to-r from-green-500/10 to-green-500/5 rounded-xl p-6 border border-green-500/20">
                    <h4 className="font-bold text-lg text-foreground mb-4 text-persian flex items-center gap-2">
                      <Calculator className="w-5 h-5 text-green-600" />
                      مثال عملی: محاسبه تعرفه خودرو برقی تسلا مدل ۳
                    </h4>
                    <p className="text-muted-foreground mb-4 text-persian">
                      فرض کنید یک خودرو برقی تسلا مدل ۳ به ارزش CIF <strong>۳۵,۰۰۰ دلار</strong> وارد می‌شود:
                    </p>
                    <div className="space-y-2 text-persian">
                      <div className="flex justify-between p-3 bg-background/50 rounded-lg">
                        <span>ارزش ارزی خودرو (CIF):</span>
                        <span className="font-mono font-bold">۳۵,۰۰۰ دلار</span>
                      </div>
                      <div className="flex justify-between p-3 bg-background/50 rounded-lg">
                        <span>تبدیل به ریال (× ۹۴,۳۰۰):</span>
                        <span className="font-mono">۳,۳۰۰,۵۰۰,۰۰۰ تومان</span>
                      </div>
                      <div className="flex justify-between p-3 bg-background/50 rounded-lg">
                        <span>حقوق ورودی (۴٪ خودرو برقی):</span>
                        <span className="font-mono">۱۳۲,۰۲۰,۰۰۰ تومان</span>
                      </div>
                      <div className="flex justify-between p-3 bg-background/50 rounded-lg">
                        <span>مالیات ارزش افزوده (۱۰٪):</span>
                        <span className="font-mono">۳۴۳,۲۵۲,۰۰۰ تومان</span>
                      </div>
                      <div className="flex justify-between p-3 bg-green-500/20 rounded-lg font-bold">
                        <span>مجموع هزینه ترخیص:</span>
                        <span className="font-mono text-green-700">≈ ۴۷۵,۰۰۰,۰۰۰ تومان</span>
                      </div>
                    </div>
                    <div className="mt-4 p-4 bg-green-500/10 rounded-lg">
                      <p className="text-sm text-muted-foreground text-persian">
                        <strong className="text-green-700">نکته:</strong> همین خودرو اگر بنزینی بود با تعرفه ۱۰۰٪، هزینه ترخیص آن بیش از ۳,۶۰۰,۰۰۰,۰۰۰ تومان می‌شد!
                      </p>
                    </div>
                  </div>

                  {/* Calculator Component */}
                  <div className="mt-8">
                    <CustomsTariffCalculator />
                  </div>

                  {/* Related Link */}
                  <div className="mt-6 p-4 bg-muted/30 rounded-xl border">
                    <p className="text-muted-foreground text-persian text-sm">
                      📖 برای اطلاعات بیشتر درباره واردات خودرو برقی، مقاله 
                      <Link to="/blog/electric-car-tariff-guide" className="text-primary hover:underline mx-1">
                        راهنمای تعرفه واردات خودرو برقی
                      </Link>
                      را مطالعه کنید.
                    </p>
                  </div>
                </section>

                {/* Mobile Tariffs Section */}
                <section id="mobile-tariffs" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <Smartphone className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground text-persian">
                      تعرفه گوشی موبایل و تجهیزات هوشمند ۱۴۰۵
                    </h2>
                  </div>

                  <ArticleImage 
                    src="/images/blog/customs-tariff-2025-mobile.webp"
                    alt="تعرفه واردات گوشی موبایل در سال ۱۴۰۵ - هزینه رجیستری و حقوق گمرکی"
                    caption="تعرفه واردات گوشی موبایل و تجهیزات هوشمند در لایحه بودجه ۱۴۰۵"
                  />

                  <div className="bg-card rounded-xl border p-6 mb-6">
                    <h3 className="font-bold text-lg text-foreground mb-4 text-persian flex items-center gap-2">
                      <Phone className="w-5 h-5 text-primary" />
                      جزئیات تعرفه گوشی موبایل
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                        <span className="text-persian font-medium">حقوق ورودی گوشی زیر ۶۰۰ یورو</span>
                        <span className="bg-green-500/20 text-green-700 px-4 py-2 rounded-full font-bold">۱۲٪</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                        <span className="text-persian font-medium">حقوق ورودی گوشی بالای ۶۰۰ یورو</span>
                        <span className="bg-red-500/20 text-red-700 px-4 py-2 rounded-full font-bold">۴۰٪</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                        <span className="text-persian font-medium">هزینه رجیستری (ثابت)</span>
                        <span className="bg-primary/20 text-primary px-4 py-2 rounded-full font-bold">۹۰۰,۰۰۰ تومان</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                        <span className="text-persian font-medium">نرخ تسعیر ارز گمرکی</span>
                        <span className="bg-primary/20 text-primary px-4 py-2 rounded-full font-bold">۹۴,۳۰۰ تومان</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-500/10 rounded-xl p-5 border border-amber-500/20 mb-6">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-6 h-6 text-amber-600 mt-1" />
                      <div>
                        <h4 className="font-bold text-foreground mb-2 text-persian">نکته مهم</h4>
                        <p className="text-muted-foreground text-sm text-persian">
                          هزینه رجیستری (۹ میلیون ریال) برابر با ۹۰۰ هزار تومان است. این مبلغ علاوه بر حقوق ورودی 
                          گمرکی محاسبه می‌شود و برای ثبت IMEI گوشی در سامانه همتا ضروری است.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Calculation Example */}
                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-6 border">
                    <h4 className="font-bold text-lg text-foreground mb-4 text-persian flex items-center gap-2">
                      <Calculator className="w-5 h-5 text-primary" />
                      مثال محاسبه تعرفه گوشی
                    </h4>
                    <p className="text-muted-foreground mb-4 text-persian">
                      فرض کنید یک گوشی آیفون به ارزش ۱,۰۰۰ یورو وارد می‌شود:
                    </p>
                    <div className="space-y-2 text-persian">
                      <div className="flex justify-between p-3 bg-background/50 rounded-lg">
                        <span>ارزش گوشی:</span>
                        <span className="font-mono">۱,۰۰۰ × ۹۴,۳۰۰ = ۹۴,۳۰۰,۰۰۰ تومان</span>
                      </div>
                      <div className="flex justify-between p-3 bg-background/50 rounded-lg">
                        <span>حقوق ورودی (۴۰٪):</span>
                        <span className="font-mono">۹۴,۳۰۰,۰۰۰ × ۴۰٪ = ۳۷,۷۲۰,۰۰۰ تومان</span>
                      </div>
                      <div className="flex justify-between p-3 bg-background/50 rounded-lg">
                        <span>هزینه رجیستری:</span>
                        <span className="font-mono">۹۰۰,۰۰۰ تومان</span>
                      </div>
                      <div className="flex justify-between p-3 bg-primary/20 rounded-lg font-bold">
                        <span>مجموع هزینه گمرکی:</span>
                        <span className="font-mono text-primary">۳۸,۶۲۰,۰۰۰ تومان</span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Exchange Rate Section */}
                <section id="exchange-rate" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <DollarSign className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground text-persian">
                      نرخ ارز گمرکی ۱۴۰۵
                    </h2>
                  </div>

                  <p className="text-muted-foreground mb-6 text-persian leading-relaxed">
                    براساس ماده ۳۳ لایحه بودجه ۱۴۰۵، <strong>نرخ تسعیر ارز</strong> برای محاسبه حقوق و عوارض گمرکی 
                    کالاهای وارداتی به مبلغ <strong>۹۴,۳۰۰ تومان (۹۴۳,۰۰۰ ریال)</strong> تعیین شده است.
                  </p>

                  <div className="bg-card rounded-xl border p-6 mb-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary mb-2">۹۴,۳۰۰</div>
                      <div className="text-lg text-muted-foreground text-persian">تومان به ازای هر دلار/یورو</div>
                      <p className="text-sm text-muted-foreground mt-4 text-persian">
                        این نرخ برای محاسبه حقوق ورودی تمام کالاهای وارداتی در سال ۱۴۰۵ استفاده می‌شود
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-muted/30 rounded-xl p-5">
                      <h4 className="font-bold text-foreground mb-3 text-persian">کالاهای مشمول</h4>
                      <ul className="space-y-2 text-muted-foreground text-persian text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          خودروهای سواری و تجاری
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          گوشی موبایل و تجهیزات الکترونیکی
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          ماشین‌آلات صنعتی
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          لوازم خانگی و مصرفی
                        </li>
                      </ul>
                    </div>
                    <div className="bg-muted/30 rounded-xl p-5">
                      <h4 className="font-bold text-foreground mb-3 text-persian">نحوه محاسبه</h4>
                      <p className="text-muted-foreground text-persian text-sm leading-relaxed">
                        ارزش ارزی کالا (CIF) ضربدر نرخ تسعیر ارز (۹۴,۳۰۰ تومان) = ارزش ریالی کالا
                        <br /><br />
                        سپس درصد حقوق ورودی بر این مبلغ اعمال می‌شود.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Taxes Section */}
                <section id="taxes" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <Percent className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground text-persian">
                      مالیات و عوارض گمرکی ۱۴۰۵
                    </h2>
                  </div>

                  <p className="text-muted-foreground mb-6 text-persian leading-relaxed">
                    علاوه بر حقوق ورودی، کالاهای وارداتی مشمول مالیات و عوارض دیگری نیز می‌شوند. 
                    در ادامه جدول کامل مالیات‌ها و عوارض گمرکی سال ۱۴۰۵ ارائه شده است:
                  </p>

                  <div className="bg-card rounded-xl border overflow-hidden mb-6">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead className="text-right text-persian font-bold">نوع مالیات/عوارض</TableHead>
                          <TableHead className="text-center text-persian font-bold">نرخ</TableHead>
                          <TableHead className="text-right text-persian font-bold">توضیحات</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="text-persian font-medium">مالیات بر ارزش افزوده</TableCell>
                          <TableCell className="text-center">
                            <span className="bg-primary/20 text-primary px-3 py-1 rounded-full font-bold">۱۰٪</span>
                          </TableCell>
                          <TableCell className="text-persian text-muted-foreground text-sm">
                            بر ارزش کالا + حقوق ورودی
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-persian font-medium">عوارض شهرداری</TableCell>
                          <TableCell className="text-center">
                            <span className="bg-orange-500/20 text-orange-700 px-3 py-1 rounded-full font-bold">۳٪</span>
                          </TableCell>
                          <TableCell className="text-persian text-muted-foreground text-sm">
                            برخی کالاهای خاص
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-persian font-medium">عوارض محیط زیست</TableCell>
                          <TableCell className="text-center">
                            <span className="bg-green-500/20 text-green-700 px-3 py-1 rounded-full font-bold">متغیر</span>
                          </TableCell>
                          <TableCell className="text-persian text-muted-foreground text-sm">
                            خودروهای پرمصرف
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </section>

                {/* Comparison Section */}
                <section id="comparison" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <TrendingUp className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground text-persian">
                      مقایسه تعرفه‌های ۱۴۰۴ و ۱۴۰۵
                    </h2>
                  </div>

                  <div className="bg-card rounded-xl border overflow-hidden mb-6">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead className="text-right text-persian font-bold">کالا</TableHead>
                          <TableHead className="text-center text-persian font-bold">تعرفه ۱۴۰۴</TableHead>
                          <TableHead className="text-center text-persian font-bold">تعرفه ۱۴۰۵</TableHead>
                          <TableHead className="text-center text-persian font-bold">تغییر</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="text-persian font-medium">خودرو برقی</TableCell>
                          <TableCell className="text-center text-muted-foreground">۴٪</TableCell>
                          <TableCell className="text-center font-bold text-green-600">۴٪</TableCell>
                          <TableCell className="text-center text-muted-foreground">بدون تغییر</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-persian font-medium">خودرو هیبریدی</TableCell>
                          <TableCell className="text-center text-muted-foreground">۱۵٪</TableCell>
                          <TableCell className="text-center font-bold text-blue-600">۱۵٪</TableCell>
                          <TableCell className="text-center text-muted-foreground">بدون تغییر</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-persian font-medium">خودرو بنزینی +۳۰۰۰cc</TableCell>
                          <TableCell className="text-center text-muted-foreground">۱۳۰٪</TableCell>
                          <TableCell className="text-center font-bold text-red-600">۱۳۰٪</TableCell>
                          <TableCell className="text-center text-muted-foreground">بدون تغییر</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-persian font-medium">گوشی زیر ۶۰۰ یورو</TableCell>
                          <TableCell className="text-center text-muted-foreground">۱۲٪</TableCell>
                          <TableCell className="text-center font-bold text-green-600">۱۲٪</TableCell>
                          <TableCell className="text-center text-muted-foreground">بدون تغییر</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-persian font-medium">گوشی بالای ۶۰۰ یورو</TableCell>
                          <TableCell className="text-center text-muted-foreground">۴۰٪</TableCell>
                          <TableCell className="text-center font-bold text-red-600">۴۰٪</TableCell>
                          <TableCell className="text-center text-muted-foreground">بدون تغییر</TableCell>
                        </TableRow>
                        <TableRow className="bg-orange-500/10">
                          <TableCell className="text-persian font-medium">نرخ ارز گمرکی</TableCell>
                          <TableCell className="text-center text-muted-foreground">۶۸,۵۰۰ تومان</TableCell>
                          <TableCell className="text-center font-bold text-orange-600">۹۴,۳۰۰ تومان</TableCell>
                          <TableCell className="text-center text-red-600 font-bold">+۳۸٪ افزایش</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-persian font-medium">رجیستری گوشی</TableCell>
                          <TableCell className="text-center text-muted-foreground">۷۰۰,۰۰۰ تومان</TableCell>
                          <TableCell className="text-center font-bold text-red-600">۹۰۰,۰۰۰ تومان</TableCell>
                          <TableCell className="text-center text-red-600">+۲۹٪</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  <div className="bg-amber-500/10 rounded-xl p-5 border border-amber-500/20">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-6 h-6 text-amber-600 mt-1" />
                      <div>
                        <h4 className="font-bold text-foreground mb-2 text-persian">نکته مهم درباره افزایش نرخ ارز گمرکی</h4>
                        <p className="text-muted-foreground text-sm text-persian">
                          با افزایش ۳۸ درصدی نرخ ارز گمرکی از ۶۸,۵۰۰ به ۹۴,۳۰۰ تومان، هزینه ترخیص تمام کالاها 
                          به همین نسبت افزایش می‌یابد، حتی اگر درصد تعرفه‌ها تغییر نکرده باشد.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* FAQ Section */}
                <section id="faq" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground text-persian">
                      سوالات متداول
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-card rounded-xl border p-5">
                      <h3 className="font-bold text-foreground mb-2 text-persian">
                        ۱. حقوق ورودی خودرو برقی در سال ۱۴۰۵ چند درصد است؟
                      </h3>
                      <p className="text-muted-foreground text-persian">
                        براساس لایحه بودجه ۱۴۰۵، حقوق ورودی خودروهای برقی ۴ درصد تعیین شده است 
                        که کمترین تعرفه در بین انواع خودروها است.
                      </p>
                    </div>
                    <div className="bg-card rounded-xl border p-5">
                      <h3 className="font-bold text-foreground mb-2 text-persian">
                        ۲. نرخ ارز گمرکی برای محاسبه حقوق ورودی چقدر است؟
                      </h3>
                      <p className="text-muted-foreground text-persian">
                        نرخ تسعیر ارز برای محاسبه حقوق ورودی گمرکی در لایحه بودجه ۱۴۰۵، 
                        مبلغ ۹۴,۳۰۰ تومان (۹۴۳,۰۰۰ ریال) تعیین شده است.
                      </p>
                    </div>
                    <div className="bg-card rounded-xl border p-5">
                      <h3 className="font-bold text-foreground mb-2 text-persian">
                        ۳. تعرفه واردات گوشی موبایل بالای ۶۰۰ یورو چقدر است؟
                      </h3>
                      <p className="text-muted-foreground text-persian">
                        حقوق ورودی گوشی‌های موبایل با ارزش بیش از ۶۰۰ یورو، ۴۰ درصد تعیین شده 
                        و هزینه رجیستری ۹۰۰ هزار تومان است. گوشی‌های زیر ۶۰۰ یورو ۱۲ درصد تعرفه دارند.
                      </p>
                    </div>
                    <div className="bg-card rounded-xl border p-5">
                      <h3 className="font-bold text-foreground mb-2 text-persian">
                        ۴. تعرفه خودرو بنزینی بالای ۳۰۰۰ سی‌سی چقدر است؟
                      </h3>
                      <p className="text-muted-foreground text-persian">
                        براساس لایحه بودجه ۱۴۰۵، حقوق ورودی خودروهای بنزینی با حجم موتور 
                        بالای ۳۰۰۰ سی‌سی، ۱۳۰ درصد تعیین شده که بالاترین تعرفه است.
                      </p>
                    </div>
                    <div className="bg-card rounded-xl border p-5">
                      <h3 className="font-bold text-foreground mb-2 text-persian">
                        ۵. تفاوت نرخ ارز گمرکی با نرخ بازار آزاد چیست؟
                      </h3>
                      <p className="text-muted-foreground text-persian">
                        نرخ ارز گمرکی (۹۴,۳۰۰ تومان) نرخی ثابت است که در لایحه بودجه تعیین می‌شود و صرفاً 
                        برای محاسبه حقوق ورودی گمرکی استفاده می‌شود. این نرخ معمولاً با نرخ بازار آزاد تفاوت دارد.
                      </p>
                    </div>
                    <div className="bg-card rounded-xl border p-5">
                      <h3 className="font-bold text-foreground mb-2 text-persian">
                        ۶. آیا تعرفه‌های گمرکی ۱۴۰۵ قطعی است؟
                      </h3>
                      <p className="text-muted-foreground text-persian">
                        تعرفه‌های اعلام شده براساس لایحه بودجه است. پس از تصویب نهایی در مجلس و شورای نگهبان، 
                        این تعرفه‌ها قطعی خواهند شد و ممکن است تغییراتی داشته باشند.
                      </p>
                    </div>
                    <div className="bg-card rounded-xl border p-5">
                      <h3 className="font-bold text-foreground mb-2 text-persian">
                        ۷. هزینه کامل ترخیص خودرو برقی چقدر است؟
                      </h3>
                      <p className="text-muted-foreground text-persian">
                        برای خودرو برقی ۳۵,۰۰۰ دلاری: حقوق ورودی ۴٪ معادل ۱۳۲ میلیون تومان، مالیات ارزش افزوده ۱۰٪ 
                        معادل ۳۴۳ میلیون تومان و مجموع هزینه ترخیص حدود ۴۷۵ میلیون تومان است.
                      </p>
                    </div>
                    <div className="bg-card rounded-xl border p-5">
                      <h3 className="font-bold text-foreground mb-2 text-persian">
                        ۸. تعرفه گوشی زیر ۶۰۰ یورو چقدر است؟
                      </h3>
                      <p className="text-muted-foreground text-persian">
                        حقوق ورودی گوشی‌های موبایل با ارزش کمتر از ۶۰۰ یورو، ۱۲ درصد است و هزینه رجیستری 
                        ۹۰۰ هزار تومان به آن اضافه می‌شود.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Internal Links Section */}
                <section className="bg-muted/30 rounded-2xl p-6 border mb-8">
                  <h3 className="font-bold text-lg text-foreground mb-4 text-persian">مقالات مرتبط با ترخیص کالا</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    <Link to="/blog/bandar-abbas-comprehensive-guide" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-persian text-sm p-3 bg-background rounded-lg border">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      راهنمای ترخیص کالا از بندرعباس
                    </Link>
                    <Link to="/blog/incoterms-guide" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-persian text-sm p-3 bg-background rounded-lg border">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      اینکوترمز چیست؟ راهنمای کامل
                    </Link>
                    <Link to="/blog/manifest-guide" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-persian text-sm p-3 bg-background rounded-lg border">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      مانیفست در گمرک چیست؟
                    </Link>
                    <Link to="/blog/hs-code-guide" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-persian text-sm p-3 bg-background rounded-lg border">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      کد HS کالا و نحوه استعلام
                    </Link>
                    <Link to="/blog/customs-clearance-company-guide" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-persian text-sm p-3 bg-background rounded-lg border">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      شرکت ترخیص کالا چیست؟
                    </Link>
                    <Link to="/blog/dubai-to-abbas-import-guide" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-persian text-sm p-3 bg-background rounded-lg border">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      واردات از دبی به بندرعباس
                    </Link>
                  </div>
                </section>

                {/* Conclusion */}
                <section className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 border">
                  <h2 className="text-2xl font-bold text-foreground mb-4 text-persian">جمع‌بندی</h2>
                  <p className="text-muted-foreground mb-6 text-persian leading-relaxed">
                    لایحه بودجه ۱۴۰۵ با تعیین نرخ تسعیر ارز ۹۴,۳۰۰ تومانی (افزایش ۳۸ درصدی نسبت به سال ۱۴۰۴) و حفظ تعرفه‌های تشویقی 
                    برای خودروهای برقی و هیبریدی، سیاست حمایت از واردات خودروهای پاک را ادامه می‌دهد. 
                    واردکنندگان با آگاهی از این تعرفه‌ها می‌توانند برنامه‌ریزی دقیق‌تری برای واردات داشته باشند.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="tel:+989171020030"
                      className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      مشاوره رایگان
                    </a>
                    <Link
                      to="/blog"
                      className="inline-flex items-center gap-2 bg-background text-foreground px-6 py-3 rounded-full font-medium border hover:bg-muted transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      مقالات بیشتر
                    </Link>
                  </div>
                </section>

                {/* HS Code Search Tool CTA */}
                <div className="mt-12 mb-8 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 p-6 md:p-8 text-center">
                  <h3 className="text-xl font-bold text-persian mb-2">
                    کد تعرفه گمرکی کالای خود را همین حالا پیدا کنید
                  </h3>
                  <p className="text-muted-foreground text-persian mb-4">
                    ابزار آنلاین و رایگان جستجوی HS Code با پایگاه‌داده به‌روز گمرک ایران.
                  </p>
                  <Link
                    to="/hscode"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
                  >
                    ورود به ابزار جستجوی تعرفه
                  </Link>
                </div>

                {/* Related Articles */}
                <RelatedArticles currentPostId={31} limit={3} />
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <div className="sticky top-28 space-y-6">
                  {/* Contact Card */}
                  <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-primary-foreground">
                    <h3 className="font-bold text-xl mb-3 text-persian">مشاوره تخصصی واردات</h3>
                    <p className="text-primary-foreground/80 mb-4 text-persian text-sm">
                      برای محاسبه دقیق تعرفه‌های گمرکی و مشاوره واردات با کارشناسان ما تماس بگیرید.
                    </p>
                    <a
                      href="tel:+989171020030"
                      className="w-full bg-primary-foreground text-primary py-3 rounded-xl font-bold hover:bg-primary-foreground/90 transition-colors flex items-center justify-center gap-2"
                    >
                      <Phone className="w-5 h-5" />
                      ۰۹۱۷۱۰۲۰۰۳۰
                    </a>
                  </div>

                  {/* Quick Links */}
                  <div className="bg-card rounded-2xl p-6 border">
                    <h3 className="font-bold text-lg mb-4 text-persian text-foreground">مقالات مرتبط</h3>
                    <div className="space-y-3">
                      <Link to="/blog/electric-car-tariff-guide" className="block text-muted-foreground hover:text-primary transition-colors text-persian text-sm">
                        → تعرفه واردات خودرو برقی ۱۴۰۴
                      </Link>
                      <Link to="/blog/customs-exchange-rate-guide" className="block text-muted-foreground hover:text-primary transition-colors text-persian text-sm">
                        → نرخ ارز گمرکی چیست؟
                      </Link>
                      <Link to="/blog/hs-code-guide" className="block text-muted-foreground hover:text-primary transition-colors text-persian text-sm">
                        → راهنمای کد HS کالا
                      </Link>
                      <Link to="/blog/mobile-phone-customs-clearance-registry-guide" className="block text-muted-foreground hover:text-primary transition-colors text-persian text-sm">
                        → ترخیص گوشی و رجیستری
                      </Link>
                    </div>
                  </div>

                  {/* Key Info */}
                  <div className="bg-muted/30 rounded-2xl p-6 border">
                    <h3 className="font-bold text-lg mb-4 text-persian text-foreground">نکات کلیدی</h3>
                    <ul className="space-y-3 text-persian text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 mt-1" />
                        <span className="text-muted-foreground">خودرو برقی: ۴٪ حقوق ورودی</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 mt-1" />
                        <span className="text-muted-foreground">هیبریدی: ۱۵٪ حقوق ورودی</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-orange-600 mt-1" />
                        <span className="text-muted-foreground">نرخ ارز: ۹۴,۳۰۰ تومان</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-1" />
                        <span className="text-muted-foreground">رجیستری: ۹۰۰ هزار تومان</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </aside>
            </div>

            {/* Back to Blog */}
            <div className="mt-12 text-center">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-persian"
              >
                <ArrowLeft className="w-5 h-5" />
                بازگشت به بلاگ
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
};

export default CustomsTariff2025Guide;
