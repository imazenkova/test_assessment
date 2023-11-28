import { useState } from 'react';
import './App.scss';
import BackpackCoinsContext, { ICoin } from './context/backpackCoinContext';
import AppRoutes from './routes/AppRoutes';
import Header from './components/header/Header';

function App() {

  const getBackpack = (): ICoin[] => {
    let backpack = localStorage.getItem("backpack")
    if (backpack) {
      let parsedBackpack = JSON.parse(backpack)
      return parsedBackpack
    } else {
      return []
    }
  };

  const setBackpack = (coinId: string, newQuantity: number, newCost: number) => {
    debugger
    let backpack = localStorage.getItem("backpack")
    let result: ICoin[] = []

    if (backpack) {
      debugger
      backpack = JSON.parse(backpack)

      if (Array.isArray(backpack)) {
        let prevBackpack = [...backpack]
        const coin = prevBackpack.find(item => item.coinId === coinId)

        if (coin) {
          coin.quantity += newQuantity
          coin.cost = newCost
          result = [...prevBackpack]
        } else {
          const updatedCoins = [...prevBackpack, { coinId, quantity: newQuantity, cost: newCost }]
          result = updatedCoins.map((coin) => coin.coinId === coinId ? { ...coin, quantity: newQuantity, cost: newCost } : coin)
        }
      }
    } else {
      result = [{ coinId, quantity: newQuantity, cost: newCost }]
    }
    localStorage.setItem("backpack", JSON.stringify(result))
  }


  return (
    <BackpackCoinsContext.Provider value={{ getBackpack, setBackpack }}>
      <div className="App">
        <Header />
        <AppRoutes />
      </div>
    </BackpackCoinsContext.Provider>
  );
}

export default App;