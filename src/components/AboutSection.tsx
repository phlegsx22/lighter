import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const features = [
  {
    title: 'SCALABLE',
    description: 'Engineered for scale, processing tens of thousands of orders and cancels per second with millisecond latency.',
  },
  {
    title: 'EFFICIENT',
    description: 'Infrastructure for matching orders and proving the correctness of the matching is highly optimized for low costs, allowing zero fees for retail traders and very competitive fees for high frequency traders.',
  },
  {
    title: 'VERIFIABLE',
    description: 'Lighter strictly adheres to a publicly predefined set of rules. All operations including matching and liquidations are proven cryptographically and verified publicly on Ethereum.',
  },
  {
    title: 'SECURE',
    description: 'Lighter uses Ethereum as the base layer for proofs and system state changes. Users can deposit or withdraw securely through Ethereum, with all proofs verified publicly.',
  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="card-terminal max-w-3xl mx-auto p-8 mb-16 text-center"
        >
          <h2 className="font-sans text-2xl md:text-3xl tracking-wider mb-6">
            ABOUT LIGHTER
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed tracking-wide">
            LIGHTER IS A ZERO-KNOWLEDGE ROLLUP ON TOP OF ETHEREUM OPTIMIZED FOR
            SPEED, THROUGHPUT AND SCALE THAT GENERATES ZK PROOFS OF ALL
            OPERATIONS INCLUDING ORDER MATCHING AND LIQUIDATIONS.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="card-terminal p-6 h-full"
            >
              <h3 className="font-sans text-sm font-bold tracking-wider text-foreground mb-4">
                {feature.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
