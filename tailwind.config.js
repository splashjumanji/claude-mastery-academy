/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Jasper brand flame (primary CTA & brand accent — exact values from jasper.ai)
        flame: {
          50:  '#fff4f2',
          100: '#ffe4de',
          200: '#ffc9bc',
          300: '#ffa08c',
          400: '#ffb3a3',
          500: '#fa7560',
          600: '#fa4028',  // jasper.ai primary red-orange
          700: '#d42e17',
          800: '#b02210',
          900: '#8c1a0c',
        },
        // Jasper navy (text color from jasper.ai)
        navy: {
          DEFAULT: '#00063d',
          soft: '#1a2050',
          muted: '#4a5280',
        },
        // Purple (kept for gamification/XP/level elements)
        jasper: {
          50:  '#fdf4ff',
          100: '#fae8ff',
          200: '#f3d0fe',
          300: '#e9a8fd',
          400: '#d975f9',
          500: '#c44df0',
          600: '#a82dd4',
          700: '#8b22ae',
          800: '#731f8d',
          900: '#5f1e72',
        },
        // Blue (Aria citation / learning metrics)
        aria: {
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // Light-mode surface system
        xeo: {
          bg:      '#f5f4f0',   // warm off-white page background
          surface: '#ffffff',   // cards / panels
          border:  '#e5e3dd',   // light borders
          muted:   '#6b7a99',   // muted/secondary text
          subtle:  '#f0eeea',   // subtle inner backgrounds
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
      },
      animation: {
        'pulse-slow':    'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounce 2s infinite',
        'fade-in':       'fadeIn 0.3s ease-out',
        'slide-up':      'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn:  { '0%': { opacity: '0' },                            '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}
