import { StateCreator } from "zustand";
import axios from "axios";

export interface deleteOfferState {
    DeleteOfferID : null | string & number | number;
    DeleteDepositorID : null | string & number | number;
    getDeleteOfferID :  (id : string & number | number) => void;
    getDeleteDepositorID : (id : string & number | number) => void;
    deleteOffer : () => Promise<void>;
}

export const DeleteOfferSlice : StateCreator<deleteOfferState> = (set, get) => ({
    DeleteOfferID : null ,
    DeleteDepositorID : null,
    getDeleteOfferID : (id) => set({ DeleteOfferID : id }),
    getDeleteDepositorID : (id) => set({ DeleteDepositorID : id }),
    deleteOffer : async () => {
        const { DeleteOfferID } = get();
        const { DeleteDepositorID } = get();

        try {
            await axios.delete(
              `${process.env.NEXT_PUBLIC_BackendURL}/delete/offer/${DeleteOfferID}`,
              {
                data: {
                  user_id: DeleteDepositorID,
                },
              }
            );
            window.location.reload();
          } catch (error) {
            console.log(error);
        }
    }
})