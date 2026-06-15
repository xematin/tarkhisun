import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import type { BillingTimelineEntry } from "./billing-pdf";

const fa = (n: number) => (isFinite(n) ? n : 0).toLocaleString("fa-IR");
const esc = (s: unknown) =>
  String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string),
  );
const STATUS_LABEL: Record<string, string> = {
  confirmed: "تایید شده",
  pending: "در انتظار",
  rejected: "رد شده",
};

export interface BillingCardBundle {
  cardName: string;
  timeline: BillingTimelineEntry[];
  totals: { kotajToman: number; paid: number; pending: number; balance: number };
}

function renderTimelineRows(timeline: BillingTimelineEntry[]): string {
  return timeline.map((ev, idx) => {
    const num = fa(idx + 1);
    if (ev.kind === "kotaj") {
      const k = ev.data;
      const t = k.toman_total ?? k.items.reduce((s, it) => s + it.value_usd * it.unit_price_irt, 0);
      const itemsHtml = k.items.length
        ? `<table style="width:100%;border-collapse:collapse;font-size:10px;margin-top:6px">
             <thead><tr style="background:#eef2ff">
               <th style="padding:4px;border:1px solid #c7d2fe;text-align:right">نام کالا</th>
               <th style="padding:4px;border:1px solid #c7d2fe;text-align:right">ارزش ($)</th>
               <th style="padding:4px;border:1px solid #c7d2fe;text-align:right">قیمت هر دلار</th>
               <th style="padding:4px;border:1px solid #c7d2fe;text-align:right">جمع (تومان)</th>
             </tr></thead>
             <tbody>
               ${k.items.map(it => {
                 const tt = it.toman ?? it.value_usd * it.unit_price_irt;
                 return `<tr>
                   <td style="padding:4px;border:1px solid #e0e7ff">${esc(it.name)}</td>
                   <td style="padding:4px;border:1px solid #e0e7ff">${fa(it.value_usd)}</td>
                   <td style="padding:4px;border:1px solid #e0e7ff">${fa(it.unit_price_irt)}</td>
                   <td style="padding:4px;border:1px solid #e0e7ff;font-weight:600">${fa(tt)}</td>
                 </tr>`;
               }).join("")}
             </tbody>
           </table>`
        : "";
      return `
        <tr style="background:#eef2ff33">
          <td style="padding:6px;border:1px solid #c7d2fe;text-align:center;font-weight:600">${num}</td>
          <td style="padding:6px;border:1px solid #c7d2fe;direction:ltr;font-size:10px">${esc((k.created_at || "").slice(0, 16).replace("T", " "))}</td>
          <td style="padding:6px;border:1px solid #c7d2fe">
            <span style="display:inline-block;font-size:10px;font-weight:700;padding:2px 6px;border-radius:4px;background:#6366f1;color:#fff">کوتاژ</span>
          </td>
          <td style="padding:6px;border:1px solid #c7d2fe;font-size:11px">
            <div style="font-weight:700">شماره ${esc(k.kotaj_number)}</div>
            <div style="color:#475569;font-size:10px;margin-top:2px">
              ${esc(k.entry_title || "—")} • تاریخ کوتاژ: ${esc(k.kotaj_date_jalali)} • ارزش: ${fa(k.total_value_usd)} $
            </div>
            ${itemsHtml}
          </td>
          <td style="padding:6px;border:1px solid #c7d2fe;font-weight:700;color:#3730a3">${fa(t)}</td>
          <td style="padding:6px;border:1px solid #c7d2fe;font-size:10px;color:#475569">${fa(k.items.length)} قلم</td>
        </tr>`;
    }
    const p = ev.data;
    const st = (p.status || "pending").toLowerCase();
    return `
      <tr style="background:#ecfdf533">
        <td style="padding:6px;border:1px solid #bbf7d0;text-align:center;font-weight:600">${num}</td>
        <td style="padding:6px;border:1px solid #bbf7d0;direction:ltr;font-size:10px">${esc((p.created_at || "").slice(0, 16).replace("T", " "))}</td>
        <td style="padding:6px;border:1px solid #bbf7d0">
          <span style="display:inline-block;font-size:10px;font-weight:700;padding:2px 6px;border-radius:4px;background:#10b981;color:#fff">پرداخت</span>
        </td>
        <td style="padding:6px;border:1px solid #bbf7d0;font-size:11px;color:#475569">${esc(p.note || "—")}</td>
        <td style="padding:6px;border:1px solid #bbf7d0;font-weight:700;color:#047857">${fa(p.amount_irt)}</td>
        <td style="padding:6px;border:1px solid #bbf7d0;font-size:10px;font-weight:600">${esc(STATUS_LABEL[st] || st)}</td>
      </tr>`;
  }).join("");
}

