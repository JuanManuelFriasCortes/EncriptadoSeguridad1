import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Criptoanálisis Al-Kindi',
  description:
    'Laboratorio local para cifrar con César y Atbash y realizar criptoanálisis estadístico automático en español.',
  applicationName: 'Criptoanálisis Al-Kindi',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
