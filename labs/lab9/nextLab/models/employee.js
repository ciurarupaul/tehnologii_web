import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const Employee = sequelize.define(
  "Employee",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: DataTypes.STRING,
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      // 3. adaugă un validator suplimentar pe entitate pentru ca numele să aibă între 3 și 10 caractere.
      validate: {
        len: [3, 10],
      },
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    birthYear: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1900,
      },
    },

    // 2. adaugă un câmp suplimentar “salary”, cu o valoare default de 0 și cu o validare pentru valoarea minimă de 0.
    salary: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
  },
  {
    tableName: "Employees",
  }
);

export default Employee;
