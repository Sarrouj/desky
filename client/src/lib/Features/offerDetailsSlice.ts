import { StateCreator } from "zustand";
import axios from "axios";


interface Attachements {
  _id: string & number,
  file_id: string & number,
  file_name: any,
  file_size: string & number,
  upload_date: Date
}

export interface OfferType {
  _id: string & number,
  offer_title: string | string & number,
  offer_description: string | string & number,
  offer_category: string[],
  offer_DoP: any,
  offer_location: string | string & number,
  offer_deadLine: Date,
  offer_budget: number,
  offer_attachments: Array<Attachements>,
  depositor_id: string & number,
  bidder_id: any[],
  offer_state: string,
  offer_apply: any[]
}

export interface OfferDetails {
  OfferID: number & string | number | null;
  offerData: OfferType | Array<null>;
  fetchOfferDetails: () => Promise<void>;
  getOfferID: (id: number | null) => void;
}

  
export const createOfferDetailsSlice : StateCreator<OfferDetails> = (set, get)=>({
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
