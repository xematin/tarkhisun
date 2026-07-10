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
  Building2,
  FileCheck,
  Truck,
  Shield,
} from "lucide-react";
import ArticleImage from "@/components/ArticleImage";

const CustomsClearanceCompanyGuide = () => {
  useEffect(() => {
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "fa");
    window.scrollTo(0, 0);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "شرکت ترخیص کالا چیست؟ راهنمای انتخاب بهترین شرکت ترخیص‌کار",
    description:
      "راهنمای جامع شرکت ترخیص کالا: تعریف، خدمات، مزایا، نحوه انتخاب و معیارهای شرکت ترخیص‌کار معتبر در ایران",
    image: "https://tarkhisun.com/images/blog/customs-clearance-warehouse.webp",
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
      "@id": "https://tarkhisun.com/blog/customs-clearance-company-guide",
    },
    articleSection: "راهنمای ترخیص",
    wordCount: 2600,
    keywords: "شرکت ترخیص کالا, ترخیص‌کار, خدمات ترخیص, ترخیص گمرکی, شرکت ترخیص بندرعباس",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "خانه", item: "https://tarkhisun.com" },
      { "@type": "ListItem", position: 2, name: "بلاگ", item: "https://tarkhisun.com/blog" },
      { "@type": "ListItem", position: 3, name: "شرکت ترخیص کالا چیست؟" },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "شرکت ترخیص کالا چه خدماتی ارائه می‌دهد؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "شرکت ترخیص کالا خدماتی مانند انجام تشریفات گمرکی، تهیه مدارک، پرداخت حقوق و عوارض، هماهنگی حمل‌ونقل، بازرسی کالا و پیگیری تا تحویل نهایی را ارائه می‌دهد.",
        },
      },
      {
        "@type": "Question",
        name: "هزینه خدمات شرکت ترخیص کالا چگونه محاسبه می‌شود؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "هزینه معمولاً بر اساس درصدی از ارزش کالا، نوع کالا، پیچیدگی تشریفات و حجم کار محاسبه می‌شود. برخی شرکت‌ها هزینه ثابت و برخی درصدی دریافت می‌کنند.",
        },
      },
      {
        "@type": "Question",
        name: "چگونه یک شرکت ترخیص کالای معتبر را شناسایی کنیم؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "شرکت معتبر باید دارای مجوز رسمی گمرک، سابقه کاری مناسب، دفتر در گمرک مربوطه، بیمه مسئولیت و نظرات مثبت مشتریان باشد.",
        },
      },
    ],
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://tarkhisun.com/blog/customs-clearance-company-guide" />
        <title>شرکت ترخیص کالا چیست؟ راهنمای انتخاب بهترین شرکت ترخیص‌کار</title>
        <meta
          name="description"
          content="راهنمای شرکت ترخیص کالا: خدمات ترخیص، مزایا، نحوه انتخاب و معیارهای شرکت ترخیص‌کار معتبر"
        />
        <meta
          name="keywords"
          content="شرکت ترخیص کالا, ترخیص‌کار, خدمات ترخیص کالا, شرکت ترخیص بندرعباس, ترخیص کالا از گمرک, شرکت ترخیص معتبر"
        />
        
        <meta property="og:title" content="شرکت ترخیص کالا چیست؟ راهنمای انتخاب بهترین شرکت ترخیص‌کار" />
        <meta
          property="og:description"
          content="راهنمای جامع شرکت ترخیص کالا: خدمات، مزایا و نحوه انتخاب ترخیص‌کار معتبر"
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://tarkhisun.com/blog/customs-clearance-company-guide" />
        <meta property="og:locale" content="fa_IR" />
        <meta property="og:site_name" content="ترخیصان" />
        <meta property="og:image" content="https://tarkhisun.com/images/blog/customs-clearance-warehouse.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="شرکت ترخیص کالا چیست؟ راهنمای انتخاب بهترین ترخیص‌کار" />
        <meta name="twitter:description" content="راهنمای جامع شرکت ترخیص کالا و خدمات ترخیص گمرکی" />
        <meta name="twitter:image" content="https://tarkhisun.com/images/blog/customs-clearance-warehouse.webp" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <main>
          <ArticleBreadcrumb
            category="راهنمای ترخیص"
            articleTitle="شرکت ترخیص کالا چیست؟ راهنمای انتخاب بهترین شرکت ترخیص‌کار"
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
                  شرکت ترخیص کالا چیست؟ راهنمای انتخاب بهترین شرکت ترخیص‌کار
                </h1>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-8 text-persian">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>۱۴۰۴/۹/۲۵</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>۱۶ دقیقه مطالعه</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>تیم ترخیصان</span>
                  </div>
                </div>

                <p className="text-xl text-muted-foreground text-persian leading-relaxed">
                  <strong>شرکت ترخیص کالا</strong> واسطه‌ای تخصصی بین واردکنندگان و گمرک است که تمام{" "}
                  <Link
                    to="/blog/zero-to-hundred-bandar-abbas-customs-clearance"
                    className="text-accent hover:underline"
                  >
                    مراحل ترخیص کالا از گمرک
                  </Link>{" "}
                  را انجام می‌دهد. در این راهنما با خدمات و نحوه انتخاب شرکت ترخیص‌کار معتبر آشنا می‌شوید.
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
                  src="/images/blog/customs-clearance-warehouse.webp"
                  alt="انبار گمرک و فرآیند ترخیص کالا توسط شرکت ترخیص‌کار"
                  caption="شرکت ترخیص کالا تمام مراحل ترخیص را از ورود تا تحویل انجام می‌دهد"
                  priority
                />

                {/* Definition Section */}
                <section className="mb-12">
                  <h2 className="heading-secondary mb-6 text-persian">شرکت ترخیص کالا چیست؟</h2>
                  <p className="text-body mb-6 text-persian">
                    <strong>شرکت ترخیص کالا</strong> (یا ترخیص‌کار) شرکتی است که به‌صورت تخصصی خدمات ترخیص کالا از گمرک را
                    ارائه می‌دهد. این شرکت‌ها با داشتن مجوز رسمی از گمرک ایران، به‌نمایندگی از صاحبان کالا تمام تشریفات
                    گمرکی را انجام می‌دهند.
                  </p>
                  <p className="text-body mb-6 text-persian">
                    <strong>ترخیص کالا از گمرک</strong> فرآیندی پیچیده و زمان‌بر است که نیاز به تخصص در قوانین گمرکی،{" "}
                    <Link to="/blog/hs-code-guide" className="text-accent hover:underline">
                      کدهای تعرفه
                    </Link>
                    ، مدارک و مجوزها دارد. شرکت‌های ترخیص کالا این بار را از دوش واردکنندگان برمی‌دارند.
                  </p>

                  <div className="bg-accent/10 border-r-4 border-accent rounded-lg p-6 mb-6">
                    <div className="flex items-start gap-3">
                      <Building2 className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                      <div className="text-persian">
                        <strong className="block mb-2">نکته مهم:</strong>
                        <span>
                          فقط شرکت‌هایی که دارای کارت حق‌العمل‌کاری گمرکی هستند، مجاز به انجام تشریفات ترخیص به‌نمایندگی
                          از صاحب کالا می‌باشند.
                        </span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Services Section */}
                <section className="mb-12">
                  <h2 className="heading-secondary mb-6 text-persian">خدمات شرکت ترخیص کالا</h2>

                  <div className="grid gap-6 md:grid-cols-2 mb-8">
                    <Card className="card-service">
                      <CardHeader>
                        <CardTitle className="text-persian flex items-center gap-2">
                          <FileCheck className="w-5 h-5 text-accent" />
                          خدمات اداری و مدارک
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-persian">
                          <li>• تهیه و تکمیل اظهارنامه گمرکی</li>
                          <li>• ثبت سفارش در سامانه جامع تجارت</li>
                          <li>• اخذ مجوزهای لازم</li>
                          <li>• ترجمه اسناد تجاری</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="card-service">
                      <CardHeader>
                        <CardTitle className="text-persian flex items-center gap-2">
                          <Shield className="w-5 h-5 text-accent" />
                          خدمات گمرکی
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-persian">
                          <li>• انجام تشریفات گمرکی کامل</li>
                          <li>• پرداخت حقوق و عوارض</li>
                          <li>• هماهنگی با ارزیاب گمرک</li>
                          <li>• پیگیری اختلافات گمرکی</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="card-service">
                      <CardHeader>
                        <CardTitle className="text-persian flex items-center gap-2">
                          <Truck className="w-5 h-5 text-accent" />
                          خدمات حمل‌ونقل
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-persian">
                          <li>• هماهنگی با خطوط کشتیرانی</li>
                          <li>• تخلیه و بارگیری کانتینر</li>
                          <li>• حمل داخلی تا مقصد</li>
                          <li>• انبارداری موقت</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="card-service">
                      <CardHeader>
                        <CardTitle className="text-persian flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-accent" />
                          خدمات مشاوره
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-persian">
                          <li>
                            • مشاوره{" "}
                            <Link to="/blog/customs-tariff-guide" className="text-accent hover:underline">
                              تعرفه گمرکی
                            </Link>
                          </li>
                          <li>• برآورد هزینه‌ها</li>
                          <li>• راهنمایی قوانین</li>
                          <li>• بررسی مدارک</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Second Image */}
                  <ArticleImage
                    src="/images/blog/customs-clearance-container.webp"
                    alt="کانتینرهای کالا در بندر برای ترخیص توسط شرکت ترخیص‌کار"
                    caption="شرکت ترخیص کالا از ورود کالا به بندر تا تحویل نهایی را مدیریت می‌کند"
                  />
                </section>

                {/* Selection Criteria Section */}
                <section className="mb-12">
                  <h2 className="heading-secondary mb-6 text-persian">معیارهای انتخاب شرکت ترخیص کالا</h2>

                  <div className="overflow-x-auto mb-8">
                    <table className="w-full border-collapse border border-border rounded-lg">
                      <thead className="bg-secondary">
                        <tr>
                          <th className="border border-border p-4 text-persian text-right">معیار</th>
                          <th className="border border-border p-4 text-persian text-right">توضیحات</th>
                          <th className="border border-border p-4 text-persian text-right">اهمیت</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border p-4 text-persian">
                            <strong>مجوز رسمی</strong>
                          </td>
                          <td className="border border-border p-4 text-persian">کارت حق‌العمل‌کاری معتبر</td>
                          <td className="border border-border p-4 text-persian text-accent">ضروری</td>
                        </tr>
                        <tr className="bg-secondary/30">
                          <td className="border border-border p-4 text-persian">
                            <strong>سابقه کاری</strong>
                          </td>
                          <td className="border border-border p-4 text-persian">حداقل ۵ سال فعالیت</td>
                          <td className="border border-border p-4 text-persian text-accent">خیلی مهم</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-4 text-persian">
                            <strong>دفتر در گمرک</strong>
                          </td>
                          <td className="border border-border p-4 text-persian">حضور فیزیکی در گمرک مورد نظر</td>
                          <td className="border border-border p-4 text-persian text-accent">مهم</td>
                        </tr>
                        <tr className="bg-secondary/30">
                          <td className="border border-border p-4 text-persian">
                            <strong>بیمه مسئولیت</strong>
                          </td>
                          <td className="border border-border p-4 text-persian">پوشش بیمه‌ای برای کالا</td>
                          <td className="border border-border p-4 text-persian text-accent">مهم</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-4 text-persian">
                            <strong>تخصص کالایی</strong>
                          </td>
                          <td className="border border-border p-4 text-persian">تجربه در نوع کالای شما</td>
                          <td className="border border-border p-4 text-persian text-accent">مهم</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Benefits Section */}
                <section className="mb-12">
                  <h2 className="heading-secondary mb-6 text-persian">مزایای استفاده از شرکت ترخیص کالا</h2>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3 p-4 bg-secondary/30 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                      <div className="text-persian">
                        <strong>تسریع فرآیند:</strong> با تجربه و ارتباطات گمرکی، ترخیص سریع‌تر انجام می‌شود.
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-secondary/30 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                      <div className="text-persian">
                        <strong>کاهش هزینه:</strong> انتخاب تعرفه بهینه و جلوگیری از جرایم، هزینه‌ها را کاهش می‌دهد.
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-secondary/30 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                      <div className="text-persian">
                        <strong>تخصص قانونی:</strong> آگاهی کامل از قوانین و مقررات گمرکی.
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-secondary/30 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                      <div className="text-persian">
                        <strong>صرفه‌جویی زمان:</strong> صاحب کالا می‌تواند بر کسب‌وکار اصلی تمرکز کند.
                      </div>
                    </div>
                  </div>
                </section>

                {/* CTA Section */}
                <section className="mb-12 p-8 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl">
                  <h2 className="heading-secondary mb-4 text-persian">
                    ترخیصان، شرکت ترخیص کالای معتبر بندرعباس
                  </h2>
                  <p className="text-body mb-6 text-persian">
                    با بیش از ۲۰ سال تجربه در{" "}
                    <Link to="/blog/dubai-to-abbas-import-guide" className="text-accent hover:underline">
                      واردات از دبی
                    </Link>{" "}
                    و ترخیص انواع کالا از گمرک شهید رجایی بندرعباس، آماده ارائه خدمات تخصصی ترخیص به شما هستیم.
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground text-persian"
                  >
                    <a href="tel:+989177380080">درخواست مشاوره رایگان</a>
                  </Button>
                </section>

                {/* FAQ Section */}
                <section className="mb-12">
                  <h2 className="heading-secondary mb-6 text-persian">سؤالات متداول</h2>

                  <div className="space-y-6">
                    <div className="border-b border-border pb-4">
                      <h3 className="font-bold mb-2 text-persian">شرکت ترخیص کالا چه خدماتی ارائه می‌دهد؟</h3>
                      <p className="text-muted-foreground text-persian">
                        خدماتی مانند انجام تشریفات گمرکی، تهیه مدارک، پرداخت حقوق و عوارض، هماهنگی حمل‌ونقل و پیگیری تا
                        تحویل نهایی.
                      </p>
                    </div>
                    <div className="border-b border-border pb-4">
                      <h3 className="font-bold mb-2 text-persian">هزینه خدمات شرکت ترخیص کالا چگونه است؟</h3>
                      <p className="text-muted-foreground text-persian">
                        معمولاً بر اساس درصدی از ارزش کالا، نوع کالا و پیچیدگی تشریفات محاسبه می‌شود.
                      </p>
                    </div>
                    <div className="border-b border-border pb-4">
                      <h3 className="font-bold mb-2 text-persian">شرکت ترخیص کالای معتبر چه ویژگی‌هایی دارد؟</h3>
                      <p className="text-muted-foreground text-persian">
                        مجوز رسمی گمرک، سابقه کاری مناسب، دفتر در گمرک، بیمه مسئولیت و نظرات مثبت مشتریان.
                      </p>
                    </div>
                  </div>
                </section>

                <RelatedArticles currentPostId={26} limit={3} />
              </div>
            </div>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CustomsClearanceCompanyGuide;
