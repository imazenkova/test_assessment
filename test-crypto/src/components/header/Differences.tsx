import { useGetChanges } from '../../hooks/hooks';

const DifferencePercent = () => {
  const { difference, percent } = useGetChanges();
  
  return (
    <div>
      <p>{difference}</p>
      <p>({percent})</p>
    </div>
  );
};

export default DifferencePercent;