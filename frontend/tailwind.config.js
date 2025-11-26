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
        background: {
          light: '#F5F7FA',
          dark: '#0D1117',
        },
        card: {
          light: '#FFFFFF',
          dark: '#161B22',
        },
        text: {
          primary: {
            light: '#1A1A1A',
            dark: '#EAECEF',
          },
          secondary: {
            light: '#6B7280',
            dark: '#9CA3AF',
          },
        },
        accent: '#3B82F6',
        success: '#22C55E',
        error: {
          light: '#EF4444',
          dark: '#F87171',
        },
        divider: {
          light: 'rgba(0,0,0,0.06)',
          dark: 'rgba(255,255,255,0.06)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.02)',
        'glow': '0 0 0 3px rgba(59, 130, 246, 0.5)',
      },
      borderRadius: {
        'xl': '20px',
        '2xl': '24px',
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: false, // Disable daisyUI themes to use our custom colors
  },
}