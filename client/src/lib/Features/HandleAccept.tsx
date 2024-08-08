import { StateCreator } from "zustand";
import axios from "axios";

export interface HandleAcceptBidState {
    bidID : null | string & number | number;
    UserID  : null | string & number | number;
    getBidID:  (id : string & number | number) => void;
    getUserID : (id : any) => void;
    putAcceptOffer : () => Promise<void>;
}

export const HandleAcceptSlice : StateCreator<HandleAcceptBidState> = (set, get) => ({
    bidID : null ,
    UserID : null,
    getBidID : (id) => set({ bidID: id }),
    getUserID : (id) => set({ UserID  : id }),
    putAcceptOffer : async () => {
        const { bidID } = get();
        const { UserID } = get();
        try {
            const results = await axios.post(
                `https://desky-2.onrender.com/accept/depositor/bid/${bidID}`,{ user_id :  UserID }
            );
            window.location.reload();
          } catch (error) {
            console.log(error);
        }
    }
})