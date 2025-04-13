import express from "express";

import { teamBarChartController,getCollerPaletteController,teamDoughnutController,teamTableInfoController } from "../controller/team.controller.js";

const teamRouter = express.Router();


// to get table data
teamRouter.route("/barChart").get(teamBarChartController);
teamRouter.route("/collerPalette").get(getCollerPaletteController);
teamRouter.route("/doughnutChart").get(teamDoughnutController);
teamRouter.route("/tableData").get(teamTableInfoController);
export default teamRouter;