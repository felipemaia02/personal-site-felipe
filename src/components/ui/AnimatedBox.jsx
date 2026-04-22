import { motion } from 'framer-motion';

const variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Wrapper que aplica fade-up ao entrar na viewport.
 * Aceita todas as props do motion.div.
 * @param {number} delay - Atraso em segundos
 * @param {{ once?: boolean, margin?: string }} viewport
 */
export default function AnimatedBox({ children, delay = 0, viewport, style, ...rest }) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px', ...viewport }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      style={style}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
