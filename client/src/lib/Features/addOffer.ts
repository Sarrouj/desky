import { StateCreator } from "zustand";
import axios from 'axios';

export interface addOfferState {
  offerDataPosting : null;
  getOfferDataPosting : (data : any) => void;
  offerDataPostingIsLoading : boolean;
  postOffer : () => Promise<void>;
  waitingMsg : boolean;
  getWaitingMsg : (data : boolean) => void;
}


export const createOfferSlice : StateCreator<addOfferState> = (set, get)=>({
    waitingMsg : false,
    offerDataPosting: null,
    getOfferDataPosting  : (data) => set({ offerDataPosting : data }),
    getWaitingMsg : (data) => set({ waitingMsg : data }),
    offerDataPostingIsLoading : false,
    postOffer: async () => {
      set({ offerDataPostingIsLoading: true });
      const { offerDataPosting } = get();
      try {
        const response = await axios.post('http://localhost:3001/add/offer', offerDataPosting, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        set({ waitingMsg : true});
        set({ offerDataPostingIsLoading : false});
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    },
  })