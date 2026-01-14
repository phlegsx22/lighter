import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import lighterLogo from '@/assets/lighter-logo.png';

const Success = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: 'RESOURCES', href: '/#resources' },
    { label: 'FAQ', href: '/#faq' },
    { label: 'COMMUNITY', href: '/#community' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/30">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
              <img src={lighterLogo} alt="Lighter" className="w-6 h-6 object-contain" />
              <span className="font-sans font-bold text-lg tracking-wider">LIGHTER</span>
            </Link>
            <div className="hidden md:flex items-center gap-12">
              {navLinks.map((link) => (
                <Link key={link.label} to={link.href} className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors tracking-widest">
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="hidden md:flex items-center gap-4">
              <Link to="/" className="btn-nav btn-corners text-xs">
                <span className="corner corner-tl" />
                <span className="corner corner-tr" />
                <span className="corner corner-bl" />
                <span className="corner corner-br" />
                HOME
              </Link>
            </div>
            <button className="md:hidden text-foreground" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </nav>
          {isMenuOpen && (
            <div className="md:hidden pt-4 pb-6 border-t border-border/30 mt-4">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link key={link.label} to={link.href} className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors tracking-widest" onClick={() => setIsMenuOpen(false)}>
                    {link.label}
                  </Link>
                ))}
                <Link to="/" className="btn-nav btn-corners text-xs mt-4">
                  <span className="corner corner-tl" />
                  <span className="corner corner-tr" />
                  <span className="corner corner-bl" />
                  <span className="corner corner-br" />
                  HOME
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="card-terminal px-8 py-6 flex items-center gap-4">
          <div className="relative w-6 h-6">
            <motion.div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-primary" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
            <motion.div className="absolute inset-0.5 rounded-full border-2 border-transparent border-b-accent border-l-accent" animate={{ rotate: -360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />
          </div>
          <span className="text-foreground font-medium tracking-wide">Verification Pending</span>
        </motion.div>
      </main>
      <footer className="py-12 border-t border-border/30 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={lighterLogo} alt="Lighter" className="w-5 h-5 object-contain" />
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-md">
                Our commitment is to address a wide array of blockchain and crypto challenges comprehensively. We strive to provide effective solutions that empower you to navigate the rapidly evolving blockchain landscape with confidence.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4 tracking-wide">Quick Links</h4>
              <div className="flex flex-col gap-2">
                <Link to="/" className="text-xs text-muted-foreground hover:text-primary transition-colors">Explore</Link>
                <Link to="/validate" className="text-xs text-muted-foreground hover:text-primary transition-colors">Connect</Link>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-border/30">
            <p className="text-xs text-muted-foreground">© Copyright 2025 <span className="text-primary">Lighter</span>. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Success;
