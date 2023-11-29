/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      spacing: {
        "80%": "80%",
        "50%m": "-50%",
      },
      maxWidth: {
        "8r": "8rem",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
