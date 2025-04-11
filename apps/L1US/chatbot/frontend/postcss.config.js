const { join } = require('path');

module.exports = {
  plugins: {
    tailwindcss: {
      postcssimport: {},
      'tailwindcss/nesting': 'postcss-nesting',
      autoprefixer: {},
      config: join(__dirname, 'tailwind.config.js'),
    },
    autoprefixer: {},
  },
};
