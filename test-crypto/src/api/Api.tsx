import axios from 'axios';
import { ApiEndpoint, ICurrency } from '../types/ApiTypes';

export const apiUrl = 'https://api.coincap.io/v2/';
const api = axios.create({ baseURL: apiUrl })

export const getPaginationCryptoAssets = async (limit: number, offset: number, searchInput: string): Promise<ICurrency[]> => {
    try {

        const response = await api.get(ApiEndpoint.ASSETS, {
            params: {
                limit,
                offset,
                search: searchInput
            },
        });
        return response.data.data;
    } catch (error) {
        console.error('Api getPaginationCryptoAssets error :', error);
        throw error;
    }
};
export const getEntityDetails = async (id: string): Promise<ICurrency> => {
    try {
        const response = await api.get(`${ApiEndpoint.ASSETS}/${id}`, {});
        return response.data.data;
    } catch (error) {
        console.error('Api getEntityDetails error :', error);
        throw error;
    }
};
export  const getCryptoHistory = async (id: string | null, interval: string, start: number, end: number) => {
    try {
        const response = await axios.get(`${ApiEndpoint.ASSETS}/${id}/history`, {
            params: {
                interval,
                start,
                end,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error('Api getCryptoHistory occurred:', error);
        throw error;
    }
};
