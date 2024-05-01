const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [join(__dirname, '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'), ...createGlobPatternsForDependencies(__dirname)],
  theme: {
    extend: {
      colors: {
        textPrimary: '#121316',
        textSecondary: '#3F4145',
        border: '#ECEDF0',
        tagGrayBackground: '#ECEDF0',
        grayBackground: '#13ce66',
        activeBackground: '#1C202414',
      },
    },
  },
  plugins: [require('daisyui')],
};
