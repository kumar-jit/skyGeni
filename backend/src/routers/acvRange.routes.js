import express from "express";
import { acvRangeBarChartController,getCollerPaletteController } from "../controller/acvRange.controller.js"; 

const acvRangeTypeRouter = express.Router();
acvRangeTypeRouter.get("/barChart", acvRangeBarChartController);
acvRangeTypeRouter.get("/collerPalette", getCollerPaletteController);

export default acvRangeTypeRouter;