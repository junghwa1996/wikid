import FinalSection from 'components/Landing/FinalSection';
import Footer from 'components/Landing/Footer';
import HeroSection from 'components/Landing/HeroSection';
import ShareSection from 'components/Landing/ShareSection';
import ViewSection from 'components/Landing/ViewSection';

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
