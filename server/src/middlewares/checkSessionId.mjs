export const checkSessionId = (req, res, next) => {
  const { user_id } = req.body;
  if (!user_id) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};
