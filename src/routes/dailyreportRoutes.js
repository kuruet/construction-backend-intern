import express from 'express';
const router = express.Router();

import {
  createDailyReport,
  getAllDailyReports,
  getDailyReportById,
  updateDailyReport,
  deleteDailyReport
} from '../controllers/dailyReportController.js';

import { protect, authorize } from '../middlewares/auth.js';

// Import validators
import {
  createDailyReportValidation,
  updateDailyReportValidation
} from '../validators/dailyReportValidators.js';

// Import validation handler
import { validateRequest } from '../middlewares/validate.js';

// Protect all routes
router.use(protect);

// CREATE DPR (worker, manager, admin)
router.post(
  "/:projectId/dpr",
  authorize("worker", "manager", "admin"),
  createDailyReportValidation,
  validateRequest,
  createDailyReport
);
console.log("DPR route hit");


// READ DPRs
router.get(
  "/:projectId/dpr",
  authorize("worker", "manager", "admin"),
  getAllDailyReports
);

router.get(
  "/:id",
  authorize("worker", "manager", "admin"),
  getDailyReportById
);

// UPDATE DPR (manager, admin)
router.put(
  "/:id",
  authorize("manager", "admin"),
  updateDailyReportValidation,
  validateRequest,
  updateDailyReport
);

// DELETE DPR (admin only)
router.delete(
  "/:id",
  authorize("admin"),
  deleteDailyReport
);

export default router;
