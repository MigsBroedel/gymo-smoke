import '../globals.css';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LocaleProvider from '../LocaleProvider';
import { locales } from '../layout';

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { locale } = await params;
  if (!locales.includes(locale)) notFound();
  return (
    <html lang={locale}>
      <body>
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
