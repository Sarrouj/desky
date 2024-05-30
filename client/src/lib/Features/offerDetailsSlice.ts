import { StateCreator } from "zustand";
import { Offer } from "./offersSlice";
import axios from "axios";

export interface OffersState {
    offerData: Offer[];
    fetchOfferDetails: () => Promise<void>;
}
  
export interface OfferIDState {
    OfferID: number | null;
}
  
export interface OfferIDActions {
    getOfferID: (id: number | null ) => void;
}

export interface OfferDetails extends OfferIDState, OfferIDActions, OffersState {}
  
export const createOfferDetailsSlice : StateCreator<OfferDetails> = (set, get)=>({
    OfferID : null,
    offerData: [],
    getOfferID  : (id) => set({ OfferID : id }),
    fetchOfferDetails: async () => {
        const { OfferID } = get();
      try {
        const response = await axios.get(`http://localhost:3001/offer/${OfferID}`);
        const data = response.data.success;
        set({ offerData : data });
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    },
  })