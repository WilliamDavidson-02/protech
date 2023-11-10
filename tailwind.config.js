/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.html", "./*.js"],
  theme: {
    extend: {
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-2px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(2px)" },
        },
      },
      animation: {
        shake: "shake 0.5s ease-in-out forwards",
      },
      colors: {
        "pro-black": "#1D1D1F",
        "pro-gray": "#86868B",
        "pro-white": "#F5F5F7",
        "pro-gold": "#D9B573",
        "pro-light-gold": "#F4EAD7",
        "pro-white-purple": "#F4EAFA",
        "pro-light-purple": "#A352D9",
        "pro-dark-purple": "#7937A6",
      },
    },
  },
  plugins: [],
};
