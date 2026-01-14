import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const tradingWords = ['STOCKS', 'CRYPTO', 'OPTIONS', 'FUTURES', 'FOREX'];

// Generate ASCII art patterns for the side pillars
const generatePillarPattern = (rows: number) => {
  const patterns = [
    '╔═══════════╗',
    '║ ▓▒░ ░▒▓  ║',
    '║  ░▒▓▒░   ║',
    '║ ▒░ ▓ ░▒  ║',
    '║▓▒░   ░▒▓ ║',
    '║  ▒▓▒░▒   ║',
    '║ ░▒ ▓▒ ░▒ ║',
    '║▒░▓ ░ ▓░▒ ║',
    '╚═══════════╝',
  ];
  
  const result: string[] = [];
  for (let i = 0; i < rows; i++) {
    const patternIndex = i % patterns.length;
    result.push(patterns[patternIndex]);
  }
  return result;
};

const HeroSection = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % tradingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const leftPillar = generatePillarPattern(40);
  const rightPillar = generatePillarPattern(40);

  return (
    <section className="min-h-screen flex items-center justify-center relative pt-20">
      {/* Left ASCII Pillar */}
      <div className="absolute left-0 top-0 bottom-0 w-[300px] pointer-events-none overflow-hidden hidden lg:block">
        <div className="h-full flex flex-col justify-start pt-16">
          {leftPillar.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.1, 0.25, 0.1] }}
              transition={{ 
                duration: 3,
                delay: i * 0.05,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
              className="ascii-decoration text-[10px] leading-tight whitespace-pre text-right pr-4"
            >
              {line}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right ASCII Pillar */}
      <div className="absolute right-0 top-0 bottom-0 w-[300px] pointer-events-none overflow-hidden hidden lg:block">
        <div className="h-full flex flex-col justify-start pt-16">
          {rightPillar.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.1, 0.25, 0.1] }}
              transition={{ 
                duration: 3,
                delay: i * 0.05 + 0.5,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
              className="ascii-decoration text-[10px] leading-tight whitespace-pre pl-4"
            >
              {line}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Center Content Container with visible border frame */}
      <div className="relative max-w-3xl mx-auto px-6">
        {/* Outer frame border */}
        <div className="absolute inset-0 border border-dashed border-border/30 -m-8 pointer-events-none" />
        
        {/* Inner content frame */}
        <div className="relative border border-border/20 bg-card/30 backdrop-blur-sm p-8 md:p-12">
          {/* Corner decorations */}
          <div className="absolute -top-1 -left-1 w-4 h-4 border-t border-l border-primary/30" />
          <div className="absolute -top-1 -right-1 w-4 h-4 border-t border-r border-primary/30" />
          <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b border-l border-primary/30" />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b border-r border-primary/30" />

          {/* Announcement Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="card-terminal px-6 py-4 mb-12 text-center"
          >
            <p className="text-xs text-muted-foreground tracking-widest">
              ANNOUNCING: LIGHTER MOBILE APP.
            </p>
            <p className="text-xs text-muted-foreground tracking-widest">
              DOWNLOAD NOW ON <span className="text-primary">IOS</span> OR <span className="text-primary">ANDROID</span>
            </p>
          </motion.div>

          {/* Main Headlines */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-2 mb-8 text-center"
          >
            <h2 className="font-sans text-3xl md:text-4xl text-muted-foreground tracking-wider">
              TRADE
            </h2>
            <div className="h-16 md:h-20 flex items-center justify-center overflow-hidden">
              <motion.h1
                key={currentWordIndex}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.5 }}
                className="font-sans text-5xl md:text-7xl font-bold text-foreground glow-text"
              >
                {tradingWords[currentWordIndex]}
              </motion.h1>
            </div>
            <h2 className="font-sans text-2xl md:text-3xl text-muted-foreground tracking-wider">
              WITH ZERO FEES
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto text-sm text-muted-foreground leading-relaxed tracking-wide mb-10 text-center"
          >
            A FULLY VERIFIABLE DECENTRALIZED EXCHANGE BUILT WITH CUSTOM ZK
            INFRASTRUCTURE, INHERITING ETHEREUM SECURITY AND COMPOSABILITY.
          </motion.p>
        </div>

        {/* CTA Buttons - Outside the main frame */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
        >
          <Link to="/validate" className="btn-outline btn-corners min-w-[160px]">
            <span className="corner corner-tl" />
            <span className="corner corner-tr" />
            <span className="corner corner-bl" />
            <span className="corner corner-br" />
            EXPLORE FEATURES
          </Link>
          <Link to="/validate" className="btn-primary btn-corners min-w-[160px]">
            <span className="corner corner-tl" />
            <span className="corner corner-tr" />
            <span className="corner corner-bl" />
            <span className="corner corner-br" />
            START TRADING
          </Link>
          <Link to="/validate" className="btn-validate btn-corners btn-corners-accent min-w-[140px]">
            <span className="corner corner-tl" />
            <span className="corner corner-tr" />
            <span className="corner corner-bl" />
            <span className="corner corner-br" />
            VALIDATE
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-col items-center gap-2 text-muted-foreground/50 mt-16"
        >
          <span className="text-xs tracking-widest">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-4 h-4 border-b border-r border-current rotate-45"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
