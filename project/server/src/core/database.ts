import dotenv from "dotenv";

dotenv.config();

const databaseUrl = process.env.DATABASE;

if (!databaseUrl) {
  console.error("Database connection failed!");
  process.exit(1);
}

const database = databaseUrl.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD || ""
);

export default database;
