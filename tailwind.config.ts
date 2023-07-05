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
        facebook: {
          DEFAULT: "#3b5998",
          foreground: "#FFF",
          "50": "#f4f6fb",
          "100": "#e8ebf6",
          "200": "#ccd6eb",
          "300": "#a0b4d9",
          "400": "#6d8cc3",
          "500": "#4a6dad",
          "600": "#3b5998",
          "700": "#2e4476",
          "800": "#2a3c62",
          "900": "#273453",
          "950": "#1a2137",
        },
        google: {
          DEFAULT: "#ea4335",
          "50": "#fff7f7",
          "100": "#ffefef",
          "200": "#ffd9d9",
          "300": "#ffbfbf",
          "400": "#ff9f9f",
          "500": "#ff7f7f",
          "600": "#ff5c5c",
          "700": "#ff3b3b",
          "800": "#ff2d2d",
          "900": "#ff1f1f",
          "950": "#ff0f0f",
          foreground: "#fff",
        },
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
