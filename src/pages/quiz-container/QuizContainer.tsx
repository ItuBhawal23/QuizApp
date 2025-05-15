import { useEffect, useState } from "react";
import Button from "../../components/button/Button";
import { questionBank } from "../../constants/questionBank";
import Option from "./components/option/Option";
import QuestionStatus from "./components/question-status/QuestionStatus";
import styles from "./QuizContainer.module.css";
import ScoreBoard from "../../components/score-box/ScoreBoard";

const QuizContainer = () => {
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [isSelectedOptionCorrect, setIsSelectedOptionCorrect] = useState<
    boolean | null
  >(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    null
  );
  const [correctOptionIndex, setCorrectOptionIndex] = useState<number | null>(
    null
  );
  const [totalScore, setTotalScore] = useState<number>(0);

  const correctAnswerIndex = () => {
    const questionList = [...questionBank];

    return questionList[questionIndex].options.findIndex(
      (option) => option === questionList[questionIndex].answer
    );
  };

  const handleOptionClick = (option: string, index: number, answer: string) => {
    console.log("option", option, index, answer);

    if (selectedOptionIndex !== null) return;

    setSelectedOptionIndex(index);

    if (option === answer) {
      setCorrectOptionIndex(index);
      setTotalScore((prev) => prev + 1);
    }
  };

  useEffect(() => {
    setSelectedOptionIndex(null);
    setIsSelectedOptionCorrect(null);
    console.log("totalScore", totalScore);
  }, [questionIndex]);

  const renderQuestionBank = () => {
    const questionList = [...questionBank];
    return (
      <div className={styles.question_wrapper}>
        <h3>{questionList[questionIndex].question}</h3>
        {questionList[questionIndex].options.map((option, index) => {
          return (
            <Option
              key={index}
              index={index}
              option={option}
              selectedOptionIndex={selectedOptionIndex}
              isSelectedOptionCorrect={isSelectedOptionCorrect}
              correctAnswerIndex={correctAnswerIndex()}
              handleOptionClick={() =>
                handleOptionClick(
                  option,
                  index,
                  questionList[questionIndex].answer
                )
              }
            />
          );
        })}
      </div>
    );
  };

  const handlePreviousQuestion = () => {
    setQuestionIndex((prev) => prev - 1);

    if (questionIndex === 5) {
      <ScoreBoard totalScore={totalScore} />;
    }
  };

  const handleNextQuestion = () => {
    setQuestionIndex((prev) => prev + 1);
  };

  return (
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
          disabled={selectedOptionIndex === null}
        />
      </div>

      {/* display count of question solved  */}
      <QuestionStatus
        questionIndex={questionIndex + 1}
        totalQuestions={questionBank.length}
      />
    </div>
  );
};

export default QuizContainer;
