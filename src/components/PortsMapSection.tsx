import { MapPin } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Coordinates are percentages relative to the square map container.
 * The Iran SVG (public/iran-map.svg) is rendered via CSS mask in a 1:1 box,
 * so x/y in % map directly onto its bounding box.
 *
 * labelSide controls which side the floating label sits on, so labels never
 * cover the country shape or each other.
 */
type Port = {
  name: string;
  short: string;
  x: number;
  y: number;
  labelSide: "top" | "bottom" | "left" | "right";
  delay?: string;
  labelOffsetX?: string;
};

// Coordinates derived from real lat/lng of each port projected onto the
// Iran SVG bounding box (lng 44.0–63.33°E → x 0–99.83%, lat 25.06–39.78°N → y 6.54–93.50%).
const defaultPorts: Port[] = [
  { name: "بندر آستارا", short: "آستارا", x: 1.73, y: 10.14, labelSide: "bottom", delay: "0s" },
  { name: "بندر انزلی", short: "انزلی", x: 33.31, y: 26.32, labelSide: "left", delay: "0.2s" },
  { name: "بندر باشماق", short: "باشماق", x: 74.72, y: 21.63, labelSide: "top", delay: "0.4s" },
  { name: "بندر سرخس", short: "سرخس", x: 82.76, y: 24.54, labelSide: "right", delay: "0.6s" },
  { name: "بندر ماهیرود", short: "ماهیرود", x: 81.98, y: 42.84, labelSide: "bottom", delay: "0.8s" },
  { name: "بندر خرمشهر", short: "خرمشهر", x: 16.13, y: 59.58, labelSide: "left", delay: "1s" },
  { name: "بندر امام خمینی", short: "امام خمینی", x: 27.18, y: 65.38, labelSide: "top", delay: "1.2s" },
  { name: "بندر بوشهر", short: "بوشهر", x: 34.21, y: 76.99, labelSide: "top", delay: "1.4s" },
  { name: "بندرعباس شهید رجایی", short: "شهید رجایی", x: 66.46, y: 84.47, labelSide: "top", delay: "1.6s" },
  { name: "بندر سیریک", short: "سیریک", x: 75.84, y: 90.94, labelSide: "top", delay: "1.8s" },
  { name: "بندر جاسک", short: "جاسک", x: 80.97, y: 92.28, labelSide: "bottom", delay: "2s" },
  { name: "بندر چابهار", short: "چابهار", x: 91.8, y: 91.17, labelSide: "right", delay: "2.2s", labelOffsetX: "-110%" },
];

const labelPositionClasses: Record<Port["labelSide"], string> = {
  top: "bottom-full mb-3 left-1/2 -translate-x-1/2",
  bottom: "top-full mt-3 left-1/2 -translate-x-1/2",
  left: "right-full mr-3 top-1/2 -translate-y-1/2",
  right: "left-full ml-3 top-1/2 -translate-y-1/2",
};

const STORAGE_KEY = "ts-ports-coords-v1";

