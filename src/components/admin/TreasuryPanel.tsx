import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  ArrowDownToLine, ArrowUpFromLine, Vault, Coins, TrendingUp,
  RefreshCw, Download, Loader2, BarChart3,
} from "lucide-react";
import {
  ComposedChart, Bar, Area, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, Legend, PieChart, Pie, Cell,
} from "recharts";
import type { useToast } from "@/hooks/use-toast";

interface CardCash {
  id: number;
  name: string;
  cash_in: number;
  cash_out: number;
  from_treasury_out: number;
  profit: number;
}

interface TreasurySummary {
  balance: number;
  total_in: number;
  total_out: number;
  total_profit: number;
  tx_count: number;
  cards: CardCash[];
  trend: { date: string; in: number; out: number; balance: number }[];
  debug?: Record<string, unknown>;
}

interface LedgerItem {
  id: number;
  direction: "in" | "out";
  amount_irt: number;
  card_id: number | null;
  card_name: string | null;
  source_type: string;
  source_id: number | null;
  admin_username: string | null;
  note: string | null;
  occurred_at: string;
}

interface LedgerResponse {
  items: LedgerItem[];
  debug?: Record<string, unknown>;
}

const fmt = (n: number) => `${(isFinite(n) ? n : 0).toLocaleString("fa-IR")} تومان`;

const toJalaliDateTime = (iso: string): string => {
  if (!iso) return "";
  const d = new Date(iso.replace(" ", "T"));
  if (isNaN(d.getTime())) return "";
  try {
    return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit",
    }).format(d);
  } catch { return ""; }
};

async function api<T>(path: string): Promise<T> {
  const res = await fetch(path, { credentials: "same-origin" });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { error?: string; detail?: string }).error || (data as { detail?: string }).detail || `HTTP ${res.status}`);
  return data as T;
}

const SOURCE_LABEL: Record<string, string> = {
  user_payment: "پرداخت کاربر",
  admin_payment: "پرداخت به کارت",
  manual_adjust: "تعدیل دستی",
};

/** Animated treasury vault graphic */
const VaultGraphic = ({ balance }: { balance: number }) => {
  const positive = balance > 0;
  return (
    <div className="relative w-full max-w-md mx-auto select-none">
      <div
        className="relative rounded-3xl p-8 overflow-hidden border-2 shadow-2xl"
        style={{
          background:
            "linear-gradient(135deg, hsl(var(--primary) / 0.95) 0%, hsl(var(--primary) / 0.7) 50%, hsl(var(--accent) / 0.9) 100%)",
          borderColor: "hsl(var(--accent) / 0.5)",
          boxShadow:
            "0 20px 60px -10px hsl(var(--primary) / 0.5), inset 0 2px 0 hsl(var(--accent) / 0.4)",
        }}
      >
        {/* Decorative shine */}
        <div
          className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-30 blur-2xl"
          style={{ background: "hsl(var(--accent))" }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full opacity-20 blur-2xl"
          style={{ background: "hsl(var(--accent-light, var(--accent)))" }}
        />

        <div className="relative flex flex-col items-center gap-4 text-center">
          {/* Vault icon with rotating dial */}
          <div className="relative">
            <div
              className="w-28 h-28 rounded-full flex items-center justify-center border-4"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, hsl(var(--accent)) 0%, hsl(var(--primary)) 80%)",
                borderColor: "hsl(var(--accent) / 0.7)",
                boxShadow:
                  "inset 0 4px 12px rgba(0,0,0,0.3), 0 4px 20px hsl(var(--accent) / 0.4)",
              }}
            >
              <Vault className="w-14 h-14 text-primary-foreground drop-shadow-lg" strokeWidth={1.5} />
            </div>
            {/* Glowing coins around */}
            <div
              className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center animate-pulse"
              style={{
                background: "hsl(var(--accent))",
                boxShadow: "0 0 12px hsl(var(--accent) / 0.8)",
              }}
            >
              <Coins className="w-4 h-4 text-primary-foreground" />
            </div>
          </div>

          <div className="text-persian text-xs font-medium uppercase tracking-wider text-primary-foreground/80">
            موجودی صندوق ترخیصان
          </div>
          <div
            className="text-3xl md:text-4xl font-extrabold tabular-nums tracking-tight drop-shadow-lg"
            style={{ color: positive ? "hsl(var(--accent))" : "hsl(0 80% 75%)" }}
          >
            {balance.toLocaleString("fa-IR")}
          </div>
          <div className="text-persian text-sm text-primary-foreground/90 -mt-2">تومان</div>
        </div>
      </div>
    </div>
  );
};

