/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          950: '#0B0F19',
          900: '#0F1421',
          800: '#141a2b',
        },
        cobalt: {
          DEFAULT: '#2F6FFF',
          bright: '#3B82F6',
        },
        cyan: {
          glow: '#22D3EE',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
        'radial-glow':
          'radial-gradient(circle at 50% 0%, rgba(47,111,255,0.18), transparent 60%)',
      },
      backgroundSize: {
        grid: '48px 48px',
      },
      boxShadow: {
        'glow-cobalt': '0 0 40px -10px rgba(47,111,255,0.6)',
        'glow-cyan': '0 0 30px -8px rgba(34,211,238,0.5)',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
