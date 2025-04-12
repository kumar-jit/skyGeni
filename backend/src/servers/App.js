import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// importing routers
import teamRouter from '../routers/team.routes.js';
import customerTypeRouter from '../routers/customerType.routes.js';
import acvRangeTypeRouter from '../routers/acvRange.routes.js';
import accountIndTypeRouter from '../routers/accountIndustry.routes.js';

//importing middlewares
import { errorHandlerMiddleware } from '../middleware/errorHandalerMiddleware.js';
import { invalidRoutesHandlerMiddleware } from '../middleware/invalidRoutesMiddleware.js';


// crating server instance
export const App = express();

//configuring environment variables
dotenv.config();

// setup cors options
const corsOptions = {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
App.use(cors(corsOptions));

// setup express.json middleware to parse JSON requests
App.use(express.json());

// test route to check if the server is running
App.get("/", (req, res) => {
    res.send("Server is running");
});


// setup routes
App.use("/api/team", teamRouter);
App.use("/api/customer", customerTypeRouter);
App.use("/api/acvRange", acvRangeTypeRouter);
App.use("/api/account", accountIndTypeRouter);



// setup invalid routes handler middleware
App.use(invalidRoutesHandlerMiddleware);

// setup error handler middleware
App.use(errorHandlerMiddleware);