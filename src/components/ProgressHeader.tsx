import React from 'react';

interface ProgressHeaderProps {
  mastered: number;
  review: number;
  remaining: number;
}

const ProgressHeader: React.FC<ProgressHeaderProps> = ({ mastered, review, remaining }) => {
  return (
    <div className="progress-header" dir="rtl">
      <div className="progress-item mastered">
        <span className="label">ידוע:</span>
        <span className="count">{mastered}</span>
      </div>
      <div className="progress-item review">
        <span className="label">למراجعه:</span>
        <span className="count">{review}</span>
      </div>
      <div className="progress-item remaining">
        <span className="label">נותרו:</span>
        <span className="count">({remaining})</span>
      </div>
    </div>
  );
};

export default ProgressHeader;
