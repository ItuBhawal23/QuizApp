import Button from "../button/Button";
import styles from "./ScoreBoard.module.css";

type ScoreBoardProps = {
  totalScore: number;
};

function ScoreBoard({ totalScore }: ScoreBoardProps) {
  return (
    <div>
      <h1>Score Board</h1>
      <p>{`You scored ${totalScore} out of 5!`}</p>
      <Button label={"Reset"} onClick={undefined} disabled={false} />
    </div>
  );
}

export default ScoreBoard;
