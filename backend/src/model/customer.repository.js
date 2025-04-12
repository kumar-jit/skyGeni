


import { readJsonData } from "../utils/readFileSync.js"

export const customerGetAllDataRepo = async () => {
    const data = readJsonData('Customer Type');
    return data;
}

export const CustomerColorPaletteRepo = async () => {
    const data = readJsonData('ColorMap');
    return data["customerType"];
}