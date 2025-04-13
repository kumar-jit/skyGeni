import express from "express";

import { customerBarChartController,getCollerPaletteController,customerBarChartDoughnutController,customerTableInfoController, getAllData } from "../controller/customer.controller.js";

const customerTypeRouter = express.Router();

customerTypeRouter.get("/barChart", customerBarChartController);
customerTypeRouter.get("/collerPalette", getCollerPaletteController);
customerTypeRouter.get("/doughnutChart", customerBarChartDoughnutController);
customerTypeRouter.get("/tableData", customerTableInfoController);
customerTypeRouter.get("/", getAllData);


export default customerTypeRouter;