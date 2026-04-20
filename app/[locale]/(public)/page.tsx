import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import CoursesSection from '@/components/home/CoursesSection';
import WhyPESSection from '@/components/home/WhyPESSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import PricingSection from '@/components/home/PricingSection';
import BlogSection from '@/components/home/BlogSection';
import CtaSection from '@/components/home/CtaSection';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'fr'
      ? "Soutien scolaire à Douala | Pôle d'Excellence Scolaire"
      : "School tutoring in Douala | Pôle d'Excellence Scolaire",
    description: locale === 'fr'
      ? "10 ans d'expertise en soutien scolaire à Douala. Cours personnalisés du primaire au lycée. 94% de réussite aux examens."
      : "10 years of tutoring expertise in Douala. Personalised lessons from primary to high school. 94% exam success rate.",
  };
}

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      <CoursesSection />
      <WhyPESSection />
      <TestimonialsSection />
      <PricingSection />
      <BlogSection />
      <CtaSection />
    </div>
  );
}
