import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Initialize Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    logging: false
  }
);

// Import models
import UserModel from "./User.js";
import ProjectModel from "./Project.js";
import DailyReportModel from "./DailyReport.js";

// Initialize models
const User = UserModel(sequelize);
const Project = ProjectModel(sequelize);
const DailyReport = DailyReportModel(sequelize);

// Define relationships
Project.hasMany(DailyReport, { foreignKey: "project_id" });
DailyReport.belongsTo(Project, { foreignKey: "project_id" });

User.hasMany(DailyReport, { foreignKey: "user_id" });
DailyReport.belongsTo(User, { foreignKey: "user_id" });

export { sequelize, User, Project, DailyReport };
export default { sequelize, User, Project, DailyReport };
