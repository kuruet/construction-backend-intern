import { body } from "express-validator";

// Validation rules for creating a Daily Progress Report (DPR)
export const createDailyReportValidation = [
  body("date")
    .notEmpty()
    .withMessage("Date is required")
    .isISO8601()
    .withMessage("Date must be in format YYYY-MM-DD"),

  body("work_done")
    .notEmpty()
    .withMessage("Work done is required")
    .isString()
    .withMessage("Work done must be a string"),

  body("issues")
    .optional()
    .isString()
    .withMessage("Issues must be a string if provided"),

  body("weather")
    .optional()
    .isString()
    .withMessage("Weather must be a string if provided"),

  body("worker_count")
    .optional()
    .isNumeric()
    .withMessage("Worker count must be a number"),
];

// Validation rules for updating a Daily Progress Report
export const updateDailyReportValidation = [
  body("date")
    .optional()
    .isISO8601()
    .withMessage("Date must be in format YYYY-MM-DD"),

  body("work_done")
    .optional()
    .isString()
    .withMessage("Work done must be a string"),

  body("issues")
    .optional()
    .isString(),

  body("weather")
    .optional()
    .isString(),

  body("worker_count")
    .optional()
    .isNumeric()
];
