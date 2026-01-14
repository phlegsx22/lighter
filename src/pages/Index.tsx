import MatrixBackground from '@/components/MatrixBackground';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SectionConnector from '@/components/SectionConnector';
import ArchitectureSection from '@/components/ArchitectureSection';
import BackersSection from '@/components/BackersSection';
import CTASection from '@/components/CTASection';
import MobileAppSection from '@/components/MobileAppSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      {/* Matrix Background Effect */}
      <MatrixBackground />
      
      {/* Grid Overlay */}
      <div className="fixed inset-0 matrix-grid animate-matrix pointer-events-none" style={{ zIndex: 1 }} />
      
      {/* Content */}
      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection />
          <AboutSection />
          <SectionConnector />
          <ArchitectureSection />
          <BackersSection />
          <CTASection />
          <MobileAppSection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