interface Props {
  toast: ReturnType<typeof useToast>["toast"];
  refreshKey?: number;
}

const TreasuryPanel = ({ toast, refreshKey = 0 }: Props) => {
  const [sum, setSum] = useState<TreasurySummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [ledger, setLedger] = useState<LedgerItem[]>([]);
  const [ledgerLoading, setLedgerLoading] = useState(false);
  const [fCard, setFCard] = useState<string>("all");
  const [fDir, setFDir] = useState<"all" | "in" | "out">("all");
  const [fFrom, setFFrom] = useState("");
  const [fTo, setFTo] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(15);

  const pushPanelError = useCallback((source: string, message: string) => {
    setErrors((prev) => [`${source}: ${message}`, ...prev.filter((x) => !x.startsWith(`${source}:`))].slice(0, 4));
  }, []);
  const clearPanelError = useCallback((source: string) => {
    setErrors((prev) => prev.filter((x) => !x.startsWith(`${source}:`)));
  }, []);

  const loadSummary = useCallback(async () => {
    setLoading(true);
    try {
      const s = await api<TreasurySummary>("/api/admin/treasury-summary.php");
      setSum(s);
      clearPanelError("treasury-summary");
    } catch (e) {
      pushPanelError("treasury-summary", (e as Error).message);
      toast({ title: "خطا", description: (e as Error).message, variant: "destructive" });
    } finally { setLoading(false); }
  }, [clearPanelError, pushPanelError, toast]);

  const loadLedger = useCallback(async () => {
    setLedgerLoading(true);
    try {
      const qs = new URLSearchParams();
      if (fCard !== "all") qs.set("card_id", fCard);
      if (fDir !== "all") qs.set("direction", fDir);
      if (fFrom) qs.set("from", fFrom);
      if (fTo) qs.set("to", fTo);
      qs.set("limit", "200");
      const r = await api<LedgerResponse>(`/api/admin/treasury-ledger.php?${qs.toString()}`);
      setLedger(r.items || []);
      setVisibleCount(15);
      clearPanelError("treasury-ledger");
    } catch (e) {
      pushPanelError("treasury-ledger", (e as Error).message);
      toast({ title: "خطا", description: (e as Error).message, variant: "destructive" });
    } finally { setLedgerLoading(false); }
  }, [clearPanelError, fCard, fDir, fFrom, fTo, pushPanelError, toast]);

  useEffect(() => { void loadSummary(); }, [loadSummary, refreshKey]);
  useEffect(() => { void loadLedger(); }, [loadLedger, refreshKey]);

  const sortedCards = useMemo(() => {
    if (!sum) return [];
    return [...sum.cards].sort((a, b) => b.profit - a.profit);
  }, [sum]);

  const downloadCsv = () => {
    const qs = new URLSearchParams();
    if (fCard !== "all") qs.set("card_id", fCard);
    if (fDir !== "all") qs.set("direction", fDir);
    if (fFrom) qs.set("from", fFrom);
    if (fTo) qs.set("to", fTo);
    qs.set("csv", "1");
    window.open(`/api/admin/treasury-ledger.php?${qs.toString()}`, "_blank");
  };

  const downloadPdf = async () => {
    if (!sum || ledger.length === 0) return;
    const { default: html2canvas } = await import("html2canvas");
    const { default: jsPDF } = await import("jspdf");
    const container = document.createElement("div");
    container.style.cssText = `position:fixed;top:-10000px;left:-10000px;width:1100px;padding:24px;background:#fff;color:#0f172a;font-family:"Vazirmatn","Tahoma",sans-serif;direction:rtl;text-align:right`;
    const today = toJalaliDateTime(new Date().toISOString());
    container.innerHTML = `
      <h2 style="font-size:22px;font-weight:800;margin:0 0 6px">دفتر کل صندوق ترخیصان</h2>
      <div style="font-size:12px;color:#64748b;margin-bottom:10px">تاریخ خروجی: ${today}</div>
      <div style="display:flex;gap:8px;margin-bottom:12px;font-size:12px">
        <div style="flex:1;border:1px solid #cbd5e1;border-radius:8px;padding:8px"><div style="color:#64748b">موجودی فعلی</div><div style="font-weight:800;font-size:16px">${fmt(sum.balance)}</div></div>
        <div style="flex:1;border:1px solid #cbd5e1;border-radius:8px;padding:8px"><div style="color:#64748b">کل ورودی</div><div style="font-weight:800;font-size:16px;color:#059669">${fmt(sum.total_in)}</div></div>
        <div style="flex:1;border:1px solid #cbd5e1;border-radius:8px;padding:8px"><div style="color:#64748b">کل خروجی</div><div style="font-weight:800;font-size:16px;color:#e11d48">${fmt(sum.total_out)}</div></div>
        <div style="flex:1;border:1px solid #cbd5e1;border-radius:8px;padding:8px"><div style="color:#64748b">تعداد تراکنش</div><div style="font-weight:800;font-size:16px">${sum.tx_count.toLocaleString("fa-IR")}</div></div>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:11px">
        <thead><tr style="background:#0f172a;color:#fff">
          <th style="padding:6px;border:1px solid #0f172a">#</th>
          <th style="padding:6px;border:1px solid #0f172a">تاریخ</th>
          <th style="padding:6px;border:1px solid #0f172a">جهت</th>
          <th style="padding:6px;border:1px solid #0f172a">مبلغ (تومان)</th>
          <th style="padding:6px;border:1px solid #0f172a">کارت</th>
          <th style="padding:6px;border:1px solid #0f172a">منبع</th>
          <th style="padding:6px;border:1px solid #0f172a">یادداشت</th>
        </tr></thead>
        <tbody>${ledger.map((l, i) => `
          <tr>
            <td style="padding:5px;border:1px solid #cbd5e1">${(i + 1).toLocaleString("fa-IR")}</td>
            <td style="padding:5px;border:1px solid #cbd5e1">
              <div>${l.occurred_at}</div>
              <div style="color:#64748b;font-size:10px">${toJalaliDateTime(l.occurred_at)}</div>
            </td>
            <td style="padding:5px;border:1px solid #cbd5e1;color:${l.direction === "in" ? "#059669" : "#e11d48"};font-weight:700">${l.direction === "in" ? "ورود" : "خروج"}</td>
            <td style="padding:5px;border:1px solid #cbd5e1;font-weight:700">${(l.direction === "in" ? "+" : "−") + " " + fmt(l.amount_irt)}</td>
            <td style="padding:5px;border:1px solid #cbd5e1">${l.card_name || "—"}</td>
            <td style="padding:5px;border:1px solid #cbd5e1">${SOURCE_LABEL[l.source_type] || l.source_type}</td>
            <td style="padding:5px;border:1px solid #cbd5e1">${(l.note || "—").replace(/</g, "&lt;")}</td>
          </tr>`).join("")}</tbody>
      </table>`;
    document.body.appendChild(container);
    try {
      const canvas = await html2canvas(container, { scale: 2, backgroundColor: "#fff" });
      const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "landscape" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const margin = 8;
      const imgW = pageW - margin * 2;
      const pageImgH = pageH - margin * 2;
      const ratio = canvas.width / imgW;
      const pageCanvasH = pageImgH * ratio;
      let y = 0;
      while (y < canvas.height) {
        const slice = document.createElement("canvas");
        slice.width = canvas.width;
        slice.height = Math.min(pageCanvasH, canvas.height - y);
        const ctx = slice.getContext("2d")!;
        ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, slice.width, slice.height);
        ctx.drawImage(canvas, 0, y, slice.width, slice.height, 0, 0, slice.width, slice.height);
        const sliceH = (slice.height * imgW) / slice.width;
        if (y > 0) pdf.addPage();
        pdf.addImage(slice.toDataURL("image/jpeg", 0.92), "JPEG", margin, margin, imgW, sliceH);
        y += pageCanvasH;
      }
      pdf.save(`treasury-ledger-${new Date().toISOString().slice(0, 10)}.pdf`);
    } finally {
      document.body.removeChild(container);
    }
  };


  return (
    <div className="space-y-6">
      {errors.length > 0 && (
        <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-persian text-sm text-destructive">
          <div className="font-bold mb-1">خطای خواندن بانک ترخیصان</div>
          <ul className="space-y-1 list-disc list-inside" dir="ltr">
            {errors.map((err) => <li key={err} className="text-left tabular-nums break-words">{err}</li>)}
          </ul>
        </div>
      )}

      {sum?.debug && (
        <div className="rounded-lg border border-border bg-muted/30 p-3 text-persian text-xs text-muted-foreground">
          <div className="font-bold text-foreground mb-1">گزارش منبع داده صندوق</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 tabular-nums">
            <span>پرداخت کاربران: {String(sum.debug.user_payments_count ?? 0)}</span>
            <span>جمع ورودی: {fmt(Number(sum.debug.user_payments_sum ?? 0))}</span>
            <span>پرداخت از صندوق: {String(sum.debug.admin_payments_count ?? 0)}</span>
            <span>جمع خروجی: {fmt(Number(sum.debug.admin_payments_sum ?? 0))}</span>
          </div>
          {Array.isArray(sum.debug.notes) && sum.debug.notes.length > 0 && (
            <div className="mt-2 text-destructive break-words" dir="ltr">{sum.debug.notes.join(" | ")}</div>
          )}
        </div>
      )}

      {/* KPI strip + Vault */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <CardTitle className="text-persian flex items-center gap-2">
              <Vault className="w-5 h-5" /> بانک ترخیصان
              <span className="text-xs font-normal text-muted-foreground">(حسابداری نقدی)</span>
            </CardTitle>
            <Button size="sm" variant="outline" onClick={() => void loadSummary()} disabled={loading}>
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {!sum ? (
            <div className="py-10 text-center"><Loader2 className="w-5 h-5 animate-spin inline" /></div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-6 items-center">
              <VaultGraphic balance={sum.balance} />
              <div className="grid grid-cols-2 gap-3">
                <KpiCard
                  icon={<ArrowDownToLine className="w-4 h-4" />}
                  label="کل ورودی"
                  value={fmt(sum.total_in)}
                  tone="success"
                />
                <KpiCard
                  icon={<ArrowUpFromLine className="w-4 h-4" />}
                  label="کل خروجی"
                  value={fmt(sum.total_out)}
                  tone="danger"
                />
                <KpiCard
                  icon={<TrendingUp className="w-4 h-4" />}
                  label="سود نقدی کل"
                  value={fmt(sum.total_profit)}
                  tone={sum.total_profit >= 0 ? "success" : "danger"}
                />
                <KpiCard
                  icon={<BarChart3 className="w-4 h-4" />}
                  label="تعداد تراکنش"
                  value={`${sum.tx_count.toLocaleString("fa-IR")} مورد`}
                  tone="neutral"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Trend chart */}
      {sum && sum.trend.length > 0 && (
        <div className="grid lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-persian text-base">روند موجودی صندوق (۳۰ روز اخیر)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-72" dir="ltr">
                <ResponsiveContainer>
                  <ComposedChart data={sum.trend} margin={{ top: 10, right: 16, left: 0, bottom: 4 }}>
                    <defs>
                      <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(45 95% 55%)" stopOpacity={0.55} />
                        <stop offset="100%" stopColor="hsl(45 95% 55%)" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={(d: string) => d.slice(5)} />
                    <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => Intl.NumberFormat("en", { notation: "compact" }).format(Number(v))} />
                    <Tooltip
                      formatter={(v: number, name: string) => {
                        const label = name === "in" ? "ورود" : name === "out" ? "خروج" : "موجودی";
                        return [fmt(Number(v)), label];
                      }}
                      labelFormatter={(d) => `تاریخ: ${d}`}
                      contentStyle={{ direction: "rtl", fontFamily: "inherit", borderRadius: 8, border: "1px solid hsl(var(--border))" }}
                    />
                    <Legend
                      verticalAlign="top" height={28}
                      formatter={(v) => v === "in" ? "ورود" : v === "out" ? "خروج" : "موجودی"}
                      wrapperStyle={{ direction: "rtl", fontFamily: "inherit", fontSize: 12 }}
                    />
                    <Bar dataKey="in" fill="hsl(142 71% 45%)" radius={[4, 4, 0, 0]} barSize={10} />
                    <Bar dataKey="out" fill="hsl(0 72% 55%)" radius={[4, 4, 0, 0]} barSize={10} />
                    <Area type="monotone" dataKey="balance" stroke="hsl(45 95% 50%)" strokeWidth={2.5} fill="url(#balGrad)" dot={false} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-persian text-base">توزیع نقدینگی</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-72" dir="ltr">
                {(() => {
                  const data = [
                    { key: "in", name: "کل ورودی", value: Math.max(0, sum.total_in), color: "hsl(142 71% 45%)" },
                    { key: "out", name: "کل خروجی", value: Math.max(0, sum.total_out), color: "hsl(0 72% 55%)" },
                    ...(sum.total_profit > 0
                      ? [{ key: "profit", name: "سود نقدی", value: sum.total_profit, color: "hsl(45 95% 50%)" }]
                      : []),
                  ].filter(d => d.value > 0);
                  if (data.length === 0) {
                    return <div className="h-full flex items-center justify-center text-muted-foreground text-persian text-sm">داده‌ای برای نمایش نیست.</div>;
                  }
                  return (
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={data}
                          dataKey="value"
                          nameKey="name"
                          cx="50%" cy="50%"
                          innerRadius={55} outerRadius={95}
                          paddingAngle={3}
                          stroke="hsl(var(--background))"
                          strokeWidth={2}
                          label={({ percent }) => `${(percent * 100).toFixed(0)}٪`}
                          labelLine={false}
                        >
                          {data.map((d) => <Cell key={d.key} fill={d.color} />)}
                        </Pie>
                        <Tooltip
                          formatter={(v: number) => fmt(Number(v))}
                          contentStyle={{ direction: "rtl", fontFamily: "inherit", borderRadius: 8, border: "1px solid hsl(var(--border))" }}
                        />
                        <Legend
                          verticalAlign="bottom" height={32}
                          wrapperStyle={{ direction: "rtl", fontFamily: "inherit", fontSize: 12 }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  );
                })()}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Per-card profit */}
      <Card>
        <CardHeader>
          <CardTitle className="text-persian text-base">سود نقدی هر کارت</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-persian">کارت</TableHead>
                <TableHead className="text-persian text-center">دریافتی نقدی</TableHead>
                <TableHead className="text-persian text-center">پرداختی نقدی</TableHead>
                <TableHead className="text-persian text-center">سود/زیان</TableHead>
                <TableHead className="text-persian text-center">سهم</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedCards.length === 0 ? (
                <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground text-persian py-6">داده‌ای نیست.</TableCell></TableRow>
              ) : sortedCards.map((c) => {
                const totalAbs = sum?.total_profit && sum.total_profit > 0 ? sum.total_profit : 1;
                const pct = Math.max(0, Math.min(100, (c.profit / totalAbs) * 100));
                return (
                  <TableRow key={c.id}>
                    <TableCell className="text-persian font-medium">{c.name}</TableCell>
                    <TableCell className="text-center tabular-nums text-emerald-600">{fmt(c.cash_in)}</TableCell>
                    <TableCell className="text-center tabular-nums text-rose-600">{fmt(c.cash_out)}</TableCell>
                    <TableCell className={`text-center tabular-nums font-bold ${c.profit >= 0 ? "text-emerald-600" : "text-destructive"}`}>
                      {fmt(c.profit)}
                    </TableCell>
                    <TableCell className="text-center min-w-[120px]">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${pct}%`,
                              background: c.profit >= 0 ? "hsl(var(--primary))" : "hsl(var(--destructive))",
                            }}
                          />
                        </div>
                        <span className="text-xs tabular-nums opacity-70 w-10">{pct.toFixed(0)}٪</span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Ledger */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <CardTitle className="text-persian text-base">دفتر کل صندوق</CardTitle>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={downloadCsv}>
                <Download className="w-4 h-4 ml-1" /> CSV
              </Button>
              <Button size="sm" variant="outline" onClick={downloadPdf} disabled={ledger.length === 0}>
                <Download className="w-4 h-4 ml-1" /> PDF
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div>
              <Label className="text-persian text-xs">کارت</Label>
              <Select value={fCard} onValueChange={setFCard}>
                <SelectTrigger className="text-persian"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-persian">همه</SelectItem>
                  {(sum?.cards || []).map((c) => (
                    <SelectItem key={c.id} value={String(c.id)} className="text-persian">{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-persian text-xs">جهت</Label>
              <Select value={fDir} onValueChange={(v) => setFDir(v as "all" | "in" | "out")}>
                <SelectTrigger className="text-persian"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-persian">همه</SelectItem>
                  <SelectItem value="in" className="text-persian">ورود</SelectItem>
                  <SelectItem value="out" className="text-persian">خروج</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-persian text-xs">از تاریخ</Label>
              <Input type="date" value={fFrom} onChange={(e) => setFFrom(e.target.value)} dir="ltr" />
            </div>
            <div>
              <Label className="text-persian text-xs">تا تاریخ</Label>
              <Input type="date" value={fTo} onChange={(e) => setFTo(e.target.value)} dir="ltr" />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-persian">تاریخ</TableHead>
                <TableHead className="text-persian">جهت</TableHead>
                <TableHead className="text-persian text-center">مبلغ</TableHead>
                <TableHead className="text-persian">کارت</TableHead>
                <TableHead className="text-persian">منبع</TableHead>
                <TableHead className="text-persian">یادداشت</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ledgerLoading ? (
                <TableRow><TableCell colSpan={6} className="text-center py-6"><Loader2 className="w-4 h-4 animate-spin inline" /></TableCell></TableRow>
              ) : ledger.length === 0 ? (
                <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground text-persian py-6">تراکنشی نیست.</TableCell></TableRow>
              ) : ledger.slice(0, visibleCount).map((l) => (
                <TableRow key={l.id}>
                  <TableCell className="text-xs tabular-nums opacity-80">
                    <div>{l.occurred_at}</div>
                    <div className="text-[10px] text-muted-foreground opacity-80">{toJalaliDateTime(l.occurred_at)}</div>
                  </TableCell>
                  <TableCell>
                    {l.direction === "in" ? (
                      <Badge className="bg-emerald-600/15 text-emerald-700 hover:bg-emerald-600/20 border-emerald-600/30">
                        <ArrowDownToLine className="w-3 h-3 ml-1" /> ورود
                      </Badge>
                    ) : (
                      <Badge className="bg-rose-600/15 text-rose-700 hover:bg-rose-600/20 border-rose-600/30">
                        <ArrowUpFromLine className="w-3 h-3 ml-1" /> خروج
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className={`text-center tabular-nums font-bold ${l.direction === "in" ? "text-emerald-600" : "text-rose-600"}`}>
                    {l.direction === "in" ? "+" : "−"} {fmt(l.amount_irt)}
                  </TableCell>
                  <TableCell className="text-persian text-sm">{l.card_name || "—"}</TableCell>
                  <TableCell className="text-persian text-xs">{SOURCE_LABEL[l.source_type] || l.source_type}</TableCell>
                  <TableCell className="text-persian text-xs opacity-80">{l.note || "—"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {!ledgerLoading && ledger.length > visibleCount && (
            <div className="flex items-center justify-center pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setVisibleCount((c) => c + 15)}
                className="text-persian"
              >
                ادامه ({ledger.length - visibleCount} مورد باقی‌مانده)
              </Button>
            </div>
          )}
          {!ledgerLoading && ledger.length > 15 && ledger.length <= visibleCount && (
            <div className="flex items-center justify-center pt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setVisibleCount(15)}
                className="text-persian text-xs opacity-70"
              >
                نمایش کمتر
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const KpiCard = ({
  icon, label, value, tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone: "success" | "danger" | "neutral";
}) => {
  const toneClass =
    tone === "success" ? "text-emerald-600 border-emerald-600/30 bg-emerald-600/5" :
    tone === "danger"  ? "text-rose-600 border-rose-600/30 bg-rose-600/5" :
    "text-primary border-primary/30 bg-primary/5";
  return (
    <div className={`rounded-xl border p-3 ${toneClass}`}>
      <div className="flex items-center gap-1.5 text-xs text-persian opacity-80">
        {icon} {label}
      </div>
      <div className="mt-1 text-base font-bold tabular-nums">{value}</div>
    </div>
  );
};

export default TreasuryPanel;
