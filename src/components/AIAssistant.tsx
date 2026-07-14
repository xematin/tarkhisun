import { Button } from "@/components/ui/button";
import { Bot, Sparkles, MessageCircle, FileText, CheckCircle, ArrowLeft, Zap, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const features = [{
    icon: MessageCircle,
    title: "پاسخ به سوالات گمرکی",
    description: "دریافت پاسخ‌های تخصصی و دقیق برای تمام سوالات گمرکی شما"
  }, {
    icon: FileText,
    title: "راهنمایی مراحل ترخیص",
    description: "گام‌به‌گام راهنمایی برای انجام صحیح مراحل ترخیص کالا"
  }, {
    icon: CheckCircle,
    title: "بررسی مدارک اولیه",
    description: "کنترل و بررسی اولیه مدارک مورد نیاز برای ترخیص"
  }, {
    icon: Zap,
    title: "تشخیص نوع مجوز",
    description: "شناسایی دقیق انواع مجوزهای مورد نیاز برای کالاهای مختلف"
  }];
  const handleAIClick = () => {
    window.open('https://t.me/N8NAutoBotBot', '_blank');
  };
  return <section id="ai-assistant" className="contain-layout gpu-accelerated py-20 bg-gradient-to-br from-accent-lighter via-white to-primary-lighter">
      <div className="container mx-auto px-4" dir="rtl">
        {/* Main AI Card */}
        <div className="max-w-4xl mx-auto">
          <div className="card-ai-feature text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-persian">اولین در ایران</span>
            </div>

            {/* Main Content */}
            <div className="mb-8">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-accent to-accent-light rounded-2xl flex items-center justify-center shadow-ai">
                  <Bot className="w-12 h-12 text-white" />
                </div>
              </div>

              <h2 className="heading-secondary mb-4">
                <span className="text-accent">ترخیصان‌یار</span>
                <br />
                هوش مصنوعی گمرکات
              </h2>

              <p className="text-xl text-muted-foreground leading-relaxed mb-6 text-persian">
                اولین ابزار هوش مصنوعی در حوزه گمرکات ایران
                <br />
                <strong className="text-accent">کاملاً رایگان</strong>
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed mb-8 text-persian">
                از مشاوره گمرکی گرفته تا پاسخ تخصصی به سوالات، 
                ترخیصان‌یار در تمام مراحل ترخیص کالا همراه شماست
              </p>
            </div>

            {/* CTA Button */}
            <Button size="lg" className="btn-ai text-white text-sm md:text-lg px-4 md:px-8 py-3 md:py-4 text-persian" onClick={handleAIClick}>
              <MessageCircle className="mr-2 md:mr-3 h-5 md:h-6 w-5 md:w-6" />
              مشاوره رایگان با ترخیصان‌یار
              <ArrowLeft className="ml-2 md:ml-3 h-4 md:h-5 w-4 md:w-5" />
            </Button>

            <p className="text-sm text-muted-foreground mt-4 text-persian">
              * بدون نیاز به ثبت‌نام - شروع فوری مشاوره
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return <div key={index} className="card-service text-center">
                <div className="w-16 h-16 bg-accent/15 rounded-xl flex items-center justify-center mx-auto mb-4 border border-accent/20">
                  <IconComponent className="w-8 h-8 text-accent" />
                </div>
                
                <h3 className="font-semibold text-primary mb-3 text-persian">
                  {feature.title}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed text-persian">
                  {feature.description}
                </p>
              </div>;
        })}
        </div>

        {/* About Tarkhisan-yar AI - Rich Content Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
            <CollapsibleTrigger className="w-full group">
              <div className={`card-service cursor-pointer transition-all duration-300 ${isOpen ? 'shadow-lg border-2 border-accent/30 bg-accent/5' : 'hover:shadow-md hover:border-accent/20'}`}>
                <div className="flex items-center justify-between gap-4">
                  <h3 className="heading-tertiary text-center flex-1 group-hover:text-accent transition-colors duration-300">
                    ترخیصان‌یار چیست و چگونه کار می‌کند؟
                  </h3>
                  <ChevronDown className={`w-6 h-6 text-accent transition-transform duration-500 ease-in-out ${isOpen ? 'rotate-180' : ''}`} />
                </div>
                <p className="text-sm text-muted-foreground mt-3 text-persian">
                  برای مشاهده توضیحات کامل کلیک کنید
                </p>
              </div>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="mt-6 overflow-hidden transition-all duration-500 ease-in-out data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
              <div className="prose prose-lg mx-auto text-right" dir="rtl">
                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <p className="text-persian text-lg">
                    <strong className="text-primary">ترخیصان‌یار</strong> اولین و پیشرفته‌ترین سیستم <strong className="text-primary">هوش مصنوعی تخصصی گمرکی</strong> در ایران است که با بهره‌گیری از جدیدترین تکنولوژی‌های یادگیری ماشین و پردازش زبان طبیعی، تمامی فرآیندهای مرتبط با <strong className="text-primary">ترخیص کالا</strong> و <strong className="text-primary">امور گمرکی</strong> را ساده‌تر و سریع‌تر می‌کند. این سیستم هوشمند با تحلیل هزاران پرونده ترخیصی و قوانین گمرکی ایران، قادر به ارائه <strong className="text-primary">مشاوره تخصصی فوری</strong> و <strong className="text-primary">راهنمایی گام‌به‌گام</strong> در تمام مراحل واردات و صادرات است.
                  </p>

                  <p className="text-persian text-lg">
                    یکی از بزرگ‌ترین چالش‌های واردکنندگان و صادرکنندگان، پیچیدگی 
                    <strong className="text-primary"> مقررات گمرکی</strong> و نیاز به اطلاعات دقیق درباره 
                    <strong className="text-primary"> مجوزهای لازم</strong>، <strong className="text-primary">تعرفه‌های گمرکی</strong>، 
                    <strong className="text-primary"> مدارک مورد نیاز</strong> و <strong className="text-primary">زمان‌بندی ترخیص</strong> است. 
                    ترخیصان‌یار با پاسخ‌گویی به سوالات تخصصی در کمتر از چند ثانیه، 
                    این فرآیند را از روزها به دقایق تبدیل می‌کند و احتمال خطا را به 
                    حداقل می‌رساند.
                  </p>

                  <h4 className="text-xl font-bold text-primary mt-8 mb-4 text-persian">
                    قابلیت‌های پیشرفته ترخیصان‌یار
                  </h4>

                  <p className="text-persian text-lg">
                    سیستم هوش مصنوعی ترخیصان‌یار می‌تواند انواع کالاها را بر اساس 
                    <strong className="text-primary"> کدهای تعرفه (HS Code)</strong> شناسایی کرده و 
                    <strong className="text-primary"> میزان دقیق حقوق گمرکی</strong>، <strong className="text-primary">سود بازرگانی</strong> و 
                    <strong className="text-primary">مالیات ارزش افزوده</strong> را محاسبه کند. همچنین این سیستم 
                    قادر به تشخیص <strong className="text-primary">کالاهای ممنوعه</strong> و <strong className="text-primary">مشروط</strong>، 
                    لیست کامل <strong className="text-primary">مجوزهای مورد نیاز</strong> از سازمان‌های مختلف مانند 
                    وزارت بهداشت، استاندارد، EPA و سایر مراجع ذی‌صلاح است.
                  </p>

                  <p className="text-persian text-lg">
                    ترخیصان‌یار همچنین اطلاعات جامعی درباره <strong className="text-primary">گمرکات مختلف ایران </strong> 
                    از جمله <strong className="text-primary">بندر شهید رجایی</strong>، <strong className="text-primary">بندرعباس</strong>، 
                    <strong className="text-primary">بندر امام خمینی</strong>، <strong className="text-primary">فرودگاه امام خمینی</strong>، 
                    <strong className="text-primary">بندر چابهار</strong> و <strong className="text-primary">مرزهای زمینی</strong> مانند 
                    میرجاوه، بازرگان و نوردوز در اختیار کاربران قرار می‌دهد و 
                    می‌تواند بهترین <strong className="text-primary">مسیر ترخیص</strong> را با توجه به نوع کالا 
                    و مقصد پیشنهاد دهد.
                  </p>

                  <h4 className="text-xl font-bold text-primary mt-8 mb-4 text-persian">
                    چرا ترخیصان‌یار را انتخاب کنیم؟
                  </h4>

                  <p className="text-persian text-lg">
                    برخلاف مشاوره‌های سنتی که نیاز به تماس تلفنی، نوبت‌گیری و هزینه‌های بالا دارند، ترخیصان‌یار به صورت <strong className="text-primary">کاملاً رایگان</strong> و <strong className="text-primary">24 ساعته</strong> در دسترس است. کاربران می‌توانند در هر ساعت از شبانه‌روز، بدون محدودیت تعداد سوال، از این سیستم هوشمند استفاده کنند. علاوه بر این، پاسخ‌های ارائه شده توسط ترخیصان‌یار بر اساس <strong className="text-primary">آخرین قوانین و مقررات گمرکی ایران</strong> به‌روزرسانی می‌شوند و دقت بالایی دارند.
                  </p>

                  <p className="text-persian text-lg">
                    این ابزار هوشمند ویژه <strong className="text-primary">واردکنندگان</strong>، <strong className="text-primary">صادرکنندگان</strong>، <strong className="text-primary">بازرگانان</strong>، <strong className="text-primary">ترخیصکاران گمرکی</strong> و <strong className="text-primary">شرکت‌های حمل و نقل بین‌المللی</strong> طراحی شده است. استفاده از ترخیصان‌یار نه تنها <strong className="text-primary">صرفه‌جویی قابل توجه در زمان و هزینه</strong> ایجاد می‌کند، بلکه با کاهش خطاهای انسانی، از <strong className="text-primary">جریمه‌های گمرکی</strong> و <strong className="text-primary">توقف کالا</strong> نیز جلوگیری می‌کند.
                  </p>

                  <div className="bg-accent/15 border-r-4 border-accent p-6 rounded-lg mt-8">
                    <p className="text-persian text-lg font-semibold text-primary">
                      💡 نکته مهم : ترخیصان‌یار تنها یک چت‌بات ساده نیست، بلکه یک سیستم مشاوره تخصصی هوشمند است که با تحلیل دقیق شرایط هر کالا و نیاز کاربر، راهکارهای سفارشی‌سازی شده ارائه می‌دهد. 
                      <strong className="text-primary"> سیستم مشاوره تخصصی هوشمند</strong> است که با تحلیل دقیق 
                      شرایط هر کالا و نیاز کاربر، راهکارهای سفارشی‌سازی شده ارائه می‌دهد.
                    </p>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </section>;
};
export default AIAssistant;