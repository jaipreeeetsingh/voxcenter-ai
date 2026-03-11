/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
          extend: {
                  colors: {
                            primary: { 500: '#6366f1', 600: '#4f46e5', 700: '#4338ca' },
                            dark: { 800: '#1e293b', 900: '#0f172a', 950: '#0a0e1a' },
                  },
          },
    },
    plugins: [],
};
