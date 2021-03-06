const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404).json(error);
    next(error);
};

module.exports = notFound;
