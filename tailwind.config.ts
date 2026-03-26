import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#09090c',
        night: '#111218',
        champagne: '#e2c089',
        bronze: '#9d6e45',
        mist: '#bcb7ae'
      },
      fontFamily: {
        display: ['Baskerville', 'Palatino Linotype', 'Book Antiqua', 'serif'],
        body: ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif']
      },
      boxShadow: {
        luxe: '0 24px 80px rgba(0,0,0,0.35)'
      },
      backgroundImage: {
        'gold-glow': 'radial-gradient(circle at top left, rgba(226,192,137,0.18), transparent 30%), radial-gradient(circle at bottom right, rgba(157,110,69,0.2), transparent 24%)'
      }
    }
  },
  plugins: []
};

export default config;
