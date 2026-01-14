import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import appStoreBadge from '@/assets/app-store-badge.png';
import googlePlayBadge from '@/assets/google-play-badge.png';

const MobileAppSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="card-terminal max-w-5xl mx-auto p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Phone Mockups */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="flex justify-center items-end gap-4">
                {/* Phone 1 */}
                <div className="w-40 md:w-48 h-80 md:h-96 bg-gradient-to-b from-muted/40 to-muted/20 rounded-3xl border border-border/50 p-2 transform -rotate-6">
                  <div className="w-full h-full bg-background rounded-2xl overflow-hidden">
                    <div className="p-3">
                      <div className="text-[8px] text-primary font-bold">ETH ↗</div>
                      <div className="text-sm font-bold text-foreground">3,189.50</div>
                      <div className="text-[8px] text-green-500">+2.98%</div>
                    </div>
                    {/* Chart placeholder */}
                    <div className="px-3 mt-2">
                      <svg className="w-full h-24" viewBox="0 0 100 50">
                        <path
                          d="M0,40 L10,35 L20,38 L30,25 L40,30 L50,20 L60,22 L70,15 L80,18 L90,10 L100,12"
                          fill="none"
                          stroke="hsl(var(--primary))"
                          strokeWidth="1"
                        />
                        <path
                          d="M0,40 L10,35 L20,38 L30,25 L40,30 L50,20 L60,22 L70,15 L80,18 L90,10 L100,12 L100,50 L0,50 Z"
                          fill="url(#gradient)"
                          opacity="0.2"
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="hsl(var(--primary))" />
                            <stop offset="100%" stopColor="transparent" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    {/* Order book placeholder */}
                    <div className="px-3 mt-4 space-y-1">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex justify-between text-[6px]">
                          <span className="text-red-500">{(3189.5 + i * 0.1).toFixed(2)}</span>
                          <span className="text-muted-foreground">{(1.2 + i * 0.3).toFixed(3)}</span>
                        </div>
                      ))}
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex justify-between text-[6px]">
                          <span className="text-green-500">{(3189.1 - i * 0.1).toFixed(2)}</span>
                          <span className="text-muted-foreground">{(0.8 + i * 0.2).toFixed(3)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Phone 2 */}
                <div className="w-40 md:w-48 h-80 md:h-96 bg-gradient-to-b from-muted/40 to-muted/20 rounded-3xl border border-border/50 p-2 transform rotate-6 -translate-y-8">
                  <div className="w-full h-full bg-background rounded-2xl overflow-hidden">
                    <div className="p-3">
                      <div className="text-[8px] text-muted-foreground">PORTFOLIO</div>
                      <div className="text-sm font-bold text-foreground">$12,458.32</div>
                      <div className="text-[8px] text-green-500">+$234.56 today</div>
                    </div>
                    {/* Holdings */}
                    <div className="px-3 mt-4 space-y-3">
                      {[
                        { symbol: 'ETH', amount: '2.45', value: '$7,814' },
                        { symbol: 'BTC', amount: '0.12', value: '$4,234' },
                        { symbol: 'SOL', amount: '15.2', value: '$410' },
                      ].map((holding) => (
                        <div key={holding.symbol} className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-muted/50 flex items-center justify-center text-[8px]">
                              {holding.symbol[0]}
                            </div>
                            <div>
                              <div className="text-[8px] font-bold">{holding.symbol}</div>
                              <div className="text-[6px] text-muted-foreground">{holding.amount}</div>
                            </div>
                          </div>
                          <span className="text-[8px] text-foreground">{holding.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* App Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center lg:text-left"
            >
              <h3 className="text-sm tracking-widest text-muted-foreground mb-2">
                ANNOUNCING: LIGHTER MOBILE APP.
              </h3>
              <p className="text-xs text-muted-foreground tracking-widest mb-8">
                DOWNLOAD NOW ON <span className="text-primary">IOS</span> OR <span className="text-primary">ANDROID</span>
              </p>

              {/* QR Codes */}
              <div className="flex justify-center lg:justify-start gap-6">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-24 h-24 bg-foreground p-2 rounded">
                    <div className="w-full h-full bg-background grid grid-cols-5 gap-px">
                      {Array(25).fill(null).map((_, i) => (
                        <div
                          key={i}
                          className={`${Math.random() > 0.5 ? 'bg-foreground' : 'bg-background'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <img 
                    src={appStoreBadge} 
                    alt="Download on the App Store" 
                    className="h-10 w-auto"
                  />
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="w-24 h-24 bg-foreground p-2 rounded">
                    <div className="w-full h-full bg-background grid grid-cols-5 gap-px">
                      {Array(25).fill(null).map((_, i) => (
                        <div
                          key={i}
                          className={`${Math.random() > 0.5 ? 'bg-foreground' : 'bg-background'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <img 
                    src={googlePlayBadge} 
                    alt="Get it on Google Play" 
                    className="h-10 w-auto"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MobileAppSection;
