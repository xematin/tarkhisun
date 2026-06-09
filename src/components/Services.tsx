import { Truck, FileCheck, Users, Search, Shield, Clock, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      icon: Truck,
      title: "ترخیص کالا",
      description: "ترخیص سریع و مطمئن انواع کالاهای وارداتی و صادراتی در تمام بنادر کشور",
      features: ["ترخیص در کمترین زمان", "مشاوره تخصصی", "پیگیری ۲۴ ساعته"],
      link: "/blog/complete-guide-customs-clearance-shahid-rajaei"
    },
    {
      icon: CreditCard,
      title: "اخذ کارت بازرگانی",
      description: "اخذ، تمدید و مشاوره کارت بازرگانی حقیقی، حقوقی، تولیدی، خدماتی و موردی",
      features: ["مشاوره و تهیه مدارک", "ثبت‌نام در اتاق بازرگانی", "تمدید سالانه کارت"],
      link: "/blog/business-card-complete-guide"
    },
    {
      icon: FileCheck,
      title: "صدور مجوزها",
      description: "اخذ انواع مجوزهای واردات، صادرات و مجوزهای تخصصی از سازمان‌های مختلف",
      features: ["مجوز استاندارد", "مجوز بهداشت", "مجوزهای ویژه"],
      link: "/blog/ntsw-complete-guide"
    },
    {
      icon: Users,
      title: "مشاوره گمرکی",
      description: "مشاوره تخصصی در زمینه امور گمرکی، تعرفه و قوانین تجارت بین‌الملل",
      features: ["مشاوره حقوقی", "بررسی تعرفه", "راهنمایی قوانین"],
      link: "/blog/customs-tariff-guide"
    },
    {
      icon: Search,
      title: "پیگیری پرونده",
      description: "پیگیری مستمر وضعیت پرونده‌های ترخیص و ارائه گزارش‌های لحظه‌ای",
      features: ["پیگیری آنلاین", "گزارش مرحله‌ای", "اطلاع‌رسانی SMS"],
      link: "/blog/manifest-guide"
    },
    {
      icon: Shield,
      title: "خدمات بیمه",
      description: "بیمه کالا و مشاوره انواع پوشش‌های بیمه‌ای برای محموله‌های تجاری",
      features: ["بیمه حمل", "بیمه کالا", "مشاوره پوشش"],
      link: "/blog/incoterms-guide"
    },
    {
      icon: Clock,
      title: "خدمات ۲۴ ساعته",
      description: "پشتیبانی و مشاوره در تمام ساعات شبانه‌روز برای پاسخ‌گویی فوری",
      features: ["پشتیبانی شبانه‌روزی", "پاسخ‌گویی فوری", "مشاوره تلفنی"],
      link: "/blog/import-export-guide"
    }
  ];

  return (
    <section id="services" className="contain-layout gpu-accelerated py-20 bg-background">
      <div className="container mx-auto px-4" dir="rtl">
        <div className="text-center mb-16">
          <h2 className="heading-secondary mb-4">خدمات <strong>ترخیصان</strong></h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-persian">
            <strong>ترخیصان</strong> با تیم مجرب و متخصص، تمام نیازهای گمرکی و ترخیص کالای شما را در بندرعباس و سراسر ایران پوشش می‌دهد
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div key={index} className="service-card-v2 group">
                <div className="service-icon-v2">
                  <IconComponent className="w-7 h-7" strokeWidth={1.6} />
                </div>

                <h3 className="heading-tertiary mb-3 group-hover:text-primary transition-colors">
                  <strong>{service.title}</strong>
                </h3>

                <p className="text-muted-foreground mb-5 leading-relaxed text-persian text-sm">
                  {service.description}
                </p>

                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground text-persian">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full ml-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-5 border-t border-border">
                  <Link
                    to={service.link}
                    className="text-accent-dark font-semibold text-sm hover:text-accent transition-colors text-persian inline-flex items-center gap-2 hover:gap-3"
                    aria-label={`مطالعه راهنمای ${service.title}`}
                  >
                    <span>اطلاعات بیشتر</span>
                    <span className="transition-all">←</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>


        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="heading-tertiary mb-4">نیاز به مشاوره تخصصی <strong>ترخیصان</strong> دارید؟</h3>
            <p className="text-muted-foreground mb-6 text-persian">
              کارشناسان ما آماده ارائه مشاوره رایگان و بررسی پرونده شما هستند
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="btn-hero"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                درخواست مشاوره رایگان
              </button>
              <button 
                className="btn-ai"
                onClick={() => window.open('https://t.me/N8NAutoBotBot', '_blank')}
              >
                مشاوره با ترخیصان‌یار
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;