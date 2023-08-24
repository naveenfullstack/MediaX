/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/page/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "320px",
        md: "600px",
        lg: "1024px",
        xl: "1440px",
      },
      colors: {
        primary: "#e50914",
        input_bg: "#454545",
        primary_text: "#ffffff",
        paragraph : "acacac"
      },
      fontSize: {
        paragraph: '1rem',
        paragraph_2: '0.8rem',
      },
      opacity: {
        default: '.60',
      },
      borderWidth: {
        default: '1px',
        '0': '0',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '6': '6px',
        '8': '8px',
      },
      width: {
        logo: '10rem',
      },
      maxWidth: {
        default: '1366px',
      },
      space : {
        default : '1rem'
      },
      fontFamily: {
        title: ['Alata', 'sans-serif'],
      },
      height: {
        item_xl: '12rem',
        item_lg: '10rem',
        item_md: '25rem',
        item_sm: '15rem',
      },
      padding: {
        item_lg_left: '5rem',
        item_md_left: '2.5rem',
        item_sm_left: '1rem',
      }
    },
  },
  plugins: [],
};
