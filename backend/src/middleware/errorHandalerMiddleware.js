import { logger } from "./loggerHandalerMiddleware.js";

export const errorHandlerMiddleware = (err, req, res, next) => {

    let message = `${err.message || "server error! Try later!!" } , requestUrl : ${req.originalUrl}`; 
    logger.error(message);
    
    err.message = err.message || "Internal server error";
    err.statusCode = err.statusCode || 500;
    res.status(err.statusCode).json({ error: err.message });
};

// handling handleUncaughtError  Rejection
export const handleUncaughtError = () => {
    process.on("uncaughtException", (err) => {
        console.log(`Error: ${err}`);
        console.log("shutting down server bcz of uncaughtException");
    });
};