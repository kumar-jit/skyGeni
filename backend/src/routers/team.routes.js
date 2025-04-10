import express from "express";

import { getTableDataController } from "../controller/team.controller.js";

const teamRouter = express.Router();


// to get table data
teamRouter.route("/").get(getTableDataController);


// to get bar chart data
// teamRouter.get("/barChart", (req, res) => {
//   const { id } = req.params;
//   res.json({ message: `Get team with ID: ${id}` });
// });

// // to get doughnut chart data
// teamRouter.get("/doughnutChart", (req, res) => {
//     const { id } = req.params;
//     res.json({ message: `Get team with ID: ${id}` });
// });
  
export default teamRouter;