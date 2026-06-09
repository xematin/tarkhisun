import { useState } from "react";
import { Loader2, Phone, Copy, Check, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { normalizeDigits, isValidIranMobile } from "@/lib/lead-tracking";

const TEAM_PHONE_DISPLAY = "0917 738 0080";
const TEAM_PHONE_TEL = "+989177380080";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

const CardConsultDialog = ({ open, onOpenChange }: Props) => {
  const { toast } = useToast();
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(TEAM_PHONE_TEL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = normalizeDigits(phone).trim();
    if (!isValidIranMobile(normalized)) {
      toast({
        title: "شماره نامعتبر",
        description: "لطفاً شماره موبایل را به‌صورت 09XXXXXXXXX وارد کنید.",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/card-consult-submit.php", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: normalized,
          source: "business-card-hero",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      toast({
        title: "درخواست شما ثبت شد",
        description: "کارشناسان ترخیصان به‌زودی با شما تماس می‌گیرند.",
      });
      setPhone("");
      onOpenChange(false);
    } catch (err) {
      toast({
        title: "خطا در ثبت درخواست",
        description: (err as Error).message,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        dir="rtl"
        className="sm:max-w-md text-persian rounded-2xl sm:rounded-2xl border border-border/50 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.35)] w-[calc(100%-1.5rem)] max-w-[calc(100%-1.5rem)] sm:w-full sm:max-w-md p-5"
      >
        <DialogHeader>
          <DialogTitle className="text-persian text-right">
            راهنمای کارت بازرگانی و مراحل اخذ آن
          </DialogTitle>
          <DialogDescription className="text-persian text-right leading-relaxed">
            برای دریافت راهنمایی کامل و رایگان درباره مراحل اخذ کارت بازرگانی،
            می‌توانید مستقیماً با تیم ترخیصان تماس بگیرید یا شماره خود را ثبت
            کنید تا با شما تماس بگیریم.
          </DialogDescription>
        </DialogHeader>

        {/* Team contact */}
        <div className="rounded-xl border bg-muted/40 p-4 mt-2">
          <div className="text-xs text-muted-foreground mb-2 text-persian">
            شماره تماس تیم ترخیصان
          </div>
          <div className="flex items-center justify-between gap-2">
            <a
              href={`tel:${TEAM_PHONE_TEL}`}
              dir="ltr"
              className="text-lg font-bold tracking-wide text-primary inline-flex items-center gap-2 hover:underline"
            >
              <Phone className="w-5 h-5" />
              {TEAM_PHONE_DISPLAY}
            </a>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handleCopy}
              className="text-persian"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 ml-1" /> کپی شد
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 ml-1" /> کپی شماره
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Callback form */}
        <form onSubmit={handleSubmit} className="space-y-3 mt-2">
          <label
            htmlFor="consult-phone"
            className="block text-sm font-medium text-persian"
          >
            یا شماره خود را وارد کنید تا با شما تماس بگیریم:
          </label>
          <Input
            id="consult-phone"
            type="tel"
            dir="ltr"
            inputMode="numeric"
            placeholder="09XXXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength={15}
            className="text-center font-mono"
          />
          <Button
            type="submit"
            disabled={submitting}
            className="w-full text-persian"
          >
            {submitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4 ml-2" />
                درخواست تماس از من
              </>
            )}
          </Button>
          <p className="text-xs text-muted-foreground text-persian text-center">
            شماره شما فقط برای تماس کارشناسان ترخیصان استفاده می‌شود.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CardConsultDialog;
