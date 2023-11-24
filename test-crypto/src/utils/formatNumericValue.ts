export function formatPriceWithSuffix(price: number): string {
    const suffixes: { [key: string]: number } = {
        b: 1e9,
        m: 1e6,
        k: 1e3,
    };

    for (const suffix in suffixes) {
        if (price >= suffixes[suffix]) {
            const formattedNumber = (price / suffixes[suffix]).toFixed(2);
            return `${formattedNumber}${suffix}`;
        }
    }

    return price.toFixed(2).toString();
}

export function roundingNumericValues(value: number): string {

    return value.toFixed(2).toString();
}