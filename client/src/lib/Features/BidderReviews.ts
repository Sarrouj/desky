import { StateCreator } from "zustand";
import axios from "axios";

export interface BidderReview {
  _id: (string & number) | any;
  bidder_review: Array<object>;
}

export interface BidderReviewInfoType {
  BidderID: number | null;
  BidderReview: BidderReview | null;
  BidderReviewIsLoading: boolean;
  getBidderID: (id: number) => void;
  fetchBidderReview: () => Promise<void>;
}

export const BidderReviewSlice: StateCreator<BidderReviewInfoType> = (
  set,
  get
) => ({
  BidderID: null,
  BidderReview: null,
  BidderReviewIsLoading: false,
  getBidderID: (id) => set({ BidderID: id }),
  fetchBidderReview: async () => {
    set({ BidderReviewIsLoading: true });
    const { BidderID } = get();
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BackendURL}/bidder/reviews/${BidderID}`
      );
      const data = response.data.success;
      set({ BidderReview: data, BidderReviewIsLoading: false });
    } catch (error) {
      console.error("Error fetching offers:", error);
      set({ BidderReviewIsLoading: false });
    }
  },
});
