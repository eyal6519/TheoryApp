import React from 'react';
import { CheckCircle2, XCircle, Home, ListRestart, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface TestModeResultProps {
  score: number;
  isPassed: boolean;
  timeTaken: number;
  onReview: () => void;
  onHome: () => void;
}

export const TestModeResult: React.FC<TestModeResultProps> = ({
  score,
  isPassed,
  timeTaken,
  onReview,
  onHome,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl shadow-xl p-8 max-w-sm w-full border border-gray-100"
      >
        <div className="mb-6 flex justify-center">
          {isPassed ? (
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle2 size={64} className="text-green-600" />
            </div>
          ) : (
            <div className="bg-red-100 p-4 rounded-full">
              <XCircle size={64} className="text-red-600" />
            </div>
          )}
        </div>

        <h2 className={`text-2xl font-black mb-2 ${isPassed ? 'text-green-700' : 'text-red-700'}`}>
          {isPassed ? 'עברת את המבחן!' : 'לא עברת את המבחן'}
        </h2>
        
        <p className="text-gray-500 mb-8 font-medium">
          {isPassed 
            ? 'כל הכבוד! אתה מוכן למבחן האמיתי.' 
            : 'אל תתייאש, המשך להתאמן ותצליח בפעם הבאה.'}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <div className="text-gray-400 text-xs font-bold uppercase mb-1">ציון</div>
            <div className={`text-2xl font-black ${isPassed ? 'text-green-600' : 'text-red-600'}`}>
              {score}/30
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <div className="text-gray-400 text-xs font-bold uppercase mb-1">זמן</div>
            <div className="text-2xl font-black text-gray-700 flex items-center justify-center gap-1">
              <Clock size={18} className="text-gray-400" />
              {formatTime(timeTaken)}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={onReview}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-colors"
          >
            <ListRestart size={20} />
            סקירת תשובות
          </button>
          
          <button
            onClick={onHome}
            className="w-full flex items-center justify-center gap-2 bg-white text-gray-600 font-bold py-4 rounded-2xl border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <Home size={20} />
            חזרה לדף הבית
          </button>
        </div>
      </motion.div>
    </div>
  );
};
