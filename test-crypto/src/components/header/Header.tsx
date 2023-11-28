import { useEffect, useState } from 'react';
import MoveToTableButton from '../moveToTableButton/MoveToTableButton';
import styles from './Header.module.scss';
import { getTopRankedCoins, getAllCoins } from '../../api/Api';
import { ICurrency } from '../../types/ApiTypes';
import { formatPriceWithSuffix } from '../../utils/formatNumericValue';
import TopRankedCurrency from '../topRankedCurrency/TopRankedCurrency';
import Backpack from '../backpack/Backpack';
import BackpackCoinsContext from '../../context/backpackCoinContext';
import { useContext } from 'react';
import { RoutesPath } from '../../types/RoutesTypes';

interface TopCoinProps {
  id: string;
  name: string;
  symbol: string;
  priceUsd: string;
}

function Header() {

  const context = useContext(BackpackCoinsContext)
  const { updateFreshCoins } = context!;

  const [topCurrencyData, setTopCurrencyData] = useState<ICurrency[]>()
  const topLimit = 3

  async function getTopCoins(limit: number) {
    try {
      const data = await getTopRankedCoins(limit)
      setTopCurrencyData(data)

    } catch (error) {
      console.log("GetTopCoin error:", error)
    }
  }
  async function getNewCoins() {
    try {
      const allCoins = await getAllCoins()
      updateFreshCoins(allCoins)

    } catch (error) {
      console.log("GetTopCoin error:", error)
    }
  }

  useEffect(() => {
    getTopCoins(topLimit)
    getNewCoins();
  }, [])

  const prepareTopRankedCurrency = (coin: ICurrency): TopCoinProps => {
    return {
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      priceUsd: (formatPriceWithSuffix(parseFloat(coin.priceUsd))),
    };
  };

  return (
    <div className={styles.header}>
      <header className={styles.navbar}>
        <MoveToTableButton />
        <div className={styles.navbar_center}>
          {topCurrencyData && topCurrencyData.map((item) => {
            return <TopRankedCurrency
              key={item.id} {...prepareTopRankedCurrency(item)} />;
          })}
        </div>
        <div className={styles.navbar_right}>
          <Backpack />
        </div>
      </header>
    </div>
  );
}

export default Header;
