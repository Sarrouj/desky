  import mongoose from "mongoose";
  import multer from "multer";
  import { GridFsStorage } from "multer-gridfs-storage";
  import { GridFSBucket } from "mongodb";
  import path from "path";
  import crypto from "crypto";
  import dotenv from "dotenv";
  dotenv.config({ path: ".env.local" });

  const conn = mongoose.connection;

  let gridFSBucket;

  conn.once("open", () => {
    gridFSBucket = new GridFSBucket(conn.db, {
      bucketName: "uploads",
    });
  });

  const storage = new GridFsStorage({
    url: process.env.database_connection,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString("hex") + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: "uploads",
          };
          resolve(fileInfo);
        });
      });
    },
  });

  const upload = multer({ storage });
  export default upload;