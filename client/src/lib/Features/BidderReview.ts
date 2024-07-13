import { StateCreator } from "zustand";
import axios from "axios";

export interface BidderReviewsState {
    ReviewsBidderResponse : any;
    ReviewsBidderID : null | string & number | number;
    getReviewsBidderID :  (id : string & number | number) => void;
    ReviewsBidder : () => Promise<void>;
}

export const BidderReviews : StateCreator<BidderReviewsState> = (set, get) => ({
    ReviewsBidderResponse : null,
    ReviewsBidderID : null ,
    getReviewsBidderID : (id) => set({ ReviewsBidderID : id }),
    ReviewsBidder : async () => {
        const { ReviewsBidderID } = get();
        try {
            const response = await axios.get(
              `http://localhost:3001/bidder/reviews/${ReviewsBidderID}`
            );
            const data = response.data.success; 
            console.log(data);
            set({ ReviewsBidderResponse: data });
          } catch (error) {
            console.log(error);
        }
    }
})