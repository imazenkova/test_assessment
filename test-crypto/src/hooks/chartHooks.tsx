import { useEffect, useState } from "react";
import { IHistory, Interval } from "../types/ApiTypes";

export function useChart(historyData: IHistory[], interval: Interval) {
    const [labels, setLabels] = useState<string[]>()
    const [prices, setPrices] = useState<number[]>()

    useEffect(() => {

        const priceByInterval = new Map();
        let keys: string[] = []
        let values: number[] = []

        if (interval === "d1") {

            historyData.forEach(data => {
                const time = new Date(data.time);
                const day = time.toLocaleDateString();
                const priceUsd = parseFloat(data.priceUsd);
                priceByInterval.set(day, priceUsd);

            });

            keys = Array.from(priceByInterval.keys());
            values = Array.from(priceByInterval.values());

        } else if (interval === "h1") {

            historyData.forEach(data => {
                const time = new Date(data.time);
                const hour = time.toLocaleTimeString();
                const priceUsd = parseFloat(data.priceUsd);
                priceByInterval.set(hour.slice(0, 5), priceUsd);

            });

            keys = Array.from(priceByInterval.keys());
            values = Array.from(priceByInterval.values());

        } else if (interval === "h12") {

            historyData.forEach((data, index) => {
                const time = new Date(data.time);
                const day = time.toLocaleDateString();
                const timeInDay = time.toLocaleTimeString();
                const priceUsd = parseFloat(data.priceUsd);
                priceByInterval.set(`${day} ${timeInDay.slice(0, 5)}`, priceUsd);
            });

            keys = Array.from(priceByInterval.keys()).splice(30, 60);
            values = Array.from(priceByInterval.values());

        }

        setPrices(values)
        setLabels(keys)
    }, [historyData, interval])
    return { labels, prices }
}