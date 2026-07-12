import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleBreadcrumb from "@/components/ArticleBreadcrumb";
import RelatedArticles from "@/components/RelatedArticles";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Droplet, FileText, CheckCircle2, AlertCircle, Calculator, Package, Shield } from "lucide-react";
import ArticleImage from "@/components/ArticleImage";

const WaterTankClearanceGuide = () => {
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
        headline: "ترخیص مخزن ذخیره آب از گمرک بندرعباس | راهنمای کامل واردات تانکر آب",
        description:
          "راهنمای جامع ترخیص مخزن ذخیره آب از گمرک بندرعباس: انواع تانکر آب، مدارک لازم، کد تعرفه HS، حقوق گمرکی، مراحل واردات و استانداردها",
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
          address: {
            "@type": "PostalAddress",
            addressLocality: "بندرعباس",
            addressRegion: "هرمزگان",
            addressCountry: "IR",
          },
        },
        datePublished: "2025-10-22",
        dateModified: "2025-10-22",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": "https://tarkhisun.com/blog/water-tank-clearance-bandar-abbas-guide",
        },
        keywords: "ترخیص مخزن آب, تانکر ذخیره آب, واردات مخزن آب, گمرک بندرعباس",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "آیا واردات مخزن ذخیره آب نیاز به مجوز دارد؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "بله، برای واردات مخزن آب به کارت بازرگانی، ثبت سفارش در سامانه جامع تجارت و در برخی موارد مجوز سازمان استاندارد و بهداشت نیاز است.",
            },
          },
          {
            "@type": "Question",
            name: "حقوق گمرکی مخزن ذخیره آب چقدر است؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "حقوق گمرکی مخزن آب بین 5 تا 26 درصد ارزش CIF کالا است که بسته به جنس، ظرفیت و کد تعرفه متفاوت است.",
            },
          },
          {
            "@type": "Question",
            name: "کد تعرفه HS مخزن آب چیست؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "کد تعرفه مخازن آب بسته به جنس متفاوت است: مخازن پلاستیکی 3925.10، مخازن فلزی 7309 و مخازن فایبرگلاس 7020.",
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
            name: "ترخیص مخزن ذخیره آب",
          },
        ],
      },
    ],
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://tarkhisun.com/blog/water-tank-clearance-bandar-abbas-guide" />
        <title>ترخیص مخزن ذخیره آب از گمرک بندرعباس | راهنمای کامل واردات تانکر آب</title>
        <meta
          name="description"
          content="راهنمای ترخیص مخزن آب از گمرک بندرعباس: مدارک، کد تعرفه، حقوق گمرکی و مجوزهای بهداشتی واردات تانکر"
        />
        <meta
          name="keywords"
          content="ترخیص مخزن آب, تانکر ذخیره آب, واردات مخزن آب, گمرک بندرعباس, حقوق گمرکی مخزن آب, کد تعرفه مخزن آب, مخزن پلی اتیلن, مخزن فایبرگلاس, تانکر استیل, مجوز بهداشت مخزن آب, استاندارد مخزن آب, واردات تانکر"
        />
        
        <meta property="og:title" content="ترخیص مخزن ذخیره آب از گمرک بندرعباس | راهنمای کامل" />
        <meta
          property="og:description"
          content="راهنمای جامع ترخیص مخزن ذخیره آب: مدارک، تعرفه، مراحل واردات و نکات مهم"
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://tarkhisun.com/blog/water-tank-clearance-bandar-abbas-guide" />
        <meta property="og:image" content="https://tarkhisun.com/og-image.jpg" />
        <meta property="og:locale" content="fa_IR" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-8 max-w-4xl" dir="rtl">
          <ArticleBreadcrumb category="راهنمای ترخیص" articleTitle="ترخیص مخزن ذخیره آب" />

          <article className="prose prose-lg max-w-none">
            {/* Article Header */}
            <header className="mb-8 pb-6 border-b border-border">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-full text-persian">
                  راهنمای ترخیص
                </span>
                <span className="text-sm text-muted-foreground text-persian">۱۴۰۴/۸/۱</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-persian">
                ترخیص مخزن ذخیره آب از <strong>گمرک بندرعباس</strong>
                <br />
                <span className="text-accent">راهنمای کامل واردات تانکر آب</span>
              </h1>

              <p className="text-xl text-muted-foreground text-persian leading-relaxed">
                راهنمای جامع ترخیص مخزن ذخیره آب: انواع تانکر، مدارک لازم، کد تعرفه HS، حقوق گمرکی، استانداردها و
                مجوزهای بهداشتی
              </p>

              <ArticleImage
                src="/images/blog/water-tank-clearance-bandar-abbas-guide.webp"
                alt="ترخیص مخزن ذخیره آب از گمرک بندرعباس | راهنمای کامل واردات تانکر"
                caption="انواع مخازن ذخیره آب قابل واردات و ترخیص از گمرک بندرعباس"
              />
            </header>

            {/* Introduction */}
            <section className="mb-8">
              <p className="text-lg leading-relaxed text-foreground text-persian">
                <strong>مخزن ذخیره آب</strong> یکی از محصولات پرتقاضا در بازار ایران است که واردات آن از کشورهای مختلف
                انجام می‌شود.
                <strong>ترخیص مخزن آب از گمرک بندرعباس</strong> نیاز به آشنایی با مقررات، استانداردها و مجوزهای لازم
                دارد. برای آشنایی با{" "}
                <Link to="/blog/hs-code-guide" className="text-accent hover:underline">
                  کدهای تعرفه HS
                </Link>{" "}
                و{" "}
                <Link to="/blog/customs-tariff-guide" className="text-accent hover:underline">
                  محاسبه حقوق گمرکی
                </Link>
                ، مقالات مرتبط را مطالعه کنید.
              </p>
            </section>

            {/* Types of Water Tanks */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2 text-persian">
                <Droplet className="w-6 h-6 text-accent" />
                انواع مخزن ذخیره آب
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: "مخزن پلی‌اتیلن", desc: "سبک، مقاوم، مناسب مصارف خانگی", icon: Package },
                  { title: "مخزن فایبرگلاس", desc: "مقاوم در برابر خوردگی، عمر طولانی", icon: Shield },
                  { title: "مخزن استیل", desc: "بهداشتی، مناسب صنایع غذایی", icon: CheckCircle2 },
                  { title: "مخزن گالوانیزه", desc: "اقتصادی، مقاوم در برابر زنگ‌زدگی", icon: FileText },
                ].map((item, index) => (
                  <Card key={index} className="card-service">
                    <CardContent className="p-4 flex items-start gap-3">
                      <item.icon className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-foreground mb-1 text-persian">{item.title}</h3>
                        <p className="text-sm text-muted-foreground text-persian">{item.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* HS Codes */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2 text-persian">
                <Calculator className="w-6 h-6 text-accent" />
                کد تعرفه{" "}
                <Link to="/blog/hs-code-guide" className="text-primary hover:underline">
                  HS
                </Link>{" "}
                مخزن آب
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border border-border p-3 text-right text-persian">نوع مخزن</th>
                      <th className="border border-border p-3 text-right text-persian">کد تعرفه</th>
                      <th className="border border-border p-3 text-right text-persian">حقوق ورودی</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border p-3 text-persian">مخزن پلاستیکی</td>
                      <td className="border border-border p-3 font-mono">3925.10</td>
                      <td className="border border-border p-3 text-persian">۲۶٪</td>
                    </tr>
                    <tr className="bg-muted/30">
                      <td className="border border-border p-3 text-persian">مخزن فلزی (آهن/فولاد)</td>
                      <td className="border border-border p-3 font-mono">7309</td>
                      <td className="border border-border p-3 text-persian">۵-۱۵٪</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3 text-persian">مخزن فایبرگلاس</td>
                      <td className="border border-border p-3 font-mono">7020</td>
                      <td className="border border-border p-3 text-persian">۱۰-۱۵٪</td>
                    </tr>
                    <tr className="bg-muted/30">
                      <td className="border border-border p-3 text-persian">مخزن استیل</td>
                      <td className="border border-border p-3 font-mono">7310</td>
                      <td className="border border-border p-3 text-persian">۵-۱۰٪</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Required Documents */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2 text-persian">
                <FileText className="w-6 h-6 text-accent" />
                مدارک لازم برای ترخیص
              </h2>

              <div className="space-y-3">
                {[
                  "کارت بازرگانی معتبر",
                  "ثبت سفارش در سامانه جامع تجارت",
                  "پروفرما اینویس و فاکتور تجاری",
                  "بارنامه (Bill of Lading)",
                  "پکینگ لیست",
                  "گواهی مبدأ",
                  "گواهی استاندارد (برای مخازن آب آشامیدنی)",
                  "مجوز بهداشت (در صورت نیاز)",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-persian">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <ArticleImage
              src="/images/blog/customs-documents.webp"
              alt="مدارک ترخیص مخزن آب از گمرک"
              caption="مدارک و اسناد لازم برای ترخیص مخزن ذخیره آب"
            />

            {/* Standards */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2 text-persian">
                <Shield className="w-6 h-6 text-accent" />
                استانداردها و مجوزهای بهداشتی
              </h2>

              <Card className="bg-accent/5 border-accent/20">
                <CardContent className="p-6">
                  <p className="text-persian leading-relaxed mb-4">
                    مخازن آب آشامیدنی باید دارای <strong>استاندارد ملی ایران</strong> باشند. همچنین برای برخی کاربردها،
                    <strong>مجوز سازمان غذا و دارو</strong> نیز الزامی است.
                  </p>
                  <ul className="space-y-2 text-persian">
                    <li>• استاندارد ISIRI برای مخازن پلی‌اتیلن</li>
                    <li>• گواهی عدم آلودگی مواد سمی</li>
                    <li>• تاییدیه بهداشتی برای تماس با آب آشامیدنی</li>
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* Important Notes */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2 text-persian">
                <AlertCircle className="w-6 h-6 text-amber-500" />
                نکات مهم واردات مخزن آب
              </h2>

              <div className="space-y-4">
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                  <p className="text-persian text-amber-800">
                    <strong>⚠️ استاندارد:</strong> مخازن آب آشامیدنی حتماً باید دارای گواهی استاندارد باشند.
                  </p>
                </div>
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                  <p className="text-persian text-amber-800">
                    <strong>⚠️ حمل:</strong> حمل مخازن بزرگ نیاز به تجهیزات ویژه و هماهنگی با شرکت حمل دارد.
                  </p>
                </div>
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                  <p className="text-persian text-amber-800">
                    <strong>⚠️ بازرسی:</strong> مخازن در گمرک از نظر کیفیت و مطابقت با اسناد بررسی می‌شوند.
                  </p>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-8 rounded-2xl mb-10">
              <h2 className="text-2xl font-bold mb-4 text-persian">نیاز به مشاوره در ترخیص مخزن آب دارید؟</h2>
              <p className="mb-6 opacity-90 text-persian">
                تیم متخصص ترخیصان با تجربه در{" "}
                <Link
                  to="/blog/bandar-abbas-comprehensive-clearance-guide"
                  className="text-primary-foreground underline"
                >
                  ترخیص کالا از بندرعباس
                </Link>{" "}
                آماده کمک به شماست.
              </p>
              <Button asChild size="lg" variant="secondary">
                <Link to="/#contact">
                  درخواست مشاوره رایگان
                  <ArrowRight className="mr-2 w-5 h-5" />
                </Link>
              </Button>
            </section>
          </article>

          {/* Related Articles */}
          <RelatedArticles currentPostId={18} />

          {/* Back to Blog */}
          <div className="mt-12 text-center">
            <Button asChild variant="outline">
              <Link to="/blog">
                <ArrowRight className="ml-2 w-4 h-4" />
                بازگشت به بلاگ
              </Link>
            </Button>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default WaterTankClearanceGuide;
