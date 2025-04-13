import { accountIndusGetAllDataRepo,accountIndusColorPaletteRepo } from "../model/accountIndustry.repository.js";
import { groupQuarterDataForChart,groupQuarterDataForDoughnut, groupQuarterDataForTable } from "../utils/groupData.js";

/**
 * @description This function is used to get the account industry bar chart data.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const accountIndustryBarChartController = async (req, res, next) => {
    try {
        const data = await accountIndusGetAllDataRepo();
        const groupedData = groupQuarterDataForChart(data, "closed_fiscal_quarter", "Acct_Industry"); 
        res.status(200).json({success : true, data: groupedData, url: req.originalUrl});
    } catch (error) {
        next(error);
    }
}

/**
 * @description This function is used to get the account industry doughnut chart data.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const accountIndustryDoughnutController = async (req, res, next) => {
    try {
        const data = await accountIndusGetAllDataRepo();
        const groupedData = groupQuarterDataForDoughnut(data, "Acct_Industry", "acv");
        res.status(200).json({success : true, data: groupedData, url: req.originalUrl});
    } catch (error) {
        next(error);
    }
}

/**
 * @description This function is used to get the account industry table data.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const accountIndustryTableInfoController = async (req, res, next) => {
    try {
        const data = await accountIndusGetAllDataRepo();
        const groupedData = groupQuarterDataForTable(data, "closed_fiscal_quarter", "Acct_Industry", "Acc Industry");
        res.status(200).json({success : true, data: groupedData, url: req.originalUrl});
    } catch (error) {
        next(error);
    }
}

/**
 * @description This function is used to get the account industry color palette data.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const getCollerPaletteController = async (req, res, next) => {
    try {
        const data = await accountIndusColorPaletteRepo();
        res.status(200).json({success : true, data: data, url: req.originalUrl});
    } catch (error) {
        next(error);
    }
}

export const getAllData = async (req, res, next) => {
    try {
        const data = await accountIndusGetAllDataRepo();
        const barChartData = groupQuarterDataForChart(data, "closed_fiscal_quarter", "Acct_Industry");
        const doughnutData = groupQuarterDataForDoughnut(data, "Acct_Industry", "acv");
        const tableData = groupQuarterDataForTable(data, "closed_fiscal_quarter", "Acct_Industry", "Acc Industry");
        const collerPalette = await accountIndusColorPaletteRepo();
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

