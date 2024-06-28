import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user-route.js";
import authRoutes from "./routes/auth-route.js";

const app = express();
//Use of dotenv file
dotenv.config();
//work with JSON
app.use(express.json());
//DB Connection
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
app.use("/api/auth", authRoutes);
