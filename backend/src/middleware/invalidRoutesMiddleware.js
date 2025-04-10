export const invalidRoutesHandlerMiddleware = (req, res, next) => {
    res.status(404)
        .json({ msg: `Invalid path: ${req.originalUrl}` });
        next();
};
