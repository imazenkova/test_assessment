import { useState, ReactNode } from 'react';
import BackpackCoinsContext, { ICoin } from './backpackCoinContext';
import { ICurrency } from '../types/ApiTypes';
import { countCoins } from '../utils/coinsUtils';
interface IBackpackCoinsProviderProps {
    children: ReactNode;
}

const BackpackCoinsProvider = ({ children }: IBackpackCoinsProviderProps) => {

    const [freshCoins, setFreshCoins] = useState<ICurrency[]>([])
    const [totalCost, setTotalCost] = useState<number>(0)

    async function calculateTotalCost(coins: ICoin[]) {
        const totalCost = await countCoins(coins);
        setTotalCost(totalCost);
        localStorage.setItem("totalCost", JSON.stringify(totalCost));
    }

    const getBackpack = (): ICoin[] => {
        let backpack = localStorage.getItem("backpack")
        if (backpack) {
            let parsedBackpack = JSON.parse(backpack)
            return parsedBackpack
        } else {
            return []
        }
    };

    const setOneCoinToBackpack = async (coinId: string, newQuantity: number, newCost: number) => {

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
        await calculateTotalCost(result)
    }

    const updateFreshCoins = (coins: ICurrency[]) => {
        setFreshCoins(coins)
    }

    const updateFullBackpack = async (newBackpack: ICoin[]) => {
        localStorage.setItem("backpack", JSON.stringify(newBackpack))
        await calculateTotalCost(newBackpack)
    }

    const value = { totalCost, freshCoins, updateFreshCoins, getBackpack, setOneCoinToBackpack, updateFullBackpack }

    return (
        <BackpackCoinsContext.Provider value={value}>
            {children}
        </BackpackCoinsContext.Provider>
    );
}

export default BackpackCoinsProvider;