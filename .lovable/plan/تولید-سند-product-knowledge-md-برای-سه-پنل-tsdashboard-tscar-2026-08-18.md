# تولید سند PRODUCT_KNOWLEDGE.md برای سه پنل TSDashboard / TSCards / TSCardUser

هدف: استخراج کامل قابلیت‌ها، منطق کسب‌وکار، جریان‌ها و قوانین سه پنل از روی کد موجود و تحویل آن در یک فایل Markdown. هیچ کد یا API یا UI تغییر نمی‌کند؛ فقط یک فایل جدید `PRODUCT_KNOWLEDGE.md` در ریشه پروژه ساخته می‌شود.

## دامنه بررسی

فایل‌های اصلی (اندازه واقعی، برای برآورد عمق کار):

- `src/pages/TSDashboard.tsx` (۷۳۹ خط)
- `src/pages/TSCards.tsx` (۴۰۶۲ خط)
- `src/pages/TSCardUser.tsx` (۱۸۶۰ خط)

وابستگی‌هایی که هم بررسی می‌شوند:

- کامپوننت‌های ادمین: `src/components/admin/` (BackupPanel، TreasuryPanel، CardBillingDialog، UserBillingDialog، CustomsCodesSettings، SectionCategoriesSettings)
- خروجی‌های PDF: `src/lib/billing-pdf.ts`, `billing-pdf-all.ts`, `kotaj-pdf.ts`
- آپلود: `src/lib/xhrUpload.ts`, `src/components/UploadProgressBar.tsx`
- کل لایه بک‌اند PHP: `public/api/db.php`, `public/api/admin/*` (۵۹ فایل)، `public/api/cards/*`، `public/api/section-categories-list.php`، `public/api/customs-codes-list.php`
- اسکیمای دیتابیس: `public/api/install.php` و `public/api/migrations/*`
- مسیرها و محافظت صفحات: `src/App.tsx`

## روش کار

1. خواندن کامل سه صفحه هدف و استخراج تب‌ها، دیالوگ‌ها، فرم‌ها، جدول‌ها، فیلترها، state و فراخوانی‌های API.
2. نگاشت هر فراخوانی فرانت به فایل PHP متناظر و استخراج ولیدیشن‌ها، قوانین، کدهای خطا و اثرات جانبی (لاگ تخصیص، دفتر صندوق، وضعیت پرداخت، تلورانس، اتمام کارت).
3. استخراج مدل داده از `install.php` + مایگریشن‌ها (جداول ts_cards، ts_card_entries، ts_card_users، ts_card_user_access، ts_kotaj، ts_kotaj_items، ts_card_payments، ts_card_admin_payments، ts_treasury_ledger، ts_leads، ts_card_consult، ts_backups، ts_section_categories، ts_customs_codes و…).
4. نوشتن سند نهایی. هرچه در کد قابل اثبات نباشد صراحتاً با برچسب `UNKNOWN` یا `UNVERIFIED` علامت می‌خورد. هیچ قابلیت حدسی اضافه نمی‌شود.

برای پوشش کامل بدون از دست رفتن جزئیات، تحلیل به‌صورت چند کارگر موازی انجام می‌شود (یکی روی TSCards، یکی روی TSCardUser + endpointهای cards، یکی روی TSDashboard + endpointهای ادمین/گزارش/بک‌آپ/صندوق، یکی روی اسکیمای دیتابیس) و سپس خروجی‌ها در یک سند واحد ادغام می‌شود.

## ساختار فایل خروجی

`PRODUCT_KNOWLEDGE.md` با این بخش‌ها:

1. Product Overview
2. Target Users & Roles
3. Product Goals / مشکلاتی که حل می‌کند
4. Architecture Snapshot (فرانت React + API‌های PHP/MySQL، مکانیزم session کوکی‌محور)
5. TSDashboard — تحلیل کامل
6. TSCards — تحلیل کامل (به تفکیک تب‌ها)
7. TSCardUser — تحلیل کامل
8. Feature Catalog (جدول: نام، هدف، Actor، مسیر، ورودی، رفتار سیستم، نتیجه، ولیدیشن، خطاها)
9. Domain Model و روابط موجودیت‌ها
10. User & Access Model (دو سیستم احراز هویت مجزا: ادمین و کاربر کارت)
11. User Journeys
12. Business Workflows (Actor، مراحل، تصمیم‌ها، ولیدیشن، نتیجه، خطا)
13. Business Rules (تلورانس، اتمام کارت، تأیید دستی پرداخت، تخصیص چند سکشنی، قیمت دلار سفارشی، اثر روی بانک ترخیصان)
14. Status & State System (وضعیت پرداخت‌ها، وضعیت مانده، finalized، سرنخ‌ها، درخواست مشاوره)
15. Forms (فیلد به فیلد، اجباری/اختیاری، پیش‌فرض، ولیدیشن، رفتار submit)
16. Tables & Data Views (ستون‌ها، جستجو، فیلتر، مرتب‌سازی، صفحه‌بندی، اکشن ردیف، حالت خالی/بارگذاری/خطا)
17. UI Behavior (دیالوگ‌ها، refresh، re-fetch، نرمال‌سازی ارقام فارسی، RTL از طریق `.panel-fa`)
18. Notifications & Error Handling
19. Product Requirements (قابل استفاده برای بازسازی از صفر)
20. Generic vs Tarkhisun-Specific vs Configurable
21. Important Edge Cases
22. Technical References (فقط مسیر فایل و نام تابع/endpoint، بدون کپی کد)
23. Unknown / Unverified Items

## تحویل

یک فایل جدید در ریشه: `PRODUCT_KNOWLEDGE.md`. هیچ فایل دیگری ایجاد، حذف یا ویرایش نمی‌شود و هیچ مایگریشن یا تغییر دیتابیسی انجام نمی‌گیرد.
