import express from "express";

import { teamBarChartController,getCollerPaletteController,teamDoughnutController,teamTableInfoController,getAllData } from "../controller/team.controller.js";

const teamRouter = express.Router();


// to get table data
teamRouter.route("/barChart").get(teamBarChartController);
teamRouter.route("/collerPalette").get(getCollerPaletteController);
teamRouter.route("/doughnutChart").get(teamDoughnutController);
teamRouter.route("/tableData").get(teamTableInfoController);
teamRouter.route("/").get(getAllData);
export default teamRouter;