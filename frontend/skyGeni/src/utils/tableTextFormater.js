
export const tableTextFormater = (key, value) => {
    //handle currency formatting
    if(key.includes("ACV"))
        return `$${value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
    // handle number formatting
    else if(key.includes("opps"))
        return value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    // handle percentage formatting
    else if(key.includes("Percen"))
        return `${value}%`;
    else
        return value;
}