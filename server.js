import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
import app from "./app.js";

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log("DB connection successful!"));

const PORT = process.env.PORT || 3182;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
