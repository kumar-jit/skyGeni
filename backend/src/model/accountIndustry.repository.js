import { readJsonData } from "../utils/readFileSync.js"

export const accountIndusGetAllDataRepo = async () => {
    const data = readJsonData('Account Industry');
    return data;
}

export const accountIndusColorPaletteRepo = async () => {
    const data = readJsonData('ColorMap');
    return data["accountIndustry"];
}