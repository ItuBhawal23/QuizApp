import { useState } from "react";
import Button from "../../components/button/Button";
import { questionBank } from "../../constants/questionBank";
import Option from "./components/option/Option";
import QuestionStatus from "./components/question-status/QuestionStatus";
import styles from "./QuizContainer.module.css";

const QuizContainer = () => {
  const [questionIndex, setQuestionIndex] = useState<number>(0);

  const renderQuestionBank = () => {
    const questionList = [...questionBank];
    return (
      <div className={styles.question_wrapper}>
        <h3>{questionList[questionIndex].question}</h3>
        {questionList[questionIndex].options.map((option, index) => {
          return (
            <Option
              key={index}
              option={option}
              answer={questionList[questionIndex].answer}
              questionId={questionList[questionIndex].questionId}
            />
          );
        })}
      </div>
    );
  };

  const handlePreviousQuestion = () => {
    setQuestionIndex((prev) => prev - 1);

    // questionIndex === 5 -> redirect to score board
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
          label="NEXT"
          onClick={() => handleNextQuestion()}
          disabled={false}
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
