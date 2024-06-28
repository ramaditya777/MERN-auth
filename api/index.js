import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
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
