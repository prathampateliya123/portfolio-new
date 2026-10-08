"use client";
import { motion } from "framer-motion";

export default function DraggableItem({ children, style, className }) {
  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ ...style, cursor: "grab" }}
      className={className}
      whileDrag={{ scale: 1.02, cursor: "grabbing" }}
      whileTap={{ cursor: "grabbing" }}
    >
      {children}
    </motion.div>
  );
}
