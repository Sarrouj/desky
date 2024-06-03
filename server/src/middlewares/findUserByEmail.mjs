import Admin from "../mongoose/schemas/Admin.mjs";
import Depositor from "../mongoose/schemas/Depositor.mjs";
import Bidder from "../mongoose/schemas/Bidder.mjs";

const findUserByEmail = async (req, res, next) => {
  const { email } = req.body;
  let user = null;

  try {
    const admin = await Admin.findOne({ admin_email: email });
    if (admin) {
      user = admin;
      user.role = "admin";
      user.password = admin.admin_password; // Ensure password is assigned
    }

    const depositor = await Depositor.findOne({ depositor_email: email });
    if (depositor) {
      user = depositor;
      user.role = "depositor";
      user.password = depositor.depositor_password; // Ensure password is assigned
    }

    const bidder = await Bidder.findOne({ bidder_email: email });
    if (bidder) {
      user = bidder;
      user.role = "bidder";
      user.password = bidder.bidder_password; // Ensure password is assigned
    }

    if (user) {
      req.user = user; // Attach user to the request object
    }

    next();
  } catch (err) {
    next(err);
  }
};

export default findUserByEmail;
