import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define("Project", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    start_date: { type: DataTypes.DATE },
    end_date: { type: DataTypes.DATE },
    status: { type: DataTypes.ENUM("planned", "active", "completed"), defaultValue: "planned" },
    created_by: { type: DataTypes.INTEGER },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, { tableName: "projects", timestamps: false });
};
