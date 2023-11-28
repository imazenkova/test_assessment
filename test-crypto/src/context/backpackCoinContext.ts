import React from "react";
import { ICurrency } from "../types/ApiTypes";

export interface ICoin {
    coinId: string;
    quantity: number;
    cost: number;
}

interface BackpacCoinsContextType {
    freshCoins:ICurrency[];
    updateFreshCoins: (coins: ICurrency[]) => void;
    getBackpack: () => ICoin[];
    setBackpack:(coinId: string, newQuantity: number, newCost: number)=>void;
}

const BackpackCoinsContext = React.createContext<BackpacCoinsContextType | undefined>(undefined);

export default BackpackCoinsContext;