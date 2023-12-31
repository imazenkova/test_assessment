import { getCryptoHistory } from "../../api/Api";
import { Interval } from "../../types/ApiTypes";

export const fetchHistoryData = async (id: string | undefined, interval: Interval) => {
  const currentDate = new Date();
  const currentTimestamp = currentDate.getTime();

  const thirtyDays = 30 * 24 * 60 * 60 * 1000;
  const oneMonthAgoTimestamp = currentTimestamp - thirtyDays;

  if (!id) return [];

  const data = await getCryptoHistory(id, interval, oneMonthAgoTimestamp, currentTimestamp);
  return data;
};
