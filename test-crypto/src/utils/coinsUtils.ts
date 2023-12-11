import { ICoin } from "../context/backpackCoinContext"
import { getTopRankedCoins } from "../api/Api";
import { ICurrency } from "../types/ApiTypes";

export async function countCoins(backpack: ICoin[]): Promise<number> {
  const totalCost = backpack.reduce(
    (acc, curr) => acc + curr.cost * curr.quantity,
    0
  );
  return totalCost;
}

export async function removeCoin(coinId: string, backpackCoins: ICoin[]): Promise<ICoin[]> {
  const newBackpack = backpackCoins.filter(item => item.coinId !== coinId);
  return newBackpack;
}


export async function getTopCoins(limit: number): Promise<ICurrency[]> {
  const topCoins = await getTopRankedCoins(limit);
  return topCoins
}
