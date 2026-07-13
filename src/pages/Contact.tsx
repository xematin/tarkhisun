import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import PageBreadcrumb from "@/components/PageBreadcrumb";

const ContactPage = () => {
  useEffect(() => {
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "fa");
  }, []);

  const canonical = "https://tarkhisun.com/contact";

  return (
    <>
      <Helmet>
        <link rel="canonical" href={canonical} />
        <title>تماس با ما | ترخیصان – مشاوره امور گمرکی بندرعباس</title>
        <meta
          name="description"
          content="تماس با تیم ترخیصان در بندرعباس؛ آدرس دفاتر شعبه ۱ و ۲، شماره تماس، ایمیل و فرم درخواست مشاوره تخصصی امور گمرکی و ترخیص کالا."
        />
        <meta property="og:title" content="تماس با ما | ترخیصان" />
        <meta property="og:description" content="آدرس، شماره تماس و فرم درخواست مشاوره ترخیصان." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:locale" content="fa_IR" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "تماس با ما | ترخیصان",
            description: "تماس با تیم ترخیصان در بندرعباس؛ آدرس دفاتر شعبه ۱ و ۲، شماره تماس، ایمیل و فرم درخواست مشاوره تخصصی امور گمرکی و ترخیص کالا.",
            url: canonical,
            mainEntity: {
              "@type": "Organization",
              name: "ترخیصان",
              url: "https://tarkhisun.com",
              telephone: "+989177380080",
              email: "info@tarkhisun.com",
              address: [
                {
                  "@type": "PostalAddress",
                  addressLocality: "بندرعباس",
                  streetAddress: "چهارراه سازمان، خیابان امام موسی صدر شمالی، ساختمان ثریا طبقه سوم واحد 312",
                  addressCountry: "IR",
                },
                {
                  "@type": "PostalAddress",
                  addressLocality: "بندرعباس",
                  streetAddress: "بلوار رسالت جنوبی، کوچه اردیبهشت، ساختمان عرشیا، طبقه ۴ واحد ۸",
                  postalCode: "7916864579",
                  addressCountry: "IR",
                },
              ],
            },
          })}
        </script>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <PageBreadcrumb items={[{ label: "تماس با ما" }]} />
        <main>
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ContactPage;
