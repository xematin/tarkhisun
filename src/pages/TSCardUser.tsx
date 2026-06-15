import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Loader2, LogOut, CreditCard, Plus, Trash2, FileText, ChevronDown, ChevronUp, Pencil, Download, Search, Wallet, CheckCircle2, Upload, Receipt, Printer } from "lucide-react";
import { downloadKotajPdf } from "@/lib/kotaj-pdf";
import { downloadBillingPdf } from "@/lib/billing-pdf";
import { downloadAllBillingPdf, type BillingCardBundle } from "@/lib/billing-pdf-all";
import type { BillingTimelineEntry } from "@/lib/billing-pdf";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle,
  AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import { lookupCustoms } from "@/data/customsCodes";

// Convert gregorian "YYYY-MM-DD" → jalali "YYYY/MM/DD"
const gToJ = (g: string): string => {
  if (!g) return "";
  try {
    const d = new DateObject({ date: g, format: "YYYY-MM-DD", calendar: gregorian, locale: gregorian_en });
    return d.convert(persian, persian_fa).format("YYYY/MM/DD");
  } catch { return ""; }
};
// Convert jalali "YYYY/MM/DD" → gregorian "YYYY-MM-DD"
const jToG = (j: string): string => {
  if (!j) return "";
  try {
    const d = new DateObject({ date: j, format: "YYYY/MM/DD", calendar: persian, locale: persian_fa });
    return d.convert(gregorian, gregorian_en).format("YYYY-MM-DD");
  } catch { return ""; }
};

type Currency = "USD" | "EUR" | "IRT";
const CURRENCY_LABEL: Record<Currency, string> = { USD: "دلار", EUR: "یورو", IRT: "تومان" };

interface MyEntry {
  entry_id: number | null;
  title: string;
  currency: Currency;
  unit_price_irt: number;
  has_custom_price?: boolean;
  allocated: number;
  used_usd: number;
  remaining: number;
  total_irt: number;
}
interface MyCard {
  id: number;
  name: string;
  updated_at?: string;
  entries: MyEntry[];
  total_irt: number;
  total_usd: number;
  remaining_usd: number;
  kotaj_toman_total?: number;
  payments_toman_total?: number;
  debt_toman?: number;
}

interface MeUser { id: number; first_name: string; last_name: string; username: string; }

interface KotajItem { name: string; value_usd: number; unit_price_irt: number; toman?: number; }
interface Kotaj {
  id: number;
  card_id: number;
  entry_id: number;
  entry_title: string | null;
  kotaj_number: string;
  kotaj_date_jalali: string;
  kotaj_date_gregorian?: string | null;
  total_value_usd: number;
  toman_total?: number;
  created_at: string;
  items: KotajItem[];
}

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

const fmtUSD = (v: number) => `${(isFinite(v) ? v : 0).toLocaleString("fa-IR")} دلار`;
const fmtToman = (v: number) => `${(isFinite(v) ? v : 0).toLocaleString("fa-IR")} تومان`;
const fmtMoney = (v: number, c: Currency) => `${(isFinite(v) ? v : 0).toLocaleString("fa-IR")} ${CURRENCY_LABEL[c]}`;

const normDigits = (raw: string) => {
  const fa = "۰۱۲۳۴۵۶۷۸۹"; const ar = "٠١٢٣٤٥٦٧٨٩";
  return raw.replace(/[۰-۹٠-٩]/g, (d) => {
    const i = fa.indexOf(d); if (i >= 0) return String(i);
    const j = ar.indexOf(d); return j >= 0 ? String(j) : d;
  });
};

type State = "loading" | "login" | "auth";

