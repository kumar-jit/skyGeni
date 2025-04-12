
import { readJsonData } from "../utils/readFileSync.js"

export const teamGetAllDataRepo = async () => {
    const data = readJsonData('team');
    return data;
}

export const teamColorPaletteRepo = async () => {
    const data = readJsonData('ColorMap');
    return data["team"];
}



