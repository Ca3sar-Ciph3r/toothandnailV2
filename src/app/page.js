import TopBanner          from '@/components/home/TopBanner';
import SiteNav            from '@/components/home/SiteNav';
import HeroSlider         from '@/components/home/HeroSlider';
import ServicesGrid       from '@/components/home/ServicesGrid';
import FeaturedSection    from '@/components/home/FeaturedSection';
import AboutSection       from '@/components/home/AboutSection';
import StatsSection       from '@/components/home/StatsSection';
import TryOnSection       from '@/components/home/TryOnSection';
import BlogSection        from '@/components/home/BlogSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import GiftCardSection    from '@/components/home/GiftCardSection';
import SiteFooter         from '@/components/home/SiteFooter';

export default function Home() {
  return (
    <>
      <TopBanner />
      <SiteNav />

      <main>
        <HeroSlider />
        <ServicesGrid />
        <FeaturedSection />
        <AboutSection />
        <StatsSection />
        <TryOnSection />
        <BlogSection />
        <TestimonialsSection />
        <GiftCardSection />
      </main>

      <SiteFooter />
    </>
  );
}
