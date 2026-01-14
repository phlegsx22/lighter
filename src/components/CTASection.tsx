import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="card-terminal max-w-3xl mx-auto p-8 text-center"
        >
          <p className="text-sm text-muted-foreground leading-relaxed tracking-wide mb-8">
            EXPERIENCE VERIFIABLE, ONCHAIN TRADING LIKE NEVER BEFORE, WITH
            COSTS AND LATENCY AT THE PERFORMANCE GRADE OF HIGH FREQUENCY
            FINANCE.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link to="/validate" className="w-full max-w-md btn-primary btn-corners py-4 inline-block">
              <span className="corner corner-tl" />
              <span className="corner corner-tr" />
              <span className="corner corner-bl" />
              <span className="corner corner-br" />
              START TRADING
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
