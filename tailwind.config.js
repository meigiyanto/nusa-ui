/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./demo/**/*.{html,js}", "./src/**/*.{html,js}", "./resources/**/*.{html,js,php,blade.php}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff6ff", 100: "#dbeafe", 200: "#bfdbfe", 300: "#93c5fd",
          400: "#60a5fa", 500: "#3b82f6", 600: "#2563eb", 700: "#1d4ed8",
          800: "#1e40af", 900: "#1e3a8a"
        }
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 2px 12px rgb(15 23 42 / 0.06)",
        lift: "0 12px 32px rgb(15 23 42 / 0.10)"
      }
    }
  },
  plugins: []
};