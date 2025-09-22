// Error handling middleware
export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Default error
  let error = {
    message: err.message || 'Internal Server Error',
    status: err.status || 500
  };

  // Database errors
  if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
    error = {
      message: 'Duplicate entry - this record already exists',
      status: 409
    };
  } else if (err.code === 'SQLITE_CONSTRAINT_FOREIGNKEY') {
    error = {
      message: 'Referenced record not found',
      status: 400
    };
  } else if (err.code === 'SQLITE_CONSTRAINT_NOTNULL') {
    error = {
      message: 'Required field is missing',
      status: 400
    };
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    error = {
      message: 'Validation failed',
      status: 400,
      details: err.details
    };
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = {
      message: 'Invalid token',
      status: 401
    };
  } else if (err.name === 'TokenExpiredError') {
    error = {
      message: 'Token expired',
      status: 401
    };
  }

  // Rate limit errors
  if (err.status === 429) {
    error = {
      message: 'Too many requests',
      status: 429
    };
  }

  // Send error response
  res.status(error.status).json({
    success: false,
    error: error.message,
    ...(error.details && { details: error.details }),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};
