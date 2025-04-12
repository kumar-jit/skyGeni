import { customerGetAllDataRepo,CustomerColorPaletteRepo } from "../model/customer.repository.js";
import { groupQuarterDataForChart, groupQuarterDataForDoughnut } from "../utils/groupData.js";
 
export const customerBarChartController = async (req, res, next) => {
    try {
        const data = await customerGetAllDataRepo();
        const groupedData = groupQuarterDataForChart(data, "closed_fiscal_quarter", "Cust_Type"); 
        res.status(200).json({success : true, data: groupedData, url: req.originalUrl});
    } catch (error) {
        next(error);
    }
}

export const customerBarChartDoughnutController = async (req, res, next) => {
    try {
        const data = await customerGetAllDataRepo();
        const groupedData = groupQuarterDataForDoughnut(data, "Cust_Type", "acv");
        res.status(200).json({success : true, data: groupedData, url: req.originalUrl});
    } catch (error) {
        next(error);
    }
}

export const getCollerPaletteController = async (req, res, next) => {
    try {
        const data = await CustomerColorPaletteRepo();
        res.status(200).json({success : true, data: data, url: req.originalUrl});
    } catch (error) {
        next(error);
    }
}