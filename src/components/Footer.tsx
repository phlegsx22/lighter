import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import lighterLogo from '@/assets/lighter-logo.png';

const footerLinks = [
  'DOCUMENTATION',
  'WHITEPAPER',
  'AUDITS',
  'FAQ',
  'STATUS',
  'TESTNET',
  'BRAND KIT',
  'TERMS OF SERVICE',
];

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  // Generate ASCII logo
  const asciiLogo = `
    ██╗     
    ██║     
    ██║     
    ██║     
    ███████╗
    ╚══════╝
  `;

  return (
    <footer ref={ref} className="py-16 border-t border-border/30">
      <div className="container mx-auto px-6">
        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-6 md:gap-12 mb-16"
        >
          {footerLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors tracking-widest"
            >
              {link}
            </a>
          ))}
        </motion.div>

        {/* ASCII Art Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-16"
        >
          <pre className="text-primary text-[6px] md:text-[8px] leading-none">
{`
    ██╗     ██╗ ██████╗ ██╗  ██╗████████╗███████╗██████╗ 
    ██║     ██║██╔════╝ ██║  ██║╚══██╔══╝██╔════╝██╔══██╗
    ██║     ██║██║  ███╗███████║   ██║   █████╗  ██████╔╝
    ██║     ██║██║   ██║██╔══██║   ██║   ██╔══╝  ██╔══██╗
    ███████╗██║╚██████╔╝██║  ██║   ██║   ███████╗██║  ██║
    ╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝
`}
          </pre>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-between items-center text-xs text-muted-foreground"
        >
          <a href="#" className="hover:text-foreground transition-colors tracking-widest">
            DISCORD
          </a>
          <a href="#" className="hover:text-foreground transition-colors tracking-widest">
            X
          </a>
          <a href="#" className="hover:text-foreground transition-colors tracking-widest">
            TELEGRAM
          </a>
        </motion.div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 flex justify-between items-center text-[10px] text-muted-foreground/50 tracking-widest"
        >
          <span>APP.LIGHTER.XYZ</span>
          <span>OFFICIAL APP LINKS</span>
          <span>LIGHTER.EXCHANGE</span>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
