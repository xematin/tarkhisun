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
  Ship,
  Plane,
  Truck,
  Train,
} from "lucide-react";
import ArticleImage from "@/components/ArticleImage";

const InternationalShippingGuide = () => {
  useEffect(() => {
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "fa");
    window.scrollTo(0, 0);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "حمل و نقل بین‌المللی چیست؟ راهنمای کامل روش‌های حمل کالا",
    description:
      "راهنمای جامع حمل و نقل بین‌المللی: انواع روش‌های حمل دریایی، هوایی، زمینی و ریلی، مزایا، هزینه‌ها و نکات مهم",
    image: "https://tarkhisun.com/images/blog/international-shipping-cargo.webp",
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
      "@id": "https://tarkhisun.com/blog/international-shipping-guide",
    },
    articleSection: "تجارت بین‌الملل",
    wordCount: 2700,
    keywords: "حمل و نقل بین‌المللی, حمل دریایی, حمل هوایی, شرکت حمل کالا, فورواردر",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "خانه", item: "https://tarkhisun.com" },
      { "@type": "ListItem", position: 2, name: "بلاگ", item: "https://tarkhisun.com/blog" },
      { "@type": "ListItem", position: 3, name: "حمل و نقل بین‌المللی" },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "بهترین روش حمل و نقل بین‌المللی کدام است؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "انتخاب بهترین روش به نوع کالا، حجم، فوریت و بودجه بستگی دارد. حمل دریایی برای حجم بالا و هزینه کم، حمل هوایی برای کالاهای فوری و ارزشمند مناسب است.",
        },
      },
      {
        "@type": "Question",
        name: "هزینه حمل و نقل بین‌المللی چگونه محاسبه می‌شود؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "هزینه بر اساس وزن، حجم، مسافت، نوع کالا، روش حمل و بیمه محاسبه می‌شود. معمولاً حمل دریایی ارزان‌ترین و حمل هوایی گران‌ترین است.",
        },
      },
      {
        "@type": "Question",
        name: "اینکوترمز چه نقشی در حمل و نقل بین‌المللی دارد؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "اینکوترمز شرایط تحویل کالا را مشخص می‌کند و تعیین می‌کند هزینه‌ها و مسئولیت‌های حمل بین خریدار و فروشنده چگونه تقسیم شود.",
        },
      },
    ],
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://tarkhisun.com/blog/international-shipping-guide" />
        <title>حمل و نقل بین‌المللی چیست؟ راهنمای کامل روش‌های حمل کالا</title>
        <meta
          name="description"
          content="راهنمای حمل و نقل بین‌المللی: روش‌های حمل دریایی، هوایی، زمینی، مزایا، هزینه‌ها و نکات مهم"
        />
        <meta
          name="keywords"
          content="حمل و نقل بین‌المللی, حمل دریایی, حمل هوایی, حمل زمینی, شرکت حمل کالا, فورواردر, ترانزیت کالا, حمل کانتینری"
        />
        
        <meta property="og:title" content="حمل و نقل بین‌المللی چیست؟ راهنمای کامل روش‌های حمل کالا" />
        <meta
          property="og:description"
          content="راهنمای جامع حمل و نقل بین‌المللی: انواع روش‌ها، مزایا و هزینه‌ها"
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://tarkhisun.com/blog/international-shipping-guide" />
        <meta property="og:locale" content="fa_IR" />
        <meta property="og:site_name" content="ترخیصان" />
        <meta property="og:image" content="https://tarkhisun.com/images/blog/international-shipping-cargo.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="حمل و نقل بین‌المللی چیست؟ راهنمای کامل روش‌های حمل" />
        <meta name="twitter:description" content="راهنمای جامع حمل و نقل بین‌المللی و روش‌های حمل کالا" />
        <meta name="twitter:image" content="https://tarkhisun.com/images/blog/international-shipping-cargo.webp" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <main>
          <ArticleBreadcrumb
            category="تجارت بین‌الملل"
            articleTitle="حمل و نقل بین‌المللی چیست؟ راهنمای کامل روش‌های حمل کالا"
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
                  حمل و نقل بین‌المللی چیست؟ راهنمای کامل روش‌های حمل کالا
                </h1>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-8 text-persian">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>۱۴۰۴/۹/۲۵</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>۲۰ دقیقه مطالعه</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>تیم ترخیصان</span>
                  </div>
                </div>

                <p className="text-xl text-muted-foreground text-persian leading-relaxed">
                  <strong>حمل و نقل بین‌المللی</strong> یکی از ارکان اصلی{" "}
                  <Link to="/blog/import-export-guide-iran" className="text-accent hover:underline">
                    تجارت بین‌المللی
                  </Link>{" "}
                  است. در این راهنما با انواع روش‌های حمل، مزایا، معایب و نحوه انتخاب بهترین گزینه آشنا می‌شوید.
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
                  src="/images/blog/international-shipping-cargo.webp"
                  alt="کشتی باری در حال حمل کانتینرهای کالا در حمل و نقل بین‌المللی"
                  caption="حمل دریایی پرکاربردترین روش حمل و نقل بین‌المللی است"
                  priority
                />

                {/* Definition Section */}
                <section className="mb-12">
                  <h2 className="heading-secondary mb-6 text-persian">حمل و نقل بین‌المللی چیست؟</h2>
                  <p className="text-body mb-6 text-persian">
                    <strong>حمل و نقل بین‌المللی</strong> به جابجایی کالا از یک کشور به کشور دیگر گفته می‌شود که می‌تواند
                    از طریق دریا، هوا، زمین یا ریل انجام شود. انتخاب روش مناسب حمل، تأثیر مستقیم بر هزینه‌ها، زمان تحویل
                    و امنیت کالا دارد.
                  </p>
                  <p className="text-body mb-6 text-persian">
                    شرکت‌های فورواردر (Freight Forwarder) واسطه‌هایی هستند که هماهنگی‌های لازم برای حمل کالا از مبدأ تا
                    مقصد را انجام می‌دهند و با درک صحیح از{" "}
                    <Link to="/blog/incoterms-guide" className="text-accent hover:underline">
                      اینکوترمز
                    </Link>{" "}
                    و قوانین گمرکی، فرآیند را تسهیل می‌کنند.
                  </p>
                </section>

                {/* Shipping Methods Section */}
                <section className="mb-12">
                  <h2 className="heading-secondary mb-6 text-persian">انواع روش‌های حمل و نقل بین‌المللی</h2>

                  <div className="grid gap-6 md:grid-cols-2 mb-8">
                    <Card className="card-service">
                      <CardHeader>
                        <CardTitle className="text-persian flex items-center gap-2">
                          <Ship className="w-5 h-5 text-accent" />
                          حمل دریایی
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-persian">
                          <li>• مناسب حجم بالای کالا</li>
                          <li>• کمترین هزینه</li>
                          <li>• زمان حمل طولانی‌تر</li>
                          <li>• FCL و LCL</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="card-service">
                      <CardHeader>
                        <CardTitle className="text-persian flex items-center gap-2">
                          <Plane className="w-5 h-5 text-accent" />
                          حمل هوایی
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-persian">
                          <li>• سریع‌ترین روش</li>
                          <li>• مناسب کالای ارزشمند</li>
                          <li>• هزینه بالاتر</li>
                          <li>• محدودیت وزن و حجم</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="card-service">
                      <CardHeader>
                        <CardTitle className="text-persian flex items-center gap-2">
                          <Truck className="w-5 h-5 text-accent" />
                          حمل زمینی
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-persian">
                          <li>• مناسب کشورهای همسایه</li>
                          <li>• انعطاف‌پذیری بالا</li>
                          <li>• Door-to-Door</li>
                          <li>• ترانزیت منطقه‌ای</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="card-service">
                      <CardHeader>
                        <CardTitle className="text-persian flex items-center gap-2">
                          <Train className="w-5 h-5 text-accent" />
                          حمل ریلی
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-persian">
                          <li>• مناسب کالای سنگین</li>
                          <li>• صرفه اقتصادی</li>
                          <li>• کم‌خطرتر</li>
                          <li>• کریدور شمال-جنوب</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Second Image */}
                  <ArticleImage
                    src="/images/blog/international-shipping-airplane.webp"
                    alt="هواپیمای باری در حال حمل و نقل بین‌المللی کالا"
                    caption="حمل هوایی سریع‌ترین روش برای کالاهای فوری و ارزشمند است"
                  />
                </section>

                {/* Comparison Table */}
                <section className="mb-12">
                  <h2 className="heading-secondary mb-6 text-persian">مقایسه روش‌های حمل و نقل بین‌المللی</h2>

                  <div className="overflow-x-auto mb-8">
                    <table className="w-full border-collapse border border-border rounded-lg">
                      <thead className="bg-secondary">
                        <tr>
                          <th className="border border-border p-4 text-persian text-right">معیار</th>
                          <th className="border border-border p-4 text-persian text-right">دریایی</th>
                          <th className="border border-border p-4 text-persian text-right">هوایی</th>
                          <th className="border border-border p-4 text-persian text-right">زمینی</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border p-4 text-persian">
                            <strong>هزینه</strong>
                          </td>
                          <td className="border border-border p-4 text-persian text-accent">پایین</td>
                          <td className="border border-border p-4 text-persian">بالا</td>
                          <td className="border border-border p-4 text-persian">متوسط</td>
                        </tr>
                        <tr className="bg-secondary/30">
                          <td className="border border-border p-4 text-persian">
                            <strong>سرعت</strong>
                          </td>
                          <td className="border border-border p-4 text-persian">کند</td>
                          <td className="border border-border p-4 text-persian text-accent">سریع</td>
                          <td className="border border-border p-4 text-persian">متوسط</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-4 text-persian">
                            <strong>ظرفیت</strong>
                          </td>
                          <td className="border border-border p-4 text-persian text-accent">بالا</td>
                          <td className="border border-border p-4 text-persian">محدود</td>
                          <td className="border border-border p-4 text-persian">متوسط</td>
                        </tr>
                        <tr className="bg-secondary/30">
                          <td className="border border-border p-4 text-persian">
                            <strong>ریسک</strong>
                          </td>
                          <td className="border border-border p-4 text-persian">متوسط</td>
                          <td className="border border-border p-4 text-persian text-accent">کم</td>
                          <td className="border border-border p-4 text-persian">متوسط</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Important Points */}
                <section className="mb-12">
                  <h2 className="heading-secondary mb-6 text-persian">نکات مهم در حمل و نقل بین‌المللی</h2>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3 p-4 bg-secondary/30 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                      <div className="text-persian">
                        <strong>بیمه کالا:</strong> همیشه کالای خود را بیمه کنید تا در صورت آسیب یا گم‌شدن، خسارت جبران
                        شود.
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-secondary/30 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                      <div className="text-persian">
                        <strong>بسته‌بندی:</strong> بسته‌بندی مناسب برای جلوگیری از آسیب در طول حمل ضروری است.
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-secondary/30 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                      <div className="text-persian">
                        <strong>مستندات:</strong>{" "}
                        <Link to="/blog/manifest-guide" className="text-accent hover:underline">
                          مانیفست
                        </Link>{" "}
                        و اسناد حمل باید کامل و دقیق باشند.
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-secondary/30 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                      <div className="text-persian">
                        <strong>ترانزیت:</strong> برای کشورهای محصور در خشکی،{" "}
                        <Link to="/blog/kuwait-afghanistan-transit-guide" className="text-accent hover:underline">
                          ترانزیت
                        </Link>{" "}
                        گزینه مناسبی است.
                      </div>
                    </div>
                  </div>
                </section>

                {/* CTA Section */}
                <section className="mb-12 p-8 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl">
                  <h2 className="heading-secondary mb-4 text-persian">خدمات حمل و نقل بین‌المللی ترخیصان</h2>
                  <p className="text-body mb-6 text-persian">
                    با تجربه بیش از ۲۰ سال در{" "}
                    <Link to="/blog/dubai-to-abbas-import-guide" className="text-accent hover:underline">
                      واردات از دبی به بندرعباس
                    </Link>
                    ، خدمات حمل دریایی، هوایی و زمینی را با بهترین نرخ ارائه می‌دهیم.
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground text-persian"
                  >
                    <a href="tel:+989177380080">استعلام نرخ حمل</a>
                  </Button>
                </section>

                {/* FAQ Section */}
                <section className="mb-12">
                  <h2 className="heading-secondary mb-6 text-persian">سؤالات متداول</h2>

                  <div className="space-y-6">
                    <div className="border-b border-border pb-4">
                      <h3 className="font-bold mb-2 text-persian">بهترین روش حمل و نقل بین‌المللی کدام است؟</h3>
                      <p className="text-muted-foreground text-persian">
                        به نوع کالا، حجم، فوریت و بودجه بستگی دارد. حمل دریایی برای حجم بالا، حمل هوایی برای کالای فوری.
                      </p>
                    </div>
                    <div className="border-b border-border pb-4">
                      <h3 className="font-bold mb-2 text-persian">هزینه حمل و نقل بین‌المللی چگونه محاسبه می‌شود؟</h3>
                      <p className="text-muted-foreground text-persian">
                        بر اساس وزن، حجم، مسافت، نوع کالا، روش حمل و بیمه محاسبه می‌شود.
                      </p>
                    </div>
                    <div className="border-b border-border pb-4">
                      <h3 className="font-bold mb-2 text-persian">اینکوترمز چه نقشی دارد؟</h3>
                      <p className="text-muted-foreground text-persian">
                        شرایط تحویل کالا را مشخص کرده و تعیین می‌کند هزینه‌ها چگونه تقسیم شود.
                      </p>
                    </div>
                  </div>
                </section>

                <RelatedArticles currentPostId={27} limit={3} />
              </div>
            </div>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default InternationalShippingGuide;
