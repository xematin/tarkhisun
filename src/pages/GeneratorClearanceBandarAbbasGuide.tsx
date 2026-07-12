import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleBreadcrumb from "@/components/ArticleBreadcrumb";
import RelatedArticles from "@/components/RelatedArticles";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, CheckCircle2, AlertCircle, Calculator, FileCheck } from "lucide-react";
import ArticleImage from "@/components/ArticleImage";

const GeneratorClearanceBandarAbbasGuide = () => {
  useEffect(() => {
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', 'fa');
    window.scrollTo(0, 0);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "headline": "ترخیص ژنراتور از بندرعباس | راهنمای کامل واردات و گمرک ژنراتور",
        "description": "راهنمای جامع ترخیص ژنراتور از گمرک بندرعباس: مدارک لازم، کد تعرفه HS، حقوق گمرکی، مراحل واردات و نکات کلیدی",
        "image": "https://tarkhisun.com/og-image.jpg",
        "author": {
          "@type": "Organization",
          "name": "ترخیصان"
        },
        "publisher": {
          "@type": "Organization",
          "name": "ترخیصان",
          "logo": {
            "@type": "ImageObject",
            "url": "https://tarkhisun.com/logo.png"
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "بندرعباس",
            "addressRegion": "هرمزگان",
            "addressCountry": "IR"
          }
        },
        "datePublished": "2025-10-09",
        "dateModified": "2025-10-09",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://tarkhisun.com/blog/generator-clearance-bandar-abbas-guide"
        },
        "keywords": "ترخیص ژنراتور بندرعباس, واردات ژنراتور, گمرک ژنراتور, حقوق گمرکی ژنراتور"
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "خانه",
            "item": "https://tarkhisun.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "بلاگ",
            "item": "https://tarkhisun.com/blog"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "ترخیص ژنراتور بندرعباس"
          }
        ]
      }
    ]
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://tarkhisun.com/blog/generator-clearance-bandar-abbas-guide" />
        <title>ترخیص ژنراتور از بندرعباس | راهنمای کامل واردات و گمرک ژنراتور</title>
        <meta name="description" content="راهنمای ترخیص ژنراتور از گمرک بندرعباس: مدارک، کد تعرفه، حقوق گمرکی و مراحل واردات دیزل ژنراتور" />
        <meta name="keywords" content="ترخیص ژنراتور بندرعباس, واردات ژنراتور, گمرک ژنراتور, حقوق گمرکی ژنراتور, کد تعرفه ژنراتور, مدارک واردات ژنراتور, ژنراتور برق, ترخیص دیزل ژنراتور, واردات موتور برق" />
        
        <meta property="og:title" content="ترخیص ژنراتور از بندرعباس | راهنمای کامل واردات و گمرک" />
        <meta property="og:description" content="راهنمای جامع ترخیص ژنراتور از گمرک بندرعباس با تمام جزئیات مدارک، تعرفه و مراحل" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://tarkhisun.com/blog/generator-clearance-bandar-abbas-guide" />
        <meta property="og:image" content="https://tarkhisun.com/og-image.jpg" />
        <meta property="og:locale" content="fa_IR" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-8 max-w-4xl" dir="rtl">
          <ArticleBreadcrumb 
            category="راهنمای ترخیص" 
            articleTitle="ترخیص ژنراتور از بندرعباس"
          />

          <article className="prose prose-lg max-w-none">
            {/* Article Header */}
            <header className="mb-8 pb-6 border-b border-border">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-full text-persian">
                  راهنمای ترخیص
                </span>
                <span className="text-sm text-muted-foreground text-persian">۱۴۰۴/۷/۱۸</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-persian">
                ترخیص ژنراتور از <strong>بندرعباس</strong>
                <br />
                <span className="text-accent">راهنمای کامل واردات و گمرک ژنراتور</span>
              </h1>
              
              <p className="text-xl text-muted-foreground text-persian leading-relaxed">
                راهنمای جامع ترخیص ژنراتور از گمرک بندرعباس: انواع ژنراتور، مدارک لازم، کد تعرفه HS، حقوق گمرکی، مراحل واردات و نکات کلیدی
              </p>

              <ArticleImage
                src="/images/blog/generator-clearance-bandar-abbas-guide.webp"
                alt="دیزل ژنراتور صنعتی - ترخیص ژنراتور از گمرک بندرعباس"
                caption="دیزل ژنراتور صنعتی قابل واردات و ترخیص از گمرک"
                priority
              />
            </header>

            {/* Introduction */}
            <section className="mb-8">
              <p className="text-lg leading-relaxed text-foreground text-persian">
                <strong>ژنراتور</strong> یکی از تجهیزات ضروری در صنایع مختلف است که تقاضای زیادی برای واردات آن وجود دارد. 
                <strong>ترخیص ژنراتور از گمرک بندرعباس</strong> نیاز به شناخت کامل مدارک، <Link to="/blog/customs-tariff-guide" className="text-accent hover:underline">تعرفه‌های گمرکی</Link> و مراحل قانونی دارد.
                در این راهنما، تمام اطلاعات لازم از جمله <Link to="/blog/hs-code-guide" className="text-accent hover:underline">کدهای HS</Link> و نحوه <Link to="/blog/ntsw-complete-guide" className="text-accent hover:underline">ثبت سفارش در سامانه جامع تجارت</Link> برای واردات و ترخیص انواع ژنراتور را ارائه می‌دهیم.
              </p>
            </section>

            {/* Types of Generators */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2 text-persian">
                <FileText className="w-6 h-6 text-accent" />
                انواع ژنراتور قابل واردات
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: "دیزل ژنراتور", desc: "پرمصرف‌ترین نوع برای صنایع و ساختمان‌ها" },
                  { title: "گاز ژنراتور", desc: "مناسب برای مناطق با دسترسی به گاز طبیعی" },
                  { title: "بنزین ژنراتور", desc: "برای مصارف خانگی و کوچک" },
                  { title: "ژنراتور برق خورشیدی", desc: "انرژی پاک و تجدیدپذیر" }
                ].map((item, index) => (
                  <div key={index} className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-bold text-foreground mb-1 text-persian">{item.title}</h3>
                    <p className="text-sm text-muted-foreground text-persian">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* HS Codes */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2 text-persian">
                <Calculator className="w-6 h-6 text-accent" />
                کد تعرفه <Link to="/blog/hs-code-guide" className="text-primary hover:underline">HS</Link> ژنراتور
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border border-border p-3 text-right text-persian">نوع ژنراتور</th>
                      <th className="border border-border p-3 text-right text-persian">کد تعرفه</th>
                      <th className="border border-border p-3 text-right text-persian">حقوق ورودی</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border p-3 text-persian">دیزل ژنراتور تا ۷۵ کیلووات</td>
                      <td className="border border-border p-3 font-mono">8502.11</td>
                      <td className="border border-border p-3 text-persian">۱۵٪</td>
                    </tr>
                    <tr className="bg-muted/30">
                      <td className="border border-border p-3 text-persian">دیزل ژنراتور ۷۵ تا ۳۷۵ کیلووات</td>
                      <td className="border border-border p-3 font-mono">8502.12</td>
                      <td className="border border-border p-3 text-persian">۱۵٪</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3 text-persian">دیزل ژنراتور بالای ۳۷۵ کیلووات</td>
                      <td className="border border-border p-3 font-mono">8502.13</td>
                      <td className="border border-border p-3 text-persian">۱۵٪</td>
                    </tr>
                    <tr className="bg-muted/30">
                      <td className="border border-border p-3 text-persian">بنزین ژنراتور</td>
                      <td className="border border-border p-3 font-mono">8502.20</td>
                      <td className="border border-border p-3 text-persian">۲۰٪</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Required Documents */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2 text-persian">
                <FileCheck className="w-6 h-6 text-accent" />
                مدارک لازم برای ترخیص ژنراتور
              </h2>

              <div className="space-y-3">
                {[
                  "کارت بازرگانی معتبر",
                  "ثبت سفارش در سامانه جامع تجارت",
                  "پروفرما اینویس و فاکتور تجاری",
                  "بارنامه (Bill of Lading)",
                  "پکینگ لیست",
                  "گواهی مبدأ (Certificate of Origin)",
                  "گواهی استاندارد",
                  "بیمه‌نامه کالا"
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
              alt="مدارک ترخیص ژنراتور از گمرک - اسناد و مدارک لازم"
              caption="مدارک و اسناد لازم برای ترخیص ژنراتور از گمرک بندرعباس"
            />

            {/* Clearance Steps */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4 text-persian">
                مراحل ترخیص ژنراتور از <Link to="/blog/bandar-abbas-comprehensive-clearance-guide" className="text-primary hover:underline">گمرک بندرعباس</Link>
              </h2>

              <div className="space-y-4">
                {[
                  { step: "۱", title: "ثبت سفارش", desc: "ثبت سفارش در سامانه جامع تجارت و دریافت مجوزها" },
                  { step: "۲", title: "حمل کالا", desc: "انتخاب شرکت حمل و ارسال ژنراتور به بندرعباس" },
                  { step: "۳", title: "اظهار گمرکی", desc: "تکمیل اظهارنامه و ارائه مدارک به گمرک" },
                  { step: "۴", title: "ارزیابی", desc: "بررسی کالا و تطبیق با اسناد توسط ارزیاب گمرک" },
                  { step: "۵", title: "پرداخت حقوق", desc: "محاسبه و پرداخت حقوق گمرکی و عوارض" },
                  { step: "۶", title: "ترخیص", desc: "صدور پروانه سبز و خروج کالا از گمرک" }
                ].map((item, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="w-10 h-10 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1 text-persian">{item.title}</h3>
                      <p className="text-muted-foreground text-persian">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Important Notes */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2 text-persian">
                <AlertCircle className="w-6 h-6 text-amber-500" />
                نکات مهم واردات ژنراتور
              </h2>

              <div className="space-y-4">
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                  <p className="text-persian text-amber-800">
                    <strong>⚠️ استاندارد:</strong> ژنراتورها باید دارای گواهی استاندارد ایران باشند.
                  </p>
                </div>
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                  <p className="text-persian text-amber-800">
                    <strong>⚠️ کارکرده:</strong> واردات ژنراتور کارکرده با محدودیت‌های خاصی همراه است.
                  </p>
                </div>
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                  <p className="text-persian text-amber-800">
                    <strong>⚠️ برند:</strong> برخی برندها نیاز به نمایندگی رسمی دارند.
                  </p>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-8 rounded-2xl mb-10">
              <h2 className="text-2xl font-bold mb-4 text-persian">نیاز به مشاوره در ترخیص ژنراتور دارید؟</h2>
              <p className="mb-6 opacity-90 text-persian">
                تیم متخصص ترخیصان با تجربه در ترخیص انواع ژنراتور و تجهیزات صنعتی آماده کمک به شماست.
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
          <RelatedArticles currentPostId={16} />

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

export default GeneratorClearanceBandarAbbasGuide;