function renderCardSection(bundle: BillingCardBundle): string {
  const { cardName, timeline, totals } = bundle;
  const balancePositive = totals.balance >= 0;
  return `
    <section style="margin-top:24px;page-break-inside:avoid">
      <div style="background:linear-gradient(90deg,#0f172a,#1e293b);color:#fff;padding:10px 14px;border-radius:8px 8px 0 0;display:flex;justify-content:space-between;align-items:center">
        <div style="font-size:15px;font-weight:800">کارت: ${esc(cardName)}</div>
        <div style="font-size:11px;opacity:.85">${timeline.length} رویداد</div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;font-size:11px;padding:10px;background:#f8fafc;border:1px solid #e2e8f0;border-top:none">
        <div style="background:#fff;padding:8px 10px;border-radius:6px;border:1px solid #e2e8f0">
          <div style="color:#64748b">هزینه کوتاژها</div>
          <div style="font-weight:800;font-size:13px;margin-top:2px">${fa(totals.kotajToman)}</div>
        </div>
        <div style="background:#ecfdf5;padding:8px 10px;border-radius:6px;border:1px solid #bbf7d0">
          <div style="color:#047857">مجموع پرداختی</div>
          <div style="font-weight:800;font-size:13px;margin-top:2px;color:#047857">${fa(totals.paid)}</div>
        </div>
        <div style="background:#fffbeb;padding:8px 10px;border-radius:6px;border:1px solid #fde68a">
          <div style="color:#b45309">در انتظار</div>
          <div style="font-weight:800;font-size:13px;margin-top:2px;color:#b45309">${fa(totals.pending)}</div>
        </div>
        <div style="background:${balancePositive ? "#eff6ff" : "#fef2f2"};padding:8px 10px;border-radius:6px;border:1px solid ${balancePositive ? "#bfdbfe" : "#fecaca"}">
          <div style="color:${balancePositive ? "#1d4ed8" : "#b91c1c"}">${balancePositive ? "بستانکار" : "بدهکار"}</div>
          <div style="font-weight:800;font-size:13px;margin-top:2px;color:${balancePositive ? "#1d4ed8" : "#b91c1c"}">${fa(Math.abs(totals.balance))}</div>
        </div>
      </div>

      <table style="width:100%;border-collapse:collapse;font-size:11px">
        <thead>
          <tr style="background:#0f172a;color:#ffffff">
            <th style="padding:7px;border:1px solid #0f172a;text-align:right;width:32px">#</th>
            <th style="padding:7px;border:1px solid #0f172a;text-align:right;width:100px">تاریخ ثبت</th>
            <th style="padding:7px;border:1px solid #0f172a;text-align:right;width:62px">نوع</th>
            <th style="padding:7px;border:1px solid #0f172a;text-align:right">شرح</th>
            <th style="padding:7px;border:1px solid #0f172a;text-align:right;width:100px">مبلغ (تومان)</th>
            <th style="padding:7px;border:1px solid #0f172a;text-align:right;width:70px">وضعیت</th>
          </tr>
        </thead>
        <tbody>
          ${renderTimelineRows(timeline) || `<tr><td colspan="6" style="padding:14px;text-align:center;color:#64748b;border:1px solid #e2e8f0">رویدادی ثبت نشده</td></tr>`}
        </tbody>
      </table>
    </section>
  `;
}

