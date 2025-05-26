import { getTranslations } from 'next-intl/server';

export default async function HomePage() {
  const t = await getTranslations('common');
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center ">
      <h1>{t('welcome', { default: 'Welcome to Gymo!' })}</h1>
    </div>
  );
}
