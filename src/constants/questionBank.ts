import type { QuestionBank } from "../interface/questionType";

export const questionBank: QuestionBank[] = [
  {
    questionId: 1,
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    answer: "Paris"
  },
  {
    questionId: 2,
    question: "Which planet is known as the 'Red Planet'?",
    options: ["Mars", "Venus", "Jupiter", "Saturn"],
    answer: "Mars"
  },
  {
    questionId: 3,
    question: "What is the chemical symbol for water?",
    options: ["O2", "CO2", "H2O", "Na"],
    answer: "H2O"
  },
  {
    questionId: 4,
    question: "Who wrote 'Hamlet'?",
    options: [
      "Charles Dickens",
      "Jane Austen",
      "William Shakespeare",
      "Mark Twain"
    ],
    answer: "William Shakespeare"
  },
  {
    questionId: 5,
    question: "In what year did World War II end?",
    options: ["1918", "1939", "1945", "1963"],
    answer: "1945"
  }
];
