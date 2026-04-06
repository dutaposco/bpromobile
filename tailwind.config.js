/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: "#FF3344",
        brandSoft: "rgb(var(--brand-soft) / <alpha-value>)",    
        textMain: "rgb(var(--text-main) / <alpha-value>)",     
        textMuted: "rgb(var(--text-muted) / <alpha-value>)",    
        surface: "rgb(var(--surface) / <alpha-value>)",
        surfaceAlt: "rgb(var(--surface-alt) / <alpha-value>)",   
        accentBlue: "#3B82F6",   
        accentOrange: "#F97316", 
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 10px 40px -10px rgba(0, 0, 0, 0.08)',
        'glow': '0 10px 30px -10px rgba(255, 51, 68, 0.3)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
}
