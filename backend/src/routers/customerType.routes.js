import express from "express";

import { customerBarChartController,getCollerPaletteController,customerBarChartDoughnutController } from "../controller/customer.controller.js";

const customerTypeRouter = express.Router();

customerTypeRouter.get("/barChart", customerBarChartController);
customerTypeRouter.get("/collerPalette", getCollerPaletteController);
customerTypeRouter.get("/doughnutChart", customerBarChartDoughnutController);

export default customerTypeRouter;