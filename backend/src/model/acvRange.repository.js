import { readJsonData } from "../utils/readFileSync.js"

export const acvRangeGetAllDataRepo = async () => {
    const data = readJsonData('ACV Range');
    return data;
}

export const acvRangeColorPaletteRepo = async () => {
    const data = readJsonData('ColorMap');
    return data["acvRange"];
}