import styles from "./Option.module.css";

type OptionProps = {
  index: number;
  option: string;
  selectedOptionIndex: number | null;
  handleOptionClick: any;
  correctAnswerIndex: number;
};

const Option = ({
  option,
  handleOptionClick,
  selectedOptionIndex,
  index,
  correctAnswerIndex
}: OptionProps) => {
  const isSelected = index === selectedOptionIndex;
  const correctIndex = index === correctAnswerIndex;

  const getOptionClass = () => {
    if (selectedOptionIndex === null) return styles.option_wrapper;

    // Highlight correct option always
    if (correctIndex) {
      return `${styles.option_wrapper} ${styles.correct_option}`;
    }

    // If the option is the selected one and it's wrong
    if (isSelected && !correctIndex) {
      return `${styles.option_wrapper} ${styles.incorrect_option}`;
    }

    return styles.option_wrapper;
  };

  return (
    <div className={getOptionClass()} onClick={() => handleOptionClick()}>
      <p>{option}</p>
    </div>
  );
};

export default Option;
