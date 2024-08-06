import { StateCreator } from "zustand";
import axios from "axios";

export interface HandleCompleteState {
  HandleCompleteOfferID: null | (string & number) | number;
  HandleCompleteDepositorID: null | (string & number) | number;
  getHandleCompleteOfferID: (id: (string & number) | number) => void;
  getHandleCompleteDepositorID: (id: (string & number) | number) => void;
  putCompleteDepositorOffer: () => Promise<void>;
}

export const HandleCompleteSlice: StateCreator<HandleCompleteState> = (
  set,
  get
) => ({
  HandleCompleteOfferID: null,
  HandleCompleteDepositorID: null,
  getHandleCompleteOfferID: (id) => set({ HandleCompleteOfferID: id }),
  getHandleCompleteDepositorID: (id) => set({ HandleCompleteDepositorID: id }),
  putCompleteDepositorOffer: async () => {
    const { HandleCompleteOfferID } = get();
    const { HandleCompleteDepositorID } = get();
    try {
      await axios.put(
        `http://localhost:3001/edit/offer/state/${HandleCompleteOfferID}`,
        {
          user_id: HandleCompleteDepositorID,
          offer_state: "closed",
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  },
});
