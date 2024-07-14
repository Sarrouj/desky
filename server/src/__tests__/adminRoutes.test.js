// Packages
import request from "supertest";
import express from "express";
import router from "../routes/admin.mjs";

// Schemas
import Depositors from "../mongoose/schemas/Depositor.mjs";
import Bidders from "../mongoose/schemas/Bidder.mjs";
import Offers from "../mongoose/schemas/offer.mjs";
import Admins from "../mongoose/schemas/Admin.mjs";

// Mock Nodemailer
jest.mock("nodemailer", () => {
  return {
    createTransport: jest.fn().mockReturnValue({
      sendMail: jest.fn().mockResolvedValue(true),
    }),
  };
});

// Express App Setup
const app = express();
app.use(express.json());
app.use(router);

// Mock Middleware Functions and Schemas
jest.mock("../middlewares/checkObjectId.mjs", () => ({
  checkObjectId: jest.fn((req, res, next) => next()),
}));
jest.mock("../middlewares/checkSessionId.mjs", () => ({
  checkSessionId: jest.fn((req, res, next) => next()),
}));
jest.mock("../middlewares/errorMiddleware.mjs", () => ({
  handleErrors: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
  },
}));
jest.mock("../utils/ratingValidationFields.mjs", () => ({
  __esModule: true,
  default: [
    (req, res, next) => next(),
    (req, res, next) => next(),
    (req, res, next) => next(),
    (req, res, next) => next(),
  ],
}));
jest.mock("../utils/emailSend.mjs", () => ({
  transporter: jest.requireActual("nodemailer").createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  }),
}));

jest.mock("../mongoose/schemas/Admin.mjs");
jest.mock("../mongoose/schemas/Depositor.mjs");
jest.mock("../mongoose/schemas/Bidder.mjs");
jest.mock("../mongoose/schemas/Offer.mjs");

