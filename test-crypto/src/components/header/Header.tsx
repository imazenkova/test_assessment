import { useBackpackCost } from '../../hooks/backpackHooks';
import { useTopCoins } from '../../hooks/headerHooks';
import { ICurrency } from '../../types/ApiTypes';
import { formatPriceWithSuffix } from '../../utils/formatNumericValue';
import Backpack from '../backpack/backpackButton/Backpack';
import MoveToTableButton from '../moveToTableButton/MoveToTableButton';
import styles from './Header.module.scss';
import DifferencePercent from "./differences/Differences";
import TopRankedCurrency from './topRankedCurrency/TopRankedCurrency';

interface TopCoinProps {
  id: string;
  name: string;
  symbol: string;
  priceUsd: string;
}

function Header() {

  const topLimit = 3;
  
  const topCurrencyData = useTopCoins(topLimit);
   const backpackCost = useBackpackCost();

  const prepareTopRankedCurrency = (coin: ICurrency): TopCoinProps => {
    return {
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      priceUsd: formatPriceWithSuffix(parseFloat(coin.priceUsd)),
    };
  };

  return (
    <div className={styles.header}>
      <header className={styles.navbar}>
        <div><MoveToTableButton /></div>
  
        <div className={styles.navbar_center}>
          {topCurrencyData.map((item) => (
            <TopRankedCurrency key={item.id} {...prepareTopRankedCurrency(item)} />
          ))}
        </div>

        <div className={styles.navbar_right}>
          <Backpack backpackCost={backpackCost}/>
          <DifferencePercent />
        </div>
   
      </header>
    </div>
  );
}

export default Header;