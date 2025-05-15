import { useEffect, useState, useRef } from "react";
import styles from "./Option.module.css";

type OptionProps = {
  option: string;
  answer: string;
  questionId: number;
};

const Option = ({ option, questionId, answer }: OptionProps) => {
  const [isSelectedOptionCorrect, setIsSelectedOptionCorrect] = useState<
    boolean | null
  >(null);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const validateSelectedOption = () => {
    console.log("option", option);
    if (isClicked === true) return;

    setIsClicked(true);

    if (option === answer) {
      setIsSelectedOptionCorrect(true);
    } else {
      setIsSelectedOptionCorrect(false);
    }
  };

  //reset all user actions for each question
  useEffect(() => {
    setIsClicked(false);
    setIsSelectedOptionCorrect(false);
  }, [questionId]);

  const getOptionColor = () => {
    if (!isClicked) return `${styles.option_wrapper}`;

    if (isSelectedOptionCorrect) {
      return `${styles.option_wrapper} ${styles.correct_option}`;
    } else {
      return `${styles.option_wrapper} ${styles.incorrect_option}`;
    }
  };

  return (
    <div className={getOptionColor()} onClick={() => validateSelectedOption()}>
      <p>{option}</p>
    </div>
  );
};

export default Option;
