import { useGetChanges } from '../../../hooks/headerHooks';
import styles from "./Differences.module.scss"
const DifferencePercent = () => {
  const { difference, percent } = useGetChanges();

  return (
    <div className={styles.diffrence}>
      <p>{difference}</p>
      <p>({percent})</p>
    </div>
  );
};

export default DifferencePercent;