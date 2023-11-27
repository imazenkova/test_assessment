import './App.scss';
import { useEffect, useState } from 'react';
import { ICoin } from './context/backpackCoinContext';
import AppRoutes from './routes/AppRoutes';
import BackpackCoinsContext from './context/backpackCoinContext';
import Header from './components/header/Header';

function App() {
  const [coins, setCoins] = useState<ICoin[]>([]);

  const updateCoinQuantity = (coinId: string, newQuantity: number, newCost: number) => {
    setCoins((prevCoins) => {
      const coin = prevCoins.find(item => item.coinId === coinId)
      if (coin) {
        coin.quantity += newQuantity
        coin.cost = newCost
        return [...prevCoins]
      } else {
        const updatedCoins = [...prevCoins, { coinId, quantity: newQuantity, cost: newCost }]
        return updatedCoins.map((coin) => coin.coinId === coinId ? { ...coin, quantity: newQuantity, cost: newCost } : coin)
      }
    })

  };

  return (
    <BackpackCoinsContext.Provider value={{ coins, updateCoinQuantity }}>
      <div className="App">
        <Header />
        <AppRoutes />
      </div>
    </BackpackCoinsContext.Provider>
  );
}

export default App;