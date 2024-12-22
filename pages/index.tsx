import HeroSection from 'components/Landing/HeroSection';
import ShareSection from 'components/Landing/ShareSection';
import Footer from 'components/Landing/Footer';
import ViewSection from 'components/Landing/ViewSection';
import FinalSection from 'components/Landing/FinalSection';

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <ShareSection />
      <ViewSection />
      <FinalSection />
      <Footer />
    </>
  );
}
