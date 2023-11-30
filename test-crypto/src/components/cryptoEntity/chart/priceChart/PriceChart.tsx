import React, { useEffect, useState } from 'react';
import { IHistory, Interval } from '../../../../types/ApiTypes';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { customColumnNames } from '../../../../pages/MainTablePage/ColumnNames';
import style from "./PriceChart.module.scss"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface IPriceChartProps {
  historyData: IHistory[];
  interval: Interval;
}

const PriceChart: React.FC<IPriceChartProps> = ({ historyData, interval }) => {
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


  const chartData = {
    labels,
    datasets: [
      {
        fill: true,
        label: customColumnNames.priceUsd,
        data: prices,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: false
      },
    }
  };

  return (
    <div className={style.container}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default PriceChart;