const PortsMapSection = () => {
  // Edit mode is opt-in via ?edit-ports=1 (admin-only convention).
  const editMode = useMemo(() => {
    if (typeof window === "undefined") return false;
    return new URLSearchParams(window.location.search).get("edit-ports") === "1";
  }, []);

  const mapRef = useRef<HTMLDivElement>(null);
  const [ports, setPorts] = useState<Port[]>(defaultPorts);
  const [dragging, setDragging] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState<string | null>(null);

  // Load published coordinates from host for ALL users (cache-busted)
  useEffect(() => {
    let cancelled = false;
    fetch(`/ports-coords.json?t=${Date.now()}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled || !data) return;
        const arr = Array.isArray(data) ? data : data.ports;
        if (Array.isArray(arr) && arr.length > 0) {
          setPorts(arr as Port[]);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  // Load saved overrides from localStorage when in edit mode
  useEffect(() => {
    if (!editMode) return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Port[];
        if (Array.isArray(saved) && saved.length === defaultPorts.length) {
          setPorts(saved);
        }
      }
    } catch {}
  }, [editMode]);

  // Persist changes
  useEffect(() => {
    if (!editMode) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ports));
    } catch {}
  }, [ports, editMode]);

  // Pointer-based drag
  useEffect(() => {
    if (!editMode || !dragging) return;
    const map = mapRef.current;
    if (!map) return;

    const move = (e: PointerEvent) => {
      const rect = map.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setPorts((prev) =>
        prev.map((p) =>
          p.name === dragging
            ? { ...p, x: Math.max(0, Math.min(100, +x.toFixed(2))), y: Math.max(0, Math.min(100, +y.toFixed(2))) }
            : p
        )
      );
    };
    const up = () => setDragging(null);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [editMode, dragging]);

  const cycleLabelSide = (name: string) => {
    const order: Port["labelSide"][] = ["top", "right", "bottom", "left"];
    setPorts((prev) =>
      prev.map((p) =>
        p.name === name
          ? { ...p, labelSide: order[(order.indexOf(p.labelSide) + 1) % order.length] }
          : p
      )
    );
  };

  const copyJson = async () => {
    const json = JSON.stringify(
      ports.map((p) => ({
        name: p.name,
        short: p.short,
        x: p.x,
        y: p.y,
        labelSide: p.labelSide,
        delay: p.delay,
        ...(p.labelOffsetX ? { labelOffsetX: p.labelOffsetX } : {}),
      })),
      null,
      2
    );
    try {
      await navigator.clipboard.writeText(json);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("کپی JSON:", json);
    }
  };

  const reset = () => {
    if (confirm("بازگشت به مختصات پیش‌فرض؟")) {
      localStorage.removeItem(STORAGE_KEY);
      setPorts(defaultPorts);
    }
  };

  const saveToHost = async () => {
    setSaving(true);
    setSaveMsg(null);
    try {
      const res = await fetch("/api/admin/ports-coords-save.php", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ports }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSaveMsg(
          res.status === 401
            ? "ابتدا در /tscards وارد شوید"
            : `خطا: ${data.error || res.status}`
        );
      } else {
        setSaveMsg("ذخیره شد روی هاست ✓");
      }
    } catch (e: any) {
      setSaveMsg("خطای شبکه");
    } finally {
      setSaving(false);
      setTimeout(() => setSaveMsg(null), 4000);
    }
  };

  return (
    <section id="ports" className="relative py-20 ports-map-bg overflow-hidden">
      {/* subtle dot grid background */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, hsl(0 0% 100%) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10" dir="rtl">
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex hero-chip mb-4 text-persian">
            <MapPin className="w-4 h-4 text-accent-light" />
            <span>پوشش سراسری</span>
          </div>
          <h2 className="heading-secondary text-white mb-4">
            حضور <strong>ترخیصان</strong> در تمام بنادر اصلی ایران
          </h2>
          <p className="text-base md:text-lg text-white/75 max-w-2xl mx-auto text-persian">
            از آستارا و انزلی در شمال تا سرخس و ماهیرود در شرق، از باشماق و خرمشهر در غرب تا شهید رجایی، سیریک، چابهار، بوشهر، امام خمینی و جاسک در جنوب — هرکجا نیاز به ترخیص دارید، ما کنار شما هستیم.
          </p>
        </div>

        {editMode && (
          <div className="max-w-4xl mx-auto mb-4 p-3 rounded-2xl bg-amber-500/20 border border-amber-400/50 text-white text-persian text-sm flex flex-wrap items-center gap-3">
            <span className="font-bold">🛠 حالت ویرایش فعال:</span>
            <span>مارکر را با موس بکش. برای تغییر سمت لیبل، روی مارکر کلیک کن.</span>
            <div className="flex flex-wrap gap-2 mr-auto items-center">
              {saveMsg && (
                <span className="text-xs px-2 py-1 rounded bg-black/30">{saveMsg}</span>
              )}
              <button
                type="button"
                onClick={saveToHost}
                disabled={saving}
                className="px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-600 disabled:opacity-60 text-white text-xs font-bold"
              >
                {saving ? "در حال ذخیره..." : "ثبت روی هاست"}
              </button>
              <button
                type="button"
                onClick={copyJson}
                className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold"
              >
                {copied ? "کپی شد ✓" : "کپی JSON"}
              </button>
              <button
                type="button"
                onClick={reset}
                className="px-3 py-1.5 rounded-lg bg-red-500/80 hover:bg-red-600 text-white text-xs font-bold"
              >
                ریست
              </button>
            </div>
          </div>
        )}

        <div className="relative mx-auto max-w-4xl">
          {/* Map container — square aspect so port percentages stay aligned */}
          <div ref={mapRef} className="relative w-full aspect-square select-none">
            {/* Iran shape rendered via CSS mask so we control color via design tokens */}
            <div className="iran-map-shape" aria-hidden="true" />
            <div className="iran-map-glow" aria-hidden="true" />

            {/* Port markers */}
            {ports.map((p) => (
              <div
                key={p.name}
                className="absolute"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                aria-label={p.name}
              >
                <div className="relative">
                  {/* pulsing dot */}
                  <span
                    className={`port-dot-v2 ${editMode ? "cursor-move ring-2 ring-amber-300" : ""}`}
                    style={{ animationDelay: p.delay }}
                    onPointerDown={(e) => {
                      if (!editMode) return;
                      e.preventDefault();
                      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
                      setDragging(p.name);
                    }}
                    onClick={(e) => {
                      if (!editMode) return;
                      e.stopPropagation();
                      // single click without drag → cycle label side
                      if (!dragging) cycleLabelSide(p.name);
                    }}
                  />
                  {/* floating label */}
                  <div
                    className={`port-label-v2 ${labelPositionClasses[p.labelSide]} ${p.short === 'چابهار' && !editMode ? 'chabahar-label' : ''}`}
                    style={p.labelOffsetX && !editMode ? { transform: `translateX(${p.labelOffsetX})` } : undefined}
                  >
                    <span className="text-persian whitespace-nowrap">
                      {p.name}
                      {editMode && (
                        <span className="opacity-70 text-[10px] mr-1">
                          ({p.x.toFixed(1)},{p.y.toFixed(1)})
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: collapsible list to avoid long scrolling */}
        <details className="md:hidden mt-8 max-w-3xl mx-auto group bg-white/10 border border-white/20 rounded-2xl overflow-hidden backdrop-blur-sm">
          <summary className="list-none cursor-pointer flex items-center justify-between gap-3 px-4 py-3 text-white text-persian">
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent-light" />
              <strong>مشاهده لیست بنادر ({ports.length})</strong>
            </span>
            <svg
              className="w-5 h-5 transition-transform group-open:rotate-180"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </summary>
          <div className="grid grid-cols-2 gap-2 p-3 border-t border-white/15">
            {ports.map((p) => (
              <div
                key={`list-m-${p.name}`}
                className="!bg-white/95 !border-white/40 border rounded-xl p-2.5 flex items-center gap-2 shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-accent-light shadow-[0_0_10px_hsl(var(--accent-light)/0.8)] flex-shrink-0" />
                <span className="text-slate-900 text-xs text-persian leading-tight">
                  <strong>{p.name}</strong>
                </span>
              </div>
            ))}
          </div>
        </details>

        {/* Tablet/Desktop list under map */}
        <div className="hidden md:grid mt-10 grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl mx-auto">
          {ports.map((p) => (
            <div
              key={`list-${p.name}`}
              className="!bg-white/95 !border-white/40 border rounded-2xl p-3 flex items-center gap-3 shadow-sm"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-accent-light shadow-[0_0_12px_hsl(var(--accent-light)/0.8)] flex-shrink-0" />
              <span className="text-slate-900 text-sm text-persian leading-tight">
                <strong>{p.name}</strong>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortsMapSection;
