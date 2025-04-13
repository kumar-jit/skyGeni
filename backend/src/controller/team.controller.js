
import { teamGetAllDataRepo,teamColorPaletteRepo } from "../model/team.repository.js";
import { groupQuarterDataForChart, groupQuarterDataForDoughnut, groupQuarterDataForTable } from "../utils/groupData.js";

export const teamBarChartController = async (req, res, next) => {
    try {
        const data = await teamGetAllDataRepo();
        const groupedData = groupQuarterDataForChart(data, "closed_fiscal_quarter", "Team"); 
        res.status(200).json({success : true, data: groupedData, url: req.originalUrl});
    } catch (error) {
        next(error);
    }
}

export const teamDoughnutController = async (req, res, next) => {
    try {
        const data = await teamGetAllDataRepo();
        const groupedData = groupQuarterDataForDoughnut(data, "Team", "acv");
        res.status(200).json({success : true, data: groupedData, url: req.originalUrl});
    } catch (error) {
        next(error);
    }
}
export const teamTableInfoController = async (req, res, next) => {
    try {
        const data = await teamGetAllDataRepo();
        const groupedData = groupQuarterDataForTable(data, "closed_fiscal_quarter", "Team", "Team");
        res.status(200).json({success : true, data: groupedData, url: req.originalUrl});
    } catch (error) {
        next(error);
    }
}

export const getCollerPaletteController = async (req, res, next) => {
    try {
        const data = await teamColorPaletteRepo();
        res.status(200).json({success : true, data: data, url: req.originalUrl});
    } catch (error) {
        next(error);
    }
}