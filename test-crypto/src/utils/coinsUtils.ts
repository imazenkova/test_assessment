import {ICoin} from "../context/backpackCoinContext"
import { getTopRankedCoins } from "../api/Api";
import { ICurrency } from "../types/ApiTypes";

export async function countCoins(backpack: ICoin[]): Promise<number> {
    try {
        const totalCost = backpack.reduce(
            (acc, curr) => acc + curr.cost * curr.quantity,
            0
        );
        return totalCost;
    } catch (error) {
        throw new Error("countCoins error: " + error);
    }
}

export async function removeCoin(coinId: string, backpackCoins: ICoin[]): Promise<ICoin[]> {
    try {
      const newBackpack = backpackCoins.filter(item => item.coinId !== coinId);
      return newBackpack;
    } catch (error) {
      console.log("removeCoin Error: ", error);
      throw error;
    }
  }


  export async function getTopCoins(limit: number):Promise<ICurrency[]> {
    try {
      const topCoins = await getTopRankedCoins(limit);
      return topCoins
    } catch (error) {
      console.log("GetTopCoin error:", error);
      throw error;
    }
  }
