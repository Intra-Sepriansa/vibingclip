/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'vibe-violet': '#8b5cf6',
        'vibe-emerald': '#34d399'
      },
      boxShadow: {
        card: '0 10px 40px rgba(0, 0, 0, 0.35)'
      },
      backgroundImage: {
        'vibe-grid': 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)',
        'vibe-radial': 'radial-gradient(circle at 20% 20%, rgba(139,92,246,0.2), transparent 35%), radial-gradient(circle at 80% 0%, rgba(52,211,153,0.16), transparent 40%)'
      }
    }
  },
  plugins: []
};
