/** @type {import('tailwindcss').Config} */
// import daisyui from "daisyui";
import { nextui } from "@nextui-org/react";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1469FC",
        links: "#4E94FD",
      },
    },
  },

  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#DFFCDD",
            foreground: "#11181C",
            success: "#50C878",
            links: "#4E94FD",
          },
        },
      },
    }),
  ],
};
