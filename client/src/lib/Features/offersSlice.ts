import { StateCreator } from "zustand";
import axios from 'axios';

export interface Offer {
  _id: string & number;
  offer_title: string & Number;
  offer_description: string & Number;
  offer_category: string[];
  offer_DoP: string;
  offer_deadLine: Date & String & Number;
  offer_budget: number;
  offer_location: string & Number;
  offer_state: string;
  offer_attachments: any[];
  bidder_id: string[];
  depositor_id: string;
}

export interface OffersState {
  offersData: Offer[];
  offersDataIsLoading : boolean;
  fetchOffers: () => Promise<void>;
}

export const createOffersSlice : StateCreator<OffersState> = (set)=>({
  offersData: [],
  offersDataIsLoading : false,
  fetchOffers: async () => {
    set({ offersDataIsLoading: true });
    try {
      const response = await axios.get('http://localhost:3001/offers');
      const data = response.data.success;
      set({ offersData: data , offersDataIsLoading : false});
    } catch (error) {
      console.error('Error fetching offers:', error);
    }
  },
})