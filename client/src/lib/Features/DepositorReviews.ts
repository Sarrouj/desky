import { StateCreator } from "zustand";
import axios from "axios";

export interface DepositorReview {
  _id: string & number | any;
  depositor_review: Array<object>;
}

export interface DepositorReviewInfoType {
  DepositorID: number | null;
  DepositorReview: DepositorReview | null;
  DepositorReviewIsLoading: boolean;
  getDepositorID: (id: number) => void;
  fetchDepositorReview: () => Promise<void>;
}

export const DepositorReviewSlice: StateCreator<DepositorReviewInfoType> = (
  set,
  get
) => ({
  DepositorID: null,
  DepositorReview: null,
  DepositorReviewIsLoading: false,
  getDepositorID: (id) => set({ DepositorID: id }),
  fetchDepositorReview: async () => {
    set({ DepositorReviewIsLoading: true });
    const { DepositorID } = get();
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BackendURL}/depositor/reviews/${DepositorID}`
      );
      const data = response.data.success;
      set({ DepositorReview: data, DepositorReviewIsLoading: false });
    } catch (error) {
      console.error("Error fetching offers:", error);
      set({ DepositorReviewIsLoading: false });
    }
  },
});
