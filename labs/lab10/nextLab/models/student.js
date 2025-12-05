import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const Student = sequelize.define("student", {
  studentFullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  studentStatus: {
    type: DataTypes.ENUM,
    allowNull: false,
    values: ["ACTIVE", "INACTIVE", "FREEZED"],
  },
});

export default Student;
