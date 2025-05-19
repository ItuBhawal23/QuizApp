import {
  OPTION_SELECTED,
  PREVIOUS_QUESTION,
  NEXT_QUESTION,
  RESET_QUESTION,
  RESET_OPTION_SELECTION
} from "../types/quizType";

// action creators -> function that returns action Object {type, payload}

export const handleSelectedOption = (
  option: string,
  index: number,
  answer: string
) => {
  return {
    type: OPTION_SELECTED,
    payload: {
      option: option,
      selectedIndex: index,
      answer: answer
    }
  };
};

export const onPreviousQuestion = () => {
  return {
    type: PREVIOUS_QUESTION
  };
};

export const onNextQuestion = () => {
  return {
    type: NEXT_QUESTION
  };
};

export const onResetQuestion = () => {
  return {
    type: RESET_QUESTION
  };
};

export const resetOptionSelection = () => {
  return {
    type: RESET_OPTION_SELECTION
  };
};
