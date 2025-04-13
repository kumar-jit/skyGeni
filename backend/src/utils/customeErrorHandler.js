
/**
 * Custom Error Handler for Express.js
 * @param {number} statusCode - HTTP status code
 */
export class ErrorHandler extends Error {
    constructor(statusCode, error) {
        super(error);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}