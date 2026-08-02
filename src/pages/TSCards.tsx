import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Loader2, LogOut, Plus, Trash2, Pencil, RefreshCw, CreditCard, UserPlus, History, DollarSign, FileText, ChevronDown, ChevronUp, Search, Download, Wallet, Banknote, Package, Vault, Receipt, Upload, CheckCircle2, RotateCcw, Paperclip, Bell } from "lucide-react";
import TreasuryPanel from "@/components/admin/TreasuryPanel";
import UserBillingDialog from "@/components/admin/UserBillingDialog";
import CardBillingDialog from "@/components/admin/CardBillingDialog";
import { xhrUpload } from "@/lib/xhrUpload";
import UploadProgressBar from "@/components/UploadProgressBar";
import { downloadKotajPdf } from "@/lib/kotaj-pdf";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import gregorian from "react-date-object/calendars/gregorian";
import persian_fa from "react-date-object/locales/persian_fa";

type Currency = "USD" | "EUR" | "IRT";

interface CardUser {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  created_at?: string;
  allocated?: number;
  require_payment_approval?: number;
}
interface EntryUser {
  id: number;
  access_id?: number;
  first_name: string;
  last_name: string;
  username: string;
  allocated: number;
  custom_unit_price_irt?: number | null;
}
interface CardEntry {
  id: number;
  title: string;
  amount: number;
  currency: Currency;
  unit_price_irt: number;
  total_irt: number;
  sort_order: number;
  users: EntryUser[];
  kotaj_toman_total?: number;
}
interface CardRow {
  id: number;
  name: string;
  balance: string | number;
  currency: Currency;
  user_count: number;
  users?: EntryUser[];
  entries?: CardEntry[];
  allocated_total?: number;
  remaining?: number;
  updated_at?: string;
  created_at?: string;
  kotaj_toman_total?: number;
  kotaj_usd_total?: number;
  cost_unit_price_irt?: number | null;
  admin_paid_irt?: number;
  admin_debt_remaining_irt?: number;
  tolerance_percent?: number;
  display_balance_usd?: number | null;
  display_balance_irt?: number | null;
  finalized_at?: string | null;
}

const CURRENCY_LABEL: Record<Currency, string> = {
  USD: "دلار",
  EUR: "یورو",
  IRT: "تومان",
};

const fmtMoney = (v: string | number | undefined, c: Currency) => {
  const n = typeof v === "string" ? parseFloat(v) : (v ?? 0);
  if (!isFinite(n)) return "—";
  return `${n.toLocaleString("fa-IR")} ${CURRENCY_LABEL[c]}`;
};
const fmtToman = (v: number) =>
  `${(isFinite(v) ? v : 0).toLocaleString("fa-IR")} تومان`;

const normDigits = (raw: string) => {
  const fa = "۰۱۲۳۴۵۶۷۸۹"; const ar = "٠١٢٣٤٥٦٧٨٩";
  return raw.replace(/[۰-۹٠-٩]/g, (d) => {
    const i = fa.indexOf(d); if (i >= 0) return String(i);
    const j = ar.indexOf(d); return j >= 0 ? String(j) : d;
  }).replace(/[^\d.]/g, "");
};
// تبدیل ارقام فارسی/عربی به انگلیسی بدون حذف جداکننده‌ها (برای فیلدهای تاریخ)
const normDateDigits = (raw: string) => {
  const fa = "۰۱۲۳۴۵۶۷۸۹"; const ar = "٠١٢٣٤٥٦٧٨٩";
  return raw.replace(/[۰-۹٠-٩]/g, (d) => {
    const i = fa.indexOf(d); if (i >= 0) return String(i);
    const j = ar.indexOf(d); return j >= 0 ? String(j) : d;
  });
};

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    credentials: "same-origin",
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    ...init,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { error?: string }).error || `HTTP ${res.status}`);
  return data as T;
}

type AuthState = "loading" | "login" | "auth";

interface PendingPayment {
  id: number;
  amount_irt: number;
  created_at: string;
  note?: string | null;
  card_name?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  username?: string | null;
}

function usePendingPayments(enabled: boolean) {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState<PendingPayment[]>([]);

  const reload = useCallback(async () => {
    if (!enabled) return;
    try {
      const r = await api<{ count: number; items: PendingPayment[] }>("/api/admin/payments-pending-count.php");
      setCount(Number(r.count || 0));
      setItems(r.items || []);
    } catch {
      /* silent */
    }
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    void reload();
    const t = window.setInterval(() => { void reload(); }, 60000);
    return () => window.clearInterval(t);
  }, [enabled, reload]);

  return { count, items, reload };
}



