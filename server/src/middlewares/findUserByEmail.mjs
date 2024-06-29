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
      user.id = admin._id;
      user.name = admin.admin_name;
      user.email = admin.admin_email;
      user.role = "admin";
      user.password = admin.admin_password;
    }

    const depositor = await Depositor.findOne({ depositor_email: email });
    if (depositor) {
      user = depositor;
      user.id = depositor._id;
      user.name = depositor.depositor_name;
      user.email = depositor.depositor_email;
      user.role = "depositor";
      user.password = depositor.depositor_password;
    }

    const bidder = await Bidder.findOne({ bidder_email: email });
    if (bidder) {
      user = bidder;
      user.id = bidder._id;
      user.name = bidder.bidder_name;
      user.email = bidder.bidder_email;
      user.role = "bidder";
      user.password = bidder.bidder_password;
    }

    if (user) {
      req.user = user;
    }

    next();
  } catch (err) {
    next(err);
  }
};

export default findUserByEmail;
