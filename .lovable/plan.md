
## هدف
ساخت صفحه اختصاصی «اخذ کارت بازرگانی» در مسیر `/services/business-card` با همان زبان طراحی شیشه‌ای + 3D صفحه `/services`، اصلاح لینک «خدمات» در هدر، تقویت سئو صفحه `/services` و افزودن صفحه جدید به sitemap.

## 1) صفحه جدید: `src/pages/BusinessCardService.tsx`

استایل: glassmorphism + 3D (با کامپوننت موجود `Hero3D` به‌صورت اشتراکی)، RTL، Persian، هم‌سان با `Services.tsx`.

ساختار بخش‌ها:

- **Hero** (gradient + blob + ستون چپ متن، ستون راست `<Hero3D />` در `<Suspense>`)
  - H1: «اخذ کارت بازرگانی | حقیقی، حقوقی، تولیدی، خدماتی و موردی»
  - زیرعنوان + دو CTA: «درخواست رایگان» (اسکرول به فرم) و «مشاوره با ترخیصان‌یار» (تلگرام)
  - Badge: «خدمات تخصصی ترخیصان»

- **انواع کارت بازرگانی** (4 کارت شیشه‌ای: حقیقی، حقوقی، تولیدی/خدماتی، موردی) — هر کدام آیکن lucide، توضیح کوتاه، لینک «جزئیات بیشتر» به انکر مقاله.

- **مزایا و کاربردها** (لیست glass card با آیکن CheckCircle): واردات/صادرات رسمی، اخذ کوتاژ، حضور در نمایشگاه بین‌المللی، افتتاح LC، استفاده از تسهیلات.

- **مدارک لازم** (دو ستون: حقیقی / حقوقی) به‌صورت لیست‌های جدا در glass cards.

- **مراحل اخذ کارت** (Timeline عمودی شیشه‌ای 5 مرحله): ثبت‌نام در سامانه جامع تجارت → ثبت‌نام در اتاق بازرگانی → بارگذاری مدارک → پرداخت → صدور کارت.

- **افراد معاف / محرومین** (Accordion یا دو کارت کنار هم — بدون duplication با مقاله، فقط خلاصه + لینک به سکشن مربوطه در مقاله).

- **فرم درخواست** (سکشن `id="request-form"`، glass card، اعتبارسنجی با zod + react-hook-form که در پروژه موجود است):
  - نام و نام خانوادگی (3-100 char)
  - شماره موبایل (regex ایرانی `^09\d{9}$`)
  - نوع کارت (Select: حقیقی، حقوقی، تولیدی، خدماتی، موردی)
  - استان (input کوتاه)
  - توضیحات اختیاری (textarea، max 1000)
  - ارسال → POST به `public/api/lead-submit.php` (همان endpoint موجود در پروژه — تأیید با `rg lead-submit`) با `source: "business-card-service"`، نمایش toast موفقیت/خطا با `sonner`، ریست فرم.
  - رعایت قوانین input-validation: trim، encode، بدون لاگ داده‌های حساس.

- **CTA پایانی** (هم‌سبک با CTA صفحه /services): «نیاز به مشاوره سریع‌تر دارید؟» + دکمه تلگرام + تماس.

- **لینک به مقاله مرتبط** (لینک‌دهی داخلی برای سئو):
  - در پایان بخش انواع و بخش معاف/محروم → `to="/blog/business-card-complete-guide"`
  - یک bar مستطیلی «مطالعه مقاله کامل کارت بازرگانی →» قبل از CTA.

- **Footer + Header + PageBreadcrumb**: `[{ label: "خدمات", href: "/services" }, { label: "اخذ کارت بازرگانی" }]`.

### Helmet سئو صفحه

