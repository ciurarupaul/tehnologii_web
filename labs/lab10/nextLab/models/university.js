import sequelize from "../sequelize.js";
import { DataTypes } from "sequelize";

const University = sequelize.define("university", {
  universityName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 20],
    },
  },
});

export default University;
