import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-body)"],
        display: ["var(--font-display)", "var(--font-body)"],
      },
      colors: {
        sobok: {
          bg: "#FFFFFF",
          ink: "#000000",
          accent: "#000000",
          muted: "#777777",
          line: "#ECECEC",
          surface: "#F5F5F5",
          white: "#FFFFFF",
        },
      },
      maxWidth: {
        content: "1400px",
        narrow: "680px",
      },
      transitionDuration: {
        sobok: "200ms",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
