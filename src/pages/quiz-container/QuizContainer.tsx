import { useEffect, useState } from "react";
import { questionBank } from "../../constants/questionBank";
import type { QuestionBank } from "../../interface/questionType";
import Button from "../../components/button/Button";
import Option from "./components/option/Option";
import QuestionStatus from "./components/question-status/QuestionStatus";
import ScoreBoard from "./components/score-box/ScoreBoard";
import styles from "./QuizContainer.module.css";

const QuizContainer = () => {
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    null
  );
  const [totalScore, setTotalScore] = useState<number>(0);
  const [questionList, setQuestionList] = useState<QuestionBank[]>([
    ...questionBank
  ]);
  const [isNextButtonDisable, setIsNextButtonDisable] = useState<boolean>(true);

  // Function to handle the option click
  const handleOptionClick = (option: string, index: number, answer: string) => {
    if (selectedOptionIndex !== null) return;

    setIsNextButtonDisable(false);
    setSelectedOptionIndex(index);

    if (option === answer) {
      setTotalScore((prev) => prev + 1);
    }
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
              handleOptionClick={() =>
                handleOptionClick(
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
  const handlePreviousQuestion = () => {
    setQuestionIndex((prev) => prev - 1);

    setIsNextButtonDisable(false);
  };

  // Function to move to the next question
  const handleNextQuestion = () => {
    setQuestionIndex((prev) => prev + 1);

    const tempQuestionList = [...questionList];

    (tempQuestionList[questionIndex] as any)["selectedOptionIndex"] =
      selectedOptionIndex;
    (tempQuestionList[questionIndex] as any)["correctAnswerIndex"] =
      tempQuestionList[questionIndex]?.options.indexOf(
        tempQuestionList[questionIndex].answer
      );

    setQuestionList(tempQuestionList);
  };

  //Reset the quiz
  const handleReset = () => {
    setQuestionIndex(0);
  };

  // Resets every state when a new question is rendered
  useEffect(() => {
    setSelectedOptionIndex(null);
  }, [questionIndex]);

  return (
    <>
      {questionIndex <= 4 && (
        <div className={styles.quiz_container}>
          <h1>Quiz App</h1>

          {renderQuestionBank()}

          <div className={styles.action_buttons}>
            <Button
              label="Previous"
              onClick={() => handlePreviousQuestion()}
              disabled={questionIndex === 0}
            />

            <Button
              label="Next"
              onClick={() => handleNextQuestion()}
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
            handleReset={() => handleReset()}
          />
        )}
        ;
      </div>
    </>
  );
};

export default QuizContainer;
