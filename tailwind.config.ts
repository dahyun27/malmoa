import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1f2933",
        moss: "#50624f",
        sage: "#dce5d8",
        linen: "#f7f3ed",
        coral: "#d66b5d",
        gold: "#c79a38"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(31, 41, 51, 0.08)"
      }
    },
  },
  plugins: [],
};

export default config;
