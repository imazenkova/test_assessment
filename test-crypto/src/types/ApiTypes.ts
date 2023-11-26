export interface ICurrency {
    id: string,
    rank: string,
    symbol: string,
    name: string,
    supply: string,
    maxSupply: string,
    marketCapUsd: string,
    volumeUsd24Hr: string,
    priceUsd: string,
    changePercent24Hr: string,
    vwap24Hr: string,
    explorer: string
}

export interface IHistory {
    priceUsd: string;
    time: number;
    date: string;
    circulatingSupply?: string;
}

export type Interval = 'h1' | 'h12' | 'd1';

export enum ApiEndpoint {
    ASSETS = "/assets"
}


