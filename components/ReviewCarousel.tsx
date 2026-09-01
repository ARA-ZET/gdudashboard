'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';
import type { Testimonial } from '@/lib/content';

/**
 * Customer review carousel.
 *
 * Scrolling is native CSS scroll-snap rather than a transform-driven track, so
 * touch swiping, momentum and trackpad gestures all work without any JS, and the
 * buttons only ever nudge the scroll position. Autoplay pauses on hover, on
 * keyboard focus, and whenever the reader has asked for reduced motion.
 */
export function ReviewCarousel({
  reviews,
  autoplayMs = 7000,
}: {
  reviews: Testimonial[];
  autoplayMs?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const scrollToIndex = useCallback((i: number, smooth = true) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[i] as HTMLElement | undefined;
    if (!card) return;
    track.scrollTo({
      left: card.offsetLeft - track.offsetLeft,
      behavior: smooth ? 'smooth' : 'auto',
    });
  }, []);

  // Derive the active dot from wherever the reader has actually scrolled to,
  // so swiping and the buttons stay in agreement.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const cards = Array.from(track.children) as HTMLElement[];
        const left = track.scrollLeft + track.offsetLeft;
        let nearest = 0;
        let best = Infinity;
        cards.forEach((card, i) => {
          const d = Math.abs(card.offsetLeft - left);
          if (d < best) { best = d; nearest = i; }
        });
        setActive(nearest);
      });
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      track.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (paused || reviews.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => {
      setActive((i) => {
        const next = (i + 1) % reviews.length;
        scrollToIndex(next);
        return next;
      });
    }, autoplayMs);
    return () => window.clearInterval(id);
  }, [paused, reviews.length, autoplayMs, scrollToIndex]);

  if (reviews.length === 0) return null;

  const go = (i: number) => scrollToIndex((i + reviews.length) % reviews.length);

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Customer reviews"
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((t, i) => (
          <figure
            key={`${t.name}-${i}`}
            aria-roledescription="slide"
            aria-label={`Review ${i + 1} of ${reviews.length}`}
            className="card flex w-[85%] shrink-0 snap-start flex-col p-8 sm:w-[48%] lg:w-[32%]"
          >
            <Icon name="quote" className="h-8 w-8 shrink-0 text-gold" />
            <blockquote className="mt-4 flex-1 font-serif text-lg leading-relaxed text-navy md:text-xl">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-outline-variant/60 pt-5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy text-[13px] font-bold text-gold">
                {t.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
              </span>
              <div className="min-w-0">
                <div className="truncate text-[14px] font-semibold text-navy">{t.name}</div>
                {t.role && <div className="truncate text-[12px] text-ink-muted">{t.role}</div>}
              </div>
              {/* Only ever show the stars the reviewer actually gave. */}
              {typeof t.rating === 'number' && (
                <span
                  className="ml-auto inline-flex shrink-0 items-center gap-1 text-gold"
                  aria-label={`${t.rating} out of 5 stars`}
                >
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Icon key={s} name="star" className="h-3.5 w-3.5 fill-gold" aria-hidden="true" />
                  ))}
                </span>
              )}
            </figcaption>
            {t.source && (
              <div className="mt-3 text-[11px] text-ink-muted">
                Review on {t.source}
                {t.sourceUrl && (
                  <>
                    {' · '}
                    <a
                      href={t.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-navy underline decoration-gold underline-offset-2"
                    >
                      Read it there
                    </a>
                  </>
                )}
              </div>
            )}
          </figure>
        ))}
      </div>

      {reviews.length > 1 && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => go(active - 1)}
            aria-label="Previous review"
            className="grid h-11 w-11 place-items-center rounded-md border border-outline-variant text-navy transition-colors hover:border-gold hover:text-gold-700"
          >
            <Icon name="arrow" className="h-4 w-4 rotate-180" />
          </button>

          <div className="flex items-center gap-2">
            {reviews.map((t, i) => (
              <button
                key={`${t.name}-dot-${i}`}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to review ${i + 1}`}
                aria-current={i === active}
                className={`h-2 rounded-full transition-all ${
                  i === active ? 'w-6 bg-gold' : 'w-2 bg-outline-variant hover:bg-outline'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(active + 1)}
            aria-label="Next review"
            className="grid h-11 w-11 place-items-center rounded-md border border-outline-variant text-navy transition-colors hover:border-gold hover:text-gold-700"
          >
            <Icon name="arrow" className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
