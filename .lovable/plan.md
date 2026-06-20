## هدف
انتقال لیست کدهای گمرکی (الان در `src/data/customsCodes.ts` به‌صورت ثابت) به دیتابیس و افزودن تب «تنظیمات» در `/TSDashboard` برای مدیریت (افزودن/ویرایش/حذف) کدها توسط ادمین.

## بخش‌های کار

### ۱) دیتابیس (MySQL — همان دیتابیس فعلی PHP)
چون بک‌اند پروژه روی PHP/MySQL هاست شخصی است (نه Supabase)، جدول جدید را در همان دیتابیس می‌سازیم:

جدول `ts_customs_codes`:
- `code` VARCHAR(10) PRIMARY KEY (کد ۵ رقمی گمرک)
- `name` VARCHAR(255) NOT NULL (نام گمرک)
- `created_at`, `updated_at`

یک فایل migration در `public/api/migrations/2026_06_20_customs_codes.sql` ساخته می‌شود که جدول را ایجاد و ۱۱۸ ردیف موجود در `customsCodes.ts` را seed می‌کند.

### ۲) API های PHP
چهار endpoint جدید زیر `public/api/`:

- `public/api/customs-codes-list.php` — عمومی (GET) — برای استفاده در فرم افزودن کوتاژ کاربر و ادمین. خروجی JSON: `{ items: [{code, name}, ...] }`
- `public/api/admin/customs-code-create.php` — ادمین (POST) — افزودن کد جدید
- `public/api/admin/customs-code-update.php` — ادمین (POST) — ویرایش نام
- `public/api/admin/customs-code-delete.php` — ادمین (POST) — حذف کد

### ۳) فرانت‌اند

**الف) جایگزینی منبع کدهای گمرکی:**
- فایل `src/data/customsCodes.ts` به یک fallback تبدیل می‌شود و یک hook جدید `useCustomsCodes()` در `src/hooks/useCustomsCodes.ts` ساخته می‌شود که از API لیست را می‌گیرد و کش می‌کند (با fallback به لیست استاتیک در صورت خطا، تا چیزی خراب نشود).
- در جاهایی که `lookupCustoms()` استفاده می‌شود (فرم افزودن کوتاژ در `TSCardUser.tsx` و احتمالاً `TSCards.tsx`)، از hook جدید استفاده می‌شود.

**ب) تب تنظیمات در `/TSDashboard`:**
- یک تب جدید «تنظیمات» به `src/pages/TSDashboard.tsx` اضافه می‌شود.
- محتوای تب: کامپوننت جدید `src/components/admin/CustomsCodesSettings.tsx` شامل:
  - جدول کدهای موجود (کد، نام، عملیات ویرایش/حذف)
  - فرم افزودن کد جدید (کد ۵ رقمی + نام)
  - جستجو در لیست
  - تأیید قبل از حذف

## جزئیات فنی
- اعتبارسنجی کد: دقیقاً ۵ رقم، یکتا.
- نرمال‌سازی ارقام فارسی به انگلیسی در ورودی.
- اعمال جهت RTL از طریق کلاس `panel-fa` طبق قرارداد پروژه (نه `dir="rtl"` در wrapper).
- بدون تغییر در منطق محاسبه کوتاژ یا صورتحساب.

## فایل‌های اصلی متاثر
- جدید: `public/api/migrations/2026_06_20_customs_codes.sql`
- جدید: `public/api/customs-codes-list.php`
- جدید: `public/api/admin/customs-code-{create,update,delete}.php`
- جدید: `src/hooks/useCustomsCodes.ts`
- جدید: `src/components/admin/CustomsCodesSettings.tsx`
- ویرایش: `src/data/customsCodes.ts` (به fallback)
- ویرایش: `src/pages/TSDashboard.tsx` (افزودن تب)
- ویرایش: `src/pages/TSCardUser.tsx` و در صورت نیاز `src/pages/TSCards.tsx` (استفاده از hook)
