/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        threads: {
          gray: "#0F0F0F",
          "gray-dark": "#1E1E1E",
          "gray-light": "#7A7A7A",
          modal: "#414040",
        }
      },
    },
  },
  plugins: [],
};
