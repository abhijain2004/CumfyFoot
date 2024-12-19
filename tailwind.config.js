const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customColor: '#2c4152',
      },
    },
    screens: {

      'laptop': '1040px',
      // => @media (min-width: 1024px) { ... }
      "section":"1290px",
      
    },
  },
  plugins: [],
});
