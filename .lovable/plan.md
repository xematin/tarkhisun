Fix the billing button (صورتحساب) and payment button layout in the admin cards table.

## Changes

### File: src/pages/TSCards.tsx

1. **Widen the action buttons container** (line ~360):
   - Change `md:max-w-[160px]` to `md:max-w-[240px]` so the two side-by-side text buttons have enough horizontal room on desktop.

2. **Fix the payment button** (line ~386):
   - Replace green `bg-emerald-600/10` / `text-emerald-600` with a blue gradient: `bg-gradient-to-l from-blue-600 to-sky-500 text-white hover:opacity-90 shadow-md`
   - Add `w-full justify-start gap-1.5 px-2` for proper flex containment
   - Remove `ml-1` from the `<Banknote>` icon (redundant with gap)
   - Add `shrink-0` to the icon so it never gets squished
   - Add `truncate` to the text span so it clips instead of overflowing

3. **Fix the billing button** (line ~390):
   - Same blue gradient style as the payment button for visual consistency
   - Add `w-full justify-start gap-1.5 px-2` for proper flex containment
   - Remove `ml-1` from the `<Receipt>` icon (redundant with gap)
   - Add `shrink-0` to the icon so it never gets squished
   - Add `truncate` to the text span so it clips instead of overflowing

## Result
Both buttons will sit cleanly side-by-side, icons will stay inside the button frame, text will truncate if space is too tight, and the color will switch from green to a pleasant blue-to-sky gradient.