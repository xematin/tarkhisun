import { useCallback, useEffect, useState } from "react";
import {
  Database, Download, RefreshCw, Trash2, Loader2, FileSpreadsheet,
  FileText, FileArchive, Upload, ShieldAlert, Clock, HardDrive, Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

interface BackupItem {
  id: number;
  filename: string;
  format: string;
  source: string;
  size_bytes: number;
  created_at: string;
  exists: boolean;
}

interface StorageInfo {
  disk_total: number | null;
  disk_free: number | null;
  disk_used: number | null;
  backups_size: number;
  backups_count: number;
  db_size: number | null;
}

const toJalali = (iso: string): string => {
  if (!iso) return "—";
  const d = new Date(iso.replace(" ", "T"));
  if (isNaN(d.getTime())) return iso;
  try {
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit",
    }).format(d);
  } catch {
    return iso;
  }
};

const fmtSize = (b: number): string => {
  if (!b) return "—";
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toLocaleString("fa-IR", { maximumFractionDigits: 1 })} KB`;
  if (b < 1024 * 1024 * 1024) return `${(b / 1024 / 1024).toLocaleString("fa-IR", { maximumFractionDigits: 2 })} MB`;
  return `${(b / 1024 / 1024 / 1024).toLocaleString("fa-IR", { maximumFractionDigits: 2 })} GB`;
};

const PAGE = 15;

const BackupPanel = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<BackupItem[]>([]);
  const [lastBackup, setLastBackup] = useState<string | null>(null);
  const [writable, setWritable] = useState(true);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [storage, setStorage] = useState<StorageInfo | null>(null);
  const [visible, setVisible] = useState(PAGE);
  const loadStorage = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/backup-storage.php", { credentials: "same-origin" });
      const data = await res.json();
      if (res.ok) setStorage(data as StorageInfo);
    } catch { /* ignore */ }
  }, []);

  const load = useCallback(async (auto = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/backup-list.php?auto=${auto}`, { credentials: "same-origin" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
      setItems(data.items || []);
      setLastBackup(data.last_backup || null);
      setWritable(Boolean(data.writable));
      if (data.auto_created) {
        toast({ title: "بک‌آپ خودکار", description: "بیش از ۴۸ ساعت از آخرین بک‌آپ گذشته بود؛ نسخه جدید ساخته شد." });
      }
    } catch (e) {
      toast({ title: "خطا", description: (e as Error).message, variant: "destructive" });
    } finally {
      setLoading(false);
      void loadStorage();
    }
  }, [toast, loadStorage]);

  useEffect(() => { void load(1); }, [load]);


  const createNow = async () => {
    setCreating(true);
    try {
      const res = await fetch("/api/admin/backup-create.php", { method: "POST", credentials: "same-origin" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
      toast({ title: "انجام شد", description: "نسخه پشتیبان روی سرور ذخیره شد." });
      await load(0);
    } catch (e) {
      toast({ title: "خطا", description: (e as Error).message, variant: "destructive" });
    } finally {
      setCreating(false);
    }
  };

  const remove = async (id: number) => {
    if (!window.confirm("این نسخه پشتیبان حذف شود؟")) return;
    try {
      const res = await fetch("/api/admin/backup-delete.php", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
      await load(0);
    } catch (e) {
      toast({ title: "خطا", description: (e as Error).message, variant: "destructive" });
    }
  };

  const dueIn = (() => {
    if (!lastBackup) return "هنوز بک‌آپی ثبت نشده است";
    const t = new Date(lastBackup.replace(" ", "T")).getTime();
    const next = t + 48 * 3600 * 1000;
    const diff = next - Date.now();
    if (diff <= 0) return "زمان بک‌آپ بعدی فرا رسیده است";
    const h = Math.floor(diff / 3600000);
    return `بک‌آپ خودکار بعدی تا حدود ${h.toLocaleString("fa-IR")} ساعت دیگر`;
  })();

  const total = storage?.disk_total ?? null;
  const used = storage?.disk_used ?? null;
  const pct = total && total > 0 && used !== null ? Math.min(100, Math.max(0, (used / total) * 100)) : null;
  const tankColor = pct === null ? "bg-muted-foreground/40"
    : pct >= 90 ? "bg-destructive"
    : pct >= 70 ? "bg-amber-500"
    : "bg-emerald-500";
  const backupsShare = used && used > 0 && storage ? Math.min(100, (storage.backups_size / used) * 100) : 0;
  const cronCmd = `curl -s "https://tarkhisun.com/api/admin/backup-cron.php?key=YOUR_SECRET" > /dev/null`;

  return (
    <div className="space-y-6 panel-fa">
      {/* مخزن حافظه هاست */}
      <Card className="border-border overflow-hidden">
        <CardHeader>
          <CardTitle className="text-persian flex items-center gap-2 text-base">
            <HardDrive className="w-4 h-4 text-primary" />
            مخزن حافظه هاست
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* مخزن شیشه‌ای */}
            <div className="relative w-24 h-44 shrink-0 rounded-2xl border border-border bg-gradient-to-b from-muted/30 to-muted/60 backdrop-blur overflow-hidden shadow-inner">
              <div
                className={`absolute bottom-0 left-0 right-0 ${tankColor} transition-[height] duration-700 ease-out opacity-90`}
                style={{ height: `${pct ?? 0}%` }}
              >
                <div className="absolute inset-x-0 top-0 h-2 bg-background/30" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold tabular-nums text-foreground drop-shadow">
                  {pct === null ? "نامشخص" : `${pct.toLocaleString("fa-IR", { maximumFractionDigits: 1 })}٪`}
                </span>
              </div>
              {[25, 50, 75].map((m) => (
                <div key={m} className="absolute left-0 right-0 border-t border-border/50" style={{ bottom: `${m}%` }} />
              ))}
            </div>

            {/* شاخص‌ها */}
            <div className="flex-1 w-full space-y-3">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "کل فضا", value: total },
                  { label: "مصرف‌شده", value: used },
                  { label: "آزاد", value: storage?.disk_free ?? null },
                ].map((s) => (
                  <div key={s.label} className="rounded-lg border border-border bg-muted/30 p-2 text-center">
                    <div className="text-persian text-[11px] text-muted-foreground">{s.label}</div>
                    <div className="text-sm font-bold tabular-nums">{s.value === null ? "—" : fmtSize(s.value)}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-persian text-[11px] text-muted-foreground">
                  <span>سهم بک‌آپ‌ها از فضای مصرفی ({(storage?.backups_count ?? 0).toLocaleString("fa-IR")} فایل)</span>
                  <span className="tabular-nums">{fmtSize(storage?.backups_size ?? 0)}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary transition-[width] duration-700 ease-out" style={{ width: `${backupsShare}%` }} />
                </div>
              </div>

              <div className="flex items-center justify-between text-persian text-[11px] text-muted-foreground">
                <span>حجم دیتابیس</span>
                <span className="tabular-nums">{storage?.db_size ? fmtSize(storage.db_size) : "—"}</span>
              </div>

              {pct === null && (
                <p className="text-persian text-[11px] text-muted-foreground">
                  هاست شما اجازه خواندن فضای دیسک را نمی‌دهد؛ فقط حجم بک‌آپ‌ها و دیتابیس نمایش داده می‌شود.
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* بک‌آپ فوری */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-persian flex items-center gap-2 text-base">
            <Database className="w-4 h-4 text-primary" />
            دانلود لحظه‌ای نسخه پشتیبان
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-persian text-xs text-muted-foreground leading-6">
            خروجی مستقیم از کل دیتابیس گرفته می‌شود و روی سیستم شما دانلود می‌شود. فایل SQL قابل ایمپورت مستقیم در phpMyAdmin است.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button asChild variant="default" className="text-persian">
              <a href="/api/admin/backup-dump.php?format=sql">
                <FileText className="w-4 h-4 ml-2" /> دانلود SQL
              </a>
            </Button>
            <Button asChild variant="outline" className="text-persian">
              <a href="/api/admin/backup-dump.php?format=csv">
                <FileArchive className="w-4 h-4 ml-2" /> دانلود CSV (ZIP)
              </a>
            </Button>
            <Button asChild variant="outline" className="text-persian">
              <a href="/api/admin/backup-dump.php?format=xls">
                <FileSpreadsheet className="w-4 h-4 ml-2" /> دانلود اکسل
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* بک‌آپ‌های خودکار */}
      <Card className="border-border">
        <CardHeader className="flex flex-row items-center justify-between gap-2">
          <CardTitle className="text-persian flex items-center gap-2 text-base">
            <Clock className="w-4 h-4 text-primary" />
            بک‌آپ‌های ذخیره‌شده روی سرور (هر ۴۸ ساعت)
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" onClick={() => void load(0)} disabled={loading} className="text-persian">
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
            <Button size="sm" onClick={createNow} disabled={creating} className="text-persian">
              {creating ? <Loader2 className="w-4 h-4 ml-2 animate-spin" /> : <Database className="w-4 h-4 ml-2" />}
              ساخت بک‌آپ جدید
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-persian text-xs text-muted-foreground">
            <Badge variant="secondary" className="text-persian">{dueIn}</Badge>
            <span>آخرین ۱۰ نسخه نگهداری می‌شود.</span>
          </div>

          {!writable && (
            <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-3 text-persian text-xs text-destructive">
              پوشه <span className="font-mono">public/api/backups</span> قابل نوشتن نیست؛ لطفاً دسترسی آن را روی ۷۵۵ تنظیم کنید.
            </div>
          )}

          {loading ? (
            <div className="py-8 text-center text-muted-foreground"><Loader2 className="w-5 h-5 animate-spin inline" /></div>
          ) : items.length === 0 ? (
            <div className="py-8 text-center text-persian text-sm text-muted-foreground">هنوز نسخه پشتیبانی ذخیره نشده است.</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-persian">تاریخ</TableHead>
                    <TableHead className="text-persian">نوع</TableHead>
                    <TableHead className="text-persian">حجم</TableHead>
                    <TableHead className="text-persian">نام فایل</TableHead>
                    <TableHead className="text-persian text-left">عملیات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((b) => (
                    <TableRow key={b.id}>
                      <TableCell data-label="تاریخ" className="text-persian text-xs whitespace-nowrap tabular-nums">{toJalali(b.created_at)}</TableCell>
                      <TableCell data-label="نوع">
                        <Badge variant={b.source === "auto" ? "secondary" : "outline"} className="text-persian text-[11px]">
                          {b.source === "auto" ? "خودکار" : "دستی"}
                        </Badge>
                      </TableCell>
                      <TableCell data-label="حجم" className="text-persian text-xs tabular-nums">{fmtSize(b.size_bytes)}</TableCell>
                      <TableCell data-label="نام فایل" className="text-[11px] font-mono break-all">{b.filename}</TableCell>
                      <TableCell data-label="عملیات" className="text-left">
                        <div className="flex items-center gap-2 justify-end">
                          <Button asChild size="sm" variant="outline" disabled={!b.exists} className="text-persian">
                            <a href={`/api/admin/backup-download.php?id=${b.id}`}>
                              <Download className="w-3.5 h-3.5 ml-1" /> دانلود
                            </a>
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => void remove(b.id)} className="text-destructive">
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* بازگردانی - غیرفعال */}
      <Card className="border-border opacity-90">
        <CardHeader>
          <CardTitle className="text-persian flex items-center gap-2 text-base">
            <Upload className="w-4 h-4 text-muted-foreground" />
            بازگردانی نسخه پشتیبان
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="rounded-lg border border-amber-500/40 bg-amber-500/5 p-3 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
            <p className="text-persian text-xs text-amber-700 dark:text-amber-500 leading-6">
              این بخش به دلایل امنیتی فعلاً غیرفعال است. برای بازگردانی، فایل SQL را از طریق phpMyAdmin ایمپورت کنید.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3">
            <input
              type="file"
              accept=".sql"
              disabled
              className="w-full text-persian text-xs border border-border rounded-md p-2 bg-muted/40 cursor-not-allowed"
            />
            <Button disabled className="text-persian">
              <Upload className="w-4 h-4 ml-2" /> بازگردانی (غیرفعال)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BackupPanel;