- `<title>` (≤60 char بدون «ترخیصان» طبق قاعده پروژه): «اخذ کارت بازرگانی | انواع، مدارک و مراحل»
- meta description (≤155 char): «اخذ کارت بازرگانی حقیقی، حقوقی، تولیدی، خدماتی و موردی؛ مدارک، مراحل و درخواست آنلاین مشاوره تخصصی در بندرعباس.»
- keywords، og:title/description/url/locale
- JSON-LD `Service` schema با `provider` به `Organization` + `areaServed` ایران + `serviceType: "اخذ کارت بازرگانی"`
- JSON-LD `BreadcrumbList`
- **بدون canonical** (طبق Core rule: canonical فقط روی /, /blog, /currencies, /install)

## 2) Routing — `src/App.tsx`

افزودن lazy import و Route قبل از catch-all:
```
const BusinessCardService = lazy(() => import("./pages/BusinessCardService"));
<Route path="/services/business-card" element={<BusinessCardService />} />
```

## 3) لینک هدر — `src/components/Header.tsx`

تغییر `{ title: "خدمات", href: "/#services" }` به `{ title: "خدمات", href: "/services" }`. منطق `isActive` فعلی برای مسیرهای غیر-hash درست کار می‌کند (`pathname === href || pathname.startsWith(href + "/")`)، پس روی `/services` و `/services/business-card` هر دو فعال می‌شود. نسخه موبایل نیز همان آرایه است، خودکار آپدیت می‌گردد.

## 4) سئو صفحه `/services` (تقویت `src/pages/Services.tsx`)

- بهبود description (دقیق‌تر، با کلمات کلیدی محلی) و حفظ ≤155 char.
- افزودن `<meta property="og:locale">` (موجود است).
- افزودن JSON-LD `BreadcrumbList` در کنار `ItemList` فعلی.
- افزودن JSON-LD `Service` جمعی برای هر کارت با لینک‌های blog/services.
- لینک کارت «اخذ کارت بازرگانی» در آرایه `services` تغییر کند از `"/blog/business-card-complete-guide"` به `"/services/business-card"` (تا hub صفحه خدمت باشد، صفحه خدمت خود به مقاله لینک می‌دهد).
- افزودن یک sub-heading H2 سئویی پایین Hero «خدمات تخصصی گمرکی و بازرگانی» (متن کوتاه semantic با `<strong>` برای کلمات کلیدی).
- لینک‌دهی متقابل: در سکشن «اخذ کارت بازرگانی» کارت `Services.tsx` اصلی روی صفحه اصلی نیز به `/services/business-card` بفرستد (بررسی و آپدیت `src/components/Services.tsx`).

## 5) Sitemap — `public/sitemap.xml`

افزودن یک `<url>` در بخش Priority 0.8:
```xml
<url>
  <loc>https://tarkhisun.com/services/business-card</loc>
  <lastmod>2026-06-09</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>
```

## 6) لینک Static SEO — `index.html`

افزودن لینک جدید زیر `<nav aria-label="منوی اصلی">`:
```html
<a href="/services/business-card">اخذ کارت بازرگانی - انواع، مدارک و مراحل</a>
```
(طبق memory پروژه باید لینک‌های استاتیک با مسیرهای React Router همگام بمانند.)

## فایل‌های جدید
- `src/pages/BusinessCardService.tsx`

## فایل‌های ویرایش‌شده
- `src/App.tsx` (route)
- `src/components/Header.tsx` (لینک «خدمات»)
- `src/components/Services.tsx` (لینک کارت کارت بازرگانی → /services/business-card)
- `src/pages/Services.tsx` (سئو، breadcrumb schema، لینک کارت کارت بازرگانی)
- `public/sitemap.xml`
- `index.html` (static SEO link)

## ملاحظات فنی
- استفاده مجدد از `Hero3D` موجود — بدون پکیج جدید.
- فرم: zod schema + react-hook-form + `Input/Textarea/Label/Select` از shadcn (موجود). توست با `sonner`. اعتبارسنجی client + ارسال به endpoint موجود.
- بدون تغییر در `src/integrations/supabase/*` و config.toml.
- رعایت WCAG: کنتراست متن سفید روی gradient hero و کنتراست متن کارت‌ها روی پس‌زمینه شیشه‌ای.
- بدون canonical در صفحه جدید (مطابق memory).
