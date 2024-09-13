import { StateCreator } from "zustand";
import axios from "axios";

export interface FetchDepositorOffersState {
    DepositorResponse : any;
    OffersUserID  : any;
    geOffersUserID:  (id : any) => void;
    putCompleteOffer : () => Promise<void>;
}

export const FetchDepositorOffers : StateCreator<FetchDepositorOffersState> = (set, get) => ({
    DepositorResponse : null,
    OffersUserID : null,
    geOffersUserID : (id) => set({ OffersUserID  : id }),
    putCompleteOffer : async () => {
        const { OffersUserID } = get();

        try {
            const response = await axios.post(
              "https://desky-2.onrender.com/depositor/offers",{ user_id : OffersUserID, }
            );

            set({ DepositorResponse  : response.data.success})
          } catch (error) {
            console.log(error);
        }
    }
})