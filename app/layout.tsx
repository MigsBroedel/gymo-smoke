import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'GYMO - Plataforma de treinamento',
  description: 'Conectamos profissionais e alunos que levam o treino a outro nível.',
  generator: 'v0.dev',
};

export const locales = ['en', 'pt'];
export const defaultLocale = 'en';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        <title>GYMO - Plataforma de treinamento</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
