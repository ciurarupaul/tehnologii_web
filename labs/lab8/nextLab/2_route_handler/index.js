"use strict";

import express from "express";
import departmentsRouter from "./routes/departments.js";
import statusRouter from "./routes/status.js";

const app = express();

// implementează un middleware care să scrie la consolă metoda și URL-ul fiecărei cereri HTTP primite de server
const logRequestDetails = (req, res, next) => {
  console.log(`method: ${req.method}\nurl: ${req.url}`);
  next();
};

app.use(logRequestDetails);

app.use("/api", departmentsRouter);
app.use("/status", statusRouter);

// adaugă un nou handler de erori, înaintea celui existent, care să afișeze la consolă stackul erorii (err.stack).
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

app.set("port", 7000);

app.listen(app.get("port"), () => {
  console.log(`Server started on http://localhost:${app.get("port")}`);
});
