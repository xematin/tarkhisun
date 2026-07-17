import { useCallback, useEffect, useMemo, useState } from "react";
import { Loader2, Plus, Trash2, Pencil, Search, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

export interface SectionCategory { id: number; name: string }

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

const SectionCategoriesSettings = () => {
  const { toast } = useToast();
  const [rows, setRows] = useState<SectionCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [newName, setNewName] = useState("");
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<SectionCategory | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api<{ items: SectionCategory[] }>("/api/section-categories-list.php");
      setRows(data.items || []);
    } catch (e) {
      toast({ title: "خطا در بارگذاری", description: (e as Error).message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => { void load(); }, [load]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(r => r.name.toLowerCase().includes(q));
  }, [rows, search]);

  const onCreate = async () => {
    const name = newName.trim();
    if (!name) { toast({ title: "نام دسته را وارد کنید", variant: "destructive" }); return; }
    setCreating(true);
    try {
      await api("/api/admin/section-category-create.php", { method: "POST", body: JSON.stringify({ name }) });
      toast({ title: "افزوده شد" });
      setNewName("");
      await load();
    } catch (e) {
      toast({ title: "خطا", description: (e as Error).message, variant: "destructive" });
    } finally {
      setCreating(false);
    }
  };

  const startEdit = (r: SectionCategory) => { setEditingId(r.id); setEditingName(r.name); };
  const cancelEdit = () => { setEditingId(null); setEditingName(""); };

  const saveEdit = async () => {
    if (editingId === null) return;
    const name = editingName.trim();
    if (!name) { toast({ title: "نام نمی‌تواند خالی باشد", variant: "destructive" }); return; }
    setSavingEdit(true);
    try {
      await api("/api/admin/section-category-update.php", { method: "POST", body: JSON.stringify({ id: editingId, name }) });
      toast({ title: "ذخیره شد" });
      cancelEdit();
      await load();
    } catch (e) {
      toast({ title: "خطا", description: (e as Error).message, variant: "destructive" });
    } finally {
      setSavingEdit(false);
    }
  };

  const doDelete = async () => {
    if (!confirmDelete) return;
    try {
      await api("/api/admin/section-category-delete.php", { method: "POST", body: JSON.stringify({ id: confirmDelete.id }) });
      toast({ title: "حذف شد" });
      setConfirmDelete(null);
      await load();
    } catch (e) {
      toast({ title: "خطا", description: (e as Error).message, variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-persian">افزودن دسته سکشن جدید</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 items-end">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block text-persian">نام دسته</label>
              <Input
                placeholder="مثلاً تره بار"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") void onCreate(); }}
                className="text-persian"
              />
            </div>
            <Button onClick={onCreate} disabled={creating} className="text-persian">
              {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Plus className="w-4 h-4 ml-1" /> افزودن</>}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <CardTitle className="text-persian">دسته‌های سکشن ({rows.length})</CardTitle>
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="جستجو..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pr-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>نام دسته</TableHead>
                    <TableHead className="w-40 text-left">عملیات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={2} className="text-center text-muted-foreground py-6 text-persian">
                        موردی یافت نشد
                      </TableCell>
                    </TableRow>
                  ) : filtered.map(r => (
                    <TableRow key={r.id}>
                      <TableCell>
                        {editingId === r.id ? (
                          <Input
                            value={editingName}
                            onChange={(e) => setEditingName(e.target.value)}
                            onKeyDown={(e) => { if (e.key === "Enter") void saveEdit(); }}
                            autoFocus
                            className="text-persian"
                          />
                        ) : (
                          <span className="text-persian">{r.name}</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {editingId === r.id ? (
                          <div className="flex gap-2 justify-end">
                            <Button size="sm" onClick={saveEdit} disabled={savingEdit}>
                              {savingEdit ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            </Button>
                            <Button size="sm" variant="ghost" onClick={cancelEdit}>
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex gap-2 justify-end">
                            <Button size="sm" variant="ghost" onClick={() => startEdit(r)}>
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => setConfirmDelete(r)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={!!confirmDelete} onOpenChange={(o) => !o && setConfirmDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-persian">حذف دسته سکشن</AlertDialogTitle>
            <AlertDialogDescription className="text-persian">
              آیا از حذف دسته «{confirmDelete?.name}» مطمئن هستید؟ کوتاژ‌ها و کارت‌های ثبت‌شده تحت تأثیر قرار نمی‌گیرند.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-persian">انصراف</AlertDialogCancel>
            <AlertDialogAction onClick={doDelete} className="bg-destructive hover:bg-destructive/90 text-persian">حذف</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SectionCategoriesSettings;
