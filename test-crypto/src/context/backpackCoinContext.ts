import React from "react";
import { ICurrency } from "../types/ApiTypes";

export interface ICoin {
    coinId: string;
    quantity: number;
    cost: number;
}

interface BackpacCoinsContextType {
    totalCost: number;
    freshCoins: ICurrency[];
    updateFreshCoins: (coins: ICurrency[]) => void;
    getBackpack: () => ICoin[];
    setOneCoinToBackpack: (coinId: string, newQuantity: number, newCost: number) => void;
    updateFullBackpack: (newBackpack:ICoin[])=> void;
}

const BackpackCoinsContext = React.createContext<BackpacCoinsContextType | undefined>(undefined);

export default BackpackCoinsContext;