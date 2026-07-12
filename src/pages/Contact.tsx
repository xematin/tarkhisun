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
