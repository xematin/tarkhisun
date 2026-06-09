## هدف
1. تغییر دکمه «مشاوره با ترخیصان‌یار» در Hero صفحه `/services/business-card` به دکمه‌ی فعال **«راهنمای کارت بازرگانی و مراحل اخذ آن»**.
2. با کلیک، یک **Dialog** باز شود که:
   - شماره تماس تیم ترخیصان را نمایش دهد (قابل کلیک برای تماس مستقیم).
   - فرم کوتاهی برای دریافت شماره تماس کاربر داشته باشد (با اعتبارسنجی فرمت `09XXXXXXXXX`).
   - با ثبت، شماره در دیتابیس ذخیره شود تا تیم با کاربر تماس بگیرد.
3. یک **تب/پنل جدید در پنل مدیریت `TSDashboard`** به نام **«مشاوره کارت بازرگانی»** که این درخواست‌ها را مشابه «لیدها» لیست/جستجو/حذف/خروجی CSV می‌گیرد.

## معماری (مطابق سیستم موجود PHP/MySQL)

ذخیره‌سازی روی همان بک‌اند PHP فعلی (`public/api/...`) و جدول جدید `ts_card_consult` در MySQL. (سیستم با Supabase پر نشده، با PHP/MySQL کار می‌کند — همان الگوی `ts_leads` تکرار می‌شود.)

### شِما جدول جدید
```sql
CREATE TABLE ts_card_consult (
  id INT AUTO_INCREMENT PRIMARY KEY,
  phone VARCHAR(15) NOT NULL,
  source VARCHAR(50) DEFAULT 'business-card-hero',
  ip VARCHAR(45) NULL,
  user_agent VARCHAR(255) NULL,
  note VARCHAR(255) NULL,
  status ENUM('new','contacted','done','rejected') DEFAULT 'new',
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  INDEX idx_phone (phone),
  INDEX idx_created (created_at)
);
```
> مهاجرت در `public/api/migrations/2026_06_09_card_consult.sql` ذخیره می‌شود و در `install.php` بارگذاری خواهد شد.

### اندپوینت‌های PHP جدید
- **`public/api/card-consult-submit.php`** (عمومی، POST): اعتبارسنجی `phone` با `ts_valid_phone`، نرمال‌سازی ارقام، ذخیره در `ts_card_consult` با IP/UA/source.
- **`public/api/admin/card-consult-list.php`** (نیاز به ادمین، GET): pagination + جستجو روی phone، مشابه `leads.php`.
- **`public/api/admin/card-consult-delete.php`** (POST).
- **`public/api/admin/card-consult-export.php`** (GET → CSV).
- **`public/api/admin/card-consult-update.php`** (POST): تغییر `status` و `note`.

## تغییرات فرانت‌اند

### 1) `src/components/business-card/CardConsultDialog.tsx` (جدید)
- استفاده از `Dialog` (shadcn).
- نمایش شماره تماس ثابت تیم (یک رشته متنی — **شماره دقیق از کاربر گرفته شود؛ به‌صورت پیش‌فرض `021-91006970` یا شماره موجود در Contact استفاده می‌شود**).
- لینک `tel:` و دکمه «کپی شماره».
- فرم: input شماره موبایل + Button «درخواست تماس از من».
- اعتبارسنجی با `zod` (regex `^09\d{9}$` و نرمال‌سازی ارقام فارسی).
- POST به `/api/card-consult-submit.php`، نمایش toast موفقیت/خطا، بستن دیالوگ.

### 2) `src/pages/BusinessCardService.tsx`
- خطوط 241-246: حذف دکمه disabled فعلی، جایگزینی با دکمه فعال:
  ```tsx
  <button onClick={() => setConsultOpen(true)} className="px-6 py-3 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white font-bold text-persian transition-all inline-flex items-center gap-2">
    <BookOpen className="w-4 h-4" />
    راهنمای کارت بازرگانی و مراحل اخذ آن
  </button>
  ```
- State جدید `consultOpen` و رندر `<CardConsultDialog open={consultOpen} onOpenChange={setConsultOpen} />` در انتهای کامپوننت.

### 3) `src/pages/TSDashboard.tsx`
- تبدیل ساختار فعلی (تک‌قطعه `LeadsPanel + CardsEntry`) به سیستم تب‌محور با `Tabs` از shadcn:
  - تب 1: **لیدها** (`LeadsPanel` فعلی).
  - تب 2: **مشاوره کارت بازرگانی** (`CardConsultPanel` جدید).
  - تب 3: **کارت‌های مشتریان** (`CardsEntry` فعلی).
- کامپوننت جدید `CardConsultPanel` کاملاً موازی با `LeadsPanel` (جدول، جستجو، صفحه‌بندی، حذف، CSV) با ستون‌های: شماره، تاریخ ثبت، IP، وضعیت (Select قابل تغییر inline: جدید/در حال تماس/انجام شد/رد شده)، یادداشت.

## فایل‌های ایجاد/تغییر
**ایجاد:**
- `public/api/migrations/2026_06_09_card_consult.sql`
- `public/api/card-consult-submit.php`
- `public/api/admin/card-consult-list.php`
- `public/api/admin/card-consult-delete.php`
- `public/api/admin/card-consult-export.php`
- `public/api/admin/card-consult-update.php`
- `src/components/business-card/CardConsultDialog.tsx`

**ویرایش:**
- `public/api/install.php` (اجرای migration جدید)
- `src/pages/BusinessCardService.tsx` (دکمه + دیالوگ)
- `src/pages/TSDashboard.tsx` (تب‌بندی + پنل جدید)

## خارج از محدوده
- صحنه 3D، فرم اصلی «درخواست رایگان» موجود در صفحه، و سایر بخش‌های صفحه دست‌نخورده باقی می‌مانند.

## نکته نیاز به تأیید کاربر
**شماره تماس تیم ترخیصان** که در دیالوگ نمایش داده می‌شود چه باشد؟ اگر مشخص نکنید، از همان شماره‌ای که در بخش «تماس با ما» سایت موجود است استفاده می‌کنم.
