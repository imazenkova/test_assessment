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
        console.error('An error occurred:', error);
        throw error;
    }
};
export const getEntityDetails = async (id: string): Promise<ICurrency> => {
    try {
        const response = await api.get(`${ApiEndpoint.ASSETS}/${id}`, {});
        return response.data.data;
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
};