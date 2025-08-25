import express from "express";
import cors from "cors";
import apiRoute from "./router/index.js";
import { connectDB } from "./config/mongodb.js";

connectDB();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/", apiRoute);

// route not found middleware
app.use((req, res, next) => {
  const error = new Error("Not found...");
  error.status = 404;
  return next(error);
});
// centralized error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  // send error to client
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error.",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} ✅ 🙌`);
});
