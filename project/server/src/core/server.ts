import mongoose from "mongoose";
import app from "./app";
import database from "./database";

mongoose.connect(database).then(() => {
  console.log("Database connection successful!");
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
