import { questionBank } from "../../constants/questionBank";
import type { QuestionBank } from "../../interface/questionType";
import {
  OPTION_SELECTED,
  PREVIOUS_QUESTION,
  NEXT_QUESTION,
  RESET_QUESTION
} from "../types/quizType";

type ActionType = {
  type: string;
  payload: any;
};

type stateType = {
  isNextButtonDisable: boolean;
  selectedOptionIndex: any;
  questionList: QuestionBank[];
  totalScore: number;
  questionIndex: number;
};

const initialState: stateType = {
  questionIndex: 0,
  questionList: [...questionBank],
  selectedOptionIndex: null,
  totalScore: 0,
  isNextButtonDisable: true
};

export const quizReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case OPTION_SELECTED: {
      const { option, selectedIndex, answer } = action.payload;

      const currentQuestionState = state.questionIndex;
      const updatedQuestionList = [...state.questionList];

      const currentQuestion = updatedQuestionList[currentQuestionState];

      updatedQuestionList[currentQuestionState] = {
        ...currentQuestion,
        selectedOptionIndex: selectedIndex,
        correctAnswerIndex: currentQuestion.options.indexOf(
          currentQuestion.answer
        )
      };

      return {
        ...state,
        isNextButtonDisable: false,
        selectedOptionIndex: selectedIndex,
        questionList: updatedQuestionList,
        totalScore: option === answer ? state.totalScore + 1 : state.totalScore
      };
    }

    case PREVIOUS_QUESTION:
      return {
        ...state,
        questionIndex: state.questionIndex - 1,
        isNextButtonDisable: false
      };

    case NEXT_QUESTION: {
      const updatedQuestionBank = [...state.questionList];
      const currentQuestion = updatedQuestionBank[state.questionIndex + 1];
      console.log("currentQuestion", currentQuestion);

      return {
        ...state,
        selectedOptionIndex: null,
        questionIndex: state.questionIndex + 1,
        isNextButtonDisable:
          currentQuestion.hasOwnProperty("selectedOptionIndex") &&
          currentQuestion.hasOwnProperty("correctAnswerIndex")
            ? false
            : true
      };
    }

    case RESET_QUESTION: {
      const updatedQuestionBank = [...state.questionList];

      updatedQuestionBank.forEach((question) => {
        if (
          question.hasOwnProperty("selectedOptionIndex") &&
          question.hasOwnProperty("correctAnswerIndex")
        ) {
          delete question.selectedOptionIndex;
          delete question.correctAnswerIndex;
        }
      });

      return {
        ...state,
        questionList: updatedQuestionBank,
        questionIndex: 0,
        selectedOptionIndex: null
      };
    }

    default:
      return state;
  }
};
