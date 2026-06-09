
# پلن اجرا

## ۱. به‌روزرسانی SEO و ساختار هدینگ‌های مقاله کارت بازرگانی
فایل: `src/pages/BusinessCardGuide.tsx`

- بازنویسی `<title>` در Helmet (طبق Core memory: حداکثر یک H1، حداکثر ۱۵۵ کاراکتر برای description، بدون برند «ترخیصان» در عنوان صفحات داخلی).
  - title پیشنهادی: «کارت بازرگانی چیست؟ انواع، شرایط، معایب و افراد معاف و محروم»
  - description: «راهنمای کامل کارت بازرگانی: انواع تولیدی/خدماتی/موردی، مدارک، شرایط، معایب، افراد معاف و محرومین از دریافت کارت» (زیر ۱۵۵)
- به‌روزرسانی `keywords` با افزودن: «کارت بازرگانی تولیدی»، «کارت بازرگانی خدماتی»، «کارت بازرگانی موردی»، «معایب کارت بازرگانی»، «معافیت کارت بازرگانی»، «محرومین کارت بازرگانی».
- به‌روزرسانی `headline` و `description` در JSON-LD Article.
- بازبینی ساختار H1/H2/H3:
  - یک H1 یکتا در ابتدای مقاله: «کارت بازرگانی چیست؟»
  - هر بخش جدید که اضافه کردیم (نوع درخواست، معایب، معاف، محرومین) با `<h2>` سمنتیک باشد، نه div با کلاس heading.
  - زیربخش‌ها (کارت تولیدی/خدماتی/موردی، ...) با `<h3>`.
- حفظ Canonical فعلی (طبق Core memory، مقالات بلاگ canonical ندارند — اگر فعلاً وجود دارد، حذف می‌شود).
- به‌روزرسانی og:title / twitter:title / og:description هم‌راستا.

## ۲. افزودن «اخذ کارت بازرگانی» به Services.tsx
فایل: `src/components/Services.tsx`

- اضافه شدن آیتم جدید با آیکن `CreditCard` (lucide):
  - title: «اخذ کارت بازرگانی»
  - description: «اخذ و تمدید کارت بازرگانی حقیقی، حقوقی و موردی با کمترین زمان»
  - features: ["مشاوره تخصصی", "تهیه مدارک", "تمدید سالانه"]
  - link: `/services/business-card` (در آینده) — فعلاً به `/blog/business-card-complete-guide` لینک می‌دهیم (در این مرحله صفحه اختصاصی نمی‌سازیم؛ کاربر در گزینه‌های انتخابی فقط /services را تأیید کرد، نه /services/business-card — پس فقط به مقاله لینک می‌دهیم).

> یادداشت: کاربر گزینه `/services/business-card` را در پاسخ نیاورد. اگر بخواهید، در یک تغییر بعدی صفحه اختصاصی هم می‌سازیم.

## ۳. ساخت صفحه `/services` با Three.js واقعی + Glassmorphism
فایل‌های جدید:
- `src/pages/Services.tsx` — صفحه مستقل
- `src/components/services/Hero3D.tsx` — صحنه `@react-three/fiber` در hero
- `src/components/services/GlassServiceCard.tsx` — کارت شیشه‌ای

روت: در `src/App.tsx` افزودن `<Route path="/services" element={<Services />} />` (lazy load).

### وابستگی‌ها (مطابق تنظیمات پروژه)
- `@react-three/fiber@^8.18`
- `@react-three/drei@^9.122`
- `three@^0.160`

### ساختار صفحه
1. **Header** (همان Header موجود)
2. **PageBreadcrumb** (خانه › خدمات)
3. **Hero**:
   - عنوان `<h1>`: «خدمات تخصصی ترخیص و امور گمرکی»
   - زیرعنوان فارسی
   - پس‌زمینه: صحنه 3D شامل کره/تروس شیشه‌ای چرخان با MeshTransmissionMaterial از drei + ذرات شناور + نورپردازی نرم.
   - دو CTA: «مشاوره رایگان» / «مشاوره با ترخیصان‌یار»
4. **شبکه خدمات** (Glassmorphism):
   - ۸ کارت: ترخیص کالا، اخذ کارت بازرگانی، صدور مجوزها، مشاوره گمرکی، پیگیری پرونده، خدمات بیمه، حمل بین‌المللی، خدمات ۲۴ ساعته.
   - هر کارت: `backdrop-blur-xl`, border نیمه‌شفاف، gradient ظریف، آیکن lucide، hover با ارتفاع و درخشش.
   - هر کارت لینک به مقاله/صفحه مربوطه.
5. **بخش «چرا ترخیصان»** خلاصه با ۴ آمار شیشه‌ای.
6. **CTA پایانی** با گرادیان و دکمه‌ها.
7. **Footer** موجود.

### SEO صفحه
- Helmet با title بدون برند، description زیر ۱۵۵ کاراکتر.
- بدون canonical (طبق Core memory فقط `/`, `/blog`, `/currencies`, `/install` مجاز).
- JSON-LD از نوع `Service` یا `ItemList`.
- یک H1 یکتا.

### پرفورمنس
- `Suspense` + `lazy` برای صفحه.
- `Canvas` با `dpr={[1, 2]}` و `frameloop="demand"` در صورت امکان، یا کاهش frameloop در پایین صفحه.
- ابعاد محدود hero (مثلاً ۶۰vh) تا overhead 3D کنترل شود.

## فایل‌ها

```text
ویرایش:
  src/pages/BusinessCardGuide.tsx   (SEO + H1/H2)
  src/components/Services.tsx       (کارت جدید کارت بازرگانی)
  src/App.tsx                       (route /services)
  package.json                      (وابستگی‌های three)

افزودن:
  src/pages/Services.tsx
  src/components/services/Hero3D.tsx
  src/components/services/GlassServiceCard.tsx
```

## خارج از این پلن
- صفحه اختصاصی `/services/business-card` (در صورت تمایل، در مرحله بعد).
- به‌روزرسانی `sitemap.xml` و `index.html` (لینک‌های استاتیک SEO) برای `/services` — طبق memory باید همگام شود؛ این هم در پلن انجام می‌شود (در `public/sitemap.xml` و در بخش لینک‌های مخفی `index.html` اگر موجود است).