// Tests
describe("Admins", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Verifying Bidder's Info
  describe("PUT /admin/bidder/verify/:bidder_id", () => {
    // it("should verify bidder's info", async () => {
    //   Admins.findById.mockResolvedValue({
    //     _id: "123",
    //     name: "test",
    //   });

    //   Bidders.findById.mockResolvedValue({
    //     _id: "456",
    //     name: "test",
    //     bidder_email: "fahd.suirita@gmail.com",
    //     save: jest.fn().mockResolvedValue(true),
    //   });

    //   const res = await request(app)
    //     .put("/admin/bidder/verify/456")
    //     .send({ user_id: "123" });

    //   expect(res.statusCode).toBe(200);
    //   expect(res.body.success).toBeDefined();
    // });

    it("should return 404 if no admin found", async () => {
      Admins.findById.mockResolvedValue(null);

      const res = await request(app)
        .put("/admin/bidder/verify/456")
        .send({ user_id: "123" });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Admin not found");
    });

    it("should return 404 if no bidder found", async () => {
      Admins.findById.mockResolvedValue({
        _id: "123",
        name: "test",
      });
      Bidders.findById.mockResolvedValue(null);

      const res = await request(app)
        .put("/admin/bidder/verify/456")
        .send({ user_id: "123" });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Bidder not found");
    });

    it("should return 400 if bidder already verified", async () => {
      Admins.findById.mockResolvedValue({
        _id: "123",
        name: "test",
      });

      Bidders.findById.mockResolvedValue({
        _id: "456",
        name: "test",
        isTrusted: true,
      });

      const res = await request(app)
        .put("/admin/bidder/verify/456")
        .send({ user_id: "123" });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe("Bidder already verified");
    });
  });

  // Refusing Bidder
  describe("PUT /admin/bidder/refuse/:bidder_id", () => {
    // it("should refuse bidder", async () => {
    //   Admins.findById.mockResolvedValue({
    //     _id: "123",
    //     name: "test",
    //   });

    //   Bidders.findById.mockResolvedValue({
    //     _id: "456",
    //     name: "test",
    //   });

    //   const res = await request(app)
    //     .put("/admin/bidder/refuse/456")
    //     .send({ user_id: "123", message: "Not trustworthy" });

    //   expect(res.statusCode).toBe(200);
    //   expect(res.body.success).toBeDefined();
    // });

    it("should return 404 if no admin found", async () => {
      Admins.findById.mockResolvedValue(null);

      const res = await request(app)
        .put("/admin/bidder/refuse/456")
        .send({ user_id: "123", message: "Not trustworthy" });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Admin not found");
    });

    it("should return 404 if no bidder found", async () => {
      Admins.findById.mockResolvedValue({
        _id: "123",
        name: "test",
      });
      Bidders.findById.mockResolvedValue(null);

      const res = await request(app)
        .put("/admin/bidder/refuse/456")
        .send({ user_id: "123", message: "Not trustworthy" });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Bidder not found");
    });
  });

  // Verifying Depositor
  describe("PUT /admin/depositor/verify/:depositor_id", () => {
    // it("should verify depositor", async () => {
    //   Admins.findById.mockResolvedValue({
    //     _id: "123",
    //     name: "test",
    //   });

    //   Depositors.findById.mockResolvedValue({
    //     _id: "456",
    //     name: "test",
    //     save: jest.fn().mockResolvedValue(true),
    //   });

    //   const res = await request(app)
    //     .put("/admin/depositor/verify/456")
    //     .send({ user_id: "123" });

    //   expect(res.statusCode).toBe(200);
    //   expect(res.body.success).toBeDefined();
    // });

    it("should return 404 if no admin found", async () => {
      Admins.findById.mockResolvedValue(null);

      const res = await request(app)
        .put("/admin/depositor/verify/456")
        .send({ user_id: "123" });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Admin not found");
    });

    it("should return 404 if no depositor found", async () => {
      Admins.findById.mockResolvedValue({
        _id: "123",
        name: "test",
      });
      Depositors.findById.mockResolvedValue(null);

      const res = await request(app)
        .put("/admin/depositor/verify/456")
        .send({ user_id: "123" });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("depositor not found");
    });

    it("should return 400 if depositor already verified", async () => {
      Admins.findById.mockResolvedValue({
        _id: "123",
        name: "test",
      });

      Depositors.findById.mockResolvedValue({
        _id: "456",
        name: "test",
        isTrusted: true,
      });

      const res = await request(app)
        .put("/admin/depositor/verify/456")
        .send({ user_id: "123" });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe("depositor already verified");
    });
  });

  // Refusing Depositor
  describe("PUT /admin/depositor/refuse/:depositor_id", () => {
    // it("should refuse depositor", async () => {
    //   Admins.findById.mockResolvedValue({
    //     _id: "123",
    //     name: "test",
    //   });

    //   Depositors.findById.mockResolvedValue({
    //     _id: "456",
    //     name: "test",
    //   });

    //   const res = await request(app)
    //     .put("/admin/depositor/refuse/456")
    //     .send({ user_id: "123", message: "Not trustworthy" });

    //   expect(res.statusCode).toBe(200);
    //   expect(res.body.success).toBeDefined();
    // });

    it("should return 404 if no admin found", async () => {
      Admins.findById.mockResolvedValue(null);

      const res = await request(app)
        .put("/admin/depositor/refuse/456")
        .send({ user_id: "123", message: "Not trustworthy" });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Admin not found");
    });

    it("should return 404 if no depositor found", async () => {
      Admins.findById.mockResolvedValue({
        _id: "123",
        name: "test",
      });
      Depositors.findById.mockResolvedValue(null);

      const res = await request(app)
        .put("/admin/depositor/refuse/456")
        .send({ user_id: "123", message: "Not trustworthy" });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("depositor not found");
    });
  });

  // Verifying Offer
  describe("PUT /admin/offer/verify/:offer_id", () => {
    // it("should verify offer", async () => {
    //   Admins.findById.mockResolvedValue({
    //     _id: "123",
    //     name: "test",
    //   });

    //   Offers.findById.mockResolvedValue({
    //     _id: "456",
    //     name: "test",
    //     status: "pending",
    //     depositor_id: "789",
    //     offer_title: "Offer Test",
    //     save: jest.fn().mockResolvedValue(true),
    //   });

    //   Depositors.findById.mockResolvedValue({
    //     _id: "789",
    //     depositor_email: "depositor@example.com",
    //     depositor_CB: 0,
    //     save: jest.fn().mockResolvedValue(true),
    //   });

    //   const res = await request(app)
    //     .put("/admin/offer/verify/456")
    //     .send({ user_id: "123" });

    //   expect(res.statusCode).toBe(200);
    //   expect(res.body.success).toBeDefined();
    // });

    it("should return 404 if no admin found", async () => {
      Admins.findById.mockResolvedValue(null);

      const res = await request(app)
        .put("/admin/offer/verify/456")
        .send({ user_id: "123" });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Admin not found");
    });

    it("should return 404 if no offer found", async () => {
      Admins.findById.mockResolvedValue({
        _id: "123",
        name: "test",
      });
      Offers.findById.mockResolvedValue(null);

      const res = await request(app)
        .put("/admin/offer/verify/456")
        .send({ user_id: "123" });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Offer not found");
    });

    it("should return 400 if offer already verified", async () => {
      Admins.findById.mockResolvedValue({
        _id: "123",
        name: "test",
      });

      Offers.findById.mockResolvedValue({
        _id: "456",
        name: "test",
        status: "open",
      });

      const res = await request(app)
        .put("/admin/offer/verify/456")
        .send({ user_id: "123" });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe("Offer already verified");
    });
  });

  // Refusing Offer
  describe("PUT /admin/offer/refuse/:offer_id", () => {
    // it("should refuse offer", async () => {
    //   Admins.findById.mockResolvedValue({
    //     _id: "123",
    //     name: "test",
    //   });

    //   Offers.findById.mockResolvedValue({
    //     _id: "456",
    //     name: "test",
    //     status: "pending",
    //     depositor_id: "789",
    //     offer_title: "Offer Test",
    //     save: jest.fn().mockResolvedValue(true),
    //   });

    //   Depositors.findById.mockResolvedValue({
    //     _id: "789",
    //     depositor_email: "depositor@example.com",
    //     save: jest.fn().mockResolvedValue(true),
    //   });

    //   const res = await request(app)
    //     .put("/admin/offer/refuse/456")
    //     .send({ user_id: "123", message: "Not trustworthy" });

    //   expect(res.statusCode).toBe(200);
    //   expect(res.body.success).toBeDefined();
    // });

    it("should return 404 if no admin found", async () => {
      Admins.findById.mockResolvedValue(null);

      const res = await request(app)
        .put("/admin/offer/refuse/456")
        .send({ user_id: "123", message: "Not trustworthy" });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Admin not found");
    });

    it("should return 404 if no offer found", async () => {
      Admins.findById.mockResolvedValue({
        _id: "123",
        name: "test",
      });
      Offers.findById.mockResolvedValue(null);

      const res = await request(app)
        .put("/admin/offer/refuse/456")
        .send({ user_id: "123", message: "Not trustworthy" });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Offer not found");
    });

    it("should return 400 if offer already refused", async () => {
      Admins.findById.mockResolvedValue({
        _id: "123",
        name: "test",
      });

      Offers.findById.mockResolvedValue({
        _id: "456",
        name: "test",
        status: "rejected",
      });

      const res = await request(app)
        .put("/admin/offer/refuse/456")
        .send({ user_id: "123", message: "Not trustworthy" });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe("Offer already refused");
    });
  });

  // Add Admin
  describe("POST /admin/add", () => {
    it("should add admin", async () => {
      Admins.findOne.mockResolvedValue(null);

      const res = await request(app).post("/admin/add").send({
        admin_name: "admin",
        admin_email: "admin@example.com",
        admin_password: "password",
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBeDefined();
    });

    it("should return 400 if email already exists", async () => {
      Admins.findOne.mockResolvedValue({
        admin_email: "admin@example.com",
      });

      const res = await request(app).post("/admin/add").send({
        admin_name: "admin",
        admin_email: "admin@example.com",
        admin_password: "password",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe("email already exists");
    });
  });
});
