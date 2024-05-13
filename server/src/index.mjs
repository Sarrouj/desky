// Packages
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
const app = express();
dotenv.config({ path: ".env.local" });

// Routes
import depositorRouter from "./routes/depositor.mjs";
import bidderRouter from "./routes/bidder.mjs";

// Database connection
mongoose
  .connect(
    `mongodb+srv://admin_fahd:${process.env.database_password}@desky.3gsnang.mongodb.net/Desky`
  )
  .then(() => {
    console.log("Connected to database");
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

// Middlewares
app.use(express.json());
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(depositorRouter);
app.use(bidderRouter);

