import { acvRangeGetAllDataRepo,acvRangeColorPaletteRepo } from "../model/acvRange.repository.js";
import { groupQuarterDataForChart, groupQuarterDataForDoughnut } from "../utils/groupData.js";


export const acvRangeBarChartController = async (req, res, next) => {
    try {
        const data = await acvRangeGetAllDataRepo();
        const groupedData = groupQuarterDataForChart(data, "closed_fiscal_quarter", "ACV_Range"); 
        res.status(200).json({success : true, data: groupedData, url: req.originalUrl});
    } catch (error) {
        next(error);
    }
}
export const acvRangeDoughnutController = async (req, res, next) => {
    try {
        const data = await acvRangeGetAllDataRepo();
        const groupedData = groupQuarterDataForDoughnut(data, "ACV_Range", "acv");
        res.status(200).json({success : true, data: groupedData, url: req.originalUrl});
    } catch (error) {
        next(error);
    }
}
export const getCollerPaletteController = async (req, res, next) => {
    try {
        const data = await acvRangeColorPaletteRepo();
        res.status(200).json({success : true, data: data, url: req.originalUrl});
    } catch (error) {
        next(error);
    }
}