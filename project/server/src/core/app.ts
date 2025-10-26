import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: `${process.env.LOCAL_CLIENT_URL}`,
    allowedHeaders: undefined,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    // allow credentials (cookies, authorization headers, ....)
    credentials: true,
  })
);

// parsing
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(compression());

export default app;
