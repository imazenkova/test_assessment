import {ICoin} from "../context/backpackCoinContext"

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
