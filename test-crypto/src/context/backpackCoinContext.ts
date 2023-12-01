import React from "react";

export interface ICoin {
    coinId: string;
    quantity: number;
    cost: number;
}

interface BackpacCoinsContextType {
    totalCost: number;
    getBackpack: () => ICoin[];
    setOneCoinToBackpack: (coinId: string, newQuantity: number, newCost: number) => void;
    updateFullBackpack: (newBackpack:ICoin[])=> void;
}

const BackpackCoinsContext = React.createContext<BackpacCoinsContextType | undefined>(undefined);

export default BackpackCoinsContext;