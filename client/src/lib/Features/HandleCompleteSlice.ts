import { StateCreator } from "zustand";
import axios from "axios";

export interface HandleAcceptState {
    HandleCompleteOfferID : null | string & number | number;
    HandleCompleteDepositorID  : null | string & number | number;
    getHandleCompleteOfferID:  (id : string & number | number) => void;
    getHandleCompleteDepositorID : (id : string & number | number) => void;
    putCompleteOffer : () => Promise<void>;
}

export const HandleCompleteSlice : StateCreator<HandleAcceptState> = (set, get) => ({
    HandleCompleteOfferID : null ,
    HandleCompleteDepositorID : null,
    getHandleCompleteOfferID : (id) => set({ HandleCompleteOfferID: id }),
    getHandleCompleteDepositorID : (id) => set({ HandleCompleteDepositorID  : id }),
    putCompleteOffer : async () => {
        const { HandleCompleteOfferID } = get();
        const { HandleCompleteDepositorID } = get();
        try {
            await axios.put(
              `http://localhost:3001/edit/offer/state/${HandleCompleteOfferID}`,
              {
                offer_state: "closed",
                user_id: HandleCompleteDepositorID,
              }
            );
            window.location.reload();
          } catch (error) {
            console.log(error);
        }
    }
})