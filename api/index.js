import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user-route.js";
dotenv.config();
const app = express();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log(`MONGODB connected successfully`);
  })
  .catch((e) => {
    console.log(e);
  });
app.listen(process.env.PORT, () => {
  console.log(`Server listining on port ${process.env.PORT}`);
});

//Path : api routes
app.use("/api/routes", userRoutes);
