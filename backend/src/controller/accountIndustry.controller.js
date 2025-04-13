import { accountIndusGetAllDataRepo,accountIndusColorPaletteRepo } from "../model/accountIndustry.repository.js";
import { groupQuarterDataForChart,groupQuarterDataForDoughnut, groupQuarterDataForTable } from "../utils/groupData.js";

export const accountIndustryBarChartController = async (req, res, next) => {
    try {
        const data = await accountIndusGetAllDataRepo();
        const groupedData = groupQuarterDataForChart(data, "closed_fiscal_quarter", "Acct_Industry"); 
        res.status(200).json({success : true, data: groupedData, url: req.originalUrl});
    } catch (error) {
        next(error);
    }
}

export const accountIndustryDoughnutController = async (req, res, next) => {
    try {
        const data = await accountIndusGetAllDataRepo();
        const groupedData = groupQuarterDataForDoughnut(data, "Acct_Industry", "acv");
        res.status(200).json({success : true, data: groupedData, url: req.originalUrl});
    } catch (error) {
        next(error);
    }
}

export const accountIndustryTableInfoController = async (req, res, next) => {
    try {
        const data = await accountIndusGetAllDataRepo();
        const groupedData = groupQuarterDataForTable(data, "closed_fiscal_quarter", "Acct_Industry", "Acc Industry");
        res.status(200).json({success : true, data: groupedData, url: req.originalUrl});
    } catch (error) {
        next(error);
    }
}

export const getCollerPaletteController = async (req, res, next) => {
    try {
        const data = await accountIndusColorPaletteRepo();
        res.status(200).json({success : true, data: data, url: req.originalUrl});
    } catch (error) {
        next(error);
    }
}


