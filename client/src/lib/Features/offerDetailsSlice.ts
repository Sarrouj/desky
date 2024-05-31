import { StateCreator } from "zustand";
import axios from "axios";


export interface OfferType {
  _id: string;
  offer_title: string;
  offer_description: string;
  offer_category: string[];
  offer_DoP: string;
  offer_location: string;
  offer_deadLine: string;
  offer_budget: number;
  offer_attachments: string[];
  depositor_id: string;
  bidder_id: string[];
  offer_state: string;
}

export interface OffersState {
    offerData: OfferType[];
    fetchOfferDetails: () => Promise<void>;
}

export interface OfferIDState {
  OfferID: number | null;
}

export interface OfferIDActions {
  getOfferID: (id: number | null) => void;
}

export interface OfferDetails extends OfferIDState, OfferIDActions, OffersState {}
  
export const createOfferDetailsSlice : StateCreator<OfferDetails & OffersState> = (set, get)=>({
    OfferID : null,
    offerData : [],
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
