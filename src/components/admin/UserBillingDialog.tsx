import { Fragment, useEffect, useState } from "react";
import { Loader2, Receipt, CreditCard, ChevronDown, ChevronUp, Download, Printer } from "lucide-react";
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
  id: number; card_id: number; card_name: string; entry_id?: number | null;
  entry_title?: string | null; kotaj_number: string; kotaj_date_jalali: string;
  total_value_usd: number; toman_total: number; created_at: string; items: KotajItemRaw[];
}
interface PaymentRaw {
  id: number; card_id: number; card_name: string; amount_irt: number;
  receipt_path?: string | null; note?: string | null; status?: string | null; created_at: string;
}

interface CardBucket {
  cardId: number;
  cardName: string;
  timeline: BillingTimelineEntry[];
  totals: { kotajToman: number; paid: number; pending: number; balance: number };
}

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
  userId: number;
  userName: string;
}

const UserBillingDialog = ({ open, onClose, userId, userName }: Props) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [buckets, setBuckets] = useState<CardBucket[]>([]);
  const [openCards, setOpenCards] = useState<Set<number>>(new Set());
  const [expandedKotaj, setExpandedKotaj] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!open || !userId) return;
    let cancelled = false;
    setLoading(true);
    setOpenCards(new Set());
    setExpandedKotaj(new Set());
    (async () => {
      try {
        const [k, p] = await Promise.all([
          api<{ items: KotajRaw[] }>(`/api/admin/card-user-kotaj-report.php?user_id=${userId}`),
          api<{ items: PaymentRaw[] }>(`/api/admin/card-user-payments.php?user_id=${userId}`),
        ]);
        const kotajs = k.items || [];
        const payments = p.items || [];
        const map = new Map<number, CardBucket>();
        const ensure = (id: number, name: string) => {
          let b = map.get(id);
          if (!b) {
            b = {
              cardId: id, cardName: name, timeline: [],
              totals: { kotajToman: 0, paid: 0, pending: 0, balance: 0 },
            };
            map.set(id, b);
          }
          return b;
        };
        for (const kt of kotajs) {
          const b = ensure(kt.card_id, kt.card_name);
          b.timeline.push({ kind: "kotaj", date: kt.created_at, data: kt });
          b.totals.kotajToman += kt.toman_total || 0;
        }
        for (const pp of payments) {
          const b = ensure(pp.card_id, pp.card_name);
          b.timeline.push({ kind: "payment", date: pp.created_at, data: pp });
          const st = (pp.status || "pending").toLowerCase();
          if (st === "confirmed") b.totals.paid += pp.amount_irt;
          else if (st === "pending") b.totals.pending += pp.amount_irt;
        }
        const list = Array.from(map.values()).map(b => {
          b.timeline.sort((a, c) => (a.date || "").localeCompare(c.date || ""));
          b.totals.balance = b.totals.paid - b.totals.kotajToman;
          return b;
        }).sort((a, b) => b.cardId - a.cardId);
        if (!cancelled) setBuckets(list);
      } catch (e) {
        if (!cancelled) toast({ title: "خطا", description: (e as Error).message, variant: "destructive" });
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [open, userId, toast]);

  const toggleCard = (id: number) => setOpenCards(prev => {
    const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n;
  });
  const toggleKotaj = (key: string) => setExpandedKotaj(prev => {
    const n = new Set(prev); n.has(key) ? n.delete(key) : n.add(key); return n;
  });

  const grand = buckets.reduce(
    (a, c) => ({
      kotajToman: a.kotajToman + c.totals.kotajToman,
      paid: a.paid + c.totals.paid,
      pending: a.pending + c.totals.pending,
      balance: a.balance + c.totals.balance,
    }),
    { kotajToman: 0, paid: 0, pending: 0, balance: 0 },
  );

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent dir="rtl" className="max-w-4xl panel-fa max-h-[92vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-persian text-right flex items-center gap-2">
            <Receipt className="w-5 h-5" /> صورتحساب کلی — {userName}
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="py-12 text-center"><Loader2 className="w-6 h-6 animate-spin inline text-primary" /></div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-persian">
              <div className="border rounded-md p-2 bg-muted/30">
                <div className="text-[11px] text-muted-foreground">مجموع هزینه کوتاژها</div>
                <div className="text-sm font-bold tabular-nums">{fmtToman(grand.kotajToman)}</div>
              </div>
              <div className="border rounded-md p-2 bg-emerald-500/10">
                <div className="text-[11px] text-muted-foreground">مجموع پرداختی</div>
                <div className="text-sm font-bold tabular-nums text-emerald-700">{fmtToman(grand.paid)}</div>
              </div>
              <div className="border rounded-md p-2 bg-amber-500/10">
                <div className="text-[11px] text-muted-foreground">در انتظار تایید</div>
                <div className="text-sm font-bold tabular-nums text-amber-700">{fmtToman(grand.pending)}</div>
              </div>
              <div className={`border rounded-md p-2 ${grand.balance >= 0 ? "bg-sky-500/10" : "bg-destructive/10"}`}>
                <div className="text-[11px] text-muted-foreground">{grand.balance >= 0 ? "بستانکار کلی" : "بدهکار کلی"}</div>
                <div className={`text-sm font-bold tabular-nums ${grand.balance >= 0 ? "text-sky-700" : "text-destructive"}`}>
                  {fmtToman(Math.abs(grand.balance))}
                </div>
              </div>
            </div>

            {buckets.length === 0 ? (
              <p className="text-center py-10 text-muted-foreground text-persian text-sm">رویدادی برای این کاربر ثبت نشده.</p>
            ) : (
              <div className="space-y-2">
                {buckets.map(({ cardId, cardName, timeline, totals }) => {
                  const isOpen = openCards.has(cardId);
                  return (
                    <div key={cardId} className="border rounded-lg overflow-hidden bg-card">
                      <button
                        type="button"
                        onClick={() => toggleCard(cardId)}
                        className="w-full flex items-center gap-2 p-3 hover:bg-muted/40 transition-colors text-right"
                      >
                        {isOpen ? <ChevronUp className="w-4 h-4 shrink-0" /> : <ChevronDown className="w-4 h-4 shrink-0" />}
                        <CreditCard className="w-4 h-4 text-primary shrink-0" />
                        <div className="flex-1 font-bold text-persian text-sm">{cardName}</div>
                        <div className="hidden sm:flex items-center gap-2 text-[11px] text-persian">
                          <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-700 tabular-nums">
                            کوتاژ: {fmtToman(totals.kotajToman)}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 tabular-nums">
                            پرداختی: {fmtToman(totals.paid)}
                          </span>
                          <span className={`px-2 py-0.5 rounded tabular-nums ${totals.balance >= 0 ? "bg-sky-500/10 text-sky-700" : "bg-destructive/10 text-destructive"}`}>
                            {totals.balance >= 0 ? "بستانکار" : "بدهکار"}: {fmtToman(Math.abs(totals.balance))}
                          </span>
                        </div>
                      </button>

                      <div className="sm:hidden grid grid-cols-3 gap-1 px-3 pb-2 text-[10px] text-persian">
                        <span className="px-2 py-1 rounded bg-indigo-500/10 text-indigo-700 tabular-nums text-center">
                          کوتاژ {fmtToman(totals.kotajToman)}
                        </span>
                        <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-700 tabular-nums text-center">
                          پرداخت {fmtToman(totals.paid)}
                        </span>
                        <span className={`px-2 py-1 rounded tabular-nums text-center ${totals.balance >= 0 ? "bg-sky-500/10 text-sky-700" : "bg-destructive/10 text-destructive"}`}>
                          {totals.balance >= 0 ? "+" : "-"}{fmtToman(Math.abs(totals.balance))}
                        </span>
                      </div>

                      {isOpen && (
                        <div className="border-t bg-muted/10 p-3 overflow-x-auto">
                          {timeline.length === 0 ? (
                            <p className="text-center py-6 text-muted-foreground text-persian text-xs">رویدادی ثبت نشده است.</p>
                          ) : (
                            <table className="w-full text-xs text-persian">
                              <thead className="bg-muted/40">
                                <tr>
                                  <th className="text-right p-2 w-28">تاریخ</th>
                                  <th className="text-right p-2 w-16">نوع</th>
                                  <th className="text-right p-2">شرح</th>
                                  <th className="text-right p-2 w-28">مبلغ (تومان)</th>
                                  <th className="text-right p-2 w-20">وضعیت</th>
                                </tr>
                              </thead>
                              <tbody>
                                {timeline.map((ev) => {
                                  if (ev.kind === "kotaj") {
                                    const k = ev.data as KotajRaw;
                                    const key = `${cardId}-k-${k.id}`;
                                    const kOpen = expandedKotaj.has(key);
                                    return (
                                      <Fragment key={key}>
                                        <tr
                                          className="border-t bg-indigo-500/5 hover:bg-indigo-500/10 cursor-pointer"
                                          onClick={() => toggleKotaj(key)}
                                        >
                                          <td className="p-2 text-[11px] tabular-nums">{k.created_at?.slice(0, 16).replace("T", " ")}</td>
                                          <td className="p-2">
                                            <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-700">کوتاژ</span>
                                          </td>
                                          <td className="p-2 text-[11px]">
                                            <div className="font-bold">شماره {k.kotaj_number}</div>
                                            <div className="text-muted-foreground">
                                              {k.entry_title || "—"} • {k.kotaj_date_jalali} • {k.total_value_usd.toLocaleString()} $
                                            </div>
                                          </td>
                                          <td className="p-2 tabular-nums font-bold">{fmtToman(k.toman_total)}</td>
                                          <td className="p-2 text-[11px]">
                                            {kOpen ? <ChevronUp className="w-3.5 h-3.5 inline" /> : <ChevronDown className="w-3.5 h-3.5 inline" />}
                                            <span className="mr-1">{k.items.length} قلم</span>
                                          </td>
                                        </tr>
                                        {kOpen && (
                                          <tr className="border-t bg-muted/20">
                                            <td colSpan={5} className="p-2">
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
                                  const pp = ev.data as PaymentRaw;
                                  const st = (pp.status || "pending").toLowerCase();
                                  return (
                                    <tr key={`${cardId}-p-${pp.id}`} className="border-t bg-emerald-500/5">
                                      <td className="p-2 text-[11px] tabular-nums">{pp.created_at?.slice(0, 16).replace("T", " ")}</td>
                                      <td className="p-2">
                                        <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-700">پرداخت</span>
                                      </td>
                                      <td className="p-2 text-[11px] text-muted-foreground">
                                        {pp.note || "—"}
                                        {pp.receipt_path ? (
                                          <> {" • "}<a href={pp.receipt_path} target="_blank" rel="noreferrer" className="text-primary underline">فیش</a></>
                                        ) : null}
                                      </td>
                                      <td className="p-2 tabular-nums font-bold text-emerald-700">{fmtToman(pp.amount_irt)}</td>
                                      <td className={`p-2 text-[11px] font-bold ${STATUS_CLASS[st] || ""}`}>{STATUS_LABEL[st] || st}</td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        <DialogFooter className="gap-2 flex-wrap">
          <Button
            onClick={() => {
              const bundles: BillingCardBundle[] = buckets.map(b => ({
                cardName: b.cardName,
                timeline: b.timeline,
                totals: b.totals,
              }));
              void downloadAllBillingPdf(userName, bundles);
            }}
            disabled={loading || buckets.length === 0}
            className="text-persian bg-gradient-to-l from-primary to-accent text-primary-foreground hover:opacity-90 shadow-md"
          >
            <Download className="w-4 h-4 ml-1" /> دانلود PDF صورتحساب کامل
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

export default UserBillingDialog;
