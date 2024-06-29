// Packages
import request from "supertest";
import express from "express";
import router from "../routes/offer.mjs";

// Schemas
import Depositors from "../mongoose/schemas/Depositor.mjs";
import Bidders from "../mongoose/schemas/Bidder.mjs";
import Offers from "../mongoose/schemas/Offer.mjs";

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
jest.mock("../utils/offerValidationFields.mjs", () => ({
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
jest.mock("../utils/offerStateValidationFields.mjs", () => ({
  __esModule: true,
  default: [(req, res, next) => next(), (req, res, next) => next()],
}));
jest.mock("../mongoose/schemas/Depositor.mjs");
jest.mock("../mongoose/schemas/Bidder.mjs");
jest.mock("../mongoose/schemas/Offer.mjs");

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Tests
describe("Offers", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

  describe("GET /offers", () => {
    it("should return all offers", async () => {
      Offers.find.mockResolvedValue([
        { _id: "123", offer_title: "Test Offer" },
      ]);

      const res = await request(app).get("/offers");

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toHaveLength(1);
    });

    it("should return 404 if no offers found", async () => {
      Offers.find.mockResolvedValue([]);

      const res = await request(app).get("/offers");

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("No offers found");
    });
  });

  // \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

  describe("GET /offer/:id", () => {
    it("should return offer info", async () => {
      Offers.findById.mockResolvedValue({
        _id: "123",
        offer_title: "Test Offer",
      });

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

  // \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

  describe("GET /search/offer", () => {
    it("should return filtered offers", async () => {
      Offers.find.mockResolvedValue([
        { _id: "123", offer_title: "Test Offer" },
      ]);

      const res = await request(app).get("/search/offer?search=test");

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toHaveLength(1);
    });

    it("should return 404 if no offers found", async () => {
      Offers.find.mockResolvedValue([]);

      const res = await request(app).get("/search/offer?search=test");

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("No offers found");
    });
  });

  // \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

  describe("POST /add/offer", () => {
    it("should add a new offer", async () => {
      Depositors.findById.mockResolvedValue({ _id: "user123" });
      Offers.prototype.save.mockResolvedValue();

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

  // \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

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

  // \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

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

    it("should return 404 if depositor not found", async () => {
      Depositors.findById.mockResolvedValue(null);

      const res = await request(app).put("/edit/offer/state/123").send({
        offer_state: "accepted",
        user_id: "user123",
      });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Depositor not found");
    });

    it("should return 403 if user is not the depositor of the offer", async () => {
      Depositors.findById.mockResolvedValue({ _id: "user456" }); // Different user ID
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
  });

  // \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

  describe("DELETE /delete/offer/:id", () => {
    it("should delete an offer", async () => {
      Depositors.findById.mockResolvedValue({
        _id: "user123",
      });

      Offers.findById.mockResolvedValue({
        _id: "123",
        depositor_id: "user123",
        offer_apply: [],
        deleteOne: jest.fn(),
      });

      const res = await request(app).delete("/delete/offer/123").send({
        user_id: "user123",
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe("Offer deleted successfully");
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

    it("should return 404 if depositor not found", async () => {
      Depositors.findById.mockResolvedValue(null);

      const res = await request(app).delete("/delete/offer/123").send({
        user_id: "user123",
      });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Depositor not found");
    });

    it("should return 403 if user is not the depositor of the offer", async () => {
      Depositors.findById.mockResolvedValue({ _id: "user456" }); // Different user ID
      Offers.findById.mockResolvedValue({
        _id: "123",
        depositor_id: "user123",
        offer_apply: [],
        deleteOne: jest.fn(),
      });

      const res = await request(app).delete("/delete/offer/123").send({
        user_id: "user456",
      });

      expect(res.statusCode).toBe(403);
      expect(res.body.error).toBe("You can't delete this offer");
    });
  });

  // \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

  describe("POST /save/offer/:id", () => {
    it("should save an offer", async () => {
      Bidders.findById.mockResolvedValue({
        _id: "bidder123",
        isTrusted: true,
        saved_offers: [],
        save: jest.fn(),
      });

      Offers.findById.mockResolvedValue({
        _id: "offer123",
      });

      const res = await request(app).post("/save/offer/offer123").send({
        user_id: "bidder123",
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe("Offer saved successfully");
    });

    it("should return 404 if bidder not found", async () => {
      Bidders.findById.mockResolvedValue(null);

      const res = await request(app).post("/save/offer/offer123").send({
        user_id: "bidder123",
      });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Bidder not found");
    });

    it("should return 403 if bidder is not trusted", async () => {
      Bidders.findById.mockResolvedValue({
        _id: "bidder123",
        isTrusted: false,
      });

      const res = await request(app).post("/save/offer/offer123").send({
        user_id: "bidder123",
      });

      expect(res.statusCode).toBe(403);
      expect(res.body.error).toBe("You can't save offers");
    });

    it("should return 404 if offer not found", async () => {
      Bidders.findById.mockResolvedValue({
        _id: "bidder123",
        isTrusted: true,
      });

      Offers.findById.mockResolvedValue(null);

      const res = await request(app).post("/save/offer/offer123").send({
        user_id: "bidder123",
      });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Offer not found");
    });

    it("should return 403 if bidder has already saved the offer", async () => {
      const savedOffers = [
        {
          offer_id: "offer123",
        },
      ];

      Bidders.findById.mockResolvedValue({
        _id: "bidder123",
        isTrusted: true,
        saved_offers: savedOffers,
      });

      Offers.findById.mockResolvedValue({
        _id: "offer123",
      });

      const res = await request(app).post("/save/offer/offer123").send({
        user_id: "bidder123",
      });

      expect(res.statusCode).toBe(403);
      expect(res.body.error).toBe("You already saved this offer");
    });
  });

  // \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

  describe("DELETE /unsave/offer/:id", () => {
    it("should unsave an offer", async () => {
      const mockBidder = {
        _id: "bidder123",
        isTrusted: true,
        saved_offers: [{ offer_id: "123" }],
        save: jest.fn(),
      };
      Bidders.findById.mockResolvedValue(mockBidder);

      const mockOffer = {
        _id: "offer123",
      };
      Offers.findById.mockResolvedValue(mockOffer);

      const res = await request(app)
        .delete("/unsave/offer/123")
        .send({ user_id: "bidder123" });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe("Offer unsaved successfully");
    });

    it("should return 404 if bidder not found", async () => {
      Bidders.findById.mockResolvedValue(null);

      const res = await request(app)
        .delete("/unsave/offer/123")
        .send({ user_id: "bidder123" });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Bidder not found");
    });

    it("should return 403 if bidder has not saved the offer", async () => {
      const mockBidder = {
        _id: "bidder123",
        isTrusted: true,
        saved_offers: [],
      };
      Bidders.findById.mockResolvedValue(mockBidder);

      const res = await request(app)
        .delete("/unsave/offer/123")
        .send({ user_id: "bidder123" });

      expect(res.statusCode).toBe(403);
      expect(res.body.error).toBe("You haven't saved this offer");
    });
  });

  // \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

  describe("POST /apply/offer/:id", () => {
    it("should apply to an offer", async () => {
      const mockBidder = {
        _id: "bidder123",
        isTrusted: true,
        bidder_CB: 10,
        save: jest.fn(),
      };
      Bidders.findById.mockResolvedValue(mockBidder);

      const mockOffer = {
        _id: "123",
        offer_apply: [],
        depositor_id: "depositor123",
        save: jest.fn(),
      };
      Offers.findById.mockResolvedValue(mockOffer);

      Depositors.findOne.mockResolvedValue(null);

      const res = await request(app)
        .post("/apply/offer/123")
        .send({ user_id: "bidder123", role: "bidder" });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe("Offer applied successfully");
    });

    it("should return 404 if bidder not found", async () => {
      Bidders.findById.mockResolvedValue(null);

      const res = await request(app)
        .post("/apply/offer/123")
        .send({ user_id: "bidder123", role: "bidder" });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Bidder not found");
    });

    it("should return 404 if offer not found", async () => {
      Bidders.findById.mockResolvedValue({
        _id: "bidder123",
        isTrusted: true,
        bidder_CB: 10,
        save: jest.fn(),
      });

      Offers.findById.mockResolvedValue(null);

      const res = await request(app)
        .post("/apply/offer/123")
        .send({ user_id: "bidder123", role: "bidder" });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Offer not found");
    });

    it("should return 403 if applying to own offer", async () => {
      const mockBidder = {
        _id: "bidder123",
        isTrusted: true,
        bidder_CB: 10,
        save: jest.fn(),
      };
      Bidders.findById.mockResolvedValue(mockBidder);

      const mockOffer = {
        _id: "123",
        offer_apply: [],
        depositor_id: "depositor123",
        save: jest.fn(),
      };
      Offers.findById.mockResolvedValue(mockOffer);

      Depositors.findOne.mockResolvedValue({
        _id: "depositor123",
        depositor_id: "bidder123",
      });

      const res = await request(app)
        .post("/apply/offer/123")
        .send({ user_id: "bidder123", role: "bidder" });

      expect(res.statusCode).toBe(403);
      expect(res.body.error).toBe("You can't apply to your own offers");
    });

    it("should return 403 if bidder is not trusted", async () => {
      const mockBidder = {
        _id: "bidder123",
        isTrusted: false,
        bidder_CB: 10,
        save: jest.fn(),
      };
      Bidders.findById.mockResolvedValue(mockBidder);

      const mockOffer = {
        _id: "123",
        offer_apply: [],
        depositor_id: "depositor123",
        save: jest.fn(),
      };
      Offers.findById.mockResolvedValue(mockOffer);

      Depositors.findOne.mockResolvedValue(null);

      const res = await request(app)
        .post("/apply/offer/123")
        .send({ user_id: "bidder123", role: "bidder" });

      expect(res.statusCode).toBe(403);
      expect(res.body.error).toBe(
        "You need to be trusted to apply to this offer"
      );
    });

    it("should return 403 if bidder does not have enough Connects", async () => {
      const mockBidder = {
        _id: "bidder123",
        isTrusted: true,
        bidder_CB: 5, // Less than 10 Connects
        save: jest.fn(),
      };
      Bidders.findById.mockResolvedValue(mockBidder);

      const mockOffer = {
        _id: "123",
        offer_apply: [],
        depositor_id: "depositor123",
        save: jest.fn(),
      };
      Offers.findById.mockResolvedValue(mockOffer);

      Depositors.findOne.mockResolvedValue(null);

      const res = await request(app)
        .post("/apply/offer/123")
        .send({ user_id: "bidder123", role: "bidder" });

      expect(res.statusCode).toBe(403);
      expect(res.body.error).toBe("You don't have enough Connects");
    });

    it("should return 403 if bidder has already applied to the offer", async () => {
      const mockBidder = {
        _id: "bidder123",
        isTrusted: true,
        bidder_CB: 10,
        save: jest.fn(),
      };
      Bidders.findById.mockResolvedValue(mockBidder);

      const mockOffer = {
        _id: "123",
        offer_apply: [{ bidder_id: "bidder123" }],
        depositor_id: "depositor123",
        save: jest.fn(),
      };
      Offers.findById.mockResolvedValue(mockOffer);

      Depositors.findOne.mockResolvedValue(null);

      const res = await request(app)
        .post("/apply/offer/123")
        .send({ user_id: "bidder123", role: "bidder" });

      expect(res.statusCode).toBe(403);
      expect(res.body.error).toBe("You already applied for this offer");
    });
  });

  // \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

  describe("DELETE /delete/apply/offer/:id", () => {
    it("should delete offer application", async () => {
      const mockBidder = {
        _id: "bidder123",
        bidder_apply: ["123"],
        save: jest.fn(),
      };
      Bidders.findById.mockResolvedValue(mockBidder);

      const mockOffer = {
        _id: "123",
        offer_apply: [{ bidder_id: "bidder123" }],
        save: jest.fn(),
      };
      Offers.findById.mockResolvedValue(mockOffer);

      const res = await request(app)
        .delete("/delete/apply/offer/123")
        .send({ user_id: "bidder123" });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe("Apply removed successfully");
    });

    it("should return 404 if offer not found", async () => {
      Bidders.findById.mockResolvedValue({
        _id: "bidder123",
        bidder_apply: ["123"],
        save: jest.fn(),
      });
      Offers.findById.mockResolvedValue(null);

      const res = await request(app)
        .delete("/delete/apply/offer/123")
        .send({ user_id: "bidder123" });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Offer not found");
    });

    it("should return 404 if bidder not found", async () => {
      Bidders.findById.mockResolvedValue(null);

      const res = await request(app)
        .delete("/delete/apply/offer/123")
        .send({ user_id: "bidder123" });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Bidder not found");
    });

    it("should return 404 if bidder has not applied to the offer", async () => {
      const mockBidder = {
        _id: "bidder123",
        bidder_apply: [],
        save: jest.fn(),
      };
      Bidders.findById.mockResolvedValue(mockBidder);

      const mockOffer = {
        _id: "123",
        offer_apply: [],
        save: jest.fn(),
      };
      Offers.findById.mockResolvedValue(mockOffer);

      const res = await request(app)
        .delete("/delete/apply/offer/123")
        .send({ user_id: "bidder123" });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("You haven't applied to this offer");
    });
  });
});
