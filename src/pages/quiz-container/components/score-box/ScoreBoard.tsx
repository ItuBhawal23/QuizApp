import Button from "../../../../components/button/Button";
import styles from "./ScoreBoard.module.css";

type ScoreBoardProps = {
  totalScore: number;
  totalQuestion: number;
  handleReset: any;
};

function ScoreBoard({
  totalScore,
  handleReset,
  totalQuestion
}: ScoreBoardProps) {
  return (
    <div className={styles.score_board_container}>
      <h1>Score Board</h1>
      <p>{`You scored ${totalScore} out of ${totalQuestion}!`}</p>
      <Button label={"Reset"} onClick={() => handleReset()} disabled={false} />
    </div>
  );
}

export default ScoreBoard;
