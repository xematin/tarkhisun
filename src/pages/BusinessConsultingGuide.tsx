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
  TrendingUp,
  Target,
  Shield,
  Briefcase,
} from "lucide-react";
import ArticleImage from "@/components/ArticleImage";

const BusinessConsultingGuide = () => {
  useEffect(() => {
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "fa");
    window.scrollTo(0, 0);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "مشاوره بازرگانی چیست؟ راهنمای کامل خدمات مشاوره تجارت و بازرگانی",
    description:
      "راهنمای جامع مشاوره بازرگانی: تعریف، انواع خدمات، مزایا، نحوه انتخاب مشاور و اهمیت مشاوره در تجارت بین‌المللی",
    image: "https://tarkhisun.com/images/blog/business-consulting-meeting.webp",
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
      "@id": "https://tarkhisun.com/blog/business-consulting-guide",
    },
    articleSection: "تجارت بین‌الملل",
    wordCount: 2800,
    keywords: "مشاوره بازرگانی, مشاوره تجارت, خدمات مشاوره, تجارت بین‌المللی, واردات صادرات",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "خانه", item: "https://tarkhisun.com" },
      { "@type": "ListItem", position: 2, name: "بلاگ", item: "https://tarkhisun.com/blog" },
      { "@type": "ListItem", position: 3, name: "مشاوره بازرگانی چیست؟" },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "مشاوره بازرگانی چیست و چه خدماتی ارائه می‌دهد؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "مشاوره بازرگانی شامل راهنمایی تخصصی در زمینه واردات، صادرات، ترخیص کالا، قوانین گمرکی، تعرفه‌ها و استراتژی‌های تجاری است که به کسب‌وکارها کمک می‌کند تا در تجارت بین‌المللی موفق شوند.",
        },
      },
      {
        "@type": "Question",
        name: "هزینه مشاوره بازرگانی چقدر است؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "هزینه مشاوره بازرگانی بسته به نوع خدمات، پیچیدگی پروژه و سطح تخصص مشاور متفاوت است. برخی مشاوران ساعتی و برخی پروژه‌ای هزینه دریافت می‌کنند.",
        },
      },
      {
        "@type": "Question",
        name: "چگونه یک مشاور بازرگانی خوب انتخاب کنیم؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "برای انتخاب مشاور بازرگانی خوب باید به سابقه کاری، تخصص در حوزه مورد نظر، مجوزهای رسمی، نظرات مشتریان قبلی و توانایی ارائه راهکارهای عملی توجه کنید.",
        },
      },
    ],
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://tarkhisun.com/blog/business-consulting-guide" />
        <title>مشاوره بازرگانی چیست؟ راهنمای کامل خدمات مشاوره تجارت و بازرگانی</title>
        <meta
          name="description"
          content="راهنمای مشاوره بازرگانی: خدمات مشاوره تجارت، واردات و صادرات، انتخاب مشاور و مزایای مشاوره تخصصی"
        />
        <meta
          name="keywords"
          content="مشاوره بازرگانی, مشاوره تجارت, خدمات مشاوره بازرگانی, مشاور واردات صادرات, مشاوره تجارت بین‌المللی, راهنمای مشاوره بازرگانی"
        />
        
        <meta property="og:title" content="مشاوره بازرگانی چیست؟ راهنمای کامل خدمات مشاوره تجارت" />
        <meta
          property="og:description"
          content="راهنمای جامع مشاوره بازرگانی: تعریف، انواع خدمات، مزایا و نحوه انتخاب مشاور"
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://tarkhisun.com/blog/business-consulting-guide" />
        <meta property="og:locale" content="fa_IR" />
        <meta property="og:site_name" content="ترخیصان" />
        <meta property="og:image" content="https://tarkhisun.com/images/blog/business-consulting-meeting.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="مشاوره بازرگانی چیست؟ راهنمای کامل خدمات مشاوره تجارت" />
        <meta name="twitter:description" content="راهنمای جامع مشاوره بازرگانی و خدمات مشاوره تجارت" />
        <meta name="twitter:image" content="https://tarkhisun.com/images/blog/business-consulting-meeting.webp" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <main>
          <ArticleBreadcrumb
            category="تجارت بین‌الملل"
            articleTitle="مشاوره بازرگانی چیست؟ راهنمای کامل خدمات مشاوره تجارت و بازرگانی"
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
                  مشاوره بازرگانی چیست؟ راهنمای کامل خدمات مشاوره تجارت و بازرگانی
                </h1>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-8 text-persian">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>۱۴۰۴/۹/۲۵</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>۱۸ دقیقه مطالعه</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>تیم ترخیصان</span>
                  </div>
                </div>

                <p className="text-xl text-muted-foreground text-persian leading-relaxed">
                  <strong>مشاوره بازرگانی</strong> یکی از کلیدی‌ترین خدمات برای موفقیت در{" "}
                  <Link to="/blog/import-export-guide-iran" className="text-accent hover:underline">
                    تجارت بین‌المللی
                  </Link>{" "}
                  است. در این راهنما با انواع خدمات مشاوره، مزایا و نحوه انتخاب مشاور مناسب آشنا می‌شوید.
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
                  src="/images/blog/business-consulting-guide.webp"
                  alt="جلسه مشاوره بازرگانی و تجارت بین‌المللی"
                  caption="مشاوره بازرگانی کلید موفقیت در تجارت بین‌المللی است"
                  priority
                />

                {/* Definition Section */}
                <section className="mb-12">
                  <h2 className="heading-secondary mb-6 text-persian">مشاوره بازرگانی چیست؟</h2>
                  <p className="text-body mb-6 text-persian">
                    <strong>مشاوره بازرگانی</strong> به مجموعه خدمات تخصصی گفته می‌شود که توسط کارشناسان باتجربه در حوزه
                    تجارت، واردات، صادرات و امور گمرکی ارائه می‌شود. این خدمات به کسب‌وکارها کمک می‌کند تا با آگاهی کامل
                    از قوانین، مقررات و فرآیندهای تجاری، تصمیمات بهتری بگیرند.
                  </p>
                  <p className="text-body mb-6 text-persian">
                    یک مشاور بازرگانی حرفه‌ای با تسلط بر قوانین گمرکی، تعرفه‌ها،{" "}
                    <Link to="/blog/incoterms-guide" className="text-accent hover:underline">
                      اینکوترمز
                    </Link>{" "}
                    و روش‌های حمل‌ونقل، می‌تواند مسیر تجارت را برای شما هموار کند و از بروز مشکلات قانونی و مالی جلوگیری
                    نماید.
                  </p>

                  <div className="bg-accent/10 border-r-4 border-accent rounded-lg p-6 mb-6">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                      <div className="text-persian">
                        <strong className="block mb-2">اهمیت مشاوره بازرگانی:</strong>
                        <span>
                          طبق آمار، کسب‌وکارهایی که از خدمات مشاوره بازرگانی استفاده می‌کنند، ۴۰٪ کمتر با مشکلات گمرکی
                          مواجه می‌شوند و هزینه‌های ترخیص آن‌ها به‌طور میانگین ۲۵٪ کاهش می‌یابد.
                        </span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Services Section */}
                <section className="mb-12">
                  <h2 className="heading-secondary mb-6 text-persian">خدمات مشاوره بازرگانی</h2>

                  <div className="grid gap-6 md:grid-cols-2 mb-8">
                    <Card className="card-service">
                      <CardHeader>
                        <CardTitle className="text-persian flex items-center gap-2">
                          <Target className="w-5 h-5 text-accent" />
                          مشاوره واردات
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-persian">
                          <li>• تعیین بهترین روش واردات کالا</li>
                          <li>• راهنمایی در ثبت سفارش</li>
                          <li>• محاسبه هزینه‌های گمرکی</li>
                          <li>• انتخاب تعرفه مناسب</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="card-service">
                      <CardHeader>
                        <CardTitle className="text-persian flex items-center gap-2">
                          <Briefcase className="w-5 h-5 text-accent" />
                          مشاوره صادرات
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-persian">
                          <li>• شناسایی بازارهای هدف</li>
                          <li>• راهنمایی دریافت مجوزها</li>
                          <li>• مشاوره بسته‌بندی صادراتی</li>
                          <li>• تسهیلات صادراتی</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="card-service">
                      <CardHeader>
                        <CardTitle className="text-persian flex items-center gap-2">
                          <Shield className="w-5 h-5 text-accent" />
                          مشاوره گمرکی
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-persian">
                          <li>• راهنمایی فرآیند ترخیص</li>
                          <li>• حل اختلافات گمرکی</li>
                          <li>
                            • مشاوره{" "}
                            <Link to="/blog/customs-article-1-commission-guide" className="text-accent hover:underline">
                              کمیسیون ماده ۱
                            </Link>
                          </li>
                          <li>• بررسی مدارک و اسناد</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="card-service">
                      <CardHeader>
                        <CardTitle className="text-persian flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-accent" />
                          مشاوره تعرفه‌ای
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-persian">
                          <li>
                            • تعیین{" "}
                            <Link to="/blog/hs-code-guide" className="text-accent hover:underline">
                              کد HS صحیح
                            </Link>
                          </li>
                          <li>• محاسبه حقوق ورودی</li>
                          <li>• بررسی معافیت‌ها</li>
                          <li>• برنامه‌ریزی مالیاتی</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Second Image */}
                  <ArticleImage
                    src="/images/blog/business-consulting-office.webp"
                    alt="دفتر مشاوره بازرگانی و خدمات تجارت"
                    caption="خدمات مشاوره بازرگانی شامل مشاوره واردات، صادرات و امور گمرکی است"
                  />
                </section>

                {/* Benefits Section */}
                <section className="mb-12">
                  <h2 className="heading-secondary mb-6 text-persian">مزایای استفاده از مشاوره بازرگانی</h2>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3 p-4 bg-secondary/30 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                      <div className="text-persian">
                        <strong>کاهش هزینه‌ها:</strong> با انتخاب تعرفه مناسب و استفاده از معافیت‌ها، هزینه‌های گمرکی
                        به‌طور قابل‌توجهی کاهش می‌یابد.
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-secondary/30 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                      <div className="text-persian">
                        <strong>صرفه‌جویی در زمان:</strong> فرآیند ترخیص با راهنمایی مشاور، سریع‌تر و بدون تأخیر انجام
                        می‌شود.
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-secondary/30 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                      <div className="text-persian">
                        <strong>جلوگیری از جرایم:</strong> رعایت دقیق قوانین و مقررات از بروز جرایم سنگین گمرکی جلوگیری
                        می‌کند.
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-secondary/30 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                      <div className="text-persian">
                        <strong>تصمیم‌گیری آگاهانه:</strong> دسترسی به اطلاعات دقیق و به‌روز برای تصمیم‌گیری‌های تجاری
                        مهم.
                      </div>
                    </div>
                  </div>
                </section>

                {/* How to Choose Section */}
                <section className="mb-12">
                  <h2 className="heading-secondary mb-6 text-persian">نحوه انتخاب مشاور بازرگانی</h2>
                  <p className="text-body mb-6 text-persian">
                    انتخاب مشاور بازرگانی مناسب نقش مهمی در موفقیت تجاری شما دارد. معیارهای زیر را در انتخاب مشاور در نظر
                    بگیرید:
                  </p>

                  <ol className="list-decimal list-inside space-y-4 text-persian mb-8">
                    <li>
                      <strong>سابقه کاری:</strong> مشاوری با حداقل ۵ سال سابقه در حوزه تجارت بین‌المللی انتخاب کنید.
                    </li>
                    <li>
                      <strong>تخصص در حوزه مورد نظر:</strong> مشاور باید در زمینه کالای شما (صنعتی، کشاورزی، الکترونیکی)
                      تجربه داشته باشد.
                    </li>
                    <li>
                      <strong>مجوزهای رسمی:</strong> از داشتن مجوزهای لازم مانند کارت بازرگانی و عضویت در اتاق بازرگانی
                      اطمینان حاصل کنید.
                    </li>
                    <li>
                      <strong>ارتباطات گمرکی:</strong> مشاور خوب ارتباط مؤثر با مراجع گمرکی و دولتی دارد.
                    </li>
                    <li>
                      <strong>شفافیت در هزینه‌ها:</strong> قبل از شروع همکاری، هزینه‌ها باید به‌طور شفاف اعلام شود.
                    </li>
                  </ol>
                </section>

                {/* CTA Section */}
                <section className="mb-12 p-8 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl">
                  <h2 className="heading-secondary mb-4 text-persian">نیاز به مشاوره بازرگانی دارید؟</h2>
                  <p className="text-body mb-6 text-persian">
                    تیم متخصص ترخیصان با بیش از ۲۰ سال تجربه در امور گمرکی و بازرگانی، آماده ارائه خدمات مشاوره تخصصی به
                    شما است. از مشاوره{" "}
                    <Link to="/blog/ntsw-complete-guide" className="text-accent hover:underline">
                      سامانه جامع تجارت
                    </Link>{" "}
                    تا ترخیص کالا از{" "}
                    <Link
                      to="/blog/zero-to-hundred-bandar-abbas-customs-clearance"
                      className="text-accent hover:underline"
                    >
                      گمرک بندرعباس
                    </Link>
                    .
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground text-persian"
                  >
                    <a href="tel:+989177380080">تماس برای مشاوره رایگان</a>
                  </Button>
                </section>

                {/* FAQ Section */}
                <section className="mb-12">
                  <h2 className="heading-secondary mb-6 text-persian">سؤالات متداول</h2>

                  <div className="space-y-6">
                    <div className="border-b border-border pb-4">
                      <h3 className="font-bold mb-2 text-persian">مشاوره بازرگانی چیست و چه خدماتی ارائه می‌دهد؟</h3>
                      <p className="text-muted-foreground text-persian">
                        مشاوره بازرگانی شامل راهنمایی تخصصی در زمینه واردات، صادرات، ترخیص کالا، قوانین گمرکی، تعرفه‌ها و
                        استراتژی‌های تجاری است.
                      </p>
                    </div>
                    <div className="border-b border-border pb-4">
                      <h3 className="font-bold mb-2 text-persian">هزینه مشاوره بازرگانی چقدر است؟</h3>
                      <p className="text-muted-foreground text-persian">
                        هزینه بسته به نوع خدمات و پیچیدگی پروژه متفاوت است. برخی مشاوران ساعتی و برخی پروژه‌ای هزینه
                        دریافت می‌کنند.
                      </p>
                    </div>
                    <div className="border-b border-border pb-4">
                      <h3 className="font-bold mb-2 text-persian">چگونه یک مشاور بازرگانی خوب انتخاب کنیم؟</h3>
                      <p className="text-muted-foreground text-persian">
                        به سابقه کاری، تخصص، مجوزهای رسمی، نظرات مشتریان و توانایی ارائه راهکارهای عملی توجه کنید.
                      </p>
                    </div>
                  </div>
                </section>

                <RelatedArticles currentPostId={25} limit={3} />
              </div>
            </div>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BusinessConsultingGuide;
