import { fontFamily } from "tailwindcss/defaultTheme"

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          "50": "#e7f6ff",
          "100": "#d3efff",
          "200": "#b0dfff",
          "300": "#81c7ff",
          "400": "#4fa0ff",
          "500": "#2877ff",
          "600": "#044aff",
          "700": "#0048ff",
          "800": "#003edc",
          "900": "#0b39a4",
          "950": "#07205f",
        },
        haiti: {
          DEFAULT: "#1C0F30",
          "50": "#efedff",
          "100": "#e1deff",
          "200": "#ccc4ff",
          "300": "#aea0ff",
          "400": "#997aff",
          "500": "#8c5bf9",
          "600": "#823dee",
          "700": "#7230d2",
          "800": "#5c29aa",
          "900": "#4c2986",
          "950": "#1c0f30",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          "50": "#efedff",
          "100": "#e1deff",
          "200": "#ccc4ff",
          "300": "#aea0ff",
          "400": "#997aff",
          "500": "#8c5bf9",
          "600": "#823dee",
          "700": "#7230d2",
          "800": "#5c29aa",
          "900": "#4c2986",
          "950": "#1c0f30",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        mono: ["var(--font-mono)", ...fontFamily.mono],
        serif: ["var(--font-serif)", ...fontFamily.serif],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
