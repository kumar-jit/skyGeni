import express from "express";
import { accountIndustryBarChartController,getCollerPaletteController,accountIndustryDoughnutController } from "../controller/accountIndustry.controller.js";

const accountIndTypeRouter = express.Router();
accountIndTypeRouter.get("/barChart", accountIndustryBarChartController);
accountIndTypeRouter.get("/collerPalette", getCollerPaletteController);
accountIndTypeRouter.get("/doughnutChart", accountIndustryDoughnutController);

export default accountIndTypeRouter;