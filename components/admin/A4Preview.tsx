'use client';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';

/** 210mm at 96dpi — the CSS pixel width of an A4 page. */
const A4_WIDTH_PX = 794;

/**
 * Shows an A4 document exactly as it will print.
 *
 * The sheet inside is always laid out at full A4 width, so its line breaks and
 * pagination match the printed page. This wrapper then scales the whole thing
 * down to fit the available width — scaling, not reflowing, is what keeps the
 * preview faithful. It never scales above 1, so on a wide screen you get the
 * page at its true size rather than a blown-up one.
 *
 * Print CSS removes the transform (see `@media print` in globals.css).
 */
export function A4Preview({ children }: { children: ReactNode }) {
  const viewport = useRef<HTMLDivElement>(null);
  const scaler = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState<number | undefined>(undefined);

  const measure = useCallback(() => {
    const vp = viewport.current;
    const sc = scaler.current;
    if (!vp || !sc) return;
    const next = Math.min(1, vp.clientWidth / A4_WIDTH_PX);
    setScale(next);
    // The scaled element is removed from layout flow for sizing purposes, so
    // the viewport needs an explicit height or the page collapses behind it.
    setHeight(sc.offsetHeight * next);
  }, []);

  useEffect(() => {
    measure();
    const vp = viewport.current;
    const sc = scaler.current;
    if (!vp || !sc) return;
    // Observe both: the viewport for window resizes, the sheet for content
    // changes (a document growing by a line item changes its height).
    const ro = new ResizeObserver(measure);
    ro.observe(vp);
    ro.observe(sc);
    return () => ro.disconnect();
  }, [measure]);

  return (
    <div ref={viewport} className="a4-viewport" style={{ height }}>
      <div ref={scaler} className="a4-scaler" style={{ transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}
