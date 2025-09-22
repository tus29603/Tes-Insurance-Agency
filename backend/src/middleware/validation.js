import { body, validationResult } from 'express-validator';

// Lead data validation
export const validateLeadData = [
  body('leadData.name')
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage('Name must be between 2 and 255 characters'),
  
  body('leadData.email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  
  body('leadData.phone')
    .trim()
    .isLength({ min: 10, max: 20 })
    .withMessage('Valid phone number is required'),
  
  body('leadData.zip_code')
    .trim()
    .isLength({ min: 5, max: 10 })
    .withMessage('Valid zip code is required'),
  
  body('leadData.coverage_type')
    .isIn(['Auto', 'Home', 'Renters', 'Landlord', 'Umbrella', 'Commercial Auto', 'General Liability', 'Workers Comp'])
    .withMessage('Valid coverage type is required'),
  
  body('leadDetails.date_of_birth')
    .optional()
    .isISO8601()
    .withMessage('Valid date of birth is required'),
  
  body('leadDetails.license_number')
    .optional()
    .trim()
    .isLength({ min: 5, max: 50 })
    .withMessage('Valid license number is required'),
  
  body('leadDetails.vehicle_year')
    .optional()
    .isInt({ min: 1980, max: new Date().getFullYear() + 1 })
    .withMessage('Valid vehicle year is required'),
  
  body('leadDetails.num_employees')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Number of employees must be a positive integer'),
  
  body('leadDetails.annual_payroll')
    .optional()
    .isDecimal({ decimal_digits: '0,2' })
    .withMessage('Annual payroll must be a valid decimal'),
  
  // Custom validation function
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }
    next();
  }
];

// Contact message validation
export const validateContactMessage = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage('Name must be between 2 and 255 characters'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  
  body('subject')
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage('Subject must be less than 255 characters'),
  
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }
    next();
  }
];

// Analytics event validation
export const validateAnalyticsEvent = [
  body('event_type')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Event type is required'),
  
  body('event_category')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Event category must be less than 100 characters'),
  
  body('event_label')
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage('Event label must be less than 255 characters'),
  
  body('event_value')
    .optional()
    .isDecimal()
    .withMessage('Event value must be a valid decimal'),
  
  body('page_url')
    .optional()
    .isURL()
    .withMessage('Page URL must be a valid URL'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }
    next();
  }
];

// User validation
export const validateUser = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
  
  body('first_name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('First name is required'),
  
  body('last_name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Last name is required'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }
    next();
  }
];
