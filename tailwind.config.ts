import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#041632',
          950: '#020c1d',
          900: '#041632',
          800: '#0a1f3d',
          700: '#1b2b48',
          600: '#26365a',
          500: '#374765',
          300: '#8393b5',
          200: '#b7c7eb',
          100: '#d7e2ff',
        },
        gold: {
          DEFAULT: '#feb700',
          400: '#ffba20',
          300: '#ffdea8',
          700: '#7c5800',
          800: '#5e4200',
        },
        ink: {
          DEFAULT: '#1b1c1c',
          muted: '#44474d',
        },
        surface: {
          DEFAULT: '#fbf9f8',
          dim: '#f5f3f3',
          container: '#efeded',
          high: '#eae8e7',
          white: '#ffffff',
        },
        outline: {
          DEFAULT: '#75777e',
          variant: '#c5c6ce',
        },
      },
      fontFamily: {
        // `serif` = the heading/display face (now Poppins), `sans` = body (Roboto).
        // Class names kept for stability; only the underlying fonts changed.
        serif: ['var(--font-playfair)', 'Poppins', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'Roboto', 'system-ui', 'sans-serif'],
        heading: ['var(--font-playfair)', 'Poppins', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'Roboto', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['clamp(2.75rem, 6vw, 4rem)', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h1': ['clamp(2.25rem, 4.5vw, 3rem)', { lineHeight: '1.1', fontWeight: '700' }],
        'h2': ['clamp(1.75rem, 3vw, 2.25rem)', { lineHeight: '1.15', fontWeight: '600' }],
        'h3': ['1.5rem', { lineHeight: '2rem', fontWeight: '600' }],
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        md: '0.25rem',
        lg: '0.375rem',
        xl: '0.5rem',
      },
      maxWidth: {
        container: '1280px',
      },
      spacing: {
        'section': '120px',
        'section-sm': '80px',
      },
      letterSpacing: {
        label: '0.12em',
      },
      boxShadow: {
        ambient: '0 20px 40px -12px rgba(4, 22, 50, 0.12)',
        'ambient-lg': '0 30px 60px -15px rgba(4, 22, 50, 0.18)',
        card: '0 1px 3px rgba(4, 22, 50, 0.06), 0 10px 30px -12px rgba(4, 22, 50, 0.10)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
};
export default config;
