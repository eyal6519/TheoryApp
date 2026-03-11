import React from 'react';

interface AnswerButtonProps {
  text: string;
  onClick: () => void;
  status?: 'correct' | 'incorrect' | 'default';
  disabled?: boolean;
}

const AnswerButton: React.FC<AnswerButtonProps> = ({ text, onClick, status = 'default', disabled = false }) => {
  return (
    <button
      className={`answer-button ${status}`}
      onClick={onClick}
      disabled={disabled}
      dir="rtl"
    >
      {text}
    </button>
  );
};

export default AnswerButton;
