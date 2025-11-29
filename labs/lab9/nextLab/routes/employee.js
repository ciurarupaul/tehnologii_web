import Employee from "../models/employee.js";
import express from "express";
import { Op } from "sequelize";

const router = express.Router();

router
  .route("/employees")
  .get(async (req, res) => {
    try {
      const { minSalary, name, simplified, sortOrder } = req.query;
      const filters = {};

      if (minSalary) filters.salary = { [Op.gt]: minSalary };
      // 5. implementează o condiție de filtrare a angajaților după nume.
      if (name) filters.lastName = { [Op.like]: `%${name}%` };

      const employees = await Employee.findAll({
        where: filters,
        attributes: simplified ? { exclude: "id" } : undefined,

        // 6. implementează o sortare (ordonare) pentru query-ul get all employees, în funcție de un câmp primit ca și query param
        order: sortOrder ? ["lastName", sortOrder] : undefined,
      });

      return res.status(200).json(employees);
    } catch (err) {
      console.error("get route error", err);
      return res.status(500).json(err.message);
    }
  })
  .post(async (req, res) => {
    try {
      const newEmployee = await Employee.create(req.body);
      return res.status(201).json(newEmployee);
    } catch (err) {
      console.error("post route error", err);
      return res.status(500).json(err.message);
    }
  });

router
  .route("/employees/:id")
  .get(async (req, res) => {
    try {
      const employee = await Employee.findByPk(req.params.id);
      return employee
        ? res.status(200).json(employee)
        : res.status(404).json({
            error: "Employee with ID " + req.params.id + " not found",
          });
    } catch (err) {
      console.error("get route error", err);
      return res.status(500).json(err.message);
    }
  })
  .put(async (req, res) => {
    try {
      const employee = await Employee.findByPk(req.params.id);

      if (employee) {
        const updatedEmployee = employee.update(req.body);
        return res.status(200).json(updatedEmployee);
      } else {
        return res.status(404).json({
          error: "Employee with ID " + req.params.id + " not found",
        });
      }
    } catch (err) {
      console.error("put route error", err);
      return res.status(500).json(err.message);
    }
  })
  // 4. implementează ștergerea unei înregistrări pe un nou endpoint
  .delete(async (req, res) => {
    try {
      const deletedCount = await Employee.destroy({
        where: { id: req.params.id },
      });

      if (deletedCount === 0) {
        return res.status(404).json({
          error: "Employee with ID " + req.params.id + " not found",
        });
      }

      return res.status(204);
    } catch (err) {
      console.error("delete route error", err);
      return res.status(500).json(err.message);
    }
  });

export default router;
