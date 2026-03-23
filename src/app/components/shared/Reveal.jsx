'use client';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

export default function Reveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94], delay }}
    >
      {children}
    </motion.div>
  );
}

Reveal.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
};
