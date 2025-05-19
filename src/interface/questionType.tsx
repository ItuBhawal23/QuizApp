export type QuestionBank = {
  questionId: number;
  question: string;
  options: Array<string>;
  answer: string;
  selectedOptionIndex?: number | null;
  correctAnswerIndex?: number | null;
};
