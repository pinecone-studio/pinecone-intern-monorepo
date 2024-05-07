const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [join(__dirname, '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'), ...createGlobPatternsForDependencies(__dirname)],
  theme: {
    colors:{
      black:'#000',
      white:'#FFF',
      main:'#121316',
      dark:'#3F4145',
      light:'#F7F7F8',
      error:'#FF3333'
    },
    extend: {},
  },
  plugins: [require('daisyui')],
};