const TSCardUser = () => {
  const { toast } = useToast();
  const [state, setState] = useState<State>("loading");
  const [me, setMe] = useState<MeUser | null>(null);
  const [overallOpen, setOverallOpen] = useState(false);

  const refresh = useCallback(async () => {
    setState("loading");
    try {
      const r = await api<{ authenticated: boolean; user: MeUser | null }>("/api/cards/me.php");
      if (r.authenticated && r.user) { setMe(r.user); setState("auth"); }
      else setState("login");
    } catch { setState("login"); }
  }, []);

  useEffect(() => { void refresh(); }, [refresh]);

  return (
    <>
      <Helmet>
        <title>پنل کاربر کارت</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="panel-glass panel-fa min-h-screen" dir="rtl">
        <header className="container mx-auto px-4 pt-4">
          <div className="panel-topbar h-14 px-5 flex items-center justify-between">
            <h1 className="text-persian font-bold flex items-center gap-2">
              <CreditCard className="w-5 h-5" /> پنل کارت
            </h1>
            {state === "auth" && me && (
              <div className="flex items-center gap-2 text-sm text-persian">
                <span className="opacity-80 hidden sm:inline">{me.first_name} {me.last_name}</span>
                <Button
                  size="sm"
                  onClick={() => setOverallOpen(true)}
                  className="text-persian bg-gradient-to-l from-primary to-accent text-primary-foreground hover:opacity-90 shadow-sm"
                >
                  <Receipt className="w-4 h-4 ml-1" /> صورتحساب
                </Button>
                <Button
                  variant="ghost" size="sm"
                  onClick={async () => {
                    await api("/api/cards/logout.php", { method: "POST" });
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
          {state === "login" && <LoginForm onDone={refresh} />}
          {state === "auth" && <MyCards toast={toast} />}
        </main>
        {state === "auth" && me && (
          <OverallBillingDialog
            open={overallOpen}
            onClose={() => setOverallOpen(false)}
            toast={toast}
            userName={`${me.first_name} ${me.last_name}`.trim() || me.username}
          />
        )}
      </div>
    </>

  );
};

const LoginForm = ({ onDone }: { onDone: () => void }) => {
  const { toast } = useToast();
  const [u, setU] = useState(""); const [p, setP] = useState(""); const [busy, setBusy] = useState(false);
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader><CardTitle className="text-persian">ورود کاربر کارت</CardTitle></CardHeader>
      <CardContent>
        <form
          onSubmit={async (e) => {
            e.preventDefault(); setBusy(true);
            try {
              await api("/api/cards/login.php", {
                method: "POST",
                body: JSON.stringify({ username: u, password: p }),
              });
              onDone();
            } catch (err) {
              toast({ title: "خطا", description: (err as Error).message, variant: "destructive" });
            } finally { setBusy(false); }
          }}
          className="space-y-3"
        >
          <div className="space-y-2">
            <Label className="text-persian">نام کاربری</Label>
            <Input value={u} onChange={(e) => setU(e.target.value)} dir="ltr" />
          </div>
          <div className="space-y-2">
            <Label className="text-persian">رمز عبور</Label>
            <Input type="password" value={p} onChange={(e) => setP(e.target.value)} dir="ltr" />
          </div>
          <Button type="submit" disabled={busy} className="w-full text-persian">
            {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : "ورود"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

const MyCards = ({ toast }: { toast: ReturnType<typeof useToast>["toast"] }) => {
  const [items, setItems] = useState<MyCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [kotajFor, setKotajFor] = useState<MyCard | null>(null);
  const [editing, setEditing] = useState<Kotaj | null>(null);
  const [listFor, setListFor] = useState<MyCard | null>(null);
  const [payFor, setPayFor] = useState<MyCard | null>(null);
  const [billFor, setBillFor] = useState<MyCard | null>(null);

  const load = useCallback(async () => {
    try {
      const r = await api<{ items: MyCard[] }>("/api/cards/my-cards.php");
      setItems(r.items || []);
    } catch (e) {
      toast({ title: "خطا", description: (e as Error).message, variant: "destructive" });
    } finally { setLoading(false); }
  }, [toast]);

  useEffect(() => { void load(); }, [load]);

  if (loading) {
    return <div className="py-10 text-center"><Loader2 className="w-5 h-5 animate-spin inline" /></div>;
  }
  if (items.length === 0) {
    return <p className="py-10 text-center text-muted-foreground text-persian">هیچ کارتی به شما اختصاص داده نشده است.</p>;
  }
  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(c => {
          const tomanTotal = c.entries
            .filter(e => e.currency === "USD" && e.has_custom_price)
            .reduce((s, e) => s + e.allocated * e.unit_price_irt, 0);
          const kotajToman = c.kotaj_toman_total ?? 0;
          const paid = c.payments_toman_total ?? 0;
          const balance = paid - kotajToman; // >0 بستانکار، <0 بدهکار، 0 تسویه
          const debt = balance < 0 ? -balance : 0;
          const credit = balance > 0 ? balance : 0;
          const hasActivity = kotajToman > 0 || paid > 0;

          let badgeStatus: "debt" | "credit" | "settled" | null = null;
          if (hasActivity) {
            if (balance < 0) badgeStatus = "debt";
            else if (balance > 0) badgeStatus = "credit";
            else badgeStatus = "settled";
          }

          return (
            <Card key={c.id} className="relative overflow-hidden">
              {/* Top-left dynamic status badge */}
              {badgeStatus && (
                <div className="absolute top-2 left-2 z-10">
                  {badgeStatus === "debt" && (
                    <div className="rounded-md bg-destructive/10 border border-destructive/30 px-2 py-1 text-right">
                      <div className="text-[10px] text-destructive/80 text-persian leading-tight">بدهکار</div>
                      <div className="text-xs font-bold tabular-nums text-destructive leading-tight">
                        {fmtToman(debt)}
                      </div>
                    </div>
                  )}
                  {badgeStatus === "credit" && (
                    <div className="rounded-md bg-emerald-500/10 border border-emerald-500/40 px-2 py-1 text-right">
                      <div className="text-[10px] text-emerald-700 text-persian leading-tight">بستانکار</div>
                      <div className="text-xs font-bold tabular-nums text-emerald-700 leading-tight">
                        {fmtToman(credit)}
                      </div>
                    </div>
                  )}
                  {badgeStatus === "settled" && (
                    <div className="rounded-md bg-sky-100 border border-sky-300 px-2 py-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
                      <span className="text-xs font-bold text-sky-700 text-persian">تسویه</span>
                    </div>
                  )}
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-persian text-base flex items-center gap-2">
                  <CreditCard className="w-4 h-4" /> {c.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {c.total_usd > 0 ? (
                  <div className="text-center py-2">
                    <div className="text-xs text-muted-foreground text-persian">سهم کل</div>
                    <div className="text-3xl font-extrabold tabular-nums text-primary">
                      {fmtUSD(c.total_usd)}
                    </div>
                    {tomanTotal > 0 && (
                      <div className="text-xs text-muted-foreground tabular-nums text-persian mt-1">
                        معادل {fmtToman(tomanTotal)}
                      </div>
                    )}
                    {c.remaining_usd !== c.total_usd && (
                      <div className="text-xs text-emerald-600 tabular-nums text-persian mt-1">
                        مانده: {fmtUSD(c.remaining_usd)}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-persian">
                    <span className="text-sm text-muted-foreground">سهم کل (تومان)</span>
                    <span className="text-xl font-bold tabular-nums">{fmtToman(c.total_irt)}</span>
                  </div>
                )}
                <div className="border-t pt-3 space-y-2">
                  {c.entries.map((e, idx) => (
                    <div key={e.entry_id ?? idx} className="text-persian text-sm">
                      <div className="flex justify-between font-medium">
                        <span>{e.title}</span>
                        <span className="tabular-nums">{fmtMoney(e.allocated, e.currency)}</span>
                      </div>
                      {e.currency === "USD" && e.used_usd > 0 && (
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>مانده پس از کوتاژ</span>
                          <span className="tabular-nums">{fmtUSD(e.remaining)}</span>
                        </div>
                      )}
                      {e.currency !== "IRT" && e.has_custom_price && (
                        <div className="text-xs text-muted-foreground tabular-nums">
                          قیمت هر {CURRENCY_LABEL[e.currency]}: {e.unit_price_irt.toLocaleString("fa-IR")} تومان
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {kotajToman > 0 && (
                  <div className="border-t pt-3 text-persian text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">مجموع هزینه کوتاژها</span>
                      <span className="tabular-nums font-bold">{fmtToman(kotajToman)}</span>
                    </div>
                    {paid > 0 && (
                      <div className="flex justify-between text-emerald-600">
                        <span>پرداختی</span>
                        <span className="tabular-nums font-bold">{fmtToman(paid)}</span>
                      </div>
                    )}
                  </div>
                )}
                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1 text-persian" onClick={() => setKotajFor(c)}>
                    <Plus className="w-4 h-4 ml-1" /> افزودن کوتاژ
                  </Button>
                  <Button size="sm" variant="outline" className="text-persian" onClick={() => setListFor(c)}>
                    <FileText className="w-4 h-4 ml-1" /> کوتاژها
                  </Button>
                </div>
                <Button
                  size="sm"
                  variant={debt > 0 ? "default" : "outline"}
                  className={`w-full text-persian ${debt > 0 ? "bg-emerald-600 hover:bg-emerald-700 text-white" : ""}`}
                  onClick={() => setPayFor(c)}
                >
                  <Wallet className="w-4 h-4 ml-1" /> پرداخت
                  {debt > 0 && <span className="mr-2 text-xs opacity-90">({fmtToman(debt)})</span>}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full text-persian"
                  onClick={() => setBillFor(c)}
                >
                  <Receipt className="w-4 h-4 ml-1" /> صورتحساب
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <KotajDialog
        card={kotajFor}
        editing={editing}
        onClose={() => { setKotajFor(null); setEditing(null); }}
        onSaved={() => { setKotajFor(null); setEditing(null); void load(); }}
        toast={toast}
      />
      <KotajListDialog
        card={listFor}
        onClose={() => setListFor(null)}
        onEdit={(k) => {
          const c = items.find(x => x.id === k.card_id) || null;
          setListFor(null);
          setKotajFor(c);
          setEditing(k);
        }}
        onChanged={() => void load()}
        toast={toast}
      />
      <PaymentDialog
        card={payFor}
        onClose={() => setPayFor(null)}
        onSaved={() => { setPayFor(null); void load(); }}
        toast={toast}
      />
      <BillingDialog
        card={billFor}
        onClose={() => setBillFor(null)}
        toast={toast}
      />
    </>
  );
};


interface ItemDraft { name: string; value_usd: string; unit_price_irt: string; }
const emptyItem = (defaultPrice?: number): ItemDraft => ({
  name: "",
  value_usd: "",
  unit_price_irt: defaultPrice && defaultPrice > 0 ? String(defaultPrice) : "",
});

const KotajDialog = ({
  card, editing, onClose, onSaved, toast,
}: {
  card: MyCard | null;
  editing?: Kotaj | null;
  onClose: () => void;
  onSaved: () => void;
  toast: ReturnType<typeof useToast>["toast"];
}) => {
  const [entryId, setEntryId] = useState<string>("");
  const [num, setNum] = useState("");
  // Primary date is gregorian (YYYY-MM-DD); jalali shown faded below
  const [dateG, setDateG] = useState<string>("");
  const [items, setItems] = useState<ItemDraft[]>([emptyItem()]);
  const [busy, setBusy] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const date = useMemo(() => gToJ(dateG), [dateG]);

  useEffect(() => {
    if (card) {
      const usdEntries = card.entries.filter(e => e.currency === "USD" && e.entry_id !== null);
      if (editing) {
        setEntryId(String(editing.entry_id));
        setNum(editing.kotaj_number);
        const g = editing.kotaj_date_gregorian || jToG(editing.kotaj_date_jalali);
        setDateG(g);
        setItems(editing.items.length
          ? editing.items.map(it => ({
              name: it.name,
              value_usd: String(it.value_usd),
              unit_price_irt: String(it.unit_price_irt),
            }))
          : [emptyItem()]);
      } else {
        const firstEntry = usdEntries[0];
        setEntryId(firstEntry?.entry_id ? String(firstEntry.entry_id) : "");
        setNum("");
        setDateG("");
        const defPrice = firstEntry?.has_custom_price ? firstEntry.unit_price_irt : 0;
        setItems([emptyItem(defPrice)]);
      }
    }
  }, [card, editing]);

  const usdEntriesAll = card ? card.entries.filter(e => e.currency === "USD" && e.entry_id !== null) : [];
  const selected = usdEntriesAll.find(e => String(e.entry_id) === entryId);
  const refPrice = selected && selected.has_custom_price ? selected.unit_price_irt : 0;

  // Auto-fill empty price fields with new refPrice when entry changes
  useEffect(() => {
    if (!refPrice) return;
    setItems(prev => prev.map(it => (
      it.unit_price_irt === "" ? { ...it, unit_price_irt: String(refPrice) } : it
    )));
  }, [refPrice]);

  if (!card) return null;
  const usdEntries = usdEntriesAll;
  const totalUsd = items.reduce((s, it) => s + (parseFloat(normDigits(it.value_usd)) || 0), 0);
  const editingOwn = editing && selected && editing.entry_id === selected.entry_id ? editing.total_value_usd : 0;
  const remainBase = selected ? selected.remaining + editingOwn : 0;
  const remainLive = remainBase - totalUsd;
  const over = selected ? remainLive < -0.0001 : false;
  const totalToman = items.reduce((s, it) => {
    const v = parseFloat(normDigits(it.value_usd)) || 0;
    const p = parseFloat(normDigits(it.unit_price_irt)) || 0;
    return s + v * p;
  }, 0);
  const customs = lookupCustoms(num);
  const customsCode = customs?.code || "";
  const customsName = customs?.name || "";

  const update = (i: number, patch: Partial<ItemDraft>) => {
    setItems(prev => prev.map((it, idx) => idx === i ? { ...it, ...patch } : it));
  };
  const add = () => setItems(prev => [...prev, emptyItem(refPrice)]);
  const remove = (i: number) => setItems(prev => prev.length > 1 ? prev.filter((_, idx) => idx !== i) : prev);

  const validate = (): boolean => {
    if (!entryId) { toast({ title: "سکشن را انتخاب کنید", variant: "destructive" }); return false; }
    const numClean = normDigits(num).replace(/\D/g, "");
    if (!numClean) { toast({ title: "شماره کوتاژ معتبر نیست", variant: "destructive" }); return false; }
    if (!dateG) { toast({ title: "تاریخ کوتاژ را وارد کنید", variant: "destructive" }); return false; }
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      if (!it.name.trim()) { toast({ title: `نام کالای قلم ${i + 1}`, variant: "destructive" }); return false; }
      const v = parseFloat(normDigits(it.value_usd)) || 0;
      if (v <= 0) { toast({ title: `ارزش کالای «${it.name}»`, variant: "destructive" }); return false; }
    }
    if (over) { toast({ title: "ارزش کل کوتاژ از مانده سکشن بیشتر است", variant: "destructive" }); return false; }
    return true;
  };

  const onSubmitClick = () => { if (validate()) setConfirmOpen(true); };

  const doSave = async () => {
    setConfirmOpen(false);
    setBusy(true);
    try {
      const numClean = normDigits(num).replace(/\D/g, "");
      const payload = {
        entry_id: Number(entryId),
        kotaj_number: numClean,
        kotaj_date_jalali: date,
        kotaj_date_gregorian: dateG,
        customs_code: customsCode,
        customs_name: customsName,
        items: items.map(it => ({
          name: it.name.trim(),
          value_usd: parseFloat(normDigits(it.value_usd)) || 0,
          unit_price_irt: parseFloat(normDigits(it.unit_price_irt)) || 0,
        })),
      };
      if (editing) {
        await api("/api/cards/kotaj-update.php", {
          method: "POST",
          body: JSON.stringify({ id: editing.id, ...payload }),
        });
        toast({ title: "کوتاژ ویرایش شد" });
      } else {
        await api("/api/cards/kotaj-create.php", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        toast({ title: "کوتاژ ثبت شد" });
      }
      onSaved();
    } catch (e) {
      toast({ title: "خطا", description: (e as Error).message, variant: "destructive" });
    } finally { setBusy(false); }
  };

  return (
    <Dialog open={!!card} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent dir="rtl" className="max-w-2xl panel-fa max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-persian text-right">افزودن کوتاژ — {card.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-persian">سکشن کارت</Label>
              <Select value={entryId} onValueChange={setEntryId}>
                <SelectTrigger className="text-persian"><SelectValue placeholder="انتخاب سکشن" /></SelectTrigger>
                <SelectContent>
                  {usdEntries.map(e => (
                    <SelectItem key={e.entry_id} value={String(e.entry_id)} className="text-persian">
                      {e.title} (مانده: {fmtUSD(e.remaining)})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-persian">شماره کوتاژ</Label>
              <Input
                value={num}
                onChange={(e) => {
                  const digits = normDigits(e.target.value).replace(/\D/g, "");
                  const formatted = digits.length > 5
                    ? digits.slice(0, 5) + "-" + digits.slice(5, 12)
                    : digits;
                  setNum(formatted);
                }}
                inputMode="numeric" dir="ltr" placeholder="50100-1234567"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-persian">تاریخ کوتاژ (میلادی)</Label>
              <DatePicker
                value={dateG}
                onChange={(d) => setDateG(d ? d.format("YYYY-MM-DD") : "")}
                calendar={gregorian}
                locale={gregorian_en}
                inputClass="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                format="YYYY-MM-DD"
                placeholder="2026-05-25"
              />
              {date && (
                <div className="text-xs text-muted-foreground text-persian tabular-nums opacity-70">
                  شمسی: {date}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-persian">گمرک خروجی</Label>
              <Input
                value={customsName || (customsCode ? "کد گمرک نامعتبر" : "")}
                readOnly
                tabIndex={-1}
                className="text-persian bg-muted/50 cursor-not-allowed"
                placeholder="با وارد کردن شماره کوتاژ پر می‌شود"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-persian">قلم‌های کوتاژ</Label>
              <div className={`text-sm font-bold tabular-nums text-persian ${over ? "text-destructive" : "text-emerald-600"}`}>
                جمع: {fmtUSD(totalUsd)} {selected && `/ مانده: ${fmtUSD(remainLive)}`}
              </div>
            </div>
            {items.map((it, i) => {
              const priceNum = parseFloat(normDigits(it.unit_price_irt)) || 0;
              const valNum = parseFloat(normDigits(it.value_usd)) || 0;
              const itemToman = valNum * priceNum;
              let priceClass = "";
              if (refPrice && priceNum > 0) {
                if (priceNum < refPrice) priceClass = "text-destructive font-bold";
                else if (priceNum > refPrice) priceClass = "text-emerald-600 font-bold";
              }
              return (
              <div key={i} className="border rounded-md p-3 space-y-3 bg-muted/30">
                <div className="flex items-center justify-between">
                  <span className="text-persian text-sm font-bold">قلم {i + 1}</span>
                  <div className="flex items-center gap-3">
                    {itemToman > 0 && (
                      <span className="text-persian text-xs tabular-nums text-primary font-bold">
                        {fmtToman(itemToman)}
                      </span>
                    )}
                    {items.length > 1 && (
                      <Button size="sm" variant="ghost" onClick={() => remove(i)} className="text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <Label className="text-persian text-xs">نام کالا</Label>
                    <Input value={it.name} onChange={(e) => update(i, { name: e.target.value })} className="text-persian" placeholder="سنگ" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-persian text-xs">ارزش کالا (دلار)</Label>
                    <Input value={it.value_usd} onChange={(e) => update(i, { value_usd: normDigits(e.target.value) })} inputMode="decimal" dir="ltr" placeholder="200" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-persian text-xs">
                      قیمت هر دلار (تومان)
                      {refPrice ? <span className="text-muted-foreground"> — مرجع: {refPrice.toLocaleString("fa-IR")}</span> : null}
                    </Label>
                    <Input value={it.unit_price_irt} onChange={(e) => update(i, { unit_price_irt: normDigits(e.target.value) })} inputMode="decimal" dir="ltr" placeholder="5200" className={priceClass} />
                  </div>
                </div>
              </div>
            );})}
            <Button variant="outline" size="sm" onClick={add} className="text-persian w-full">
              <Plus className="w-4 h-4 ml-1" /> افزودن قلم
            </Button>
          </div>

          <div className="rounded-md border p-3 bg-primary/5 text-persian space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">ارزش کل سند کوتاژ</span>
              <span className="font-bold text-lg tabular-nums">{fmtUSD(totalUsd)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">هزینهٔ کل (تومان)</span>
              <span className="font-bold text-lg tabular-nums text-primary">{fmtToman(totalToman)}</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="text-persian">انصراف</Button>
          <Button onClick={onSubmitClick} disabled={busy || over} className="text-persian">
            {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : (editing ? "ذخیره ویرایش" : "ثبت کوتاژ")}
          </Button>
        </DialogFooter>
      </DialogContent>
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent dir="rtl" className="panel-fa">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-persian text-right">تأیید ثبت کوتاژ</AlertDialogTitle>
            <AlertDialogDescription className="text-persian text-right space-y-1">
              <span className="block">ارزش کل: <strong className="tabular-nums">{fmtUSD(totalUsd)}</strong></span>
              <span className="block">هزینهٔ کل این کوتاژ برای شما: <strong className="tabular-nums text-primary">{fmtToman(totalToman)}</strong></span>
              <span className="block text-xs text-muted-foreground mt-2">آیا تأیید می‌کنید؟</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-persian">انصراف</AlertDialogCancel>
            <AlertDialogAction onClick={doSave} className="text-persian">تأیید و ثبت</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
};

const KotajListDialog = ({
  card, onClose, onEdit, onChanged, toast,
}: {
  card: MyCard | null;
  onClose: () => void;
  onEdit: (k: Kotaj) => void;
  onChanged: () => void;
  toast: ReturnType<typeof useToast>["toast"];
}) => {
  const [items, setItems] = useState<Kotaj[]>([]);
  const [loading, setLoading] = useState(false);
  const [openId, setOpenId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [busyDel, setBusyDel] = useState(false);
  const [q, setQ] = useState("");
  const [entryFilter, setEntryFilter] = useState<string>("all");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");

  const reload = useCallback(() => {
    if (!card) return;
    setLoading(true);
    api<{ items: Kotaj[] }>(`/api/cards/kotaj-list.php?card_id=${card.id}`)
      .then(r => setItems(r.items || []))
      .catch(e => toast({ title: "خطا", description: (e as Error).message, variant: "destructive" }))
      .finally(() => setLoading(false));
  }, [card, toast]);

  useEffect(() => { reload(); }, [reload]);

  const doDelete = async () => {
    if (deleteId == null) return;
    setBusyDel(true);
    try {
      await api("/api/cards/kotaj-delete.php", {
        method: "POST",
        body: JSON.stringify({ id: deleteId }),
      });
      toast({ title: "کوتاژ حذف شد" });
      setDeleteId(null);
      reload();
      onChanged();
    } catch (e) {
      toast({ title: "خطا", description: (e as Error).message, variant: "destructive" });
    } finally { setBusyDel(false); }
  };

  if (!card) return null;

  const entryOptions = Array.from(new Map(items.map(i => [i.entry_id, i.entry_title || "—"])).entries());
  const qNorm = normDigits(q).trim();
  const fromNorm = normDigits(dateFrom).trim();
  const toNorm = normDigits(dateTo).trim();
  const filtered = items.filter(k => {
    if (qNorm && !normDigits(k.kotaj_number).includes(qNorm)) return false;
    if (entryFilter !== "all" && String(k.entry_id) !== entryFilter) return false;
    const d = normDigits(k.kotaj_date_jalali);
    if (fromNorm && d < fromNorm) return false;
    if (toNorm && d > toNorm) return false;
    return true;
  });

  return (
    <Dialog open={!!card} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent dir="rtl" className="max-w-2xl panel-fa max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-persian text-right">کوتاژهای ثبت‌شده — {card.name}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="جستجوی شماره کوتاژ"
              className="text-persian pr-8"
              dir="ltr"
            />
          </div>
          <Select value={entryFilter} onValueChange={setEntryFilter}>
            <SelectTrigger className="text-persian"><SelectValue placeholder="همه سکشن‌ها" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-persian">همه سکشن‌ها</SelectItem>
              {entryOptions.map(([id, title]) => (
                <SelectItem key={id} value={String(id)} className="text-persian">{title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            placeholder="از تاریخ (1405/01/01)"
            className="text-persian"
            dir="ltr"
          />
          <Input
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            placeholder="تا تاریخ (1405/12/29)"
            className="text-persian"
            dir="ltr"
          />
          {(q || entryFilter !== "all" || dateFrom || dateTo) && (
            <div className="md:col-span-2 flex items-center justify-between text-xs text-persian text-muted-foreground">
              <span>{filtered.length.toLocaleString("fa-IR")} مورد از {items.length.toLocaleString("fa-IR")}</span>
              <Button size="sm" variant="ghost" onClick={() => { setQ(""); setEntryFilter("all"); setDateFrom(""); setDateTo(""); }}>
                پاک کردن فیلتر
              </Button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="py-8 text-center"><Loader2 className="w-5 h-5 animate-spin inline" /></div>
        ) : filtered.length === 0 ? (
          <p className="py-8 text-center text-muted-foreground text-persian text-sm">{items.length === 0 ? "هنوز کوتاژی ثبت نکرده‌اید." : "موردی با فیلتر مطابقت ندارد."}</p>
        ) : (
          <div className="space-y-2">
            {filtered.map(k => (
              <div key={k.id} className="border rounded-md">
                <div className="w-full p-3 flex items-center justify-between gap-2">
                  <button
                    className="flex-1 flex items-center justify-between text-right hover:bg-muted/30 rounded-md p-2 -m-2"
                    onClick={() => setOpenId(openId === k.id ? null : k.id)}
                  >
                    <div className="flex-1 text-persian text-sm space-y-1">
                      <div className="font-bold">کوتاژ #{k.kotaj_number}</div>
                      <div className="text-xs text-muted-foreground">
                        {k.kotaj_date_gregorian || k.kotaj_date_jalali} — سکشن: {k.entry_title || "—"}
                      </div>
                      {k.kotaj_date_gregorian && (
                        <div className="text-[10px] text-muted-foreground opacity-70 tabular-nums">
                          شمسی: {k.kotaj_date_jalali}
                        </div>
                      )}
                    </div>
                    <div className="text-persian font-bold tabular-nums text-left">
                      <div className="text-primary">{fmtUSD(k.total_value_usd)}</div>
                      {(k.toman_total ?? 0) > 0 && (
                        <div className="text-xs text-muted-foreground">{fmtToman(k.toman_total ?? 0)}</div>
                      )}
                    </div>
                    {openId === k.id ? <ChevronUp className="w-4 h-4 mr-2" /> : <ChevronDown className="w-4 h-4 mr-2" />}
                  </button>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" onClick={() => downloadKotajPdf(k, card.name)} title="دانلود PDF">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => onEdit(k)} title="ویرایش">
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setDeleteId(k.id)} title="حذف" className="text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                {openId === k.id && (
                  <div className="border-t p-3 space-y-2 bg-muted/20">
                    {k.items.map((it, i) => {
                      const itToman = (it.toman ?? it.value_usd * it.unit_price_irt);
                      return (
                      <div key={i} className="flex justify-between text-persian text-sm gap-2">
                        <span className="flex-1">{it.name}</span>
                        <span className="tabular-nums text-left">
                          <span>{fmtUSD(it.value_usd)}</span>
                          {it.unit_price_irt > 0 && (
                            <span className="text-xs text-muted-foreground block">
                              {it.unit_price_irt.toLocaleString("fa-IR")} ت/دلار = <strong className="text-primary">{fmtToman(itToman)}</strong>
                            </span>
                          )}
                        </span>
                      </div>
                    );})}
                    {(k.toman_total ?? 0) > 0 && (
                      <div className="border-t pt-2 mt-2 flex justify-between text-persian text-sm">
                        <span className="font-bold">مجموع تومانی</span>
                        <span className="font-bold tabular-nums text-primary">{fmtToman(k.toman_total ?? 0)}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </DialogContent>
      <AlertDialog open={deleteId != null} onOpenChange={(v) => { if (!v) setDeleteId(null); }}>
        <AlertDialogContent dir="rtl" className="panel-fa">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-persian text-right">حذف کوتاژ</AlertDialogTitle>
            <AlertDialogDescription className="text-persian text-right">
              آیا از حذف این کوتاژ مطمئن هستید؟ این عمل غیرقابل بازگشت است.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-persian">انصراف</AlertDialogCancel>
            <AlertDialogAction onClick={doDelete} disabled={busyDel} className="text-persian">
              {busyDel ? <Loader2 className="w-4 h-4 animate-spin" /> : "حذف"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
};

const PaymentDialog = ({
  card, onClose, onSaved, toast,
}: {
  card: MyCard | null;
  onClose: () => void;
  onSaved: () => void;
  toast: ReturnType<typeof useToast>["toast"];
}) => {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (card) {
      const debt = card.debt_toman ?? 0;
      setAmount(debt > 0 ? String(Math.round(debt)) : "");
      setNote(""); setFile(null); setPreview(null);
    }
  }, [card]);

  useEffect(() => {
    if (!file) { setPreview(null); return; }
    if (!file.type.startsWith("image/")) { setPreview(null); return; }
    const u = URL.createObjectURL(file);
    setPreview(u);
    return () => URL.revokeObjectURL(u);
  }, [file]);

  if (!card) return null;
  const debt = card.debt_toman ?? 0;
  const amtNum = parseFloat(normDigits(amount)) || 0;

  const submit = async () => {
    if (amtNum <= 0) { toast({ title: "مبلغ معتبر نیست", variant: "destructive" }); return; }
    if (!file) { toast({ title: "تصویر فیش الزامی است", variant: "destructive" }); return; }
    if (file.size > 10 * 1024 * 1024) { toast({ title: "حجم فایل بیش از ۱۰ مگابایت است", variant: "destructive" }); return; }
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("card_id", String(card.id));
      fd.append("amount_irt", String(amtNum));
      if (note.trim()) fd.append("note", note.trim());
      fd.append("receipt", file);
      const res = await fetch("/api/cards/payment-create.php", {
        method: "POST",
        credentials: "same-origin",
        body: fd,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((data as { error?: string }).error || `HTTP ${res.status}`);
      toast({ title: "پرداخت ثبت شد", description: "از مجموع بدهی شما کسر شد." });
      onSaved();
    } catch (e) {
      toast({ title: "خطا", description: (e as Error).message, variant: "destructive" });
    } finally { setBusy(false); }
  };

  return (
    <Dialog open={!!card} onOpenChange={(v) => { if (!v && !busy) onClose(); }}>
      <DialogContent dir="rtl" className="max-w-md panel-fa">
        <DialogHeader>
          <DialogTitle className="text-persian text-right flex items-center gap-2">
            <Wallet className="w-5 h-5" /> ثبت پرداخت — {card.name}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="rounded-md border bg-muted/30 p-3 text-persian text-sm space-y-1">
            <div className="flex justify-between">
              <span className="text-muted-foreground">مجموع هزینه کوتاژها</span>
              <span className="tabular-nums font-bold">{fmtToman(card.kotaj_toman_total ?? 0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">پرداختی تاکنون</span>
              <span className="tabular-nums font-bold text-emerald-600">{fmtToman(card.payments_toman_total ?? 0)}</span>
            </div>
            <div className="flex justify-between border-t pt-1 mt-1">
              <span>بدهی فعلی</span>
              <span className={`tabular-nums font-bold ${debt > 0 ? "text-destructive" : "text-emerald-600"}`}>
                {fmtToman(debt)}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-persian">مبلغ پرداخت (تومان)</Label>
            <Input
              value={amount ? Number(amount).toLocaleString("en-US") : ""}
              onChange={(e) => setAmount(normDigits(e.target.value).replace(/[^\d]/g, ""))}
              inputMode="decimal" dir="ltr" placeholder="1,000,000"
              className="text-lg font-bold tabular-nums"
            />
            {amtNum > 0 && (
              <div className="text-xs text-muted-foreground text-persian tabular-nums">
                {amtNum.toLocaleString("fa-IR")} تومان
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-persian">عکس فیش واریزی</Label>
            <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-border rounded-md p-4 cursor-pointer hover:bg-muted/30 transition">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,application/pdf"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              {file ? (
                <>
                  {preview ? (
                    <img src={preview} alt="پیش‌نمایش فیش" className="max-h-40 rounded-md" />
                  ) : (
                    <FileText className="w-10 h-10 text-primary" />
                  )}
                  <div className="text-xs text-persian text-muted-foreground">{file.name}</div>
                </>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-muted-foreground" />
                  <div className="text-sm text-persian text-muted-foreground">
                    کلیک کنید و فایل را انتخاب کنید (JPG/PNG/PDF تا ۱۰MB)
                  </div>
                </>
              )}
            </label>
          </div>

          <div className="space-y-2">
            <Label className="text-persian">توضیح (اختیاری)</Label>
            <Input value={note} onChange={(e) => setNote(e.target.value)} className="text-persian" placeholder="شماره پیگیری، توضیح..." />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={busy} className="text-persian">انصراف</Button>
          <Button onClick={submit} disabled={busy} className="text-persian bg-emerald-600 hover:bg-emerald-700 text-white">
            {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : "ثبت پرداخت"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface Payment {
  id: number;
  card_id: number;
  amount_irt: number;
  receipt_path?: string | null;
  note?: string | null;
  status: string;
  created_at: string;
}

const STATUS_LABEL: Record<string, string> = {
  confirmed: "تایید شده",
  pending: "در انتظار",
  rejected: "رد شده",
};
const STATUS_CLASS: Record<string, string> = {
  confirmed: "text-emerald-600",
  pending: "text-amber-600",
  rejected: "text-destructive",
};

type TimelineEntry =
  | { kind: "kotaj"; date: string; data: Kotaj }
  | { kind: "payment"; date: string; data: Payment };

const BillingDialog = ({
  card, onClose, toast,
}: {
  card: MyCard | null;
  onClose: () => void;
  toast: ReturnType<typeof useToast>["toast"];
}) => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [kotajs, setKotajs] = useState<Kotaj[]>([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!card) return;
    setLoading(true);
    setExpanded(new Set());
    Promise.all([
      api<{ items: Payment[] }>(`/api/cards/payments-list.php?card_id=${card.id}`),
      api<{ items: Kotaj[] }>(`/api/cards/kotaj-list.php?card_id=${card.id}`),
    ])
      .then(([p, k]) => {
        setPayments(p.items || []);
        setKotajs(k.items || []);
      })
      .catch(e => toast({ title: "خطا", description: (e as Error).message, variant: "destructive" }))
      .finally(() => setLoading(false));
  }, [card, toast]);

  if (!card) return null;

  const totalPaid = payments.reduce((s, p) => s + p.amount_irt, 0);
  const byStatus = payments.reduce<Record<string, number>>((acc, p) => {
    const k = (p.status || "pending").toLowerCase();
    acc[k] = (acc[k] || 0) + p.amount_irt;
    return acc;
  }, {});
  const kotajToman = card.kotaj_toman_total ?? 0;
  const paid = card.payments_toman_total ?? 0;
  const balance = paid - kotajToman;

  const timeline: TimelineEntry[] = [
    ...kotajs.map<TimelineEntry>(k => ({ kind: "kotaj", date: k.created_at, data: k })),
    ...payments.map<TimelineEntry>(p => ({ kind: "payment", date: p.created_at, data: p })),
  ].sort((a, b) => (a.date || "").localeCompare(b.date || ""));

  const toggle = (id: number) => {
    setExpanded(prev => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id); else n.add(id);
      return n;
    });
  };

  return (
    <Dialog open={!!card} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent dir="rtl" className="max-w-3xl panel-fa max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-persian text-right flex items-center gap-2">
            <Receipt className="w-5 h-5" /> صورتحساب — {card.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-persian">
            <div className="border rounded-md p-2 bg-muted/30">
              <div className="text-[11px] text-muted-foreground">هزینه کوتاژها</div>
              <div className="text-sm font-bold tabular-nums">{fmtToman(kotajToman)}</div>
            </div>
            <div className="border rounded-md p-2 bg-emerald-500/10">
              <div className="text-[11px] text-muted-foreground">مجموع پرداختی</div>
              <div className="text-sm font-bold tabular-nums text-emerald-700">{fmtToman(paid)}</div>
            </div>
            <div className="border rounded-md p-2 bg-amber-500/10">
              <div className="text-[11px] text-muted-foreground">در انتظار تایید</div>
              <div className="text-sm font-bold tabular-nums text-amber-700">{fmtToman(byStatus.pending || 0)}</div>
            </div>
            <div className={`border rounded-md p-2 ${balance >= 0 ? "bg-sky-500/10" : "bg-destructive/10"}`}>
              <div className="text-[11px] text-muted-foreground">{balance >= 0 ? "بستانکار" : "بدهکار"}</div>
              <div className={`text-sm font-bold tabular-nums ${balance >= 0 ? "text-sky-700" : "text-destructive"}`}>
                {fmtToman(Math.abs(balance))}
              </div>
            </div>
          </div>

          {loading ? (
            <div className="py-8 text-center"><Loader2 className="w-5 h-5 animate-spin inline" /></div>
          ) : timeline.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground text-persian text-sm">رویدادی ثبت نشده است.</p>
          ) : (
            <div className="border rounded-md overflow-hidden">
              <table className="w-full text-sm text-persian">
                <thead className="bg-muted/40">
                  <tr>
                    <th className="text-right p-2 w-32">تاریخ</th>
                    <th className="text-right p-2 w-20">نوع</th>
                    <th className="text-right p-2">شرح</th>
                    <th className="text-right p-2 w-32">مبلغ (تومان)</th>
                    <th className="text-right p-2 w-24">وضعیت / اکشن</th>
                  </tr>
                </thead>
                <tbody>
                  {timeline.map((ev, idx) => {
                    if (ev.kind === "kotaj") {
                      const k = ev.data;
                      const isOpen = expanded.has(k.id);
                      return (
                        <Fragment key={`k-${k.id}`}>
                          <tr
                            className="border-t bg-indigo-500/5 hover:bg-indigo-500/10 cursor-pointer"
                            onClick={() => toggle(k.id)}
                          >
                            <td className="p-2 text-xs tabular-nums">{k.created_at?.slice(0, 16).replace("T", " ")}</td>
                            <td className="p-2">
                              <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-700">کوتاژ</span>
                            </td>
                            <td className="p-2 text-xs">
                              <div className="font-bold">شماره {k.kotaj_number}</div>
                              <div className="text-muted-foreground">
                                {k.entry_title || "—"} • تاریخ کوتاژ: {k.kotaj_date_jalali} • ارزش: {k.total_value_usd.toLocaleString()} $
                              </div>
                            </td>
                            <td className="p-2 tabular-nums font-bold">{fmtToman(k.toman_total)}</td>
                            <td className="p-2 text-xs">
                              {isOpen ? <ChevronUp className="w-4 h-4 inline" /> : <ChevronDown className="w-4 h-4 inline" />}
                              <span className="mr-1">{k.items.length} قلم</span>
                            </td>
                          </tr>
                          {isOpen && (
                            <tr className="border-t bg-muted/20">
                              <td colSpan={5} className="p-3">
                                <div className="text-xs font-bold mb-2">ریز اقلام کوتاژ {k.kotaj_number}</div>
                                <table className="w-full text-xs">
                                  <thead className="bg-background">
                                    <tr>
                                      <th className="text-right p-1.5 border">نام کالا</th>
                                      <th className="text-right p-1.5 border">ارزش ($)</th>
                                      <th className="text-right p-1.5 border">قیمت هر دلار (تومان)</th>
                                      <th className="text-right p-1.5 border">جمع (تومان)</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {k.items.map((it, i) => (
                                      <tr key={i}>
                                        <td className="p-1.5 border">{it.name}</td>
                                        <td className="p-1.5 border tabular-nums">{it.value_usd.toLocaleString()}</td>
                                        <td className="p-1.5 border tabular-nums">{fmtToman(it.unit_price_irt)}</td>
                                        <td className="p-1.5 border tabular-nums font-bold">{fmtToman(it.toman)}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                  <tfoot>
                                    <tr className="bg-muted/30">
                                      <td className="p-1.5 border font-bold" colSpan={3}>جمع کوتاژ</td>
                                      <td className="p-1.5 border tabular-nums font-bold">{fmtToman(k.toman_total)}</td>
                                    </tr>
                                  </tfoot>
                                </table>
                              </td>
                            </tr>
                          )}
                        </Fragment>
                      );
                    }
                    const p = ev.data;
                    const st = (p.status || "pending").toLowerCase();
                    return (
                      <tr key={`p-${p.id}`} className="border-t bg-emerald-500/5">
                        <td className="p-2 text-xs tabular-nums">{p.created_at?.slice(0, 16).replace("T", " ")}</td>
                        <td className="p-2">
                          <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-700">پرداخت</span>
                        </td>
                        <td className="p-2 text-xs text-muted-foreground">
                          {p.note || "—"}
                          {p.receipt_path ? (
                            <>
                              {" • "}
                              <a href={p.receipt_path} target="_blank" rel="noreferrer" className="text-primary underline">فیش</a>
                            </>
                          ) : null}
                        </td>
                        <td className="p-2 tabular-nums font-bold text-emerald-700">{fmtToman(p.amount_irt)}</td>
                        <td className={`p-2 text-xs font-bold ${STATUS_CLASS[st] || ""}`}>{STATUS_LABEL[st] || st}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-muted/30">
                  <tr>
                    <td className="p-2 font-bold" colSpan={3}>جمع پرداختی‌ها</td>
                    <td className="p-2 font-bold tabular-nums">{fmtToman(totalPaid)}</td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 flex-wrap">
          <Button
            onClick={() => downloadBillingPdf(card.name, timeline, {
              kotajToman, paid, pending: byStatus.pending || 0, balance,
            })}
            disabled={loading}
            className="text-persian bg-gradient-to-l from-primary to-accent text-primary-foreground hover:opacity-90 shadow-md"
          >
            <Download className="w-4 h-4 ml-1" /> دانلود PDF
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

export default TSCardUser;


