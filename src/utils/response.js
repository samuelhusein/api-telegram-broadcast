const successResponse = (res, data, message = 'Success') => {
  res.status(200).json({
    status: 'success',
    message,
    data,
  });
};

const errorResponse = (res, error, message = 'Error') => {
  res.status(500).json({
    status: 'error',
    message,
    error,
  });
};

const notFoundResponse = (res, message = 'Not Found') => {
  res.status(404).json({
    status: 'error',
    message,
  });
};

module.exports = {
  successResponse,
  errorResponse,
  notFoundResponse,
};
