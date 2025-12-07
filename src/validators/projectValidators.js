import { body, param, query } from "express-validator";

export const createProjectValidation = [
  body("name")
    .notEmpty()
    .withMessage("Project name is required")
    .isLength({ max: 100 })
    .withMessage("Project name can be max 100 characters"),
  
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),

  body("start_date")
    .optional()
    .isISO8601()
    .withMessage("Start date must be a valid date"),

  body("end_date")
    .optional()
    .isISO8601()
    .withMessage("End date must be a valid date"),

  body("status")
    .optional()
    .isIn(["planned", "active", "completed"])
    .withMessage("Status must be one of planned, active, completed"),
];

export const updateProjectValidation = [
  param("id").isInt().withMessage("Project ID must be an integer"),
  ...createProjectValidation // reuse project fields validation
];
