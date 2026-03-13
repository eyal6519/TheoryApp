import React from 'react';
import { Flag } from 'lucide-react';

interface TestModeNavigationProps {
  totalQuestions: number;
  currentIndex: number;
  answeredIndices: number[];
  flaggedIndices: number[];
  onSelect: (index: number) => void;
}

export const TestModeNavigation: React.FC<TestModeNavigationProps> = ({
  totalQuestions,
  currentIndex,
  answeredIndices,
  flaggedIndices,
  onSelect,
}) => {
  return (
    <div className="p-4 bg-gray-50 border-b border-gray-100 overflow-x-auto whitespace-nowrap scrollbar-hide">
      <div className="flex gap-2 min-w-max pb-1">
        {Array.from({ length: totalQuestions }).map((_, i) => {
          const isCurrent = i === currentIndex;
          const isAnswered = answeredIndices.includes(i);
          const isFlagged = flaggedIndices.includes(i);

          return (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={`
                relative w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm transition-all
                ${isCurrent ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
                ${isAnswered 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'bg-white text-gray-400 border border-gray-200'
                }
                hover:scale-105 active:scale-95
              `}
            >
              {i + 1}
              {isFlagged && (
                <div 
                  data-testid={`flag-icon-${i}`}
                  className="absolute -top-1 -right-1 bg-red-500 text-white p-0.5 rounded-full shadow-xs"
                >
                  <Flag size={10} fill="currentColor" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
