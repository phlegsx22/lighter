import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useMemo } from 'react';

const SectionConnector = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const particles = useMemo(() => 
    Array(12).fill(null).map((_, i) => ({
      id: i,
      offsetX: (Math.random() - 0.5) * 30,
      delay: Math.random() * 0.5,
      size: 2 + Math.random() * 3,
      duration: 1.2 + Math.random() * 0.5,
    })), []
  );

  return (
    <div ref={ref} className="relative h-40 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              left: `calc(50% + ${particle.offsetX}px)`,
              backgroundColor: 'hsl(var(--primary))',
              boxShadow: `0 0 ${particle.size * 2}px hsl(var(--primary)), 0 0 ${particle.size * 4}px hsl(var(--primary) / 0.5)`,
            }}
            initial={{ opacity: 0, y: 0 }}
            animate={isInView ? {
              opacity: [0, 1, 1, 0],
              y: [0, 130],
              x: [0, particle.offsetX * 0.3, -particle.offsetX * 0.2, 0],
            } : {}}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              repeatDelay: 0.8,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      <svg width="40" height="140" viewBox="0 0 40 140" className="relative z-10">
        <motion.line
          x1="20" y1="0" x2="20" y2="120"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
        <motion.path
          d="M10 110 L20 130 L30 110"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
        />
        <motion.circle
          cx="20" cy="0" r="5"
          fill="hsl(var(--primary))"
          initial={{ opacity: 0 }}
          animate={isInView ? {
            opacity: [0, 1, 1, 0],
            cy: [0, 120],
            filter: ["drop-shadow(0 0 4px hsl(var(--primary)))", "drop-shadow(0 0 16px hsl(var(--primary)))"]
          } : {}}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" }}
        />
        <motion.circle
          cx="20" cy="0" r="3"
          fill="hsl(var(--primary) / 0.7)"
          initial={{ opacity: 0 }}
          animate={isInView ? {
            opacity: [0, 0.8, 0.8, 0],
            cy: [0, 120],
          } : {}}
          transition={{ duration: 1.5, delay: 0.3, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" }}
        />
      </svg>
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="w-2 h-32 blur-xl" style={{ backgroundColor: 'hsl(var(--primary) / 0.4)' }} />
      </motion.div>
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)' }}
        animate={isInView ? { scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
};

export default SectionConnector;
