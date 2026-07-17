import { useEffect, lazy, Suspense, memo } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WhyUs from "@/components/WhyUs";
import AIAssistant from "@/components/AIAssistant";
import RelatedArticles from "@/components/RelatedArticles";
import PortsMapSection from "@/components/PortsMapSection";
import FloatingCallButton from "@/components/FloatingCallButton";

// Lazy load below-the-fold components with prefetch for optimal performance
const Services = lazy(() => import("@/components/Services"));
const ExchangeRates = lazy(() => import("@/components/ExchangeRates"));
const FAQ = lazy(() => import("@/components/FAQ"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));

// Optimized loading fallback - memoized to prevent re-renders
const LoadingFallback = memo(() => (
  <div className="min-h-[200px]" />
));
// Hero image preloading now handled by vite-plugin-hero-injection for optimal LCP

const Index = () => {
  useEffect(() => {
    // Set RTL direction for Persian content
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "fa");

    // Structured Data - LocalBusiness, WebSite, and ServiceArea
    const localBusinessData = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "ترخیصان - مشاوره امور گمرکی بندرعباس",
      image: "https://tarkhisun.com/logo.png",
      description: "مشاوره تخصصی امور گمرکی و ترخیص کالا در بندرعباس شهید رجایی با بیش از 20 سال تجربه",
      address: {
        "@type": "PostalAddress",
        addressLocality: "بندرعباس",
        addressRegion: "هرمزگان",
        addressCountry: "IR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 27.1832,
        longitude: 56.2666,
      },
      telephone: "+98-917-738-0080",
      priceRange: "$$",
      openingHours: "Mo-Su 00:00-23:59",
      url: "https://tarkhisun.com",
      areaServed: {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: 27.1832,
          longitude: 56.2666,
        },
        geoRadius: "500000",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "خدمات گمرکی",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "ترخیص کالا",
              description: "ترخیص سریع و مطمئن انواع کالاهای وارداتی و صادراتی",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "مشاوره گمرکی",
              description: "مشاوره تخصصی در زمینه امور گمرکی و قوانین تجارت",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "صدور مجوزها",
              description: "اخذ انواع مجوزهای واردات و صادرات",
            },
          },
        ],
      },
    };

    const websiteData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "ترخیصان",
      url: "https://tarkhisun.com",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://tarkhisun.com/blog?search={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    };

    const serviceAreaData = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "خدمات ترخیص کالا و مشاوره گمرکی",
      provider: {
        "@type": "Organization",
        name: "ترخیصان",
      },
      areaServed: [
        {
          "@type": "Place",
          name: "بندرعباس شهید رجایی",
          address: {
            "@type": "PostalAddress",
            addressLocality: "بندرعباس",
            addressRegion: "هرمزگان",
          },
        },
        {
          "@type": "Place",
          name: "بندر امام خمینی",
          address: {
            "@type": "PostalAddress",
            addressLocality: "بندر امام خمینی",
            addressRegion: "خوزستان",
          },
        },
        {
          "@type": "Place",
          name: "بندر چابهار",
          address: {
            "@type": "PostalAddress",
            addressLocality: "چابهار",
            addressRegion: "سیستان و بلوچستان",
          },
        },
        {
          "@type": "Place",
          name: "بندر بوشهر",
          address: {
            "@type": "PostalAddress",
            addressLocality: "بوشهر",
            addressRegion: "بوشهر",
          },
        },
        {
          "@type": "Place",
          name: "بندر انزلی",
          address: {
            "@type": "PostalAddress",
            addressLocality: "بندر انزلی",
            addressRegion: "گیلان",
          },
        },
        {
          "@type": "Place",
          name: "بندر جاسک",
          address: {
            "@type": "PostalAddress",
            addressLocality: "جاسک",
            addressRegion: "هرمزگان",
          },
        },
      ],
      description:
        "ارائه خدمات تخصصی ترخیص کالا و مشاوره امور گمرکی در تمام بنادر اصلی ایران شامل بندرعباس شهید رجایی، بندر امام خمینی، بندر چابهار، بندر بوشهر، بندر انزلی و بندر جاسک",
    };

    const combinedStructuredData = {
      "@context": "https://schema.org",
      "@graph": [localBusinessData, websiteData, serviceAreaData],
    };

    let scriptTag = document.querySelector('script[type="application/ld+json"][data-page="index"]');
    if (scriptTag) {
      scriptTag.textContent = JSON.stringify(combinedStructuredData);
    } else {
      scriptTag = document.createElement("script");
      scriptTag.setAttribute("type", "application/ld+json");
      scriptTag.setAttribute("data-page", "index");
      scriptTag.textContent = JSON.stringify(combinedStructuredData);
      document.head.appendChild(scriptTag);
    }

    // Defer animation setup to idle time for better TTI
    const initAnimations = () => {
      const elements = document.querySelectorAll(".fade-in-up");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate");
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
      );

      elements.forEach((el) => observer.observe(el));

      return () => {
        elements.forEach((el) => observer.unobserve(el));
      };
    };

    // Use requestIdleCallback to defer animations
    if ('requestIdleCallback' in window) {
      const cleanup = requestIdleCallback(initAnimations);
      return () => {
        if (cleanup) cancelIdleCallback(cleanup);
      };
    } else {
      const timeoutId = setTimeout(initAnimations, 100);
      return () => clearTimeout(timeoutId);
    }
  }, []);

  return (
    <>
      {/* Hreflang Tags only - All other SEO tags are in index.html to prevent duplicates */}
      <Helmet>
        <link rel="canonical" href="https://tarkhisun.com/" />
        <link rel="alternate" hrefLang="fa" href="https://tarkhisun.com/" />
        <link rel="alternate" hrefLang="fa-IR" href="https://tarkhisun.com/" />
        <link rel="alternate" hrefLang="x-default" href="https://tarkhisun.com/" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        {/* Hidden SEO Content for Brand Keywords - Using span to avoid duplicate H1 (main H1 is in HeroSection) */}
        <div className="sr-only">
          <span><strong>ترخیصان - Tarkhisun</strong></span>
          <p>ترخیصان (Tarkhisun) بهترین مشاور امور گمرکی در بندرعباس با هوش مصنوعی ترخیصان‌یار، اولین سیستم هوش مصنوعی گمرکات ایران. ما با بیش از 20 سال تجربه در ترخیص کالا و مشاوره گمرکی، خدمات حرفه‌ای در بندر شهید رجایی، بندر امام خمینی، بندر چابهار و سایر بنادر ایران ارائه می‌دهیم.</p>
        </div>

        {/* Hidden SEO Content - All Iranian Ports */}
        <div className="sr-only" aria-hidden="true">
          <h2>خدمات ترخیص کالا و مشاوره گمرکی در بنادر ایران</h2>
          <ul>
            <li>مشاوره امور گمرکی بندرعباس شهید رجایی - ترخیص کالا در بزرگترین بندر ایران</li>
            <li>ترخیص کالا بندر امام خمینی - خدمات گمرکی در بندر امام خمینی خوزستان</li>
            <li>مشاوره گمرکی بندر چابهار - ترخیص کالا در بندر چابهار سیستان و بلوچستان</li>
            <li>ترخیص کالا بندر بوشهر - خدمات گمرکی در بندر بوشهر خلیج فارس</li>
            <li>مشاوره امور گمرکی بندر انزلی - ترخیص کالا در بندر انزلی دریای خزر</li>
            <li>ترخیص کالا بندر جاسک - خدمات گمرکی در بندر جاسک هرمزگان و دریای عمان</li>
          </ul>
          <p>
            ترخیصان ارائه دهنده خدمات تخصصی ترخیص کالا و مشاوره امور گمرکی در تمام بنادر اصلی ایران. از بندرعباس شهید
            رجایی گرفته تا بندر امام خمینی، بندر چابهار، بندر بوشهر، بندر انزلی و بندر جاسک، ما با بیش از 15 سال تجربه آماده ارائه
            خدمات گمرکی، ترخیص سریع کالا، اخذ مجوزها و مشاوره تخصصی در زمینه واردات و صادرات هستیم.
          </p>
        </div>

        <main>
          <HeroSection />
          <Suspense fallback={<LoadingFallback />}>
            <Services />
          </Suspense>
          <WhyUs />
          <Suspense fallback={<LoadingFallback />}>
            <ExchangeRates />
          </Suspense>
          <AIAssistant />
          <Suspense fallback={<LoadingFallback />}>
            <FAQ />
          </Suspense>
          <RelatedArticles mode="latest" limit={3} />
          <PortsMapSection />
          <Suspense fallback={<LoadingFallback />}>
            <Contact />
          </Suspense>
        </main>
        <Suspense fallback={<LoadingFallback />}>
          <Footer />
        </Suspense>
        <FloatingCallButton />
      </div>
    </>
  );
};

export default Index;
