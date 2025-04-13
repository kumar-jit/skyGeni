
export const tableTextFormater = (key, value) => {
    if(key.includes("ACV"))
        return `$${value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
    else if(key.includes("opps"))
        return value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    else if(key.includes("Percen"))
        return `${value}%`;
    else
        return value;
}