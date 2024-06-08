import { StateCreator } from "zustand";
import axios from 'axios';


export const createOfferSlice : StateCreator<> = (set, get)=>({
    offerDataPosting: null,
    getOfferDataPosting  : (data) => set({ offerDataPosting : data }),
    offerDataPostingIsLoading : false,
    postOffer: async () => {
      set({ offerDataPostingIsLoading: true });
      const { offerData } = get();
      try {
        const response = await axios.post('http://localhost:3001/add/offer', offerData);
        console.log(response.data);
        set({ offerDataPostingIsLoading : false});
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    },
  })