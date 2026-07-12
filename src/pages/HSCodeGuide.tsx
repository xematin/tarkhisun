import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleBreadcrumb from "@/components/ArticleBreadcrumb";
import RelatedArticles from "@/components/RelatedArticles";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, User, ArrowRight, CheckCircle, AlertTriangle, Search, Globe, Calculator } from "lucide-react";
import ArticleImage from "@/components/ArticleImage";

const HSCodeGuide = () => {
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
        "headline": "کد HS کالا چیست؟ راهنمای کامل تعرفه هماهنگ کالاها",
        "description": "راهنمای جامع سیستم کد HS، نحوه تعیین کد تعرفه کالاها، اهمیت در تجارت بین‌المللی و جستجوی صحیح کد کالا",
        "image": "https://tarkhisun.com/og-image.jpg",
        "author": {
          "@type": "Organization",
          "name": "ترخیصان - مشاوره امور گمرکی"
        },
        "publisher": {
          "@type": "Organization",
          "name": "ترخیصان",
          "logo": {
            "@type": "ImageObject",
            "url": "https://tarkhisun.com/logo.png"
          }
        },
        "datePublished": "2024-09-29",
        "dateModified": "2024-09-29",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://tarkhisun.com/blog/hs-code-guide"
        },
        "articleSection": "تعرفه و کدگذاری",
        "keywords": "کد HS, تعرفه هماهنگ, کد کالا, HS Code, Harmonized System"
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
            "name": "کد HS کالا"
          }
        ]
      }
    ]
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://tarkhisun.com/blog/hs-code-guide" />
        <title>کد HS کالا چیست؟ راهنمای کامل تعرفه هماهنگ کالاها | ترخیصان</title>
        <meta name="description" content="راهنمای جامع سیستم کد HS، نحوه تعیین کد تعرفه کالاها، اهمیت در تجارت بین‌المللی و جستجوی صحیح کد کالا در گمرک" />
        <meta name="keywords" content="کد HS, تعرفه هماهنگ, کد کالا, HS Code, Harmonized System, تعرفه گمرکی, کد تعرفه, طبقه‌بندی کالا, تجارت بین‌المللی, گمرک ایران" />
        
        <meta property="og:title" content="کد HS کالا چیست؟ راهنمای کامل تعرفه هماهنگ کالاها" />
        <meta property="og:description" content="راهنمای جامع سیستم کد HS، نحوه تعیین کد تعرفه کالاها و اهمیت در تجارت بین‌المللی" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://tarkhisun.com/blog/hs-code-guide" />
        <meta property="og:image" content="https://tarkhisun.com/og-image.jpg" />
        <meta property="og:locale" content="fa_IR" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <ArticleBreadcrumb 
          category="تعرفه و مالیات"
          articleTitle="کد HS کالا چیست؟ راهنمای کامل تعرفه هماهنگ کالاها"
        />

        <main>
          {/* Article Header */}
          <section className="py-12 bg-gradient-to-br from-secondary to-white">
            <div className="container mx-auto px-4" dir="rtl">
              <div className="max-w-4xl mx-auto">
                
                <div className="mb-6">
                  <span className="text-sm font-medium text-accent bg-accent/15 px-3 py-2 rounded-full text-persian">
                    تعرفه و کدگذاری
                  </span>
                </div>

                <h1 className="heading-primary mb-6 text-persian">
                  کد HS کالا چیست؟
                  <span className="text-accent block">راهنمای کامل تعرفه هماهنگ</span>
                </h1>

                <p className="text-xl text-muted-foreground mb-8 text-persian leading-relaxed">
                  آشنایی کامل با سیستم کد HS (Harmonized System)، نحوه تعیین کد تعرفه کالاها و اهمیت آن در تجارت بین‌المللی
                </p>

                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground text-persian">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    ۱۴۰۳/۷/۹
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    ۱۰ دقیقه مطالعه
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    تیم ترخیصان
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Article Content */}
          <section className="py-16">
            <div className="container mx-auto px-4" dir="rtl">
              <div className="max-w-4xl mx-auto">
                
                <div className="grid lg:grid-cols-3 gap-12">
                  
                  {/* Main Content */}
                  <div className="lg:col-span-2 space-y-8">
                    
                    {/* Hero Image */}
                    <ArticleImage
                      src="/images/blog/hs-code-guide.webp"
                      alt="کد HS کالا چیست؟ راهنمای کامل تعرفه هماهنگ کالاها"
                      caption="سیستم کد HS - طبقه‌بندی استاندارد کالاها در تجارت بین‌المللی"
                    />

                    {/* Introduction */}
                    <div className="prose prose-lg max-w-none text-persian">
                      <p className="text-lg leading-relaxed text-muted-foreground">
                        <strong>کد HS</strong> یا <strong>Harmonized System</strong> یکی از مهم‌ترین ابزارهای طبقه‌بندی کالاها در{" "}
                        <Link to="/blog/import-export-guide-iran" className="text-primary hover:underline">
                          تجارت بین‌المللی
                        </Link>{" "}
                        محسوب می‌شود. این سیستم استاندارد جهانی، توسط سازمان جهانی گمرک توسعه یافته و در بیش از ۲۰۰ کشور جهان مورد استفاده قرار می‌گیرد.
                        برای{" "}
                        <Link to="/blog/bandar-abbas-comprehensive-clearance-guide" className="text-primary hover:underline">
                          ترخیص کالا
                        </Link>{" "}
                        از گمرک، تعیین کد HS صحیح ضروری است.
                      </p>
                    </div>

                    {/* What is HS Code */}
                    <Card className="card-service">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <Globe className="w-6 h-6 text-accent" />
                          <h2 className="heading-tertiary text-persian">کد HS چیست؟</h2>
                        </div>
                        
                        <div className="space-y-4 text-persian">
                          <p>
                            <strong>کد HS</strong> (Harmonized Commodity Description and Coding System) یک سیستم استاندارد بین‌المللی برای طبقه‌بندی کالاهای تجاری است. 
                            این کد ۶ رقمی، کالاها را بر اساس ماهیت، منشأ و کاربرد آنها دسته‌بندی می‌کند و تأثیر مستقیمی بر{" "}
                            <Link to="/blog/customs-tariff-guide" className="text-primary hover:underline">
                              تعرفه گمرکی
                            </Link>{" "}
                            و{" "}
                            <Link to="/blog/customs-exchange-rate-guide" className="text-primary hover:underline">
                              محاسبه حقوق گمرکی
                            </Link>{" "}
                            دارد.
                          </p>
                          <p>
                            هر کشور می‌تواند این کد ۶ رقمی را با افزودن ارقام اضافی (معمولاً ۸ یا ۱۰ رقم) برای طبقه‌بندی دقیق‌تر گسترش دهد.
                            در ایران، کدهای HS از طریق{" "}
                            <Link to="/blog/ntsw-complete-guide" className="text-primary hover:underline">
                              سامانه جامع تجارت
                            </Link>{" "}
                            قابل جستجو هستند.
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Structure of HS Code */}
                    <div>
                      <h2 className="heading-tertiary mb-6 text-persian">ساختار کد HS</h2>
                      
                      <Card className="card-service mb-6">
                        <CardContent className="p-6">
                          <div className="text-center mb-6">
                            <div className="text-4xl font-mono font-bold text-accent mb-2">12.34.56</div>
                            <p className="text-sm text-muted-foreground text-persian">نمونه کد HS شش رقمی</p>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="flex items-center gap-3 text-persian">
                              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent font-bold">12</div>
                              <div>
                                <div><strong>فصل (Chapter)</strong></div>
                                <div className="text-sm text-muted-foreground">دسته کلی کالا</div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 text-persian">
                              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent font-bold">34</div>
                              <div>
                                <div className="font-semibold">عنوان (Heading)</div>
                                <div className="text-sm text-muted-foreground">گروه خاص کالا</div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 text-persian">
                              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent font-bold">56</div>
                              <div>
                                <div className="font-semibold">زیرعنوان (Subheading)</div>
                                <div className="text-sm text-muted-foreground">مشخصات دقیق کالا</div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Second Image */}
                    <ArticleImage
                      src="/images/blog/hs-code-trade.webp"
                      alt="تجارت بین‌المللی و کد تعرفه گمرکی"
                      caption="اهمیت کد HS در تجارت بین‌المللی و ترخیص کالا"
                    />

                    {/* Importance of HS Code */}
                    <Card className="card-service">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <Calculator className="w-6 h-6 text-accent" />
                          <h2 className="heading-tertiary text-persian">اهمیت کد HS در تجارت</h2>
                        </div>
                        
                        <div className="space-y-3">
                          {[
                            "تعیین میزان حقوق گمرکی و مالیات",
                            "اعمال سیاست‌های تجاری و تعرفه‌ای",
                            "کنترل محدودیت‌ها و ممنوعیت‌های واردات/صادرات",
                            "تهیه آمار دقیق تجارت خارجی",
                            "تسهیل فرآیندهای گمرکی و ترخیص کالا",
                            "اعمال مقررات بهداشتی و ایمنی"
                          ].map((item, index) => (
                            <div key={index} className="flex items-center gap-3 text-persian">
                              <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* How to Find HS Code */}
                    <div>
                      <h2 className="heading-tertiary mb-6 text-persian">چگونه کد HS کالا را پیدا کنیم؟</h2>
                      
                      <div className="space-y-6">
                        {[
                          {
                            step: "۱",
                            title: "شناسایی ماهیت کالا",
                            description: "نخست باید ماهیت دقیق کالا، مواد تشکیل‌دهنده و کاربرد آن را مشخص کنید."
                          },
                          {
                            step: "۲", 
                            title: "مراجعه به جداول تعرفه",
                            description: "از طریق سایت گمرک ایران یا منابع معتبر، جداول تعرفه هماهنگ را مطالعه کنید."
                          },
                          {
                            step: "۳",
                            title: "جستجوی تدریجی",
                            description: "ابتدا فصل مناسب، سپس عنوان و در نهایت زیرعنوان متناسب با کالا را انتخاب کنید."
                          },
                          {
                            step: "۴",
                            title: "تایید نهایی",
                            description: "پیش از استفاده، کد انتخابی را با مشاور متخصص یا گمرک بررسی و تایید کنید."
                          }
                        ].map((item, index) => (
                          <div key={index} className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold">
                              {item.step}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-primary mb-2 text-persian">{item.title}</h3>
                              <p className="text-muted-foreground text-persian">{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Common Mistakes */}
                    <Card className="bg-amber-50 border-amber-200">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <AlertTriangle className="w-6 h-6 text-amber-600" />
                          <h3 className="heading-tertiary text-amber-800 text-persian">اشتباهات رایج در تعیین کد HS</h3>
                        </div>
                        
                        <div className="space-y-3 text-amber-700 text-persian">
                          <p>• <strong>عدم دقت در مشخصات کالا:</strong> تعیین کد بر اساس اطلاعات ناقص یا نادرست</p>
                          <p>• <strong>در نظر نگیری کاربرد نهایی:</strong> نادیده گرفتن مقصد و کاربرد اصلی کالا</p>
                          <p>• <strong>استفاده از کدهای قدیمی:</strong> عدم بروزرسانی کدها با آخرین تغییرات تعرفه</p>
                          <p>• <strong>تقلید از دیگران:</strong> استفاده از کد کالاهای مشابه بدون بررسی دقیق</p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* HS Code in Iran */}
                    <div>
                      <h2 className="heading-tertiary mb-6 text-persian">کد HS در ایران</h2>
                      
                      <p className="text-muted-foreground mb-6 text-persian leading-relaxed">
                        در ایران، کدهای HS به صورت ۱۰ رقمی استفاده می‌شوند. ۶ رقم اول مطابق استاندارد جهانی و ۴ رقم بعدی مختص قوانین گمرکی ایران است.
                        برای استعلام کد تعرفه کالا می‌توانید به سامانه جامع تجارت یا سایت گمرک ایران مراجعه کنید.
                      </p>

                      <div className="bg-accent/5 p-6 rounded-lg border border-accent/20">
                        <p className="text-persian">
                          <strong className="text-accent">نکته:</strong> برای جلوگیری از مشکلات گمرکی و جرایم احتمالی، 
                          پیشنهاد می‌شود تعیین کد HS را به متخصصین امور گمرکی بسپارید.
                        </p>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-8 rounded-2xl">
                      <h2 className="text-2xl font-bold mb-4 text-persian">نیاز به کمک در تعیین کد تعرفه دارید؟</h2>
                      <p className="mb-6 opacity-90 text-persian">
                        تیم متخصص ترخیصان با تجربه طولانی در امور گمرکی، آماده کمک به شما در تعیین صحیح کد HS و ترخیص کالا است.
                      </p>
                      <Button asChild size="lg" variant="secondary">
                        <Link to="/#contact">
                          درخواست مشاوره رایگان
                          <ArrowRight className="mr-2 w-5 h-5" />
                        </Link>
                      </Button>
                    </div>

                  </div>

                  {/* Sidebar */}
                  <div className="lg:col-span-1 space-y-6">
                    {/* CTA Card */}
                    <Card className="card-service sticky top-24">
                      <CardContent className="p-6">
                        <h3 className="font-bold text-lg mb-4 text-persian">مشاوره تخصصی گمرکی</h3>
                        <p className="text-muted-foreground mb-4 text-persian text-sm">
                          تیم ترخیصان با بیش از ۲۰ سال تجربه آماده پاسخگویی به سؤالات شماست.
                        </p>
                        <Button asChild className="w-full">
                          <Link to="/#contact">تماس با ما</Link>
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Table of Contents */}
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="font-bold text-lg mb-4 text-persian">فهرست مطالب</h3>
                        <nav className="space-y-2 text-sm">
                          <a href="#" className="block text-muted-foreground hover:text-accent transition-colors text-persian">کد HS چیست؟</a>
                          <a href="#" className="block text-muted-foreground hover:text-accent transition-colors text-persian">ساختار کد HS</a>
                          <a href="#" className="block text-muted-foreground hover:text-accent transition-colors text-persian">اهمیت در تجارت</a>
                          <a href="#" className="block text-muted-foreground hover:text-accent transition-colors text-persian">نحوه پیدا کردن کد</a>
                          <a href="#" className="block text-muted-foreground hover:text-accent transition-colors text-persian">اشتباهات رایج</a>
                          <a href="#" className="block text-muted-foreground hover:text-accent transition-colors text-persian">کد HS در ایران</a>
                        </nav>
                      </CardContent>
                    </Card>
                  </div>

                </div>

                {/* HS Code Search Tool CTA */}
                <Card className="mt-12 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
                  <CardContent className="p-6 md:p-8 text-center space-y-3">
                    <Search className="w-10 h-10 text-primary mx-auto" />
                    <h3 className="text-xl font-bold text-persian">
                      ابزار آنلاین جستجوی کد تعرفه گمرکی (HS Code)
                    </h3>
                    <p className="text-muted-foreground text-persian">
                      کد تعرفه هر کالا را به‌صورت رایگان و در چند ثانیه پیدا کنید: حقوق ورودی، سود بازرگانی، ارزش افزوده و واحد سنجش.
                    </p>
                    <Button asChild size="lg" className="text-primary-foreground">
                      <Link to="/hscode">
                        <Search className="w-4 h-4 ml-2" />
                        ورود به ابزار جستجوی تعرفه
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Related Articles */}
                <div className="mt-16">
                  <RelatedArticles currentPostId={2} />
                </div>

                {/* Back to Blog */}
                <div className="text-center mt-12">
                  <Button asChild variant="outline">
                    <Link to="/blog">
                      <ArrowRight className="ml-2 w-4 h-4" />
                      بازگشت به بلاگ
                    </Link>
                  </Button>
                </div>

              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default HSCodeGuide;
