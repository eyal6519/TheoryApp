import { motion, AnimatePresence } from 'framer-motion';

interface RemainingCountProps {
  count: number;
}

export function RemainingCount({ count }: RemainingCountProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={count}
          initial={{ scale: 0.8, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 1.2, opacity: 0, y: -10 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
            mass: 1
          }}
          className="text-4xl font-black text-slate-800 tracking-tight"
        >
          {count}
        </motion.div>
      </AnimatePresence>
      <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-1">נותרו</span>
    </div>
  );
}
