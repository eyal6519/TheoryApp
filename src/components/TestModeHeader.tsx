import React from 'react';
import { LogOut, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface TestModeHeaderProps {
  timeLeft: number;
  onQuit: () => void;
}

export const TestModeHeader: React.FC<TestModeHeaderProps> = ({ timeLeft, onQuit }) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-gray-100 px-4 py-3 shadow-sm">
      <div className="max-w-md mx-auto flex items-center justify-between">
        <button
          onClick={onQuit}
          className="flex items-center gap-1.5 px-3 py-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          aria-label="יציאה מהמבחן"
        >
          <LogOut size={18} />
          <span className="text-sm font-medium">יציאה</span>
        </button>

        <div className="flex items-center gap-2 bg-gray-50 px-4 py-1.5 rounded-full border border-gray-100">
          <Clock size={16} className={timeLeft < 300 ? 'text-red-500' : 'text-blue-500'} />
          <motion.span
            key={timeLeft}
            className={`font-mono text-lg font-bold ${timeLeft < 300 ? 'text-red-600' : 'text-gray-700'}`}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
          >
            {formatTime(timeLeft)}
          </motion.span>
        </div>

        <div className="flex items-center">
           <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">מבחן</span>
        </div>
      </div>
    </div>
  );
};
