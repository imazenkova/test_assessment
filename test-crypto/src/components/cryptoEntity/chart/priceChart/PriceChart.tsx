import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip
} from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';
import { useChart } from '../../../../hooks/chartHooks';
import { customColumnNames } from '../../../../pages/MainTablePage/ColumnNames';
import { IHistory, Interval } from '../../../../types/ApiTypes';
import style from "./PriceChart.module.scss";

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

  const { labels, prices } = useChart(historyData, interval)
  
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