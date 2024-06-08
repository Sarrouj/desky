import mongoose from "mongoose";

export const checkObjectId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }
  next();
};

export const validateSessionUser = (req, res, next) => {
  if (!req.session || !req.session.user || !req.session.user.id) {
    return res.status(401).json({ error: "Unauthorized access" });
  }
  next();
};  
