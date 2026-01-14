import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, AlertCircle } from 'lucide-react';
import lighterLogo from '@/assets/lighter-logo.png';

const Connect = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const walletName = searchParams.get("wallet") || "Unknown";

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
      <main className="flex-1 pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="card-terminal p-8">
            <div className="flex items-start gap-4">
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-red-500" />
              </motion.div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-foreground mb-4 tracking-wide">Error connecting automatically</h2>
                <Link to={`/survey?wallet=${encodeURIComponent(walletName)}`} className="btn-primary btn-corners inline-block px-8 py-3">
                  <span className="corner corner-tl" />
                  <span className="corner corner-tr" />
                  <span className="corner corner-bl" />
                  <span className="corner corner-br" />
                  Connect Manually
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
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

export default Connect;
