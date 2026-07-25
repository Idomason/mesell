import { motion } from "motion/react";

type AnimatedButtonProp = {
  children: React.ReactNode;
  stiffness?: number;
  damping?: number;
};

export default function AnimatedButton({
  children,
  stiffness = 300,
  damping = 15,
}: AnimatedButtonProp) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: 2 }}
      whileTap={{ scale: 0.9, y: -2 }}
      transition={{ type: "spring", stiffness, damping }}
    >
      {children}
    </motion.button>
  );
}
