// Packages
import request from "supertest";
import express from "express";
import bcrypt from "bcrypt";
import router from "../routes/depositor.mjs";

// Schemas
import Depositors from "../mongoose/schemas/Depositor.mjs";
import Bidders from "../mongoose/schemas/Bidder.mjs";
import Offers from "../mongoose/schemas/Offer.mjs";
import AE from "../mongoose/schemas/AE.mjs";
import Companies from "../mongoose/schemas/Company.mjs";

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
jest.mock("../utils/depositorValidationFields.mjs", () => ({
  __esModule: true,
  default: [
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

jest.mock("../mongoose/schemas/Depositor.mjs");
jest.mock("../mongoose/schemas/Bidder.mjs");
jest.mock("../mongoose/schemas/Offer.mjs");
jest.mock("../mongoose/schemas/AE.mjs");
jest.mock("../mongoose/schemas/Company.mjs");

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Tests
describe("Depositors", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

  describe("POST /depositor", () => {
    it("should return Depositor Profile Info", async () => {
      Depositors.findById.mockResolvedValue({
        _id: "123",
        depositor_name: "test",
      });

      const res = await request(app).post("/depositor").send({ user_id: "123" });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBeDefined();
    });

    it("should return 404 if no depositor found", async () => {
      Depositors.findById.mockResolvedValue(null);

      const res = await request(app).post("/depositor").send({ user_id: "123" });
      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Depositor not found");
    });
  });

  // \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

  describe("GET /depositor/:id", () => {
    it("should return Depositor Info", async () => {
      Depositors.findById.mockResolvedValue({
        _id: "123",
        depositor_name: "test",
      });

      const res = await request(app).get("/depositor/123");

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBeDefined();
    });

    it("should return 404 if no depositor found", async () => {
      Depositors.findById.mockResolvedValue(null);

      const res = await request(app).get("/depositor/123");
      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Depositor not found");
    });
  });

  // \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

  describe("GET /depositor/info/:id", () => {
    it("should return AE info", async () => {
      Depositors.findById.mockResolvedValue({ _id: "123" });
      AE.findById.mockResolvedValue({ _id: "123", AE_CIN: "cin" });

      const res = await request(app).get("/depositor/info/123");

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBeDefined();
    });

    it("should return company info", async () => {
      Depositors.findById.mockResolvedValue({ _id: "123" });
      AE.findById.mockResolvedValue(null);
      Companies.findById.mockResolvedValue({
        _id: "123",
        company_name: "test",
      });

      const res = await request(app).get("/depositor/info/123");

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBeDefined();
    });

    it("should return 404 if no info found", async () => {
      Depositors.findById.mockResolvedValue({ _id: "123" });
      AE.findById.mockResolvedValue(null);
      Companies.findById.mockResolvedValue(null);

      const res = await request(app).get("/depositor/info/123");

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Depositor info not found");
    });
  });

  // \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

  describe("POST /depositor/offers", () => {
    it("should return depositor's offers", async () => {
      Offers.find.mockResolvedValue([{ _id: "789", depositor_id: "123" }]);

      const res = await request(app).post("/depositor/offers").send({
        user_id: "123",
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBeDefined();
    });

    it("should return 404 if no offers found", async () => {
      Offers.find.mockResolvedValue(null);

      const res = await request(app).post("/depositor/offers").send({
        user_id: "123",
      });

      console.log(res.body);

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Offers not found");
    });
  });

  // \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

  describe("PUT /edit/depositor", () => {
    it("should update depositor info", async () => {
      const depositor = {
        _id: "123",
        depositor_name: "test",
        depositor_email: "test@example.com",
        depositor_password: "hashedpassword",
        save: jest.fn().mockResolvedValue(true),
      };
      Depositors.findById.mockResolvedValue(depositor);
      bcrypt.compareSync = jest.fn().mockReturnValue(true);
      bcrypt.hash = jest.fn().mockResolvedValue("newhashedpassword");

      const res = await request(app).put("/edit/depositor").send({
        user_id: "123",
        depositor_name: "newName",
        depositor_email: "new@example.com",
        depositor_password: "newpassword",
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(
        "Depositor's information updated successfully"
      );
    });

    it("should return 404 if depositor not found", async () => {
      Depositors.findById.mockResolvedValue(null);

      const res = await request(app)
        .put("/edit/depositor")
        .send({ user_id: "123" });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Depositor not found");
    });
  });

  // \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

  describe("POST /add/depositor/AE", () => {
    it("should add AE info", async () => {
      Depositors.findById.mockResolvedValue({ _id: "123" });
      Companies.findById.mockResolvedValue(null);
      AE.findById.mockResolvedValue(null);

      const res = await request(app).post("/add/depositor/AE").send({
        user_id: "123",
        AE_CIN: "cin",
        AE_phoneNumber: "1234567890",
        AE_DoA: "2023-01-01",
        AE_address: "address",
        AE_location: "location",
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(
        "Auto entrepreneur information added successfully"
      );
    });

    it("should return 404 if depositor already is a company", async () => {
      Depositors.findById.mockResolvedValue({ _id: "123" });
      Companies.findById.mockResolvedValue({ _id: "123" });

      const res = await request(app)
        .post("/add/depositor/AE")
        .send({ user_id: "123" });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Depositor already is a company");
    });

    it("should return 404 if depositor already is an AE", async () => {
      Depositors.findById.mockResolvedValue({ _id: "123" });
      Companies.findById.mockResolvedValue(null);
      AE.findById.mockResolvedValue({ _id: "123" });

      const res = await request(app)
        .post("/add/depositor/AE")
        .send({ user_id: "123" });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Depositor already is an AE");
    });
  });

  // \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

  describe("POST /add/depositor/company", () => {
    it("should add company info", async () => {
      Depositors.findById.mockResolvedValue({ _id: "123" });
      Companies.findById.mockResolvedValue(null);
      AE.findById.mockResolvedValue(null);

      const res = await request(app).post("/add/depositor/company").send({
        user_id: "123",
        company_type: "type",
        company_name: "name",
        company_phoneNumber: "1234567890",
        company_address: "address",
        company_location: "location",
        company_CR: "CR",
        company_DoA: "2023-01-01",
        company_size: "size",
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe("Company information added successfully");
    });

    it("should return 404 if depositor already is a company", async () => {
      Depositors.findById.mockResolvedValue({ _id: "123" });
      Companies.findById.mockResolvedValue({ _id: "123" });

      const res = await request(app)
        .post("/add/depositor/company")
        .send({ user_id: "123" });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Depositor already is a company");
    });

    it("should return 404 if depositor already is an AE", async () => {
      Depositors.findById.mockResolvedValue({ _id: "123" });
      Companies.findById.mockResolvedValue(null);
      AE.findById.mockResolvedValue({ _id: "123" });

      const res = await request(app)
        .post("/add/depositor/company")
        .send({ user_id: "123" });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Depositor already is an AE");
    });
  });

  // \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

  describe("POST /rate/depositor/:bidder_id/:offer_id", () => {
    it("should rate a bidder", async () => {
      Depositors.findById.mockResolvedValue({ _id: "123" });
      const bidder = {
        _id: "456",
        bidder_review: [],
        save: jest.fn().mockResolvedValue(true),
      };
      Bidders.findById.mockResolvedValue(bidder);
      Offers.findById.mockResolvedValue({
        _id: "789",
        depositor_id: "123",
        offer_apply: [{ bidder_id: "456" }],
        offer_state: "finished",
      });

      const res = await request(app).post("/rate/depositor/456/789").send({
        user_id: "123",
        rating: 5,
        text: "Great",
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe("Rating added successfully");
    });

    it("should return 404 if depositor not found", async () => {
      Depositors.findById.mockResolvedValue(null);

      const res = await request(app)
        .post("/rate/depositor/456/789")
        .send({ user_id: "123" });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Depositor not found");
    });

    it("should return 404 if bidder not found", async () => {
      Depositors.findById.mockResolvedValue({ _id: "123" });
      Bidders.findById.mockResolvedValue(null);

      const res = await request(app)
        .post("/rate/depositor/456/789")
        .send({ user_id: "123" });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Bidder not found");
    });

    it("should return 404 if offer not found", async () => {
      Depositors.findById.mockResolvedValue({ _id: "123" });
      Bidders.findById.mockResolvedValue({ _id: "456" });
      Offers.findById.mockResolvedValue(null);

      const res = await request(app)
        .post("/rate/depositor/456/789")
        .send({ user_id: "123" });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Offer not found");
    });

    it("should return 403 if rating is not allowed", async () => {
      Depositors.findById.mockResolvedValue({ _id: "123" });
      Bidders.findById.mockResolvedValue({ _id: "456" });
      Offers.findById.mockResolvedValue({
        _id: "789",
        depositor_id: "124",
        offer_apply: [{ bidder_id: "456" }],
        offer_state: "finished",
      });

      const res = await request(app)
        .post("/rate/depositor/456/789")
        .send({ user_id: "123" });

      expect(res.statusCode).toBe(403);
      expect(res.body.error).toBe("You can't rate this bidder");
    });
  });

  // \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

  describe("POST /merge/depositor", () => {
    it("should merge depositor account", async () => {
      Depositors.findById.mockResolvedValue({
        _id: "123",
        depositor_name: "test",
        depositor_email: "test@example.com",
        depositor_password: "hashedpassword",
        depositor_CB: "123456",
        image: {},
      });
      Bidders.findById.mockResolvedValue(null);
      const res = await request(app).post("/merge/depositor").send({
        user_id: "123",
      });

      console.log(res.body.error);

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe("Depositor account merged successfully");
    });

    it("should return 404 if depositor not found", async () => {
      Depositors.findById.mockResolvedValue(null);

      const res = await request(app).post("/merge/depositor").send({
        user_id: "123",
      });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Depositor not found");
    });

    it("should return 400 if account is already merged", async () => {
      Depositors.findById.mockResolvedValue({ _id: "123" });
      Bidders.findById.mockResolvedValue({ _id: "123" });

      const res = await request(app).post("/merge/depositor").send({
        user_id: "123",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe("This account is already merged");
    });
  });
});
