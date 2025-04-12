import express from "express";

import { customerBarChartController,getCollerPaletteController } from "../controller/customer.controller.js";

const customerTypeRouter = express.Router();

customerTypeRouter.get("/barChart", customerBarChartController);
customerTypeRouter.get("/collerPalette", getCollerPaletteController);

export default customerTypeRouter;