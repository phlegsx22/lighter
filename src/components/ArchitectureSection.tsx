import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const ArchitectureSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCell, setActiveCell] = useState<number>(0);
  const [riskLightIndex, setRiskLightIndex] = useState<number>(-1);

  // Cycle through cells for lighting effect
  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveCell(prev => (prev + 1) % 20);
    }, 150);
    return () => clearInterval(interval);
  }, [isInView]);

  // Risk engine sequential lighting effect
  useEffect(() => {
    if (!isInView) return;
    let lightingUp = true;
    let currentIndex = -1;
    
    const interval = setInterval(() => {
      if (lightingUp) {
        currentIndex++;
        if (currentIndex >= 6) {
          lightingUp = false;
          // Hold all lights on for 2 seconds before turning off
          setTimeout(() => {
            currentIndex = 6;
            lightingUp = false;
          }, 2000);
        }
      } else {
        currentIndex--;
        if (currentIndex < -1) {
          lightingUp = true;
          currentIndex = -1;
        }
      }
      setRiskLightIndex(currentIndex);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isInView]);

  // Generate animated ASCII pattern with glowing cells
  const generateGlowingPattern = (rows: number, cols: number, boxId: number) => {
    return Array(rows).fill(null).map((_, row) => (
      <div key={row} className="flex">
        {Array(cols).fill(null).map((_, col) => {
          const cellIndex = row * cols + col;
          const isGlowing = (cellIndex + boxId * 3) % 12 === activeCell % 12;
          const isPulse = (cellIndex + boxId * 5) % 8 === (activeCell + 2) % 8;
          
          return (
            <motion.span
              key={col}
              className="transition-all duration-300"
              animate={{
                opacity: isGlowing ? 1 : isPulse ? 0.6 : 0.2,
                textShadow: isGlowing 
                  ? '0 0 8px hsl(var(--primary)), 0 0 16px hsl(var(--primary))' 
                  : isPulse 
                    ? '0 0 4px hsl(var(--primary) / 0.5)' 
                    : 'none',
                color: isGlowing ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))'
              }}
              transition={{ duration: 0.3 }}
            >
              {['▪', '▫', '◦', '◈', '◇', '○', '●'][Math.floor(Math.random() * 7)]}
            </motion.span>
          );
        })}
      </div>
    ));
  };

  // Animated grid cells for modules
  const AnimatedGridCell = ({ index, boxId }: { index: number; boxId: number }) => {
    const isActive = (index + boxId * 2) % 6 === activeCell % 6;
    const isSecondary = (index + boxId * 3) % 4 === (activeCell + 1) % 4;
    
    return (
      <motion.div
        className="relative overflow-hidden"
        animate={{
          backgroundColor: isActive 
            ? 'hsl(var(--primary) / 0.3)' 
            : isSecondary 
              ? 'hsl(var(--primary) / 0.15)' 
              : 'hsl(var(--muted) / 0.2)',
          boxShadow: isActive 
            ? '0 0 20px hsl(var(--primary) / 0.4), inset 0 0 10px hsl(var(--primary) / 0.2)' 
            : 'none',
        }}
        transition={{ duration: 0.4 }}
        style={{ height: '100%' }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
          animate={{
            x: isActive ? ['-100%', '200%'] : '0%',
          }}
          transition={{
            duration: 1,
            ease: 'easeInOut',
            repeat: isActive ? Infinity : 0,
          }}
        />
      </motion.div>
    );
  };

  const modules = [
    { label: 'INCOMING_TX', size: 'large' },
    { label: 'MATCHING ENGINE', size: 'medium' },
    { label: 'RISK ENGINE', size: 'medium' },
    { label: 'TX_QUEUE', size: 'large' },
    { label: 'EXECUTOR', size: 'medium' },
    { label: 'ETHEREUM', size: 'large', special: true },
  ];

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Labels */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="flex justify-between items-center mb-8 text-xs text-muted-foreground/50 tracking-widest"
        >
          <span>LIGHTER CUSTOM ZK CIRCUIT</span>
          <span>LIGHTER CUSTOM ZK CIRCUIT</span>
        </motion.div>

        {/* Architecture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Incoming TX - 4 Quadrant Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="card-terminal p-4 lg:row-span-2 relative overflow-hidden group"
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <span className="text-[10px] text-primary/70 tracking-widest relative z-10">INCOMING_TX</span>
            {/* 4 Quadrant Grid */}
            <div className="mt-4 grid grid-cols-2 gap-1 h-[calc(100%-2rem)] relative z-10">
              {Array(4).fill(null).map((_, quadrantIndex) => (
                <div key={quadrantIndex} className="border border-primary/20 p-2 overflow-hidden">
                  <div className="font-mono text-[8px] leading-relaxed">
                    {generateGlowingPattern(4, 8, quadrantIndex)}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Matching Engine */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card-terminal p-4 relative overflow-hidden"
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-[10px] text-primary/70 tracking-widest relative z-10">MATCHING ENGINE</span>
            <div className="mt-4 flex gap-2 relative z-10">
              <AnimatedGridCell index={0} boxId={1} />
              <AnimatedGridCell index={1} boxId={1} />
            </div>
            <div className="mt-4 flex gap-2 h-8 relative z-10">
              {Array(2).fill(null).map((_, i) => (
                <div key={i} className="flex-1 h-8">
                  <AnimatedGridCell index={i + 2} boxId={1} />
                </div>
              ))}
            </div>
            <div className="mt-2 font-mono text-[8px] leading-relaxed relative z-10">
              {generateGlowingPattern(2, 20, 1)}
            </div>
          </motion.div>

          {/* Risk Engine - Sequential Light Bars */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="card-terminal p-4 relative overflow-hidden lg:row-span-2"
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-bl from-primary/5 to-transparent"
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <span className="text-[10px] text-primary/70 tracking-widest relative z-10">RISK ENGINE</span>
            <div className="mt-4 flex flex-col gap-2 relative z-10">
              {Array(6).fill(null).map((_, i) => {
                const isLit = i <= riskLightIndex;
                return (
                  <motion.div 
                    key={i}
                    className="h-8 rounded-sm border border-primary/20 relative overflow-hidden"
                    animate={{
                      backgroundColor: isLit ? 'hsl(var(--primary) / 0.3)' : 'hsl(var(--muted) / 0.1)',
                      borderColor: isLit ? 'hsl(var(--primary) / 0.6)' : 'hsl(var(--primary) / 0.2)',
                      boxShadow: isLit 
                        ? '0 0 15px hsl(var(--primary) / 0.5), inset 0 0 10px hsl(var(--primary) / 0.3)' 
                        : 'none',
                    }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  >
                    {/* Light beam sweep effect */}
                    {isLit && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/40 to-transparent"
                        initial={{ x: '-100%' }}
                        animate={{ x: '200%' }}
                        transition={{
                          duration: 0.8,
                          ease: 'easeOut',
                        }}
                      />
                    )}
                    {/* Inner glow */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{
                        opacity: isLit ? 1 : 0.3,
                      }}
                    >
                      <div className="w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" 
                        style={{ opacity: isLit ? 1 : 0.2 }}
                      />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Ethereum */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card-terminal p-4 lg:row-span-2 flex flex-col relative overflow-hidden"
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-primary/5"
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <span className="text-[10px] text-primary/70 tracking-widest relative z-10">ETHEREUM</span>
            <div className="flex-1 flex items-center justify-center mt-4 relative z-10">
              <motion.div 
                className="relative"
                animate={{ 
                  rotateY: [0, 360],
                  filter: ['drop-shadow(0 0 10px hsl(var(--primary) / 0.3))', 'drop-shadow(0 0 25px hsl(var(--primary) / 0.8))', 'drop-shadow(0 0 10px hsl(var(--primary) / 0.3))']
                }}
                transition={{ 
                  rotateY: { duration: 8, repeat: Infinity, ease: 'linear' },
                  filter: { duration: 2, repeat: Infinity }
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Ethereum Diamond SVG */}
                <motion.svg 
                  width="80" 
                  height="120" 
                  viewBox="0 0 256 417" 
                  className="text-primary"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <motion.path 
                    fill="currentColor" 
                    fillOpacity="0.6"
                    d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z"
                    animate={{ fillOpacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.path 
                    fill="currentColor" 
                    fillOpacity="0.8"
                    d="M127.962 0L0 212.32l127.962 75.639V154.158z"
                    animate={{ fillOpacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  />
                  <motion.path 
                    fill="currentColor" 
                    fillOpacity="0.6"
                    d="M127.961 312.187l-1.575 1.92v98.199l1.575 4.6L256 236.587z"
                    animate={{ fillOpacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                  />
                  <motion.path 
                    fill="currentColor" 
                    fillOpacity="0.8"
                    d="M127.962 416.905v-104.72L0 236.585z"
                    animate={{ fillOpacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}
                  />
                  <motion.path 
                    fill="currentColor" 
                    fillOpacity="0.3"
                    d="M127.961 287.958l127.96-75.637-127.96-58.162z"
                    animate={{ fillOpacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                  />
                  <motion.path 
                    fill="currentColor" 
                    fillOpacity="0.5"
                    d="M0 212.32l127.96 75.638v-133.8z"
                    animate={{ fillOpacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
                  />
                </motion.svg>
              </motion.div>
            </div>
          </motion.div>

          {/* TX Queue */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="card-terminal p-4 relative overflow-hidden"
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
            <span className="text-[10px] text-primary/70 tracking-widest relative z-10">TX_QUEUE</span>
            <div className="mt-4 grid grid-cols-4 gap-1 relative z-10">
              {Array(8).fill(null).map((_, i) => (
                <div key={i} className="h-12">
                  <AnimatedGridCell index={i} boxId={4} />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Executor - 6 Sub-cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="card-terminal p-4 md:col-span-2 lg:col-span-2 lg:row-span-2 relative overflow-hidden"
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <span className="text-[10px] text-primary/70 tracking-widest relative z-10">EXECUTOR</span>
            
            {/* 6 Sub-cards Layout: 4 on left (2x2), 2 on right (column) */}
            <div className="mt-4 flex gap-2 h-[calc(100%-2rem)] relative z-10">
              {/* Left side: 4 cards in 2x2 grid */}
              <div className="flex-1 grid grid-cols-2 gap-2">
                {/* Card 1: Particle animation like INCOMING_TX */}
                <div className="border border-primary/20 p-2 overflow-hidden relative">
                  <div className="font-mono text-[6px] leading-tight">
                    {generateGlowingPattern(3, 6, 10)}
                  </div>
                </div>
                
                {/* Card 2: Matching Engine style animation */}
                <div className="border border-primary/20 p-1 overflow-hidden relative">
                  <div className="grid grid-cols-2 gap-1 h-full">
                    {Array(4).fill(null).map((_, i) => (
                      <div key={i} className="h-full">
                        <AnimatedGridCell index={i} boxId={11} />
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Card 3: Risk Engine glow/light up animation */}
                <div className="border border-primary/20 p-1 overflow-hidden relative">
                  <div className="flex flex-col gap-1 h-full">
                    {Array(3).fill(null).map((_, i) => {
                      const isLit = i <= (riskLightIndex % 3);
                      return (
                        <motion.div 
                          key={i}
                          className="flex-1 rounded-sm relative overflow-hidden"
                          animate={{
                            backgroundColor: isLit ? 'hsl(var(--primary) / 0.3)' : 'hsl(var(--muted) / 0.1)',
                            boxShadow: isLit ? '0 0 10px hsl(var(--primary) / 0.5)' : 'none',
                          }}
                          transition={{ duration: 0.4 }}
                        >
                          {isLit && (
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/40 to-transparent"
                              animate={{ x: ['-100%', '200%'] }}
                              transition={{ duration: 0.6, ease: 'easeOut' }}
                            />
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Card 4: Particle animation with feint red color */}
                <div className="border border-primary/20 p-2 overflow-hidden relative">
                  <div className="font-mono text-[6px] leading-tight">
                    {Array(3).fill(null).map((_, row) => (
                      <div key={row} className="flex">
                        {Array(6).fill(null).map((_, col) => {
                          const cellIndex = row * 6 + col;
                          const isGlowing = (cellIndex + 12) % 10 === activeCell % 10;
                          const isPulse = (cellIndex + 15) % 6 === (activeCell + 2) % 6;
                          
                          return (
                            <motion.span
                              key={col}
                              className="transition-all duration-300"
                              animate={{
                                opacity: isGlowing ? 1 : isPulse ? 0.6 : 0.2,
                                textShadow: isGlowing 
                                  ? '0 0 8px hsl(0 70% 50%), 0 0 16px hsl(0 70% 50%)' 
                                  : isPulse 
                                    ? '0 0 4px hsl(0 70% 50% / 0.5)' 
                                    : 'none',
                                color: isGlowing ? 'hsl(0 70% 60%)' : isPulse ? 'hsl(0 50% 40%)' : 'hsl(var(--muted-foreground))'
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              {['▪', '▫', '◦', '◈', '◇'][Math.floor(Math.random() * 5)]}
                            </motion.span>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Right side: 2 cards in column */}
              <div className="w-24 flex flex-col gap-2">
                {/* Card 5: Circular data flow animation */}
                <div className="flex-1 border border-primary/20 p-2 overflow-hidden relative flex items-center justify-center">
                  <svg width="60" height="60" viewBox="0 0 60 60" className="relative">
                    {/* Outer circle path */}
                    <motion.circle
                      cx="30"
                      cy="30"
                      r="22"
                      fill="none"
                      stroke="hsl(var(--primary) / 0.3)"
                      strokeWidth="2"
                    />
                    {/* Rotating data dot 1 */}
                    <motion.circle
                      cx="30"
                      cy="8"
                      r="3"
                      fill="hsl(var(--primary))"
                      style={{ filter: 'drop-shadow(0 0 4px hsl(var(--primary)))' }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      transformOrigin="30px 30px"
                    />
                    {/* Rotating data dot 2 */}
                    <motion.circle
                      cx="30"
                      cy="8"
                      r="2"
                      fill="hsl(var(--primary) / 0.7)"
                      style={{ filter: 'drop-shadow(0 0 3px hsl(var(--primary)))' }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, delay: 0.5, repeat: Infinity, ease: 'linear' }}
                      transformOrigin="30px 30px"
                    />
                    {/* Rotating data dot 3 */}
                    <motion.circle
                      cx="30"
                      cy="8"
                      r="2"
                      fill="hsl(var(--primary) / 0.5)"
                      style={{ filter: 'drop-shadow(0 0 2px hsl(var(--primary)))' }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, delay: 1, repeat: Infinity, ease: 'linear' }}
                      transformOrigin="30px 30px"
                    />
                    {/* Center glow */}
                    <motion.circle
                      cx="30"
                      cy="30"
                      r="6"
                      fill="hsl(var(--primary) / 0.2)"
                      animate={{ 
                        r: [5, 8, 5],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </svg>
                </div>
                
                {/* Card 6: Data in-flow to center point animation */}
                <div className="flex-1 border border-primary/20 p-2 overflow-hidden relative flex items-center justify-center">
                  <svg width="60" height="60" viewBox="0 0 60 60" className="relative">
                    {/* Center point */}
                    <motion.circle
                      cx="30"
                      cy="30"
                      r="4"
                      fill="hsl(var(--primary))"
                      style={{ filter: 'drop-shadow(0 0 8px hsl(var(--primary)))' }}
                      animate={{ 
                        r: [3, 5, 3],
                        opacity: [0.8, 1, 0.8],
                      }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    {/* Inflow particles from different directions */}
                    {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                      <motion.circle
                        key={i}
                        r="2"
                        fill="hsl(var(--primary))"
                        style={{ filter: 'drop-shadow(0 0 3px hsl(var(--primary)))' }}
                        initial={{ 
                          cx: 30 + Math.cos(angle * Math.PI / 180) * 28,
                          cy: 30 + Math.sin(angle * Math.PI / 180) * 28,
                          opacity: 0,
                        }}
                        animate={{ 
                          cx: [
                            30 + Math.cos(angle * Math.PI / 180) * 28,
                            30
                          ],
                          cy: [
                            30 + Math.sin(angle * Math.PI / 180) * 28,
                            30
                          ],
                          opacity: [0, 1, 1, 0],
                        }}
                        transition={{ 
                          duration: 1.5,
                          delay: i * 0.2,
                          repeat: Infinity,
                          repeatDelay: 0.5,
                          ease: 'easeIn',
                        }}
                      />
                    ))}
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-8 text-center text-xs text-muted-foreground/50 tracking-widest"
        >
          BATCH PROVER
        </motion.div>
      </div>
    </section>
  );
};

export default ArchitectureSection;
