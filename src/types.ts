export interface Answer {
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  title: string;
  answers: Answer[];
  imageUrl?: string;
  category: string;
}
