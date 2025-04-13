import express from "express";
import { accountIndustryBarChartController,getCollerPaletteController,accountIndustryDoughnutController,accountIndustryTableInfoController, getAllData } from "../controller/accountIndustry.controller.js";

const accountIndTypeRouter = express.Router();
accountIndTypeRouter.get("/barChart", accountIndustryBarChartController);
accountIndTypeRouter.get("/collerPalette", getCollerPaletteController);
accountIndTypeRouter.get("/doughnutChart", accountIndustryDoughnutController);
accountIndTypeRouter.get("/tableData", accountIndustryTableInfoController);
accountIndTypeRouter.get("/", getAllData);

export default accountIndTypeRouter;