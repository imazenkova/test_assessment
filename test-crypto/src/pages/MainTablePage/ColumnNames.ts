import { ICurrency } from "../../types/ApiTypes";
type CustomColumnNames = Partial<{
    [K in keyof ICurrency]: string;
}>;
export const customColumnNames: CustomColumnNames = {
    changePercent24Hr: "24h %",
    marketCapUsd: "Market cap",
    priceUsd: "Price",
    name:"Name",
    supply:"Supply",
    volumeUsd24Hr:"Volume (24Hr)"
};