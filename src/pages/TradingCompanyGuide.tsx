import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleBreadcrumb from "@/components/ArticleBreadcrumb";
import RelatedArticles from "@/components/RelatedArticles";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle2,
  Calendar,
  Clock,
  User,
  Building,
  FileText,
  Globe,
  TrendingUp,
} from "lucide-react";
import ArticleImage from "@/components/ArticleImage";

const TradingCompanyGuide = () => {
  useEffect(() => {
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "fa");
    window.scrollTo(0, 0);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "شرکت بازرگانی چیست؟ راهنمای کامل ثبت و راه‌اندازی شرکت بازرگانی",
    description:
      "راهنمای جامع شرکت بازرگانی: تعریف، انواع، مراحل ثبت، مجوزها، سرمایه لازم و خدمات شرکت‌های بازرگانی در ایران",
    image: "https://tarkhisun.com/images/blog/trading-company-office.webp",
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
    datePublished: "2025-12-15",
    dateModified: "2025-12-15",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://tarkhisun.com/blog/trading-company-guide",
    },
    articleSection: "تجارت بین‌الملل",
    wordCount: 2500,
    keywords: "شرکت بازرگانی, ثبت شرکت بازرگانی, خدمات بازرگانی, واردات صادرات, کارت بازرگانی",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "خانه", item: "https://tarkhisun.com" },
      { "@type": "ListItem", position: 2, name: "بلاگ", item: "https://tarkhisun.com/blog" },
      { "@type": "ListItem", position: 3, name: "شرکت بازرگانی چیست؟" },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "شرکت بازرگانی چیست و چه فعالیت‌هایی انجام می‌دهد؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "شرکت بازرگانی یک واحد حقوقی است که فعالیت‌های تجاری شامل واردات، صادرات، توزیع، بازاریابی و فروش کالا را انجام می‌دهد و واسطه بین تولیدکننده و مصرف‌کننده است.",
        },
      },
      {
        "@type": "Question",
        name: "برای ثبت شرکت بازرگانی چه مدارکی لازم است؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "مدارک شامل: کپی شناسنامه و کارت ملی مؤسسین، گواهی عدم سوءپیشینه، اساسنامه شرکت، اظهارنامه ثبت شرکت و صورتجلسات هیئت مدیره می‌باشد.",
        },
      },
      {
        "@type": "Question",
        name: "حداقل سرمایه برای ثبت شرکت بازرگانی چقدر است؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "حداقل سرمایه قانونی یک میلیون ریال است اما برای فعالیت جدی در تجارت و دریافت کارت بازرگانی، سرمایه بالاتر توصیه می‌شود.",
        },
      },
    ],
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://tarkhisun.com/blog/trading-company-guide" />
        <title>شرکت بازرگانی چیست؟ راهنمای کامل ثبت و راه‌اندازی شرکت بازرگانی</title>
        <meta
          name="description"
          content="راهنمای شرکت بازرگانی: تعریف، انواع، مراحل ثبت، مجوزها و خدمات شرکت‌های بازرگانی در ایران"
        />
        <meta
          name="keywords"
          content="شرکت بازرگانی, ثبت شرکت بازرگانی, خدمات بازرگانی, واردات صادرات, کارت بازرگانی, شرکت تجاری, مجوز بازرگانی"
        />
        
        <meta property="og:title" content="شرکت بازرگانی چیست؟ راهنمای کامل ثبت و راه‌اندازی" />
        <meta
          property="og:description"
          content="راهنمای جامع شرکت بازرگانی: تعریف، مراحل ثبت و خدمات شرکت‌های بازرگانی"
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://tarkhisun.com/blog/trading-company-guide" />
        <meta property="og:locale" content="fa_IR" />
        <meta property="og:site_name" content="ترخیصان" />
        <meta property="og:image" content="https://tarkhisun.com/images/blog/trading-company-office.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="شرکت بازرگانی چیست؟ راهنمای کامل ثبت و راه‌اندازی" />
        <meta name="twitter:description" content="راهنمای جامع شرکت بازرگانی و مراحل ثبت" />
        <meta name="twitter:image" content="https://tarkhisun.com/images/blog/trading-company-office.webp" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <main>
          <ArticleBreadcrumb
            category="تجارت بین‌الملل"
            articleTitle="شرکت بازرگانی چیست؟ راهنمای کامل ثبت و راه‌اندازی شرکت بازرگانی"
          />

          {/* Hero Section */}
          <section className="py-20 bg-gradient-to-br from-secondary to-white">
            <div className="container mx-auto px-4" dir="rtl">
              <div className="max-w-4xl mx-auto">
                <Link
                  to="/blog"
                  className="inline-flex items-center text-accent hover:text-accent/80 mb-6 transition-colors text-persian"
                >
                  <ArrowRight className="ml-2 h-4 w-4" />
                  بازگشت به بلاگ
                </Link>

                <h1 className="heading-primary mb-6 text-persian">
                  شرکت بازرگانی چیست؟ راهنمای کامل ثبت و راه‌اندازی شرکت بازرگانی
                </h1>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-8 text-persian">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>۱۴۰۴/۹/۲۵</span>
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
                  <strong>شرکت بازرگانی</strong> یکی از مهم‌ترین ساختارهای حقوقی برای فعالیت در{" "}
                  <Link to="/blog/import-export-guide-iran" className="text-accent hover:underline">
                    تجارت بین‌المللی
                  </Link>{" "}
                  است. در این راهنما با مراحل ثبت، مجوزها و خدمات شرکت‌های بازرگانی آشنا می‌شوید.
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
                  src="/images/blog/trading-company-office.webp"
                  alt="دفتر شرکت بازرگانی و خدمات تجارت بین‌المللی"
                  caption="شرکت بازرگانی پل ارتباطی بین تولیدکننده و بازار است"
                  priority
                />

                {/* Definition Section */}
                <section className="mb-12">
                  <h2 className="heading-secondary mb-6 text-persian">شرکت بازرگانی چیست؟</h2>
                  <p className="text-body mb-6 text-persian">
                    <strong>شرکت بازرگانی</strong> یک واحد حقوقی است که فعالیت‌های تجاری شامل واردات، صادرات، توزیع،
                    بازاریابی و فروش کالا را انجام می‌دهد. این شرکت‌ها به‌عنوان واسطه بین تولیدکنندگان و مصرف‌کنندگان عمل
                    کرده و نقش مهمی در زنجیره تأمین دارند.
                  </p>
                  <p className="text-body mb-6 text-persian">
                    برای فعالیت رسمی در تجارت خارجی، شرکت بازرگانی نیاز به{" "}
                    <Link to="/blog/business-card-complete-guide" className="text-accent hover:underline">
                      کارت بازرگانی
                    </Link>{" "}
                    دارد که توسط اتاق بازرگانی صادر می‌شود.
                  </p>

                  <div className="bg-accent/10 border-r-4 border-accent rounded-lg p-6 mb-6">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                      <div className="text-persian">
                        <strong className="block mb-2">نکته مهم:</strong>
                        <span>
                          شرکت بازرگانی می‌تواند به‌صورت سهامی خاص، با مسئولیت محدود یا تضامنی ثبت شود. هر کدام مزایا و
                          شرایط خاص خود را دارند.
                        </span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Types Section */}
                <section className="mb-12">
                  <h2 className="heading-secondary mb-6 text-persian">انواع شرکت‌های بازرگانی</h2>

                  <div className="grid gap-6 md:grid-cols-2 mb-8">
                    <Card className="card-service">
                      <CardHeader>
                        <CardTitle className="text-persian flex items-center gap-2">
                          <Building className="w-5 h-5 text-accent" />
                          شرکت واردات و صادرات
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-persian">
                          <li>• واردات کالا از خارج</li>
                          <li>• صادرات به کشورهای دیگر</li>
                          <li>• تجارت دوجانبه</li>
                          <li>• نیاز به کارت بازرگانی</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="card-service">
                      <CardHeader>
                        <CardTitle className="text-persian flex items-center gap-2">
                          <Globe className="w-5 h-5 text-accent" />
                          شرکت توزیع و پخش
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-persian">
                          <li>• توزیع کالا در بازار داخلی</li>
                          <li>• شبکه فروش گسترده</li>
                          <li>• انبارداری و لجستیک</li>
                          <li>• نمایندگی برندها</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="card-service">
                      <CardHeader>
                        <CardTitle className="text-persian flex items-center gap-2">
                          <FileText className="w-5 h-5 text-accent" />
                          شرکت خدمات بازرگانی
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-persian">
                          <li>• مشاوره تجاری</li>
                          <li>• خدمات گمرکی</li>
                          <li>• تحقیقات بازار</li>
                          <li>• بازاریابی بین‌المللی</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="card-service">
                      <CardHeader>
                        <CardTitle className="text-persian flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-accent" />
                          شرکت تجاری عمومی
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-persian">
                          <li>• فعالیت چندمنظوره</li>
                          <li>• تجارت انواع کالا</li>
                          <li>• انعطاف‌پذیری بالا</li>
                          <li>• ریسک متنوع</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Second Image */}
                  <ArticleImage
                    src="/images/blog/trading-company-deal.webp"
                    alt="مذاکره تجاری در شرکت بازرگانی"
                    caption="شرکت‌های بازرگانی واسطه معاملات تجاری بین‌المللی هستند"
                  />
                </section>

                {/* Registration Steps */}
                <section className="mb-12">
                  <h2 className="heading-secondary mb-6 text-persian">مراحل ثبت شرکت بازرگانی</h2>

                  <ol className="list-decimal list-inside space-y-4 text-persian mb-8">
                    <li>
                      <strong>انتخاب نام شرکت:</strong> نام باید منحصربه‌فرد و مطابق قوانین ثبت شرکت‌ها باشد.
                    </li>
                    <li>
                      <strong>تعیین نوع شرکت:</strong> سهامی خاص، با مسئولیت محدود یا سایر انواع.
                    </li>
                    <li>
                      <strong>تنظیم اساسنامه:</strong> شامل اهداف، سرمایه، سهامداران و نحوه اداره شرکت.
                    </li>
                    <li>
                      <strong>ثبت در سامانه:</strong> ثبت‌نام در سامانه ثبت شرکت‌ها و ارسال مدارک.
                    </li>
                    <li>
                      <strong>پرداخت هزینه:</strong> پرداخت حق‌الثبت و هزینه‌های مربوطه.
                    </li>
                    <li>
                      <strong>دریافت آگهی تأسیس:</strong> انتشار آگهی در روزنامه رسمی.
                    </li>
                    <li>
                      <strong>دریافت کارت بازرگانی:</strong> ثبت‌نام در اتاق بازرگانی و دریافت کارت.
                    </li>
                  </ol>

                  <div className="overflow-x-auto mb-8">
                    <table className="w-full border-collapse border border-border rounded-lg">
                      <thead className="bg-secondary">
                        <tr>
                          <th className="border border-border p-4 text-persian text-right">مدرک</th>
                          <th className="border border-border p-4 text-persian text-right">توضیحات</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border p-4 text-persian">کپی شناسنامه</td>
                          <td className="border border-border p-4 text-persian">تمام صفحات برای مؤسسین</td>
                        </tr>
                        <tr className="bg-secondary/30">
                          <td className="border border-border p-4 text-persian">کپی کارت ملی</td>
                          <td className="border border-border p-4 text-persian">پشت و رو برای مؤسسین</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-4 text-persian">گواهی عدم سوءپیشینه</td>
                          <td className="border border-border p-4 text-persian">برای مدیران و اعضای هیئت‌مدیره</td>
                        </tr>
                        <tr className="bg-secondary/30">
                          <td className="border border-border p-4 text-persian">اساسنامه</td>
                          <td className="border border-border p-4 text-persian">امضاشده توسط مؤسسین</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-4 text-persian">گواهی بانکی</td>
                          <td className="border border-border p-4 text-persian">واریز سرمایه اولیه</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Services Section */}
                <section className="mb-12">
                  <h2 className="heading-secondary mb-6 text-persian">خدمات شرکت‌های بازرگانی</h2>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3 p-4 bg-secondary/30 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                      <div className="text-persian">
                        <strong>واردات کالا:</strong> از ثبت سفارش در{" "}
                        <Link to="/blog/ntsw-complete-guide" className="text-accent hover:underline">
                          سامانه جامع تجارت
                        </Link>{" "}
                        تا ترخیص نهایی.
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-secondary/30 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                      <div className="text-persian">
                        <strong>صادرات:</strong> شناسایی بازار، بازاریابی و اجرای صادرات با{" "}
                        <Link to="/blog/export-card-complete-guide" className="text-accent hover:underline">
                          کارت صادراتی
                        </Link>
                        .
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-secondary/30 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                      <div className="text-persian">
                        <strong>توزیع و پخش:</strong> ایجاد شبکه فروش و توزیع در سراسر کشور.
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-secondary/30 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                      <div className="text-persian">
                        <strong>نمایندگی:</strong> اخذ نمایندگی برندهای خارجی و داخلی.
                      </div>
                    </div>
                  </div>
                </section>

                {/* CTA Section */}
                <section className="mb-12 p-8 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl">
                  <h2 className="heading-secondary mb-4 text-persian">مشاوره رایگان شرکت بازرگانی</h2>
                  <p className="text-body mb-6 text-persian">
                    تیم متخصص ترخیصان آماده ارائه مشاوره در زمینه ثبت شرکت بازرگانی، دریافت کارت بازرگانی و شروع فعالیت در{" "}
                    <Link
                      to="/blog/zero-to-hundred-bandar-abbas-customs-clearance"
                      className="text-accent hover:underline"
                    >
                      ترخیص کالا از گمرک
                    </Link>{" "}
                    است.
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground text-persian"
                  >
                    <a href="tel:+989177380080">درخواست مشاوره</a>
                  </Button>
                </section>

                {/* FAQ Section */}
                <section className="mb-12">
                  <h2 className="heading-secondary mb-6 text-persian">سؤالات متداول</h2>

                  <div className="space-y-6">
                    <div className="border-b border-border pb-4">
                      <h3 className="font-bold mb-2 text-persian">شرکت بازرگانی چیست و چه فعالیت‌هایی انجام می‌دهد؟</h3>
                      <p className="text-muted-foreground text-persian">
                        واحد حقوقی برای واردات، صادرات، توزیع و فروش کالا که واسطه بین تولیدکننده و مصرف‌کننده است.
                      </p>
                    </div>
                    <div className="border-b border-border pb-4">
                      <h3 className="font-bold mb-2 text-persian">برای ثبت شرکت بازرگانی چه مدارکی لازم است؟</h3>
                      <p className="text-muted-foreground text-persian">
                        کپی شناسنامه، کارت ملی، گواهی عدم سوءپیشینه، اساسنامه و اظهارنامه ثبت شرکت.
                      </p>
                    </div>
                    <div className="border-b border-border pb-4">
                      <h3 className="font-bold mb-2 text-persian">حداقل سرمایه برای ثبت شرکت بازرگانی چقدر است؟</h3>
                      <p className="text-muted-foreground text-persian">
                        قانوناً یک میلیون ریال، اما برای فعالیت جدی سرمایه بالاتر توصیه می‌شود.
                      </p>
                    </div>
                  </div>
                </section>

                <RelatedArticles currentPostId={28} limit={3} />
              </div>
            </div>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default TradingCompanyGuide;
