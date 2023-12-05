import styles from "./Differences.module.scss";

export interface IChanges {
  percent: string;
  difference: string;
}

interface DifferenceProps {
  changes: IChanges
}
const DifferencePercent: React.FC<DifferenceProps> = ({changes}) => {
  const { difference, percent } = changes;

  return (
    <div className={styles.diffrence}>
      <p>{difference}</p>
      <p>({percent})</p>
    </div>
  );
};

export default DifferencePercent;