/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    backgroundImage: {
      R: `url("../src/assets/chess/RB.png")`,
      N: `url("../src/assets/chess/NB.png")`,
      B: `url("../src/assets/chess/BB.png")`,
      K: `url("../src/assets/chess/KB.png")`,
      Q: `url("../src/assets/chess/QB.png")`,
      P: `url("../src/assets/chess/PB.png")`,
      r: `url("../src/assets/chess/RW.png")`,
      n: `url("../src/assets/chess/NW.png")`,
      b: `url("../src/assets/chess/BW.png")`,
      k: `url("../src/assets/chess/KW.png")`,
      q: `url("../src/assets/chess/QW.png")`,
      p: `url("../src/assets/chess/PW.png")`,
    },
  },
  plugins: [],
};
