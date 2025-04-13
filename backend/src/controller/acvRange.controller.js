import { acvRangeGetAllDataRepo,acvRangeColorPaletteRepo } from "../model/acvRange.repository.js";
import { groupQuarterDataForChart, groupQuarterDataForDoughnut, groupQuarterDataForTable } from "../utils/groupData.js";


/**
 * @description This function is used to get the acv range bar chart data.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const acvRangeBarChartController = async (req, res, next) => {
    try {
        const data = await acvRangeGetAllDataRepo();
        const groupedData = groupQuarterDataForChart(data, "closed_fiscal_quarter", "ACV_Range"); 
        res.status(200).json({success : true, data: groupedData, url: req.originalUrl});
    } catch (error) {
        next(error);
    }
}

/**
 * @description This function is used to get the acv range bar chart data.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const acvRangeDoughnutController = async (req, res, next) => {
    try {
        const data = await acvRangeGetAllDataRepo();
        const groupedData = groupQuarterDataForDoughnut(data, "ACV_Range", "acv");
        res.status(200).json({success : true, data: groupedData, url: req.originalUrl});
    } catch (error) {
        next(error);
    }
}

/**
 * @description This function is used to get the acv range bar chart data.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const acvRangeTableInfoController = async (req, res, next) => {
    try {
        const data = await acvRangeGetAllDataRepo();
        const groupedData = groupQuarterDataForTable(data, "closed_fiscal_quarter", "ACV_Range", "ACV Range");
        res.status(200).json({success : true, data: groupedData, url: req.originalUrl});
    } catch (error) {
        next(error);
    }
}
/**
 * @description This function is used to get the acv range bar chart data.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const getCollerPaletteController = async (req, res, next) => {
    try {
        const data = await acvRangeColorPaletteRepo();
        res.status(200).json({success : true, data: data, url: req.originalUrl});
    } catch (error) {
        next(error);
    }
}

/**
 * @description This function is used to get all the data for the acv range.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const getAllData = async (req, res, next) => {
    try {
        const data = await acvRangeGetAllDataRepo();
        const barChartData = groupQuarterDataForChart(data, "closed_fiscal_quarter", "ACV_Range");  
        const doughnutData = groupQuarterDataForDoughnut(data, "ACV_Range", "acv");
        const tableData = groupQuarterDataForTable(data, "closed_fiscal_quarter", "ACV_Range", "ACV Range");
        const collerPalette = await acvRangeColorPaletteRepo();

        res.status(200).json({success : true, data: {
            barChartData,
            doughnutData,
            tableData,
            collerPalette
        }, url: req.originalUrl});
    } catch (error) {
        next(error);
    }
}