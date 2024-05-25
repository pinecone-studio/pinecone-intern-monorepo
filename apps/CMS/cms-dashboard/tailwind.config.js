const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const plugin = require('tailwindcss/plugin');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [join(__dirname, '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'), ...createGlobPatternsForDependencies(__dirname)],
  theme: {
    extend: {
      colors: {
        textPrimary: '#121316',
        textSecondary: '#3F4145',
        textPlaceholder: '#8B8E95',
        border: '#ECEDF0',
        tagGrayBackground: '#ECEDF0',
        grayBackground: '#e9eaec',
        activeBackground: '#1C202414',
        iconSecondary: '#5E6166',
      },
    },
  },
  plugins: [
    require('daisyui'),
    plugin(function ({ addVariant, e }) {
      addVariant('invalid', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`invalid${separator}${className}`)}:invalid`;
        });
      });
    }),
  ],
};
