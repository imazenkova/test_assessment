import React from "react";

export interface ICoin {
    coinId: string;
    quantity: number;
    cost: number;
}

interface BackpacCoinsContextType {
    getBackpack: () => ICoin[];
    setBackpack:(coinId: string, newQuantity: number, newCost: number)=>void;
}

const BackpackCoinsContext = React.createContext<BackpacCoinsContextType | undefined>(undefined);

export default BackpackCoinsContext;