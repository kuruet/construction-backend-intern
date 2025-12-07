import { DailyReport } from '../models/index.js';
import { Project } from '../models/index.js';
import { User } from '../models/index.js'; // for including user info in project DPRs

// ----------------------
// Existing working functions
// ----------------------

// Create a new daily report
export const createDailyReport = async (req, res) => {
  try {
    const { project_id, date, work_done, issues } = req.params.id;

    // Optional: validate project exists
    const project = await Project.findByPk(project_id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const dailyReport = await DailyReport.create({
      project_id,
      user_id: req.user.id, // logged in user
      date,
      work_done,
      issues
    });

    res.status(201).json({ dailyReport, message: 'Daily report created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all daily reports
export const getAllDailyReports = async (req, res) => {
  try {
    const reports = await DailyReport.findAll();
    res.status(200).json({ reports });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get a single daily report by ID
export const getDailyReportById = async (req, res) => {
  try {
    const report = await DailyReport.findByPk(req.params.id);
    if (!report) return res.status(404).json({ message: 'Daily report not found' });
    res.status(200).json({ report });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update a daily report
export const updateDailyReport = async (req, res) => {
  try {
    const report = await DailyReport.findByPk(req.params.id);
    if (!report) return res.status(404).json({ message: 'Daily report not found' });

    await report.update(req.body);
    res.status(200).json({ report, message: 'Daily report updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a daily report
export const deleteDailyReport = async (req, res) => {
  try {
    const report = await DailyReport.findByPk(req.params.id);
    if (!report) return res.status(404).json({ message: 'Daily report not found' });

    await report.destroy();
    res.status(200).json({ message: 'Daily report deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// ----------------------
// NEW FUNCTION: Get all DPRs for a specific project
// ----------------------
export const getAllDailyReportsByProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    // Optional: validate project exists
    const project = await Project.findByPk(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const reports = await DailyReport.findAll({
      where: { project_id: projectId },
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email', 'role'],
        },
      ],
      order: [['date', 'ASC']],
    });

    res.status(200).json({ reports });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
