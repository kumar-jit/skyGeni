
import { getTeamDataRepo } from "../model/team.repository.js";

export const getTableDataController = async (req, res, next) => {
    try {
        const data = await getTeamDataRepo();
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}