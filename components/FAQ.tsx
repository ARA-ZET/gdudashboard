'use client';
import { useState } from 'react';
import { Icon } from './Icon';

export function FAQ({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-outline-variant/60 overflow-hidden rounded-lg border border-outline-variant/60 bg-surface-white">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-surface-dim"
              >
                <span className="text-[16px] font-semibold text-navy">{f.q}</span>
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-outline-variant text-navy transition-transform ${isOpen ? 'rotate-45 border-gold bg-gold' : ''}`}>
                  <Icon name="plus" className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <div
              className="grid transition-all duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 text-[15px] leading-relaxed text-ink-muted">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
