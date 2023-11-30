import { useEffect, useState, useContext } from 'react';
import MoveToTableButton from '../moveToTableButton/MoveToTableButton';
import styles from './Header.module.scss';
import { getTopRankedCoins, getAllCoins } from '../../api/Api';
import { ICurrency } from '../../types/ApiTypes';
import { formatPriceWithSuffix } from '../../utils/formatNumericValue';
import TopRankedCurrency from './topRankedCurrency/TopRankedCurrency';
import Backpack from '../backpack/backpackButton/Backpack';
import BackpackCoinsContext from '../../context/backpackCoinContext';

interface TopCoinProps {
  id: string;
  name: string;
  symbol: string;
  priceUsd: string;
}

interface IChanges {
  percent: string;
  difference: string;
}

function Header() {
  const context = useContext(BackpackCoinsContext);
  const { updateFreshCoins, getBackpack } = context!;

  const [costChange, setCostChange] = useState<IChanges>({
    percent: "+0.00",
    difference: "+0.00%"
  });

  const [topCurrencyData, setTopCurrencyData] = useState<ICurrency[]>([]);
  const topLimit = 3;

  async function getTopCoins(limit: number) {
    try {
      const data = await getTopRankedCoins(limit);
      setTopCurrencyData(data);
    } catch (error) {
      console.log("GetTopCoin error:", error);
    }
  }

  // async function getChanges() {
  //   try {
  //     const allCoins = await getAllCoins();
  //     updateFreshCoins(allCoins);
  //     const backpackData = getBackpack();

  //     const newData = backpackData.map((item) => {
  //       const coin = allCoins.find((coin: ICurrency) => coin.id === item.coinId);
  //       if (coin) {
  //         return { ...item, price: coin.priceUsd };
  //       }
  //       return item;
  //     });

  //     const newTotalCost = newData.reduce((acc, item) => {
  //       return acc + item.cost * item.quantity;
  //     }, 0);

  //     const oldTotalCost = localStorage.getItem("totalCost");
  //     if (oldTotalCost) {
  //       const percentChange = ((newTotalCost - parseFloat(oldTotalCost)) / parseFloat(oldTotalCost)) * 100;
  //       const difference = newTotalCost - parseFloat(oldTotalCost);

  //       const percentString = `${(percentChange >= 0 ? '+' : '')}${percentChange.toFixed(2)}%`;
  //       const differenceString = `${(difference >= 0 ? '+' : '')}${difference.toFixed(2)}`;

  //       setCostChange({
  //         percent: percentString,
  //         difference: differenceString
  //       });
  //     }

  //   } catch (error) {
  //     console.log("GetTopCoin error:", error);
  //   }
  // }

  useEffect(() => {
  getTopCoins(topLimit);
  // getChanges();
}, []);

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
          <Backpack />
        </div>

        <div>
          {costChange && (
            <div>
              <p>{costChange.difference}</p>
              <p>{`(${costChange.percent})`}</p>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;