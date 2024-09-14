import { StateCreator } from "zustand";
import axios, { AxiosResponse }  from 'axios';

export interface addOfferState {
  offerDataPosting : null;
  getOfferDataPosting : (data : any) => void;
  postOffer : () => Promise<void>;
  waitingMsg : boolean;
  getWaitingMsg : (data : boolean) => void;
  loading : boolean | null;
  catchError : boolean;
}


export const createOfferSlice : StateCreator<addOfferState> = (set, get)=>({
    waitingMsg : false,
    offerDataPosting: null,
    getOfferDataPosting  : (data) => set({ offerDataPosting : data }),
    getWaitingMsg : (data) => set({ waitingMsg : data }),
    loading : null,
    catchError : false,
    postOffer: async () => {
      const { offerDataPosting } = get();
      set({ loading : true});
      try {
        const response : AxiosResponse = await axios.post(`${process.env.NEXT_PUBLIC_BackendURL}/add/offer`, offerDataPosting, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        set({ waitingMsg : true, loading : false});
      } catch (error) {
        console.error('Error fetching offers:', error); 
        set({ waitingMsg : false , catchError: true});
      }
    },
  })