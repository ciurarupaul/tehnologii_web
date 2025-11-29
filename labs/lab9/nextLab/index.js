"use strict";

import express from "express";
import sequelize from "./sequelize.js";
import employee from "./models/employee.js";
import EmployeeRouter from "./routes/employee.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("port", process.env.PORT || 7000);

app.listen(app.get("port"), async () => {
  console.log(`Server started on port ${app.get("port")}`);
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully!");
  } catch (err) {
    console.error("Unable to connect to database: ", err.message);
  }
});

app.use("/api", EmployeeRouter);

app.use((err, req, res, next) => {
  res.status(500).json({ error: "Something broke!" });
});
