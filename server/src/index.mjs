// Packages
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";
const app = express();
dotenv.config({ path: ".env.local" });

// Routes
import depositorRouter from "./routes/depositor.mjs";
import bidderRouter from "./routes/bidder.mjs";
import offerRouter from "./routes/offer.mjs";
import adminRouter from "./routes/admin.mjs";
import authRouter from "./routes/auth.mjs";

// Database connection
const connectToDatabase = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.database_connection);
      console.log("Connected to database");
    } else {
      console.log("Already connected to database");
    }
  } catch (err) {
    console.error("Database connection error:", err);
  }
};

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(depositorRouter);
app.use(bidderRouter);
app.use(offerRouter);
app.use(adminRouter);
app.use(authRouter);

// JWT Authentication (development only)
app.post("/decode-jwt", (req, res) => {
  const { token } = req.session;
  const secret = process.env.JWT_SECRET;

  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, secret);
    res.status(200).json({ decoded });
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
});

connectToDatabase().then(() => {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
