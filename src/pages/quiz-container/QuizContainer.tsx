import { useDispatch, useSelector } from "react-redux";
import {
  handleSelectedOption,
  onNextQuestion,
  onPreviousQuestion,
  onResetQuestion,
} from "../../store/actions/quizActions";
import { questionBank } from "../../constants/questionBank";
import Button from "../../components/button/Button";
import Option from "./components/option/Option";
import QuestionStatus from "./components/question-status/QuestionStatus";
import ScoreBoard from "./components/score-box/ScoreBoard";
import styles from "./QuizContainer.module.css";
import type { RootState } from "../../store";

const QuizContainer = () => {
  const dispatch = useDispatch();
  const questionIndex = useSelector((state: RootState) => state.questionIndex);
  const questionList = useSelector((state: RootState) => state.questionList);
  const selectedOptionIndex = useSelector(
    (state: RootState) => state.selectedOptionIndex
  );
  const totalScore = useSelector((state: RootState) => state.totalScore);
  const isNextButtonDisable = useSelector(
    (state: RootState) => state.isNextButtonDisable
  );

  // Function to handle the option click
  const onOptionClick = (option: string, index: number, answer: string) => {
    if (selectedOptionIndex !== null) return;
    dispatch(handleSelectedOption(option, index, answer));
  };

  // Function to render the questions based on questionIndex
  const renderQuestionBank = () => {
    const tempQuestionList = [...questionList];
    return (
      <div className={styles.question_wrapper}>
        <h3>
          {questionIndex + 1}. {tempQuestionList[questionIndex]?.question}
        </h3>
        {tempQuestionList[questionIndex]?.options.map((option, index) => {
          return (
            <Option
              key={index}
              index={index}
              option={option}
              selectedOptionIndex={
                (tempQuestionList[questionIndex] as any).selectedOptionIndex ??
                selectedOptionIndex
              }
              correctAnswerIndex={
                (tempQuestionList[questionIndex] as any).correctAnswerIndex ??
                tempQuestionList[questionIndex]?.options.indexOf(
                  tempQuestionList[questionIndex].answer
                )
              }
              onOptionClick={() =>
                onOptionClick(
                  option,
                  index,
                  tempQuestionList[questionIndex].answer
                )
              }
            />
          );
        })}
      </div>
    );
  };

  // Function to move back to previous question
  const onPrevious = () => {
    dispatch(onPreviousQuestion());
  };

  // Function to move to the next question
  const onNext = () => {
    dispatch(onNextQuestion());
  };

  //Reset the quiz
  const handleReset = () => {
    dispatch(onResetQuestion());
  };

  return (
    <>
      {questionIndex <= 4 && (
        <div className={styles.quiz_container}>
          <h1>Quiz App</h1>

          {renderQuestionBank()}

          <div className={styles.action_buttons}>
            <Button
              label="Previous"
              onClick={() => onPrevious()}
              disabled={questionIndex === 0}
            />

            <Button
              label="Next"
              onClick={() => onNext()}
              disabled={isNextButtonDisable}
            />
          </div>

          {/* display count of question solved out of total questions */}
          <QuestionStatus
            questionIndex={questionIndex + 1}
            totalQuestions={questionBank.length}
          />
        </div>
      )}

      {/* Display total number of correct answers in score board */}
      <div>
        {questionIndex > 4 && (
          <ScoreBoard
            totalScore={totalScore}
            totalQuestion={questionBank.length}
            onReset={() => handleReset()}
          />
        )}
        ;
      </div>
    </>
  );
};

export default QuizContainer;
