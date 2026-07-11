import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleBreadcrumb from "@/components/ArticleBreadcrumb";
import RelatedArticles from "@/components/RelatedArticles";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, FileText, ShieldCheck, BookOpen, Building2 } from "lucide-react";
import ArticleImage from "@/components/ArticleImage";

const CustomsLawArticles1To13Guide = () => {
  useEffect(() => {
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "fa");
  }, []);

  const canonical = "https://tarkhisun.com/blog/customs-law-articles-1-to-13-guide";
  const title = "قوانین امور گمرکی؛ از ماده ۱ تا ۱۳ | راهنمای کامل مبانی گمرک";
  const description =
    "بررسی ساده و کاربردی ماده ۱ تا ۱۳ قانون امور گمرکی؛ تعاریف، وظایف گمرک، حقوق ورودی، تضمین و کنترل‌های گمرکی برای واردکنندگان و صادرکنندگان.";
  const image = "https://tarkhisun.com/images/blog/customs-law-articles-1-to-13.jpg";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "قوانین امور گمرکی؛ از ماده ۱ تا ۱۳",
    description,
    image,
    datePublished: "2026-07-11",
    dateModified: "2026-07-11",
    author: { "@type": "Organization", name: "تیم ترخیصان" },
    publisher: {
      "@type": "Organization",
      name: "ترخیصان",
      logo: { "@type": "ImageObject", url: "https://tarkhisun.com/logo.png" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "خانه", item: "https://tarkhisun.com" },
      { "@type": "ListItem", position: 2, name: "بلاگ", item: "https://tarkhisun.com/blog" },
      { "@type": "ListItem", position: 3, name: "قوانین امور گمرکی؛ ماده ۱ تا ۱۳" },
    ],
  };

  const articles = [
    {
      num: "۱",
      title: "ماده ۱ – تعاریف و اصطلاحات گمرکی",
      body: (
        <>
          ماده ۱ قانون امور گمرکی، فرهنگ اصطلاحات پایه‌ای این حوزه است. مفاهیمی مانند
          <strong> اظهار کالا، اظهارکننده، اظهارنامه اجمالی، اماکن گمرکی، ترخیص، ترخیصیه،
          تشریفات گمرکی، تضمین، تعهد، حقوق ورودی، حمل یکسره، روز اظهار، سامانه هماهنگ شده،
          شرکت حمل و نقل بین‌المللی، صاحب کالای تجاری، قلمرو گمرکی، کالای داخلی، کالای گمرک‌نشده،
          کالای مجاز، مجاز مشروط، ممنوع، کنترل‌های گمرکی، مرجع تحویل‌گیرنده و هزینه انجام خدمات </strong>
          در این ماده تعریف شده‌اند. شناخت دقیق این اصطلاحات، پیش‌نیاز فهم بقیه مواد قانون است و
          مبنای بسیاری از آن‌ها را <Link to="/blog/hs-code-guide" className="text-accent hover:underline">سامانه هماهنگ شده (HS)</Link> شورای همکاری گمرکی تشکیل می‌دهد.
        </>
      ),
    },
    {
      num: "۲",
      title: "ماده ۲ – معرفی سازمان گمرک ایران",
      body: (
        <>
          ماده ۲، «گمرک ایران» را به‌عنوان سازمان مسئول کنترل ورود و خروج کالا معرفی می‌کند.
          این سازمان شامل <strong>ستاد مرکزی و گمرک‌های اجرایی</strong> است و وظیفه اجرای قوانین
          گمرکی، دریافت حقوق و عوارض، نظارت بر تجارت خارجی و مقابله با قاچاق را برعهده دارد.
          گمرک در عمل دروازه اصلی <Link to="/blog/import-export-guide-iran" className="text-accent hover:underline">تجارت بین‌الملل</Link> کشور محسوب می‌شود.
        </>
      ),
    },
    {
      num: "۳",
      title: "ماده ۳ – وظایف و اختیارات گمرک ایران",
      body: (
        <>
          ماده ۳ گسترده‌ترین ماده این بخش است و وظایف گمرک را شرح می‌دهد؛ از جمله:
          اعمال سیاست‌های واردات، صادرات و عبور کالا، تشخیص و وصول
          <strong> حقوق ورودی</strong>، انجام تشریفات ترخیص، کنترل عبور کالا، اجرای مقررات
          بازارچه‌های مرزی و مرزنشینان، اعمال معافیت‌ها و ممنوعیت‌ها، اجرای مقررات
          <Link to="/blog/customs-article-1-commission-guide" className="text-accent hover:underline"> تخلفات و قاچاق گمرکی</Link>، استقرار سامانه‌هایی مانند
          <strong> پنجره واحد تجارت فرامرزی</strong>، جمع‌آوری و انتشار آمار، رعایت توصیه‌های
          سازمان جهانی گمرک و بهره‌گیری از فناوری‌های نوین برای تسهیل تشریفات گمرکی.
        </>
      ),
    },
    {
      num: "۴",
      title: "ماده ۴ – انتصاب و اختیارات رئیس گمرک ایران",
      body: (
        <>
          طبق ماده ۴، <strong>رئیس گمرک ایران</strong> از سوی وزیر امور اقتصادی و دارایی منصوب می‌شود
          و بالاترین مقام اجرایی گمرک است. اداره امور سازمان، پیشنهاد تشکیلات و بودجه،
          عزل و نصب و نقل و انتقال کارکنان، نمایندگی گمرک در مراجع قانونی و حقوقی با حق توکیل
          به غیر، و نظارت بر حسن اجرای وظایف، از جمله اختیارات وی است.
        </>
      ),
    },
    {
      num: "۵",
      title: "ماده ۵ – تعریف حقوق ورودی",
      body: (
        <>
          یکی از مهم‌ترین مفاهیم قانون در همین ماده تعریف شده است. <strong>حقوق ورودی</strong> شامل
          <em> حقوق گمرکی، سود بازرگانی و سایر عوارض قانونی</em> است و بر مبنای
          <Link to="/blog/customs-tariff-guide" className="text-accent hover:underline"> تعرفه گمرکی</Link> و
          <Link to="/blog/customs-exchange-rate-guide" className="text-accent hover:underline"> نرخ ارز گمرکی</Link>
          محاسبه می‌شود. این مبلغ، یکی از اجزای اصلی <strong>قیمت تمام‌شده کالای وارداتی</strong> است و
          هر واردکننده باید پیش از سفارش‌گذاری با آن آشنا باشد.
        </>
      ),
    },
    {
      num: "۶",
      title: "ماده ۶ – واردات قطعی و پرداخت حقوق ورودی",
      body: (
        <>
          ماده ۶ اجازه می‌دهد گمرک، کالای وزارتخانه‌ها و مؤسسات دولتی را (در صورت غیرتجاری‌بودن)
          با <strong>تعهد مسئول مالی سازمان</strong> و کالای سایر اشخاص را با
          <strong> ضمانت‌نامه بانکی حداکثر یک‌ساله</strong> برای پرداخت حقوق ورودی به‌طور قطعی ترخیص کند.
          طبق تبصره مهم این ماده، <strong>افزایش حقوق ورودی شامل کالای موجود در اماکن گمرکی نمی‌شود.</strong>
        </>
      ),
    },
    {
      num: "۷",
      title: "ماده ۷ – وثیقه‌بودن کالای موجود در گمرک",
      body: (
        <>
          براساس ماده ۷، کالای موجود در گمرک به‌طور خودکار <strong>وثیقه پرداخت تمام وجوه متعلق به همان کالا
          و سایر بدهی‌های قطعی صاحب کالا</strong> نزد گمرک است. گمرک تا زمانی که این وجوه دریافت یا
          تأمین نشود، اجازه <Link to="/blog/zero-to-hundred-bandar-abbas-customs-clearance" className="text-accent hover:underline">ترخیص کالا</Link>
          را صادر نخواهد کرد.
        </>
      ),
    },
    {
      num: "۸",
      title: "ماده ۸ – وصول مطالبات از طریق سازمان امور مالیاتی",
      body: (
        <>
          ماده ۸ یکی از قوی‌ترین اهرم‌های وصول مطالبات گمرکی است. طبق این ماده، هرگاه گمرک
          <strong> مطالبات قطعی</strong> از اشخاص داشته باشد می‌تواند آن را به
          <strong> سازمان امور مالیاتی</strong> اعلام کند تا بر اساس قانون مالیات‌های مستقیم و
          آیین‌نامه‌های اجرایی، وصول شود. این مکانیزم مانع انباشت بدهی و افزایش‌دهنده انضباط
          مالی در تجارت خارجی است.
        </>
      ),
    },
    {
      num: "۹",
      title: "ماده ۹ – فناوری اطلاعات و گمرک الکترونیک",
      body: (
        <>
          ماده ۹ گمرک را ملزم می‌کند برای انجام وظایف قانونی خود، امکانات
          <strong> فناوری اطلاعات و ارتباطات</strong> را با رعایت
          <strong> قانون تجارت الکترونیک</strong> و <strong>قانون مدیریت خدمات کشوری</strong> فراهم کند.
          این ماده ستون فقرات پروژه‌هایی مانند <Link to="/blog/ntsw-complete-guide" className="text-accent hover:underline">سامانه جامع تجارت (ntsw.ir)</Link>
          و گمرک الکترونیک است.
        </>
      ),
    },
    {
      num: "۱۰",
      title: "ماده ۱۰ – تعیین میزان تضمین برای ترخیص",
      body: (
        <>
          ماده ۱۰ چارچوب <strong>تضمین گمرکی</strong> را مشخص می‌کند. به‌جز هزینه خدمات که فوراً
          پرداخت می‌شود، میزان تضمین برای <strong>کالای مجاز</strong> معادل حقوق ورودی همان کالا و برای
          <strong> سایر کالاها</strong>، معادل حقوق ورودی به‌علاوه <strong>نصف تا سه برابر ارزش کالا</strong> است.
          تعیین دقیق مبلغ برعهده گمرک بوده و ابزار اصلی مدیریت ریسک و جلوگیری از تخلف است.
        </>
      ),
    },
    {
      num: "۱۱",
      title: "ماده ۱۱ – کنترل‌های گمرکی و اصل نظارت جامع",
      body: (
        <>
          طبق ماده ۱۱، <strong>هیچ کالایی</strong> نمی‌تواند بدون کنترل‌های گمرکی وارد یا از قلمرو گمرکی
          خارج شود. این کنترل‌ها می‌تواند از طریق <strong>مدیریت ریسک، بازرسی منظم یا تصادفی،
          تجهیزات نوین بازرسی، حسابرسی پس از ترخیص</strong> و در موارد خاص با <strong>بدرقه</strong> انجام شود.
          این ماده، ستون اصلی نظام نظارتی گمرک و تضمین‌کننده سلامت تجارت خارجی است.
        </>
      ),
    },
    {
      num: "۱۲",
      title: "ماده ۱۲ – هماهنگی گمرک با دستگاه‌های کنترلی",
      body: (
        <>
          ماده ۱۲ بر ضرورت <strong>هم‌افزایی گمرک با دستگاه‌های تخصصی</strong> (مانند استاندارد، بهداشت،
          قرنطینه، انرژی اتمی و …) در مبادی ورودی و خروجی تأکید می‌کند و چارچوبی مشخص برای
          انجام کنترل‌های تخصصی هم‌زمان با تشریفات گمرکی ارائه می‌دهد. اجرای درست این ماده،
          زمان و هزینه ترخیص را به‌طور محسوس کاهش می‌دهد.
        </>
      ),
    },
    {
      num: "۱۳",
      title: "ماده ۱۳ – طبقه‌بندی کالا و سامانه HS",
      body: (
        <>
          ماده ۱۳ نهاد مسئول اصلاح، پیشنهاد و انتشار تغییرات
          <strong> سامانه هماهنگ توصیف و کدگذاری کالا (HS)</strong> را مشخص می‌کند و روش رسمی اعلام این
          تغییرات را تعیین می‌نماید. آگاهی از این ماده برای تعیین صحیح
          <Link to="/blog/hs-code-guide" className="text-accent hover:underline"> کد HS کالا</Link> و
          جلوگیری از اختلاف در طبقه‌بندی، حیاتی است.
        </>
      ),
    },
  ];

  return (
    <>
      <Helmet>
        <link rel="canonical" href={canonical} />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="قانون امور گمرکی, ماده 1 قانون گمرک, ماده 5 حقوق ورودی, ماده 10 تضمین گمرکی, ماده 11 کنترل گمرکی, ماده 13 HS, گمرک ایران, تشریفات گمرکی, تعرفه گمرکی"
        />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="fa_IR" />
        <meta property="og:url" content={canonical} />
        <meta property="og:site_name" content="ترخیصان" />
        <meta property="og:image" content={image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main>
          <ArticleBreadcrumb
            category="قوانین و مقررات"
            articleTitle="قوانین امور گمرکی؛ ماده ۱ تا ۱۳"
          />

          {/* Hero */}
          <section className="py-16 bg-gradient-to-br from-secondary to-white">
            <div className="container mx-auto px-4" dir="rtl">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="heading-primary mb-6 text-persian">
                  قوانین امور گمرکی؛ از ماده ۱ تا ۱۳
                  <br />
                  <span className="text-accent">راهنمای کامل مبانی قانون گمرک ایران</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-6 text-persian">
                  بررسی ساده و کاربردی تعاریف، سازمان، وظایف، حقوق ورودی، تضمین و کنترل‌های گمرکی
                </p>

                <ArticleImage
                  src="/images/blog/customs-law-articles-1-to-13.jpg"
                  alt="کتاب قانون امور گمرکی ایران و چکش قضایی – ماده ۱ تا ۱۳"
                  caption="بخش نخست قانون امور گمرکی، ستون فقرات تجارت خارجی ایران است"
                  priority
                  className="mt-4"
                />
              </div>
            </div>
          </section>

          {/* Content */}
          <article className="py-16">
            <div className="container mx-auto px-4" dir="rtl">
              <div className="max-w-4xl mx-auto space-y-8">
                {/* Intro */}
                <Card className="card-service">
                  <CardHeader>
                    <CardTitle className="text-persian flex items-center gap-2">
                      <BookOpen className="w-6 h-6 text-accent" />
                      مقدمه‌ای بر بخش نخست قانون امور گمرکی
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-persian text-lg leading-relaxed">
                    <p>
                      <strong>قانون امور گمرکی</strong> و آیین‌نامه اجرایی آن، یکی از مهم‌ترین ارکان
                      تجارت خارجی ایران است. هر واردکننده یا صادرکننده‌ای که قصد فعالیت حرفه‌ای
                      دارد، باید با مفاهیم پایه این قانون آشنا باشد. <strong>ماده ۱ تا ۱۳</strong> این
                      قانون که به بخش «تعاریف، سازمان و کلیات» اختصاص دارد، پایه فهم تمام مواد بعدی
                      و فرآیندهای عملی <Link to="/blog/zero-to-hundred-bandar-abbas-customs-clearance" className="text-accent hover:underline">ترخیص کالا</Link> است.
                    </p>
                    <p>
                      در این مقاله، این سیزده ماده را به زبان ساده، همراه با پیوند به مفاهیم مرتبط
                      بررسی می‌کنیم تا تصویری شفاف از مبانی <strong>قوانین گمرک</strong> ارائه شود.
                    </p>
                  </CardContent>
                </Card>

                {/* Articles 1-7 */}
                <div className="space-y-6">
                  {articles.slice(0, 7).map((a) => (
                    <Card key={a.num} className="card-service">
                      <CardHeader>
                        <CardTitle className="text-persian flex items-center gap-3">
                          <div className="bg-accent text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">
                            {a.num}
                          </div>
                          <span>{a.title}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-persian text-lg leading-relaxed">
                        <p>{a.body}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Mid image */}
                <ArticleImage
                  src="/images/blog/customs-law-office-review.jpg"
                  alt="بررسی اسناد گمرکی توسط مأموران گمرک – اجرای مواد قانون امور گمرکی"
                  caption="اجرای مواد ۲ تا ۴ قانون در بررسی اسناد و تشریفات گمرکی"
                />

                {/* Articles 8-13 */}
                <div className="space-y-6">
                  {articles.slice(7).map((a) => (
                    <Card key={a.num} className="card-service">
                      <CardHeader>
                        <CardTitle className="text-persian flex items-center gap-3">
                          <div className="bg-accent text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">
                            {a.num}
                          </div>
                          <span>{a.title}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-persian text-lg leading-relaxed">
                        <p>{a.body}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Summary */}
                <Card className="card-service bg-accent/5">
                  <CardHeader>
                    <CardTitle className="text-persian flex items-center gap-2">
                      <ShieldCheck className="w-6 h-6 text-accent" />
                      جمع‌بندی
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-persian text-lg leading-relaxed">
                    <p>
                      شناخت <strong>ماده ۱ تا ۱۳ قانون امور گمرکی</strong>، پایه فهم تمام قوانین گمرک
                      و بستر لازم برای انجام حرفه‌ای تجارت خارجی است. بسیاری از مشکلات بازرگانان
                      و واردکنندگان – از اختلاف در ارزش‌گذاری تا تأخیر در ترخیص – ناشی از ناآگاهی
                      نسبت به همین مفاهیم ابتدایی است.
                    </p>
                    <p>
                      مطالعه دقیق این بخش از قانون به همراه آشنایی با
                      <Link to="/blog/incoterms-guide" className="text-accent hover:underline"> اینکوترمز</Link>،
                      <Link to="/blog/customs-tariff-guide" className="text-accent hover:underline"> تعرفه گمرکی</Link> و
                      <Link to="/blog/hs-code-guide" className="text-accent hover:underline"> کد HS</Link>،
                      مسیر تجارت خارجی را شفاف‌تر، سریع‌تر و کم‌هزینه‌تر خواهد کرد.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Scale className="w-5 h-5 text-accent" />
                        قانون‌محور
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="w-5 h-5 text-accent" />
                        مبتنی بر متن رسمی
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Building2 className="w-5 h-5 text-accent" />
                        کاربردی برای بازرگانان
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </article>

          <RelatedArticles currentPostId={33} />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CustomsLawArticles1To13Guide;
