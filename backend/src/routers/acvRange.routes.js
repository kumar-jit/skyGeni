import express from "express";
import { acvRangeBarChartController,getCollerPaletteController,acvRangeDoughnutController,acvRangeTableInfoController,getAllData } from "../controller/acvRange.controller.js"; 

const acvRangeTypeRouter = express.Router();
acvRangeTypeRouter.get("/barChart", acvRangeBarChartController);
acvRangeTypeRouter.get("/collerPalette", getCollerPaletteController);
acvRangeTypeRouter.get("/doughnutChart", acvRangeDoughnutController);
acvRangeTypeRouter.get("/tableData", acvRangeTableInfoController);
acvRangeTypeRouter.get("/", getAllData);


export default acvRangeTypeRouter;