import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { getTopRankedCoins } from '../../api/Api';
import { ICurrency } from '../../types/ApiTypes';
import { formatPriceWithSuffix } from '../../utils/formatNumericValue';
import TopRankedCurrency from '../topRankedCurrency/TopRankedCurrency';
import Backpack from '../backpack/Backpack';

interface TopCoinProps {
  id: string;
  name: string;
  symbol: string;
  priceUsd: string;
}

function Header() {
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

  useEffect(() => {
    getTopCoins(topLimit)
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
        <NavLink to={'/'}>
          {/* <img className={styles.company_logo} src={logo} alt='' /> */}
        </NavLink>
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
