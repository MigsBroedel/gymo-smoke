import { getRequestConfig } from 'next-intl/server';

const DEFAULT_LOCALE = 'en';

export default getRequestConfig(async ({ locale }) => {
  const safeLocale = locale || DEFAULT_LOCALE;
  return {
    locale: safeLocale,
    messages: (await import(`../public/locales/${safeLocale}/common.json`)).default
  };
});
