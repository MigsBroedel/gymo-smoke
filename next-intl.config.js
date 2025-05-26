const en = require('./public/locales/en/common.json');
const pt = require('./public/locales/pt/common.json');

module.exports = {
  locales: ['en', 'pt'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  messages: {
    en,
    pt,
  },
};
