/** @type {import('tailwindcss').Config} */
export const darkMode = ["class"];
export const content = [
  "./pages/**/*.{ts,tsx}",
  "./components/**/*.{ts,tsx}",
  "./app/**/*.{ts,tsx}",
  "./src/**/*.{ts,tsx}",
];
export const theme = {
  colors: {
    primary: "#7DD956",
    gray: {
      900: "#1a1a1a", // Updated for background opacity issue
      800: "#2d2d2d", // Modal content background
      700: "#404040",
      600: "#525252",
      400: "#a3a3a3",
      200: "#e5e5e5",
    },
    green: {
      400: "#4ade80",
      500: "#22c55e",
      600: "#16a34a",
      700: "#15803d",
    },
    blue: {
      400: "#60a5fa",
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
    },
    purple: {
      400: "#c084fc",
      500: "#a855f7",
      600: "#9333ea",
      700: "#7e22ce",
    },
    yellow: {
      400: "#facc15",
      500: "#eab308",
      600: "#ca8a04",
      700: "#a16207",
    },
    white: "#ffffff",
  },
  container: {
    center: true,
    padding: "2rem",
    screens: {
      "2xl": "1400px",
    },
  },
  extend: {
    keyframes: {
      fadeInOut: {
        "0%": { opacity: "1" },
        "90%": { opacity: "1" },
        "100%": { opacity: "0" },
      },
    },
    animation: {
      "fade-in-out": "fadeInOut 5s ease-in-out forwards",
    },
  },
};
// eslint-disable-next-line no-undef
export const plugins = [require("tailwindcss-animate")];
