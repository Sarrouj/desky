// Packages
import request from "supertest";
import express from "express";
import router from "../routes/offer.mjs";

// Schemas
import Depositors from "../mongoose/schemas/Depositor.mjs";
import Bidders from "../mongoose/schemas/Bidder.mjs";
import Offers from "../mongoose/schemas/offer.mjs";

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
jest.mock("../utils/offerStateValidationFields.mjs", () => ({
  __esModule: true,
  default: new Array(2).fill((req, res, next) => next()),
}));
jest.mock("../mongoose/schemas/Depositor.mjs");
jest.mock("../mongoose/schemas/Bidder.mjs");
jest.mock("../mongoose/schemas/Offer.mjs", () => {
  return {
    __esModule: true,
    default: class Offer {
      constructor() {
        this.save = jest.fn().mockResolvedValue();
      }
      static find = jest.fn();
      static findById = jest.fn();
      static deleteOne = jest.fn();
    },
  };
});

// Tests
describe("Offers", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /offers", () => {
    it("should return all offers", async () => {
      Offers.find.mockResolvedValue([{ _id: "123", offer_title: "Test Offer" }]);

      const res = await request(app).get("/offers");

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toHaveLength(1);
      expect(res.body.success[0]._id).toBe("123");
    });

    it("should return 404 if no offers found", async () => {
      Offers.find.mockResolvedValue([]);

      const res = await request(app).get("/offers");

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("No offers found");
    });
  });

  describe("GET /offer/:id", () => {
    it("should return offer info", async () => {
      Offers.findById.mockResolvedValue({ _id: "123", offer_title: "Test Offer" });

      const res = await request(app).get("/offer/123");

      expect(res.statusCode).toBe(200);
      expect(res.body.success._id).toBe("123");
    });

    it("should return 404 if offer not found", async () => {
      Offers.findById.mockResolvedValue(null);

      const res = await request(app).get("/offer/123");

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Offer not found");
    });
  });

  describe("GET /search/offer", () => {
    it("should return filtered offers", async () => {
      Offers.find.mockResolvedValue([{ _id: "123", offer_title: "Test Offer" }]);

      const res = await request(app).get("/search/offer?search=test");

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toHaveLength(1);
      expect(res.body.success[0]._id).toBe("123");
    });

    it("should return 404 if no offers found", async () => {
      Offers.find.mockResolvedValue([]);

      const res = await request(app).get("/search/offer?search=test");

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("No offers found");
    });
  });

  describe("POST /add/offer", () => {
    it("should add a new offer", async () => {
      Depositors.findById.mockResolvedValue({ _id: "user123" });

      const res = await request(app).post("/add/offer").send({
        offer_title: "New Offer",
        offer_description: "Description",
        offer_category: "Category",
        offer_location: "Location",
        offer_deadLine: "2024-12-31",
        offer_budget: 1000,
        user_id: "user123",
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe("Offer created successfully");
    });

    it("should return 404 if depositor not found", async () => {
      Depositors.findById.mockResolvedValue(null);

      const res = await request(app).post("/add/offer").send({
        offer_title: "New Offer",
        offer_description: "Description",
        offer_category: "Category",
        offer_location: "Location",
        offer_deadLine: "2024-12-31",
        offer_budget: 1000,
        user_id: "user123",
      });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Depositor not found");
    });
  });

  describe("PUT /edit/offer/:id", () => {
    it("should edit an offer", async () => {
      Depositors.findById.mockResolvedValue({ _id: "user123" });
      Offers.findById.mockResolvedValue({
        _id: "123",
        depositor_id: "user123",
        offer_apply: [],
        offer_state: "open",
        save: jest.fn(),
      });

      const res = await request(app).put("/edit/offer/123").send({
        offer_title: "Edited Offer",
        offer_description: "Edited Description",
        user_id: "user123",
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe("Offer edited successfully");
    });

    it("should return 404 if depositor not found", async () => {
      Depositors.findById.mockResolvedValue(null);

      const res = await request(app).put("/edit/offer/123").send({
        offer_title: "Edited Offer",
        offer_description: "Edited Description",
        user_id: "user123",
      });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Depositor not found");
    });

    it("should return 404 if offer not found", async () => {
      Depositors.findById.mockResolvedValue({ _id: "user123" });
      Offers.findById.mockResolvedValue(null);

      const res = await request(app).put("/edit/offer/123").send({
        offer_title: "Edited Offer",
        offer_description: "Edited Description",
        user_id: "user123",
      });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Offer not found");
    });

    it("should return 403 if user is not authorized to edit the offer", async () => {
      Depositors.findById.mockResolvedValue({ _id: "user456" }); // Different user ID
      Offers.findById.mockResolvedValue({
        _id: "123",
        depositor_id: "user123",
        offer_apply: [],
        offer_state: "open",
        save: jest.fn(),
      });

      const res = await request(app).put("/edit/offer/123").send({
        offer_title: "Edited Offer",
        offer_description: "Edited Description",
        user_id: "user456",
      });

      expect(res.statusCode).toBe(403);
      expect(res.body.error).toBe("You can't edit this offer");
    });

    it("should return 403 if offer state is not open", async () => {
      Depositors.findById.mockResolvedValue({ _id: "user123" });
      Offers.findById.mockResolvedValue({
        _id: "123",
        depositor_id: "user123",
        offer_apply: [],
        offer_state: "finished",
      });

      const res = await request(app).put("/edit/offer/123").send({
        offer_title: "Edited Offer",
        offer_description: "Edited Description",
        user_id: "user123",
      });

      expect(res.statusCode).toBe(403);
      expect(res.body.error).toBe("You can't edit this offer");
    });
  });

  describe("PUT /edit/offer/state/:id", () => {
    it("should edit an offer state", async () => {
      Depositors.findById.mockResolvedValue({
        _id: "user123",
      });

      Offers.findById.mockResolvedValue({
        _id: "123",
        depositor_id: "user123",
        offer_apply: [],
        offer_state: "pending",
        save: jest.fn(),
      });

      const res = await request(app).put("/edit/offer/state/123").send({
        offer_state: "accepted",
        user_id: "user123",
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe("Offer state edited successfully");
    });

    it("should return 404 if depositor not found", async () => {
      Depositors.findById.mockResolvedValue(null);

      const res = await request(app).put("/edit/offer/state/123").send({
        offer_state: "accepted",
        user_id: "user123",
      });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Depositor not found");
    });

    it("should return 404 if offer not found", async () => {
      Depositors.findById.mockResolvedValue({
        _id: "user123",
      });

      Offers.findById.mockResolvedValue(null);

      const res = await request(app).put("/edit/offer/state/123").send({
        offer_state: "accepted",
        user_id: "user123",
      });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Offer not found");
    });

    it("should return 403 if user is not authorized to edit the offer state", async () => {
      Depositors.findById.mockResolvedValue({
        _id: "user456",
      });

      Offers.findById.mockResolvedValue({
        _id: "123",
        depositor_id: "user123",
        offer_apply: [],
        offer_state: "pending",
        save: jest.fn(),
      });

      const res = await request(app).put("/edit/offer/state/123").send({
        offer_state: "accepted",
        user_id: "user456",
      });

      expect(res.statusCode).toBe(403);
      expect(res.body.error).toBe("You can't edit this offer");
    });

    it("should return 403 if offer state is not open", async () => {
      Depositors.findById.mockResolvedValue({
        _id: "user123",
      });

      Offers.findById.mockResolvedValue({
        _id: "123",
        depositor_id: "user123",
        offer_apply: [],
        offer_state: "finished",
        save: jest.fn(),
      });

      const res = await request(app).put("/edit/offer/state/123").send({
        offer_state: "accepted",
        user_id: "user123",
      });

      expect(res.statusCode).toBe(403);
      expect(res.body.error).toBe("You can't edit this offer");
    });
  });

  describe("DELETE /delete/offer/:id", () => {
    it("should delete an offer", async () => {
      Depositors.findById.mockResolvedValue({
        _id: "user123",
      });

      Offers.findById.mockResolvedValue({
        _id: "123",
        depositor_id: "user123",
        offer_apply: [],
        offer_state: "open",
      });

      Offers.deleteOne.mockResolvedValue({
        deletedCount: 1,
      });

      const res = await request(app).delete("/delete/offer/123").send({
        user_id: "user123",
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe("Offer deleted successfully");
    });

    it("should return 404 if depositor not found", async () => {
      Depositors.findById.mockResolvedValue(null);

      const res = await request(app).delete("/delete/offer/123").send({
        user_id: "user123",
      });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Depositor not found");
    });

    it("should return 404 if offer not found", async () => {
      Depositors.findById.mockResolvedValue({
        _id: "user123",
      });

      Offers.findById.mockResolvedValue(null);

      const res = await request(app).delete("/delete/offer/123").send({
        user_id: "user123",
      });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Offer not found");
    });

    it("should return 403 if user is not authorized to delete the offer", async () => {
      Depositors.findById.mockResolvedValue({
        _id: "user456",
      });

      Offers.findById.mockResolvedValue({
        _id: "123",
        depositor_id: "user123",
        offer_apply: [],
        offer_state: "open",
      });

      const res = await request(app).delete("/delete/offer/123").send({
        user_id: "user456",
      });

      expect(res.statusCode).toBe(403);
      expect(res.body.error).toBe("You can't delete this offer");
    });

    it("should return 403 if offer state is not open", async () => {
      Depositors.findById.mockResolvedValue({
        _id: "user123",
      });

      Offers.findById.mockResolvedValue({
        _id: "123",
        depositor_id: "user123",
        offer_apply: [],
        offer_state: "finished",
      });

      const res = await request(app).delete("/delete/offer/123").send({
        user_id: "user123",
      });

      expect(res.statusCode).toBe(403);
      expect(res.body.error).toBe("You can't delete this offer");
    });
  });
});
