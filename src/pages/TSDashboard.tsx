import { useEffect, useMemo, useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Loader2, LogOut, Search, Trash2, Download, RefreshCw, ArrowRight, Phone, CreditCard, BookOpen, Save } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

type AdminState = "loading" | "setup" | "login" | "auth";

interface LeadRow {
  id: number;
  phone: string;
  first_seen: string;
  last_seen: string;
  search_count: number;
  ip: string | null;
  note: string | null;
  status: "new" | "contacted" | "done" | "rejected";
  recent_queries?: { query: string; created_at: string }[];
}
interface LogRow { id: number; query: string; created_at: string; }

const fmt = (s: string) => {
  if (!s) return "—";
  try { return new Date(s.replace(" ", "T")).toLocaleString("fa-IR"); }
  catch { return s; }
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

const TSDashboard = () => {
  const { toast } = useToast();
  const [state, setState] = useState<AdminState>("loading");
  const [username, setUsername] = useState<string>("");

  const refreshAuth = useCallback(async () => {
    setState("loading");
    try {
      const me = await api<{ authenticated: boolean; username?: string }>("/api/admin/me.php");
      if (me.authenticated) {
        setUsername(me.username || "");
        setState("auth");
        return;
      }
      const setup = await api<{ needs_setup: boolean }>("/api/admin/setup.php");
      setState(setup.needs_setup ? "setup" : "login");
    } catch (e) {
      toast({ title: "خطا", description: (e as Error).message, variant: "destructive" });
      setState("login");
    }
  }, [toast]);

  useEffect(() => { void refreshAuth(); }, [refreshAuth]);

  return (
    <>
      <Helmet>
        <title>پنل مدیریت ترخیصان</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="panel-glass panel-fa min-h-screen" dir="rtl">
        <header className="container mx-auto px-4 pt-4">
          <div className="panel-topbar h-14 px-5 flex items-center justify-between">
            <h1 className="text-persian font-bold">پنل مدیریت ترخیصان</h1>
            {state === "auth" && (
              <div className="flex items-center gap-3 text-sm text-persian">
                <span className="opacity-80">{username}</span>
                <Button
                  variant="ghost" size="sm"
                  onClick={async () => {
                    await api("/api/admin/logout.php", { method: "POST" });
                    void refreshAuth();
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
          {state === "setup" && <SetupForm onDone={refreshAuth} />}
          {state === "login" && <LoginForm onDone={refreshAuth} />}
          {state === "auth" && (
            <Tabs defaultValue="leads" className="space-y-6">
              <div className="overflow-x-auto -mx-2 px-2 pb-1">
                <TabsList className="panel-3d-tabs h-12 md:h-14 w-max md:w-full justify-between rounded-full bg-secondary p-1.5 border border-border shadow-[inset_0_2px_6px_hsl(var(--primary)/0.12),0_2px_4px_hsl(var(--primary)/0.06)] gap-1 flex-nowrap md:flex-wrap text-persian">
                  <TabsTrigger value="leads" className="shrink-0 md:flex-1 h-full px-4 md:px-2 rounded-full text-persian text-xs md:text-sm whitespace-nowrap text-muted-foreground hover:text-primary hover:bg-primary/5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[0_6px_16px_hsl(var(--primary)/0.4),0_2px_4px_hsl(var(--primary)/0.2)] data-[state=active]:font-bold data-[state=active]:scale-[1.02] transition-all duration-300 ease-out">لیدها</TabsTrigger>
                  <TabsTrigger value="card-consult" className="shrink-0 md:flex-1 h-full px-4 md:px-2 rounded-full text-persian text-xs md:text-sm whitespace-nowrap text-muted-foreground hover:text-primary hover:bg-primary/5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[0_6px_16px_hsl(var(--primary)/0.4),0_2px_4px_hsl(var(--primary)/0.2)] data-[state=active]:font-bold data-[state=active]:scale-[1.02] transition-all duration-300 ease-out">مشاوره کارت بازرگانی</TabsTrigger>
                  <TabsTrigger value="cards" className="shrink-0 md:flex-1 h-full px-4 md:px-2 rounded-full text-persian text-xs md:text-sm whitespace-nowrap text-muted-foreground hover:text-primary hover:bg-primary/5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[0_6px_16px_hsl(var(--primary)/0.4),0_2px_4px_hsl(var(--primary)/0.2)] data-[state=active]:font-bold data-[state=active]:scale-[1.02] transition-all duration-300 ease-out">کارت‌های مشتریان</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="leads"><LeadsPanel /></TabsContent>
              <TabsContent value="card-consult"><CardConsultPanel /></TabsContent>
              <TabsContent value="cards"><CardsEntry /></TabsContent>
            </Tabs>
          )}
        </main>
      </div>
    </>
  );
};

const SetupForm = ({ onDone }: { onDone: () => void }) => {
  const { toast } = useToast();
  const [u, setU] = useState(""); const [p, setP] = useState(""); const [s, setS] = useState("");
  const [busy, setBusy] = useState(false);
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader><CardTitle className="text-persian">ایجاد حساب ادمین</CardTitle></CardHeader>
      <CardContent>
        <form
          onSubmit={async (e) => {
            e.preventDefault(); setBusy(true);
            try {
              await api("/api/admin/setup.php", {
                method: "POST",
                body: JSON.stringify({ username: u, password: p, secret: s }),
              });
              toast({ title: "ادمین ساخته شد" });
              onDone();
            } catch (err) {
              toast({ title: "خطا", description: (err as Error).message, variant: "destructive" });
            } finally { setBusy(false); }
          }}
          className="space-y-3"
        >
          <Input placeholder="نام کاربری" value={u} onChange={(e) => setU(e.target.value)} />
          <Input type="password" placeholder="رمز عبور (حداقل ۸ کاراکتر)" value={p} onChange={(e) => setP(e.target.value)} />
          <Input placeholder="کلید مخفی setup (در صورت نیاز - وگرنه خالی)" value={s} onChange={(e) => setS(e.target.value)} />
          <Button type="submit" disabled={busy} className="w-full text-persian">
            {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : "ایجاد و ورود"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

const LoginForm = ({ onDone }: { onDone: () => void }) => {
  const { toast } = useToast();
  const [u, setU] = useState(""); const [p, setP] = useState(""); const [busy, setBusy] = useState(false);
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader><CardTitle className="text-persian">ورود</CardTitle></CardHeader>
      <CardContent>
        <form
          onSubmit={async (e) => {
            e.preventDefault(); setBusy(true);
            try {
              await api("/api/admin/login.php", {
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
          <Input placeholder="نام کاربری" value={u} onChange={(e) => setU(e.target.value)} />
          <Input type="password" placeholder="رمز عبور" value={p} onChange={(e) => setP(e.target.value)} />
          <Button type="submit" disabled={busy} className="w-full text-persian">
            {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : "ورود"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

const LEAD_STATUS_LABEL: Record<LeadRow["status"], string> = {
  new: "جدید",
  contacted: "در حال تماس",
  done: "انجام شد",
  rejected: "رد شده",
};
const LEAD_STATUS_VARIANT: Record<LeadRow["status"], "default" | "secondary" | "outline" | "destructive"> = {
  new: "default",
  contacted: "secondary",
  done: "outline",
  rejected: "destructive",
};

const LeadsPanel = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<LeadRow[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<LeadRow | null>(null);
  const [drafts, setDrafts] = useState<Record<number, { status?: string; note?: string }>>({});

  const limit = 25;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api<{ items: LeadRow[]; total: number }>(
        `/api/admin/leads.php?page=${page}&limit=${limit}&q=${encodeURIComponent(q)}`
      );
      const list = status ? res.items.filter(r => r.status === status) : res.items;
      setItems(list); setTotal(res.total);
      setDrafts({});
    } catch (e) {
      toast({ title: "خطا", description: (e as Error).message, variant: "destructive" });
    } finally { setLoading(false); }
  }, [page, q, status, toast]);

  useEffect(() => { void load(); }, [load]);

  const handleDelete = async (id: number) => {
    if (!confirm("این رکورد و تمام جستجوهایش حذف شود؟")) return;
    try {
      await api("/api/admin/lead-delete.php", { method: "POST", body: JSON.stringify({ id }) });
      toast({ title: "حذف شد" });
      void load();
    } catch (e) {
      toast({ title: "خطا", description: (e as Error).message, variant: "destructive" });
    }
  };

  const handleSave = async (row: LeadRow) => {
    const d = drafts[row.id];
    if (!d) return;
    try {
      await api("/api/admin/lead-update.php", {
        method: "POST",
        body: JSON.stringify({
          id: row.id,
          status: d.status ?? row.status,
          note: d.note ?? row.note ?? "",
        }),
      });
      toast({ title: "ذخیره شد" });
      void load();
    } catch (e) {
      toast({ title: "خطا", description: (e as Error).message, variant: "destructive" });
    }
  };

  if (selected) return <LeadDetail lead={selected} onBack={() => setSelected(null)} />;

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CardTitle className="text-persian flex items-center gap-2">
            <Phone className="w-5 h-5" /> لیدها <Badge variant="secondary">{total}</Badge>
          </CardTitle>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => { setPage(1); setQ(e.target.value); }}
                placeholder="جستجوی شماره"
                className="h-9 pr-8 w-44 text-persian"
              />
            </div>
            <Select value={status || "all"} onValueChange={(v) => { setPage(1); setStatus(v === "all" ? "" : v); }}>
              <SelectTrigger className="h-9 w-32 text-persian"><SelectValue placeholder="وضعیت" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">همه</SelectItem>
                <SelectItem value="new">جدید</SelectItem>
                <SelectItem value="contacted">در حال تماس</SelectItem>
                <SelectItem value="done">انجام شد</SelectItem>
                <SelectItem value="rejected">رد شده</SelectItem>
              </SelectContent>
            </Select>
            <Button size="sm" variant="outline" onClick={() => load()}>
              <RefreshCw className="w-4 h-4" />
            </Button>
            <a href="/api/admin/leads-export.php" target="_blank" rel="noreferrer">
              <Button size="sm" variant="outline" className="text-persian">
                <Download className="w-4 h-4 ml-1" /> CSV
              </Button>
            </a>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="py-10 text-center"><Loader2 className="w-5 h-5 animate-spin inline" /></div>
        ) : items.length === 0 ? (
          <p className="py-10 text-center text-muted-foreground text-persian">رکوردی وجود ندارد.</p>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right text-persian">شماره</TableHead>
                  <TableHead className="text-right text-persian">آخرین بازدید</TableHead>
                  <TableHead className="text-right text-persian">تعداد سرچ</TableHead>
                  <TableHead className="text-right text-persian">آخرین عبارت‌ها</TableHead>
                  <TableHead className="text-right text-persian">وضعیت</TableHead>
                  <TableHead className="text-right text-persian">یادداشت</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((r) => {
                  const d = drafts[r.id] || {};
                  const curStatus = (d.status ?? r.status) as LeadRow["status"];
                  const dirty = (d.status !== undefined && d.status !== r.status) ||
                                (d.note !== undefined && d.note !== (r.note ?? ""));
                  return (
                    <TableRow key={r.id}>
                      <TableCell className="font-mono" dir="ltr">
                        <a href={`tel:${r.phone}`} className="hover:underline text-primary">{r.phone}</a>
                      </TableCell>
                      <TableCell className="text-persian text-xs">{fmt(r.last_seen)}</TableCell>
                      <TableCell>
                        <button onClick={() => setSelected(r)} className="cursor-pointer">
                          <Badge>{r.search_count}</Badge>
                        </button>
                      </TableCell>
                      <TableCell className="text-persian text-xs max-w-xs truncate">
                        {r.recent_queries?.map((qq) => qq.query).join(" • ") || "—"}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={curStatus}
                          onValueChange={(v) => setDrafts((s) => ({ ...s, [r.id]: { ...s[r.id], status: v } }))}
                        >
                          <SelectTrigger className="h-8 w-32 text-persian">
                            <SelectValue>
                              <Badge variant={LEAD_STATUS_VARIANT[curStatus]}>
                                {LEAD_STATUS_LABEL[curStatus]}
                              </Badge>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">جدید</SelectItem>
                            <SelectItem value="contacted">در حال تماس</SelectItem>
                            <SelectItem value="done">انجام شد</SelectItem>
                            <SelectItem value="rejected">رد شده</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="min-w-[180px]">
                        <Input
                          value={d.note ?? r.note ?? ""}
                          onChange={(e) => setDrafts((s) => ({ ...s, [r.id]: { ...s[r.id], note: e.target.value } }))}
                          placeholder="—"
                          className="h-8 text-persian"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button size="sm" variant="ghost" disabled={!dirty} onClick={() => handleSave(r)} title="ذخیره">
                            <Save className={`w-4 h-4 ${dirty ? "text-primary" : "text-muted-foreground"}`} />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => handleDelete(r.id)} title="حذف">
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4 text-persian text-sm">
                <span>صفحه {page} از {totalPages}</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" disabled={page <= 1} onClick={() => setPage(page - 1)}>قبلی</Button>
                  <Button size="sm" variant="outline" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>بعدی</Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

const LeadDetail = ({ lead, onBack }: { lead: LeadRow; onBack: () => void }) => {
  const { toast } = useToast();
  const [logs, setLogs] = useState<LogRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api<{ logs: LogRow[] }>(`/api/admin/lead-detail.php?id=${lead.id}`);
        setLogs(res.logs);
      } catch (e) {
        toast({ title: "خطا", description: (e as Error).message, variant: "destructive" });
      } finally { setLoading(false); }
    })();
  }, [lead.id, toast]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-persian flex items-center gap-2">
            <Phone className="w-5 h-5" /> {lead.phone}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onBack} className="text-persian">
            <ArrowRight className="w-4 h-4 ml-1" /> بازگشت
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-3 gap-4 mb-6 text-sm text-persian">
          <div><div className="text-muted-foreground">اولین بازدید</div><div>{fmt(lead.first_seen)}</div></div>
          <div><div className="text-muted-foreground">آخرین بازدید</div><div>{fmt(lead.last_seen)}</div></div>
          <div><div className="text-muted-foreground">تعداد جستجو</div><div>{lead.search_count}</div></div>
        </div>
        <h3 className="text-persian font-semibold mb-3">تاریخچه جستجو</h3>
        {loading ? (
          <div className="py-6 text-center"><Loader2 className="w-5 h-5 animate-spin inline" /></div>
        ) : logs.length === 0 ? (
          <p className="text-muted-foreground text-persian text-sm">هیچ جستجویی ثبت نشده.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right text-persian">عبارت</TableHead>
                <TableHead className="text-right text-persian">تاریخ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((l) => (
                <TableRow key={l.id}>
                  <TableCell className="text-persian">{l.query}</TableCell>
                  <TableCell className="text-persian text-xs">{fmt(l.created_at)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

const CardsEntry = () => (
  <Card>
    <CardHeader>
      <CardTitle className="text-persian flex items-center gap-2">
        <CreditCard className="w-5 h-5" /> مدیریت کارت‌های بازرگانی
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-persian text-sm leading-relaxed opacity-90">
          از این بخش می‌توانید به پنل مدیریت کارت‌های بازرگانی وارد شوید؛
          افزودن کارت جدید، تخصیص کاربر، مشاهده تاریخچه و سایر عملیات.
        </p>
        <Link to="/TSCards">
          <Button className="text-persian whitespace-nowrap">
            <CreditCard className="w-4 h-4 ml-2" /> ورود به پنل کارت‌ها
          </Button>
        </Link>
      </div>
    </CardContent>
  </Card>
);

// ============================================================
// Business card consultation panel
// ============================================================
interface ConsultRow {
  id: number;
  phone: string;
  source: string;
  ip: string | null;
  note: string | null;
  status: "new" | "contacted" | "done" | "rejected";
  created_at: string;
  updated_at: string;
}

const STATUS_LABEL: Record<ConsultRow["status"], string> = {
  new: "جدید",
  contacted: "در حال تماس",
  done: "انجام شد",
  rejected: "رد شده",
};

const STATUS_VARIANT: Record<ConsultRow["status"], "default" | "secondary" | "outline" | "destructive"> = {
  new: "default",
  contacted: "secondary",
  done: "outline",
  rejected: "destructive",
};

const CardConsultPanel = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<ConsultRow[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [drafts, setDrafts] = useState<Record<number, { status?: string; note?: string }>>({});

  const limit = 25;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const qs = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        q,
        status,
      });
      const res = await api<{ items: ConsultRow[]; total: number }>(
        `/api/admin/card-consult-list.php?${qs.toString()}`
      );
      setItems(res.items);
      setTotal(res.total);
      setDrafts({});
    } catch (e) {
      toast({ title: "خطا", description: (e as Error).message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [page, q, status, toast]);

  useEffect(() => { void load(); }, [load]);

  const handleDelete = async (id: number) => {
    if (!confirm("این درخواست حذف شود؟")) return;
    try {
      await api("/api/admin/card-consult-delete.php", {
        method: "POST", body: JSON.stringify({ id }),
      });
      toast({ title: "حذف شد" });
      void load();
    } catch (e) {
      toast({ title: "خطا", description: (e as Error).message, variant: "destructive" });
    }
  };

  const handleSave = async (row: ConsultRow) => {
    const d = drafts[row.id];
    if (!d) return;
    try {
      await api("/api/admin/card-consult-update.php", {
        method: "POST",
        body: JSON.stringify({
          id: row.id,
          status: d.status ?? row.status,
          note: d.note ?? row.note ?? "",
        }),
      });
      toast({ title: "ذخیره شد" });
      void load();
    } catch (e) {
      toast({ title: "خطا", description: (e as Error).message, variant: "destructive" });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CardTitle className="text-persian flex items-center gap-2">
            <BookOpen className="w-5 h-5" /> مشاوره کارت بازرگانی <Badge variant="secondary">{total}</Badge>
          </CardTitle>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => { setPage(1); setQ(e.target.value); }}
                placeholder="جستجوی شماره"
                className="h-9 pr-8 w-44 text-persian"
              />
            </div>
            <Select value={status || "all"} onValueChange={(v) => { setPage(1); setStatus(v === "all" ? "" : v); }}>
              <SelectTrigger className="h-9 w-36 text-persian"><SelectValue placeholder="وضعیت" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">همه</SelectItem>
                <SelectItem value="new">جدید</SelectItem>
                <SelectItem value="contacted">در حال تماس</SelectItem>
                <SelectItem value="done">انجام شد</SelectItem>
                <SelectItem value="rejected">رد شده</SelectItem>
              </SelectContent>
            </Select>
            <Button size="sm" variant="outline" onClick={() => load()}>
              <RefreshCw className="w-4 h-4" />
            </Button>
            <a href="/api/admin/card-consult-export.php" target="_blank" rel="noreferrer">
              <Button size="sm" variant="outline" className="text-persian">
                <Download className="w-4 h-4 ml-1" /> CSV
              </Button>
            </a>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="py-10 text-center"><Loader2 className="w-5 h-5 animate-spin inline" /></div>
        ) : items.length === 0 ? (
          <p className="py-10 text-center text-muted-foreground text-persian">درخواستی ثبت نشده است.</p>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right text-persian">شماره</TableHead>
                  <TableHead className="text-right text-persian">تاریخ ثبت</TableHead>
                  <TableHead className="text-right text-persian">منبع</TableHead>
                  <TableHead className="text-right text-persian">IP</TableHead>
                  <TableHead className="text-right text-persian">وضعیت</TableHead>
                  <TableHead className="text-right text-persian">یادداشت</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((r) => {
                  const d = drafts[r.id] || {};
                  const dirty = (d.status !== undefined && d.status !== r.status) ||
                                (d.note !== undefined && d.note !== (r.note ?? ""));
                  return (
                    <TableRow key={r.id}>
                      <TableCell className="font-mono" dir="ltr">
                        <a href={`tel:${r.phone}`} className="hover:underline">{r.phone}</a>
                      </TableCell>
                      <TableCell className="text-persian text-xs">{fmt(r.created_at)}</TableCell>
                      <TableCell className="text-persian text-xs">{r.source}</TableCell>
                      <TableCell className="text-xs" dir="ltr">{r.ip || "—"}</TableCell>
                      <TableCell>
                        <Select
                          value={d.status ?? r.status}
                          onValueChange={(v) => setDrafts((s) => ({ ...s, [r.id]: { ...s[r.id], status: v } }))}
                        >
                          <SelectTrigger className="h-8 w-32 text-persian">
                            <SelectValue>
                              <Badge variant={STATUS_VARIANT[(d.status ?? r.status) as ConsultRow["status"]]}>
                                {STATUS_LABEL[(d.status ?? r.status) as ConsultRow["status"]]}
                              </Badge>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">جدید</SelectItem>
                            <SelectItem value="contacted">در حال تماس</SelectItem>
                            <SelectItem value="done">انجام شد</SelectItem>
                            <SelectItem value="rejected">رد شده</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="min-w-[180px]">
                        <Input
                          value={d.note ?? r.note ?? ""}
                          onChange={(e) => setDrafts((s) => ({ ...s, [r.id]: { ...s[r.id], note: e.target.value } }))}
                          placeholder="—"
                          className="h-8 text-persian"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button size="sm" variant="ghost" disabled={!dirty} onClick={() => handleSave(r)} title="ذخیره">
                            <Save className={`w-4 h-4 ${dirty ? "text-primary" : "text-muted-foreground"}`} />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => handleDelete(r.id)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4 text-persian text-sm">
                <span>صفحه {page} از {totalPages}</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" disabled={page <= 1} onClick={() => setPage(page - 1)}>قبلی</Button>
                  <Button size="sm" variant="outline" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>بعدی</Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default TSDashboard;
