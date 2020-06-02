// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  res.status(400).json({ message: error.message });
 
};

export default errorHandler;
