import { useState, ReactNode } from 'react';
import BackpackCoinsContext, { ICoin } from './backpackCoinContext';
import { ICurrency } from '../types/ApiTypes';

interface IBackpackCoinsProviderProps {
    children: ReactNode;
}

const BackpackCoinsProvider = ({ children }: IBackpackCoinsProviderProps) => {

    const [freshCoins, setFreshCoins] = useState<ICurrency[]>([])

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

        let backpack = localStorage.getItem("backpack")
        let result: ICoin[] = []

        if (backpack) {
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
    const updateFreshCoins = (coins: ICurrency[]) => {
        setFreshCoins(coins)
    }

    const value = { freshCoins, updateFreshCoins, getBackpack, setBackpack }
    
    return (
        <BackpackCoinsContext.Provider value={value}>
            {children}
        </BackpackCoinsContext.Provider>
    );
}

export default BackpackCoinsProvider;