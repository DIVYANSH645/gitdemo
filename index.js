
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import transactionRoutes from "./routes/transactionRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGODB_URL;

app.use(cors());

// Connecting to MongoDB Database
mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Connected to ${mongoUrl}`);
  })
  .catch((err) => {
    console.log(err);
  });

// Defining the API routes
app.get("/", (req, res) => {
  res.send("Hello Roxiler Systems!");
});

app.use("/", transactionRoutes);

// Starting the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
