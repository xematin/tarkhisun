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
              <TabsList className="text-persian">
                <TabsTrigger value="leads">لیدها</TabsTrigger>
                <TabsTrigger value="card-consult">مشاوره کارت بازرگانی</TabsTrigger>
                <TabsTrigger value="cards">کارت‌های مشتریان</TabsTrigger>
              </TabsList>
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

const LeadsPanel = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<LeadRow[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<LeadRow | null>(null);

  const limit = 25;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api<{ items: LeadRow[]; total: number }>(
        `/api/admin/leads.php?page=${page}&limit=${limit}&q=${encodeURIComponent(q)}`
      );
      setItems(res.items); setTotal(res.total);
    } catch (e) {
      toast({ title: "خطا", description: (e as Error).message, variant: "destructive" });
    } finally { setLoading(false); }
  }, [page, q, toast]);

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
                className="h-9 pr-8 w-48 text-persian"
              />
            </div>
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
                  <TableHead className="text-right text-persian">اولین بازدید</TableHead>
                  <TableHead className="text-right text-persian">تعداد سرچ</TableHead>
                  <TableHead className="text-right text-persian">آخرین عبارت‌ها</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((r) => (
                  <TableRow key={r.id} className="cursor-pointer" onClick={() => setSelected(r)}>
                    <TableCell className="font-mono">{r.phone}</TableCell>
                    <TableCell className="text-persian text-xs">{fmt(r.last_seen)}</TableCell>
                    <TableCell className="text-persian text-xs">{fmt(r.first_seen)}</TableCell>
                    <TableCell><Badge>{r.search_count}</Badge></TableCell>
                    <TableCell className="text-persian text-xs max-w-xs truncate">
                      {r.recent_queries?.map((q) => q.query).join(" • ") || "—"}
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Button size="sm" variant="ghost" onClick={() => handleDelete(r.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
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

export default TSDashboard;
