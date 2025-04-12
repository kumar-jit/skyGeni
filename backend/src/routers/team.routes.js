import express from "express";

import { teamBarChartController,getCollerPaletteController } from "../controller/team.controller.js";

const teamRouter = express.Router();


// to get table data
teamRouter.route("/barChart").get(teamBarChartController);
teamRouter.route("/collerPalette").get(getCollerPaletteController);
export default teamRouter;