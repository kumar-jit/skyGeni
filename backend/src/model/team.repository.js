
import { readJsonData } from "../utils/readFileSync.js"

export const getTeamDataRepo = async () => {
    const data = readJsonData('team');
    return data;
}



