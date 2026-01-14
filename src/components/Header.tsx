import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import lighterLogo from '@/assets/lighter-logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: 'RESOURCES', href: '#resources' },
    { label: 'FAQ', href: '#faq' },
    { label: 'COMMUNITY', href: '#community' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/30">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <img src={lighterLogo} alt="Lighter" className="w-6 h-6 object-contain" />
            <span className="font-sans font-bold text-lg tracking-wider">LIGHTER</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors tracking-widest"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/validate" className="btn-nav btn-corners text-xs">
              <span className="corner corner-tl" />
              <span className="corner corner-tr" />
              <span className="corner corner-bl" />
              <span className="corner corner-br" />
              START TRADING
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-6 border-t border-border/30 mt-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors tracking-widest"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
                <Link to="/validate" className="btn-nav btn-corners text-xs mt-4">
                  <span className="corner corner-tl" />
                  <span className="corner corner-tr" />
                  <span className="corner corner-bl" />
                  <span className="corner corner-br" />
                  START TRADING
                </Link>
              </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
