/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Editorial primary accent — warm terracotta
        flame: {
          50:  '#fdf6f3',
          100: '#fae8e0',
          200: '#f5d0c0',
          300: '#e8a88a',
          400: '#d98b68',
          500: '#c97b56',
          600: '#c84b31',
          700: '#a53a24',
          800: '#882f1e',
          900: '#6e2518',
        },
        // Warm brown text
        navy: {
          DEFAULT: '#3d2e27',
          soft:    '#5c4a42',
          muted:   '#8b7a6e',
        },
        // Muted sage — gamification / secondary accent
        jasper: {
          50:  '#f4f7f5',
          100: '#e6ede9',
          200: '#cddbd2',
          300: '#a8c0b0',
          400: '#7fa28d',
          500: '#5e8670',
          600: '#4a6d5a',
          700: '#3d5949',
          800: '#33493c',
          900: '#2a3c32',
        },
        // Warm slate — citations / metrics
        aria: {
          50:  '#f7f6f4',
          100: '#edebe6',
          200: '#dbd7ce',
          300: '#c4bcaf',
          400: '#a89e8f',
          500: '#948776',
          600: '#877a6a',
          700: '#706458',
          800: '#5e544b',
          900: '#4e4640',
        },
        // Light-mode surface system — warm cream
        xeo: {
          bg:      '#faf8f5',
          surface: '#ffffff',
          border:  '#e8dcd0',
          muted:   '#8b7a6e',
          subtle:  '#f5ede6',
        },
      },
      fontFamily: {
        sans:    ['DM Sans', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        mono:    ['DM Mono', 'monospace'],
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
