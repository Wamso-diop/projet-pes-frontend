import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from 'next-themes';
import { getMessages } from 'next-intl/server';
import { Toaster } from 'sonner';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta',
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === 'fr';

  return {
    metadataBase: new URL('https://poleexcellencescolaire.cm'),
    title: {
      default: isFr
        ? "Pôle d'Excellence Scolaire | Soutien scolaire à Douala"
        : "Pôle d'Excellence Scolaire | School support in Douala",
      template: "%s | Pôle d'Excellence Scolaire",
    },
    description: isFr
      ? "10 ans d'excellence dans l'assistance scolaire à Douala. Cours personnalisés de mathématiques, physique, anglais pour primaire, collège et lycée."
      : "10 years of excellence in school assistance in Douala. Personalized math, physics, English courses for primary, middle and high school.",
    keywords: isFr
      ? ['soutien scolaire Douala', 'cours particuliers Cameroun', 'assistance scolaire', 'mathématiques Douala', 'préparation BEPC']
      : ['school support Douala', 'tutoring Cameroon', 'private lessons Douala'],
    openGraph: {
      type: 'website',
      locale: isFr ? 'fr_FR' : 'en_US',
      url: 'https://poleexcellencescolaire.cm',
      siteName: "Pôle d'Excellence Scolaire",
      title: "Aidons vos enfants à déployer leurs ailes",
      description: "10 ans d'excellence dans l'assistance scolaire à Douala.",
      images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: "Pôle d'Excellence Scolaire",
      description: "Soutien scolaire personnalisé à Douala depuis 10 ans.",
      images: ['/images/og-image.jpg'],
    },
    robots: { index: true, follow: true },
    alternates: {
      canonical: `https://poleexcellencescolaire.cm/${locale}`,
      languages: {
        'fr-CM': 'https://poleexcellencescolaire.cm/fr',
        'en-CM': 'https://poleexcellencescolaire.cm/en',
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: "Pôle d'Excellence Scolaire",
              alternateName: 'PES — Pôle d\'Excellence Scolaire',
              url: 'https://poleexcellencescolaire.cm',
              description: "Soutien scolaire personnalisé à Douala depuis plus de 10 ans.",
              foundingDate: '2014',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Douala',
                addressRegion: 'Littoral',
                addressCountry: 'CM',
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${plusJakarta.variable} antialiased`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="pes-theme">
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
            <Toaster richColors position="top-right" />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
