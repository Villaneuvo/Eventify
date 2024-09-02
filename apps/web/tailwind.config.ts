import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "magnifier-333": "url('/magnifier-333.png')",
        "magnifier-555": "url('/magnifier-333.png')",
      },
      colors: {
        "bg-main": "#F5F5F5",
        "main-color": "#4169E1",
        "text-main": "#333333",
        "btn-jumbotron": "#1E3A8A",
        "dark-charcoal": "#333333",
      },
      boxShadow: {
        "nav-btn-shadow": "0 4px 12px 0 rgba(0, 0, 0, 0.25)",
        "search-bar-shadow": "0 4px 4px 0 rgba(0, 0, 0, 0.15)",
        "jumbtron-btn-shadow": "4px 4px 12px 0 rgba(65, 105, 225, 0.25)",
      },
    },
    screens: {
      xs: "375px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
      "3xl": "1536px",
    },
  },
  plugins: [],
};
export default config;
