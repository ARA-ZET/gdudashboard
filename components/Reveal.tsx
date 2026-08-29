import type { ReactNode, CSSProperties } from 'react';

/**
 * Entrance animation wrapper — pure CSS, no JavaScript.
 *
 * Content is ALWAYS visible (the animation only enhances first paint). If CSS
 * animations are unsupported or the user prefers reduced motion, children simply
 * render at full opacity — content can never get stuck hidden.
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}) {
  const Comp = Tag as any;
  const style: CSSProperties | undefined = delay ? { animationDelay: `${delay}ms` } : undefined;
  return (
    <Comp className={`gd-reveal ${className}`} style={style}>
      {children}
    </Comp>
  );
}
