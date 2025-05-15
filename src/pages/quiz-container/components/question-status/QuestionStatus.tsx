import styles from "./QuestionStatus.module.css";

type QuestionStatusProps = {
  questionIndex: number;
  totalQuestions: number;
};

const QuestionStatus = ({
  questionIndex,
  totalQuestions,
}: QuestionStatusProps) => {
  return (
    <div className={styles.question_status}>
      <p>{`${questionIndex} of ${totalQuestions} questions`}</p>
    </div>
  );
};

export default QuestionStatus;
