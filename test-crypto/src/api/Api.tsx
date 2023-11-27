import axios from 'axios';
import { ApiEndpoint, ICurrency, IHistory } from '../types/ApiTypes';

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

export const getCryptoHistory = async (id: string, interval: string, start: number, end: number): Promise<IHistory[]> => {
    try {

        const response = await api.get(`${ApiEndpoint.ASSETS}/${id}/history`, {
            params: {
                interval,
                start,
                end,
            },
        });

        return response.data.data;

    } catch (error) {
        console.error('Api getCryptoHistory error:', error);
        throw error;
    }
};

export const getTopRankedCoins = async (top: number): Promise<ICurrency[]> => {
    try {

        const response = await api.get(ApiEndpoint.ASSETS, {});
        const currencies = response.data.data;
        currencies.sort((a: ICurrency, b: ICurrency) => parseFloat(b.rank) - parseFloat(a.rank));
        const topCurrencies = currencies.slice(0, top);

        return topCurrencies;

    } catch (error) {
        console.error('Api getPaginationCryptoAssets error :', error);
        throw error;
    }
};