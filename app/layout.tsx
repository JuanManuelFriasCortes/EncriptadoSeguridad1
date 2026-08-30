import type { Metadata } from 'next';
import './globals.css';

const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL
  ?? 'https://criptoanalisis-al-kindi.juanmanuelfriascorte.chatgpt.site';

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: 'Criptoanálisis Al-Kindi',
  description:
    'Laboratorio local para cifrar con César y Atbash y realizar criptoanálisis estadístico automático en español.',
  applicationName: 'Criptoanálisis Al-Kindi',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    title: 'Criptoanálisis Al-Kindi',
    description: 'César, Atbash y análisis estadístico local.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Criptoanálisis Al-Kindi' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Criptoanálisis Al-Kindi',
    description: 'César, Atbash y análisis estadístico local.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
