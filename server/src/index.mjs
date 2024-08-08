import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
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

// Express App Setup
const app = express();
const cors = require('cors');
app.use(cors({
  origin: 'https://desky-kappa.vercel.app/', // Replace with your actual Vercel app URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));



app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(depositorRouter);
app.use(bidderRouter);
app.use(offerRouter);
app.use(adminRouter);
app.use(authRouter);

// Start server after database connection
connectToDatabase().then(() => {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

export default app;
