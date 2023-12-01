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
import { useChart } from '../../../hooks/chartHooks';
import { useGetHistory } from '../../../hooks/coinsHooks';
import { customColumnNames } from '../../../pages/MainTablePage/ColumnNames';
import { Interval } from '../../../types/ApiTypes';
import Loader from '../../sharedComponents/loader/Loader';
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
  interval: Interval;
  id: string;
}

const PriceChart: React.FC<IPriceChartProps> = ({ interval, id }) => {

  const { isLoading, historyData, apiError } = useGetHistory(id, interval)
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
    <>
      {!apiError && (
        <>
          {isLoading ? (
            <Loader message="" />
          ) : (
            <div className={style.container}>
              <Line data={chartData} options={options} />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default PriceChart;