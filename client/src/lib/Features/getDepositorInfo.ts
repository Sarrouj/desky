import { StateCreator } from "zustand";
import axios from "axios";

export interface DespositorData{
  _id: string & number,
  depositor_name: string,
  depositor_email: any,
  depositor_password: any,
  depositor_CB: number,
  isTrusted: boolean,
  depositor_review: Array<>,
}

export interface depositorDataInfoType {
  DepositorID : number | null;
  DespositorData : DespositorData | null ;
  depositorInfoIsLoading : boolean;
  getDepositorID : (id : number) => void;
  fetchDepositorData: () => Promise<void>;
}

export const getDepositorDataSlice : StateCreator<depositorDataInfoType> = (set, get)=>({
    DepositorID : null,
    DespositorData : null,
    depositorInfoIsLoading : false,
    getDepositorID  : (id) => set({ DepositorID : id }),
    fetchDepositorData: async () => {
      set({ depositorInfoIsLoading: true });
        const { DepositorID } = get();
      try {
        const response = await axios.get(`http://localhost:3001/depositor/${DepositorID}`);
        const data = response.data.success;
        set({ DespositorData : data , depositorInfoIsLoading: false});
      } catch (error) {
        console.error('Error fetching offers:', error);
        set({ depositorInfoIsLoading: false});
      }
    },
})