const notFound = (req, res, next) => {
	const error = new Error(`Not found - ${req.originalUrl}`);
	res.status(404);
	next(error);
};

const errorHandler = (error, req, res) => {
	const status = req.statusCode === 200 ? 500 : req.statusCode;
	res.status(status);
	res.json({
		message: error.message,
		stack: process.env.NODE_ENV === 'production' ? null : error.stack
	});
};

export { notFound, errorHandler };
