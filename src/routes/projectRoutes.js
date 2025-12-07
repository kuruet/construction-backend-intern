import express from "express";
const router = express.Router();

import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject
} from "../controllers/projectController.js";

import {
  createDailyReport,
  getAllDailyReportsByProject
} from "../controllers/dailyReportController.js";

import { protect, authorize } from "../middlewares/auth.js";

// Import validators
import {
  createProjectValidation,
  updateProjectValidation
} from "../validators/projectValidators.js";

import { createDailyReportValidation } from "../validators/dailyReportValidators.js";

// Import validation handler
import { validateRequest } from "../middlewares/validate.js";

// -----------------------
// PROJECT ROUTES
// -----------------------

// CREATE Project (admin + manager)
router.post(
  "/",
  protect,
  authorize("admin", "manager"),
  createProjectValidation,
  validateRequest,
  createProject
);

// GET All Projects
router.get("/", protect, getAllProjects);

// GET Project by ID
router.get("/:id", protect, getProjectById);

// UPDATE Project (admin + manager)
router.put(
  "/:id",
  protect,
  authorize("admin", "manager"),
  updateProjectValidation,
  validateRequest,
  updateProject
);

// DELETE Project (admin only)
router.delete("/:id", protect, authorize("admin"), deleteProject);

// -----------------------
// DPR ROUTES NESTED UNDER PROJECT
// -----------------------

// CREATE DPR for a project (worker, manager, admin)
router.post(
  "/:id/dpr",
  protect,
  authorize("worker", "manager", "admin"),
  createDailyReportValidation,
  validateRequest,
  createDailyReport
);

// GET All DPRs for a project (worker, manager, admin)
router.get(
  "/:id/dpr",
  protect,
  authorize("worker", "manager", "admin"),
  getAllDailyReportsByProject
);

export default router;
