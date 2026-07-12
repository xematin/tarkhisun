import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import Currencies from "./pages/Currencies";
import NotFound from "./pages/NotFound";
import Install from "./pages/Install";
import ContactRedirect from "./pages/ContactRedirect";
import HSCodeSearch from "./pages/HSCodeSearch";
import TSDashboard from "./pages/TSDashboard";
import TSCards from "./pages/TSCards";
import TSCardUser from "./pages/TSCardUser";
import AutoBlogSEO from "./components/AutoBlogSEO";

// Lazy load blog pages for better performance
const BlogPost = lazy(() => import("./pages/BlogPost"));
const HSCodeGuide = lazy(() => import("./pages/HSCodeGuide"));
const CustomsTariffGuide = lazy(() => import("./pages/CustomsTariffGuide"));
const ExchangeRateGuide = lazy(() => import("./pages/ExchangeRateGuide"));
const NTSWGuide = lazy(() => import("./pages/NTSWGuide"));
const IncotermsGuide = lazy(() => import("./pages/IncotermsGuide"));
const BusinessCardGuide = lazy(() => import("./pages/BusinessCardGuide"));
const SanaExchangeRateGuide = lazy(() => import("./pages/SanaExchangeRateGuide"));
const ImportExportGuide = lazy(() => import("./pages/ImportExportGuide"));
const ManifestGuide = lazy(() => import("./pages/ManifestGuide"));
const TahLanjiImportGuide = lazy(() => import("./pages/TahLanjiImportGuide"));
const ExcavationMachineryGuide = lazy(() => import("./pages/ExcavationMachineryGuide"));
const Article1CommissionGuide = lazy(() => import("./pages/Article1CommissionGuide"));
const KuwaitAfghanistanTransitGuide = lazy(() => import("./pages/KuwaitAfghanistanTransitGuide"));
const IslamQalaGuide = lazy(() => import("./pages/IslamQalaGuide"));
const GeneratorClearanceBandarAbbasGuide = lazy(() => import("./pages/GeneratorClearanceBandarAbbasGuide"));
const DubaiToAbbasImportGuide = lazy(() => import("./pages/DubaiToAbbasImportGuide"));
const WaterTankClearanceGuide = lazy(() => import("./pages/WaterTankClearanceGuide"));
const CarPartsImportGuide = lazy(() => import("./pages/CarPartsImportGuide"));
const BandarAbbasComprehensiveGuide = lazy(() => import("./pages/BandarAbbasComprehensiveGuide"));
const HomeAppliancesClearanceGuide = lazy(() => import("./pages/HomeAppliancesClearanceGuide"));
const MobileRegistryGuide = lazy(() => import("./pages/MobileRegistryGuide"));
const ExportCardGuide = lazy(() => import("./pages/ExportCardGuide"));
const ImportedCarSystemGuide = lazy(() => import("./pages/ImportedCarSystemGuide"));
const BusinessConsultingGuide = lazy(() => import("./pages/BusinessConsultingGuide"));
const CustomsClearanceCompanyGuide = lazy(() => import("./pages/CustomsClearanceCompanyGuide"));
const InternationalShippingGuide = lazy(() => import("./pages/InternationalShippingGuide"));
const TradingCompanyGuide = lazy(() => import("./pages/TradingCompanyGuide"));
const ImportRoutesIranGuide = lazy(() => import("./pages/ImportRoutesIranGuide"));
const ElectricCarTariffGuide = lazy(() => import("./pages/ElectricCarTariffGuide"));
const CustomsTariff2025Guide = lazy(() => import("./pages/CustomsTariff2025Guide"));
const Budget1405Guide = lazy(() => import("./pages/Budget1405Guide"));
const CustomsLawArticles1To13Guide = lazy(() => import("./pages/CustomsLawArticles1To13Guide"));
const ServicesPage = lazy(() => import("./pages/Services"));
const BusinessCardService = lazy(() => import("./pages/BusinessCardService"));
const ContactPage = lazy(() => import("./pages/Contact"));

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();

  useEffect(() => {
    // Remove server-injected hero image on non-homepage routes
    if (location.pathname !== "/") {
      const initialHeroImage = document.getElementById('hero-initial-image');
      if (initialHeroImage) {
        initialHeroImage.remove();
      }
    }
  }, [location.pathname]);

  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-persian">در حال بارگذاری...</div>}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/customs-tariff-guide" element={<CustomsTariffGuide />} />
        <Route path="/blog/hs-code-guide" element={<HSCodeGuide />} />
        <Route path="/blog/customs-exchange-rate-guide" element={<ExchangeRateGuide />} />
        <Route path="/blog/ntsw-complete-guide" element={<NTSWGuide />} />
        <Route path="/blog/incoterms-guide" element={<IncotermsGuide />} />
        <Route path="/blog/business-card-complete-guide" element={<BusinessCardGuide />} />
        <Route path="/blog/sana-nima-exchange-rate-difference-guide" element={<SanaExchangeRateGuide />} />
        <Route path="/blog/import-export-guide-iran" element={<ImportExportGuide />} />
        <Route path="/blog/manifest-guide" element={<ManifestGuide />} />
        <Route path="/blog/tah-lanji-import-guide" element={<TahLanjiImportGuide />} />
        <Route path="/blog/excavation-machinery-import-guide" element={<ExcavationMachineryGuide />} />
        <Route path="/blog/customs-article-1-commission-guide" element={<Article1CommissionGuide />} />
        <Route path="/blog/kuwait-afghanistan-transit-guide" element={<KuwaitAfghanistanTransitGuide />} />
        <Route path="/blog/islam-qala-border-crossing-guide" element={<IslamQalaGuide />} />
        <Route path="/blog/generator-clearance-bandar-abbas-guide" element={<GeneratorClearanceBandarAbbasGuide />} />
        <Route path="/blog/dubai-to-abbas-import-guide" element={<DubaiToAbbasImportGuide />} />
        <Route path="/blog/water-tank-clearance-bandar-abbas-guide" element={<WaterTankClearanceGuide />} />
        <Route path="/blog/car-parts-import-customs-clearance-guide" element={<CarPartsImportGuide />} />
        <Route path="/blog/bandar-abbas-comprehensive-clearance-guide" element={<BandarAbbasComprehensiveGuide />} />
        <Route path="/blog/zero-to-hundred-bandar-abbas-customs-clearance" element={<BlogPost />} />
        <Route path="/blog/home-appliances-clearance-bandar-abbas-guide" element={<HomeAppliancesClearanceGuide />} />
        <Route path="/blog/mobile-phone-customs-clearance-registry-guide" element={<MobileRegistryGuide />} />
        <Route path="/blog/export-card-complete-guide" element={<ExportCardGuide />} />
        <Route path="/blog/imported-car-system-guide" element={<ImportedCarSystemGuide />} />
        <Route path="/blog/business-consulting-guide" element={<BusinessConsultingGuide />} />
        <Route path="/blog/customs-clearance-company-guide" element={<CustomsClearanceCompanyGuide />} />
        <Route path="/blog/international-shipping-guide" element={<InternationalShippingGuide />} />
        <Route path="/blog/trading-company-guide" element={<TradingCompanyGuide />} />
        <Route path="/blog/import-routes-iran-guide" element={<ImportRoutesIranGuide />} />
        <Route path="/blog/electric-car-tariff-guide" element={<ElectricCarTariffGuide />} />
        <Route path="/blog/customs-tariff-2025-guide" element={<CustomsTariff2025Guide />} />
        <Route path="/blog/budget-1405-guide" element={<Budget1405Guide />} />
        <Route path="/blog/customs-law-articles-1-to-13-guide" element={<CustomsLawArticles1To13Guide />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/currencies" element={<Currencies />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/hscode" element={<HSCodeSearch />} />
        <Route path="/TSDashboard" element={<TSDashboard />} />
        <Route path="/TSCards" element={<TSCards />} />
        <Route path="/TSCardUser" element={<TSCardUser />} />
        <Route path="/install" element={<Install />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/business-card" element={<BusinessCardService />} />
        <Route path="/contact" element={<ContactRedirect />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <AutoBlogSEO />
    </Suspense>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
