import { useEffect ,useState,useContext} from "react"
import BackpackCoinsContext from "../context/backpackCoinContext";

export function useBackpackCost(){
    const [backpackCost, setBackpacklCost] = useState<number>(0);
    const context = useContext(BackpackCoinsContext);
    const { totalCost } = context!;

    useEffect(() => {
        const backpackCost = localStorage.getItem("totalCost")
        if (backpackCost) {
            setBackpacklCost(parseFloat(backpackCost))
        } else {
            setBackpacklCost(0)
        }
    }, [totalCost])

    return backpackCost
}
