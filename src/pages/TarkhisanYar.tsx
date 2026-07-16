import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AIAssistant from "@/components/AIAssistant";

const TarkhisanYar = () => {
  useEffect(() => {
    document.title = "ترخیصان‌یار | هوش مصنوعی گمرکی رایگان";
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta(
      "description",
      "ترخیصان‌یار، اولین هوش مصنوعی تخصصی گمرکی ایران؛ مشاوره رایگان ۲۴ ساعته درباره ترخیص کالا، تعرفه، مجوزها و مدارک گمرکی."
    );
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://tarkhisun.com/tarkhisan-yar");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="pt-24 pb-4">
          <div className="container mx-auto px-4" dir="rtl">
            <h1 className="heading-primary text-center">ترخیصان‌یار — هوش مصنوعی گمرکی</h1>
          </div>
        </section>
        <AIAssistant />
      </main>
      <Footer />
    </div>
  );
};

export default TarkhisanYar;
