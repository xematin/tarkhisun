import { Fragment, useEffect, useMemo, useState } from "react";
import { Loader2, Receipt, ChevronDown, ChevronUp, Download, Printer, FileText, Banknote, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { downloadAllBillingPdf, type BillingCardBundle } from "@/lib/billing-pdf-all";
import type { BillingTimelineEntry } from "@/lib/billing-pdf";

const fmtToman = (v: number) => (isFinite(v) ? Math.round(v) : 0).toLocaleString("fa-IR");

const STATUS_LABEL: Record<string, string> = {
  confirmed: "تایید شده",
  pending: "در انتظار",
  rejected: "رد شده",
};
const STATUS_CLASS: Record<string, string> = {
  confirmed: "text-emerald-700",
  pending: "text-amber-700",
  rejected: "text-destructive",
};

interface KotajItemRaw { name: string; value_usd: number; unit_price_irt: number; toman?: number }
interface KotajRaw {
  id: number; entry_id?: number | null; entry_title: string | null;
  kotaj_number: string; kotaj_date_jalali: string;
  total_value_usd: number; toman_total: number; created_at: string;
  items: KotajItemRaw[];
}
interface UserRowRaw {
  id: number; first_name: string; last_name: string; username: string;
  total_usd: number; total_toman: number; payments_toman: number;
  kotajs: KotajRaw[];
}
interface UserPaymentRaw {
  id: number; card_user_id: number; amount_irt: number;
  receipt_path?: string | null; note?: string | null; status?: string | null;
  created_at: string; first_name?: string; last_name?: string; username?: string;
}
interface AdminPaymentRaw {
  id: number; card_id: number; amount_irt: number; status?: string | null;
  note?: string | null; receipt_path?: string | null;
  pay_date_jalali?: string | null; pay_date_gregorian?: string | null;
  created_at?: string | null; from_treasury?: number;
}

type TimelineExtra = BillingTimelineEntry & { source?: "user" | "admin"; userLabel?: string };

async function api<T>(path: string): Promise<T> {
  const r = await fetch(path, { credentials: "same-origin" });
  const text = await r.text();
  let json: unknown;
  try { json = JSON.parse(text); } catch { throw new Error(text || `HTTP ${r.status}`); }
  if (!r.ok) throw new Error((json as { error?: string })?.error || `HTTP ${r.status}`);
  return json as T;
}

interface Props {
  open: boolean;
  onClose: () => void;
  cardId: number;
  cardName: string;
}

const CardBillingDialog = ({ open, onClose, cardId, cardName }: Props) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [timeline, setTimeline] = useState<TimelineExtra[]>([]);
  const [totals, setTotals] = useState({ kotajToman: 0, userPaid: 0, userPending: 0, adminPaid: 0, adminPending: 0 });
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!open || !cardId) return;
    let cancelled = false;
    setLoading(true);
    setExpanded(new Set());
    (async () => {
      try {
        const [report, userPays, adminPays] = await Promise.all([
          api<{ users: UserRowRaw[] }>(`/api/admin/card-kotaj-report.php?card_id=${cardId}`),
          api<{ items: UserPaymentRaw[] }>(`/api/admin/card-payments-list.php?card_id=${cardId}`),
          api<{ items: AdminPaymentRaw[] }>(`/api/admin/card-admin-payments-list.php`),
        ]);

        const tl: TimelineExtra[] = [];
        let kotajToman = 0, userPaid = 0, userPending = 0, adminPaid = 0, adminPending = 0;

        for (const u of report.users || []) {
          const label = `${u.first_name || ""} ${u.last_name || ""}`.trim() || u.username;
          for (const k of u.kotajs || []) {
            tl.push({
              kind: "kotaj",
              date: k.created_at,
              data: { ...k, entry_title: k.entry_title ? `${k.entry_title} — ${label}` : label },
              source: "user",
              userLabel: label,
            });
            kotajToman += k.toman_total || 0;
          }
        }

        for (const p of userPays.items || []) {
          const label = `${p.first_name || ""} ${p.last_name || ""}`.trim() || p.username || `کاربر #${p.card_user_id}`;
          const st = (p.status || "pending").toLowerCase();
          tl.push({
            kind: "payment",
            date: p.created_at,
            data: { ...p, note: `پرداخت کاربر (${label})${p.note ? ` — ${p.note}` : ""}` },
            source: "user",
            userLabel: label,
          });
          if (st === "confirmed") userPaid += p.amount_irt;
          else if (st === "pending") userPending += p.amount_irt;
        }

        for (const p of (adminPays.items || []).filter(x => x.card_id === cardId)) {
          const date = p.created_at || p.pay_date_gregorian || "";
          const st = (p.status || "confirmed").toLowerCase();
          tl.push({
            kind: "payment",
            date,
            data: {
              id: p.id,
              amount_irt: p.amount_irt,
              status: p.status || "confirmed",
              created_at: date,
              receipt_path: p.receipt_path || null,
              note: `پرداخت به صاحب کارت${p.from_treasury ? " (از خزانه)" : ""}${p.note ? ` — ${p.note}` : ""}`,
            },
            source: "admin",
          });
          if (st === "confirmed") adminPaid += p.amount_irt;
          else if (st === "pending") adminPending += p.amount_irt;
        }

        tl.sort((a, b) => (a.date || "").localeCompare(b.date || ""));
        if (!cancelled) {
          setTimeline(tl);
          setTotals({ kotajToman, userPaid, userPending, adminPaid, adminPending });
        }
      } catch (e) {
        if (!cancelled) toast({ title: "خطا", description: (e as Error).message, variant: "destructive" });
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [open, cardId, toast]);

  const balance = useMemo(() => totals.userPaid - totals.kotajToman, [totals]);

  const toggle = (k: string) => setExpanded(prev => {
    const n = new Set(prev); n.has(k) ? n.delete(k) : n.add(k); return n;
  });

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent dir="rtl" className="max-w-5xl panel-fa max-h-[92vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-persian text-right flex items-center gap-2">
            <Receipt className="w-5 h-5" /> صورتحساب کارت — {cardName}
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="py-12 text-center"><Loader2 className="w-6 h-6 animate-spin inline text-primary" /></div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-persian">
              <div className="border rounded-md p-2 bg-indigo-500/10">
                <div className="text-[11px] text-muted-foreground flex items-center gap-1"><Wallet className="w-3 h-3" /> هزینه کوتاژها</div>
                <div className="text-sm font-bold tabular-nums text-indigo-700">{fmtToman(totals.kotajToman)}</div>
              </div>
              <div className="border rounded-md p-2 bg-emerald-500/10">
                <div className="text-[11px] text-muted-foreground">پرداختی کاربران (تایید)</div>
                <div className="text-sm font-bold tabular-nums text-emerald-700">{fmtToman(totals.userPaid)}</div>
              </div>
              <div className="border rounded-md p-2 bg-amber-500/10">
                <div className="text-[11px] text-muted-foreground">در انتظار تایید</div>
                <div className="text-sm font-bold tabular-nums text-amber-700">{fmtToman(totals.userPending)}</div>
              </div>
              <div className="border rounded-md p-2 bg-sky-500/10">
                <div className="text-[11px] text-muted-foreground flex items-center gap-1"><Banknote className="w-3 h-3" /> پرداخت به صاحب کارت</div>
                <div className="text-sm font-bold tabular-nums text-sky-700">{fmtToman(totals.adminPaid)}</div>
              </div>
              <div className={`border rounded-md p-2 ${balance >= 0 ? "bg-emerald-500/10" : "bg-destructive/10"}`}>
                <div className="text-[11px] text-muted-foreground">{balance >= 0 ? "بستانکار کاربران" : "بدهکار کاربران"}</div>
                <div className={`text-sm font-bold tabular-nums ${balance >= 0 ? "text-emerald-700" : "text-destructive"}`}>
                  {fmtToman(Math.abs(balance))}
                </div>
              </div>
            </div>

            {timeline.length === 0 ? (
              <p className="text-center py-10 text-muted-foreground text-persian text-sm">رویدادی برای این کارت ثبت نشده.</p>
            ) : (
              <div className="border rounded-lg overflow-x-auto bg-card">
                <table className="w-full text-xs text-persian">
                  <thead className="bg-muted/40">
                    <tr>
                      <th className="text-right p-2 w-10">#</th>
                      <th className="text-right p-2 w-28">تاریخ</th>
                      <th className="text-right p-2 w-20">نوع</th>
                      <th className="text-right p-2">شرح</th>
                      <th className="text-right p-2 w-32">مبلغ (تومان)</th>
                      <th className="text-right p-2 w-20">وضعیت</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timeline.map((ev, idx) => {
                      const dateStr = (ev.date || "").slice(0, 16).replace("T", " ");
                      if (ev.kind === "kotaj") {
                        const k = ev.data as KotajRaw;
                        const key = `k-${k.id}`;
                        const open = expanded.has(key);
                        return (
                          <Fragment key={key}>
                            <tr className="border-t bg-indigo-500/5 hover:bg-indigo-500/10 cursor-pointer" onClick={() => toggle(key)}>
                              <td className="p-2 text-center font-bold tabular-nums">{(idx + 1).toLocaleString("fa-IR")}</td>
                              <td className="p-2 text-[11px] tabular-nums">{dateStr}</td>
                              <td className="p-2">
                                <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-700"><FileText className="w-3 h-3 inline ml-1" />کوتاژ</span>
                              </td>
                              <td className="p-2 text-[11px]">
                                <div className="font-bold">شماره {k.kotaj_number} • {ev.userLabel}</div>
                                <div className="text-muted-foreground">
                                  {k.entry_title || "—"} • {k.kotaj_date_jalali} • {k.total_value_usd.toLocaleString()} $
                                </div>
                              </td>
                              <td className="p-2 tabular-nums font-bold text-indigo-700">{fmtToman(k.toman_total)}</td>
                              <td className="p-2 text-[11px]">
                                {open ? <ChevronUp className="w-3.5 h-3.5 inline" /> : <ChevronDown className="w-3.5 h-3.5 inline" />}
                                <span className="mr-1">{k.items.length} قلم</span>
                              </td>
                            </tr>
                            {open && (
                              <tr className="border-t bg-muted/20">
                                <td colSpan={6} className="p-2">
                                  <table className="w-full text-[11px]">
                                    <thead className="bg-background">
                                      <tr>
                                        <th className="text-right p-1.5 border">نام کالا</th>
                                        <th className="text-right p-1.5 border">ارزش ($)</th>
                                        <th className="text-right p-1.5 border">قیمت هر دلار</th>
                                        <th className="text-right p-1.5 border">جمع (تومان)</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {k.items.map((it, i) => (
                                        <tr key={i}>
                                          <td className="p-1.5 border">{it.name}</td>
                                          <td className="p-1.5 border tabular-nums">{it.value_usd.toLocaleString()}</td>
                                          <td className="p-1.5 border tabular-nums">{fmtToman(it.unit_price_irt)}</td>
                                          <td className="p-1.5 border tabular-nums font-bold">{fmtToman(it.toman ?? it.value_usd * it.unit_price_irt)}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            )}
                          </Fragment>
                        );
                      }
                      const p = ev.data;
                      const st = (p.status || "pending").toLowerCase();
                      const isAdmin = ev.source === "admin";
                      const bg = isAdmin ? "bg-sky-500/5" : "bg-emerald-500/5";
                      const badgeBg = isAdmin ? "bg-sky-500/15 text-sky-700" : "bg-emerald-500/15 text-emerald-700";
                      const amtClr = isAdmin ? "text-sky-700" : "text-emerald-700";
                      return (
                        <tr key={`p-${ev.source}-${p.id}`} className={`border-t ${bg}`}>
                          <td className="p-2 text-center font-bold tabular-nums">{(idx + 1).toLocaleString("fa-IR")}</td>
                          <td className="p-2 text-[11px] tabular-nums">{dateStr}</td>
                          <td className="p-2">
                            <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded ${badgeBg}`}>
                              {isAdmin ? <Banknote className="w-3 h-3 inline ml-1" /> : null}
                              {isAdmin ? "پرداخت کارت" : "پرداخت کاربر"}
                            </span>
                          </td>
                          <td className="p-2 text-[11px] text-muted-foreground">
                            {p.note || "—"}
                            {p.receipt_path ? (<> {" • "}<a href={p.receipt_path} target="_blank" rel="noreferrer" className="text-primary underline">فیش</a></>) : null}
                          </td>
                          <td className={`p-2 tabular-nums font-bold ${amtClr}`}>{fmtToman(p.amount_irt)}</td>
                          <td className={`p-2 text-[11px] font-bold ${STATUS_CLASS[st] || ""}`}>{STATUS_LABEL[st] || st}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        <DialogFooter className="gap-2 flex-wrap">
          <Button
            onClick={() => {
              const bundle: BillingCardBundle = {
                cardName,
                timeline: timeline as BillingTimelineEntry[],
                totals: {
                  kotajToman: totals.kotajToman,
                  paid: totals.userPaid + totals.adminPaid,
                  pending: totals.userPending + totals.adminPending,
                  balance,
                },
              };
              void downloadAllBillingPdf(cardName, [bundle]);
            }}
            disabled={loading || timeline.length === 0}
            className="text-persian bg-gradient-to-l from-primary to-accent text-primary-foreground hover:opacity-90 shadow-md"
          >
            <Download className="w-4 h-4 ml-1" /> دانلود PDF صورتحساب کارت
          </Button>
          <Button variant="outline" onClick={() => window.print()} className="text-persian">
            <Printer className="w-4 h-4 ml-1" /> چاپ
          </Button>
          <Button variant="ghost" onClick={onClose} className="text-persian">بستن</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CardBillingDialog;
