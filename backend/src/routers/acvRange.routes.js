import express from "express";
import { acvRangeBarChartController,getCollerPaletteController,acvRangeDoughnutController } from "../controller/acvRange.controller.js"; 

const acvRangeTypeRouter = express.Router();
acvRangeTypeRouter.get("/barChart", acvRangeBarChartController);
acvRangeTypeRouter.get("/collerPalette", getCollerPaletteController);
acvRangeTypeRouter.get("/doughnutChart", acvRangeDoughnutController);

export default acvRangeTypeRouter;