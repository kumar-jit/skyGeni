import express from "express";
import { accountIndustryBarChartController,getCollerPaletteController } from "../controller/accountIndustry.controller.js";

const accountIndTypeRouter = express.Router();
accountIndTypeRouter.get("/barChart", accountIndustryBarChartController);
accountIndTypeRouter.get("/collerPalette", getCollerPaletteController);

export default accountIndTypeRouter;