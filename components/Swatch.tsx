/**
 * On-brand fabric-texture tile used as an elegant stand-in for a photograph.
 * Replace with a real photo by dropping <slug>.jpg into /public/images/portfolio/
 * and rendering next/image instead. Each swatch renders a tufted, buttoned weave.
 */

const palettes: Record<string, { from: string; to: string; button: string }> = {
  emerald: { from: '#123b34', to: '#0c2a25', button: 'rgba(255,255,255,0.10)' },
  navy: { from: '#0a1f3d', to: '#041632', button: 'rgba(255,183,0,0.16)' },
  gold: { from: '#8a6410', to: '#5e4200', button: 'rgba(255,255,255,0.14)' },
  sand: { from: '#b9a58a', to: '#93805f', button: 'rgba(255,255,255,0.18)' },
  rust: { from: '#7a3b26', to: '#552518', button: 'rgba(255,255,255,0.12)' },
  bone: { from: '#e7e0d5', to: '#cfc6b6', button: 'rgba(4,22,50,0.10)' },
};

export function Swatch({
  variant = 'navy',
  className = '',
  label,
}: {
  variant?: keyof typeof palettes | string;
  className?: string;
  label?: string;
}) {
  const p = palettes[variant] ?? palettes.navy;
  const id = `sw-${variant}-${Math.random().toString(36).slice(2, 7)}`;
  const light = variant === 'bone' || variant === 'sand';
  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden="true">
      <svg className="h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={p.from} />
            <stop offset="1" stopColor={p.to} />
          </linearGradient>
          <radialGradient id={`${id}-b`} cx="0.5" cy="0.4" r="0.6">
            <stop offset="0" stopColor={p.button} />
            <stop offset="0.5" stopColor="rgba(0,0,0,0.10)" />
            <stop offset="1" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
        </defs>
        <rect width="400" height="300" fill={`url(#${id})`} />
        {/* Diamond-tufted button grid */}
        <g>
          {Array.from({ length: 6 }).map((_, r) =>
            Array.from({ length: 8 }).map((_, c) => {
              const x = 25 + c * 50 + (r % 2 ? 25 : 0);
              const y = 30 + r * 48;
              return <circle key={`${r}-${c}`} cx={x} cy={y} r="26" fill={`url(#${id}-b)`} />;
            }),
          )}
          {Array.from({ length: 6 }).map((_, r) =>
            Array.from({ length: 8 }).map((_, c) => {
              const x = 25 + c * 50 + (r % 2 ? 25 : 0);
              const y = 30 + r * 48;
              return <circle key={`d-${r}-${c}`} cx={x} cy={y} r="1.6" fill={light ? 'rgba(4,22,50,0.35)' : 'rgba(255,255,255,0.35)'} />;
            }),
          )}
        </g>
        {/* Sheen */}
        <rect width="400" height="300" fill="url(#sheen)" opacity="0.0" />
      </svg>
      {label && (
        <span className="absolute bottom-3 right-3 rounded bg-black/25 px-2 py-1 text-[10px] font-semibold uppercase tracking-label text-white/80 backdrop-blur">
          {label}
        </span>
      )}
    </div>
  );
}
