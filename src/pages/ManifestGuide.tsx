import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedArticles from "@/components/RelatedArticles";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, FileText, Ship, Plane, Truck, CheckCircle2, AlertCircle } from "lucide-react";
import ArticleImage from "@/components/ArticleImage";

const ManifestGuide = () => {
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
        headline: "مانیفست در گمرک چیست؟ راهنمای جامع مانیفست بارنامه",
        description:
          "راهنمای کامل مانیفست گمرکی: تعریف، انواع مانیفست (دریایی، هوایی، زمینی)، اطلاعات ضروری، نقش در ترخیص کالا، تفاوت با بارنامه و نکات مهم ثبت مانیفست",
        image: "https://tarkhisun.com/og-image.jpg",
        author: {
          "@type": "Organization",
          name: "تیم ترخیصان",
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
        datePublished: "2025-09-29",
        dateModified: "2025-09-29",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": "https://tarkhisun.com/blog/manifest-guide",
        },
        articleSection: "اسناد گمرکی",
        keywords: "مانیفست گمرک, مانیفست چیست, مانیفست بارنامه, مانیفست دریایی, مانیفست هوایی, مانیفست زمینی",
        inLanguage: "fa-IR",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "مانیفست در گمرک چیست؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "مانیفست (Manifest) یک سند رسمی و اجباری است که توسط شرکت حمل‌ونقل (کشتیرانی، هواپیمایی یا حمل‌ونقل زمینی) تهیه و به گمرک ارائه می‌شود. این سند شامل فهرست کامل محموله‌های موجود در وسیله نقلیه (کشتی، هواپیما، کامیون) است.",
            },
          },
          {
            "@type": "Question",
            name: "انواع مانیفست گمرکی کدامند؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "انواع مانیفست عبارتند از: 1) مانیفست دریایی (Sea Manifest) - برای محموله‌های دریایی 2) مانیفست هوایی (Air Manifest) - برای محموله‌های هوایی 3) مانیفست زمینی (Road Manifest) - برای محموله‌های زمینی",
            },
          },
          {
            "@type": "Question",
            name: "تفاوت مانیفست و بارنامه چیست؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "بارنامه (Bill of Lading) سند مالکیت کالا است که توسط حمل‌کننده برای یک محموله خاص صادر می‌شود، در حالی که مانیفست فهرست کلی همه محموله‌های یک وسیله نقلیه است. بارنامه برای هر محموله جداگانه صادر می‌شود اما یک مانیفست برای کل وسیله نقلیه تهیه می‌شود.",
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
            name: "مانیفست در گمرک چیست",
          },
        ],
      },
    ],
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://tarkhisun.com/blog/manifest-guide" />
        <title>مانیفست در گمرک چیست؟ راهنمای جامع مانیفست بارنامه | ترخیصان</title>
        <meta
          name="description"
          content="راهنمای مانیفست گمرکی: تعریف، انواع مانیفست دریایی، هوایی و زمینی، نقش در ترخیص و تفاوت با بارنامه"
        />
        <meta
          name="keywords"
          content="مانیفست گمرک, مانیفست چیست, مانیفست بارنامه, مانیفست دریایی, مانیفست هوایی, مانیفست زمینی, ترخیص کالا, اسناد گمرکی, بارنامه, واردات کالا, صادرات کالا, گمرک ایران"
        />
        
        <meta property="og:title" content="مانیفست در گمرک چیست؟ راهنمای جامع مانیفست بارنامه" />
        <meta property="og:description" content="راهنمای کامل مانیفست گمرکی: تعریف، انواع، کاربرد و نکات مهم" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://tarkhisun.com/blog/manifest-guide" />
        <meta property="og:image" content="https://tarkhisun.com/og-image.jpg" />
        <meta property="og:locale" content="fa_IR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="مانیفست در گمرک چیست؟ راهنمای جامع مانیفست بارنامه" />
        <meta name="twitter:description" content="راهنمای کامل مانیفست گمرکی: تعریف، انواع، کاربرد و نکات مهم" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main>
          {/* Breadcrumb */}
          <nav className="container mx-auto px-4 py-4" dir="rtl" aria-label="breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-accent transition-colors">
                  خانه
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link to="/blog" className="hover:text-accent transition-colors">
                  بلاگ
                </Link>
              </li>
              <li>/</li>
              <li className="text-foreground">مانیفست در گمرک</li>
            </ol>
          </nav>

          {/* Hero Section */}
          <section className="py-12 bg-gradient-to-br from-secondary to-white">
            <div className="container mx-auto px-4" dir="rtl">
              <article className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-6 flex-wrap">
                  <span className="text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
                    اسناد گمرکی
                  </span>
                  <span className="text-sm text-muted-foreground">۱۴۰۴/۷/۸</span>
                  <span className="text-sm text-muted-foreground">زمان مطالعه: ۱۴ دقیقه</span>
                </div>

                <h1 className="heading-primary mb-6 text-persian">
                  مانیفست در گمرک چیست؟ راهنمای جامع مانیفست بارنامه
                </h1>

                <p className="text-xl text-muted-foreground leading-relaxed text-persian">
                  مانیفست یکی از مهم‌ترین اسناد گمرکی است که نقش حیاتی در فرآیند ترخیص کالا دارد. در این مقاله به طور
                  کامل با تعریف، انواع، کاربرد و نکات مهم مانیفست آشنا می‌شوید.
                </p>

                <ArticleImage
                  src="/images/blog/manifest-documents.webp"
                  alt="مانیفست گمرکی - اسناد و مدارک حمل کالا در گمرک"
                  caption="مانیفست بارنامه - سند اصلی حمل و نقل کالا در گمرکات"
                  priority
                  className="mt-8"
                />
              </article>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-16">
            <div className="container mx-auto px-4" dir="rtl">
              <article className="max-w-4xl mx-auto prose prose-lg">
                {/* تعریف مانیفست */}
                <div className="mb-12">
                  <h2 className="heading-secondary mb-6 text-persian flex items-center gap-3">
                    <FileText className="w-8 h-8 text-accent" />
                    مانیفست گمرکی چیست؟
                  </h2>

                  <p className="text-lg leading-relaxed text-muted-foreground mb-6 text-persian">
                    <strong className="text-foreground">مانیفست (Manifest)</strong> یک سند رسمی و اجباری است که توسط
                    شرکت حمل‌ونقل (کشتیرانی، هواپیمایی یا حمل‌ونقل زمینی) تهیه و به گمرک ارائه می‌شود. این سند شامل
                    فهرست کامل محموله‌های موجود در وسیله نقلیه (کشتی، هواپیما، کامیون) است و برای{" "}
                    <Link to="/blog/bandar-abbas-comprehensive-clearance-guide" className="text-accent hover:underline">
                      ترخیص کالا از بندرعباس
                    </Link>{" "}
                    و سایر گمرکات ضروری است.
                  </p>

                  <Card className="bg-accent/5 border-accent/20">
                    <CardContent className="pt-6">
                      <p className="text-base text-persian leading-relaxed">
                        <strong className="text-accent">نکته مهم:</strong> مانیفست باید قبل از ورود وسیله نقلیه به گمرک
                        مقصد، به صورت الکترونیکی در{" "}
                        <Link to="/blog/ntsw-complete-guide" className="text-accent hover:underline">
                          سامانه جامع تجارت
                        </Link>{" "}
                        ثبت شود. این امر برای کنترل و نظارت بر محموله‌های وارداتی و صادراتی الزامی است. همچنین آشنایی با{" "}
                        <Link to="/blog/incoterms-guide" className="text-accent hover:underline">
                          شرایط تحویل اینکوترمز
                        </Link>{" "}
                        برای درک مسئولیت‌های حمل ضروری است.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* اطلاعات موجود در مانیفست */}
                <div className="mb-12">
                  <h2 className="heading-secondary mb-6 text-persian">اطلاعات موجود در مانیفست گمرکی</h2>

                  <p className="text-lg leading-relaxed text-muted-foreground mb-6 text-persian">
                    مانیفست شامل اطلاعات دقیق و جامعی است که برای شناسایی محموله‌ها ضروری است:
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {[
                      "نام کشتی، هواپیما یا وسیله نقلیه",
                      "شماره رویداد (Voyage Number)",
                      "مبدأ و مقصد محموله",
                      "تاریخ ورود یا خروج",
                      "شماره بارنامه (Bill of Lading)",
                      "نام و آدرس فرستنده (Shipper)",
                      "نام و آدرس گیرنده (Consignee)",
                      "توضیحات کالا و نوع بسته‌بندی",
                      "تعداد بسته‌ها و وزن",
                      "علامت‌های روی بسته‌ها",
                      "بندر یا فرودگاه بارگیری",
                      "بندر یا فرودگاه تخلیه",
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <span className="text-persian">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* انواع مانیفست */}
                <div className="mb-12">
                  <h2 className="heading-secondary mb-6 text-persian">انواع مانیفست گمرکی</h2>

                  <div className="space-y-6">
                    {/* مانیفست دریایی */}
                    <Card className="card-service">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="p-3 bg-accent/10 rounded-lg">
                            <Ship className="w-8 h-8 text-accent" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl mb-2 text-persian">
                              <strong>۱. مانیفست دریایی (Sea Manifest)</strong>
                            </h3>
                            <p className="text-muted-foreground text-persian leading-relaxed">
                              برای محموله‌های حمل‌شده از طریق کشتی استفاده می‌شود. این نوع مانیفست شامل اطلاعات کامل
                              کشتی، کنتینرها و محموله‌های بارگیری‌شده در هر بندر است.
                            </p>
                          </div>
                        </div>
                        <div className="bg-secondary/30 p-4 rounded-lg">
                          <p className="text-sm text-persian">
                            <strong>ویژگی‌های مهم:</strong> شامل شماره کنتینر، نوع کنتینر (20ft، 40ft)، وزن ناخالص و
                            خالص، و Seal Number
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* مانیفست هوایی */}
                    <Card className="card-service">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="p-3 bg-accent/10 rounded-lg">
                            <Plane className="w-8 h-8 text-accent" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold mb-2 text-persian">۲. مانیفست هوایی (Air Manifest)</h3>
                            <p className="text-muted-foreground text-persian leading-relaxed">
                              برای محموله‌های حمل‌شده با هواپیما کاربرد دارد. این مانیفست معمولاً شامل جزئیات پرواز و
                              بار هوایی است.
                            </p>
                          </div>
                        </div>
                        <div className="bg-secondary/30 p-4 rounded-lg">
                          <p className="text-sm text-persian">
                            <strong>ویژگی‌های مهم:</strong> شماره پرواز، شماره بارنامه هوایی (AWB)، فرودگاه مبدأ و مقصد،
                            و توضیحات کالای خطرناک (در صورت وجود)
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* مانیفست زمینی */}
                    <Card className="card-service">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="p-3 bg-accent/10 rounded-lg">
                            <Truck className="w-8 h-8 text-accent" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold mb-2 text-persian">۳. مانیفست زمینی (Road Manifest)</h3>
                            <p className="text-muted-foreground text-persian leading-relaxed">
                              برای محموله‌هایی که از طریق کامیون یا راه‌آهن حمل می‌شوند، استفاده می‌شود. معمولاً در
                              مرزهای زمینی کاربرد دارد.
                            </p>
                          </div>
                        </div>
                        <div className="bg-secondary/30 p-4 rounded-lg">
                          <p className="text-sm text-persian">
                            <strong>ویژگی‌های مهم:</strong> شماره پلاک وسیله نقلیه، شماره کارنه TIR (در صورت حمل
                            بین‌المللی)، مرز ورودی و خروجی
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <ArticleImage
                  src="/images/blog/cargo-ship-port.webp"
                  alt="کشتی باری در بندر - مانیفست دریایی"
                  caption="کشتی باری با مانیفست دریایی در بندر"
                />

                {/* نقش مانیفست در ترخیص */}
                <div className="mb-12">
                  <h2 className="heading-secondary mb-6 text-persian">نقش مانیفست در فرآیند ترخیص کالا</h2>

                  <p className="text-lg leading-relaxed text-muted-foreground mb-6 text-persian">
                    مانیفست نقش کلیدی در فرآیند{" "}
                    <Link to="/blog/bandar-abbas-comprehensive-clearance-guide" className="text-accent hover:underline">
                      ترخیص کالا
                    </Link>{" "}
                    دارد:
                  </p>

                  <div className="space-y-4">
                    {[
                      {
                        title: "شناسایی محموله‌ها",
                        description: "گمرک با استفاده از مانیفست، محموله‌های وارده را شناسایی و ثبت می‌کند.",
                      },
                      {
                        title: "کنترل و نظارت",
                        description: "امکان مقایسه اطلاعات مانیفست با اظهارنامه گمرکی و بارنامه فراهم می‌شود.",
                      },
                      {
                        title: "جلوگیری از قاچاق",
                        description: "ثبت پیشاپیش مانیفست به کنترل و جلوگیری از ورود کالای غیرمجاز کمک می‌کند.",
                      },
                      {
                        title: "آمار تجاری",
                        description: "داده‌های مانیفست برای تهیه آمارهای تجارت خارجی استفاده می‌شود.",
                      },
                    ].map((item, index) => (
                      <div key={index} className="flex gap-4 p-4 bg-muted/30 rounded-lg">
                        <div className="flex-shrink-0 w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground mb-1 text-persian">{item.title}</h3>
                          <p className="text-muted-foreground text-persian">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* تفاوت مانیفست و بارنامه */}
                <div className="mb-12">
                  <h2 className="heading-secondary mb-6 text-persian">تفاوت مانیفست و بارنامه</h2>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-muted">
                          <th className="border border-border p-3 text-right text-persian">ویژگی</th>
                          <th className="border border-border p-3 text-right text-persian">مانیفست</th>
                          <th className="border border-border p-3 text-right text-persian">بارنامه</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border p-3 text-persian font-semibold">تعریف</td>
                          <td className="border border-border p-3 text-persian">فهرست کل محموله‌های یک وسیله نقلیه</td>
                          <td className="border border-border p-3 text-persian">سند مالکیت یک محموله خاص</td>
                        </tr>
                        <tr className="bg-muted/30">
                          <td className="border border-border p-3 text-persian font-semibold">صادرکننده</td>
                          <td className="border border-border p-3 text-persian">شرکت حمل‌ونقل</td>
                          <td className="border border-border p-3 text-persian">شرکت حمل‌ونقل</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-3 text-persian font-semibold">تعداد</td>
                          <td className="border border-border p-3 text-persian">یک مانیفست برای هر وسیله نقلیه</td>
                          <td className="border border-border p-3 text-persian">یک بارنامه برای هر محموله</td>
                        </tr>
                        <tr className="bg-muted/30">
                          <td className="border border-border p-3 text-persian font-semibold">کاربرد</td>
                          <td className="border border-border p-3 text-persian">کنترل گمرکی</td>
                          <td className="border border-border p-3 text-persian">اثبات مالکیت و تحویل کالا</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* نکات مهم */}
                <div className="mb-12">
                  <h2 className="heading-secondary mb-6 text-persian flex items-center gap-3">
                    <AlertCircle className="w-8 h-8 text-amber-500" />
                    نکات مهم در ثبت مانیفست
                  </h2>

                  <div className="space-y-4">
                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                      <p className="text-persian text-amber-800">
                        <strong>⚠️ دقت در اطلاعات:</strong> هرگونه مغایرت بین مانیفست و بارنامه می‌تواند منجر به مشکلات
                        گمرکی شود.
                      </p>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                      <p className="text-persian text-amber-800">
                        <strong>⚠️ زمان ثبت:</strong> مانیفست باید قبل از رسیدن وسیله نقلیه به گمرک مقصد ثبت شود.
                      </p>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                      <p className="text-persian text-amber-800">
                        <strong>⚠️ اصلاح مانیفست:</strong> در صورت نیاز به اصلاح، باید با هماهنگی گمرک و شرکت حمل‌ونقل
                        اقدام شود.
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-8 rounded-2xl mb-12">
                  <h2 className="text-2xl font-bold mb-4 text-persian">نیاز به مشاوره در ترخیص کالا دارید؟</h2>
                  <p className="mb-6 opacity-90 text-persian">
                    تیم متخصص ترخیصان با دانش کامل از اسناد گمرکی، آماده کمک به شما در فرآیند ترخیص کالا است.
                  </p>
                  <Button asChild size="lg" variant="secondary">
                    <Link to="/#contact">
                      درخواست مشاوره رایگان
                      <ArrowLeft className="mr-2 w-5 h-5" />
                    </Link>
                  </Button>
                </div>

                {/* Related Articles */}
                <RelatedArticles currentPostId={10} />

                {/* Back to Blog */}
                <div className="text-center mt-12">
                  <Button asChild variant="outline">
                    <Link to="/blog">
                      <ArrowRight className="ml-2 w-4 h-4" />
                      بازگشت به بلاگ
                    </Link>
                  </Button>
                </div>
              </article>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ManifestGuide;
