import { StateCreator } from "zustand";
import axios from 'axios';

export interface Offer {
  _id: string;
  offer_title: string;
  offer_description: string;
  offer_category: string[];
  offer_DoP: string;
  offer_deadLine?: string;
  offer_budget?: number;
  offer_location?: string;
  offer_state?: string;
  offer_attachments?: any[];
  bidder_id?: string[];
  depositor_id?: string;
}

export interface OffersState {
  offersData: Offer[];
  fetchOffers: () => Promise<void>;
}

export const createOffersSlice : StateCreator<OffersState> = (set)=>({
  offersData: [],
  fetchOffers: async () => {
    try {
      const response = await axios.get('http://localhost:3001/offers');
      const data = response.data.success;
      set({ offersData: data });
    } catch (error) {
      console.error('Error fetching offers:', error);
    }
  },
})