import '../../styles/globals.css';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LocaleProvider from '../LocaleProvider';
import { locales } from '../layout';
import { getMessages } from 'next-intl/server';

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
  const awaitedParams = await params;
  const { locale } = awaitedParams;
  if (!locales.includes(locale)) notFound();
  const messages = await getMessages({ locale });
  return <LocaleProvider messages={messages}>{children}</LocaleProvider>;
}