const TSCards = () => {
  const { toast } = useToast();
  const [state, setState] = useState<AuthState>("loading");
  const [username, setUsername] = useState("");

  const refresh = useCallback(async () => {
    setState("loading");
    try {
      const me = await api<{ authenticated: boolean; username?: string }>("/api/admin/me.php");
      if (me.authenticated) {
        setUsername(me.username || "");
        setState("auth");
      } else {
        setState("login");
      }
    } catch {
      setState("login");
    }
  }, []);

  useEffect(() => { void refresh(); }, [refresh]);

  const pending = usePendingPayments(state === "auth");

  return (
    <>
      <Helmet>
        <title>مدیریت کارت‌ها</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="panel-glass panel-fa min-h-screen">
        <header className="container mx-auto px-4 pt-4">
          <div className="panel-topbar h-14 px-5 flex items-center justify-between">
            <h1 className="text-persian font-bold flex items-center gap-2">
              <CreditCard className="w-5 h-5" /> مدیریت کارت‌ها
            </h1>
            {state === "auth" && (
              <div className="flex items-center gap-3 text-sm text-persian">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm" className="relative px-2" title="پرداخت‌های در انتظار تأیید">
                      <Bell className={`w-5 h-5 ${pending.count > 0 ? "text-destructive" : ""}`} />
                      {pending.count > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-destructive text-destructive-foreground text-[10px] leading-[18px] font-bold tabular-nums">
                          {pending.count.toLocaleString("fa-IR")}
                        </span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="panel-fa w-80 p-0">
                    <div className="px-3 py-2 border-b flex items-center justify-between">
                      <span className="text-persian text-sm font-bold">پرداخت‌های در انتظار تأیید</span>
                      <Button variant="ghost" size="sm" className="h-7 px-2" onClick={() => void pending.reload()}>
                        <RefreshCw className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      {pending.count === 0 ? (
                        <div className="p-4 text-center text-xs text-muted-foreground text-persian">
                          پرداخت در انتظاری وجود ندارد.
                        </div>
                      ) : (
                        pending.items.map((p) => (
                          <div key={p.id} className="px-3 py-2 border-b last:border-b-0 text-xs">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-persian">{p.first_name} {p.last_name}</span>
                              <span className="tabular-nums font-bold">{Number(p.amount_irt || 0).toLocaleString("fa-IR")} تومان</span>
                            </div>
                            <div className="text-muted-foreground text-persian mt-0.5">
                              {p.card_name || "—"}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
                <a href="/TSDashboard" className="opacity-80 hover:opacity-100">پنل اصلی</a>
                <span className="opacity-80">{username}</span>
                <Button
                  variant="ghost" size="sm"
                  onClick={async () => {
                    await api("/api/admin/logout.php", { method: "POST" });
                    void refresh();
                  }}
                >
                  <LogOut className="w-4 h-4 ml-1" /> خروج
                </Button>
              </div>
            )}
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          {state === "loading" && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          )}
          {state === "login" && (
            <Card className="max-w-md mx-auto">
              <CardHeader><CardTitle className="text-persian">ورود</CardTitle></CardHeader>
              <CardContent>
                <p className="text-persian text-sm text-muted-foreground mb-4">
                  لطفاً ابتدا از طریق پنل اصلی وارد شوید.
                </p>
                <Button asChild className="w-full text-persian">
                  <a href="/TSDashboard">رفتن به پنل ورود</a>
                </Button>
              </CardContent>
            </Card>
          )}
          {state === "auth" && <CardsPanel toast={toast} pendingCount={pending.count} onPendingChanged={() => { void pending.reload(); }} />}
        </main>
      </div>
    </>
  );
};

const CardsPanel = ({ toast, pendingCount = 0, onPendingChanged }: { toast: ReturnType<typeof useToast>["toast"]; pendingCount?: number; onPendingChanged?: () => void }) => {
  const [items, setItems] = useState<CardRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<CardRow | null>(null);
  const [logsFor, setLogsFor] = useState<CardRow | null>(null);
  const [pricesFor, setPricesFor] = useState<CardRow | null>(null);
  const [reportFor, setReportFor] = useState<CardRow | null>(null);
  const [kotajCostFor, setKotajCostFor] = useState<CardRow | null>(null);
  const [payDebtFor, setPayDebtFor] = useState<CardRow | null>(null);
  const [billingCard, setBillingCard] = useState<{ id: number; name: string } | null>(null);
  const [treasuryKey, setTreasuryKey] = useState(0);
  const bumpTreasury = useCallback(() => setTreasuryKey((k) => k + 1), []);
  const [adminPaymentsKey, setAdminPaymentsKey] = useState(0);
  const bumpAdminPayments = useCallback(() => setAdminPaymentsKey((k) => k + 1), []);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api<{ items: CardRow[] }>("/api/admin/cards-list.php");
      setItems(res.items || []);
    } catch (e) {
      toast({ title: "خطا", description: (e as Error).message, variant: "destructive" });
    } finally { setLoading(false); }
  }, [toast]);

  useEffect(() => { void load(); }, [load]);

  const handleDelete = async (id: number) => {
    if (!confirm("این کارت حذف شود؟")) return;
    try {
      await api("/api/admin/card-delete.php", { method: "POST", body: JSON.stringify({ id }) });
      toast({ title: "حذف شد" });
      void load();
    } catch (e) {
      toast({ title: "خطا", description: (e as Error).message, variant: "destructive" });
    }
  };

  const handleFinalize = async (r: CardRow, mode: "finalize" | "reset") => {
    const isFinalize = mode === "finalize";
    const msg = isFinalize
      ? `با تأیید، ستون «موجودی کل (دلار)» این کارت با مجموع دلاری کوتاژ‌های ثبت‌شده جایگزین می‌شود.\nسقف اصلی کارت دست‌نخورده باقی می‌ماند.\nادامه؟`
      : `ستون «موجودی کل (دلار)» به مقدار اصلی (سقف کارت) بازگردانده شود؟`;
    if (!confirm(msg)) return;
    try {
      await api("/api/admin/card-finalize.php", {
        method: "POST",
        body: JSON.stringify({ id: r.id, mode }),
      });
      toast({ title: isFinalize ? "اتمام ثبت شد" : "لغو اتمام انجام شد" });
      void load();
    } catch (e) {
      toast({ title: "خطا", description: (e as Error).message, variant: "destructive" });
    }
  };

  return (
    <Tabs dir="rtl" defaultValue="cards" className="space-y-6">
      <div className="-mx-2 px-2 overflow-x-auto md:overflow-visible">
        <TabsList className="panel-3d-tabs h-12 md:h-14 w-max md:w-full justify-between rounded-full bg-secondary p-1.5 border border-border shadow-[inset_0_2px_6px_hsl(var(--primary)/0.12),0_2px_4px_hsl(var(--primary)/0.06)] gap-1 flex-nowrap md:flex-wrap">
          <TabsTrigger value="cards" className="shrink-0 md:flex-1 h-full px-3 md:px-2 rounded-full text-persian text-xs md:text-sm whitespace-nowrap text-muted-foreground hover:text-primary hover:bg-primary/5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[0_6px_16px_hsl(var(--primary)/0.4),0_2px_4px_hsl(var(--primary)/0.2)] data-[state=active]:font-bold data-[state=active]:scale-[1.02] transition-all duration-300 ease-out">
            کارت‌ها
          </TabsTrigger>
          <TabsTrigger value="card-payments" className="shrink-0 md:flex-1 h-full px-3 md:px-2 rounded-full text-persian text-xs md:text-sm whitespace-nowrap text-muted-foreground hover:text-primary hover:bg-primary/5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[0_6px_16px_hsl(var(--primary)/0.4),0_2px_4px_hsl(var(--primary)/0.2)] data-[state=active]:font-bold data-[state=active]:scale-[1.02] transition-all duration-300 ease-out">
            پرداختی‌های کارت
          </TabsTrigger>
          <TabsTrigger value="users" className="shrink-0 md:flex-1 h-full px-3 md:px-2 rounded-full text-persian text-xs md:text-sm whitespace-nowrap text-muted-foreground hover:text-primary hover:bg-primary/5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[0_6px_16px_hsl(var(--primary)/0.4),0_2px_4px_hsl(var(--primary)/0.2)] data-[state=active]:font-bold data-[state=active]:scale-[1.02] transition-all duration-300 ease-out">
            مدیریت کاربران
          </TabsTrigger>
          <TabsTrigger value="payments" className="relative shrink-0 md:flex-1 h-full px-3 md:px-2 rounded-full text-persian text-xs md:text-sm whitespace-nowrap text-muted-foreground hover:text-primary hover:bg-primary/5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[0_6px_16px_hsl(var(--primary)/0.4),0_2px_4px_hsl(var(--primary)/0.2)] data-[state=active]:font-bold data-[state=active]:scale-[1.02] transition-all duration-300 ease-out">
            پرداخت‌های کاربران
            {pendingCount > 0 && (
              <span className="absolute -top-1 right-0 min-w-[18px] h-[18px] px-1 rounded-full bg-destructive text-destructive-foreground text-[10px] leading-[18px] font-bold tabular-nums">
                {pendingCount.toLocaleString("fa-IR")}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="kotaj-items" className="shrink-0 md:flex-1 h-full px-3 md:px-2 rounded-full text-persian text-xs md:text-sm whitespace-nowrap text-muted-foreground hover:text-primary hover:bg-primary/5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[0_6px_16px_hsl(var(--primary)/0.4),0_2px_4px_hsl(var(--primary)/0.2)] data-[state=active]:font-bold data-[state=active]:scale-[1.02] transition-all duration-300 ease-out">
            کوتاژ‌ها
          </TabsTrigger>
          <TabsTrigger value="treasury" className="shrink-0 md:flex-1 h-full px-3 md:px-2 rounded-full text-persian text-xs md:text-sm whitespace-nowrap text-muted-foreground hover:text-primary hover:bg-primary/5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[0_6px_16px_hsl(var(--primary)/0.4),0_2px_4px_hsl(var(--primary)/0.2)] data-[state=active]:font-bold data-[state=active]:scale-[1.02] transition-all duration-300 ease-out">
            <Vault className="w-3.5 h-3.5 ml-1 inline" /> بانک ترخیصان
          </TabsTrigger>
          <TabsTrigger value="reports" className="shrink-0 md:flex-1 h-full px-3 md:px-2 rounded-full text-persian text-xs md:text-sm whitespace-nowrap text-muted-foreground hover:text-primary hover:bg-primary/5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[0_6px_16px_hsl(var(--primary)/0.4),0_2px_4px_hsl(var(--primary)/0.2)] data-[state=active]:font-bold data-[state=active]:scale-[1.02] transition-all duration-300 ease-out">
            گزارش‌گیری
          </TabsTrigger>
        </TabsList>
      </div>



      <TabsContent value="cards" className="mt-0">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <CardTitle className="text-persian flex items-center gap-2">
                کارت‌ها <Badge variant="secondary">{items.length}</Badge>
              </CardTitle>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => load()}>
                  <RefreshCw className="w-4 h-4" />
                </Button>
                <Button size="sm" onClick={() => { setEditing(null); setOpen(true); }} className="text-persian">
                  <Plus className="w-4 h-4 ml-1" /> افزودن کارت
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="py-10 text-center"><Loader2 className="w-5 h-5 animate-spin inline" /></div>
            ) : items.length === 0 ? (
              <p className="py-10 text-center text-muted-foreground text-persian">هنوز کارتی ثبت نشده.</p>
            ) : (
              <div className="ts-stack-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-persian">نام کارت</TableHead>
                    <TableHead className="text-persian">موجودی کل (دلار)</TableHead>
                    <TableHead className="text-persian">موجودی کل (تومان)</TableHead>
                    <TableHead className="text-persian">سکشن‌ها</TableHead>
                    <TableHead className="text-persian hidden md:table-cell">کاربران</TableHead>
                    <TableHead></TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((r) => {
                    const bal = typeof r.balance === "string" ? parseFloat(r.balance) : (r.balance as number);
                    const usdTotal = (r.entries || [])
                      .filter(e => e.currency === "USD")
                      .reduce((s, e) => s + (Number(e.amount) || 0), 0);
                    return (
                      <TableRow key={r.id}>
                        <TableCell data-label="نام کارت" className="text-persian font-medium align-top md:!text-sm text-base md:!font-medium !font-bold">{r.name}</TableCell>
                        <TableCell data-label="موجودی کل (دلار)" className="text-persian whitespace-nowrap align-top font-bold tabular-nums">
                          {(() => {
                            const hasDisplay = r.display_balance_usd !== null && r.display_balance_usd !== undefined;
                            const shown = hasDisplay ? Number(r.display_balance_usd) : usdTotal;
                            const tol = Number(r.tolerance_percent || 0);
                            return (
                              <div className="flex flex-col gap-0.5">
                                <span>{shown > 0 ? `${shown.toLocaleString("fa-IR")} دلار` : "—"}</span>
                                {hasDisplay && (
                                  <span className="text-[10px] font-normal text-muted-foreground tabular-nums">
                                    سقف: {usdTotal.toLocaleString("fa-IR")} دلار
                                  </span>
                                )}
                                {tol > 0 && !hasDisplay && (
                                  <span className="text-[10px] font-normal text-muted-foreground tabular-nums">
                                    با {tol.toLocaleString("fa-IR")}٪ تلورانس: {(usdTotal * (1 + tol / 100)).toLocaleString("fa-IR", { maximumFractionDigits: 2 })} دلار
                                  </span>
                                )}
                              </div>
                            );
                          })()}
                        </TableCell>

                        <TableCell data-label="موجودی کل (تومان)" className="text-persian whitespace-nowrap align-top font-bold tabular-nums">
                          {(() => {
                            const hasDispIrt = r.display_balance_irt !== null && r.display_balance_irt !== undefined;
                            const shownIrt = hasDispIrt ? Number(r.display_balance_irt) : (bal || 0);
                            return (
                              <div className="flex flex-col gap-0.5">
                                <span>{fmtToman(shownIrt)}</span>
                                {hasDispIrt && (
                                  <span className="text-[10px] font-normal text-muted-foreground tabular-nums">
                                    سقف: {fmtToman(bal || 0)}
                                  </span>
                                )}
                              </div>
                            );
                          })()}
                        </TableCell>
                        <TableCell data-label="سکشن‌ها" className="text-persian align-top md:min-w-[240px]">
                          {r.entries && r.entries.length > 0 ? (
                            <div className="flex flex-col gap-1.5 text-sm">
                              {r.entries.map((e) => {
                                const amt = Number(e.amount) || 0;
                                const perUnit = e.currency !== "IRT" && amt > 0
                                  ? (Number(e.unit_price_irt) || (Number(e.total_irt) / amt))
                                  : 0;
                                return (
                                  <div key={e.id} className="flex flex-wrap justify-between gap-x-3 gap-y-0.5">
                                    <span className="font-medium">{e.title}</span>
                                    <span className="tabular-nums text-muted-foreground">
                                      {fmtMoney(e.amount, e.currency)}
                                      {e.currency !== "IRT" && perUnit > 0 && (
                                        <span className="mx-1">← هر ۱ {CURRENCY_LABEL[e.currency]} = {fmtToman(Math.round(perUnit))}</span>
                                      )}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          ) : <span className="text-muted-foreground text-sm">—</span>}
                        </TableCell>
                        <TableCell data-label="کاربران" className="text-persian text-sm md:max-w-sm align-top hidden md:table-cell">
                          {r.entries && r.entries.length > 0 && r.entries.some(e => e.users.length > 0) ? (
                            <div className="flex flex-col gap-2">
                              {r.entries.filter(e => e.users.length > 0).map(e => (
                                <div key={e.id}>
                                  <div className="font-bold">{e.title}:</div>
                                  <ul className="text-muted-foreground space-y-0.5 mt-0.5">
                                    {e.users.map(u => (
                                      <li key={u.id} className="tabular-nums">
                                        {u.first_name} {u.last_name} ({u.allocated.toLocaleString("fa-IR")} {CURRENCY_LABEL[e.currency]})
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          ) : "—"}
                        </TableCell>
                        {(() => {
                          const paid = Number(r.admin_paid_irt || 0);
                          const effectiveBal = (r.display_balance_irt !== null && r.display_balance_irt !== undefined)
                            ? Number(r.display_balance_irt)
                            : (bal || 0);
                          const diff = paid - effectiveBal;
                          // Reversed labels per business rule: admin overpaid => admin is debtor to card owner
                          const isOver = diff > 0.0001;
                          const isSettled = Math.abs(diff) <= 0.0001;
                          const label = isSettled ? "تسویه" : isOver ? "بدهکار" : "بستانکار";
                          const statusBtnClass = isSettled
                            ? "bg-gradient-to-l from-slate-500 to-slate-400 text-white"
                            : isOver
                              ? "bg-gradient-to-l from-rose-600 to-red-500 text-white"
                              : "bg-gradient-to-l from-emerald-600 to-green-500 text-white";
                          return (
                        <TableCell data-label="عملیات" className="align-top md:pt-2 pt-3 md:border-t-0 border-t border-white/10">
                          <div className="grid grid-cols-3 md:grid-cols-3 gap-1.5 md:justify-end md:max-w-[240px]">
                            <Button size="sm" variant="ghost" onClick={() => setReportFor(r)} title="گزارش کوتاژها" className="md:!justify-center justify-start gap-1.5 h-9">
                              <FileText className="w-4 h-4" />
                              <span className="md:hidden text-persian text-[11px]">گزارش</span>
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => setPricesFor(r)} title="قیمت دلار کاربران" className="md:!justify-center justify-start gap-1.5 h-9">
                              <DollarSign className="w-4 h-4" />
                              <span className="md:hidden text-persian text-[11px]">قیمت دلار</span>
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => setLogsFor(r)} title="تاریخچه" className="md:!justify-center justify-start gap-1.5 h-9">
                              <History className="w-4 h-4" />
                              <span className="md:hidden text-persian text-[11px]">تاریخچه</span>
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => setKotajCostFor(r)} title="هزینه کوتاژها" className="md:!justify-center justify-start gap-1.5 h-9">
                              <Wallet className="w-4 h-4 text-accent" />
                              <span className="md:hidden text-persian text-[11px]">هزینه</span>
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => { setEditing(r); setOpen(true); }} title="ویرایش" className="md:!justify-center justify-start gap-1.5 h-9">
                              <Pencil className="w-4 h-4" />
                              <span className="md:hidden text-persian text-[11px]">ویرایش</span>
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDelete(r.id)} title="حذف" className="md:!justify-center justify-start gap-1.5 h-9">
                              <Trash2 className="w-4 h-4 text-destructive" />
                              <span className="md:hidden text-persian text-[11px]">حذف</span>
                            </Button>
                            <div className="col-span-3 grid grid-cols-2 gap-1.5">
                              <Button size="sm" onClick={() => setPayDebtFor(r)} title="پرداخت بدهی به صاحب کارت" className="w-full justify-center gap-1.5 px-2 h-9 bg-gradient-to-l from-emerald-600 to-green-500 text-white hover:opacity-90 shadow-md">
                                <Banknote className="w-4 h-4 shrink-0" />
                                <span className="text-persian text-xs truncate">پرداخت</span>
                              </Button>
                              <Button size="sm" onClick={() => setBillingCard({ id: r.id, name: r.name })} title="صورتحساب کارت" className="w-full justify-center gap-1.5 px-2 h-9 bg-gradient-to-l from-blue-600 to-sky-500 text-white hover:opacity-90 shadow-md">
                                <Receipt className="w-4 h-4 shrink-0" />
                                <span className="text-persian text-xs truncate">صورتحساب</span>
                              </Button>
                            </div>
                            <div className="col-span-3">
                              {r.finalized_at ? (
                                <Button size="sm" onClick={() => handleFinalize(r, "reset")} title="لغو اتمام و بازگشت به سقف اصلی" className="w-full justify-center gap-1.5 px-2 h-9 bg-gradient-to-l from-slate-600 to-slate-500 text-white hover:opacity-90 shadow-md">
                                  <RotateCcw className="w-4 h-4 shrink-0" />
                                  <span className="text-persian text-xs truncate">لغو اتمام</span>
                                </Button>
                              ) : (
                                <Button size="sm" onClick={() => handleFinalize(r, "finalize")} title="اتمام کارت — جایگزینی موجودی کل با مجموع کوتاژها" className="w-full justify-center gap-1.5 px-2 h-9 bg-gradient-to-l from-amber-600 to-orange-500 text-white hover:opacity-90 shadow-md">
                                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                                  <span className="text-persian text-xs truncate">اتمام</span>
                                </Button>
                              )}
                            </div>
                            <div className="col-span-3">
                              <div
                                title="وضعیت مانده"
                                className={`w-full min-h-9 rounded-md flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 px-2 py-1 shadow-md ${statusBtnClass}`}
                              >
                                <span className="text-persian text-xs font-medium whitespace-nowrap">{label}</span>
                                <span className="text-persian text-[11px] leading-tight tabular-nums font-bold break-all text-center">
                                  {isSettled ? "—" : fmtToman(Math.abs(diff))}
                                </span>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                          );
                        })()}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              </div>
            )}

            <CardDialog
              open={open}
              onClose={() => setOpen(false)}
              onSaved={() => { setOpen(false); void load(); }}
              editing={editing}
              toast={toast}
            />

            <LogsDialog
              card={logsFor}
              onClose={() => setLogsFor(null)}
              toast={toast}
            />

            <UserPricesDialog
              card={pricesFor}
              onClose={() => setPricesFor(null)}
              onSaved={() => void load()}
              toast={toast}
            />

            <KotajReportDialog
              card={reportFor}
              onClose={() => setReportFor(null)}
              toast={toast}
            />

            <Dialog open={!!kotajCostFor} onOpenChange={(o) => !o && setKotajCostFor(null)}>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-persian">هزینه کوتاژها — {kotajCostFor?.name}</DialogTitle>
                </DialogHeader>
                {kotajCostFor && (
                  <div className="space-y-3 text-persian">
                    <div className="flex justify-between items-center p-3 rounded-lg bg-accent/10 border border-accent/20">
                      <span className="font-bold">مجموع کل:</span>
                      <span className="font-bold tabular-nums text-accent">{fmtToman(kotajCostFor.kotaj_toman_total || 0)}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-muted-foreground">تفکیک سکشن‌ها:</div>
                      {(kotajCostFor.entries || []).map((e) => (
                        <div key={e.id} className="flex justify-between items-center py-2 border-b border-border/60 last:border-0">
                          <span>{e.title}</span>
                          <span className="tabular-nums">{fmtToman(e.kotaj_toman_total || 0)}</span>
                        </div>
                      ))}
                      {(!kotajCostFor.entries || kotajCostFor.entries.length === 0) && (
                        <p className="text-sm text-muted-foreground text-center py-3">سکشنی ثبت نشده.</p>
                      )}
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>

            <AdminPayCardDialog card={payDebtFor} onClose={() => setPayDebtFor(null)} onSaved={() => { setPayDebtFor(null); void load(); bumpTreasury(); bumpAdminPayments(); }} toast={toast} />

            <CardBillingDialog
              open={!!billingCard}
              onClose={() => setBillingCard(null)}
              cardId={billingCard?.id || 0}
              cardName={billingCard?.name || ""}
            />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="card-payments" className="mt-0">
        <CardAdminPaymentsPanel toast={toast} cards={items} refreshKey={adminPaymentsKey} onChanged={() => { void load(); bumpTreasury(); }} />
      </TabsContent>

      <TabsContent value="users" className="mt-0">
        <UsersManagementPanel toast={toast} />
      </TabsContent>

      <TabsContent value="payments" className="mt-0">
        <AllPaymentsPanel toast={toast} cards={items} onChanged={() => { void load(); bumpTreasury(); onPendingChanged?.(); }} />
      </TabsContent>

      <TabsContent value="kotaj-items" className="mt-0">
        <KotajItemsSearchPanel toast={toast} cards={items} />
      </TabsContent>

      <TabsContent value="treasury" className="mt-0">
        <TreasuryPanel toast={toast} refreshKey={treasuryKey} />
      </TabsContent>

      <TabsContent value="reports" className="mt-0">
        <Tabs dir="rtl" defaultValue="reports-card" className="space-y-6">
          <TabsList className="panel-3d-tabs h-12 md:h-14 w-max md:w-full justify-between rounded-full bg-secondary p-1.5 border border-border shadow-[inset_0_2px_6px_hsl(var(--primary)/0.12),0_2px_4px_hsl(var(--primary)/0.06)] gap-1 flex-nowrap md:flex-wrap">
            <TabsTrigger value="reports-card" className="shrink-0 md:flex-1 h-full px-3 md:px-2 rounded-full text-persian text-xs md:text-sm whitespace-nowrap text-muted-foreground hover:text-primary hover:bg-primary/5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[0_6px_16px_hsl(var(--primary)/0.4),0_2px_4px_hsl(var(--primary)/0.2)] data-[state=active]:font-bold data-[state=active]:scale-[1.02] transition-all duration-300 ease-out">
              کارت
            </TabsTrigger>
            <TabsTrigger value="reports-user" className="shrink-0 md:flex-1 h-full px-3 md:px-2 rounded-full text-persian text-xs md:text-sm whitespace-nowrap text-muted-foreground hover:text-primary hover:bg-primary/5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[0_6px_16px_hsl(var(--primary)/0.4),0_2px_4px_hsl(var(--primary)/0.2)] data-[state=active]:font-bold data-[state=active]:scale-[1.02] transition-all duration-300 ease-out">
              کاربر
            </TabsTrigger>
          </TabsList>
          <TabsContent value="reports-card" className="mt-0">
            <ReportsSection toast={toast} />
          </TabsContent>
          <TabsContent value="reports-user" className="mt-0">
            <ReportsUsersSection toast={toast} />
          </TabsContent>
        </Tabs>
      </TabsContent>
    </Tabs>
  );
};


interface DialogProps {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  editing: CardRow | null;
  toast: ReturnType<typeof useToast>["toast"];
}

interface EntryDraft {
  id?: number;
  title: string;
  amount: string;
  currency: Currency;
  unit_price_irt: string;
}
// per-entry allocations: array index = entry index, value = map userId -> allocated string
type AllocMap = Record<number, string>;

const emptyEntry = (): EntryDraft => ({
  title: "", amount: "", currency: "USD", unit_price_irt: "",
});

const CardDialog = ({ open, onClose, onSaved, editing, toast }: DialogProps) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState("");
  const [tolerancePercent, setTolerancePercent] = useState<string>("0");
  const [entries, setEntries] = useState<EntryDraft[]>([emptyEntry()]);
  const [allocs, setAllocs] = useState<AllocMap[]>([{}]);
  const [sectionCategories, setSectionCategories] = useState<string[]>([]);

  const [users, setUsers] = useState<CardUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [busy, setBusy] = useState(false);
  const [addUserOpen, setAddUserOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    setStep(1);
    setName(editing?.name ?? "");
    setTolerancePercent(editing?.tolerance_percent !== undefined && editing?.tolerance_percent !== null ? String(editing.tolerance_percent) : "0");
    if (editing?.entries && editing.entries.length > 0) {
      setEntries(editing.entries.map(e => ({
        id: e.id,
        title: e.title,
        amount: String(e.amount),
        currency: e.currency,
        unit_price_irt: e.currency === "IRT" ? "" : String(e.unit_price_irt),
      })));
      setAllocs(editing.entries.map(e => {
        const m: AllocMap = {};
        e.users.forEach(u => { m[u.id] = String(u.allocated); });
        return m;
      }));
    } else {
      setEntries([emptyEntry()]);
      setAllocs([{}]);
    }
  }, [open, editing]);

  const loadUsers = useCallback(async () => {
    setLoadingUsers(true);
    try {
      const res = await api<{ items: CardUser[] }>("/api/admin/card-users-list.php");
      setUsers(res.items || []);
    } catch (e) {
      toast({ title: "خطا", description: (e as Error).message, variant: "destructive" });
    } finally { setLoadingUsers(false); }
  }, [toast]);

  useEffect(() => { if (open && step === 2) void loadUsers(); }, [open, step, loadUsers]);

  useEffect(() => {
    if (!open) return;
    (async () => {
      try {
        const res = await api<{ items: { id: number; name: string }[] }>("/api/section-categories-list.php");
        setSectionCategories((res.items || []).map(i => i.name));
      } catch { /* ignore */ }
    })();
  }, [open]);

  const entryTotals = useMemo(() => entries.map(e => {
    const a = parseFloat(e.amount) || 0;
    const u = e.currency === "IRT" ? 1 : (parseFloat(e.unit_price_irt) || 0);
    return Math.round(a * u * 100) / 100;
  }), [entries]);
  const grandTotal = entryTotals.reduce((s, v) => s + v, 0);

  const updateEntry = (i: number, patch: Partial<EntryDraft>) => {
    setEntries(prev => prev.map((e, idx) => idx === i ? { ...e, ...patch } : e));
  };
  const addEntry = () => {
    setEntries(prev => [...prev, emptyEntry()]);
    setAllocs(prev => [...prev, {}]);
  };
  const removeEntry = (i: number) => {
    if (entries.length <= 1) return;
    setEntries(prev => prev.filter((_, idx) => idx !== i));
    setAllocs(prev => prev.filter((_, idx) => idx !== i));
  };

  const goStep2 = () => {
    if (!name.trim()) return toast({ title: "نام کارت را وارد کنید", variant: "destructive" });
    for (let i = 0; i < entries.length; i++) {
      const e = entries[i];
      if (!e.title.trim()) return toast({ title: `عنوان سکشن ${i + 1} را وارد کنید`, variant: "destructive" });
      if (e.amount === "" || isNaN(parseFloat(e.amount))) return toast({ title: `مبلغ سکشن «${e.title}» معتبر نیست`, variant: "destructive" });
      if (e.currency !== "IRT" && (e.unit_price_irt === "" || isNaN(parseFloat(e.unit_price_irt)))) {
        return toast({ title: `قیمت هر ${CURRENCY_LABEL[e.currency]} برای «${e.title}» را وارد کنید`, variant: "destructive" });
      }
    }
    setStep(2);
  };

  const toggleAlloc = (entryIdx: number, userId: number, checked: boolean) => {
    setAllocs(prev => prev.map((m, i) => {
      if (i !== entryIdx) return m;
      const next = { ...m };
      if (checked) { if (next[userId] === undefined) next[userId] = "0"; }
      else { delete next[userId]; }
      return next;
    }));
  };

  const setAllocVal = (entryIdx: number, userId: number, raw: string) => {
    const v = normDigits(raw);
    setAllocs(prev => prev.map((m, i) => i === entryIdx ? { ...m, [userId]: v } : m));
  };

  const save = async () => {
    // Validate per-entry sums
    for (let i = 0; i < entries.length; i++) {
      const sum = Object.values(allocs[i] || {}).reduce((s, v) => s + (parseFloat(v) || 0), 0);
      const amt = parseFloat(entries[i].amount) || 0;
      if (sum - amt > 0.0001) {
        return toast({ title: "خطا", description: `مجموع تخصیص‌های سکشن «${entries[i].title}» از مبلغ آن بیشتر است`, variant: "destructive" });
      }
    }
    setBusy(true);
    try {
      const payload = {
        id: editing?.id,
        name: name.trim(),
        tolerance_percent: parseFloat(normDigits(tolerancePercent)) || 0,
        entries: entries.map(e => ({
          id: e.id,
          title: e.title.trim(),
          amount: parseFloat(e.amount) || 0,
          currency: e.currency,
          unit_price_irt: e.currency === "IRT" ? 1 : (parseFloat(e.unit_price_irt) || 0),
        })),
        users: allocs.flatMap((m, idx) =>
          Object.entries(m).map(([uid, v]) => ({
            entry_index: idx,
            id: Number(uid),
            allocated: parseFloat(v) || 0,
          }))
        ),
      };
      const url = editing ? "/api/admin/card-update.php" : "/api/admin/card-create.php";
      await api(url, { method: "POST", body: JSON.stringify(payload) });
      toast({ title: editing ? "کارت ویرایش شد" : "کارت ساخته شد" });
      onSaved();
    } catch (e) {
      toast({ title: "خطا", description: (e as Error).message, variant: "destructive" });
    } finally { setBusy(false); }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="max-w-3xl panel-fa max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-persian">
            {editing ? "ویرایش کارت" : "افزودن کارت جدید"} — مرحله {step} از ۲
          </DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="space-y-2">
                <Label className="text-persian">نام کارت</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} className="text-persian" />
              </div>
              <div className="space-y-2">
                <Label className="text-persian text-xs">تلورانس (٪)</Label>
                <Input
                  dir="ltr"
                  inputMode="decimal"
                  value={tolerancePercent}
                  onChange={(e) => setTolerancePercent(normDigits(e.target.value))}
                  placeholder="0"
                  className="tabular-nums"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-persian text-xs">موجودی کل (دلار)</Label>
                {(() => {
                  const usd = entries.filter(e => e.currency === "USD").reduce((s, e) => s + (parseFloat(e.amount) || 0), 0);
                  const tol = parseFloat(normDigits(tolerancePercent)) || 0;
                  const withTol = usd * (1 + tol / 100);
                  return (
                    <div className="h-10 px-3 flex flex-col justify-center rounded-md border bg-muted/40 tabular-nums text-persian leading-tight">
                      <span className="font-bold text-sm">{usd.toLocaleString("fa-IR")} دلار</span>
                      {tol > 0 && (
                        <span className="text-[10px] text-muted-foreground">با تلورانس: {withTol.toLocaleString("fa-IR", { maximumFractionDigits: 2 })} دلار</span>
                      )}
                    </div>
                  );
                })()}
              </div>
              <div className="space-y-2">
                <Label className="text-persian text-xs">موجودی کل (تومان)</Label>
                {(() => {
                  const tol = parseFloat(normDigits(tolerancePercent)) || 0;
                  const withTol = grandTotal * (1 + tol / 100);
                  return (
                    <div className="h-10 px-3 flex flex-col justify-center rounded-md border bg-primary/5 tabular-nums text-persian leading-tight">
                      <span className="font-bold text-sm">{fmtToman(grandTotal)}</span>
                      {tol > 0 && (
                        <span className="text-[10px] text-muted-foreground">با تلورانس: {fmtToman(withTol)}</span>
                      )}
                    </div>
                  );
                })()}
              </div>
            </div>


            <div className="space-y-3">
              <Label className="text-persian">سکشن‌های مبلغ</Label>
              {entries.map((e, i) => {
                const unitLabel = CURRENCY_LABEL[e.currency];
                return (
                  <div key={i} className="border rounded-md p-3 space-y-3 bg-muted/30">
                    <div className="flex items-center justify-between">
                      <span className="text-persian text-sm font-bold">سکشن {i + 1}</span>
                      {entries.length > 1 && (
                        <Button size="sm" variant="ghost" onClick={() => removeEntry(i)} className="text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-persian text-xs">عنوان مبلغ</Label>
                        {(() => {
                          const options = Array.from(new Set([...(sectionCategories || []), ...(e.title && !sectionCategories.includes(e.title) ? [e.title] : [])]));
                          return (
                            <Select value={e.title || undefined} onValueChange={(v) => updateEntry(i, { title: v })}>
                              <SelectTrigger className="text-persian">
                                <SelectValue placeholder="یک دسته را انتخاب کنید" />
                              </SelectTrigger>
                              <SelectContent>
                                {options.length === 0 ? (
                                  <div className="px-2 py-2 text-xs text-muted-foreground text-persian">
                                    ابتدا از تنظیمات دسته‌بندی سکشن‌ها اضافه کنید
                                  </div>
                                ) : options.map(opt => (
                                  <SelectItem key={opt} value={opt} className="text-persian">
                                    {opt}{!sectionCategories.includes(opt) ? " (سفارشی)" : ""}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          );
                        })()}
                      </div>
                      <div className="space-y-1">
                        <Label className="text-persian text-xs">مبلغ موجودی</Label>
                        <div className="flex gap-2">
                          <Input
                            value={e.amount}
                            onChange={(ev) => updateEntry(i, { amount: normDigits(ev.target.value) })}
                            inputMode="decimal"
                            placeholder="0"
                            className="flex-1"
                            dir="ltr"
                          />
                          <Select
                            value={e.currency}
                            onValueChange={(v) => updateEntry(i, { currency: v as Currency, unit_price_irt: v === "IRT" ? "" : e.unit_price_irt })}
                          >
                            <SelectTrigger className="w-28 text-persian"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="USD" className="text-persian">دلار</SelectItem>
                              <SelectItem value="EUR" className="text-persian">یورو</SelectItem>
                              <SelectItem value="IRT" className="text-persian">تومان</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-persian text-xs">
                          قیمت هر {unitLabel} (تومان)
                        </Label>
                        <Input
                          value={e.currency === "IRT" ? "1" : e.unit_price_irt}
                          onChange={(ev) => updateEntry(i, { unit_price_irt: normDigits(ev.target.value) })}
                          inputMode="decimal"
                          placeholder={`به ازای هر ${unitLabel}`}
                          disabled={e.currency === "IRT"}
                          dir="ltr"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-persian text-xs">مبلغ کل (تومان)</Label>
                        <div className="h-10 px-3 flex items-center rounded-md border bg-background font-bold tabular-nums text-persian">
                          {fmtToman(entryTotals[i] || 0)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <Button variant="outline" size="sm" onClick={addEntry} className="text-persian w-full">
                <Plus className="w-4 h-4 ml-1" /> افزودن سکشن جدید
              </Button>
            </div>

            <div className="rounded-md border p-3 bg-primary/5 text-persian flex items-center justify-between">
              <span className="text-sm text-muted-foreground">موجودی کل کارت</span>
              <span className="font-bold text-lg tabular-nums">{fmtToman(grandTotal)}</span>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={onClose} className="text-persian">انصراف</Button>
              <Button onClick={goStep2} className="text-persian">بعدی</Button>
            </DialogFooter>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="rounded-md border bg-muted/40 p-3 text-persian text-sm flex items-center justify-between">
              <span className="text-muted-foreground">موجودی کل کارت</span>
              <span className="font-bold tabular-nums">{fmtToman(grandTotal)}</span>
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-persian">تخصیص کاربران به هر سکشن</Label>
              <Button size="sm" variant="outline" onClick={() => setAddUserOpen(true)} className="text-persian">
                <UserPlus className="w-4 h-4 ml-1" /> افزودن کاربر
              </Button>
            </div>

            {loadingUsers ? (
              <div className="py-6 text-center"><Loader2 className="w-5 h-5 animate-spin inline" /></div>
            ) : users.length === 0 ? (
              <p className="py-6 text-center text-muted-foreground text-persian text-sm">
                هنوز کاربری ساخته نشده. روی «افزودن کاربر» بزنید.
              </p>
            ) : (
              <div className="space-y-3">
                {entries.map((e, i) => {
                  const m = allocs[i] || {};
                  const sum = Object.values(m).reduce((s, v) => s + (parseFloat(v) || 0), 0);
                  const amt = parseFloat(e.amount) || 0;
                  const over = sum - amt > 0.0001;
                  const remain = Math.max(0, amt - sum);
                  return (
                    <div key={i} className="border rounded-md p-3 space-y-2 bg-muted/20">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="text-persian text-sm font-bold">
                          {e.title || `سکشن ${i + 1}`}
                          <span className="text-muted-foreground font-normal mr-2 text-xs">
                            ({fmtMoney(amt, e.currency)})
                          </span>
                        </div>
                        <div className={`text-xs font-medium ${over ? "text-destructive" : "text-emerald-600"}`}>
                          {over
                            ? `${fmtMoney(sum - amt, e.currency)} بیشتر از مبلغ سکشن`
                            : `باقی‌مانده: ${fmtMoney(remain, e.currency)}`}
                        </div>
                      </div>
                      <ul className="divide-y">
                        {users.map(u => {
                          const selected = m[u.id] !== undefined;
                          return (
                            <li key={u.id} className="flex items-center gap-3 py-2">
                              <Checkbox
                                checked={selected}
                                onCheckedChange={(c) => toggleAlloc(i, u.id, !!c)}
                                id={`u-${i}-${u.id}`}
                              />
                              <label htmlFor={`u-${i}-${u.id}`} className="flex-1 cursor-pointer text-persian text-sm">
                                {u.first_name} {u.last_name}
                                <span className="text-muted-foreground text-xs mr-2">@{u.username}</span>
                              </label>
                              {selected && (
                                <div className="flex items-center gap-1">
                                  <Input
                                    value={m[u.id]}
                                    onChange={(ev) => setAllocVal(i, u.id, ev.target.value)}
                                    inputMode="decimal"
                                    className="w-28 h-9 text-right"
                                    dir="ltr"
                                  />
                                  <span className="text-xs text-muted-foreground text-persian">
                                    {CURRENCY_LABEL[e.currency]}
                                  </span>
                                </div>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setStep(1)} className="text-persian">قبلی</Button>
              {(() => {
                const anyOver = entries.some((e, i) => {
                  const sum = Object.values(allocs[i] || {}).reduce((s, v) => s + (parseFloat(v) || 0), 0);
                  return sum - (parseFloat(e.amount) || 0) > 0.0001;
                });
                return (
                  <Button onClick={save} disabled={busy || anyOver} className="text-persian">
                    {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : "ثبت"}
                  </Button>
                );
              })()}
            </DialogFooter>

            <AddUserDialog
              open={addUserOpen}
              onClose={() => setAddUserOpen(false)}
              onCreated={(u) => {
                setUsers(prev => [u, ...prev]);
                setAddUserOpen(false);
              }}
              toast={toast}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

const AddUserDialog = ({
  open, onClose, onCreated, toast,
}: {
  open: boolean;
  onClose: () => void;
  onCreated: (u: CardUser) => void;
  toast: ReturnType<typeof useToast>["toast"];
}) => {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (open) { setFirst(""); setLast(""); setUsername(""); setPassword(""); }
  }, [open]);

  const submit = async () => {
    setBusy(true);
    try {
      const res = await api<{ id: number; first_name: string; last_name: string; username: string }>(
        "/api/admin/card-user-create.php",
        { method: "POST", body: JSON.stringify({ first_name: first, last_name: last, username, password }) }
      );
      toast({ title: "کاربر ساخته شد" });
      onCreated({ id: res.id, first_name: res.first_name, last_name: res.last_name, username: res.username });
    } catch (e) {
      toast({ title: "خطا", description: (e as Error).message, variant: "destructive" });
    } finally { setBusy(false); }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="max-w-md panel-fa">
        <DialogHeader>
          <DialogTitle className="text-persian">افزودن کاربر جدید</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-persian">نام</Label>
              <Input value={first} onChange={(e) => setFirst(e.target.value)} className="text-persian" />
            </div>
            <div className="space-y-2">
              <Label className="text-persian">نام خانوادگی</Label>
              <Input value={last} onChange={(e) => setLast(e.target.value)} className="text-persian" />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-persian">نام کاربری (انگلیسی)</Label>
            <Input value={username} onChange={(e) => setUsername(e.target.value)} dir="ltr" />
          </div>
          <div className="space-y-2">
            <Label className="text-persian">رمز عبور (حداقل ۶ کاراکتر)</Label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} dir="ltr" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="text-persian">انصراف</Button>
          <Button onClick={submit} disabled={busy} className="text-persian">
            {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : "ساختن"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface LogRow {
  id: number;
  card_id: number;
  card_user_id: number | null;
  admin_username: string | null;
  action: "create" | "update" | "delete" | "card_balance" | "card_delete";
  before_allocated: number | null;
  after_allocated: number | null;
  currency: Currency | null;
  user_label: string | null;
  note: string | null;
  created_at: string;
}

const ACTION_LABEL: Record<LogRow["action"], string> = {
  create: "تخصیص جدید",
  update: "تغییر تخصیص",
  delete: "حذف تخصیص",
  card_balance: "تغییر موجودی کارت",
  card_delete: "حذف کارت",
};

const LogsDialog = ({
  card, onClose, toast,
}: {
  card: CardRow | null;
  onClose: () => void;
  toast: ReturnType<typeof useToast>["toast"];
}) => {
  const [rows, setRows] = useState<LogRow[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!card) return;
    setLoading(true);
    api<{ items: LogRow[] }>(`/api/admin/card-logs.php?card_id=${card.id}`)
      .then((r) => setRows(r.items || []))
      .catch((e) => toast({ title: "خطا", description: (e as Error).message, variant: "destructive" }))
      .finally(() => setLoading(false));
  }, [card, toast]);

  const fmtDate = (s: string) => {
    try { return new Date(s.replace(" ", "T")).toLocaleString("fa-IR"); }
    catch { return s; }
  };

  return (
    <Dialog open={!!card} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="max-w-2xl panel-fa">
        <DialogHeader>
          <DialogTitle className="text-persian">
            تاریخچهٔ تغییرات — {card?.name}
          </DialogTitle>
        </DialogHeader>
        {loading ? (
          <div className="py-10 text-center"><Loader2 className="w-5 h-5 animate-spin inline" /></div>
        ) : rows.length === 0 ? (
          <p className="py-8 text-center text-muted-foreground text-persian text-sm">
            هنوز تغییری ثبت نشده.
          </p>
        ) : (
          <div className="max-h-[60vh] overflow-auto border rounded-md divide-y">
            {rows.map((r) => {
              const cur = (r.currency || "IRT") as Currency;
              const change =
                r.action === "card_delete"
                  ? "—"
                  : `${fmtMoney(r.before_allocated ?? 0, cur)} ← ${fmtMoney(r.after_allocated ?? 0, cur)}`;
              const color =
                r.action === "delete" || r.action === "card_delete" ? "text-destructive"
                : r.action === "create" ? "text-emerald-600"
                : "text-foreground";
              return (
                <div key={r.id} className="p-3 text-persian text-sm flex flex-col md:flex-row md:items-center md:justify-between gap-1">
                  <div className="flex flex-col gap-0.5">
                    <span className={`font-bold ${color}`}>{ACTION_LABEL[r.action]}</span>
                    {r.user_label && (
                      <span className="text-xs text-muted-foreground">{r.user_label}</span>
                    )}
                    {r.note && <span className="text-xs text-muted-foreground">{r.note}</span>}
                  </div>
                  <div className="flex flex-col md:items-end gap-0.5 tabular-nums">
                    <span className="font-medium">{change}</span>
                    <span className="text-xs text-muted-foreground">
                      {fmtDate(r.created_at)} — {r.admin_username || "—"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="text-persian">بستن</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const UserPricesDialog = ({
  card, onClose, onSaved, toast,
}: {
  card: CardRow | null;
  onClose: () => void;
  onSaved: () => void;
  toast: ReturnType<typeof useToast>["toast"];
}) => {
  const [drafts, setDrafts] = useState<Record<number, string>>({});
  const [busy, setBusy] = useState<number | null>(null);
  const [search, setSearch] = useState<Record<number, string>>({});

  useEffect(() => {
    if (!card) return;
    const d: Record<number, string> = {};
    (card.entries || []).forEach(e => {
      e.users.forEach(u => {
        if (u.access_id !== undefined) {
          d[u.access_id] = u.custom_unit_price_irt != null ? String(u.custom_unit_price_irt) : "";
        }
      });
    });
    setDrafts(d);
    setSearch({});
  }, [card]);

  if (!card) return null;

  const save = async (accessId: number) => {
    setBusy(accessId);
    try {
      const v = normDigits(drafts[accessId] ?? "");
      await api("/api/admin/card-user-price-update.php", {
        method: "POST",
        body: JSON.stringify({ access_id: accessId, custom_unit_price_irt: v === "" ? null : Number(v) }),
      });
      toast({ title: "ذخیره شد" });
      onSaved();
    } catch (e) {
      toast({ title: "خطا", description: (e as Error).message, variant: "destructive" });
    } finally { setBusy(null); }
  };

  return (
    <Dialog open={!!card} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="max-w-3xl panel-fa max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-persian">قیمت دلار سفارشی کاربران — {card.name}</DialogTitle>
        </DialogHeader>
        <p className="text-xs text-muted-foreground text-persian">
          قیمتی که در اینجا برای هر کاربر ثبت می‌کنید، فقط برای همان کاربر نمایش داده می‌شود. تا زمانی که قیمتی وارد نکنید، کاربر هیچ قیمتی را نمی‌بیند.
        </p>
        <div className="space-y-3">
          {(card.entries || []).filter(e => e.users.length > 0 && e.currency !== "IRT").map(e => {
            const q = (search[e.id] || "").trim().toLowerCase();
            const filtered = q
              ? e.users.filter(u =>
                  `${u.first_name} ${u.last_name} ${u.username}`.toLowerCase().includes(q))
              : e.users;
            return (
              <div key={e.id} className="border rounded-md p-3 bg-muted/30">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                  <div className="text-persian font-bold">{e.title}</div>
                  <Input
                    value={search[e.id] || ""}
                    onChange={(ev) => setSearch(prev => ({ ...prev, [e.id]: ev.target.value }))}
                    placeholder="جستجوی نام کاربر…"
                    className="h-9 w-full sm:w-64 text-persian"
                  />
                </div>
                {filtered.length === 0 ? (
                  <p className="text-center text-muted-foreground text-persian text-sm py-3">کاربری مطابق جستجو پیدا نشد.</p>
                ) : (
                  <ul className="divide-y">
                    {filtered.map(u => (
                      <li key={u.access_id} className="flex items-center gap-3 py-2 flex-wrap">
                        <div className="flex-1 text-persian text-sm min-w-[160px]">
                          {u.first_name} {u.last_name}
                          <span className="text-muted-foreground text-xs mr-2">({u.allocated.toLocaleString("fa-IR")} {CURRENCY_LABEL[e.currency]})</span>
                        </div>
                        <Input
                          value={u.access_id !== undefined ? (drafts[u.access_id] ?? "") : ""}
                          onChange={(ev) => u.access_id !== undefined && setDrafts(prev => ({ ...prev, [u.access_id!]: normDigits(ev.target.value) }))}
                          placeholder={`قیمت هر ${CURRENCY_LABEL[e.currency]}`}
                          className="w-40 h-9" dir="ltr" inputMode="decimal"
                        />
                        <Button
                          size="sm"
                          disabled={busy === u.access_id}
                          onClick={() => u.access_id !== undefined && save(u.access_id)}
                          className="text-persian"
                        >
                          {busy === u.access_id ? <Loader2 className="w-4 h-4 animate-spin" /> : "ذخیره"}
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
          {(card.entries || []).every(e => e.users.length === 0 || e.currency === "IRT") && (
            <p className="text-center text-muted-foreground text-persian text-sm py-6">
              هیچ کاربری به سکشن‌های ارزی این کارت تخصیص داده نشده.
            </p>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="text-persian">بستن</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface ReportKotaj {
  id: number;
  entry_id: number;
  entry_title: string | null;
  kotaj_number: string;
  kotaj_date_jalali: string;
  total_value_usd: number;
  toman_total?: number;
  created_at: string;
  attachments?: string[] | null;
  items: { name: string; value_usd: number; unit_price_irt: number; toman?: number }[];
}
interface ReportUser {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  total_usd: number;
  total_toman?: number;
  payments_toman?: number;
  debt_toman?: number;
  kotajs: ReportKotaj[];
}

const KotajReportDialog = ({
  card, onClose, toast,
}: {
  card: CardRow | null;
  onClose: () => void;
  toast: ReturnType<typeof useToast>["toast"];
}) => {
  const [users, setUsers] = useState<ReportUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [openId, setOpenId] = useState<number | null>(null);
  const [q, setQ] = useState("");
  const [entryFilter, setEntryFilter] = useState<string>("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [editKotaj, setEditKotaj] = useState<ReportKotaj | null>(null);
  const [deleteKotaj, setDeleteKotaj] = useState<ReportKotaj | null>(null);
  const [busyDel, setBusyDel] = useState(false);

  const reload = useCallback(() => {
    if (!card) return;
    setLoading(true);
    api<{ users: ReportUser[] }>(`/api/admin/card-kotaj-report.php?card_id=${card.id}`)
      .then(r => setUsers(r.users || []))
      .catch(e => toast({ title: "خطا", description: (e as Error).message, variant: "destructive" }))
      .finally(() => setLoading(false));
  }, [card, toast]);

  useEffect(() => {
    if (!card) return;
    setQ(""); setEntryFilter("all"); setDateFrom(""); setDateTo("");
    reload();
  }, [card, reload]);

  const doDelete = async () => {
    if (!deleteKotaj) return;
    setBusyDel(true);
    try {
      await api("/api/admin/kotaj-delete.php", {
        method: "POST",
        body: JSON.stringify({ id: deleteKotaj.id }),
      });
      toast({ title: "کوتاژ حذف شد" });
      setDeleteKotaj(null);
      reload();
    } catch (e) {
      toast({ title: "خطا", description: (e as Error).message, variant: "destructive" });
    } finally { setBusyDel(false); }
  };

  if (!card) return null;

  const qN = normDigits(q).trim();
  const fromN = normDigits(dateFrom).trim();
  const toN = normDigits(dateTo).trim();
  const allEntries = Array.from(new Map(
    users.flatMap(u => u.kotajs).map(k => [k.entry_id, k.entry_title || "—"])
  ).entries());

  const filteredUsers = users.map(u => ({
    ...u,
    kotajs: u.kotajs.filter(k => {
      if (qN && !normDigits(k.kotaj_number).includes(qN)) return false;
      if (entryFilter !== "all" && String(k.entry_id) !== entryFilter) return false;
      const d = normDigits(k.kotaj_date_jalali);
      if (fromN && d < fromN) return false;
      if (toN && d > toN) return false;
      return true;
    }),
  })).filter(u => u.kotajs.length > 0);

  const grandUsd = filteredUsers.reduce((s, u) => s + u.kotajs.reduce((a, k) => a + k.total_value_usd, 0), 0);
  const grandToman = filteredUsers.reduce((s, u) => s + u.kotajs.reduce((a, k) => a + (k.toman_total || 0), 0), 0);
  const hasFilter = !!(q || entryFilter !== "all" || dateFrom || dateTo);

  return (
    <Dialog open={!!card} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="max-w-4xl panel-fa max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-persian">گزارش کارت — {card.name}</DialogTitle>
        </DialogHeader>

        {users.length > 0 && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
              <div className="rounded-md border p-3 bg-muted/30">
                <div className="text-xs text-muted-foreground text-persian">جمع دلاری</div>
                <div className="text-lg font-bold tabular-nums">{grandUsd.toLocaleString("fa-IR")} دلار</div>
              </div>
              <div className="rounded-md border p-3 bg-muted/30">
                <div className="text-xs text-muted-foreground text-persian">جمع تومانی</div>
                <div className="text-lg font-bold tabular-nums text-primary">{fmtToman(grandToman)}</div>
              </div>
              <div className="rounded-md border p-3 bg-muted/30">
                <div className="text-xs text-muted-foreground text-persian">تعداد کاربر</div>
                <div className="text-lg font-bold tabular-nums">{filteredUsers.length.toLocaleString("fa-IR")}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="جستجوی شماره کوتاژ" className="text-persian pr-8" dir="ltr" />
              </div>
              <Select value={entryFilter} onValueChange={setEntryFilter}>
                <SelectTrigger className="text-persian"><SelectValue placeholder="همه سکشن‌ها" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-persian">همه سکشن‌ها</SelectItem>
                  {allEntries.map(([id, title]) => (
                    <SelectItem key={id} value={String(id)} className="text-persian">{title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} placeholder="از تاریخ (1405/01/01)" className="text-persian" dir="ltr" />
              <Input value={dateTo} onChange={(e) => setDateTo(e.target.value)} placeholder="تا تاریخ (1405/12/29)" className="text-persian" dir="ltr" />
              {hasFilter && (
                <div className="md:col-span-2 flex justify-end">
                  <Button size="sm" variant="ghost" onClick={() => { setQ(""); setEntryFilter("all"); setDateFrom(""); setDateTo(""); }} className="text-persian">
                    پاک کردن فیلتر
                  </Button>
                </div>
              )}
            </div>
          </>
        )}

        {loading ? (
          <div className="py-8 text-center"><Loader2 className="w-5 h-5 animate-spin inline" /></div>
        ) : users.length === 0 ? (
          <p className="py-8 text-center text-muted-foreground text-persian text-sm">هنوز کوتاژی برای این کارت ثبت نشده.</p>
        ) : filteredUsers.length === 0 ? (
          <p className="py-8 text-center text-muted-foreground text-persian text-sm">موردی با فیلتر مطابقت ندارد.</p>
        ) : (
          <div className="space-y-4">
            {filteredUsers.map(u => {
              const userToman = u.kotajs.reduce((a, k) => a + (k.toman_total || 0), 0);
              const userUsd = u.kotajs.reduce((a, k) => a + k.total_value_usd, 0);
              return (
              <div key={u.id} className="border rounded-md p-3">
                <div className="flex justify-between items-start mb-3 flex-wrap gap-2 border-b pb-2">
                  <div className="text-persian">
                    <div className="font-bold">
                      {u.first_name} {u.last_name}
                      <span className="text-xs text-muted-foreground font-normal mr-2">@{u.username}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{u.kotajs.length.toLocaleString("fa-IR")} کوتاژ</div>
                  </div>
                  <div className="text-persian text-sm text-right space-y-0.5">
                    <div>جمع دلار: <span className="font-bold tabular-nums text-primary">{userUsd.toLocaleString("fa-IR")} دلار</span></div>
                    <div>جمع تومان: <span className="font-bold tabular-nums">{fmtToman(userToman)}</span></div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  {u.kotajs.map(k => (
                    <div key={k.id} className="border rounded-md">
                      <div className="w-full flex items-center justify-between text-right hover:bg-muted/30 gap-2 p-1">
                        <button className="flex-1 flex items-center justify-between p-2" onClick={() => setOpenId(openId === k.id ? null : k.id)}>
                          <div className="flex-1 text-persian text-sm text-right">
                            <span className="font-bold">#{k.kotaj_number}</span>
                            <span className="text-xs text-muted-foreground mr-2">{k.kotaj_date_jalali} — {k.entry_title || "—"}</span>
                          </div>
                          <div className="text-persian font-bold tabular-nums text-right">
                            <div>{k.total_value_usd.toLocaleString("fa-IR")} دلار</div>
                            {(k.toman_total || 0) > 0 && (
                              <div className="text-xs text-muted-foreground">{fmtToman(k.toman_total || 0)}</div>
                            )}
                          </div>
                          {openId === k.id ? <ChevronUp className="w-4 h-4 mr-2" /> : <ChevronDown className="w-4 h-4 mr-2" />}
                        </button>
                        <Button size="sm" variant="ghost" title="دانلود PDF" onClick={() => downloadKotajPdf({
                          id: k.id,
                          kotaj_number: k.kotaj_number,
                          kotaj_date_jalali: k.kotaj_date_jalali,
                          entry_title: k.entry_title,
                          total_value_usd: k.total_value_usd,
                          toman_total: k.toman_total,
                          items: k.items.map(it => ({ ...it, toman: it.toman ?? it.value_usd * it.unit_price_irt })),
                        }, `${card.name} — ${u.first_name} ${u.last_name}`)}>
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" title="ویرایش کوتاژ" onClick={() => setEditKotaj(k)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" title="حذف کوتاژ" onClick={() => setDeleteKotaj(k)} className="text-destructive hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      {openId === k.id && (
                        <div className="border-t p-2 space-y-1 bg-muted/20">
                          {k.items.map((it, i) => {
                            const t = it.toman ?? it.value_usd * it.unit_price_irt;
                            return (
                            <div key={i} className="flex justify-between text-persian text-sm gap-2">
                              <span className="flex-1">{it.name}</span>
                              <span className="tabular-nums text-right">
                                <span>{it.value_usd.toLocaleString("fa-IR")} دلار</span>
                                {it.unit_price_irt > 0 && (
                                  <span className="text-xs text-muted-foreground block">
                                    {it.unit_price_irt.toLocaleString("fa-IR")} ت/دلار = <strong className="text-primary">{fmtToman(t)}</strong>
                                  </span>
                                )}
                              </span>
                            </div>
                          );})}
                          {(k.toman_total || 0) > 0 && (
                            <div className="border-t pt-2 mt-2 flex justify-between text-persian text-sm">
                              <span className="font-bold">مجموع تومانی</span>
                              <span className="font-bold tabular-nums text-primary">{fmtToman(k.toman_total || 0)}</span>
                            </div>
                          )}
                          {Array.isArray(k.attachments) && k.attachments.length > 0 && (
                            <div className="border-t pt-2 mt-2">
                              <div className="text-persian text-xs text-muted-foreground mb-1">فایل‌های پیوست:</div>
                              <div className="flex flex-wrap gap-2">
                                {k.attachments.map((p, i) => (
                                  <a key={i} href={p} target="_blank" rel="noopener noreferrer" className="text-xs text-primary underline break-all">
                                    فایل {(i + 1).toLocaleString("fa-IR")}
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );})}
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="text-persian">بستن</Button>
        </DialogFooter>
      </DialogContent>

      <AdminKotajEditDialog
        kotaj={editKotaj}
        onClose={() => setEditKotaj(null)}
        onSaved={() => { setEditKotaj(null); reload(); }}
        toast={toast}
      />

      <Dialog open={!!deleteKotaj} onOpenChange={(v) => { if (!v) setDeleteKotaj(null); }}>
        <DialogContent className="max-w-md panel-fa">
          <DialogHeader>
            <DialogTitle className="text-persian">حذف کوتاژ</DialogTitle>
          </DialogHeader>
          <p className="text-persian text-sm">
            آیا از حذف کوتاژ <strong className="tabular-nums">#{deleteKotaj?.kotaj_number}</strong> مطمئن هستید؟ این عملیات قابل بازگشت نیست.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteKotaj(null)} className="text-persian" disabled={busyDel}>انصراف</Button>
            <Button variant="destructive" onClick={doDelete} disabled={busyDel} className="text-persian">
              {busyDel ? <Loader2 className="w-4 h-4 animate-spin" /> : "حذف"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
};

interface KotajEditItem { name: string; value_usd: string; unit_price_irt: string; }

const AdminKotajEditDialog = ({
  kotaj, onClose, onSaved, toast,
}: {
  kotaj: ReportKotaj | null;
  onClose: () => void;
  onSaved: () => void;
  toast: ReturnType<typeof useToast>["toast"];
}) => {
  const [num, setNum] = useState("");
  const [date, setDate] = useState("");
  const [items, setItems] = useState<KotajEditItem[]>([{ name: "", value_usd: "", unit_price_irt: "" }]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (kotaj) {
      setNum(kotaj.kotaj_number);
      setDate(kotaj.kotaj_date_jalali);
      setItems(kotaj.items.length
        ? kotaj.items.map(it => ({
            name: it.name,
            value_usd: String(it.value_usd),
            unit_price_irt: String(it.unit_price_irt),
          }))
        : [{ name: "", value_usd: "", unit_price_irt: "" }]);
    }
  }, [kotaj]);

  if (!kotaj) return null;

  const update = (i: number, patch: Partial<KotajEditItem>) =>
    setItems(prev => prev.map((it, idx) => idx === i ? { ...it, ...patch } : it));
  const add = () => setItems(prev => [...prev, { name: "", value_usd: "", unit_price_irt: "" }]);
  const remove = (i: number) => setItems(prev => prev.length > 1 ? prev.filter((_, idx) => idx !== i) : prev);

  const totalUsd = items.reduce((s, it) => s + (parseFloat(normDigits(it.value_usd)) || 0), 0);
  const totalToman = items.reduce((s, it) => {
    const v = parseFloat(normDigits(it.value_usd)) || 0;
    const p = parseFloat(normDigits(it.unit_price_irt)) || 0;
    return s + v * p;
  }, 0);

  const save = async () => {
    const numClean = normDigits(num).replace(/\D/g, "");
    if (!numClean) { toast({ title: "شماره کوتاژ معتبر نیست", variant: "destructive" }); return; }
    if (!/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(normDateDigits(date))) { toast({ title: "تاریخ کوتاژ معتبر نیست (1405/01/01)", variant: "destructive" }); return; }
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      if (!it.name.trim()) { toast({ title: `نام کالای قلم ${i + 1}`, variant: "destructive" }); return; }
      const v = parseFloat(normDigits(it.value_usd)) || 0;
      if (v <= 0) { toast({ title: `ارزش کالای «${it.name}»`, variant: "destructive" }); return; }
    }
    setBusy(true);
    try {
      await api("/api/admin/kotaj-update.php", {
        method: "POST",
        body: JSON.stringify({
          id: kotaj.id,
          kotaj_number: numClean,
          kotaj_date_jalali: normDateDigits(date),
          items: items.map(it => ({
            name: it.name.trim(),
            value_usd: parseFloat(normDigits(it.value_usd)) || 0,
            unit_price_irt: parseFloat(normDigits(it.unit_price_irt)) || 0,
          })),
        }),
      });
      toast({ title: "کوتاژ ویرایش شد" });
      onSaved();
    } catch (e) {
      toast({ title: "خطا", description: (e as Error).message, variant: "destructive" });
    } finally { setBusy(false); }
  };

  return (
    <Dialog open={!!kotaj} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="max-w-2xl panel-fa max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-persian">ویرایش کوتاژ — #{kotaj.kotaj_number}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-persian">شماره کوتاژ</Label>
              <Input value={num} onChange={(e) => setNum(normDigits(e.target.value))} dir="ltr" inputMode="numeric" />
            </div>
            <div className="space-y-2">
              <Label className="text-persian">تاریخ کوتاژ (شمسی)</Label>
              <Input value={date} onChange={(e) => setDate(normDateDigits(e.target.value))} dir="ltr" placeholder="1405/02/31" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-persian">قلم‌های کوتاژ</Label>
              <div className="text-sm font-bold tabular-nums text-persian">جمع: {totalUsd.toLocaleString("fa-IR")} دلار</div>
            </div>
            {items.map((it, i) => (
              <div key={i} className="border rounded-md p-3 space-y-3 bg-muted/30">
                <div className="flex items-center justify-between">
                  <span className="text-persian text-sm font-bold">قلم {i + 1}</span>
                  {items.length > 1 && (
                    <Button size="sm" variant="ghost" onClick={() => remove(i)} className="text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <Label className="text-persian text-xs">نام کالا</Label>
                    <Input value={it.name} onChange={(e) => update(i, { name: e.target.value })} className="text-persian" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-persian text-xs">ارزش (دلار)</Label>
                    <Input value={it.value_usd} onChange={(e) => update(i, { value_usd: normDigits(e.target.value) })} dir="ltr" inputMode="decimal" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-persian text-xs">قیمت هر دلار (تومان)</Label>
                    <Input value={it.unit_price_irt} onChange={(e) => update(i, { unit_price_irt: normDigits(e.target.value) })} dir="ltr" inputMode="decimal" />
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={add} className="text-persian w-full">
              <Plus className="w-4 h-4 ml-1" /> افزودن قلم
            </Button>
          </div>

          <div className="rounded-md border p-3 bg-primary/5 text-persian space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">ارزش کل</span>
              <span className="font-bold text-lg tabular-nums">{totalUsd.toLocaleString("fa-IR")} دلار</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">هزینهٔ کل (تومان)</span>
              <span className="font-bold text-lg tabular-nums text-primary">{fmtToman(totalToman)}</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="text-persian" disabled={busy}>انصراف</Button>
          <Button onClick={save} disabled={busy} className="text-persian">
            {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : "ذخیره ویرایش"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface AdminPayment {
  id: number;
  card_id: number;
  card_name: string;
  card_user_id: number;
  amount_irt: number;
  receipt_path: string | null;
  note: string | null;
  status: string;
  to_treasury?: number;
  created_at: string;
  first_name: string;
  last_name: string;
  username: string;
}

// Format an already-normalized digit string with thousand separators (Latin commas, LTR-safe).
const formatThousands = (raw: string): string => {
  if (!raw) return "";
  const cleaned = normDigits(raw);
  const [intP, decP] = cleaned.split(".");
  const withSep = intP.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return decP !== undefined ? `${withSep}.${decP}` : withSep;
};
const unformatThousands = (raw: string): string => normDigits(raw);

const toJalali = (iso: string): string => {
  if (!iso) return "—";
  const d = new Date(iso.replace(" ", "T"));
  if (isNaN(d.getTime())) return iso;
  try {
    const date = new Intl.DateTimeFormat("fa-IR-u-ca-persian-nu-latn", {
      year: "numeric", month: "2-digit", day: "2-digit",
    }).format(d);
    const time = new Intl.DateTimeFormat("fa-IR-u-nu-latn", {
      hour: "2-digit", minute: "2-digit", hour12: false,
    }).format(d);
    return `${date} ${time}`;
  } catch {
    return iso;
  }
};

const STATUS_FA: Record<string, string> = {
  confirmed: "تأیید شده",
  pending: "در انتظار",
  rejected: "رد شده",
};

const UsersManagementPanel = ({
  toast,
}: {
  toast: ReturnType<typeof useToast>["toast"];
}) => {
  const [items, setItems] = useState<CardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [edit, setEdit] = useState<CardUser | null>(null);
  const [form, setForm] = useState<{ first_name: string; last_name: string; username: string; password: string; require_payment_approval: number }>({
    first_name: "", last_name: "", username: "", password: "", require_payment_approval: 0,
  });
  const [saving, setSaving] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState<{ first_name: string; last_name: string; username: string; password: string; password2: string; require_payment_approval: number }>({
    first_name: "", last_name: "", username: "", password: "", password2: "", require_payment_approval: 0,
  });
  const [creating, setCreating] = useState(false);
  const [payUser, setPayUser] = useState<CardUser | null>(null);
  const [payData, setPayData] = useState<any>(null);
  const [payLoading, setPayLoading] = useState(false);
  const [kotajUser, setKotajUser] = useState<CardUser | null>(null);
  const [kotajData, setKotajData] = useState<any>(null);
  const [kotajLoading, setKotajLoading] = useState(false);
  const [billingUser, setBillingUser] = useState<CardUser | null>(null);

  const openPayments = (u: CardUser) => {
    setPayUser(u); setPayData(null); setPayLoading(true);
    api<any>(`/api/admin/card-user-payments.php?user_id=${u.id}`)
      .then(setPayData)
      .catch(e => toast({ title: "خطا", description: (e as Error).message, variant: "destructive" }))
      .finally(() => setPayLoading(false));
  };
  const openKotaj = (u: CardUser) => {
    setKotajUser(u); setKotajData(null); setKotajLoading(true);
    api<any>(`/api/admin/card-user-kotaj-report.php?user_id=${u.id}`)
      .then(setKotajData)
      .catch(e => toast({ title: "خطا", description: (e as Error).message, variant: "destructive" }))
      .finally(() => setKotajLoading(false));
  };

  const load = useCallback(() => {
    setLoading(true);
    api<{ items: CardUser[] }>("/api/admin/card-users-list.php")
      .then(r => setItems(r.items || []))
      .catch(e => toast({ title: "خطا", description: (e as Error).message, variant: "destructive" }))
      .finally(() => setLoading(false));
  }, [toast]);

  useEffect(() => { load(); }, [load]);

  const openEdit = (u: CardUser) => {
    setEdit(u);
    setForm({ first_name: u.first_name, last_name: u.last_name, username: u.username, password: "" });
  };

  const save = async () => {
    if (!edit) return;
    setSaving(true);
    try {
      await api("/api/admin/card-user-update.php", {
        method: "POST",
        body: JSON.stringify({ id: edit.id, ...form }),
      });
      toast({ title: "ذخیره شد" });
      setEdit(null);
      load();
    } catch (e) {
      toast({ title: "خطا", description: (e as Error).message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const createUser = async () => {
    const f = createForm;
    if (!f.first_name.trim() || !f.last_name.trim()) {
      toast({ title: "خطا", description: "نام و نام خانوادگی الزامی است", variant: "destructive" }); return;
    }
    if (!/^[A-Za-z0-9_.\-]{3,64}$/.test(f.username)) {
      toast({ title: "خطا", description: "نام کاربری نامعتبر است (حداقل ۳ کاراکتر، حروف/اعداد لاتین)", variant: "destructive" }); return;
    }
    if (f.password.length < 6) {
      toast({ title: "خطا", description: "رمز عبور حداقل ۶ کاراکتر باشد", variant: "destructive" }); return;
    }
    if (f.password !== f.password2) {
      toast({ title: "خطا", description: "رمز عبور و تکرار آن یکسان نیستند", variant: "destructive" }); return;
    }
    setCreating(true);
    try {
      await api("/api/admin/card-user-create.php", {
        method: "POST",
        body: JSON.stringify({ first_name: f.first_name, last_name: f.last_name, username: f.username, password: f.password }),
      });
      toast({ title: "کاربر ساخته شد" });
      setCreateOpen(false);
      load();
    } catch (e) {
      toast({ title: "خطا", description: (e as Error).message, variant: "destructive" });
    } finally {
      setCreating(false);
    }
  };


  const remove = async (u: CardUser) => {
    if (!confirm(`حذف کاربر ${u.first_name} ${u.last_name}؟`)) return;
    try {
      await api("/api/admin/card-user-delete.php", {
        method: "POST",
        body: JSON.stringify({ id: u.id }),
      });
      toast({ title: "حذف شد" });
      load();
    } catch (e) {
      toast({ title: "خطا", description: (e as Error).message, variant: "destructive" });
    }
  };

  const qN = q
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)))
    .trim().toLowerCase();
  const filtered = items.filter(u =>
    !qN || `${u.first_name} ${u.last_name} ${u.username} @${u.username}`.toLowerCase().includes(qN)
  );


  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <CardTitle className="text-persian flex items-center gap-2">
            مدیریت کاربران <Badge variant="secondary">{items.length}</Badge>
          </CardTitle>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="جستجو..."
                className="w-full sm:w-56 pr-8 text-persian"
              />
            </div>
            <Button variant="default" size="sm" onClick={() => { setCreateForm({ first_name: "", last_name: "", username: "", password: "", password2: "" }); setCreateOpen(true); }} className="gap-1.5">
              <Plus className="h-4 w-4" />
              <span className="text-persian">افزودن</span>
            </Button>
            <Button variant="outline" size="sm" onClick={load} disabled={loading}>
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
          </div>

        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
        ) : (
          <div className="overflow-x-auto ts-stack-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-persian">نام</TableHead>
                  <TableHead className="text-persian">نام خانوادگی</TableHead>
                  <TableHead className="text-persian">نام کاربری</TableHead>
                  <TableHead className="text-persian">تاریخ ساخت</TableHead>
                  <TableHead className="text-persian text-center">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground text-persian py-6">کاربری یافت نشد.</TableCell></TableRow>
                ) : filtered.map(u => (
                  <TableRow key={u.id}>
                    <TableCell data-label="نام" className="text-persian">{u.first_name}</TableCell>
                    <TableCell data-label="نام خانوادگی" className="text-persian">{u.last_name}</TableCell>
                    <TableCell data-label="نام کاربری" className="text-persian">@{u.username}</TableCell>
                    <TableCell data-label="تاریخ ساخت" className="text-persian text-xs text-muted-foreground">{u.created_at ? toJalali(u.created_at) : "—"}</TableCell>
                    <TableCell data-label="عملیات">
                      <div className="flex md:justify-center gap-1.5 flex-wrap">
                        <Button variant="outline" size="sm" onClick={() => openPayments(u)} title="گزارش پرداختی‌ها" className="gap-1.5">
                          <Wallet className="h-3.5 w-3.5" />
                          <span className="md:hidden text-persian text-xs">پرداختی‌ها</span>
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setBillingUser(u)} title="صورتحساب" className="gap-1.5">
                          <Receipt className="h-3.5 w-3.5" />
                          <span className="md:hidden text-persian text-xs">صورتحساب</span>
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => openKotaj(u)} title="گزارش کوتاژها" className="gap-1.5">
                          <FileText className="h-3.5 w-3.5" />
                          <span className="md:hidden text-persian text-xs">کوتاژها</span>
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => openEdit(u)} title="ویرایش" className="gap-1.5">
                          <Pencil className="h-3.5 w-3.5" />
                          <span className="md:hidden text-persian text-xs">ویرایش</span>
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => remove(u)} title="حذف" className="gap-1.5">
                          <Trash2 className="h-3.5 w-3.5" />
                          <span className="md:hidden text-persian text-xs">حذف</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <Dialog open={!!edit} onOpenChange={(o) => !o && setEdit(null)}>
          <DialogContent className="panel-fa max-w-md">
            <DialogHeader><DialogTitle className="text-persian">ویرایش کاربر</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div>
                <Label className="text-persian">نام</Label>
                <Input value={form.first_name} onChange={e => setForm(f => ({ ...f, first_name: e.target.value }))} className="text-persian" />
              </div>
              <div>
                <Label className="text-persian">نام خانوادگی</Label>
                <Input value={form.last_name} onChange={e => setForm(f => ({ ...f, last_name: e.target.value }))} className="text-persian" />
              </div>
              <div>
                <Label className="text-persian">نام کاربری</Label>
                <Input value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} dir="ltr" />
              </div>
              <div>
                <Label className="text-persian">رمز جدید (اختیاری)</Label>
                <Input type="text" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} dir="ltr" placeholder="خالی = بدون تغییر" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEdit(null)} disabled={saving}>انصراف</Button>
              <Button onClick={save} disabled={saving}>
                {saving && <Loader2 className="h-4 w-4 animate-spin ml-2" />}
                ذخیره
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={createOpen} onOpenChange={(o) => !creating && setCreateOpen(o)}>
          <DialogContent className="panel-fa max-w-md">
            <DialogHeader><DialogTitle className="text-persian">افزودن کاربر جدید</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div>
                <Label className="text-persian">نام</Label>
                <Input value={createForm.first_name} onChange={e => setCreateForm(f => ({ ...f, first_name: e.target.value }))} className="text-persian" />
              </div>
              <div>
                <Label className="text-persian">نام خانوادگی</Label>
                <Input value={createForm.last_name} onChange={e => setCreateForm(f => ({ ...f, last_name: e.target.value }))} className="text-persian" />
              </div>
              <div>
                <Label className="text-persian">نام کاربری</Label>
                <Input value={createForm.username} onChange={e => setCreateForm(f => ({ ...f, username: e.target.value }))} dir="ltr" placeholder="latin letters / digits" />
              </div>
              <div>
                <Label className="text-persian">تعیین رمز عبور</Label>
                <Input type="text" value={createForm.password} onChange={e => setCreateForm(f => ({ ...f, password: e.target.value }))} dir="ltr" placeholder="حداقل ۶ کاراکتر" />
              </div>
              <div>
                <Label className="text-persian">تایید رمز عبور</Label>
                <Input type="text" value={createForm.password2} onChange={e => setCreateForm(f => ({ ...f, password2: e.target.value }))} dir="ltr" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateOpen(false)} disabled={creating}>انصراف</Button>
              <Button onClick={createUser} disabled={creating}>
                {creating && <Loader2 className="h-4 w-4 animate-spin ml-2" />}
                افزودن
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>



        <UserBillingDialog
          open={!!billingUser}
          onClose={() => setBillingUser(null)}
          userId={billingUser?.id || 0}
          userName={billingUser ? `${billingUser.first_name} ${billingUser.last_name}`.trim() || billingUser.username : ""}
        />

        <Dialog open={!!payUser} onOpenChange={(o) => !o && setPayUser(null)}>
          <DialogContent className="panel-fa max-w-4xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-persian">
                پرداختی‌های {payUser?.first_name} {payUser?.last_name}
              </DialogTitle>
            </DialogHeader>
            {payLoading ? (
              <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
            ) : payData ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                  <div className="rounded-md border p-3 bg-muted/30">
                    <div className="text-xs text-muted-foreground text-persian">تعداد</div>
                    <div className="text-lg font-bold tabular-nums">{Number(payData.totals.count||0).toLocaleString("fa-IR")}</div>
                  </div>
                  <div className="rounded-md border p-3 bg-muted/30">
                    <div className="text-xs text-muted-foreground text-persian">جمع کل</div>
                    <div className="text-lg font-bold tabular-nums text-primary">{fmtToman(payData.totals.amount)}</div>
                  </div>
                  <div className="rounded-md border p-3 bg-muted/30">
                    <div className="text-xs text-muted-foreground text-persian">تأیید شده</div>
                    <div className="text-lg font-bold tabular-nums text-emerald-600">{fmtToman(payData.totals.confirmed)}</div>
                  </div>
                  <div className="rounded-md border p-3 bg-muted/30">
                    <div className="text-xs text-muted-foreground text-persian">در انتظار</div>
                    <div className="text-lg font-bold tabular-nums text-amber-600">{fmtToman(payData.totals.pending)}</div>
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-persian">کارت</TableHead>
                      <TableHead className="text-persian">مبلغ</TableHead>
                      <TableHead className="text-persian">وضعیت</TableHead>
                      <TableHead className="text-persian">تاریخ</TableHead>
                      <TableHead className="text-persian">یادداشت</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payData.items.length === 0 ? (
                      <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground text-persian py-6">پرداختی ثبت نشده است.</TableCell></TableRow>
                    ) : payData.items.map((p: any) => (
                      <TableRow key={p.id}>
                        <TableCell className="text-persian">{p.card_name}</TableCell>
                        <TableCell className="tabular-nums">{fmtToman(p.amount_irt)}</TableCell>
                        <TableCell className="text-persian text-xs">{STATUS_FA[p.status] || p.status}</TableCell>
                        <TableCell className="text-persian text-xs">{toJalali(p.created_at)}</TableCell>
                        <TableCell className="text-persian text-xs text-muted-foreground">{p.note || "—"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            ) : null}
          </DialogContent>
        </Dialog>

        <Dialog open={!!kotajUser} onOpenChange={(o) => !o && setKotajUser(null)}>
          <DialogContent className="panel-fa max-w-4xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-persian">
                کوتاژهای {kotajUser?.first_name} {kotajUser?.last_name}
              </DialogTitle>
            </DialogHeader>
            {kotajLoading ? (
              <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
            ) : kotajData ? (
              <>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="rounded-md border p-3 bg-muted/30">
                    <div className="text-xs text-muted-foreground text-persian">تعداد کوتاژ</div>
                    <div className="text-lg font-bold tabular-nums">{Number(kotajData.totals.count||0).toLocaleString("fa-IR")}</div>
                  </div>
                  <div className="rounded-md border p-3 bg-muted/30">
                    <div className="text-xs text-muted-foreground text-persian">مجموع (دلار)</div>
                    <div className="text-lg font-bold tabular-nums">{Number(kotajData.totals.usd||0).toLocaleString("fa-IR")}</div>
                  </div>
                  <div className="rounded-md border p-3 bg-muted/30">
                    <div className="text-xs text-muted-foreground text-persian">مجموع (تومان)</div>
                    <div className="text-lg font-bold tabular-nums text-primary">{fmtToman(kotajData.totals.toman)}</div>
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-persian">شماره کوتاژ</TableHead>
                      <TableHead className="text-persian">کارت / سکشن</TableHead>
                      <TableHead className="text-persian">تاریخ</TableHead>
                      <TableHead className="text-persian">دلار</TableHead>
                      <TableHead className="text-persian">تومان</TableHead>
                      <TableHead className="text-persian">پیوست</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {kotajData.items.length === 0 ? (
                      <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground text-persian py-6">کوتاژی ثبت نشده است.</TableCell></TableRow>
                    ) : kotajData.items.map((k: any) => (
                      <TableRow key={k.id}>
                        <TableCell className="text-persian">{k.kotaj_number}</TableCell>
                        <TableCell className="text-persian text-xs">{k.card_name}{k.entry_title ? ` — ${k.entry_title}` : ""}</TableCell>
                        <TableCell className="text-persian text-xs">
                          <div>{k.kotaj_date_gregorian || "—"}</div>
                          <div className="text-muted-foreground opacity-70">{k.kotaj_date_jalali || ""}</div>
                        </TableCell>
                        <TableCell className="tabular-nums">{Number(k.total_value_usd||0).toLocaleString("fa-IR")}</TableCell>
                        <TableCell className="tabular-nums text-primary">{fmtToman(k.toman_total)}</TableCell>
                        <TableCell className="text-xs">
                          {Array.isArray(k.attachments) && k.attachments.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {k.attachments.map((p: string, i: number) => (
                                <a key={i} href={p} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                                  {(i + 1).toLocaleString("fa-IR")}
                                </a>
                              ))}
                            </div>
                          ) : <span className="text-muted-foreground">—</span>}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            ) : null}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

const AllPaymentsPanel = ({
  toast, cards, onChanged,
}: {
  toast: ReturnType<typeof useToast>["toast"];
  cards: CardRow[];
  onChanged?: () => void;
}) => {
  const [items, setItems] = useState<AdminPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [cardFilter, setCardFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [editRow, setEditRow] = useState<AdminPayment | null>(null);
  const [editForm, setEditForm] = useState<{ amount: string; note: string; status: string; to_treasury: boolean }>({
    amount: "", note: "", status: "confirmed", to_treasury: true,
  });
  const [editSaving, setEditSaving] = useState(false);
  const [confirmDel, setConfirmDel] = useState<AdminPayment | null>(null);

  const openEdit = (p: AdminPayment) => {
    setEditRow(p);
    setEditForm({
      amount: String(p.amount_irt || ""),
      note: p.note || "",
      status: p.status || "confirmed",
      to_treasury: (p.to_treasury ?? 1) === 1,
    });
  };
  const saveEdit = async () => {
    if (!editRow) return;
    const amt = parseFloat(unformatThousands(editForm.amount));
    if (!amt || amt <= 0) {
      toast({ title: "مبلغ نامعتبر", variant: "destructive" });
      return;
    }
    setEditSaving(true);
    try {
      await api("/api/admin/card-user-payment-update.php", {
        method: "POST",
        body: JSON.stringify({
          id: editRow.id,
          amount_irt: amt,
          note: editForm.note,
          status: editForm.status,
          to_treasury: editForm.to_treasury ? 1 : 0,
        }),
      });
      toast({ title: "ذخیره شد" });
      setEditRow(null);
      load(); onChanged?.();
    } catch (e) {
      toast({ title: "خطا", description: (e as Error).message, variant: "destructive" });
    } finally { setEditSaving(false); }
  };
  const doDelete = async () => {
    if (!confirmDel) return;
    try {
      await api("/api/admin/card-user-payment-delete.php", {
        method: "POST",
        body: JSON.stringify({ id: confirmDel.id }),
      });
      toast({ title: "حذف شد" });
      setConfirmDel(null);
      load(); onChanged?.();
    } catch (e) {
      toast({ title: "خطا", description: (e as Error).message, variant: "destructive" });
    }
  };

  const load = useCallback(() => {
    setLoading(true);
    api<{ items: AdminPayment[] }>("/api/admin/payments-list-all.php")
      .then(r => setItems(r.items || []))
      .catch(e => toast({ title: "خطا", description: (e as Error).message, variant: "destructive" }))
      .finally(() => setLoading(false));
  }, [toast]);

  useEffect(() => { load(); }, [load]);

  const normFa = (s: string) =>
    normDateDigits(String(s || ""))
      .replace(/ي/g, "ی")
      .replace(/ك/g, "ک")
      .replace(/[\u200c\u200f\u200e]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  const qN = normFa(q);
  const qTokens = qN ? qN.split(" ").filter(Boolean) : [];
  const fromJ = normDateDigits(dateFrom).trim().replace(/-/g, "/");
  const toJ = normDateDigits(dateTo).trim().replace(/-/g, "/");

  const toJalaliDate = (iso: string): string => {
    if (!iso) return "";
    const d = new Date(iso.replace(" ", "T"));
    if (isNaN(d.getTime())) return "";
    try {
      return new Intl.DateTimeFormat("fa-IR-u-ca-persian-nu-latn", {
        year: "numeric", month: "2-digit", day: "2-digit",
      }).format(d).replace(/-/g, "/");
    } catch { return ""; }
  };

  const filtered = items.filter(p => {
    if (cardFilter !== "all" && String(p.card_id) !== cardFilter) return false;
    if (statusFilter !== "all" && p.status !== statusFilter) return false;
    if (fromJ || toJ) {
      const dj = toJalaliDate(p.created_at);
      if (fromJ && dj < fromJ) return false;
      if (toJ && dj > toJ) return false;
    }
    if (!qTokens.length) return true;
    const full = normFa(`${p.first_name} ${p.last_name} ${p.username} ${p.card_name} ${p.note || ""} ${p.amount_irt}`);
    return qTokens.every(t => full.includes(t));
  });

  const filteredSum = filtered.reduce((s, p) => s + p.amount_irt, 0);
  const confirmedSum = filtered.filter(p => p.status === "confirmed").reduce((s, p) => s + p.amount_irt, 0);

  const statusBadge = (s: string) => {
    if (s === "confirmed") return <Badge className="bg-emerald-600 hover:bg-emerald-700 text-persian">تأیید شده</Badge>;
    if (s === "pending") return <Badge variant="secondary" className="text-persian">در انتظار</Badge>;
    if (s === "rejected") return <Badge variant="destructive" className="text-persian">رد شده</Badge>;
    return <Badge variant="outline" className="text-persian">{s}</Badge>;
  };

  const isImage = (p?: string | null) => !!p && /\.(jpe?g|png|webp|gif)$/i.test(p);

  const downloadCsv = () => {
    const headers = ["کارت", "نام کاربر", "نام کاربری", "مبلغ (تومان)", "تاریخ", "وضعیت", "توضیح", "فیش"];
    const rows = filtered.map(p => [
      p.card_name,
      `${p.first_name} ${p.last_name}`,
      p.username,
      String(p.amount_irt),
      toJalali(p.created_at),
      STATUS_FA[p.status] || p.status,
      (p.note || "").replace(/[\r\n,]+/g, " "),
      p.receipt_path || "",
    ]);
    const csv = [headers, ...rows]
      .map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `payments-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadPdf = async () => {
    const { default: html2canvas } = await import("html2canvas");
    const { default: jsPDF } = await import("jspdf");
    const container = document.createElement("div");
    container.style.cssText = `position:fixed;top:-10000px;left:-10000px;width:1000px;padding:24px;background:#fff;color:#0f172a;font-family:"Vazirmatn","Tahoma",sans-serif;direction:rtl;text-align:right`;
    container.innerHTML = `
      <h2 style="font-size:20px;font-weight:800;margin:0 0 8px">گزارش پرداخت‌های کاربران</h2>
      <div style="font-size:12px;color:#64748b;margin-bottom:12px">تاریخ خروجی: ${toJalali(new Date().toISOString())} — تعداد: ${filtered.length.toLocaleString("fa-IR")} — جمع: ${fmtToman(filteredSum)}</div>
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead><tr style="background:#0f172a;color:#fff">
          <th style="padding:6px;border:1px solid #0f172a">#</th>
          <th style="padding:6px;border:1px solid #0f172a">کارت</th>
          <th style="padding:6px;border:1px solid #0f172a">کاربر</th>
          <th style="padding:6px;border:1px solid #0f172a">مبلغ (تومان)</th>
          <th style="padding:6px;border:1px solid #0f172a">تاریخ</th>
          <th style="padding:6px;border:1px solid #0f172a">وضعیت</th>
        </tr></thead>
        <tbody>${filtered.map((p, i) => `
          <tr>
            <td style="padding:6px;border:1px solid #cbd5e1">${(i + 1).toLocaleString("fa-IR")}</td>
            <td style="padding:6px;border:1px solid #cbd5e1">${p.card_name}</td>
            <td style="padding:6px;border:1px solid #cbd5e1">${p.first_name} ${p.last_name}<br/><span style="color:#64748b;font-size:10px">@${p.username}</span></td>
            <td style="padding:6px;border:1px solid #cbd5e1;font-weight:700">${fmtToman(p.amount_irt)}</td>
            <td style="padding:6px;border:1px solid #cbd5e1">${toJalali(p.created_at)}</td>
            <td style="padding:6px;border:1px solid #cbd5e1">${STATUS_FA[p.status] || p.status}</td>
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
      pdf.save(`payments-${new Date().toISOString().slice(0, 10)}.pdf`);
    } finally {
      document.body.removeChild(container);
    }
  };

  const hasFilter = !!(q || cardFilter !== "all" || statusFilter !== "all" || dateFrom || dateTo);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <CardTitle className="text-persian flex items-center gap-2">
            پرداخت‌های کاربران <Badge variant="secondary">{items.length}</Badge>
          </CardTitle>
          <div className="flex gap-2 flex-wrap">
            <Button size="sm" variant="outline" onClick={() => load()}>
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={downloadCsv} disabled={!filtered.length} className="text-persian">
              <Download className="w-4 h-4 ml-1" /> CSV
            </Button>
            <Button size="sm" variant="outline" onClick={downloadPdf} disabled={!filtered.length} className="text-persian">
              <Download className="w-4 h-4 ml-1" /> PDF
            </Button>
            <Button size="sm" variant="outline" onClick={() => window.print()} className="text-persian">
              چاپ
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <div className="rounded-md border p-3 bg-muted/30">
            <div className="text-xs text-muted-foreground text-persian">تعداد نمایش</div>
            <div className="text-lg font-bold tabular-nums">{filtered.length.toLocaleString("fa-IR")}</div>
          </div>
          <div className="rounded-md border p-3 bg-muted/30">
            <div className="text-xs text-muted-foreground text-persian">جمع نمایش</div>
            <div className="text-lg font-bold tabular-nums text-primary">{fmtToman(filteredSum)}</div>
          </div>
          <div className="rounded-md border p-3 bg-muted/30">
            <div className="text-xs text-muted-foreground text-persian">جمع تأییدشده</div>
            <div className="text-lg font-bold tabular-nums text-emerald-600">{fmtToman(confirmedSum)}</div>
          </div>
          <div className="rounded-md border p-3 bg-muted/30">
            <div className="text-xs text-muted-foreground text-persian">کل ردیف‌ها</div>
            <div className="text-lg font-bold tabular-nums">{items.length.toLocaleString("fa-IR")}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div className="relative md:col-span-3">
            <Search className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="جستجوی کاربر، کارت یا مبلغ" className="text-persian pr-8" />
          </div>
          <Select value={cardFilter} onValueChange={setCardFilter}>
            <SelectTrigger className="text-persian"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-persian">همه کارت‌ها</SelectItem>
              {cards.map(c => (
                <SelectItem key={c.id} value={String(c.id)} className="text-persian">{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="text-persian"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-persian">همه وضعیت‌ها</SelectItem>
              <SelectItem value="confirmed" className="text-persian">تأیید شده</SelectItem>
              <SelectItem value="pending" className="text-persian">در انتظار</SelectItem>
              <SelectItem value="rejected" className="text-persian">رد شده</SelectItem>
            </SelectContent>
          </Select>
          <div className="grid grid-cols-2 gap-2 md:col-span-1">
            <DatePicker
              value={dateFrom || ""}
              onChange={(d) => setDateFrom(d ? (d as DateObject).format("YYYY/MM/DD") : "")}
              calendar={persian}
              locale={persian_fa}
              inputClass="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-persian"
              format="YYYY/MM/DD"
              placeholder="از تاریخ (شمسی)"
            />
            <DatePicker
              value={dateTo || ""}
              onChange={(d) => setDateTo(d ? (d as DateObject).format("YYYY/MM/DD") : "")}
              calendar={persian}
              locale={persian_fa}
              inputClass="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-persian"
              format="YYYY/MM/DD"
              placeholder="تا تاریخ (شمسی)"
            />
          </div>
          {hasFilter && (
            <div className="md:col-span-3 flex justify-end">
              <Button size="sm" variant="ghost" onClick={() => { setQ(""); setCardFilter("all"); setStatusFilter("all"); setDateFrom(""); setDateTo(""); }} className="text-persian">
                پاک کردن فیلترها
              </Button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="py-8 text-center"><Loader2 className="w-5 h-5 animate-spin inline" /></div>
        ) : filtered.length === 0 ? (
          <p className="py-8 text-center text-muted-foreground text-persian text-sm">پرداختی برای نمایش وجود ندارد.</p>
        ) : (
          <div className="overflow-x-auto ts-stack-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-persian">کارت</TableHead>
                  <TableHead className="text-persian">کاربر</TableHead>
                  <TableHead className="text-persian">مبلغ (تومان)</TableHead>
                  <TableHead className="text-persian">تاریخ (شمسی)</TableHead>
                  <TableHead className="text-persian">وضعیت</TableHead>
                  <TableHead className="text-persian">فیش</TableHead>
                  <TableHead className="text-persian">توضیح</TableHead>
                  <TableHead className="text-persian text-center">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(p => (
                  <TableRow key={p.id}>
                    <TableCell data-label="کارت" className="text-persian font-medium">{p.card_name}</TableCell>
                    <TableCell data-label="کاربر" className="text-persian">
                      <div className="font-medium">{p.first_name} {p.last_name}</div>
                      <div className="text-xs text-muted-foreground">@{p.username}</div>
                    </TableCell>
                    <TableCell data-label="مبلغ (تومان)" className="tabular-nums font-bold">{fmtToman(p.amount_irt)}</TableCell>
                    <TableCell data-label="تاریخ" className="text-persian text-xs tabular-nums whitespace-nowrap">{toJalali(p.created_at)}</TableCell>
                    <TableCell data-label="وضعیت">{statusBadge(p.status)}</TableCell>
                    <TableCell data-label="فیش">
                      {p.receipt_path ? (
                        isImage(p.receipt_path) ? (
                          <button type="button" onClick={() => setPreview(p.receipt_path)} className="block" title="نمایش فیش">
                            <img src={p.receipt_path} alt="فیش" className="w-14 h-14 object-cover rounded border hover:opacity-80" />
                          </button>
                        ) : (
                          <a href={p.receipt_path} target="_blank" rel="noreferrer" className="text-primary text-persian text-sm underline">
                            مشاهده فایل
                          </a>
                        )
                      ) : (
                        <span className="text-muted-foreground text-xs text-persian">—</span>
                      )}
                    </TableCell>
                    <TableCell data-label="توضیح" className="text-persian text-xs md:max-w-[200px] md:truncate" title={p.note || ""}>
                      {p.note || "—"}
                    </TableCell>
                    <TableCell data-label="عملیات">
                      <div className="flex gap-1 md:justify-center">
                        <Button size="sm" variant="ghost" onClick={() => openEdit(p)} title="ویرایش" className="gap-1.5">
                          <Pencil className="w-3.5 h-3.5" />
                          <span className="md:hidden text-persian text-xs">ویرایش</span>
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => setConfirmDel(p)} title="حذف" className="gap-1.5">
                          <Trash2 className="w-3.5 h-3.5 text-destructive" />
                          <span className="md:hidden text-persian text-xs">حذف</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <Dialog open={!!editRow} onOpenChange={(o) => !o && setEditRow(null)}>
          <DialogContent className="panel-fa max-w-md">
            <DialogHeader><DialogTitle className="text-persian">ویرایش پرداخت کاربر</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div className="rounded border p-2 bg-muted/30 text-persian text-xs">
                {editRow?.card_name} — {editRow?.first_name} {editRow?.last_name}
              </div>
              <div>
                <Label className="text-persian text-xs">مبلغ (تومان)</Label>
                <Input
                  value={formatThousands(editForm.amount)}
                  onChange={(e) => setEditForm(f => ({ ...f, amount: unformatThousands(e.target.value) }))}
                  inputMode="decimal" dir="ltr"
                />
              </div>
              <div>
                <Label className="text-persian text-xs">وضعیت</Label>
                <Select value={editForm.status} onValueChange={(v) => setEditForm(f => ({ ...f, status: v }))}>
                  <SelectTrigger className="text-persian"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="confirmed" className="text-persian">تأیید شده</SelectItem>
                    <SelectItem value="pending" className="text-persian">در انتظار</SelectItem>
                    <SelectItem value="rejected" className="text-persian">رد شده</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-persian text-xs">یادداشت</Label>
                <Input value={editForm.note} onChange={(e) => setEditForm(f => ({ ...f, note: e.target.value }))} className="text-persian" />
              </div>
              <label className="flex items-center gap-2 text-persian text-sm cursor-pointer">
                <Checkbox checked={editForm.to_treasury} onCheckedChange={(v) => setEditForm(f => ({ ...f, to_treasury: !!v }))} />
                واریز به صندوق ترخیصان (در صورت تأیید)
              </label>
              <p className="text-[11px] text-muted-foreground text-persian">
                با ذخیره، ردیف صندوق متناسب با تغییرات همگام می‌شود.
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditRow(null)} className="text-persian">انصراف</Button>
              <Button onClick={saveEdit} disabled={editSaving} className="text-persian">
                {editSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "ذخیره"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={!!confirmDel} onOpenChange={(o) => !o && setConfirmDel(null)}>
          <DialogContent className="panel-fa max-w-sm">
            <DialogHeader><DialogTitle className="text-persian">حذف پرداخت</DialogTitle></DialogHeader>
            <div className="text-persian text-sm">
              این پرداخت حذف شود؟ تأثیر آن از صندوق ترخیصان نیز برداشته می‌شود.
              {confirmDel && (
                <div className="mt-2 rounded border p-2 bg-muted/30 text-xs">
                  {confirmDel.card_name} — {confirmDel.first_name} {confirmDel.last_name} — <span className="tabular-nums">{fmtToman(confirmDel.amount_irt)}</span>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setConfirmDel(null)} className="text-persian">انصراف</Button>
              <Button variant="destructive" onClick={doDelete} className="text-persian">حذف</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>


        <Dialog open={!!preview} onOpenChange={(v) => { if (!v) setPreview(null); }}>
          <DialogContent className="max-w-2xl panel-fa">
            <DialogHeader>
              <DialogTitle className="text-persian">تصویر فیش واریزی</DialogTitle>
            </DialogHeader>
            {preview && <img src={preview} alt="فیش واریزی" className="w-full h-auto rounded-md" />}
            <DialogFooter>
              {preview && (
                <a href={preview} target="_blank" rel="noreferrer" className="text-primary text-persian text-sm underline ml-auto">
                  باز کردن در تب جدید
                </a>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};


interface ReportsData {
  totals: { cards: number; card_usd: number; allocated_usd: number; used_usd: number; used_irt?: number; revenue_irt?: number; cost_irt?: number; profit_irt?: number; admin_paid_irt?: number; admin_debt_remaining_irt?: number; remaining_usd: number; kotaj_count: number; };
  cards: { id: number; name: string; card_usd: number; allocated_usd: number; used_usd: number; used_irt?: number; revenue_irt?: number; cost_irt?: number; profit_irt?: number; admin_paid_irt?: number; admin_debt_remaining_irt?: number; balance_irt?: number; remaining_usd: number; kotaj_count: number; user_count: number; }[];
  top_users: { id: number; first_name: string; last_name: string; username: string; used_usd: number; kotaj_count: number; }[];
  recent: { id: number; kotaj_number: string; kotaj_date_jalali: string; kotaj_date_gregorian?: string | null; total_value_usd: number; created_at: string; card_name: string; user_name: string; entry_title: string | null; }[];
}

const ReportsSection = ({ toast }: { toast: ReturnType<typeof useToast>["toast"] }) => {
  const [data, setData] = useState<ReportsData | null>(null);
  const [loading, setLoading] = useState(false);
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = await api<ReportsData>("/api/admin/reports-summary.php");
      setData(r);
    } catch (e) {
      toast({ title: "خطا", description: (e as Error).message, variant: "destructive" });
    } finally { setLoading(false); }
  }, [toast]);
  useEffect(() => { void load(); }, [load]);

  const fa = (n: number) => (isFinite(n) ? n : 0).toLocaleString("fa-IR");

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <CardTitle className="text-persian flex items-center gap-2">
            <FileText className="w-5 h-5" /> گزارش‌گیری کارت
          </CardTitle>
          <Button size="sm" variant="outline" onClick={() => load()}>
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading || !data ? (
          <div className="py-8 text-center"><Loader2 className="w-5 h-5 animate-spin inline" /></div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "موجودی کل کارت‌ها (دلار)", value: fa(data.totals.card_usd) },
                { label: "تخصیص یافته (دلار)", value: fa(data.totals.allocated_usd) },
                { label: "مصرف‌شده با کوتاژ (دلار)", value: fa(data.totals.used_usd) },
                { label: "مصرف‌شده با کوتاژ (تومان)", value: fa(data.totals.used_irt || 0) },
                { label: "هزینه خرید کل (تومان)", value: fa(data.totals.cost_irt || 0) },
                { label: "درآمد فروش کل (تومان)", value: fa(data.totals.revenue_irt || 0) },
                { label: "سود خالص (تومان)", value: fa(data.totals.profit_irt || 0), highlight: (data.totals.profit_irt || 0) >= 0 ? "text-emerald-600" : "text-destructive" },
                { label: "مانده تخصیصی (دلار)", value: fa(data.totals.remaining_usd) },
                { label: "تعداد کوتاژها", value: fa(data.totals.kotaj_count) },
                { label: "تعداد کارت‌ها", value: fa(data.totals.cards) },
              ].map((s) => (
                <div key={s.label} className="border rounded-md p-3 bg-muted/30">
                  <div className="text-xs text-muted-foreground text-persian">{s.label}</div>
                  <div className={`text-lg font-bold tabular-nums text-persian mt-1 ${(s as any).highlight || ""}`}>{s.value}</div>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-persian font-bold mb-2">وضعیت هر کارت</h3>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-persian">کارت</TableHead>
                      <TableHead className="text-persian">موجودی</TableHead>
                      <TableHead className="text-persian">تخصیص</TableHead>
                      <TableHead className="text-persian">مصرف (دلار)</TableHead>
                      <TableHead className="text-persian">هزینه خرید (تومان)</TableHead>
                      <TableHead className="text-persian">درآمد فروش (تومان)</TableHead>
                      <TableHead className="text-persian">سود خالص (تومان)</TableHead>
                      <TableHead className="text-persian">مانده</TableHead>
                      <TableHead className="text-persian">کوتاژ</TableHead>
                      <TableHead className="text-persian">کاربران</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.cards.map(c => {
                      const profit = c.profit_irt || 0;
                      return (
                      <TableRow key={c.id}>
                        <TableCell className="text-persian font-medium">{c.name}</TableCell>
                        <TableCell className="tabular-nums">{fa(c.card_usd)}</TableCell>
                        <TableCell className="tabular-nums">{fa(c.allocated_usd)}</TableCell>
                        <TableCell className="tabular-nums">{fa(c.used_usd)}</TableCell>
                        <TableCell className="tabular-nums text-orange-600">{fa(c.cost_irt || 0)}</TableCell>
                        <TableCell className="tabular-nums text-primary">{fa(c.revenue_irt ?? c.used_irt ?? 0)}</TableCell>
                        <TableCell className={`tabular-nums font-bold ${profit >= 0 ? "text-emerald-600" : "text-destructive"}`}>{fa(profit)}</TableCell>
                        <TableCell className="tabular-nums text-emerald-600">{fa(c.remaining_usd)}</TableCell>
                        <TableCell className="tabular-nums">{fa(c.kotaj_count)}</TableCell>
                        <TableCell className="tabular-nums">{fa(c.user_count)}</TableCell>
                      </TableRow>
                      );
                    })}
                    {data.cards.length === 0 && (
                      <TableRow><TableCell colSpan={10} className="text-center text-muted-foreground text-persian py-4">کارتی وجود ندارد.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-persian font-bold mb-2">پرمصرف‌ترین کاربران</h3>
                {data.top_users.length === 0 ? (
                  <p className="text-muted-foreground text-persian text-sm">کوتاژی ثبت نشده.</p>
                ) : (
                  <div className="border rounded-md divide-y">
                    {data.top_users.map(u => (
                      <div key={u.id} className="flex justify-between items-center p-2.5 text-persian text-sm">
                        <div>
                          <div className="font-medium">{u.first_name} {u.last_name}</div>
                          <div className="text-xs text-muted-foreground">@{u.username} — {fa(u.kotaj_count)} کوتاژ</div>
                        </div>
                        <div className="tabular-nums font-bold text-primary">{fa(u.used_usd)} دلار</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-persian font-bold mb-2">کوتاژهای اخیر</h3>
                {data.recent.length === 0 ? (
                  <p className="text-muted-foreground text-persian text-sm">کوتاژی ثبت نشده.</p>
                ) : (
                  <div className="border rounded-md divide-y">
                    {data.recent.map(k => (
                      <div key={k.id} className="p-2.5 text-persian text-sm">
                        <div className="flex justify-between gap-2 flex-wrap">
                          <span className="font-bold">#{k.kotaj_number}</span>
                          <span className="tabular-nums font-bold">{Number(k.total_value_usd||0).toLocaleString("fa-IR")} دلار</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {k.user_name} — {k.card_name}{k.entry_title ? ` / ${k.entry_title}` : ""} — {k.kotaj_date_jalali}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface ReportsUsersKotaj {
  id: number; number: string; date: string;
  value_usd: number; sell_irt: number; buy_irt: number; profit_irt: number;
}
interface ReportsUsersData {
  totals: {
    users: number; used_usd: number;
    buy_irt: number; sell_irt: number; profit_irt: number;
    debt_irt: number; paid_irt: number; remaining_irt: number;
  };
  users: {
    id: number; first_name: string; last_name: string; username: string;
    kotaj_count: number; used_usd: number;
    buy_irt: number; sell_irt: number; profit_irt: number;
    debt_irt: number; paid_irt: number; remaining_irt: number;
    card_count: number; kotajs: ReportsUsersKotaj[];
  }[];
}

type UsersSortKey = "remaining_irt" | "profit_irt" | "sell_irt" | "buy_irt" | "paid_irt" | "used_usd" | "kotaj_count" | "card_count" | "name";
const ReportsUsersSection = ({ toast }: { toast: ReturnType<typeof useToast>["toast"] }) => {
  const [data, setData] = useState<ReportsUsersData | null>(null);
  const [loading, setLoading] = useState(false);
  const [openIds, setOpenIds] = useState<Set<number>>(new Set());
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "debt" | "settled" | "credit" | "no_payment" | "has_profit" | "loss">("all");
  const [sortKey, setSortKey] = useState<UsersSortKey>("remaining_irt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = await api<ReportsUsersData>("/api/admin/reports-users-summary.php");
      setData(r);
    } catch (e) {
      toast({ title: "خطا", description: (e as Error).message, variant: "destructive" });
    } finally { setLoading(false); }
  }, [toast]);
  useEffect(() => { void load(); }, [load]);

  const fa = (n: number) => (isFinite(n) ? n : 0).toLocaleString("fa-IR");
  const toggle = (id: number) => {
    setOpenIds(prev => {
      const s = new Set(prev);
      if (s.has(id)) s.delete(id); else s.add(id);
      return s;
    });
  };
  const toggleSort = (k: UsersSortKey) => {
    if (sortKey === k) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(k); setSortDir("desc"); }
  };
  const sortIcon = (k: UsersSortKey) => sortKey !== k ? "↕" : (sortDir === "asc" ? "↑" : "↓");

  const filteredUsers = useMemo(() => {
    if (!data) return [];
    const q = search.trim().toLowerCase();
    let arr = data.users.filter(u => {
      if (q) {
        const hay = `${u.first_name || ""} ${u.last_name || ""} ${u.username || ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      switch (statusFilter) {
        case "debt": return u.remaining_irt > 0;
        case "settled": return u.remaining_irt === 0 && (u.sell_irt > 0 || u.paid_irt > 0);
        case "credit": return u.remaining_irt < 0;
        case "no_payment": return u.paid_irt === 0 && u.sell_irt > 0;
        case "has_profit": return u.profit_irt > 0;
        case "loss": return u.profit_irt < 0;
        default: return true;
      }
    });
    arr = [...arr].sort((a, b) => {
      let av: number | string; let bv: number | string;
      if (sortKey === "name") { av = `${a.first_name} ${a.last_name}`; bv = `${b.first_name} ${b.last_name}`; }
      else { av = a[sortKey] as number; bv = b[sortKey] as number; }
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [data, search, statusFilter, sortKey, sortDir]);


  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <CardTitle className="text-persian flex items-center gap-2">
            <FileText className="w-5 h-5" /> گزارش‌گیری کاربر
          </CardTitle>
          <Button size="sm" variant="outline" onClick={() => load()}>
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading || !data ? (
          <div className="py-8 text-center"><Loader2 className="w-5 h-5 animate-spin inline" /></div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "تعداد کاربران فعال", value: fa(data.totals.users) },
                { label: "ارزش کالا کل (دلار)", value: fa(data.totals.used_usd) },
                { label: "قیمت خرید کل (تومان)", value: fa(data.totals.buy_irt) },
                { label: "قیمت فروش کل (تومان)", value: fa(data.totals.sell_irt) },
                { label: "سود کل (تومان)", value: fa(data.totals.profit_irt), highlight: data.totals.profit_irt >= 0 ? "text-emerald-600" : "text-destructive" },
                { label: "مجموع بدهی (تومان)", value: fa(data.totals.debt_irt) },
                { label: "مجموع پرداختی‌ها (تومان)", value: fa(data.totals.paid_irt) },
                { label: "مانده کل (تومان)", value: fa(data.totals.remaining_irt), highlight: data.totals.remaining_irt > 0 ? "text-destructive" : "text-emerald-600" },
              ].map((s) => (
                <div key={s.label} className="border rounded-md p-3 bg-muted/30">
                  <div className="text-xs text-muted-foreground text-persian">{s.label}</div>
                  <div className={`text-lg font-bold tabular-nums text-persian mt-1 ${(s as { highlight?: string }).highlight || ""}`}>{s.value}</div>
                </div>
              ))}
            </div>

            <div>
              <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                <h3 className="text-persian font-bold">وضعیت هر کاربر</h3>
                <div className="text-xs text-muted-foreground text-persian">
                  نمایش {fa(filteredUsers.length)} از {fa(data.users.length)} کاربر
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
                <Input
                  placeholder="جستجو نام، نام خانوادگی یا نام کاربری..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="text-persian"
                />
                <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as typeof statusFilter)}>
                  <SelectTrigger className="text-persian"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="text-persian">همه کاربران</SelectItem>
                    <SelectItem value="debt" className="text-persian">فقط دارای بدهی</SelectItem>
                    <SelectItem value="no_payment" className="text-persian">بدون هیچ پرداختی</SelectItem>
                    <SelectItem value="settled" className="text-persian">تسویه‌شده</SelectItem>
                    <SelectItem value="credit" className="text-persian">دارای اضافه پرداخت</SelectItem>
                    <SelectItem value="has_profit" className="text-persian">دارای سود</SelectItem>
                    <SelectItem value="loss" className="text-persian">دارای ضرر</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={`${sortKey}:${sortDir}`} onValueChange={(v) => { const [k, d] = v.split(":") as [UsersSortKey, "asc" | "desc"]; setSortKey(k); setSortDir(d); }}>
                  <SelectTrigger className="text-persian"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remaining_irt:desc" className="text-persian">مانده بدهی (بیشترین)</SelectItem>
                    <SelectItem value="remaining_irt:asc" className="text-persian">مانده بدهی (کمترین)</SelectItem>
                    <SelectItem value="profit_irt:desc" className="text-persian">سود (بیشترین)</SelectItem>
                    <SelectItem value="profit_irt:asc" className="text-persian">سود (کمترین)</SelectItem>
                    <SelectItem value="sell_irt:desc" className="text-persian">قیمت فروش (بیشترین)</SelectItem>
                    <SelectItem value="buy_irt:desc" className="text-persian">قیمت خرید (بیشترین)</SelectItem>
                    <SelectItem value="paid_irt:desc" className="text-persian">پرداختی (بیشترین)</SelectItem>
                    <SelectItem value="used_usd:desc" className="text-persian">ارزش کالا (بیشترین)</SelectItem>
                    <SelectItem value="kotaj_count:desc" className="text-persian">تعداد کوتاژ (بیشترین)</SelectItem>
                    <SelectItem value="card_count:desc" className="text-persian">تعداد کارت (بیشترین)</SelectItem>
                    <SelectItem value="name:asc" className="text-persian">نام (الفبا)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-persian w-10"></TableHead>
                      <TableHead className="text-persian cursor-pointer select-none" onClick={() => toggleSort("name")}>کاربر {sortIcon("name")}</TableHead>
                      <TableHead className="text-persian cursor-pointer select-none" onClick={() => toggleSort("card_count")}>کارت‌ها {sortIcon("card_count")}</TableHead>
                      <TableHead className="text-persian cursor-pointer select-none" onClick={() => toggleSort("kotaj_count")}>کوتاژ {sortIcon("kotaj_count")}</TableHead>
                      <TableHead className="text-persian cursor-pointer select-none" onClick={() => toggleSort("used_usd")}>ارزش کالا (دلار) {sortIcon("used_usd")}</TableHead>
                      <TableHead className="text-persian cursor-pointer select-none" onClick={() => toggleSort("buy_irt")}>قیمت خرید (تومان) {sortIcon("buy_irt")}</TableHead>
                      <TableHead className="text-persian cursor-pointer select-none" onClick={() => toggleSort("sell_irt")}>قیمت فروش (تومان) {sortIcon("sell_irt")}</TableHead>
                      <TableHead className="text-persian cursor-pointer select-none" onClick={() => toggleSort("profit_irt")}>سود (تومان) {sortIcon("profit_irt")}</TableHead>
                      <TableHead className="text-persian cursor-pointer select-none" onClick={() => toggleSort("paid_irt")}>پرداختی‌ها (تومان) {sortIcon("paid_irt")}</TableHead>
                      <TableHead className="text-persian cursor-pointer select-none" onClick={() => toggleSort("remaining_irt")}>مانده (تومان) {sortIcon("remaining_irt")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map(u => {
                      const rem = u.remaining_irt;
                      const isOpen = openIds.has(u.id);
                      const hasKotaj = (u.kotajs?.length || 0) > 0;
                      return (
                        <Fragment key={u.id}>
                          <TableRow>
                            <TableCell className="p-1">
                              {hasKotaj && (
                                <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => toggle(u.id)} aria-label="جزئیات کوتاژها">
                                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                </Button>
                              )}
                            </TableCell>
                            <TableCell className="text-persian font-medium">
                              {u.first_name} {u.last_name}
                              <div className="text-xs text-muted-foreground">@{u.username}</div>
                            </TableCell>
                            <TableCell className="tabular-nums">{fa(u.card_count)}</TableCell>
                            <TableCell className="tabular-nums">{fa(u.kotaj_count)}</TableCell>
                            <TableCell className="tabular-nums">{fa(u.used_usd)}</TableCell>
                            <TableCell className="tabular-nums text-orange-600">{fa(u.buy_irt)}</TableCell>
                            <TableCell className="tabular-nums text-primary">{fa(u.sell_irt)}</TableCell>
                            <TableCell className={`tabular-nums font-bold ${u.profit_irt >= 0 ? "text-emerald-600" : "text-destructive"}`}>{fa(u.profit_irt)}</TableCell>
                            <TableCell className="tabular-nums text-emerald-600">{fa(u.paid_irt)}</TableCell>
                            <TableCell className={`tabular-nums font-bold ${rem > 0 ? "text-destructive" : "text-emerald-600"}`}>{fa(rem)}</TableCell>
                          </TableRow>
                          {isOpen && hasKotaj && (
                            <TableRow className="bg-muted/30 hover:bg-muted/30">
                              <TableCell colSpan={10} className="p-3">
                                <div className="text-persian font-bold mb-2 text-sm">کوتاژهای {u.first_name} {u.last_name}</div>
                                <div className="overflow-x-auto">
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead className="text-persian">شماره کوتاژ</TableHead>
                                        <TableHead className="text-persian">تاریخ</TableHead>
                                        <TableHead className="text-persian">ارزش کالا (دلار)</TableHead>
                                        <TableHead className="text-persian">قیمت خرید (تومان)</TableHead>
                                        <TableHead className="text-persian">قیمت فروش (تومان)</TableHead>
                                        <TableHead className="text-persian">سود (تومان)</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {u.kotajs.map(k => (
                                        <TableRow key={k.id}>
                                          <TableCell className="font-medium tabular-nums">{k.number}</TableCell>
                                          <TableCell className="tabular-nums text-persian">{k.date}</TableCell>
                                          <TableCell className="tabular-nums">{fa(k.value_usd)}</TableCell>
                                          <TableCell className="tabular-nums text-orange-600">{fa(k.buy_irt)}</TableCell>
                                          <TableCell className="tabular-nums text-primary">{fa(k.sell_irt)}</TableCell>
                                          <TableCell className={`tabular-nums font-bold ${k.profit_irt >= 0 ? "text-emerald-600" : "text-destructive"}`}>{fa(k.profit_irt)}</TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </Fragment>
                      );
                    })}
                    {filteredUsers.length === 0 && (
                      <TableRow><TableCell colSpan={10} className="text-center text-muted-foreground text-persian py-4">کاربری یافت نشد.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>

          </div>
        )}
      </CardContent>
    </Card>
  );
};


// ============ Admin Pay Card Debt Dialog ============
const AdminPayCardDialog = ({
  card, onClose, onSaved, toast,
}: {
  card: CardRow | null;
  onClose: () => void;
  onSaved: () => void;
  toast: ReturnType<typeof useToast>["toast"];
}) => {
  const todayJ = () => {
    try {
      return new DateObject({ calendar: persian }).format("YYYY/MM/DD");
    } catch { return ""; }
  };

  // Jalali → Gregorian conversion
  const jalaliToGregorian = (jy: number, jm: number, jd: number): [number, number, number] => {
    let gy = jy <= 979 ? 621 : 1600;
    jy -= jy <= 979 ? 0 : 979;
    let days = (365 * jy) + Math.floor(jy / 33) * 8 + Math.floor(((jy % 33) + 3) / 4)
      + 78 + jd + (jm < 7 ? (jm - 1) * 31 : ((jm - 7) * 30) + 186);
    gy += 400 * Math.floor(days / 146097);
    days %= 146097;
    if (days > 36524) {
      gy += 100 * Math.floor(--days / 36524);
      days %= 36524;
      if (days >= 365) days++;
    }
    gy += 4 * Math.floor(days / 1461);
    days %= 1461;
    if (days > 365) {
      gy += Math.floor((days - 1) / 365);
      days = (days - 1) % 365;
    }
    let gd = days + 1;
    const sal_a = [0, 31, ((gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let gm = 0;
    for (gm = 1; gm <= 12; gm++) {
      if (gd <= sal_a[gm]) break;
      gd -= sal_a[gm];
    }
    return [gy, gm, gd];
  };

  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [dateJ, setDateJ] = useState<string>(() => todayJ());
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [uploadPct, setUploadPct] = useState(0);
  const [fromTreasury, setFromTreasury] = useState<boolean>(true);
  const [treasuryBal, setTreasuryBal] = useState<number | null>(null);

  useEffect(() => {
    if (card) {
      setAmount(""); setNote(""); setDateJ(todayJ());
      setFiles([]); setFromTreasury(true);
      fetch("/api/admin/treasury-summary.php", { credentials: "same-origin" })
        .then((r) => r.json()).then((d) => setTreasuryBal(typeof d?.balance === "number" ? d.balance : 0))
        .catch(() => setTreasuryBal(null));
    }
  }, [card]);


  const rawBal = card ? (typeof card.balance === "string" ? parseFloat(card.balance) : card.balance as number) : 0;
  const bal = card && card.display_balance_irt !== null && card.display_balance_irt !== undefined
    ? Number(card.display_balance_irt)
    : rawBal;
  const paid = card?.admin_paid_irt || 0;
  const remain = Math.max(0, bal - paid);
  const amt = parseFloat(amount) || 0;
  const afterRemain = remain - amt;

  // Parse Jalali input → derive Gregorian
  const dateG = (() => {
    const norm = (dateJ || "").replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
                              .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
    const m = norm.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/);
    if (!m) return "";
    const jy = +m[1], jm = +m[2], jd = +m[3];
    if (jm < 1 || jm > 12 || jd < 1 || jd > 31) return "";
    try {
      const [gy, gm, gd] = jalaliToGregorian(jy, jm, jd);
      return `${gy}-${String(gm).padStart(2, "0")}-${String(gd).padStart(2, "0")}`;
    } catch { return ""; }
  })();

  const jalali = dateJ;


  const submit = async () => {
    if (!card) return;
    if (amt <= 0) return toast({ title: "مبلغ پرداخت را وارد کنید", variant: "destructive" });
    if (fromTreasury && treasuryBal !== null && amt > treasuryBal) {
      return toast({ title: "موجودی صندوق کافی نیست", description: fmtToman(treasuryBal), variant: "destructive" });
    }
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("card_id", String(card.id));
      fd.append("amount_irt", String(amt));
      fd.append("note", note);
      fd.append("pay_date_gregorian", dateG);
      if (jalali) fd.append("pay_date_jalali", jalali);
      if (files[0]) fd.append("receipt", files[0]);
      files.slice(1).forEach((f) => fd.append("receipts[]", f));
      fd.append("from_treasury", fromTreasury ? "1" : "0");

      setUploadPct(0);
      const { ok, status, data } = await xhrUpload("/api/admin/card-debt-pay.php", fd, setUploadPct);
      if (!ok) throw new Error((data as any)?.error || `HTTP ${status}`);
      toast({ title: "پرداخت ثبت شد" });
      onSaved();
    } catch (e) {
      toast({ title: "خطا", description: (e as Error).message, variant: "destructive" });
    } finally { setBusy(false); setUploadPct(0); }
  };

  return (
    <Dialog open={!!card} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md panel-fa">
        <DialogHeader>
          <DialogTitle className="text-persian">پرداخت بدهی کارت — {card?.name}</DialogTitle>
        </DialogHeader>
        {card && (
          <div className="space-y-3 text-persian">
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded border p-2 bg-muted/30">
                <div className="text-xs text-muted-foreground">بدهی کل</div>
                <div className="font-bold tabular-nums text-sm">{fmtToman(bal)}</div>
              </div>
              <div className="rounded border p-2 bg-muted/30">
                <div className="text-xs text-muted-foreground">پرداخت‌شده</div>
                <div className="font-bold tabular-nums text-sm text-emerald-600">{fmtToman(paid)}</div>
              </div>
              <div className="rounded border p-2 bg-muted/30">
                <div className="text-xs text-muted-foreground">مانده</div>
                <div className={`font-bold tabular-nums text-sm ${afterRemain < 0 ? "text-destructive" : "text-primary"}`}>{fmtToman(Math.max(0, afterRemain))}</div>
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-persian text-xs">منبع پرداخت</Label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFromTreasury(true)}
                  className={`rounded-lg border p-2 text-right transition-all ${
                    fromTreasury
                      ? "border-primary bg-primary/10 shadow-[0_2px_8px_hsl(var(--primary)/0.2)]"
                      : "border-border bg-background hover:bg-muted/40"
                  }`}
                >
                  <div className="flex items-center gap-2 text-persian text-sm font-medium">
                    <Vault className="w-4 h-4" /> از صندوق ترخیصان
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-1 tabular-nums">
                    موجودی: {treasuryBal === null ? "…" : fmtToman(treasuryBal)}
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setFromTreasury(false)}
                  className={`rounded-lg border p-2 text-right transition-all ${
                    !fromTreasury
                      ? "border-primary bg-primary/10 shadow-[0_2px_8px_hsl(var(--primary)/0.2)]"
                      : "border-border bg-background hover:bg-muted/40"
                  }`}
                >
                  <div className="flex items-center gap-2 text-persian text-sm font-medium">
                    <Banknote className="w-4 h-4" /> پرداخت بیرونی
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-1">
                    بدون اثر روی صندوق
                  </div>
                </button>
              </div>
              {fromTreasury && treasuryBal !== null && amt > treasuryBal && (
                <div className="text-[11px] text-destructive text-persian mt-1">
                  مبلغ از موجودی صندوق بیشتر است.
                </div>
              )}
            </div>
            <div className="space-y-1">
              <Label className="text-persian text-xs">مبلغ پرداخت (تومان)</Label>
              <Input
                value={formatThousands(amount)}
                onChange={(e) => setAmount(unformatThousands(e.target.value))}
                inputMode="decimal"
                dir="ltr"
                placeholder="0"
              />
              {amt > 0 && (
                <div className="text-[11px] text-muted-foreground tabular-nums">
                  {amt.toLocaleString("fa-IR")} تومان
                </div>
              )}
            </div>

            <div className="space-y-1">
              <Label className="text-persian text-xs">تاریخ پرداخت (شمسی)</Label>
              <DatePicker
                value={dateJ ? new DateObject({ date: dateJ, format: "YYYY/MM/DD", calendar: persian, locale: persian_fa }) : null}
                onChange={(d: DateObject | null) => setDateJ(d ? d.format("YYYY/MM/DD") : "")}
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
                format="YYYY/MM/DD"
                inputClass="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="1404/03/12"
                containerClassName="w-full"
              />
              {dateG ? (
                <div className="text-[11px] text-muted-foreground opacity-70 tabular-nums">میلادی: {dateG}</div>
              ) : (
                <div className="text-[11px] text-destructive">تاریخ را انتخاب کنید</div>
              )}
            </div>


            <div className="space-y-1">
              <Label className="text-persian text-xs">یادداشت</Label>
              <Input value={note} onChange={(e) => setNote(e.target.value)} className="text-persian" />
            </div>
            <div className="space-y-2">
              <Label className="text-persian text-xs">رسید (اختیاری)</Label>
              {files.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {files.map((f, i) => (
                    <div key={i} className="relative border rounded-md p-1 bg-muted/30">
                      {f.type.startsWith("image/") ? (
                        <img src={URL.createObjectURL(f)} alt={f.name} className="h-16 w-16 object-cover rounded" />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-16 w-16 text-[10px] text-persian">
                          <FileText className="w-6 h-6 text-primary" />
                          <span className="truncate max-w-[60px]">{f.name}</span>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => setFiles(prev => prev.filter((_, idx) => idx !== i))}
                        disabled={busy}
                        className="absolute -top-2 -right-2 bg-destructive text-white rounded-full w-5 h-5 flex items-center justify-center text-xs disabled:opacity-40"
                        aria-label="حذف"
                      >×</button>
                      <UploadProgressBar pct={uploadPct} active={busy} />
                    </div>
                  ))}
                </div>
              )}
              {files.length === 0 ? (
                <label className="flex items-center justify-center gap-2 border-2 border-dashed border-border rounded-md p-3 cursor-pointer hover:bg-muted/30 transition">
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      const arr = Array.from(e.target.files || []);
                      if (arr.length) setFiles(prev => [...prev, ...arr]);
                      e.target.value = "";
                    }}
                  />
                  <Upload className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-persian text-muted-foreground">افزودن رسید (JPG/PNG/PDF) — چندتایی مجاز</span>
                </label>
              ) : (
                <label
                  className="group inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full cursor-pointer text-xs text-persian
                    bg-white/40 dark:bg-white/10 backdrop-blur-md border border-white/40 dark:border-white/15
                    shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_4px_16px_-6px_rgba(0,0,0,0.15)]
                    hover:bg-white/60 dark:hover:bg-white/15 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_6px_20px_-6px_rgba(0,0,0,0.2)]
                    transition-all"
                  title="افزودن فایل بیشتر"
                >
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      const arr = Array.from(e.target.files || []);
                      if (arr.length) setFiles(prev => [...prev, ...arr]);
                      e.target.value = "";
                    }}
                  />
                  <Plus className="w-3.5 h-3.5 text-primary" />
                  <span className="text-muted-foreground group-hover:text-foreground">افزودن فایل بیشتر</span>
                </label>
              )}
            </div>
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="text-persian">انصراف</Button>
          <Button onClick={submit} disabled={busy} className="text-persian bg-emerald-600 hover:bg-emerald-700">
            {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : "ثبت پرداخت"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// ============ Card Admin Payments Panel ============
interface AdminCardPayment {
  id: number; card_id: number; card_name: string;
  amount_irt: number; pay_date_gregorian: string | null; pay_date_jalali: string | null;
  receipt_path: string | null; note: string | null; status: string; from_treasury?: number; created_at: string | null; updated_at?: string | null;
}
const CardAdminPaymentsPanel = ({
  toast, cards, refreshKey = 0, onChanged,
}: {
  toast: ReturnType<typeof useToast>["toast"];
  cards: CardRow[];
  refreshKey?: number;
  onChanged: () => void;
}) => {
  const [items, setItems] = useState<AdminCardPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [cardFilter, setCardFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [preview, setPreview] = useState<string | null>(null);
  const [editRow, setEditRow] = useState<AdminCardPayment | null>(null);
  const [editForm, setEditForm] = useState<{ amount: string; note: string; status: string; from_treasury: boolean; dateJ: string }>({
    amount: "", note: "", status: "confirmed", from_treasury: true, dateJ: "",
  });
  const [editSaving, setEditSaving] = useState(false);
  const [editTreasuryBal, setEditTreasuryBal] = useState<number | null>(null);
  const [confirmDel, setConfirmDel] = useState<AdminCardPayment | null>(null);

  // Gregorian from edit dialog's Jalali
  const editDateG = (() => {
    const j = editForm.dateJ || "";
    const norm = j.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
                  .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
    const m = norm.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/);
    if (!m) return "";
    const jy = +m[1], jm = +m[2], jd = +m[3];
    try {
      const o = new DateObject({ date: `${jy}/${jm}/${jd}`, format: "YYYY/M/D", calendar: persian }).convert(gregorian);
      return `${o.year}-${String(o.month.number).padStart(2, "0")}-${String(o.day).padStart(2, "0")}`;
    } catch { return ""; }
  })();

  const openEdit = (p: AdminCardPayment) => {
    setEditRow(p);
    // Convert pay_date_gregorian to Jalali for the picker
    let dj = p.pay_date_jalali || "";
    if (!dj && p.pay_date_gregorian) {
      try {
        const o = new DateObject({ date: p.pay_date_gregorian, format: "YYYY-MM-DD", calendar: gregorian }).convert(persian);
        dj = o.format("YYYY/MM/DD");
      } catch { /* ignore */ }
    }
    setEditForm({
      amount: String(p.amount_irt || ""),
      note: p.note || "",
      status: p.status || "confirmed",
      from_treasury: (p.from_treasury ?? 0) === 1,
      dateJ: dj,
    });
    fetch("/api/admin/treasury-summary.php", { credentials: "same-origin" })
      .then((r) => r.json()).then((d) => setEditTreasuryBal(typeof d?.balance === "number" ? d.balance : 0))
      .catch(() => setEditTreasuryBal(null));
  };
  const saveEdit = async () => {
    if (!editRow) return;
    const amt = parseFloat(unformatThousands(editForm.amount));
    if (!amt || amt <= 0) { toast({ title: "مبلغ نامعتبر", variant: "destructive" }); return; }
    setEditSaving(true);
    try {
      await api("/api/admin/card-admin-payment-update.php", {
        method: "POST",
        body: JSON.stringify({
          id: editRow.id,
          amount_irt: amt,
          note: editForm.note,
          status: editForm.status,
          from_treasury: editForm.from_treasury ? 1 : 0,
          pay_date_gregorian: editDateG,
          pay_date_jalali: editForm.dateJ,
        }),
      });
      toast({ title: "ذخیره شد" });
      setEditRow(null);
      load(); onChanged();
    } catch (e) {
      toast({ title: "خطا", description: (e as Error).message, variant: "destructive" });
    } finally { setEditSaving(false); }
  };

  const load = useCallback(() => {
    setLoading(true);
    api<{ items: AdminCardPayment[]; totals: { count: number; amount: number; confirmed: number } }>("/api/admin/card-admin-payments-list.php")
      .then(r => setItems(r.items || []))
      .catch(e => toast({ title: "خطا", description: (e as Error).message, variant: "destructive" }))
      .finally(() => setLoading(false));
  }, [toast]);
  useEffect(() => { load(); }, [load, refreshKey]);

  const filtered = items.filter(p => {
    if (cardFilter !== "all" && String(p.card_id) !== cardFilter) return false;
    if (statusFilter !== "all" && p.status !== statusFilter) return false;
    return true;
  });
  const totalSum = filtered.reduce((s, p) => s + p.amount_irt, 0);
  const confirmedSum = filtered.filter(p => p.status === "confirmed").reduce((s, p) => s + p.amount_irt, 0);

  const changeStatus = async (id: number, status: string) => {
    try {
      await api("/api/admin/card-admin-payment-update.php", { method: "POST", body: JSON.stringify({ id, status }) });
      toast({ title: "وضعیت تغییر کرد" });
      load(); onChanged();
    } catch (e) { toast({ title: "خطا", description: (e as Error).message, variant: "destructive" }); }
  };
  const doDelete = async () => {
    if (!confirmDel) return;
    try {
      await api("/api/admin/card-admin-payment-delete.php", { method: "POST", body: JSON.stringify({ id: confirmDel.id }) });
      toast({ title: "حذف شد" });
      setConfirmDel(null);
      load(); onChanged();
    } catch (e) { toast({ title: "خطا", description: (e as Error).message, variant: "destructive" }); }
  };

  const isImage = (p?: string | null) => !!p && /\.(jpe?g|png|webp|gif)$/i.test(p);
  const statusBadge = (s: string) => {
    if (s === "confirmed") return <Badge className="bg-emerald-600 text-persian">تأیید</Badge>;
    if (s === "pending") return <Badge variant="secondary" className="text-persian">در انتظار</Badge>;
    return <Badge variant="destructive" className="text-persian">رد شده</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <CardTitle className="text-persian flex items-center gap-2">
            <Banknote className="w-5 h-5" /> پرداختی‌های کارت <Badge variant="secondary">{items.length}</Badge>
          </CardTitle>
          <Button size="sm" variant="outline" onClick={load}><RefreshCw className="w-4 h-4" /></Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded border p-3 bg-muted/30"><div className="text-xs text-muted-foreground text-persian">تعداد</div><div className="text-lg font-bold tabular-nums">{filtered.length.toLocaleString("fa-IR")}</div></div>
          <div className="rounded border p-3 bg-muted/30"><div className="text-xs text-muted-foreground text-persian">جمع</div><div className="text-lg font-bold tabular-nums text-primary">{fmtToman(totalSum)}</div></div>
          <div className="rounded border p-3 bg-muted/30"><div className="text-xs text-muted-foreground text-persian">جمع تأییدشده</div><div className="text-lg font-bold tabular-nums text-emerald-600">{fmtToman(confirmedSum)}</div></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <Select value={cardFilter} onValueChange={setCardFilter}>
            <SelectTrigger className="text-persian"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-persian">همه کارت‌ها</SelectItem>
              {cards.map(c => <SelectItem key={c.id} value={String(c.id)} className="text-persian">{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="text-persian"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-persian">همه وضعیت‌ها</SelectItem>
              <SelectItem value="confirmed" className="text-persian">تأیید شده</SelectItem>
              <SelectItem value="pending" className="text-persian">در انتظار</SelectItem>
              <SelectItem value="rejected" className="text-persian">رد شده</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {loading ? (
          <div className="py-8 text-center"><Loader2 className="w-5 h-5 animate-spin inline" /></div>
        ) : filtered.length === 0 ? (
          <p className="py-8 text-center text-muted-foreground text-persian text-sm">پرداختی ثبت نشده.</p>
        ) : (
          <div className="overflow-x-auto ts-stack-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-persian">کارت</TableHead>
                  <TableHead className="text-persian">مبلغ (تومان)</TableHead>
                  <TableHead className="text-persian">تاریخ</TableHead>
                  <TableHead className="text-persian">وضعیت</TableHead>
                  <TableHead className="text-persian">فیش</TableHead>
                  <TableHead className="text-persian">یادداشت</TableHead>
                  <TableHead className="text-persian">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(p => (
                  <TableRow key={p.id}>
                    <TableCell data-label="کارت" className="text-persian font-medium">{p.card_name}</TableCell>
                    <TableCell data-label="مبلغ (تومان)" className="tabular-nums font-bold">{fmtToman(p.amount_irt)}</TableCell>
                    <TableCell data-label="تاریخ" className="text-persian text-xs">
                      <div className="tabular-nums font-medium">{p.pay_date_jalali || toJalali(p.created_at || p.updated_at || "")}</div>
                      {p.pay_date_gregorian && <div className="text-muted-foreground opacity-70 tabular-nums">{p.pay_date_gregorian}</div>}
                    </TableCell>
                    <TableCell data-label="وضعیت">{statusBadge(p.status)}</TableCell>
                    <TableCell data-label="فیش">
                      {p.receipt_path ? (
                        isImage(p.receipt_path) ? (
                          <button onClick={() => setPreview(p.receipt_path)}><img src={p.receipt_path!} alt="فیش" className="w-12 h-12 object-cover rounded border" /></button>
                        ) : (
                          <a href={p.receipt_path} target="_blank" rel="noreferrer" className="text-primary text-persian text-sm underline">مشاهده</a>
                        )
                      ) : <span className="text-muted-foreground text-xs">—</span>}
                    </TableCell>
                    <TableCell data-label="یادداشت" className="text-persian text-xs md:max-w-[200px] md:truncate" title={p.note || ""}>{p.note || "—"}</TableCell>
                    <TableCell data-label="عملیات">
                      <div className="flex gap-1 flex-wrap">
                        {p.status !== "confirmed" && <Button size="sm" variant="ghost" onClick={() => changeStatus(p.id, "confirmed")} title="تایید" className="text-emerald-600 gap-1.5">✓ <span className="md:hidden text-persian text-xs">تایید</span></Button>}
                        <Button size="sm" variant="ghost" onClick={() => openEdit(p)} title="ویرایش" className="gap-1.5"><Pencil className="w-4 h-4" /><span className="md:hidden text-persian text-xs">ویرایش</span></Button>
                        <Button size="sm" variant="ghost" onClick={() => setConfirmDel(p)} title="حذف" className="gap-1.5"><Trash2 className="w-4 h-4 text-destructive" /><span className="md:hidden text-persian text-xs">حذف</span></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        <Dialog open={!!editRow} onOpenChange={(o) => !o && setEditRow(null)}>
          <DialogContent className="panel-fa max-w-md">
            <DialogHeader><DialogTitle className="text-persian">ویرایش پرداخت کارت</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div className="rounded border p-2 bg-muted/30 text-persian text-xs">{editRow?.card_name}</div>

              <div className="space-y-1">
                <Label className="text-persian text-xs">منبع پرداخت</Label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    disabled={(editRow?.from_treasury ?? 0) !== 1}
                    onClick={() => {
                      if ((editRow?.from_treasury ?? 0) === 1) setEditForm(f => ({ ...f, from_treasury: true }));
                    }}
                    className={`rounded-lg border p-2 text-right transition-all ${
                      editForm.from_treasury
                        ? "border-primary bg-primary/10 shadow-[0_2px_8px_hsl(var(--primary)/0.2)]"
                        : "border-border bg-background hover:bg-muted/40"
                    } ${(editRow?.from_treasury ?? 0) !== 1 ? "opacity-45 cursor-not-allowed" : ""}`}
                  >
                    <div className="flex items-center gap-2 text-persian text-sm font-medium">
                      <Vault className="w-4 h-4" /> از صندوق ترخیصان
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-1 tabular-nums">
                      موجودی: {editTreasuryBal === null ? "…" : fmtToman(editTreasuryBal)}
                    </div>
                  </button>
                  <button
                    type="button"
                    disabled={(editRow?.from_treasury ?? 0) === 1}
                    onClick={() => {
                      if ((editRow?.from_treasury ?? 0) !== 1) setEditForm(f => ({ ...f, from_treasury: false }));
                    }}
                    className={`rounded-lg border p-2 text-right transition-all ${
                      !editForm.from_treasury
                        ? "border-primary bg-primary/10 shadow-[0_2px_8px_hsl(var(--primary)/0.2)]"
                        : "border-border bg-background hover:bg-muted/40"
                    } ${(editRow?.from_treasury ?? 0) === 1 ? "opacity-45 cursor-not-allowed" : ""}`}
                  >
                    <div className="flex items-center gap-2 text-persian text-sm font-medium">
                      <Banknote className="w-4 h-4" /> پرداخت بیرونی
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-1">
                      بدون اثر روی صندوق
                    </div>
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-persian text-xs">مبلغ (تومان)</Label>
                <Input
                  value={formatThousands(editForm.amount)}
                  onChange={(e) => setEditForm(f => ({ ...f, amount: unformatThousands(e.target.value) }))}
                  inputMode="decimal" dir="ltr"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-persian text-xs">تاریخ پرداخت (شمسی)</Label>
                <DatePicker
                  value={editForm.dateJ ? new DateObject({ date: editForm.dateJ, format: "YYYY/MM/DD", calendar: persian, locale: persian_fa }) : null}
                  onChange={(d: DateObject | null) => setEditForm(f => ({ ...f, dateJ: d ? d.format("YYYY/MM/DD") : "" }))}
                  calendar={persian}
                  locale={persian_fa}
                  calendarPosition="bottom-right"
                  format="YYYY/MM/DD"
                  inputClass="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="1404/03/12"
                  containerClassName="w-full"
                />
                {editDateG && (
                  <div className="text-[11px] text-muted-foreground opacity-70 tabular-nums">میلادی: {editDateG}</div>
                )}
              </div>

              <div className="space-y-1">
                <Label className="text-persian text-xs">وضعیت</Label>
                <Select value={editForm.status} onValueChange={(v) => setEditForm(f => ({ ...f, status: v }))}>
                  <SelectTrigger className="text-persian"><SelectValue /></SelectTrigger>
                  <SelectContent className="panel-fa">
                    <SelectItem value="confirmed" className="text-persian">تأیید شده</SelectItem>
                    <SelectItem value="pending" className="text-persian">در انتظار</SelectItem>
                    <SelectItem value="rejected" className="text-persian">رد شده</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label className="text-persian text-xs">یادداشت</Label>
                <Input value={editForm.note} onChange={(e) => setEditForm(f => ({ ...f, note: e.target.value }))} className="text-persian" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditRow(null)} className="text-persian">انصراف</Button>
              <Button onClick={saveEdit} disabled={editSaving} className="text-persian">
                {editSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "ذخیره"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={!!confirmDel} onOpenChange={(o) => !o && setConfirmDel(null)}>
          <DialogContent className="panel-fa max-w-sm">
            <DialogHeader><DialogTitle className="text-persian">حذف پرداخت کارت</DialogTitle></DialogHeader>
            <div className="text-persian text-sm">
              این پرداخت حذف شود؟ اگر از صندوق ترخیصان بوده، تأثیر آن نیز برگشت می‌خورد.
              {confirmDel && (
                <div className="mt-2 rounded border p-2 bg-muted/30 text-xs">
                  {confirmDel.card_name} — <span className="tabular-nums">{fmtToman(confirmDel.amount_irt)}</span>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setConfirmDel(null)} className="text-persian">انصراف</Button>
              <Button variant="destructive" onClick={doDelete} className="text-persian">حذف</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={!!preview} onOpenChange={(v) => !v && setPreview(null)}>
          <DialogContent className="max-w-2xl panel-fa">
            <DialogHeader><DialogTitle className="text-persian">رسید</DialogTitle></DialogHeader>
            {preview && <img src={preview} alt="رسید" className="w-full h-auto rounded" />}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

// ============ Kotaj Items Search Panel ============
interface KotajItemRow {
  id: number; name: string; value_usd: number; unit_price_irt: number; toman: number;
  kotaj_number: string; kotaj_date_jalali: string | null; kotaj_date_gregorian: string | null;
  card_name: string; user_name: string; username: string; entry_title: string | null;
  attachments?: string[];
}
const KotajItemsSearchPanel = ({
  toast, cards,
}: {
  toast: ReturnType<typeof useToast>["toast"];
  cards: CardRow[];
}) => {
  const [q, setQ] = useState("");
  const [cardFilter, setCardFilter] = useState("");
  const [items, setItems] = useState<KotajItemRow[]>([]);
  const [totals, setTotals] = useState<{ count: number; usd: number; toman: number }>({ count: 0, usd: 0, toman: 0 });
  const [loading, setLoading] = useState(false);
  const [attachRow, setAttachRow] = useState<KotajItemRow | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const isImg = (p?: string | null) => !!p && /\.(jpe?g|png|webp|gif)$/i.test(p);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (q.trim()) params.set("q", q.trim());
      if (cardFilter) params.set("card_id", cardFilter);
      params.set("page_size", "200");
      const r = await api<{ items: KotajItemRow[]; totals: { count: number; usd: number; toman: number } }>(
        `/api/admin/kotaj-items-search.php?${params.toString()}`
      );
      setItems(r.items || []);
      setTotals(r.totals || { count: 0, usd: 0, toman: 0 });
    } catch (e) { toast({ title: "خطا", description: (e as Error).message, variant: "destructive" }); }
    finally { setLoading(false); }
  }, [q, cardFilter, toast]);

  useEffect(() => { const t = setTimeout(() => void load(), 300); return () => clearTimeout(t); }, [load]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <CardTitle className="text-persian flex items-center gap-2">
            <Package className="w-5 h-5" /> جستجوی کوتاژها بر اساس قلم
          </CardTitle>
          <Button size="sm" variant="outline" onClick={load}><RefreshCw className="w-4 h-4" /></Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded border p-3 bg-muted/30"><div className="text-xs text-muted-foreground text-persian">تعداد آیتم</div><div className="text-lg font-bold tabular-nums">{Number(totals.count).toLocaleString("fa-IR")}</div></div>
          <div className="rounded border p-3 bg-muted/30"><div className="text-xs text-muted-foreground text-persian">مجموع (دلار)</div><div className="text-lg font-bold tabular-nums">{Number(totals.usd).toLocaleString("fa-IR")}</div></div>
          <div className="rounded border p-3 bg-muted/30"><div className="text-xs text-muted-foreground text-persian">مجموع (تومان)</div><div className="text-lg font-bold tabular-nums text-primary">{fmtToman(totals.toman)}</div></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="نام قلم (مثلاً خیار سبز)" className="text-persian pr-8" />
          </div>
          <Select value={cardFilter || "all"} onValueChange={(v) => setCardFilter(v === "all" ? "" : v)}>
            <SelectTrigger className="text-persian"><SelectValue placeholder="همه کارت‌ها" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-persian">همه کارت‌ها</SelectItem>
              {cards.map(c => <SelectItem key={c.id} value={String(c.id)} className="text-persian">{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        {loading ? (
          <div className="py-8 text-center"><Loader2 className="w-5 h-5 animate-spin inline" /></div>
        ) : items.length === 0 ? (
          <p className="py-8 text-center text-muted-foreground text-persian text-sm">قلمی یافت نشد.</p>
        ) : (
          <div className="overflow-x-auto ts-stack-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-persian">قلم</TableHead>
                  <TableHead className="text-persian">دلار</TableHead>
                  <TableHead className="text-persian">قیمت هر دلار</TableHead>
                  <TableHead className="text-persian">جمع (تومان)</TableHead>
                  <TableHead className="text-persian">کارت / سکشن</TableHead>
                  <TableHead className="text-persian">کاربر</TableHead>
                  <TableHead className="text-persian">کوتاژ</TableHead>
                  <TableHead className="text-persian">تاریخ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map(r => (
                  <TableRow key={r.id}>
                    <TableCell data-label="قلم" className="text-persian font-medium">{r.name}</TableCell>
                    <TableCell data-label="دلار" className="tabular-nums">{r.value_usd.toLocaleString("fa-IR")}</TableCell>
                    <TableCell data-label="قیمت هر دلار" className="tabular-nums text-xs">{r.unit_price_irt.toLocaleString("fa-IR")}</TableCell>
                    <TableCell data-label="جمع (تومان)" className="tabular-nums text-primary">{fmtToman(r.toman)}</TableCell>
                    <TableCell data-label="کارت / سکشن" className="text-persian text-xs">{r.card_name}{r.entry_title ? ` — ${r.entry_title}` : ""}</TableCell>
                    <TableCell data-label="کاربر" className="text-persian text-xs">{r.user_name}<div className="text-muted-foreground">@{r.username}</div></TableCell>
                    <TableCell data-label="کوتاژ" className="text-persian text-xs">
                      <button
                        type="button"
                        onClick={() => setAttachRow(r)}
                        className="text-primary hover:underline font-bold tabular-nums inline-flex items-center gap-1"
                        title="مشاهده پیوست‌ها"
                      >
                        #{r.kotaj_number}
                        {r.attachments && r.attachments.length > 0 && (
                          <Paperclip className="w-3 h-3" />
                        )}
                      </button>
                    </TableCell>
                    <TableCell data-label="تاریخ" className="text-persian text-xs">
                      <div className="tabular-nums">{r.kotaj_date_gregorian || "—"}</div>
                      <div className="text-muted-foreground opacity-70 tabular-nums">{r.kotaj_date_jalali || ""}</div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <Dialog open={!!attachRow} onOpenChange={(v) => !v && setAttachRow(null)}>
          <DialogContent className="panel-fa max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-persian">پیوست‌های کوتاژ #{attachRow?.kotaj_number}</DialogTitle>
            </DialogHeader>
            {!attachRow?.attachments || attachRow.attachments.length === 0 ? (
              <p className="py-6 text-center text-muted-foreground text-persian text-sm">فایلی برای این کوتاژ ثبت نشده است.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {attachRow.attachments.map((p, i) => (
                  <div key={i} className="border rounded-md p-2 bg-muted/30">
                    {isImg(p) ? (
                      <button type="button" onClick={() => setPreview(p)} className="block w-full">
                        <img src={p} alt={`پیوست ${i + 1}`} className="w-full h-32 object-cover rounded" />
                      </button>
                    ) : (
                      <a href={p} target="_blank" rel="noreferrer" className="text-primary text-persian text-sm underline block text-center py-8">
                        مشاهده فایل {i + 1}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </DialogContent>
        </Dialog>

        <Dialog open={!!preview} onOpenChange={(v) => !v && setPreview(null)}>
          <DialogContent className="max-w-3xl panel-fa">
            <DialogHeader><DialogTitle className="text-persian">پیش‌نمایش</DialogTitle></DialogHeader>
            {preview && <img src={preview} alt="پیش‌نمایش" className="w-full h-auto rounded" />}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default TSCards;
