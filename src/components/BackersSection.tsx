import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

import foundersLogo from '@/assets/founders.png';
import ribbitLogo from '@/assets/ribbit.png';
import haunLogo from '@/assets/haun.png';
import robinhoodLogo from '@/assets/robinhood.png';
import coinbaseLogo from '@/assets/coinbase.png';
import polychainLogo from '@/assets/polychain.png';
import a16zLogo from '@/assets/ai16z.png';
import coatueLogo from '@/assets/coatue.png';
import crvLogo from '@/assets/crv.png';
import lightspeedLogo from '@/assets/lightspeed.png';

const mainBackers = [
  { name: 'FOUNDERS FUND', logo: foundersLogo },
  { name: 'RIBBIT', logo: ribbitLogo },
  { name: 'HAUN VENTURES', logo: haunLogo },
  { name: 'ROBINHOOD', logo: robinhoodLogo },
  { name: 'COINBASE', logo: coinbaseLogo },
];

const additionalBackers = [
  { name: 'A16Z', logo: a16zLogo },
  { name: 'POLYCHAIN', logo: polychainLogo },
  { name: 'COATUE', logo: coatueLogo },
  { name: 'LIGHTSPEED', logo: lightspeedLogo },
  { name: 'CRV', logo: crvLogo },
  { name: 'SVA', logo: null },
  { name: '8VC', logo: null },
  { name: 'ABSTRACT', logo: null },
];

const BackersSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="card-terminal max-w-4xl mx-auto p-8"
        >
          {/* Header */}
          <h2 className="text-center text-sm tracking-widest text-muted-foreground mb-8">
            BACKED BY THE BEST
          </h2>

          {/* Card 1: Main Backers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border border-dashed border-border/50 bg-card/30 p-6 mb-6"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {mainBackers.map((backer, index) => (
                <motion.div
                  key={backer.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="group flex flex-col items-center gap-3 p-4 rounded-sm transition-all duration-300 hover:bg-[#121218]/80 cursor-pointer"
                >
                  <div className="h-12 flex items-center justify-center">
                    <img 
                      src={backer.logo} 
                      alt={backer.name} 
                      className="max-h-10 max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground tracking-widest text-center group-hover:text-foreground transition-colors">
                    {backer.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Divider */}
          <div className="text-center text-xs text-muted-foreground/50 tracking-widest mb-6">
            AND OTHER TOP TIER VCS AND ANGEL INVESTORS
          </div>

          {/* Card 2: Additional Backers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="border border-dashed border-border/50 bg-card/30 p-6"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {additionalBackers.map((backer, index) => (
                <motion.div
                  key={backer.name}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                  className="group flex flex-col items-center gap-2 p-3 rounded-sm transition-all duration-300 hover:bg-[#121218]/80 cursor-pointer"
                >
                  {backer.logo ? (
                    <div className="h-8 flex items-center justify-center">
                      <img 
                        src={backer.logo} 
                        alt={backer.name} 
                        className="max-h-6 max-w-[80px] object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                  ) : (
                    <div className="h-8 flex items-center justify-center">
                      <span className="text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                        {backer.name}
                      </span>
                    </div>
                  )}
                  {backer.logo && (
                    <span className="text-[9px] text-muted-foreground/70 tracking-widest group-hover:text-muted-foreground transition-colors">
                      {backer.name}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BackersSection;
