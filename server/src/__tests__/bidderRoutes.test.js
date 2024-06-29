// Packages
import request from "supertest";
import express from "express";
import bcrypt from "bcrypt";
import router from "../routes/bidder.mjs";

// Schemas
import Depositors from "../mongoose/schemas/Depositor.mjs";
import Bidders from "../mongoose/schemas/Bidder.mjs";
import Offers from "../mongoose/schemas/Offer.mjs";
import AE from "../mongoose/schemas/AE.mjs";
import Companies from "../mongoose/schemas/Company.mjs";

// Mock nodemailer
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

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

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
jest.mock("../utils/bidderValidationFields.mjs", () => ({
  __esModule: true,
  default: [
    (req, res, next) => next(),
    (req, res, next) => next(),
    (req, res, next) => next(),
    (req, res, next) => next(),
    (req, res, next) => next(),
    (req, res, next) => next(),
    (req, res, next) => next(),
    (req, res, next) => next(),
  ],
}));
jest.mock("../utils/AEValidationFields.mjs", () => ({
  __esModule: true,
  default: [
    (req, res, next) => next(),
    (req, res, next) => next(),
    (req, res, next) => next(),
    (req, res, next) => next(),
    (req, res, next) => next(),
  ],
}));
jest.mock("../utils/companyValidationFields.mjs", () => ({
  __esModule: true,
  default: [
    (req, res, next) => next(),
    (req, res, next) => next(),
    (req, res, next) => next(),
    (req, res, next) => next(),
    (req, res, next) => next(),
    (req, res, next) => next(),
    (req, res, next) => next(),
    (req, res, next) => next(),
    (req, res, next) => next(),
  ],
}));
jest.mock("../utils/ratingValidationFields.mjs", () => ({
  __esModule: true,
  default: [
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

jest.mock("../mongoose/schemas/Depositor.mjs");
jest.mock("../mongoose/schemas/Bidder.mjs");
jest.mock("../mongoose/schemas/Offer.mjs");
jest.mock("../mongoose/schemas/AE.mjs");
jest.mock("../mongoose/schemas/Company.mjs");

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Tests
describe("Bidders", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

  describe("POST /bidder", () => {
    it("should return Bidder Profile Info", async () => {
      Bidders.findById.mockResolvedValue({
        _id: "123",
        bidder: "test",
      });

      const res = await request(app).post("/bidder").send({ user_id: "123" });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBeDefined();
    });

    it("should return 404 if no bidder found", async () => {
      Bidders.findById.mockResolvedValue(null);

      const res = await request(app).post("/bidder").send({ user_id: "123" });
      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Bidder not found");
    });
  });

  // \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

  describe("GET /bidder/:id", () => {
    it("should return Bidder info", async () => {
      Bidders.findById.mockResolvedValue({
        _id: "123",
        bidder: "test",
      });

      const res = await request(app).get("/bidder/123");

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBeDefined();
    });

    it("should return 404 if no bidder found", async () => {
      Bidders.findById.mockResolvedValue(null);

      const res = await request(app).get("/bidder/123");

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Bidder not found");
    });
  });

  // \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

  describe("GET /bidder/info/:id", () => {
    it("should return AE info if exists", async () => {
      Bidders.findById.mockResolvedValue({ _id: "123" });
      AE.findById.mockResolvedValue({ _id: "123", ae_info: "info" });
      Companies.findById.mockResolvedValue(null);

      const res = await request(app).get("/bidder/info/123");

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBeDefined();
    });

    it("should return Company info if exists", async () => {
      Bidders.findById.mockResolvedValue({ _id: "123" });
      AE.findById.mockResolvedValue(null);
      Companies.findById.mockResolvedValue({
        _id: "123",
        company_info: "info",
      });

      const res = await request(app).get("/bidder/info/123");

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBeDefined();
    });

    it("should return 404 if no info found", async () => {
      Bidders.findById.mockResolvedValue({ _id: "123" });
      AE.findById.mockResolvedValue(null);
      Companies.findById.mockResolvedValue(null);

      const res = await request(app).get("/bidder/info/123");

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Bidder info not found");
    });

    it("should return 404 if no bidder found", async () => {
      Bidders.findById.mockResolvedValue(null);

      const res = await request(app).get("/bidder/info/123");

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Bidder not found");
    });
  });

  // \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

  describe("PUT /edit/bidder", () => {
    it("should update Bidder info", async () => {
      const hashedPassword = await bcrypt.hash("newPassword", 10);
      Bidders.findById.mockResolvedValue({
        _id: "123",
        bidder_name: "test",
        bidder_email: "test@example.com",
        bidder_password: hashedPassword,
        save: jest.fn().mockResolvedValue(true),
      });

      const res = await request(app).put("/edit/bidder").send({
        user_id: "123",
        bidder_name: "new name",
        bidder_email: "new@example.com",
        bidder_password: "newPassword",
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(
        "Bidder's information updated successfully"
      );
    });

    it("should return 404 if no bidder found", async () => {
      Bidders.findById.mockResolvedValue(null);

      const res = await request(app).put("/edit/bidder").send({
        user_id: "123",
        bidder_name: "new name",
        bidder_email: "new@example.com",
        bidder_password: "newPassword",
      });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Bidder not found");
    });
  });

  // \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

  describe("POST /add/bidder/AE", () => {
    // it("should add Auto entrepreneur info", async () => {
    //   Bidders.findOne.mockResolvedValue({
    //     _id: "123",
    //     bidder_name: "test",
    //     bidder_email: "fahd.suirita@gmail.com",
    //   });

    //   const res = await request(app)
    //     .post("/add/bidder/AE")
    //     .send({
    //       AE_CIN: "CIN",
    //       company_name: "name",
    //       AE_phoneNumber: "123456789",
    //       AE_DoA: ["DoA"],
    //       AE_address: "address",
    //       AE_location: "location",
    //     });

    //   expect(res.statusCode).toBe(201);
    //   expect(res.body.success).toBe(
    //     "Auto entrepreneur information added successfully"
    //   );
    // });

    it("should return 404 if no bidder found", async () => {
      Bidders.findOne.mockResolvedValue(null);

      const res = await request(app)
        .post("/add/bidder/AE")
        .send({
          email: "test@example.com",
          AE_CIN: "CIN",
          company_name: "name",
          AE_phoneNumber: "123456789",
          AE_DoA: ["DoA"],
          AE_address: "address",
          AE_location: "location",
        });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("No bidders found");
    });
  });

  // \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

  describe("POST /add/bidder/company", () => {
    // it("should add Company info", async () => {
    //   Bidders.findOne.mockResolvedValue({
    //     _id: "123",
    //     bidder_name: "test",
    //     bidder_email: "fahd.suirita@gmail.com",
    //   });

    //   const res = await request(app).post("/add/bidder/company").send({
    //     company_type: "type",
    //     company_name: "name",
    //     company_phoneNumber: "123456789",
    //     company_address: "address",
    //     company_location: "location",
    //     company_CR: "CR",
    //     company_DoA: "2022-01-01",
    //     company_size: "size",
    //   });

    //   expect(res.statusCode).toBe(201);
    //   expect(res.body.success).toBe("company information added successfully");
    // });

    it("should return 404 if no bidder found", async () => {
      Bidders.findOne.mockResolvedValue(null);

      const res = await request(app).post("/add/bidder/company").send({
        email: "test@example.com",
        company_type: "type",
        company_name: "name",
        company_phoneNumber: "123456789",
        company_address: "address",
        company_location: "location",
        company_CR: "CR",
        company_DoA: "2022-01-01",
        company_size: "size",
      });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("No bidders found");
    });
  });

  // \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

  describe("POST /rate/bidder/:depositor_id/:offer_id", () => {
    it("should add a rating", async () => {
      Bidders.findById.mockResolvedValue({ _id: "123", bidder_name: "test" });
      Depositors.findById.mockResolvedValue({
        _id: "123",
        depositor_review: [],
        save: jest.fn().mockResolvedValue(true),
      });
      Offers.findById.mockResolvedValue({
        _id: "123",
        depositor_id: "123",
        bidder_id: ["123"],
        offer_state: "finished",
      });

      const res = await request(app).post("/rate/bidder/123/123").send({
        rating: 5,
        text: "Great",
        user_id: "123",
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe("rating added successfully");
    });

    it("should return 404 if no bidder found", async () => {
      Bidders.findById.mockResolvedValue(null);

      const res = await request(app).post("/rate/bidder/123/123").send({
        rating: 5,
        text: "Great",
        user_id: "123",
      });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("bidder not found");
    });

    it("should return 404 if no depositor found", async () => {
      Bidders.findById.mockResolvedValue({ _id: "123", bidder_name: "test" });
      Depositors.findById.mockResolvedValue(null);

      const res = await request(app).post("/rate/bidder/123/123").send({
        rating: 5,
        text: "Great",
        user_id: "123",
      });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Depositor not found");
    });

    it("should return 404 if no offer found", async () => {
      Bidders.findById.mockResolvedValue({ _id: "123", bidder_name: "test" });
      Depositors.findById.mockResolvedValue({
        _id: "123",
        depositor_review: [],
      });
      Offers.findById.mockResolvedValue(null);

      const res = await request(app).post("/rate/bidder/123/123").send({
        rating: 5,
        text: "Great",
        user_id: "123",
      });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("offer not found");
    }); 

    it("should return 404 if conditions not met for rating", async () => {
      Bidders.findById.mockResolvedValue({ _id: "123" });
      Depositors.findById.mockResolvedValue({ _id: "456", depositor_review: [] });
      Offers.findById.mockResolvedValue({
        _id: "789",
        bidder_id: "123",
        offer_apply: [{ bidder_id: "456" }],
        offer_state: "active",
      });

      const res = await request(app).post("/rate/bidder/456/789").send({
        user_id: "123",
        rating: 5,
        text: "Great job!",
      });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("You can't rate this depositor");
    });
  });

  // \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

  describe("POST /merge/bidder", () => {
    it("should merge bidder account", async () => {
      Bidders.findById.mockResolvedValue({
        _id: "123",
        bidder_name: "test",
        bidder_email: "test@example.com",
        bidder_password: "password",
        bidder_CB: "CB",
        image: "image",
      });
      Depositors.findById.mockResolvedValue(null);

      const res = await request(app)
        .post("/merge/bidder")
        .send({ user_id: "123" });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe("bidder account merged successfully");
    });

    it("should return 404 if no bidder found", async () => {
      Bidders.findById.mockResolvedValue(null);

      const res = await request(app)
        .post("/merge/bidder")
        .send({ user_id: "123" });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("bidder not found");
    });

    it("should return 401 if account already merged", async () => {
      Bidders.findById.mockResolvedValue({
        _id: "123",
        bidder_name: "test",
        bidder_email: "test@example.com",
      });
      Depositors.findById.mockResolvedValue({
        _id: "123",
      });

      const res = await request(app)
        .post("/merge/bidder")
        .send({ user_id: "123" });

      expect(res.statusCode).toBe(401);
      expect(res.body.error).toBe("this account is already merged");
    });
  });
});