export async function downloadAllBillingPdf(userName: string, cards: BillingCardBundle[]) {
  const grand = cards.reduce(
    (a, c) => ({
      kotajToman: a.kotajToman + c.totals.kotajToman,
      paid: a.paid + c.totals.paid,
      pending: a.pending + c.totals.pending,
      balance: a.balance + c.totals.balance,
    }),
    { kotajToman: 0, paid: 0, pending: 0, balance: 0 },
  );
  const grandPositive = grand.balance >= 0;

  const container = document.createElement("div");
  container.style.cssText = `
    position: fixed; top: -10000px; left: -10000px;
    width: 900px; padding: 32px; background: #ffffff; color: #0f172a;
    font-family: "Vazirmatn","IRANSansX DemiBold","Noto Sans Arabic","Tahoma",sans-serif;
    direction: rtl; text-align: right;
  `;
  container.innerHTML = `
    <div style="border-bottom:3px solid #0f172a;padding-bottom:14px;margin-bottom:18px;display:flex;justify-content:space-between;align-items:center">
      <div>
        <div style="font-size:24px;font-weight:800">صورتحساب کلی کاربر</div>
        <div style="font-size:13px;color:#475569;margin-top:6px">کاربر: <b>${esc(userName)}</b> • تعداد کارت‌ها: <b>${fa(cards.length)}</b></div>
      </div>
      <div style="text-align:left;font-size:12px;color:#475569">
        <div>تاریخ صدور</div>
        <div style="font-size:15px;font-weight:700;color:#0f172a;margin-top:2px">${new Date().toLocaleDateString("fa-IR")}</div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:8px;font-size:12px">
      <div style="background:#f1f5f9;padding:12px;border-radius:8px;border:1px solid #e2e8f0">
        <div style="color:#64748b">مجموع هزینه کوتاژها</div>
        <div style="font-weight:800;font-size:16px;margin-top:4px">${fa(grand.kotajToman)}</div>
      </div>
      <div style="background:#ecfdf5;padding:12px;border-radius:8px;border:1px solid #bbf7d0">
        <div style="color:#047857">مجموع پرداختی‌ها</div>
        <div style="font-weight:800;font-size:16px;margin-top:4px;color:#047857">${fa(grand.paid)}</div>
      </div>
      <div style="background:#fffbeb;padding:12px;border-radius:8px;border:1px solid #fde68a">
        <div style="color:#b45309">مجموع در انتظار</div>
        <div style="font-weight:800;font-size:16px;margin-top:4px;color:#b45309">${fa(grand.pending)}</div>
      </div>
      <div style="background:${grandPositive ? "#eff6ff" : "#fef2f2"};padding:12px;border-radius:8px;border:1px solid ${grandPositive ? "#bfdbfe" : "#fecaca"}">
        <div style="color:${grandPositive ? "#1d4ed8" : "#b91c1c"}">مانده نهایی (${grandPositive ? "بستانکار" : "بدهکار"})</div>
        <div style="font-weight:800;font-size:16px;margin-top:4px;color:${grandPositive ? "#1d4ed8" : "#b91c1c"}">${fa(Math.abs(grand.balance))}</div>
      </div>
    </div>

    ${cards.map(renderCardSection).join("")}

    ${cards.length === 0 ? `<div style="padding:30px;text-align:center;color:#64748b;border:1px dashed #cbd5e1;border-radius:8px;margin-top:18px">کارتی برای نمایش وجود ندارد</div>` : ""}

    <div style="margin-top:26px;padding-top:12px;border-top:1px solid #e2e8f0;font-size:11px;color:#64748b;text-align:center">
      صادر شده از سامانه کارت ترخیصان — ${new Date().toLocaleDateString("fa-IR")} ${new Date().toLocaleTimeString("fa-IR")}
    </div>
  `;
  document.body.appendChild(container);

  try {
    const canvas = await html2canvas(container, { scale: 2, backgroundColor: "#ffffff" });
    const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();
    const margin = 10;
    const imgW = pageW - margin * 2;
    const imgH = (canvas.height * imgW) / canvas.width;

    if (imgH <= pageH - margin * 2) {
      pdf.addImage(canvas.toDataURL("image/jpeg", 0.95), "JPEG", margin, margin, imgW, imgH);
    } else {
      const pageImgH = pageH - margin * 2;
      const ratio = canvas.width / imgW;
      const pageCanvasH = pageImgH * ratio;
      let y = 0;
      while (y < canvas.height) {
        const slice = document.createElement("canvas");
        slice.width = canvas.width;
        slice.height = Math.min(pageCanvasH, canvas.height - y);
        const ctx = slice.getContext("2d")!;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, slice.width, slice.height);
        ctx.drawImage(canvas, 0, y, slice.width, slice.height, 0, 0, slice.width, slice.height);
        const sliceH = (slice.height * imgW) / slice.width;
        if (y > 0) pdf.addPage();
        pdf.addImage(slice.toDataURL("image/jpeg", 0.95), "JPEG", margin, margin, imgW, sliceH);
        y += pageCanvasH;
      }
    }
    pdf.save(`billing-all-${userName}-${new Date().toISOString().slice(0, 10)}.pdf`);
  } finally {
    document.body.removeChild(container);
  }
}
