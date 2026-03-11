import React from 'react';

interface QuestionCardProps {
  title: string;
  imageUrl?: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ title, imageUrl }) => {
  return (
    <div className="question-card" dir="rtl">
      <h2 className="question-title">{title}</h2>
      {imageUrl && (
        <div className="question-image-container">
          <img src={imageUrl} alt="Question visual" className="question-image" />
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
