// Request logging middleware
export const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  // Log request
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - ${req.ip}`);
  
  // Override res.end to log response
  const originalEnd = res.end;
  res.end = function(chunk, encoding) {
    const duration = Date.now() - start;
    const status = res.statusCode;
    
    // Log response
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - ${status} - ${duration}ms`);
    
    // Call original end
    originalEnd.call(this, chunk, encoding);
  };
  
  next();
};
